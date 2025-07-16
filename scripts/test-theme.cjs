const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to demo page...');
  await page.goto('http://localhost:5174/demo');
  
  // Wait for grid to load
  await page.waitForSelector('.ag-root-wrapper', { timeout: 10000 });
  await page.waitForTimeout(3000);
  
  // Take a full screenshot
  await page.screenshot({ 
    path: 'theme-test-screenshot.png',
    fullPage: false 
  });
  
  console.log('Screenshot saved to theme-test-screenshot.png');
  
  // Check if dark theme styles are applied
  const hasTheme = await page.evaluate(() => {
    const grid = document.querySelector('.ag-root-wrapper');
    if (!grid) return false;
    
    const bgColor = window.getComputedStyle(grid).backgroundColor;
    console.log('Grid background color:', bgColor);
    
    // Check for AG Grid CSS variables
    const root = document.documentElement;
    const agBgColor = getComputedStyle(root).getPropertyValue('--ag-background-color');
    console.log('--ag-background-color:', agBgColor);
    
    return true;
  });
  
  console.log('Theme check result:', hasTheme);
  
  // Try to open the date filter
  const dueDateHeader = page.locator('.ag-header-cell[col-id="dueDate"]');
  if (await dueDateHeader.count() > 0) {
    await dueDateHeader.hover();
    await page.waitForTimeout(1000);
    
    const menuButton = dueDateHeader.locator('.ag-header-cell-menu-button').first();
    if (await menuButton.count() > 0) {
      await menuButton.click();
      await page.waitForTimeout(1000);
      
      // Click on the Filter tab
      const filterTab = page.locator('.ag-tab:has-text("Filter")');
      if (await filterTab.count() > 0) {
        await filterTab.click();
        await page.waitForTimeout(1000);
      }
      
      await page.screenshot({ 
        path: 'theme-test-filter-screenshot.png',
        fullPage: false 
      });
      console.log('Filter screenshot saved');
    }
  }
  
  await browser.close();
})();