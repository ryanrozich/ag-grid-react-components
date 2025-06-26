import { test, expect } from "@playwright/test";

test.describe("Quick Filters", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for the grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });

    // Wait for data to load
    await page.waitForTimeout(1000);
  });

  test("should have default filter applied on load", async ({ page }) => {
    // Wait a bit for the default filter to be applied
    await page.waitForTimeout(1500);

    // Check that the first quick filter dropdown shows "Last 7 Days" as selected
    const firstDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await expect(firstDropdown.locator("button").first()).toContainText(
      "Last 7 Days",
    );

    // Check that there are active filters displayed
    const activeFilters = page.locator('[data-testid="active-filters"]');
    await expect(activeFilters).toBeVisible();

    // Verify the filter is working by checking row count
    const rowCount = await page.locator(".ag-row").count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThan(25); // Should be filtered, not showing all 1000 rows
  });

  test("should filter by time period", async ({ page }) => {
    // Click on the first quick filter dropdown
    const firstDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await firstDropdown.locator("button").first().click();

    // Wait for dropdown menu to be visible
    await page.waitForSelector('[role="listbox"]', { state: "visible" });

    // Select "This Month"
    await page
      .locator('[role="option"]')
      .filter({ hasText: "This Month" })
      .click();

    // Verify the dropdown shows the new selection
    await expect(firstDropdown.locator("button").first()).toContainText(
      "This Month",
    );

    // Verify row count changed
    const rowCount = await page.locator(".ag-row").count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test("should filter by Overdue tasks", async ({ page }) => {
    // Click on the first quick filter dropdown
    const firstDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await firstDropdown.locator("button").first().click();

    // Select "Overdue"
    await page
      .locator('[role="option"]')
      .filter({ hasText: "Overdue" })
      .click();

    // Verify the dropdown shows the new selection
    await expect(firstDropdown.locator("button").first()).toContainText(
      "Overdue",
    );

    // Verify that no "Done" status tasks are shown
    const statusCells = await page
      .locator('.ag-cell[col-id="status"]')
      .allTextContents();

    // Check that none of the visible statuses are "Done"
    for (const status of statusCells) {
      expect(status).not.toBe("Done");
    }
  });

  test("should filter by Not Started tasks", async ({ page }) => {
    // Click on the first quick filter dropdown
    const firstDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await firstDropdown.locator("button").first().click();

    // Select "Not Started"
    await page
      .locator('[role="option"]')
      .filter({ hasText: "Not Started" })
      .click();

    // Verify the dropdown shows the new selection
    await expect(firstDropdown.locator("button").first()).toContainText(
      "Not Started",
    );

    // Verify that only "Backlog" or "Todo" status tasks are shown
    const statusCells = await page
      .locator('.ag-cell[col-id="status"]')
      .allTextContents();

    // Check that all visible statuses are either "Backlog" or "Todo"
    for (const status of statusCells) {
      expect(["Backlog", "Todo"]).toContain(status);
    }
  });

  test("should filter by task type", async ({ page }) => {
    // Click on the second quick filter dropdown (task type)
    const secondDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .nth(1);
    await secondDropdown.locator("button").first().click();

    // Wait for dropdown menu to be visible
    await page.waitForSelector('[role="listbox"]', { state: "visible" });

    // Select "Critical Bugs"
    await page
      .locator('[role="option"]')
      .filter({ hasText: "Critical Bugs" })
      .click();

    // Verify the dropdown shows the new selection
    await expect(secondDropdown.locator("button").first()).toContainText(
      "Critical Bugs",
    );

    // Verify that only Bug category with Critical/High priority are shown
    const categoryCells = await page
      .locator('.ag-cell[col-id="category"]')
      .allTextContents();
    const priorityCells = await page
      .locator('.ag-cell[col-id="priority"]')
      .allTextContents();

    // Check categories are all "Bug"
    for (const category of categoryCells) {
      expect(category).toBe("Bug");
    }

    // Check priorities are either "Critical" or "High"
    for (const priority of priorityCells) {
      expect(["Critical", "High"]).toContain(priority);
    }
  });

  test("should clear all filters", async ({ page }) => {
    // Wait for default filter first
    await page.waitForTimeout(1500);

    // Apply another filter
    const firstDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await firstDropdown.locator("button").first().click();
    await page
      .locator('[role="option"]')
      .filter({ hasText: "Overdue" })
      .click();

    // Wait for filter to apply
    await page.waitForTimeout(1000);

    // Verify filter is applied
    await expect(firstDropdown.locator("button").first()).toContainText(
      "Overdue",
    );

    // Clear the filter by selecting "All Time"
    await firstDropdown.locator("button").first().click();
    await page
      .locator('[role="option"]')
      .filter({ hasText: "All Time" })
      .click();

    // Wait for filter to clear
    await page.waitForTimeout(1000);

    // Verify the dropdown shows "All Time"
    await expect(firstDropdown.locator("button").first()).toContainText(
      "All Time",
    );

    // Active filters should not be visible
    const activeFilters = page.locator('[data-testid="active-filters"]');
    await expect(activeFilters).not.toBeVisible();
  });

  test("should combine time and task type filters", async ({ page }) => {
    // Apply time filter
    const firstDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await firstDropdown.locator("button").first().click();
    await page
      .locator('[role="option"]')
      .filter({ hasText: "This Month" })
      .click();

    // Apply task type filter
    const secondDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .nth(1);
    await secondDropdown.locator("button").first().click();
    await page
      .locator('[role="option"]')
      .filter({ hasText: "Features" })
      .click();

    // Verify both filters are applied
    await expect(firstDropdown.locator("button").first()).toContainText(
      "This Month",
    );
    await expect(secondDropdown.locator("button").first()).toContainText(
      "Features",
    );

    // Verify that only Feature category tasks are shown
    const categoryCells = await page
      .locator('.ag-cell[col-id="category"]')
      .allTextContents();
    for (const category of categoryCells) {
      expect(category).toBe("Feature");
    }

    // There should be fewer rows due to combined filters
    const rowCount = await page.locator(".ag-row").count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThan(10); // Combined filters should show very few rows
  });

  test("should update stats when filters are applied", async ({ page }) => {
    // Get initial task count
    const initialTaskCount = await page
      .locator('p:has-text("Number of Tasks") + p')
      .textContent();
    const initialCount = parseInt(initialTaskCount?.replace(/,/g, "") || "0");

    // Apply a filter
    const firstDropdown = page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await firstDropdown.locator("button").first().click();
    await page
      .locator('[role="option"]')
      .filter({ hasText: "Overdue" })
      .click();

    // Wait for grid to update
    await page.waitForTimeout(500);

    // Get new task count
    const newTaskCount = await page
      .locator('p:has-text("Number of Tasks") + p')
      .textContent();
    const newCount = parseInt(newTaskCount?.replace(/,/g, "") || "0");

    // Task count should decrease when filter is applied
    expect(newCount).toBeLessThan(initialCount);
    expect(newCount).toBeGreaterThan(0);
  });
});
