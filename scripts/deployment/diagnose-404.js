#!/usr/bin/env node

/**
 * This script helps diagnose 404 errors in the Vite development server
 * by providing more detailed error logging.
 */

import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Log file for detailed console output
const logFile = path.join(logsDir, 'detailed-404-logs.log');
const logStream = fs.createWriteStream(logFile, { flags: 'w' });

// Start the dev server
console.log('Starting dev server...');
const devServer = spawn('npm', ['run', 'dev'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true
});

// Track 404 errors
let notFoundErrors = [];

// Listen for page load
devServer.stdout.on('data', async (data) => {
  const output = data.toString();

  // Wait for the server to be ready
  if (output.includes('Local:') && output.includes('http://localhost:')) {
    console.log('Dev server started');

    // Extract the URL from the output
    const match = output.match(/http:\/\/localhost:\d+/);
    if (!match) {
      console.error('Could not determine dev server URL');
      process.exit(1);
    }

    const url = match[0];
    console.log(`Testing app at ${url}`);

    try {
      // Launch browser with detailed network logging
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      const page = await browser.newPage();

      // Enable detailed request logging
      await page.setRequestInterception(true);

      // Log all requests and responses
      page.on('request', request => {
        logStream.write(`[REQUEST] ${request.method()} ${request.url()}\n`);
        request.continue();
      });

      page.on('response', response => {
        const status = response.status();
        const url = response.url();
        logStream.write(`[RESPONSE] ${status} ${url}\n`);

        if (status === 404) {
          notFoundErrors.push(url);
          console.error(`404 Not Found: ${url}`);
        }
      });

      // Log all console messages
      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        logStream.write(`[CONSOLE:${type}] ${text}\n`);
      });

      // Navigate to dev server
      console.log(`Navigating to ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

      // Wait for potential delayed requests
      console.log('Waiting for any delayed network activity...');
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Take a screenshot
      await page.screenshot({ path: './diagnostic-screenshot.png', fullPage: true });
      console.log('Screenshot saved to ./diagnostic-screenshot.png');

      // Check if page rendered
      const pageContent = await page.content();
      logStream.write(`\n\n[PAGE HTML]\n${pageContent}\n\n`);

      // Log errors found
      console.log('\n==== Diagnostic Results ====');
      console.log(`Total 404 errors: ${notFoundErrors.length}`);

      if (notFoundErrors.length > 0) {
        console.log('\nResources not found:');
        notFoundErrors.forEach((url, index) => {
          console.log(`${index + 1}. ${url}`);
        });
      }

      console.log(`\nDetailed logs written to: ${logFile}`);
      console.log('==========================\n');

      // Close browser
      await browser.close();

      // Close log file
      logStream.end();

      // Kill dev server
      devServer.kill();

      process.exit(0);
    } catch (error) {
      console.error('Error running diagnostic:', error);
      logStream.end();
      devServer.kill();
      process.exit(1);
    }
  }
});

// Set a timeout
setTimeout(() => {
  console.error('Timeout waiting for dev server');
  logStream.end();
  devServer.kill();
  process.exit(1);
}, 60000);

// Log server errors
devServer.stderr.on('data', (data) => {
  const error = data.toString();
  console.error(`Server error: ${error}`);
  logStream.write(`[SERVER ERROR] ${error}\n`);
});