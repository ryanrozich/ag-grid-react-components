import { test, expect } from "@playwright/test";

test.describe("DateFilter Complete Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto("/");

    // Wait for the grid to load
    await page.waitForSelector(".ag-theme-quartz", { timeout: 10000 });

    // Navigate to demo tab if needed
    const demoTab = page.locator('button:has-text("Demo")');
    if (await demoTab.isVisible()) {
      await demoTab.click();
      await page.waitForTimeout(500);
    }
  });

  test("DateFilter applies filters correctly", async ({ page }) => {
    // Open the Due Date column menu
    const dueDateHeader = page
      .locator(".ag-header-cell")
      .filter({ hasText: "Due Date" });
    await dueDateHeader.hover();

    // Click the menu button
    const menuButton = dueDateHeader.locator(".ag-header-cell-menu-button");
    await menuButton.click();

    // Click on Filter menu item
    const filterMenuItem = page
      .locator(".ag-menu-option")
      .filter({ hasText: "Filter" });
    await filterMenuItem.click();

    // Wait for the date filter to appear
    await page.waitForSelector('[data-component="date-filter"]');

    // Select "After" filter type
    const filterTypeButton = page.locator(
      '[data-component="date-filter-type-trigger"]',
    );
    await filterTypeButton.click();

    const afterOption = page
      .locator('[data-component="date-filter-type-option"]')
      .filter({ hasText: "After" });
    await afterOption.click();

    // Enter a relative date
    const dateInput = page.locator('[data-component="date-filter-input"]');
    await dateInput.fill("today-7d");

    // Apply the filter
    const applyButton = page.locator(
      '[data-component="date-filter-apply-button"]',
    );
    await applyButton.click();

    // Wait for filter to be applied
    await page.waitForTimeout(500);

    // Verify the filter is shown in active filters
    const activeFilter = page.locator('[data-component="active-filters-item"]');
    await expect(activeFilter).toBeVisible();

    // Verify the filter value is displayed correctly
    const filterValue = page.locator('[data-component="active-filters-value"]');
    await expect(filterValue).toContainText("today-7d");

    // Verify grid is actually filtered (row count should be reduced)
    const rowCount = await page.locator(".ag-row").count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThan(100); // Assuming we have 100 total rows
  });

  test("DateFilter shows current state when applied from presets", async ({
    page,
  }) => {
    // Set up console log monitoring for infinite loop detection
    const consoleLogs: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleLogs.push(msg.text());
      }
    });

    // Click the quick filter dropdown
    const presetDropdown = page
      .locator('[data-component="quick-filter-trigger"]')
      .first();
    await expect(presetDropdown).toBeVisible();
    await presetDropdown.click();

    // Wait for dropdown to open
    await page.waitForSelector(
      '[data-component="quick-filter-dropdown-content"]',
    );

    // Click on "Last 7 days" option
    const last7DaysOption = page
      .locator('[data-component="quick-filter-option"]')
      .filter({ hasText: "Last 7 days" });
    await last7DaysOption.click();

    // Wait for filter to be applied
    await page.waitForTimeout(1000);

    // Verify no infinite loop
    const gridStateSaves = consoleLogs.filter((log) =>
      log.includes("Grid state saved to URL"),
    ).length;
    expect(gridStateSaves).toBeLessThan(5);

    // Verify the filter is shown in active filters
    const activeFilter = page.locator('[data-component="active-filters-item"]');
    await expect(activeFilter).toBeVisible();

    // Click on the active filter pill to edit it
    await activeFilter.click();

    // Wait for the date filter dropdown to open
    await page.waitForSelector('[data-component="date-filter"]', {
      state: "visible",
    });

    // Verify the filter shows the current state
    const filterTypeDisplay = page.locator(
      '[data-component="date-filter-type-display"]',
    );
    await expect(filterTypeDisplay).toContainText("After");

    const dateInput = page.locator('[data-component="date-filter-input"]');
    await expect(dateInput).toHaveValue("today-7d");
  });

  test("Active filter pills are clickable and open filter UI", async ({
    page,
  }) => {
    // Apply a filter first using saved views
    const savedViewsDropdown = page
      .locator('[data-component="saved-views-trigger"]')
      .first();
    if (await savedViewsDropdown.isVisible()) {
      await savedViewsDropdown.click();

      // Look for any saved view with filters
      const savedViewOption = page
        .locator('[data-component="saved-views-option"]')
        .first();
      if (await savedViewOption.isVisible()) {
        await savedViewOption.click();
        await page.waitForTimeout(500);
      }
    } else {
      // Fallback: use quick filter
      const presetDropdown = page
        .locator('[data-component="quick-filter-trigger"]')
        .first();
      await presetDropdown.click();
      const last7DaysOption = page
        .locator('[data-component="quick-filter-option"]')
        .filter({ hasText: "Last 7 days" });
      await last7DaysOption.click();
      await page.waitForTimeout(500);
    }

    // Find an active filter pill
    const activeFilter = page
      .locator('[data-component="active-filters-item"]')
      .first();
    await expect(activeFilter).toBeVisible();

    // Verify it has pointer cursor style
    const cursor = await activeFilter.evaluate(
      (el) => window.getComputedStyle(el).cursor,
    );
    expect(cursor).toBe("pointer");

    // Click on the filter pill
    await activeFilter.click();

    // Verify the filter UI opens (either as a floating filter or column menu)
    const filterUI = page.locator(
      '[data-component="date-filter"], .ag-theme-quartz .ag-menu',
    );
    await expect(filterUI).toBeVisible({ timeout: 5000 });
  });

  test("Multiple filter operations do not cause performance issues", async ({
    page,
  }) => {
    // Monitor performance
    const startTime = Date.now();

    // Apply and remove filters multiple times
    for (let i = 0; i < 3; i++) {
      // Apply filter via quick filter
      const presetDropdown = page
        .locator('[data-component="quick-filter-trigger"]')
        .first();
      await presetDropdown.click();

      const filterOption = page
        .locator('[data-component="quick-filter-option"]')
        .nth(i % 3);
      await filterOption.click();

      await page.waitForTimeout(300);

      // Clear filters
      const clearButton = page.locator(
        '[data-component="active-filters-clear-all"]',
      );
      if (await clearButton.isVisible()) {
        await clearButton.click();
        await page.waitForTimeout(300);
      }
    }

    // Verify operation completed in reasonable time
    const endTime = Date.now();
    const duration = endTime - startTime;
    expect(duration).toBeLessThan(10000); // Should complete in less than 10 seconds

    // Verify grid is still responsive
    const grid = page.locator(".ag-theme-quartz");
    await expect(grid).toBeVisible();
  });
});
