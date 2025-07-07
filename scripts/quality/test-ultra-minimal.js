#!/usr/bin/env node

/**
 * This script tests the ultra-minimal demo with enhanced error tracking
 */

import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { ensureProjectRoot } from '../utils/ensure-project-root.mjs';

// Ensure we're in the project root
ensureProjectRoot('test-ultra-minimal.js');

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Log file for detailed console output
const logFile = path.join(logsDir, 'ultra-minimal-logs.log');
const logStream = fs.createWriteStream(logFile, { flags: 'w' });

// Start the dev server
console.log('Starting dev server...');
const devServer = spawn('npm', ['run', 'dev'], { 
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true 
});

// Log server output
devServer.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);
  logStream.write(`[SERVER OUT] ${output}`);
  
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
    
    // Wait a bit to make sure server is fully ready
    setTimeout(async () => {
      try {
        // Launch browser with dev tools open for better error reporting
        const browser = await puppeteer.launch({ 
          headless: 'new',
          devtools: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        
        const page = await browser.newPage();
        
        // Capture all console messages in detail
        page.on('console', msg => {
          const type = msg.type();
          console.log(`BROWSER [${type}]: ${msg.text()}`);
          logStream.write(`[BROWSER:${type}] ${msg.text()}\n`);
          
          // Log argument details for errors
          if (type === 'error' || type === 'warning') {
            msg.args().then(args => {
              args.forEach((arg, i) => {
                arg.jsonValue().then(val => {
                  try {
                    const detail = JSON.stringify(val, null, 2);
                    logStream.write(`[ARG ${i}] ${detail}\n`);
                  } catch (e) {
                    logStream.write(`[ARG ${i}] [Cannot stringify: ${e.message}]\n`);
                  }
                }).catch(e => {
                  logStream.write(`[ARG ${i}] [Error getting value: ${e.message}]\n`);
                });
              });
            }).catch(e => {
              logStream.write(`[ERROR ARGS] [Error getting args: ${e.message}]\n`);
            });
          }
        });
        
        // Capture uncaught exceptions
        page.on('pageerror', err => {
          console.error(`BROWSER EXCEPTION: ${err.message}`);
          logStream.write(`[PAGE ERROR] ${err.message}\n${err.stack || ''}\n`);
        });
        
        // Navigate to the app with increased timeout
        try {
          await page.goto(url, { 
            waitUntil: 'networkidle2', 
            timeout: 60000 
          });
          
          console.log('Page loaded, waiting for potential delayed errors...');
          
          // Wait longer to ensure all potential errors are captured
          await new Promise(resolve => setTimeout(resolve, 10000));
          
          // Take a screenshot
          await page.screenshot({ path: './ultra-minimal-screenshot.png', fullPage: true });
          console.log('Screenshot saved to ./ultra-minimal-screenshot.png');
          
          // Check what was rendered
          const renderedContent = await page.evaluate(() => {
            const rootElement = document.getElementById('root');
            const gridElement = document.querySelector('.ag-root-wrapper');
            
            return {
              rootHasChildren: rootElement && rootElement.children.length > 0,
              gridRendered: !!gridElement,
              bodyHTML: document.body.innerHTML.substring(0, 500) + '...' // First 500 chars
            };
          });
          
          console.log('\n===== Render Results =====');
          console.log(`Root has children: ${renderedContent.rootHasChildren}`);
          console.log(`AG Grid rendered: ${renderedContent.gridRendered}`);
          console.log('===========================\n');
          
          logStream.write('\n[RENDER RESULTS]\n');
          logStream.write(`Root has children: ${renderedContent.rootHasChildren}\n`);
          logStream.write(`AG Grid rendered: ${renderedContent.gridRendered}\n`);
          logStream.write(`Body HTML snippet: ${renderedContent.bodyHTML}\n`);
          
          // All done
          await browser.close();
          console.log('Test completed.');
          console.log(`Full logs written to: ${logFile}`);
          
          devServer.kill();
          process.exit(0);
        } catch (error) {
          console.error(`Navigation error: ${error.message}`);
          logStream.write(`[NAVIGATION ERROR] ${error.message}\n${error.stack}\n`);
          
          await browser.close();
          devServer.kill();
          process.exit(1);
        }
      } catch (error) {
        console.error(`Browser launch error: ${error.message}`);
        logStream.write(`[BROWSER LAUNCH ERROR] ${error.message}\n${error.stack}\n`);
        
        devServer.kill();
        process.exit(1);
      }
    }, 3000); // Wait 3 seconds before starting browser
  }
});

// Capture and log server errors
devServer.stderr.on('data', (data) => {
  const error = data.toString();
  console.error(`SERVER ERROR: ${error}`);
  logStream.write(`[SERVER ERROR] ${error}\n`);
});

// Kill everything if it takes too long
setTimeout(() => {
  console.error('Timeout waiting for test to complete');
  logStream.end();
  
  try {
    devServer.kill();
  } catch (e) {
    console.error(`Error killing dev server: ${e.message}`);
  }
  
  process.exit(1);
}, 60000);