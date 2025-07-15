import { test, expect } from "@playwright/test";

test.describe("SavedViewsManager Basic", () => {
  test("should render without crashing", async ({ page }) => {
    // Navigate to the demo page
    await page.goto("http://localhost:5174/demo");

    // Wait for the grid to load
    await page.waitForSelector(".ag-root", { timeout: 30000 });

    // Check if SavedViewsManager button exists
    const savedViewsBtn = page.locator('button:has-text("Saved Views")');
    await expect(savedViewsBtn).toBeVisible({ timeout: 10000 });

    // Click the button to open dropdown
    await savedViewsBtn.click();

    // Check if dropdown opens
    const dropdown = page.locator('h3:has-text("Saved Views")');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    // Check if Save Current button exists
    const saveCurrentBtn = page.locator('button:has-text("Save Current")');
    await expect(saveCurrentBtn).toBeVisible();

    // Take screenshot for debugging
    await page.screenshot({
      path: "test-results/saved-views-manager.png",
      fullPage: true,
    });
  });
});
