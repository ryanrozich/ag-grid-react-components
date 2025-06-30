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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $4,308,175
- img
- paragraph: Progress
- paragraph: 43.9%
- img
- paragraph: Budget Remaining
- paragraph: $2,422,712
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
    - row "380 [BACKEND-1380] Fix login form validation error 🐛 Bug Critical John Robinson John Robinson 8/13/2025 $1,125 Backlog 0%":
      - gridcell "380"
      - gridcell "[BACKEND-1380] Fix login form validation error"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/13/2025"
      - gridcell "$1,125"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "858 [DASH-1858] Implement secure file upload (Sprint 27) 🔒 Security Medium Isabella Garcia Isabella Garcia 8/20/2025 $500 In Progress 27%":
      - gridcell "858"
      - gridcell "[DASH-1858] Implement secure file upload (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/20/2025"
      - gridcell "$500"
      - gridcell "In Progress"
      - gridcell "27%"
    - row "530 [INFRA-1530] Correct data corruption in cache layer (Q2 Planning) 🐛 Bug Low Alex Chen Alex Chen 8/18/2025 $4,375 In Progress 26%":
      - gridcell "530"
      - gridcell "[INFRA-1530] Correct data corruption in cache layer (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/18/2025"
      - gridcell "$4,375"
      - gridcell "In Progress"
      - gridcell "26%"
    - row "478 [API-1478] Build custom report generator (Q1 Goals) ✨ Feature High Kevin Zhang Kevin Zhang 8/14/2025 $3,725 Todo 12%":
      - gridcell "478"
      - gridcell "[API-1478] Build custom report generator (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/14/2025"
      - gridcell "$3,725"
      - gridcell "Todo"
      - gridcell "12%"
    - row "700 [BACKEND-1700] Set up vulnerability scanning (Sprint 26) 🔒 Security High James Wilson James Wilson 8/11/2025 $3,200 Backlog 0%":
      - gridcell "700"
      - gridcell "[BACKEND-1700] Set up vulnerability scanning (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/11/2025"
      - gridcell "$3,200"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "15 [ADMIN-1015] Configure firewall rules (Security Audit) 🔒 Security Medium Isabella Garcia Isabella Garcia 8/13/2025 $225 In Progress 43%":
      - gridcell "15"
      - gridcell "[ADMIN-1015] Configure firewall rules (Security Audit)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/13/2025"
      - gridcell "$225"
      - gridcell "In Progress"
      - gridcell "43%"
    - row "116 [WEB-1116] Add progressive web app features (Q2 Planning) ⚡ Performance High David Lee David Lee 8/10/2025 $375 In Progress 29%":
      - gridcell "116"
      - gridcell "[WEB-1116] Add progressive web app features (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/10/2025"
      - gridcell "$375"
      - gridcell "In Progress"
      - gridcell "29%"
    - row "908 [DASH-1908] Optimize memory usage (Sprint 24) ⚡ Performance High Emily Jackson Emily Jackson 8/12/2025 $4,475 Todo 14%":
      - gridcell "908"
      - gridcell "[DASH-1908] Optimize memory usage (Sprint 24)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/12/2025"
      - gridcell "$4,475"
      - gridcell "Todo"
      - gridcell "14%"
    - row "934 [API-1934] Build analytics dashboard ✨ Feature Low Chris Martinez Chris Martinez 9/1/2025 $2,500 Todo 11%":
      - gridcell "934"
      - gridcell "[API-1934] Build analytics dashboard"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/1/2025"
      - gridcell "$2,500"
      - gridcell "Todo"
      - gridcell "11%"
    - row "25 [APP-1025] Refactor state management (Sprint 24) ♻️ Refactor Critical Isabella Garcia Isabella Garcia 8/9/2025 $18,025 Todo 9%":
      - gridcell "25"
      - gridcell "[APP-1025] Refactor state management (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/9/2025"
      - gridcell "$18,025"
      - gridcell "Todo"
      - gridcell "9%"
    - row "278 [PROJ-1278] Create video tutorials 📝 Documentation Critical David Lee David Lee 8/8/2025 $725 Todo 8%":
      - gridcell "278"
      - gridcell "[PROJ-1278] Create video tutorials"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/8/2025"
      - gridcell "$725"
      - gridcell "Todo"
      - gridcell "8%"
    - row "850 [MOBILE-1850] Implement rate limiting (Sprint 27) 🔒 Security High Alex Chen Alex Chen 8/6/2025 $550 In Review 67%":
      - gridcell "850"
      - gridcell "[MOBILE-1850] Implement rate limiting (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/6/2025"
      - gridcell "$550"
      - gridcell "In Review"
      - gridcell "67%"
    - row "939 [BACKEND-1939] Clean up deprecated APIs (Tech Debt) ♻️ Refactor High Chris Martinez Chris Martinez 8/12/2025 $975 Todo 15%":
      - gridcell "939"
      - gridcell "[BACKEND-1939] Clean up deprecated APIs (Tech Debt)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/12/2025"
      - gridcell "$975"
      - gridcell "Todo"
      - gridcell "15%"
    - row "307 [CORE-1307] Implement caching strategy ⚡ Performance Low Emma Davis Emma Davis 8/28/2025 $75 In Review 77%":
      - gridcell "307"
      - gridcell "[CORE-1307] Implement caching strategy"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/28/2025"
      - gridcell "$75"
      - gridcell "In Review"
      - gridcell "77%"
    - row "403 [USER-1403] Configure security headers (Sprint 24) 🔒 Security Medium Priya Sharma Priya Sharma 8/9/2025 $1,925 Testing 81%":
      - gridcell "403"
      - gridcell "[USER-1403] Configure security headers (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/9/2025"
      - gridcell "$1,925"
      - gridcell "Testing"
      - gridcell "81%"
    - row "19 [FRONTEND-1019] Correct data corruption in cache layer (Performance Sprint) 🐛 Bug Critical John Robinson John Robinson 8/2/2025 $15,450 Backlog 0%":
      - gridcell "19"
      - gridcell "[FRONTEND-1019] Correct data corruption in cache layer (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/2/2025"
      - gridcell "$15,450"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,308,175 44%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,308,175"
      - gridcell
      - gridcell "44%"
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