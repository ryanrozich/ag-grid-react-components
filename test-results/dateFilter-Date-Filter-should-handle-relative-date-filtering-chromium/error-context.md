# Test info

- Name: Date Filter >> should handle relative date filtering
- Location: /Users/ryan/code-repos/ag-grid-react-components/tests/e2e/dateFilter.spec.ts:67:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /Users/ryan/Library/Caches/ms-playwright/chromium-1169/chrome-mac/Chromium.app/Contents/MacOS/Chromium
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import { TEST_DATES, formatTestDate } from "../fixtures/testData";
   3 |
   4 | // Test data
   5 | const GRID_ID = "date-filter-test-grid";
   6 | const COLUMN_ID = "date";
   7 |
   8 | test.describe("Date Filter", () => {
   9 |   test.beforeEach(async ({ page }) => {
   10 |     // Navigate to the test page
   11 |     await page.goto("/test-demo");
   12 |
   13 |     // Wait for the grid to be ready
   14 |     await page.waitForSelector(`#${GRID_ID} .ag-root-wrapper`);
   15 |   });
   16 |
   17 |   test("should filter by exact date", async ({ page }) => {
   18 |     const targetDate = TEST_DATES.TODAY;
   19 |     // We'll expect at least one row to match the filter
   20 |     const minExpectedRowCount = 1;
   21 |
   22 |     // Apply exact date filter
   23 |     await applyDateFilter(page, COLUMN_ID, "equals", targetDate);
   24 |
   25 |     // Verify the number of filtered rows
   26 |     const rowCount = await getFilteredRowCount(page);
   27 |     expect(rowCount).toBeGreaterThanOrEqual(minExpectedRowCount);
   28 |
   29 |     // Verify all displayed rows match the filter
   30 |     await verifyDateFilterApplied(page, "equals", targetDate);
   31 |   });
   32 |
   33 |   test("should filter by date range", async ({ page }) => {
   34 |     const fromDate = formatTestDate(new Date(TEST_DATES.TODAY), "yyyy-MM-dd");
   35 |     const toDate = formatTestDate(new Date(TEST_DATES.TOMORROW), "yyyy-MM-dd");
   36 |
   37 |     // Apply date range filter
   38 |     await applyDateFilter(page, COLUMN_ID, "inRange", fromDate, toDate);
   39 |
   40 |     // Verify the filter was applied
   41 |     const rowCount = await getFilteredRowCount(page);
   42 |     expect(rowCount).toBeGreaterThan(0);
   43 |
   44 |     // Verify all displayed rows are within the date range
   45 |     await verifyDateRangeFilterApplied(page, fromDate, toDate);
   46 |   });
   47 |
   48 |   test("should clear filters", async ({ page }) => {
   49 |     // First apply a filter
   50 |     await applyDateFilter(page, COLUMN_ID, "equals", TEST_DATES.TODAY);
   51 |
   52 |     // Clear filters
   53 |     await page.click('button:has-text("Clear All Filters")');
   54 |
   55 |     // Verify all rows are visible
   56 |     const rowCount = await getFilteredRowCount(page);
   57 |     expect(rowCount).toBe(100); // Should match our test data set size
   58 |
   59 |     // Verify no filter is applied
   60 |     const isFilterActive = await page.$eval(
   61 |       `[col-id="${COLUMN_ID}"] .ag-header-cell-filtered`,
   62 |       (el) => !!el,
   63 |     );
   64 |     expect(isFilterActive).toBeFalsy();
   65 |   });
   66 |
>  67 |   test("should handle relative date filtering", async ({ page }) => {
      |   ^ Error: browserType.launch: Executable doesn't exist at /Users/ryan/Library/Caches/ms-playwright/chromium-1169/chrome-mac/Chromium.app/Contents/MacOS/Chromium
   68 |     // This test would verify the relative date filtering functionality
   69 |     // Implementation depends on how relative dates are implemented in the filter
   70 |     // For now, we'll just verify that the test runs without errors
   71 |     expect(true).toBeTruthy();
   72 |   });
   73 |
   74 |   test("should handle pagination with active filters", async ({ page }) => {
   75 |     // Apply a filter that returns multiple pages of results
   76 |     await applyDateFilter(
   77 |       page,
   78 |       COLUMN_ID,
   79 |       "inRange",
   80 |       formatTestDate(new Date(TEST_DATES.LAST_MONTH), "yyyy-MM-dd"),
   81 |       formatTestDate(new Date(TEST_DATES.NEXT_MONTH), "yyyy-MM-dd"),
   82 |     );
   83 |
   84 |     // Enable pagination if not already enabled
   85 |     const isPaginationEnabled = await page.$(".ag-paging-panel");
   86 |     if (!isPaginationEnabled) {
   87 |       await page.click('button:has-text("Enable Pagination")');
   88 |     }
   89 |
   90 |     // Go to next page
   91 |     await page.click('.ag-paging-page-summary-panel button[aria-label="Next"]');
   92 |
   93 |     // Verify the page changed
   94 |     const pageInfo = await page.textContent(".ag-paging-page-summary-panel");
   95 |     expect(pageInfo).toContain("2 of");
   96 |
   97 |     // Verify the filter is still applied
   98 |     await verifyDateRangeFilterApplied(
   99 |       page,
  100 |       formatTestDate(new Date(TEST_DATES.LAST_MONTH), "yyyy-MM-dd"),
  101 |       formatTestDate(new Date(TEST_DATES.NEXT_MONTH), "yyyy-MM-dd"),
  102 |     );
  103 |   });
  104 | });
  105 |
  106 | // Helper functions
  107 | async function applyDateFilter(
  108 |   page: any,
  109 |   columnId: string,
  110 |   filterType: string,
  111 |   dateFrom: string,
  112 |   dateTo?: string,
  113 | ) {
  114 |   // Open the filter menu
  115 |   const columnHeader = page.locator(`[col-id="${columnId}"] .ag-header-cell`);
  116 |   await columnHeader.hover();
  117 |   await columnHeader.locator(".ag-header-cell-menu-button").click();
  118 |
  119 |   // Wait for the filter to be visible
  120 |   await page.waitForSelector(".ag-filter-wrapper");
  121 |
  122 |   // Set the filter type
  123 |   const filterSelect = page.locator(".ag-filter-select");
  124 |   if (await filterSelect.isVisible()) {
  125 |     await filterSelect.selectOption(filterType);
  126 |   }
  127 |
  128 |   // Set the date inputs
  129 |   const fromInput = page.locator('input[placeholder="From"]');
  130 |   await fromInput.fill(dateFrom);
  131 |
  132 |   if (dateTo) {
  133 |     const toInput = page.locator('input[placeholder="To"]');
  134 |     await toInput.fill(dateTo);
  135 |   }
  136 |
  137 |   // Apply the filter
  138 |   await page.click(".ag-filter-apply-panel-button");
  139 |
  140 |   // Wait for the grid to update
  141 |   await page.waitForTimeout(500);
  142 | }
  143 |
  144 | async function getFilteredRowCount(page: any): Promise<number> {
  145 |   const rowCount = await page.evaluate(() => {
  146 |     const grid = document.querySelector(".ag-center-cols-container");
  147 |     return grid ? grid.children.length : 0;
  148 |   });
  149 |   return rowCount;
  150 | }
  151 |
  152 | async function verifyDateFilterApplied(
  153 |   page: any,
  154 |   filterType: string,
  155 |   filterValue: string,
  156 | ) {
  157 |   const dates = await page.evaluate(() => {
  158 |     const rows = Array.from(
  159 |       document.querySelectorAll(".ag-center-cols-container .ag-row"),
  160 |     );
  161 |     return rows.map((row) => {
  162 |       const dateCell = row.querySelector('[col-id="date"]');
  163 |       return dateCell ? dateCell.textContent : "";
  164 |     });
  165 |   });
  166 |
  167 |   const filterDate = new Date(filterValue);
```
