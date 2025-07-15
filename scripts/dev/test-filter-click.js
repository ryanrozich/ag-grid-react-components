#!/usr/bin/env node

/**
 * This script tests specifically clicking on the filter icon to ensure
 * our custom date filter opens properly
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
const logFile = path.join(logsDir, 'filter-click-test.log');
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
    console.log(`Testing filter at ${url}`);

    // Wait a bit to make sure server is fully ready
    setTimeout(async () => {
      try {
        // Launch browser
        const browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();

        // Capture all console messages
        page.on('console', msg => {
          const type = msg.type();
          console.log(`BROWSER [${type}]: ${msg.text()}`);
          logStream.write(`[BROWSER:${type}] ${msg.text()}\n`);
        });

        // Navigate to the app
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 60000
        });

        console.log('Page loaded, waiting a bit...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Take a before screenshot
        await page.screenshot({ path: './before-filter-click.png', fullPage: true });
        console.log('Before screenshot captured');

        // Find and click the filter button for the Date (Object) column
        console.log('Looking for filter button...');

        // First, wait for the grid to be fully loaded
        await page.waitForSelector('.ag-root-wrapper:not(.ag-hidden)', { timeout: 10000 });
        console.log('Grid loaded');

        // Try multiple selectors to find the filter button
        const selectors = [
          'div[col-id="date"] .ag-header-cell-menu-button', // Standard menu button
          'div[col-id="date"] .ag-floating-filter-button', // Floating filter button
          'div[col-id="date"] .ag-header-cell-floating-filter', // General floating filter area
          'div[col-id="date"] .ag-header-icon.ag-header-cell-menu-button', // v33 specific
          'div[col-id="date"] .ag-header-cell-menu' // Another option
        ];

        // Try each selector until one works
        let filterButtonSelector = null;
        for (const selector of selectors) {
          const exists = await page.evaluate((sel) => {
            const el = document.querySelector(sel);
            return el && window.getComputedStyle(el).display !== 'none';
          }, selector);

          if (exists) {
            filterButtonSelector = selector;
            console.log(`Found filter button with selector: ${selector}`);
            break;
          }
        }

        if (!filterButtonSelector) {
          console.error('Could not find filter button with any selector');
          throw new Error('Filter button not found');
        }

        // Wait for filter buttons to be visible
        await page.waitForSelector(filterButtonSelector, { timeout: 5000 });

        // Hover over button first to make it more visible in screenshot
        await page.hover(filterButtonSelector);
        await page.screenshot({ path: './hover-on-filter.png', fullPage: true });

        // Click on filter button
        console.log('Clicking filter button...');
        await page.click(filterButtonSelector);

        // Wait a moment for filter to appear
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Take screenshot with filter open
        await page.screenshot({ path: './after-filter-click.png', fullPage: true });
        console.log('After screenshot captured');

        // Wait a bit more for any animations or async rendering
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if our custom filter is visible
        const filterExists = await page.evaluate(() => {
          // Try multiple ways to find our custom filter
          const customFilterEl = document.querySelector('[data-test-id="relative-date-filter"]');
          const customFilterAlt = document.querySelector('.ag-grid-date-filter');
          const customFilterAny = document.querySelector('.ag-filter-toolpanel-body div[aria-label*="Date"]');

          const floatingFilterEl = document.querySelector('[data-test-id="relative-date-floating-filter"]');
          const defaultFilterMenu = document.querySelector('.ag-menu');
          const anyFilterPanel = document.querySelector('.ag-menu, .ag-popup, .ag-filter-toolpanel');

          // Detailed information about visible custom filter
          const customFilterDetails = customFilterEl || customFilterAlt || customFilterAny;
          const customFilterInfo = customFilterDetails ? {
            tagName: customFilterDetails.tagName,
            id: customFilterDetails.id,
            className: customFilterDetails.className,
            isVisible: window.getComputedStyle(customFilterDetails).display !== 'none',
            parentVisible: customFilterDetails.parentElement ?
              window.getComputedStyle(customFilterDetails.parentElement).display !== 'none' : false,
            computedDisplay: window.getComputedStyle(customFilterDetails).display,
            computedVisibility: window.getComputedStyle(customFilterDetails).visibility,
            rect: customFilterDetails.getBoundingClientRect()
          } : null;

          return {
            customFilterVisible: (!!customFilterEl && window.getComputedStyle(customFilterEl).display !== 'none') ||
                                 (!!customFilterAlt && window.getComputedStyle(customFilterAlt).display !== 'none'),
            customFilterInfo,
            floatingFilterVisible: !!floatingFilterEl,
            defaultMenuVisible: !!defaultFilterMenu,
            anyFilterPanelVisible: !!anyFilterPanel,
            visiblePopups: document.querySelectorAll('.ag-popup').length,
            visibleElements: Array.from(document.querySelectorAll('.ag-popup-child:not([style*="display: none"]), .ag-filter, .ag-menu'))
              .map(el => ({
                className: el.className,
                id: el.id,
                dataTestId: el.getAttribute('data-test-id'),
                text: el.textContent?.trim().substring(0, 50) + '...'
              }))
          };
        });

        console.log('\n===== Filter Test Results =====');
        console.log(`Custom filter visible: ${filterExists.customFilterVisible}`);
        console.log(`Floating filter visible: ${filterExists.floatingFilterVisible}`);
        console.log(`Default menu visible: ${filterExists.defaultMenuVisible}`);
        console.log(`Any filter panel visible: ${filterExists.anyFilterPanelVisible}`);
        console.log(`Number of visible popups: ${filterExists.visiblePopups}`);

        // Log detailed custom filter info if available
        if (filterExists.customFilterInfo) {
          console.log('\nCustom Filter Details:');
          console.log(`  Tag: ${filterExists.customFilterInfo.tagName}`);
          console.log(`  Class: ${filterExists.customFilterInfo.className}`);
          console.log(`  Is Visible: ${filterExists.customFilterInfo.isVisible}`);
          console.log(`  Parent Visible: ${filterExists.customFilterInfo.parentVisible}`);
          console.log(`  Computed Display: ${filterExists.customFilterInfo.computedDisplay}`);
          console.log(`  Computed Visibility: ${filterExists.customFilterInfo.computedVisibility}`);
          console.log(`  Position: x=${filterExists.customFilterInfo.rect.x}, y=${filterExists.customFilterInfo.rect.y}, ` +
                     `width=${filterExists.customFilterInfo.rect.width}, height=${filterExists.customFilterInfo.rect.height}`);
        } else {
          console.log('\nNo custom filter element found');
        }

        console.log('\nVisible popup elements:');
        filterExists.visibleElements.forEach((el, i) => {
          console.log(`  ${i+1}. Class: ${el.className}, ID: ${el.id}, Data-test-id: ${el.dataTestId}`);
          console.log(`     Text: ${el.text}`);
        });
        console.log('=============================\n');

        // Log to file
        logStream.write('\n[FILTER TEST RESULTS]\n');
        logStream.write(`Custom filter visible: ${filterExists.customFilterVisible}\n`);
        logStream.write(`Floating filter visible: ${filterExists.floatingFilterVisible}\n`);
        logStream.write(`Default menu visible: ${filterExists.defaultMenuVisible}\n`);
        logStream.write(`Any filter panel visible: ${filterExists.anyFilterPanelVisible}\n`);
        logStream.write(`Number of visible popups: ${filterExists.visiblePopups}\n`);

        // Log detailed custom filter info if available
        if (filterExists.customFilterInfo) {
          logStream.write('\nCustom Filter Details:\n');
          logStream.write(`  Tag: ${filterExists.customFilterInfo.tagName}\n`);
          logStream.write(`  Class: ${filterExists.customFilterInfo.className}\n`);
          logStream.write(`  Is Visible: ${filterExists.customFilterInfo.isVisible}\n`);
          logStream.write(`  Parent Visible: ${filterExists.customFilterInfo.parentVisible}\n`);
          logStream.write(`  Computed Display: ${filterExists.customFilterInfo.computedDisplay}\n`);
          logStream.write(`  Computed Visibility: ${filterExists.customFilterInfo.computedVisibility}\n`);
          logStream.write(`  Position: x=${filterExists.customFilterInfo.rect.x}, y=${filterExists.customFilterInfo.rect.y}, ` +
                        `width=${filterExists.customFilterInfo.rect.width}, height=${filterExists.customFilterInfo.rect.height}\n`);
        } else {
          logStream.write('\nNo custom filter element found\n');
        }

        logStream.write('\nVisible popup elements:\n');
        filterExists.visibleElements.forEach((el, i) => {
          logStream.write(`  ${i+1}. Class: ${el.className}, ID: ${el.id}, Data-test-id: ${el.dataTestId}\n`);
          logStream.write(`     Text: ${el.text}\n`);
        });

        // All done
        await browser.close();
        console.log('Test completed.');
        console.log(`Full logs written to: ${logFile}`);

        devServer.kill();
        process.exit(0);
      } catch (error) {
        console.error(`Test error: ${error.message}`);
        logStream.write(`[TEST ERROR] ${error.message}\n${error.stack}\n`);

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