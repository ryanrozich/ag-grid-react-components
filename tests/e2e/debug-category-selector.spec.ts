import { test } from "@playwright/test";

test("debug category selector", async ({ page }) => {
  // Monitor console
  page.on("console", (msg) => {
    console.log(`Browser console ${msg.type()}: ${msg.text()}`);
  });

  page.on("pageerror", (error) => {
    console.error("Page error:", error.message);
  });

  // Navigate to demo
  await page.goto("http://localhost:5174/demo");
  await page.waitForLoadState("networkidle");

  // Go to Server-Side Data tab
  await page.click('button:has-text("Server-Side Data")');
  await page.waitForTimeout(2000);

  // Open SavedViewsManager
  await page.click("[data-saved-views-trigger]");
  await page.waitForTimeout(1000);

  // Click Save Current button
  await page.click('[data-action="save"]');
  await page.waitForTimeout(1000);

  // Check for category selector
  const categorySelector = await page.locator("#view-category").count();
  console.log("Category selector input found:", categorySelector);

  // Try to click on the category selector
  if (categorySelector > 0) {
    const input = page.locator("#view-category");
    
    // Try different interaction methods
    console.log("Trying focus on input...");
    await input.focus();
    await page.waitForTimeout(500);
    
    // Check if dropdown appeared after focus
    let dropdownFound = await page.locator("#category-dropdown").count();
    console.log("Dropdown after focus:", dropdownFound);
    
    if (!dropdownFound) {
      console.log("Trying click on input...");
      await input.click();
      await page.waitForTimeout(500);
      dropdownFound = await page.locator("#category-dropdown").count();
      console.log("Dropdown after click:", dropdownFound);
    }
    
    // Check all portal containers
    const portalContainers = [
      "#category-selector-portal",
      "#saved-views-dialog-portal",
      "[id$='-portal']"
    ];
    
    for (const selector of portalContainers) {
      const elements = await page.locator(selector).all();
      console.log(`Portal ${selector}: ${elements.length} found`);
      for (const el of elements) {
        const content = await el.textContent();
        if (content) {
          console.log(`  Content: ${content.substring(0, 100)}...`);
        }
      }
    }
    
    // Look for dropdown with various selectors
    const dropdownSelectors = [
      "#category-dropdown",
      "[data-testid='category-dropdown']",
      "[role='listbox']",
      ".category-dropdown"
    ];
    
    for (const selector of dropdownSelectors) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        console.log(`Found dropdown with selector: ${selector}`);
        const isVisible = await page.locator(selector).first().isVisible();
        console.log(`  Visible: ${isVisible}`);
        const boundingBox = await page.locator(selector).first().boundingBox();
        console.log(`  Position:`, boundingBox);
      }
    }
  }

  await page.screenshot({ path: 'category-selector-debug.png', fullPage: true });
});