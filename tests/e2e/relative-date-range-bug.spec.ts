import { test, expect } from "@playwright/test";

/**
 * This test documents a bug where the "to" field in relative date range filters
 * disappears after selecting or typing a value.
 *
 * Steps to reproduce:
 * 1. Open date filter
 * 2. Switch to "Relative" mode
 * 3. Select "In Range" filter type
 * 4. Type or select a value in the "to" field
 * 5. The value disappears immediately
 *
 * GitHub Issue: TBD
 */
test.describe("Relative Date Range Bug", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
    await page.waitForTimeout(1000); // Give time for grid to fully render
  });

  test("to field value disappears in relative date range filter", async ({
    page,
  }) => {
    // Find the date column header
    const dateHeader = page
      .locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper')
      .first();

    // Open the filter menu
    await dateHeader.hover();
    await dateHeader.locator(".ag-header-cell-menu-button").click();
    await page.waitForTimeout(500);

    // Get the filter panel
    const filterPanel = page.locator(".ag-filter").first();
    await expect(filterPanel).toBeVisible();

    // Switch to Relative mode
    const relativeButton = filterPanel.locator('button:has-text("Relative")');
    await relativeButton.click();
    await page.waitForTimeout(200);

    // Select "In Range" filter type
    const filterTypeDropdown = filterPanel.locator("select").first();
    await filterTypeDropdown.selectOption({ label: "In Range" });
    await page.waitForTimeout(200);

    // Find the from and to inputs
    const fromInput = filterPanel
      .locator('input[placeholder*="Today"]')
      .first();
    const toInput = filterPanel
      .locator('input[placeholder*="Today+30d"]')
      .first();

    // Verify both inputs are visible
    await expect(fromInput).toBeVisible();
    await expect(toInput).toBeVisible();

    // Type in the from field first (this should work)
    await fromInput.fill("Today");
    await page.waitForTimeout(200);
    await expect(fromInput).toHaveValue("Today");

    // Now type in the to field - THIS IS WHERE THE BUG OCCURS
    await toInput.fill("Today+7d");
    await page.waitForTimeout(200);

    // BUG: The value should remain but it disappears
    // This assertion will fail, documenting the bug
    await expect(toInput).toHaveValue("Today+7d");

    // Also test with autocomplete selection
    await toInput.clear();
    await toInput.click();
    await toInput.type("Today");

    // Wait for suggestions to appear
    await page.waitForSelector('[role="listbox"]', { timeout: 2000 });

    // Click on a suggestion
    const suggestion = page.locator('[role="option"]').first();
    await suggestion.click();
    await page.waitForTimeout(200);

    // BUG: The selected value should remain but it disappears
    await expect(toInput).not.toHaveValue("");
  });

  test("documents current behavior - to field clears immediately", async ({
    page,
  }) => {
    // This test documents the actual buggy behavior

    // Open date filter and switch to relative in range
    const dateHeader = page
      .locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper')
      .first();
    await dateHeader.hover();
    await dateHeader.locator(".ag-header-cell-menu-button").click();
    await page.waitForTimeout(500);

    const filterPanel = page.locator(".ag-filter").first();
    await filterPanel.locator('button:has-text("Relative")').click();
    await filterPanel
      .locator("select")
      .first()
      .selectOption({ label: "In Range" });

    const toInput = filterPanel
      .locator('input[placeholder*="Today+30d"]')
      .first();

    // Type a value
    await toInput.fill("Today+14d");

    // Give it a moment to process
    await page.waitForTimeout(500);

    // Document that the field is empty (the bug)
    const actualValue = await toInput.inputValue();
    console.log("To field value after typing:", actualValue);

    // This will pass, documenting the buggy behavior
    await expect(toInput).toHaveValue("");
  });
});
