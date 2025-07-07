#!/usr/bin/env node

/**
 * This script performs a thorough validation of the demo application.
 * It checks that:
 * 1. The page loads without errors
 * 2. The AG Grid component renders
 * 3. The filters are visible and clickable
 * 4. No JS errors appear in the console
 */

import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { ensureProjectRoot } from '../utils/ensure-project-root.mjs';

// Ensure we're in the project root
ensureProjectRoot('thorough-demo-check.js');

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Log file for console output
const logFile = path.join(logsDir, 'browser-console.log');
const logStream = fs.createWriteStream(logFile, { flags: 'w' });

// Start the dev server
console.log('Starting dev server...');
const devServer = spawn('npm', ['run', 'dev'], { 
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true 
});

// Store console logs and errors
let consoleMessages = [];
let consoleErrors = [];

// Flag to track errors
let hasErrors = false;

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
      const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      const page = await browser.newPage();
      
      // Log all console messages
      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        
        // Write to log file
        logStream.write(`[${type}] ${text}\n`);
        
        // Store in memory
        consoleMessages.push({ type, text });
        
        // If error, flag it
        if (
          type === 'error' || 
          text.includes('Uncaught') || 
          text.includes('does not provide an export') ||
          text.includes('Cannot find')
        ) {
          consoleErrors.push(text);
          console.error(`Browser console error: ${text}`);
          hasErrors = true;
        }
      });
      
      // Enable more verbose error logging
      page.on('pageerror', (err) => {
        console.error(`Page Error: ${err.message}`);
        console.error(err.stack);
      });
      
      page.on('error', (err) => {
        console.error(`Browser Error: ${err.message}`);
        console.error(err.stack);
      });
      
      // Navigate to dev server with full page load and more time
      await page.goto(url, { 
        waitUntil: ['networkidle2', 'load', 'domcontentloaded'], 
        timeout: 60000 
      });
      
      // Wait for grid to render
      console.log('Waiting for grid to render...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Take a screenshot
      await page.screenshot({ path: './demo-screenshot.png', fullPage: true });
      console.log('Screenshot saved to ./demo-screenshot.png');
      
      // Check if grid rendered
      console.log('Checking for grid elements...');
      const gridExists = await page.evaluate(() => {
        // Check if key elements exist
        const gridElement = document.querySelector('.ag-root-wrapper');
        const headerElement = document.querySelector('.ag-header');
        const rowElements = document.querySelectorAll('.ag-row');
        
        return {
          gridFound: !!gridElement,
          headerFound: !!headerElement,
          rowCount: rowElements.length,
          headerText: Array.from(document.querySelectorAll('.ag-header-cell')).map(el => el.textContent)
        };
      });
      
      // Check filter buttons
      console.log('Checking for filter elements...');
      const filterElements = await page.evaluate(() => {
        // Look for filter-related elements
        const filterButtons = document.querySelectorAll('.ag-header-cell-menu-button');
        const floatingFilterElements = document.querySelectorAll('.ag-floating-filter');
        
        return {
          filterButtonCount: filterButtons.length,
          floatingFilterCount: floatingFilterElements.length
        };
      });
      
      // Log results
      console.log('\n==== Validation Results ====');
      console.log(`Grid container found: ${gridExists.gridFound ? 'YES' : 'NO'}`);
      console.log(`Headers found: ${gridExists.headerFound ? 'YES' : 'NO'}`);
      console.log(`Row count: ${gridExists.rowCount}`);
      console.log(`Header cells: ${gridExists.headerText.join(', ')}`);
      console.log(`Filter buttons: ${filterElements.filterButtonCount}`);
      console.log(`Floating filters: ${filterElements.floatingFilterCount}`);
      console.log(`Console errors: ${consoleErrors.length}`);
      console.log('==========================\n');
      
      // Analyze any issues
      if (!gridExists.gridFound) {
        console.error('ERROR: Grid container not found');
        hasErrors = true;
      }
      
      if (!gridExists.headerFound) {
        console.error('ERROR: Grid headers not found');
        hasErrors = true;
      }
      
      if (gridExists.rowCount === 0) {
        console.error('ERROR: No rows rendered in the grid');
        hasErrors = true;
      }
      
      if (filterElements.filterButtonCount === 0) {
        console.error('ERROR: No filter buttons found');
        hasErrors = true;
      }
      
      // Try clicking a filter button if available
      if (filterElements.filterButtonCount > 0) {
        console.log('Attempting to click a filter button...');
        
        try {
          // Click the first filter button
          await page.click('.ag-header-cell-menu-button');
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Take a screenshot with filter menu open
          await page.screenshot({ path: './demo-filter-open.png', fullPage: true });
          console.log('Filter menu screenshot saved to ./demo-filter-open.png');
          
          // Check if filter menu appeared
          const filterMenuVisible = await page.evaluate(() => {
            const filterMenu = document.querySelector('.ag-menu');
            return !!filterMenu;
          });
          
          console.log(`Filter menu appeared: ${filterMenuVisible ? 'YES' : 'NO'}`);
          
          if (!filterMenuVisible) {
            console.error('ERROR: Filter menu did not appear when button clicked');
            hasErrors = true;
          }
        } catch (e) {
          console.error('ERROR: Failed to click filter button:', e.message);
          hasErrors = true;
        }
      }
      
      // All console errors have been logged to console and file
      if (consoleErrors.length > 0) {
        console.error(`Found ${consoleErrors.length} console errors. See ${logFile} for details.`);
        hasErrors = true;
      } else {
        console.log('No JavaScript errors in console');
      }
      
      // Close browser
      await browser.close();
      
      // Close log file
      logStream.end();
      
      // Kill dev server
      devServer.kill();
      
      if (hasErrors) {
        console.error('❌ Validation failed. See errors above.');
        process.exit(1);
      } else {
        console.log('✅ All checks passed!');
        process.exit(0);
      }
    } catch (error) {
      console.error('Error running browser tests:', error);
      logStream.end();
      devServer.kill();
      process.exit(1);
    }
  }
});

// Set a timeout to kill the server after a while
setTimeout(() => {
  console.error('Timeout waiting for dev server');
  logStream.end();
  devServer.kill();
  process.exit(1);
}, 60000);