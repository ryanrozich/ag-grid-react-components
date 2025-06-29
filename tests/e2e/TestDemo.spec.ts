import { test, expect } from "@playwright/test";
import { TEST_GRID_ID } from "../../src/demo/constants";
import { TEST_RECORDS } from "../fixtures/testData";
import {
  getRowData,
  getDisplayedRowCount,
  applyDateFilter,
} from "../../src/test-utils/agGridTestUtils";

// Test data
const testData = TEST_RECORDS.MEDIUM;
const dateColumnId = "date";

// Helper function to get a date string in YYYY-MM-DD format
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

test.describe("TestDemo", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto("/demo");
    // Wait for the grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000); // Give time for data to load
  });

  test("should display the correct number of rows", async ({ page }) => {
    // Get the displayed row count
    const rowCount = await page.evaluate((gridId) => {
      return getDisplayedRowCount(gridId);
    }, TEST_GRID_ID);

    // Verify the row count matches our test data
    expect(rowCount).toBe(testData.length);
  });

  test("should filter by exact date", async ({ page }) => {
    // Get the first date from the test data
    const testDate = new Date(testData[0].date);
    const dateString = formatDate(testDate);

    // Apply the date filter
    await applyDateFilter(
      page,
      TEST_GRID_ID,
      dateColumnId,
      "equals",
      dateString,
    );

    // Get the filtered rows
    const filteredData = await page.evaluate((gridId) => {
      return getRowData(gridId);
    }, TEST_GRID_ID);

    // Verify all displayed rows match the filtered date
    const filteredCount = testData.filter((item) => {
      const itemDate = new Date(item.date);
      return formatDate(itemDate) === dateString;
    }).length;

    expect(filteredData.length).toBe(filteredCount);
    filteredData.forEach((row) => {
      expect(formatDate(new Date((row as any).date))).toBe(dateString);
    });
  });

  test("should filter by date range", async ({ page }) => {
    // Get the min and max dates from the test data
    const dates = testData.map((item) => new Date(item.date).getTime());
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    // Set a range that should include some but not all dates
    const startDate = new Date(minDate);
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(maxDate);
    endDate.setDate(endDate.getDate() - 1);

    // Apply the date range filter
    await applyDateFilter(
      page,
      TEST_GRID_ID,
      dateColumnId,
      "inRange",
      formatDate(startDate),
      formatDate(endDate),
    );

    // Get the filtered rows
    const filteredData = await page.evaluate((gridId) => {
      return getRowData(gridId);
    }, TEST_GRID_ID);

    // Verify all displayed rows are within the date range
    filteredData.forEach((row) => {
      const rowDate = new Date((row as any).date).getTime();
      expect(rowDate).toBeGreaterThanOrEqual(startDate.getTime());
      expect(rowDate).toBeLessThanOrEqual(endDate.getTime());
    });
  });

  test("should clear all filters", async ({ page }) => {
    // First apply a filter
    const testDate = new Date(testData[0].date);
    const dateString = formatDate(testDate);

    await applyDateFilter(
      page,
      TEST_GRID_ID,
      dateColumnId,
      "equals",
      dateString,
    );

    // Verify the filter is applied
    const filteredCountBefore = await page.evaluate((gridId) => {
      return getDisplayedRowCount(gridId);
    }, TEST_GRID_ID);

    expect(filteredCountBefore).toBeLessThan(testData.length);

    // Clear all filters
    await page.click('button:has-text("Clear All Filters")');

    // Verify all rows are displayed
    const rowCountAfter = await page.evaluate((gridId) => {
      return getDisplayedRowCount(gridId);
    }, TEST_GRID_ID);

    expect(rowCountAfter).toBe(testData.length);
  });

  test("should toggle pagination", async ({ page }) => {
    // Enable pagination
    await page.click('button:has-text("Enable Pagination")');

    // Verify pagination controls are visible
    const paginationControls = await page.locator(".ag-paging-panel");
    await expect(paginationControls).toBeVisible();

    // Disable pagination
    await page.click('button:has-text("Disable Pagination")');

    // Verify pagination controls are hidden
    await expect(paginationControls).not.toBeVisible();
  });
});
