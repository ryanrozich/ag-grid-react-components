#!/usr/bin/env node

/**
 * This script runs a quick validation to ensure the demo works correctly.
 * It starts the dev server, uses Puppeteer to check the page, and looks for errors.
 */

const { spawn } = require('child_process');
const puppeteer = require('puppeteer');

// Flag to check if we found errors
let hasErrors = false;

// Start the dev server
console.log('Starting dev server...');
const devServer = spawn('npm', ['run', 'dev'], { 
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true 
});

// Store any errors that happen in the console
let consoleErrors = [];

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
    console.log(`Testing demo at ${url}`);
    
    try {
      // Launch browser and navigate to the page
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      
      // Log errors from the page
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const errorText = msg.text();
          consoleErrors.push(errorText);
          console.error(`Browser console error: ${errorText}`);
          hasErrors = true;
        }
      });
      
      // Navigate to dev server
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      // Check if the grid is rendered
      const gridExists = await page.evaluate(() => {
        const grid = document.querySelector('.ag-root');
        return !!grid;
      });
      
      if (!gridExists) {
        console.error('Error: Grid not rendered on the page');
        hasErrors = true;
      } else {
        console.log('Success: Grid is rendered on the page');
      }
      
      // Check if specific AG Grid errors appeared
      const hasAgGridErrors = consoleErrors.some(error => 
        error.includes('AG Grid: error') || 
        error.includes('does not provide an export named')
      );
      
      if (hasAgGridErrors) {
        console.error('Error: AG Grid errors detected in console');
        hasErrors = true;
      } else {
        console.log('Success: No AG Grid errors in console');
      }
      
      // Close browser
      await browser.close();
      
      // Kill dev server and exit
      devServer.kill();
      
      if (hasErrors) {
        process.exit(1);
      } else {
        console.log('Demo validation successful');
        process.exit(0);
      }
    } catch (error) {
      console.error('Error running browser tests:', error);
      devServer.kill();
      process.exit(1);
    }
  }
});

// Set a timeout to kill the server after a while
setTimeout(() => {
  console.error('Timeout waiting for dev server');
  devServer.kill();
  process.exit(1);
}, 60000);