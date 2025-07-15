import { test, expect } from "@playwright/test";

test.describe("SavedViewsManager Test", () => {
  test("should work without crashing", async ({ page }) => {
    // Navigate to the demo page
    await page.goto("http://localhost:5173/demo");

    // Wait for the grid to load
    await page.waitForSelector(".ag-root", { timeout: 30000 });

    // Wait for the grid API to be ready
    await page.waitForTimeout(2000);

    // Check if SavedViewsManager button exists
    const savedViewsBtn = page.locator('button:has-text("Saved Views")');
    await expect(savedViewsBtn).toBeVisible({ timeout: 10000 });

    // Click the button to open dropdown
    await savedViewsBtn.click();

    // Check if dropdown opens without errors
    const dropdown = page.locator('h3:has-text("Saved Views")');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    // Check if Save Current button exists
    const saveCurrentBtn = page.locator('button:has-text("Save Current")');
    await expect(saveCurrentBtn).toBeVisible();

    // Click Save Current
    await saveCurrentBtn.click();

    // Check if save dialog opens
    const saveDialog = page.locator('h2:has-text("Save Current View")');
    await expect(saveDialog).toBeVisible({ timeout: 5000 });

    // Fill in the form
    const viewNameInput = page.locator(
      'input[placeholder="e.g., High Priority Tasks"]',
    );
    await viewNameInput.fill("Test View");

    // Save the view
    const saveBtn = page.locator('button:has-text("Save View")').last();
    await saveBtn.click();

    // Wait for dialog to close
    await expect(saveDialog).not.toBeVisible({ timeout: 5000 });

    // Reopen dropdown
    await savedViewsBtn.click();

    // Check if the saved view appears
    const savedView = page.locator('span:has-text("Test View")');
    await expect(savedView).toBeVisible({ timeout: 5000 });

    console.log("✅ SavedViewsManager is working correctly!");
  });
});
