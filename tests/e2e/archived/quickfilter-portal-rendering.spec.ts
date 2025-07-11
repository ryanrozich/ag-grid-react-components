import { test, expect } from "@playwright/test";

/**
 * This test prevents regression of the QuickFilterDropdown rendering issue
 * where dropdowns were being clipped by parent containers with overflow: hidden.
 * The fix was to add usePortal="always" to the QuickFilterDropdown components.
 */
test.describe("QuickFilterDropdown Portal Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
    await page.waitForTimeout(1000); // Give time for grid to fully render
  });

  test("should render dropdown using portal without clipping", async ({
    page,
  }) => {
    // Wait for the quick filter dropdowns to be visible
    const dateFilter = page.locator('button:has-text("All Time")').first();
    const taskFilter = page.locator('button:has-text("Task type")').first();

    // Check that the quick filter buttons exist
    await expect(dateFilter).toBeVisible({ timeout: 10000 });
    await expect(taskFilter).toBeVisible({ timeout: 10000 });

    // Click the date filter dropdown
    await dateFilter.click();

    // Wait for dropdown to open
    await page.waitForTimeout(500);

    // Check that the dropdown menu is visible and not clipped
    const dropdownMenu = page.locator('#quick-filter-dropdown[role="listbox"]');
    await expect(dropdownMenu).toBeVisible();

    // Get the bounding boxes to ensure dropdown is not clipped
    const dropdownBox = await dropdownMenu.boundingBox();
    const viewportSize = page.viewportSize();

    // Verify dropdown is within viewport (not clipped)
    expect(dropdownBox).toBeTruthy();
    if (dropdownBox && viewportSize) {
      expect(dropdownBox.x).toBeGreaterThanOrEqual(0);
      expect(dropdownBox.y).toBeGreaterThanOrEqual(0);
      expect(dropdownBox.x + dropdownBox.width).toBeLessThanOrEqual(
        viewportSize.width,
      );
      // Y position can extend below viewport for scrolling
    }

    // Check that options are visible
    const lastSevenDays = page.locator('text="Last 7 Days"').first();
    const thisMonth = page.locator('text="This Month"').first();

    await expect(lastSevenDays).toBeVisible();
    await expect(thisMonth).toBeVisible();

    // Click outside to close
    await page.click("body", { position: { x: 0, y: 0 } });
    await page.waitForTimeout(200);

    // Test the task type filter as well
    await taskFilter.click();
    await page.waitForTimeout(500);

    const taskDropdownMenu = page.locator(
      '#quick-filter-dropdown[role="listbox"]',
    );
    await expect(taskDropdownMenu).toBeVisible();

    // Check task filter options
    const allTasks = page.locator('text="All Tasks"').first();
    const criticalBugs = page.locator('text="Critical Bugs"').first();

    await expect(allTasks).toBeVisible();
    await expect(criticalBugs).toBeVisible();
  });

  test("should apply filter when option is selected from portal-rendered dropdown", async ({
    page,
  }) => {
    // Click the date filter
    const dateFilter = page.locator('button:has-text("All Time")').first();
    await dateFilter.click();
    await page.waitForTimeout(500);

    // Click "Last 7 Days"
    const lastSevenDays = page.locator('text="Last 7 Days"').first();
    await lastSevenDays.click();

    // Wait for filter to be applied
    await page.waitForTimeout(1000);

    // Check that the button text updated
    await expect(dateFilter).toContainText("Last 7 Days");

    // Verify rows are filtered (should be less than total)
    const rows = page.locator(".ag-row");
    const rowCount = await rows.count();

    // There should be some filtering applied (less than 1000 rows)
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThan(1000);
  });
});
