import { test } from "@playwright/test";

test("debug save dialog on client-side demo", async ({ page }) => {
  // Navigate to demo
  await page.goto("http://localhost:5174/demo");
  await page.waitForLoadState("networkidle");

  // Stay on Client-Side Data tab (default)
  await page.waitForTimeout(2000);

  // Look for SavedViewsManager on Client-Side
  const triggers = await page.locator("[data-saved-views-trigger]").all();
  console.log(`Found ${triggers.length} SavedViewsManager triggers`);

  if (triggers.length > 0) {
    // Click the first trigger
    await triggers[0].click();
    await page.waitForTimeout(1000);

    // Look for Save button
    const saveButtons = await page.locator('[data-action="save"]').all();
    console.log(`Found ${saveButtons.length} save buttons`);
    
    if (saveButtons.length > 0) {
      // Click the visible save button
      for (const btn of saveButtons) {
        if (await btn.isVisible()) {
          await btn.click();
          break;
        }
      }
      
      await page.waitForTimeout(1000);
      
      // Check if dialog opened
      const dialog = await page.locator("[data-save-view-dialog]").count();
      console.log("Save dialog found:", dialog);
      
      if (dialog > 0) {
        // Fill in the form
        await page.fill("[data-field-input]", "Test View Name");
        
        // Try to interact with category selector
        const categoryInput = await page.locator("#view-category").count();
        console.log("Category input found:", categoryInput);
        
        if (categoryInput > 0) {
          const currentValue = await page.inputValue("#view-category");
          console.log("Current category value:", currentValue);
          
          // Try different ways to open the dropdown
          await page.focus("#view-category");
          await page.waitForTimeout(500);
          
          // Type to trigger search
          await page.fill("#view-category", "");
          await page.type("#view-category", "Rep");
          await page.waitForTimeout(500);
          
          // Check for dropdown
          const dropdown = await page.locator("#category-dropdown").count();
          console.log("Dropdown visible after typing:", dropdown);
          
          if (dropdown > 0) {
            const options = await page.locator("#category-dropdown [role='option']").all();
            console.log(`Found ${options.length} options in dropdown`);
          }
        }
      }
    }
  }

  await page.screenshot({ path: 'client-side-save-debug.png', fullPage: true });
});