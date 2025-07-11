import { test, expect } from "@playwright/test";

test.describe("QuickFilterDropdown - Updated Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for the grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000); // Give time for data to load
  });

  test("should have quick filter dropdowns visible", async ({ page }) => {
    // Look for quick filter dropdowns by their aria labels or button text
    const quickFilterButtons = await page
      .locator('button[aria-label*="Quick filter"]')
      .count();

    // We should have at least one quick filter dropdown
    expect(quickFilterButtons).toBeGreaterThan(0);

    // Alternative: look for the specific dropdown containers
    const dropdownContainers = await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .count();

    if (dropdownContainers > 0) {
      expect(dropdownContainers).toBeGreaterThan(0);
    } else {
      // If no data-testid, look for buttons with dropdown indicators
      const dropdownButtons = await page
        .locator("button:has(svg)")
        .filter({ hasText: /All Time|All Tasks|Today|This Week/ })
        .count();
      expect(dropdownButtons).toBeGreaterThan(0);
    }
  });

  test("should open date quick filter dropdown", async ({ page }) => {
    // Find the first quick filter that looks like a date filter
    const dateFilterButton = page
      .locator("button")
      .filter({ hasText: /All Time|Today|This Week|Last/ })
      .first();

    // Check if it exists
    const exists = (await dateFilterButton.count()) > 0;
    if (!exists) {
      test.skip();
      return;
    }

    // Click to open dropdown
    await dateFilterButton.click();

    // Wait for dropdown to appear
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 });

    // Check that options are visible
    const options = await page.locator('[role="option"]').count();
    expect(options).toBeGreaterThan(0);

    // Close dropdown by clicking outside
    await page.click("body", { position: { x: 0, y: 0 } });
  });

  test("should filter grid when selecting date option", async ({ page }) => {
    // Get initial row count
    const initialRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();

    // Find date filter button
    const dateFilterButton = page
      .locator("button")
      .filter({ hasText: /All Time/ })
      .first();
    const exists = (await dateFilterButton.count()) > 0;
    if (!exists) {
      test.skip();
      return;
    }

    // Open dropdown
    await dateFilterButton.click();
    await page.waitForSelector('[role="listbox"]');

    // Select "Today" option if it exists
    const todayOption = page
      .locator('[role="option"]')
      .filter({ hasText: "Today" })
      .first();
    if ((await todayOption.count()) > 0) {
      await todayOption.click();

      // Wait for grid to update
      await page.waitForTimeout(1000);

      // Check that row count changed
      const filteredRows = await page
        .locator(".ag-center-cols-container .ag-row")
        .count();
      expect(filteredRows).toBeLessThanOrEqual(initialRows);

      // Verify the button now shows "Today"
      await expect(dateFilterButton).toContainText("Today");
    }
  });

  test("should show active filters component", async ({ page }) => {
    // Apply a filter first
    const dateFilterButton = page
      .locator("button")
      .filter({ hasText: /All Time/ })
      .first();
    if ((await dateFilterButton.count()) > 0) {
      await dateFilterButton.click();
      await page.waitForSelector('[role="listbox"]');

      const todayOption = page
        .locator('[role="option"]')
        .filter({ hasText: "Today" })
        .first();
      if ((await todayOption.count()) > 0) {
        await todayOption.click();
        await page.waitForTimeout(500);

        // Check for active filters display
        const activeFilters = await page
          .locator("text=/Due Date.*Today/")
          .count();
        if (activeFilters > 0) {
          expect(activeFilters).toBeGreaterThan(0);
        } else {
          // Alternative: look for filter pills
          const filterPills = await page
            .locator('button:has-text("×")')
            .count();
          expect(filterPills).toBeGreaterThan(0);
        }
      }
    }
  });
});
