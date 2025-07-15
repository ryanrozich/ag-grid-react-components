import { test } from "@playwright/test";

test.describe("SavedViewsManager Debug", () => {
  test("debug saved views elements", async ({ page }) => {
    // Navigate to demo
    await page.goto("http://localhost:5174/demo");
    await page.waitForLoadState("networkidle");

    // Click Server-Side Data tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait a bit for content to load
    await page.waitForTimeout(2000);

    // Debug - print what we can find
    const triggers = await page.locator("[data-saved-views-trigger]").count();
    console.log(`Found ${triggers} saved views triggers`);

    const buttons = await page.locator("button").all();
    for (const button of buttons) {
      const text = await button.textContent();
      console.log(`Button: ${text}`);
    }

    // Look for any saved views related elements
    const savedViewsElements = await page
      .locator('[class*="saved"], [data-*="saved"]')
      .all();
    console.log(
      `Found ${savedViewsElements.length} saved views related elements`,
    );

    // Take screenshot
    await page.screenshot({ path: "saved-views-debug.png", fullPage: true });
  });
});
