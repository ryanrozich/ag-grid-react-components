# Test info

- Name: Date Filter >> should handle pagination with active filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/dateFilter.spec.ts:75:3

# Error details

```
Error: locator.hover: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[col-id="date"] .ag-header-cell')

    at applyDateFilter (/Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/dateFilter.spec.ts:117:22)
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/dateFilter.spec.ts:77:11
```

# Page snapshot

```yaml
- banner:
  - heading "AG Grid React Components" [level=1]
  - navigation:
    - link "Home":
      - /url: /
    - link "Demo":
      - /url: /demo
    - link "Docs":
      - /url: /docs
  - img
  - text: MIT License
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "38"
- img
- paragraph: Total Budget
- paragraph: $178,125
- img
- paragraph: Progress
- paragraph: 53.7%
- img
- paragraph: Budget Remaining
- paragraph: $95,945
- text: 1 to 25 of 39. Page 1 of 2
- grid:
  - rowgroup:
    - row "ID Task Name Category Priority Assignee Due Date Budget Status Progress":
      - columnheader "ID"
      - columnheader "Task Name"
      - columnheader "Category"
      - columnheader "Priority"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "Budget"
      - columnheader "Status"
      - columnheader "Progress"
  - rowgroup:
    - row "439 [DATA-1439] Add brute force protection (Tech Debt) 🔒 Security Critical Isabella Garcia Isabella Garcia 6/27/2025 $5,625 In Progress 44%":
      - gridcell "439"
      - gridcell "[DATA-1439] Add brute force protection (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/27/2025"
      - gridcell "$5,625"
      - gridcell "In Progress"
      - gridcell "44%"
    - row "776 [INFRA-1776] Implement secure file upload (Sprint 26) 🔒 Security Critical Michael Anderson Michael Anderson 6/27/2025 $6,275 In Progress 39%":
      - gridcell "776"
      - gridcell "[INFRA-1776] Implement secure file upload (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/27/2025"
      - gridcell "$6,275"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "371 [WEB-1371] Add export to PDF functionality (Sprint 26) ✨ Feature Critical Chris Martinez Chris Martinez 6/26/2025 $18,375 Blocked 16%":
      - gridcell "371"
      - gridcell "[WEB-1371] Add export to PDF functionality (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/26/2025"
      - gridcell "$18,375"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "584 [MOBILE-1584] Implement secrets management (Q2 Planning) 🔧 DevOps Critical Emma Davis Emma Davis 6/25/2025 $975 In Progress 42%":
      - gridcell "584"
      - gridcell "[MOBILE-1584] Implement secrets management (Q2 Planning)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/25/2025"
      - gridcell "$975"
      - gridcell "In Progress"
      - gridcell "42%"
    - row "969 [DATA-1969] Implement service workers (Sprint 23) ⚡ Performance Critical John Robinson John Robinson 6/25/2025 $575 In Progress 45%":
      - gridcell "969"
      - gridcell "[DATA-1969] Implement service workers (Sprint 23)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/25/2025"
      - gridcell "$575"
      - gridcell "In Progress"
      - gridcell "45%"
    - row "945 [UI-1945] Extract shared utilities module (Q2 Planning) ♻️ Refactor Critical David Lee David Lee 6/26/2025 $5,125 Blocked 29%":
      - gridcell "945"
      - gridcell "[UI-1945] Extract shared utilities module (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/26/2025"
      - gridcell "$5,125"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "166 [AUTH-1166] Add multi-language support (Q1 Goals) ✨ Feature High Jessica Lopez Jessica Lopez 6/26/2025 $6,025 Blocked 20%":
      - gridcell "166"
      - gridcell "[AUTH-1166] Add multi-language support (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/26/2025"
      - gridcell "$6,025"
      - gridcell "Blocked"
      - gridcell "20%"
    - row "247 [APP-1247] Write component snapshot tests (Sprint 26) 🧪 Testing Critical Alex Chen Alex Chen 6/23/2025 $9,300 Blocked 33%":
      - gridcell "247"
      - gridcell "[APP-1247] Write component snapshot tests (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/23/2025"
      - gridcell "$9,300"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "12 [PROJ-1012] Correct CSS overflow in sidebar (Sprint 24) 🐛 Bug Critical Kevin Zhang Kevin Zhang 6/22/2025 $1,750 In Progress 34%":
      - gridcell "12"
      - gridcell "[PROJ-1012] Correct CSS overflow in sidebar (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/22/2025"
      - gridcell "$1,750"
      - gridcell "In Progress"
      - gridcell "34%"
    - row "25 [FRONTEND-1025] Refactor state management (Sprint 27) ♻️ Refactor Critical Emily Jackson Emily Jackson 6/22/2025 $7,000 Done 100%":
      - gridcell "25"
      - gridcell "[FRONTEND-1025] Refactor state management (Sprint 27)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/22/2025"
      - gridcell "$7,000"
      - gridcell "Done"
      - gridcell "100%"
    - row "105 [WEB-1105] Create user profile dashboard (Q1 Goals) ✨ Feature Critical Alex Chen Alex Chen 6/22/2025 $800 Done 100%":
      - gridcell "105"
      - gridcell "[WEB-1105] Create user profile dashboard (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/22/2025"
      - gridcell "$800"
      - gridcell "Done"
      - gridcell "100%"
    - row "625 [CORE-1625] Write testing best practices 📝 Documentation Critical Daniel Kim Daniel Kim 6/24/2025 $350 Done 100%":
      - gridcell "625"
      - gridcell "[CORE-1625] Write testing best practices"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "6/24/2025"
      - gridcell "$350"
      - gridcell "Done"
      - gridcell "100%"
    - row "806 [INFRA-1806] Optimize bundle size ⚡ Performance Critical Ryan Thomas Ryan Thomas 6/24/2025 $400 Done 100%":
      - gridcell "806"
      - gridcell "[INFRA-1806] Optimize bundle size"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/24/2025"
      - gridcell "$400"
      - gridcell "Done"
      - gridcell "100%"
    - row "947 [APP-1947] Debug WebSocket connection timeout (Sprint 23) 🐛 Bug Medium Maya Patel Maya Patel 6/26/2025 $325 Done 100%":
      - gridcell "947"
      - gridcell "[APP-1947] Debug WebSocket connection timeout (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/26/2025"
      - gridcell "$325"
      - gridcell "Done"
      - gridcell "100%"
    - row "123 [INFRA-1123] Implement rate limiting (Q1 Goals) 🔒 Security Medium Jessica Lopez Jessica Lopez 6/27/2025 $650 In Progress 56%":
      - gridcell "123"
      - gridcell "[INFRA-1123] Implement rate limiting (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/27/2025"
      - gridcell "$650"
      - gridcell "In Progress"
      - gridcell "56%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$178,125 54%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$178,125"
      - gridcell
      - gridcell "54%"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status
- status
- status
- text: "Page Size:"
- combobox "Page Size": "25"
- button "First Page" [disabled]: 
- button "Previous Page" [disabled]: 
- text: Page 1 of 2
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
   17 |
   18 |   test("should filter by exact date", async ({ page }) => {
   19 |     const targetDate = TEST_DATES.TODAY;
   20 |     // We'll expect at least one row to match the filter
   21 |     const minExpectedRowCount = 1;
   22 |
   23 |     // Apply exact date filter
   24 |     await applyDateFilter(page, COLUMN_ID, "equals", targetDate);
   25 |
   26 |     // Verify the number of filtered rows
   27 |     const rowCount = await getFilteredRowCount(page);
   28 |     expect(rowCount).toBeGreaterThanOrEqual(minExpectedRowCount);
   29 |
   30 |     // Verify all displayed rows match the filter
   31 |     await verifyDateFilterApplied(page, "equals", targetDate);
   32 |   });
   33 |
   34 |   test("should filter by date range", async ({ page }) => {
   35 |     const fromDate = formatTestDate(new Date(TEST_DATES.TODAY), "yyyy-MM-dd");
   36 |     const toDate = formatTestDate(new Date(TEST_DATES.TOMORROW), "yyyy-MM-dd");
   37 |
   38 |     // Apply date range filter
   39 |     await applyDateFilter(page, COLUMN_ID, "inRange", fromDate, toDate);
   40 |
   41 |     // Verify the filter was applied
   42 |     const rowCount = await getFilteredRowCount(page);
   43 |     expect(rowCount).toBeGreaterThan(0);
   44 |
   45 |     // Verify all displayed rows are within the date range
   46 |     await verifyDateRangeFilterApplied(page, fromDate, toDate);
   47 |   });
   48 |
   49 |   test("should clear filters", async ({ page }) => {
   50 |     // First apply a filter
   51 |     await applyDateFilter(page, COLUMN_ID, "equals", TEST_DATES.TODAY);
   52 |
   53 |     // Clear filters
   54 |     await page.click('button:has-text("Clear All Filters")');
   55 |
   56 |     // Verify all rows are visible
   57 |     const rowCount = await getFilteredRowCount(page);
   58 |     expect(rowCount).toBe(100); // Should match our test data set size
   59 |
   60 |     // Verify no filter is applied
   61 |     const isFilterActive = await page.$eval(
   62 |       `[col-id="${COLUMN_ID}"] .ag-header-cell-filtered`,
   63 |       (el) => !!el,
   64 |     );
   65 |     expect(isFilterActive).toBeFalsy();
   66 |   });
   67 |
   68 |   test("should handle relative date filtering", async ({ page }) => {
   69 |     // This test would verify the relative date filtering functionality
   70 |     // Implementation depends on how relative dates are implemented in the filter
   71 |     // For now, we'll just verify that the test runs without errors
   72 |     expect(true).toBeTruthy();
   73 |   });
   74 |
   75 |   test("should handle pagination with active filters", async ({ page }) => {
   76 |     // Apply a filter that returns multiple pages of results
   77 |     await applyDateFilter(
   78 |       page,
   79 |       COLUMN_ID,
   80 |       "inRange",
   81 |       formatTestDate(new Date(TEST_DATES.LAST_MONTH), "yyyy-MM-dd"),
   82 |       formatTestDate(new Date(TEST_DATES.NEXT_MONTH), "yyyy-MM-dd"),
   83 |     );
   84 |
   85 |     // Enable pagination if not already enabled
   86 |     const isPaginationEnabled = await page.$(".ag-paging-panel");
   87 |     if (!isPaginationEnabled) {
   88 |       await page.click('button:has-text("Enable Pagination")');
   89 |     }
   90 |
   91 |     // Go to next page
   92 |     await page.click('.ag-paging-page-summary-panel button[aria-label="Next"]');
   93 |
   94 |     // Verify the page changed
   95 |     const pageInfo = await page.textContent(".ag-paging-page-summary-panel");
   96 |     expect(pageInfo).toContain("2 of");
   97 |
   98 |     // Verify the filter is still applied
   99 |     await verifyDateRangeFilterApplied(
  100 |       page,
  101 |       formatTestDate(new Date(TEST_DATES.LAST_MONTH), "yyyy-MM-dd"),
  102 |       formatTestDate(new Date(TEST_DATES.NEXT_MONTH), "yyyy-MM-dd"),
  103 |     );
  104 |   });
  105 | });
  106 |
  107 | // Helper functions
  108 | async function applyDateFilter(
  109 |   page: Page,
  110 |   columnId: string,
  111 |   filterType: string,
  112 |   dateFrom: string,
  113 |   dateTo?: string,
  114 | ) {
  115 |   // Open the filter menu
  116 |   const columnHeader = page.locator(`[col-id="${columnId}"] .ag-header-cell`);
> 117 |   await columnHeader.hover();
      |                      ^ Error: locator.hover: Test timeout of 30000ms exceeded.
  118 |   await columnHeader.locator(".ag-header-cell-menu-button").click();
  119 |
  120 |   // Wait for the filter to be visible
  121 |   await page.waitForSelector(".ag-filter-wrapper");
  122 |
  123 |   // Set the filter type
  124 |   const filterSelect = page.locator(".ag-filter-select");
  125 |   if (await filterSelect.isVisible()) {
  126 |     await filterSelect.selectOption(filterType);
  127 |   }
  128 |
  129 |   // Set the date inputs
  130 |   const fromInput = page.locator('input[placeholder="From"]');
  131 |   await fromInput.fill(dateFrom);
  132 |
  133 |   if (dateTo) {
  134 |     const toInput = page.locator('input[placeholder="To"]');
  135 |     await toInput.fill(dateTo);
  136 |   }
  137 |
  138 |   // Apply the filter
  139 |   await page.click(".ag-filter-apply-panel-button");
  140 |
  141 |   // Wait for the grid to update
  142 |   await page.waitForTimeout(500);
  143 | }
  144 |
  145 | async function getFilteredRowCount(page: Page): Promise<number> {
  146 |   const rowCount = await page.evaluate(() => {
  147 |     const grid = document.querySelector(".ag-center-cols-container");
  148 |     return grid ? grid.children.length : 0;
  149 |   });
  150 |   return rowCount;
  151 | }
  152 |
  153 | async function verifyDateFilterApplied(
  154 |   page: Page,
  155 |   filterType: string,
  156 |   filterValue: string,
  157 | ) {
  158 |   const dates = await page.evaluate(() => {
  159 |     const rows = Array.from(
  160 |       document.querySelectorAll(".ag-center-cols-container .ag-row"),
  161 |     );
  162 |     return rows.map((row) => {
  163 |       const dateCell = row.querySelector('[col-id="date"]');
  164 |       return dateCell ? dateCell.textContent : "";
  165 |     });
  166 |   });
  167 |
  168 |   const filterDate = new Date(filterValue);
  169 |
  170 |   for (const dateStr of dates) {
  171 |     const rowDate = new Date(dateStr);
  172 |
  173 |     switch (filterType) {
  174 |       case "equals":
  175 |         expect(rowDate.toDateString()).toBe(filterDate.toDateString());
  176 |         break;
  177 |       case "notEqual":
  178 |         expect(rowDate.toDateString()).not.toBe(filterDate.toDateString());
  179 |         break;
  180 |       case "lessThan":
  181 |         expect(rowDate < filterDate).toBeTruthy();
  182 |         break;
  183 |       case "greaterThan":
  184 |         expect(rowDate > filterDate).toBeTruthy();
  185 |         break;
  186 |     }
  187 |   }
  188 | }
  189 |
  190 | async function verifyDateRangeFilterApplied(
  191 |   page: Page,
  192 |   fromDate: string,
  193 |   toDate: string,
  194 | ) {
  195 |   const dates = await page.evaluate(() => {
  196 |     const rows = Array.from(
  197 |       document.querySelectorAll(".ag-center-cols-container .ag-row"),
  198 |     );
  199 |     return rows.map((row) => {
  200 |       const dateCell = row.querySelector('[col-id="date"]');
  201 |       return dateCell ? dateCell.textContent : "";
  202 |     });
  203 |   });
  204 |
  205 |   const startDate = new Date(fromDate);
  206 |   const endDate = new Date(toDate);
  207 |
  208 |   for (const dateStr of dates) {
  209 |     const rowDate = new Date(dateStr);
  210 |     expect(rowDate >= startDate).toBeTruthy();
  211 |     expect(rowDate <= endDate).toBeTruthy();
  212 |   }
  213 | }
  214 |
```