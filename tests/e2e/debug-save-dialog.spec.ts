import { test } from "@playwright/test";

test("debug save dialog component state", async ({ page }) => {
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

  // Add some debug logging to the page
  await page.evaluate(() => {
    // Log when save button is clicked
    const saveButton = document.querySelector('[data-action="save"]');
    if (saveButton) {
      console.log("Save button found:", saveButton);
      const originalClick = saveButton.click;
      saveButton.click = function () {
        console.log("Save button clicked!");
        return originalClick.apply(this, arguments);
      };
    }

    // Check if SavedViewsManager context is available
    const contextCheck = document.querySelector("[data-saved-views-panel]");
    console.log("Panel element:", contextCheck);
  });

  // Click save and check what happens
  console.log("Clicking save button...");
  await page.click('[data-action="save"]');
  await page.waitForTimeout(2000);

  // Check for any elements that might be the dialog
  const possibleDialogSelectors = [
    "[data-save-view-dialog]",
    "[role='dialog']",
    "[class*='dialog']",
    "[class*='modal']",
    "#saved-views-dialog-portal",
  ];

  for (const selector of possibleDialogSelectors) {
    const count = await page.locator(selector).count();
    if (count > 0) {
      console.log(`Found ${count} elements matching: ${selector}`);
      const element = page.locator(selector).first();
      const isVisible = await element.isVisible();
      console.log(`  - Visible: ${isVisible}`);
      const text = await element.textContent();
      console.log(`  - Text: ${text?.substring(0, 50)}...`);
    }
  }

  // Check if getCurrentState is returning null
  const apiCheck = await page.evaluate(() => {
    const trigger = document.querySelector("[data-saved-views-trigger]");
    console.log("Trigger element:", trigger);
    return !!trigger;
  });
  console.log("Trigger exists:", apiCheck);

  await page.screenshot({ path: "save-dialog-debug.png", fullPage: true });
});
