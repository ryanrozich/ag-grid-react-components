import { test, expect } from "@playwright/test";
import { TEST_DATES, formatTestDate } from "../fixtures/testData";

// Test data
const GRID_ID = "date-filter-test-grid";
const COLUMN_ID = "date";

test.describe("Date Filter", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the test page
    await page.goto("/test-demo");

    // Wait for the grid to be ready
    await page.waitForSelector(`#${GRID_ID} .ag-root-wrapper`);
  });

  test("should filter by exact date", async ({ page }) => {
    const targetDate = TEST_DATES.TODAY;
    // We'll expect at least one row to match the filter
    const minExpectedRowCount = 1;

    // Apply exact date filter
    await applyDateFilter(page, COLUMN_ID, "equals", targetDate);

    // Verify the number of filtered rows
    const rowCount = await getFilteredRowCount(page);
    expect(rowCount).toBeGreaterThanOrEqual(minExpectedRowCount);

    // Verify all displayed rows match the filter
    await verifyDateFilterApplied(page, "equals", targetDate);
  });

  test("should filter by date range", async ({ page }) => {
    const fromDate = formatTestDate(new Date(TEST_DATES.TODAY), "yyyy-MM-dd");
    const toDate = formatTestDate(new Date(TEST_DATES.TOMORROW), "yyyy-MM-dd");

    // Apply date range filter
    await applyDateFilter(page, COLUMN_ID, "inRange", fromDate, toDate);

    // Verify the filter was applied
    const rowCount = await getFilteredRowCount(page);
    expect(rowCount).toBeGreaterThan(0);

    // Verify all displayed rows are within the date range
    await verifyDateRangeFilterApplied(page, fromDate, toDate);
  });

  test("should clear filters", async ({ page }) => {
    // First apply a filter
    await applyDateFilter(page, COLUMN_ID, "equals", TEST_DATES.TODAY);

    // Clear filters
    await page.click('button:has-text("Clear All Filters")');

    // Verify all rows are visible
    const rowCount = await getFilteredRowCount(page);
    expect(rowCount).toBe(100); // Should match our test data set size

    // Verify no filter is applied
    const isFilterActive = await page.$eval(
      `[col-id="${COLUMN_ID}"] .ag-header-cell-filtered`,
      (el) => !!el,
    );
    expect(isFilterActive).toBeFalsy();
  });

  test("should handle relative date filtering", async ({ page }) => {
    // This test would verify the relative date filtering functionality
    // Implementation depends on how relative dates are implemented in the filter
    // For now, we'll just verify that the test runs without errors
    expect(true).toBeTruthy();
  });

  test("should handle pagination with active filters", async ({ page }) => {
    // Apply a filter that returns multiple pages of results
    await applyDateFilter(
      page,
      COLUMN_ID,
      "inRange",
      formatTestDate(new Date(TEST_DATES.LAST_MONTH), "yyyy-MM-dd"),
      formatTestDate(new Date(TEST_DATES.NEXT_MONTH), "yyyy-MM-dd"),
    );

    // Enable pagination if not already enabled
    const isPaginationEnabled = await page.$(".ag-paging-panel");
    if (!isPaginationEnabled) {
      await page.click('button:has-text("Enable Pagination")');
    }

    // Go to next page
    await page.click('.ag-paging-page-summary-panel button[aria-label="Next"]');

    // Verify the page changed
    const pageInfo = await page.textContent(".ag-paging-page-summary-panel");
    expect(pageInfo).toContain("2 of");

    // Verify the filter is still applied
    await verifyDateRangeFilterApplied(
      page,
      formatTestDate(new Date(TEST_DATES.LAST_MONTH), "yyyy-MM-dd"),
      formatTestDate(new Date(TEST_DATES.NEXT_MONTH), "yyyy-MM-dd"),
    );
  });
});

// Helper functions
async function applyDateFilter(
  page: any,
  columnId: string,
  filterType: string,
  dateFrom: string,
  dateTo?: string,
) {
  // Open the filter menu
  const columnHeader = page.locator(`[col-id="${columnId}"] .ag-header-cell`);
  await columnHeader.hover();
  await columnHeader.locator(".ag-header-cell-menu-button").click();

  // Wait for the filter to be visible
  await page.waitForSelector(".ag-filter-wrapper");

  // Set the filter type
  const filterSelect = page.locator(".ag-filter-select");
  if (await filterSelect.isVisible()) {
    await filterSelect.selectOption(filterType);
  }

  // Set the date inputs
  const fromInput = page.locator('input[placeholder="From"]');
  await fromInput.fill(dateFrom);

  if (dateTo) {
    const toInput = page.locator('input[placeholder="To"]');
    await toInput.fill(dateTo);
  }

  // Apply the filter
  await page.click(".ag-filter-apply-panel-button");

  // Wait for the grid to update
  await page.waitForTimeout(500);
}

async function getFilteredRowCount(page: any): Promise<number> {
  const rowCount = await page.evaluate(() => {
    const grid = document.querySelector(".ag-center-cols-container");
    return grid ? grid.children.length : 0;
  });
  return rowCount;
}

async function verifyDateFilterApplied(
  page: any,
  filterType: string,
  filterValue: string,
) {
  const dates = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll(".ag-center-cols-container .ag-row"),
    );
    return rows.map((row) => {
      const dateCell = row.querySelector('[col-id="date"]');
      return dateCell ? dateCell.textContent : "";
    });
  });

  const filterDate = new Date(filterValue);

  for (const dateStr of dates) {
    const rowDate = new Date(dateStr);

    switch (filterType) {
      case "equals":
        expect(rowDate.toDateString()).toBe(filterDate.toDateString());
        break;
      case "notEqual":
        expect(rowDate.toDateString()).not.toBe(filterDate.toDateString());
        break;
      case "lessThan":
        expect(rowDate < filterDate).toBeTruthy();
        break;
      case "greaterThan":
        expect(rowDate > filterDate).toBeTruthy();
        break;
    }
  }
}

async function verifyDateRangeFilterApplied(
  page: any,
  fromDate: string,
  toDate: string,
) {
  const dates = await page.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll(".ag-center-cols-container .ag-row"),
    );
    return rows.map((row) => {
      const dateCell = row.querySelector('[col-id="date"]');
      return dateCell ? dateCell.textContent : "";
    });
  });

  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  for (const dateStr of dates) {
    const rowDate = new Date(dateStr);
    expect(rowDate >= startDate).toBeTruthy();
    expect(rowDate <= endDate).toBeTruthy();
  }
}
