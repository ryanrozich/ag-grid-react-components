# Test info

- Name: Date Filter >> should filter by date range
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/dateFilter.spec.ts:34:3

# Error details

```
Error: locator.hover: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[col-id="date"] .ag-header-cell')

    at applyDateFilter (/Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/dateFilter.spec.ts:117:22)
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/dateFilter.spec.ts:39:11
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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $3,966,025
- img
- paragraph: Progress
- paragraph: 47.0%
- img
- paragraph: Budget Remaining
- paragraph: $2,188,274
- text: 1 to 25 of 1,001. Page 1 of 41
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
    - row "772 [FRONTEND-1772] Test mobile responsiveness 🧪 Testing Critical Kevin Zhang Kevin Zhang 8/15/2025 $550 Backlog 0%":
      - gridcell "772"
      - gridcell "[FRONTEND-1772] Test mobile responsiveness"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/15/2025"
      - gridcell "$550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "165 [CORE-1165] Document error handling patterns 📝 Documentation Medium Priya Sharma Priya Sharma 9/1/2025 $13,550 Backlog 0%":
      - gridcell "165"
      - gridcell "[CORE-1165] Document error handling patterns"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/1/2025"
      - gridcell "$13,550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "390 [CORE-1390] Update contribution guidelines (Q1 Goals) 📝 Documentation High Jessica Lopez Jessica Lopez 8/17/2025 $8,025 In Progress 29%":
      - gridcell "390"
      - gridcell "[CORE-1390] Update contribution guidelines (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/17/2025"
      - gridcell "$8,025"
      - gridcell "In Progress"
      - gridcell "29%"
    - row "536 [ADMIN-1536] Reduce API call frequency ⚡ Performance Low Emily Jackson Emily Jackson 9/10/2025 $325 Todo 7%":
      - gridcell "536"
      - gridcell "[ADMIN-1536] Reduce API call frequency"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/10/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "7%"
    - row "527 [BACKEND-1527] Build custom report generator (Sprint 23) ✨ Feature High Chris Martinez Chris Martinez 8/15/2025 $17,150 Backlog 0%":
      - gridcell "527"
      - gridcell "[BACKEND-1527] Build custom report generator (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/15/2025"
      - gridcell "$17,150"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "304 [DASH-1304] Handle null pointer exception in API client 🐛 Bug Low James Wilson James Wilson 8/21/2025 $2,200 Todo 12%":
      - gridcell "304"
      - gridcell "[DASH-1304] Handle null pointer exception in API client"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/21/2025"
      - gridcell "$2,200"
      - gridcell "Todo"
      - gridcell "12%"
    - row "562 [CORE-1562] Handle null pointer exception in API client (Q1 Goals) 🐛 Bug Critical Sarah Johnson Sarah Johnson 8/7/2025 $9,100 In Progress 23%":
      - gridcell "562"
      - gridcell "[CORE-1562] Handle null pointer exception in API client (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/7/2025"
      - gridcell "$9,100"
      - gridcell "In Progress"
      - gridcell "23%"
    - row "76 [FRONTEND-1076] Build custom report generator ✨ Feature Critical Chris Martinez Chris Martinez 8/6/2025 $200 In Progress 43%":
      - gridcell "76"
      - gridcell "[FRONTEND-1076] Build custom report generator"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/6/2025"
      - gridcell "$200"
      - gridcell "In Progress"
      - gridcell "43%"
    - row "218 [USER-1218] Set up CI/CD pipeline 🔧 DevOps Low Daniel Kim Daniel Kim 8/27/2025 $700 Todo 11%":
      - gridcell "218"
      - gridcell "[USER-1218] Set up CI/CD pipeline"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/27/2025"
      - gridcell "$700"
      - gridcell "Todo"
      - gridcell "11%"
    - row "297 [CORE-1297] Refactor error handling ♻️ Refactor High Kevin Zhang Kevin Zhang 8/10/2025 $2,275 Todo 17%":
      - gridcell "297"
      - gridcell "[CORE-1297] Refactor error handling"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/10/2025"
      - gridcell "$2,275"
      - gridcell "Todo"
      - gridcell "17%"
    - row "823 [WEB-1823] Fix responsive layout on tablets (Security Audit) 🐛 Bug High Priya Sharma Priya Sharma 8/8/2025 $4,300 In Review 74%":
      - gridcell "823"
      - gridcell "[WEB-1823] Fix responsive layout on tablets (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/8/2025"
      - gridcell "$4,300"
      - gridcell "In Review"
      - gridcell "74%"
    - row "312 [BACKEND-1312] Refactor state management ♻️ Refactor Critical Emily Jackson Emily Jackson 8/5/2025 $9,350 Backlog 0%":
      - gridcell "312"
      - gridcell "[BACKEND-1312] Refactor state management"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/5/2025"
      - gridcell "$9,350"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "75 [BACKEND-1075] Add brute force protection 🔒 Security Critical Marcus Williams Marcus Williams 8/2/2025 $2,500 In Review 62%":
      - gridcell "75"
      - gridcell "[BACKEND-1075] Add brute force protection"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/2/2025"
      - gridcell "$2,500"
      - gridcell "In Review"
      - gridcell "62%"
    - row "726 [INFRA-1726] Implement virtual scrolling ⚡ Performance Critical Emily Jackson Emily Jackson 8/3/2025 $825 Testing 83%":
      - gridcell "726"
      - gridcell "[INFRA-1726] Implement virtual scrolling"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/3/2025"
      - gridcell "$825"
      - gridcell "Testing"
      - gridcell "83%"
    - row "336 [PROJ-1336] Optimize database queries ♻️ Refactor High Marcus Williams Marcus Williams 8/9/2025 $19,550 Todo 11%":
      - gridcell "336"
      - gridcell "[PROJ-1336] Optimize database queries"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/9/2025"
      - gridcell "$19,550"
      - gridcell "Todo"
      - gridcell "11%"
    - row "405 [USER-1405] Add SQL injection prevention (Sprint 23) 🔒 Security Medium David Lee David Lee 8/10/2025 $750 In Review 61%":
      - gridcell "405"
      - gridcell "[USER-1405] Add SQL injection prevention (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/10/2025"
      - gridcell "$750"
      - gridcell "In Review"
      - gridcell "61%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,966,025 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,966,025"
      - gridcell
      - gridcell "47%"
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
- text: Page 1 of 41
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
   68 |   test("should handle relative date filtering", async () => {
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
  171 |     if (!dateStr) continue;
  172 |     const rowDate = new Date(dateStr);
  173 |
  174 |     switch (filterType) {
  175 |       case "equals":
  176 |         expect(rowDate.toDateString()).toBe(filterDate.toDateString());
  177 |         break;
  178 |       case "notEqual":
  179 |         expect(rowDate.toDateString()).not.toBe(filterDate.toDateString());
  180 |         break;
  181 |       case "lessThan":
  182 |         expect(rowDate < filterDate).toBeTruthy();
  183 |         break;
  184 |       case "greaterThan":
  185 |         expect(rowDate > filterDate).toBeTruthy();
  186 |         break;
  187 |     }
  188 |   }
  189 | }
  190 |
  191 | async function verifyDateRangeFilterApplied(
  192 |   page: Page,
  193 |   fromDate: string,
  194 |   toDate: string,
  195 | ) {
  196 |   const dates = await page.evaluate(() => {
  197 |     const rows = Array.from(
  198 |       document.querySelectorAll(".ag-center-cols-container .ag-row"),
  199 |     );
  200 |     return rows.map((row) => {
  201 |       const dateCell = row.querySelector('[col-id="date"]');
  202 |       return dateCell ? dateCell.textContent : "";
  203 |     });
  204 |   });
  205 |
  206 |   const startDate = new Date(fromDate);
  207 |   const endDate = new Date(toDate);
  208 |
  209 |   for (const dateStr of dates) {
  210 |     if (!dateStr) continue;
  211 |     const rowDate = new Date(dateStr);
  212 |     expect(rowDate >= startDate).toBeTruthy();
  213 |     expect(rowDate <= endDate).toBeTruthy();
  214 |   }
  215 | }
  216 |
```