import { test } from "@playwright/test";

test("debug saved views dialog", async ({ page }) => {
  // Navigate to demo
  await page.goto("http://localhost:5174/demo");
  await page.waitForLoadState("networkidle");

  // Click Server-Side Data tab
  await page.click('button:has-text("Server-Side Data")');
  await page.waitForTimeout(2000);

  // Click saved views trigger
  await page.click("[data-saved-views-trigger]");
  await page.waitForTimeout(1000);

  // Check what elements are visible
  const panel = await page.locator("[data-saved-views-panel]").isVisible();
  console.log(`Panel visible: ${panel}`);

  // Find all buttons with data-action attribute
  const actionButtons = await page.locator("[data-action]").all();
  console.log(`Found ${actionButtons.length} action buttons`);

  for (const button of actionButtons) {
    const action = await button.getAttribute("data-action");
    const text = await button.textContent();
    const isVisible = await button.isVisible();
    console.log(`Action: ${action}, Text: ${text}, Visible: ${isVisible}`);
  }

  // Try clicking save button
  const saveButton = page.locator('[data-action="save"]').first();
  if (await saveButton.isVisible()) {
    console.log("Clicking save button...");
    await saveButton.click();
    await page.waitForTimeout(2000);

    // Check if dialog appeared
    const dialogVisible = await page
      .locator("[data-save-view-dialog]")
      .isVisible();
    console.log(`Dialog visible after click: ${dialogVisible}`);

    // Check for any dialog-like elements
    const dialogElements = await page
      .locator('[role="dialog"], [data-dialog], [class*="dialog"]')
      .all();
    console.log(`Found ${dialogElements.length} dialog-like elements`);
  }

  // Take screenshot
  await page.screenshot({
    path: "saved-views-dialog-debug.png",
    fullPage: true,
  });
});
