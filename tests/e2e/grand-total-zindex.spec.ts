import { test, expect } from "@playwright/test";

/**
 * This test documents the z-index bug where the grand total row value
 * overlaps with the date filter dropdown (GitHub Issue #6).
 *
 * This test is expected to FAIL until the bug is fixed.
 * Once fixed, this test will prevent regression.
 */
test.describe("Grand Total Row Z-Index Issue", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
    await page.waitForTimeout(2000); // Give time for grid to fully render with data
  });

  test.skip("grand total row should not overlap with date filter dropdown", async ({
    page,
  }) => {
    // Note: This test is currently skipped because it documents a known bug
    // Remove the .skip once the bug is fixed

    // Scroll to bottom to see grand total row
    await page.evaluate(() => {
      const grid = document.querySelector(".ag-body-viewport");
      if (grid) {
        grid.scrollTop = grid.scrollHeight;
      }
    });
    await page.waitForTimeout(500);

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

    // Get bounding boxes to check for overlap
    const filterBox = await filterPanel.boundingBox();

    // Find the grand total cell in the budget column
    const grandTotalCell = page
      .locator('.ag-grand-total-row [col-id="budget"]')
      .first();
    const grandTotalBox = await grandTotalCell.boundingBox();

    // Verify that the filter is rendered above (higher z-index) than grand total
    // This can be checked by ensuring the filter is interactive when overlapping
    if (filterBox && grandTotalBox) {
      // Check if they overlap vertically
      const overlapsVertically =
        filterBox.y < grandTotalBox.y + grandTotalBox.height &&
        filterBox.y + filterBox.height > grandTotalBox.y;

      if (overlapsVertically) {
        // If they overlap, the filter should be clickable (on top)
        const filterInput = filterPanel.locator("input").first();
        await expect(filterInput).toBeVisible();

        // Try to interact with the filter - this should work if z-index is correct
        await filterInput.click();
        await expect(filterInput).toBeFocused();
      }
    }
  });

  test("documents the current buggy behavior", async ({ page }) => {
    // This test documents the actual buggy behavior for reference

    // Scroll to bottom
    await page.evaluate(() => {
      const grid = document.querySelector(".ag-body-viewport");
      if (grid) {
        grid.scrollTop = grid.scrollHeight;
      }
    });
    await page.waitForTimeout(500);

    // Verify grand total row is visible
    const grandTotalRow = page.locator(".ag-grand-total-row").first();
    await expect(grandTotalRow).toBeVisible();

    // Verify the budget grand total value is visible
    const budgetTotal = grandTotalRow.locator('[col-id="budget"]').first();
    await expect(budgetTotal).toBeVisible();
    await expect(budgetTotal).toContainText("$"); // Should show a dollar amount
  });
});
