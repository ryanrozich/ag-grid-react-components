# Test info

- Name: TestDemo >> should clear all filters
- Location: /Users/ryan/code-repos/ag-grid-react-components/tests/e2e/TestDemo.spec.ts:103:3

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
   3 | import { TEST_RECORDS } from "../fixtures/testData";
   4 | import {
   5 |   getRowData,
   6 |   getDisplayedRowCount,
   7 |   applyDateFilter,
   8 | } from "../../src/test-utils/agGridTestUtils";
   9 |
   10 | // Test data
   11 | const testData = TEST_RECORDS.MEDIUM;
   12 | const dateColumnId = "date";
   13 |
   14 | // Helper function to get a date string in YYYY-MM-DD format
   15 | const formatDate = (date: Date): string => {
   16 |   return date.toISOString().split("T")[0];
   17 | };
   18 |
   19 | test.describe("TestDemo", () => {
   20 |   test.beforeEach(async ({ page }) => {
   21 |     // Navigate to the test page
   22 |     await page.goto("http://localhost:3000/test-demo");
   23 |     // Wait for the grid to be ready
   24 |     await page.waitForSelector(".ag-root-wrapper");
   25 |   });
   26 |
   27 |   test("should display the correct number of rows", async ({ page }) => {
   28 |     // Get the displayed row count
   29 |     const rowCount = await page.evaluate((gridId) => {
   30 |       return getDisplayedRowCount(gridId);
   31 |     }, TEST_GRID_ID);
   32 |
   33 |     // Verify the row count matches our test data
   34 |     expect(rowCount).toBe(testData.length);
   35 |   });
   36 |
   37 |   test("should filter by exact date", async ({ page }) => {
   38 |     // Get the first date from the test data
   39 |     const testDate = new Date(testData[0].date);
   40 |     const dateString = formatDate(testDate);
   41 |
   42 |     // Apply the date filter
   43 |     await applyDateFilter(
   44 |       page,
   45 |       TEST_GRID_ID,
   46 |       dateColumnId,
   47 |       "equals",
   48 |       dateString,
   49 |     );
   50 |
   51 |     // Get the filtered rows
   52 |     const filteredData = await page.evaluate((gridId) => {
   53 |       return getRowData(gridId);
   54 |     }, TEST_GRID_ID);
   55 |
   56 |     // Verify all displayed rows match the filtered date
   57 |     const filteredCount = testData.filter((item) => {
   58 |       const itemDate = new Date(item.date);
   59 |       return formatDate(itemDate) === dateString;
   60 |     }).length;
   61 |
   62 |     expect(filteredData.length).toBe(filteredCount);
   63 |     filteredData.forEach((row) => {
   64 |       expect(formatDate(new Date(row.date))).toBe(dateString);
   65 |     });
   66 |   });
   67 |
   68 |   test("should filter by date range", async ({ page }) => {
   69 |     // Get the min and max dates from the test data
   70 |     const dates = testData.map((item) => new Date(item.date).getTime());
   71 |     const minDate = new Date(Math.min(...dates));
   72 |     const maxDate = new Date(Math.max(...dates));
   73 |
   74 |     // Set a range that should include some but not all dates
   75 |     const startDate = new Date(minDate);
   76 |     startDate.setDate(startDate.getDate() + 1);
   77 |     const endDate = new Date(maxDate);
   78 |     endDate.setDate(endDate.getDate() - 1);
   79 |
   80 |     // Apply the date range filter
   81 |     await applyDateFilter(
   82 |       page,
   83 |       TEST_GRID_ID,
   84 |       dateColumnId,
   85 |       "inRange",
   86 |       formatDate(startDate),
   87 |       formatDate(endDate),
   88 |     );
   89 |
   90 |     // Get the filtered rows
   91 |     const filteredData = await page.evaluate((gridId) => {
   92 |       return getRowData(gridId);
   93 |     }, TEST_GRID_ID);
   94 |
   95 |     // Verify all displayed rows are within the date range
   96 |     filteredData.forEach((row) => {
   97 |       const rowDate = new Date(row.date).getTime();
   98 |       expect(rowDate).toBeGreaterThanOrEqual(startDate.getTime());
   99 |       expect(rowDate).toBeLessThanOrEqual(endDate.getTime());
  100 |     });
  101 |   });
  102 |
> 103 |   test("should clear all filters", async ({ page }) => {
      |   ^ Error: browserType.launch: Executable doesn't exist at /Users/ryan/Library/Caches/ms-playwright/chromium-1169/chrome-mac/Chromium.app/Contents/MacOS/Chromium
  104 |     // First apply a filter
  105 |     const testDate = new Date(testData[0].date);
  106 |     const dateString = formatDate(testDate);
  107 |
  108 |     await applyDateFilter(
  109 |       page,
  110 |       TEST_GRID_ID,
  111 |       dateColumnId,
  112 |       "equals",
  113 |       dateString,
  114 |     );
  115 |
  116 |     // Verify the filter is applied
  117 |     const filteredCountBefore = await page.evaluate((gridId) => {
  118 |       return getDisplayedRowCount(gridId);
  119 |     }, TEST_GRID_ID);
  120 |
  121 |     expect(filteredCountBefore).toBeLessThan(testData.length);
  122 |
  123 |     // Clear all filters
  124 |     await page.click('button:has-text("Clear All Filters")');
  125 |
  126 |     // Verify all rows are displayed
  127 |     const rowCountAfter = await page.evaluate((gridId) => {
  128 |       return getDisplayedRowCount(gridId);
  129 |     }, TEST_GRID_ID);
  130 |
  131 |     expect(rowCountAfter).toBe(testData.length);
  132 |   });
  133 |
  134 |   test("should toggle pagination", async ({ page }) => {
  135 |     // Enable pagination
  136 |     await page.click('button:has-text("Enable Pagination")');
  137 |
  138 |     // Verify pagination controls are visible
  139 |     const paginationControls = await page.locator(".ag-paging-panel");
  140 |     await expect(paginationControls).toBeVisible();
  141 |
  142 |     // Disable pagination
  143 |     await page.click('button:has-text("Disable Pagination")');
  144 |
  145 |     // Verify pagination controls are hidden
  146 |     await expect(paginationControls).not.toBeVisible();
  147 |   });
  148 | });
  149 |
```
