# Test info

- Name: Quick Filters >> should filter by Not Started tasks
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:69:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Not Started"
Received string: "Time period"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_a39xr_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Time period"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:78:59
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
- text: "Quick filters:"
- button "Quick filter options":
    - text: Time period
    - img
- button "Quick filter options":
    - text: All Tasks
    - img
- paragraph: Number of Tasks
- paragraph: "14"
- img
- paragraph: Total Budget
- paragraph: $45,425
- img
- paragraph: Progress
- paragraph: 8.4%
- img
- paragraph: Budget Remaining
- paragraph: $43,192
- img
- text: "Due Date: before Today"
- button "Remove Due Date filter": ×
- text: "Status: Backlog, Todo"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- text: 1 to 15 of 15. Page 1 of 1
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
        - row "159 [WEB-1159] Create data visualization charts ✨ Feature Critical John Robinson John Robinson 6/24/2025 $2,475 Todo 14%":
            - gridcell "159"
            - gridcell "[WEB-1159] Create data visualization charts"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "John Robinson John Robinson":
                - img "John Robinson"
                - text: John Robinson
            - gridcell "6/24/2025"
            - gridcell "$2,475"
            - gridcell "Todo"
            - gridcell "14%"
        - row "415 [DATA-1415] Add audit logging 🔒 Security High Kevin Zhang Kevin Zhang 6/12/2025 $625 Backlog 0%":
            - gridcell "415"
            - gridcell "[DATA-1415] Add audit logging"
            - gridcell "🔒 Security"
            - gridcell "High"
            - gridcell "Kevin Zhang Kevin Zhang":
                - img "Kevin Zhang"
                - text: Kevin Zhang
            - gridcell "6/12/2025"
            - gridcell "$625"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "621 [API-1621] Implement CSRF protection (Sprint 24) 🔒 Security Medium IG Isabella Garcia Isabella Garcia 6/18/2025 $775 Backlog 0%":
            - gridcell "621"
            - gridcell "[API-1621] Implement CSRF protection (Sprint 24)"
            - gridcell "🔒 Security"
            - gridcell "Medium"
            - gridcell "IG Isabella Garcia Isabella Garcia":
                - text: IG
                - img "Isabella Garcia"
                - text: Isabella Garcia
            - gridcell "6/18/2025"
            - gridcell "$775"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "585 [DASH-1585] Update README with examples 📝 Documentation Critical ED Emma Davis Emma Davis 6/7/2025 $16,525 Backlog 0%":
            - gridcell "585"
            - gridcell "[DASH-1585] Update README with examples"
            - gridcell "📝 Documentation"
            - gridcell "Critical"
            - gridcell "ED Emma Davis Emma Davis":
                - text: ED
                - img "Emma Davis"
                - text: Emma Davis
            - gridcell "6/7/2025"
            - gridcell "$16,525"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "427 [ADMIN-1427] Add CDN for static assets ⚡ Performance Critical Emily Jackson Emily Jackson 5/30/2025 $375 Todo 14%":
            - gridcell "427"
            - gridcell "[ADMIN-1427] Add CDN for static assets"
            - gridcell "⚡ Performance"
            - gridcell "Critical"
            - gridcell "Emily Jackson Emily Jackson":
                - img "Emily Jackson"
                - text: Emily Jackson
            - gridcell "5/30/2025"
            - gridcell "$375"
            - gridcell "Todo"
            - gridcell "14%"
        - row "588 [ADMIN-1588] Update API documentation 📝 Documentation Critical Daniel Kim Daniel Kim 5/29/2025 $7,350 Todo 7%":
            - gridcell "588"
            - gridcell "[ADMIN-1588] Update API documentation"
            - gridcell "📝 Documentation"
            - gridcell "Critical"
            - gridcell "Daniel Kim Daniel Kim":
                - img "Daniel Kim"
                - text: Daniel Kim
            - gridcell "5/29/2025"
            - gridcell "$7,350"
            - gridcell "Todo"
            - gridcell "7%"
        - row "175 [PROJ-1175] Resolve CORS issue with external API (Sprint 24) 🐛 Bug High Jessica Lopez Jessica Lopez 5/28/2025 $3,300 Todo 19%":
            - gridcell "175"
            - gridcell "[PROJ-1175] Resolve CORS issue with external API (Sprint 24)"
            - gridcell "🐛 Bug"
            - gridcell "High"
            - gridcell "Jessica Lopez Jessica Lopez":
                - img "Jessica Lopez"
                - text: Jessica Lopez
            - gridcell "5/28/2025"
            - gridcell "$3,300"
            - gridcell "Todo"
            - gridcell "19%"
        - row "67 [BACKEND-1067] Extract shared utilities module ♻️ Refactor High Jessica Lopez Jessica Lopez 5/19/2025 $2,725 Todo 17%":
            - gridcell "67"
            - gridcell "[BACKEND-1067] Extract shared utilities module"
            - gridcell "♻️ Refactor"
            - gridcell "High"
            - gridcell "Jessica Lopez Jessica Lopez":
                - img "Jessica Lopez"
                - text: Jessica Lopez
            - gridcell "5/19/2025"
            - gridcell "$2,725"
            - gridcell "Todo"
            - gridcell "17%"
        - row "488 [FRONTEND-1488] Debug performance regression in search 🐛 Bug Low Kevin Zhang Kevin Zhang 5/23/2025 $4,550 Backlog 0%":
            - gridcell "488"
            - gridcell "[FRONTEND-1488] Debug performance regression in search"
            - gridcell "🐛 Bug"
            - gridcell "Low"
            - gridcell "Kevin Zhang Kevin Zhang":
                - img "Kevin Zhang"
                - text: Kevin Zhang
            - gridcell "5/23/2025"
            - gridcell "$4,550"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "410 [DATA-1410] Create data visualization charts ✨ Feature Low Jessica Lopez Jessica Lopez 6/6/2025 $325 Todo 14%":
            - gridcell "410"
            - gridcell "[DATA-1410] Create data visualization charts"
            - gridcell "✨ Feature"
            - gridcell "Low"
            - gridcell "Jessica Lopez Jessica Lopez":
                - img "Jessica Lopez"
                - text: Jessica Lopez
            - gridcell "6/6/2025"
            - gridcell "$325"
            - gridcell "Todo"
            - gridcell "14%"
        - row "943 [API-1943] Split monolithic components (Q2 Planning) ♻️ Refactor Low Jessica Lopez Jessica Lopez 6/7/2025 $4,775 Backlog 0%":
            - gridcell "943"
            - gridcell "[API-1943] Split monolithic components (Q2 Planning)"
            - gridcell "♻️ Refactor"
            - gridcell "Low"
            - gridcell "Jessica Lopez Jessica Lopez":
                - img "Jessica Lopez"
                - text: Jessica Lopez
            - gridcell "6/7/2025"
            - gridcell "$4,775"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "542 [APP-1542] Create video tutorials (Security Audit) 📝 Documentation High John Robinson John Robinson 5/1/2025 $325 Todo 8%":
            - gridcell "542"
            - gridcell "[APP-1542] Create video tutorials (Security Audit)"
            - gridcell "📝 Documentation"
            - gridcell "High"
            - gridcell "John Robinson John Robinson":
                - img "John Robinson"
                - text: John Robinson
            - gridcell "5/1/2025"
            - gridcell "$325"
            - gridcell "Todo"
            - gridcell "8%"
        - row "899 [ADMIN-1899] Add database indexing ⚡ Performance Low AC Alex Chen Alex Chen 5/15/2025 $575 Todo 17%":
            - gridcell "899"
            - gridcell "[ADMIN-1899] Add database indexing"
            - gridcell "⚡ Performance"
            - gridcell "Low"
            - gridcell "AC Alex Chen Alex Chen":
                - text: AC
                - img "Alex Chen"
                - text: Alex Chen
            - gridcell "5/15/2025"
            - gridcell "$575"
            - gridcell "Todo"
            - gridcell "17%"
        - row "87 [USER-1087] Create troubleshooting guide 📝 Documentation High DL David Lee David Lee 4/20/2025 $725 Todo 8%":
            - gridcell "87"
            - gridcell "[USER-1087] Create troubleshooting guide"
            - gridcell "📝 Documentation"
            - gridcell "High"
            - gridcell "DL David Lee David Lee":
                - text: DL
                - img "David Lee"
                - text: David Lee
            - gridcell "4/20/2025"
            - gridcell "$725"
            - gridcell "Todo"
            - gridcell "8%"
    - rowgroup
    - rowgroup
    - rowgroup
    - rowgroup:
        - row "$45,425 8%":
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell "$45,425"
            - gridcell
            - gridcell "8%"
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
- text: Page 1 of 1
- button "Next Page" [disabled]: 
- button "Last Page" [disabled]: 
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Quick Filters", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for the grid to be ready
   9 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
   10 |
   11 |     // Wait for data to load
   12 |     await page.waitForTimeout(1000);
   13 |   });
   14 |
   15 |   test("should have default filter applied on load", async ({ page }) => {
   16 |     // Check that the first quick filter dropdown shows "Last 7 Days" as selected
   17 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   18 |     await expect(firstDropdown.locator("button").first()).toContainText("Last 7 Days");
   19 |
   20 |     // Check that there are active filters displayed
   21 |     const activeFilters = page.locator('[data-testid="active-filters"]');
   22 |     await expect(activeFilters).toBeVisible();
   23 |
   24 |     // Verify the filter is working by checking row count
   25 |     const rowCount = await page.locator(".ag-row").count();
   26 |     expect(rowCount).toBeGreaterThan(0);
   27 |     expect(rowCount).toBeLessThan(25); // Should be filtered, not showing all 1000 rows
   28 |   });
   29 |
   30 |   test("should filter by time period", async ({ page }) => {
   31 |     // Click on the first quick filter dropdown
   32 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   33 |     await firstDropdown.locator("button").first().click();
   34 |
   35 |     // Wait for dropdown menu to be visible
   36 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   37 |
   38 |     // Select "This Month"
   39 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
   40 |
   41 |     // Verify the dropdown shows the new selection
   42 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
   43 |
   44 |     // Verify row count changed
   45 |     const rowCount = await page.locator(".ag-row").count();
   46 |     expect(rowCount).toBeGreaterThan(0);
   47 |   });
   48 |
   49 |   test("should filter by Overdue tasks", async ({ page }) => {
   50 |     // Click on the first quick filter dropdown
   51 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   52 |     await firstDropdown.locator("button").first().click();
   53 |
   54 |     // Select "Overdue"
   55 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
   56 |
   57 |     // Verify the dropdown shows the new selection
   58 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
   59 |
   60 |     // Verify that no "Done" status tasks are shown
   61 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   62 |
   63 |     // Check that none of the visible statuses are "Done"
   64 |     for (const status of statusCells) {
   65 |       expect(status).not.toBe("Done");
   66 |     }
   67 |   });
   68 |
   69 |   test("should filter by Not Started tasks", async ({ page }) => {
   70 |     // Click on the first quick filter dropdown
   71 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   72 |     await firstDropdown.locator("button").first().click();
   73 |
   74 |     // Select "Not Started"
   75 |     await page.locator('[role="option"]').filter({ hasText: "Not Started" }).click();
   76 |
   77 |     // Verify the dropdown shows the new selection
>  78 |     await expect(firstDropdown.locator("button").first()).toContainText("Not Started");
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
   79 |
   80 |     // Verify that only "Backlog" or "Todo" status tasks are shown
   81 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   82 |
   83 |     // Check that all visible statuses are either "Backlog" or "Todo"
   84 |     for (const status of statusCells) {
   85 |       expect(["Backlog", "Todo"]).toContain(status);
   86 |     }
   87 |   });
   88 |
   89 |   test("should filter by task type", async ({ page }) => {
   90 |     // Click on the second quick filter dropdown (task type)
   91 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
   92 |     await secondDropdown.locator("button").first().click();
   93 |
   94 |     // Wait for dropdown menu to be visible
   95 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   96 |
   97 |     // Select "Critical Bugs"
   98 |     await page.locator('[role="option"]').filter({ hasText: "Critical Bugs" }).click();
   99 |
  100 |     // Verify the dropdown shows the new selection
  101 |     await expect(secondDropdown.locator("button").first()).toContainText("Critical Bugs");
  102 |
  103 |     // Verify that only Bug category with Critical/High priority are shown
  104 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  105 |     const priorityCells = await page.locator('.ag-cell[col-id="priority"]').allTextContents();
  106 |
  107 |     // Check categories are all "Bug"
  108 |     for (const category of categoryCells) {
  109 |       expect(category).toBe("Bug");
  110 |     }
  111 |
  112 |     // Check priorities are either "Critical" or "High"
  113 |     for (const priority of priorityCells) {
  114 |       expect(["Critical", "High"]).toContain(priority);
  115 |     }
  116 |   });
  117 |
  118 |   test("should clear all filters", async ({ page }) => {
  119 |     // First apply a filter
  120 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  121 |     await firstDropdown.locator("button").first().click();
  122 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  123 |
  124 |     // Verify filter is applied
  125 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
  126 |
  127 |     // Clear the filter by selecting "All Time"
  128 |     await firstDropdown.locator("button").first().click();
  129 |     await page.locator('[role="option"]').filter({ hasText: "All Time" }).click();
  130 |
  131 |     // Verify the dropdown shows "All Time"
  132 |     await expect(firstDropdown.locator("button").first()).toContainText("All Time");
  133 |
  134 |     // Active filters should not be visible
  135 |     const activeFilters = page.locator('[data-testid="active-filters"]');
  136 |     await expect(activeFilters).not.toBeVisible();
  137 |   });
  138 |
  139 |   test("should combine time and task type filters", async ({ page }) => {
  140 |     // Apply time filter
  141 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  142 |     await firstDropdown.locator("button").first().click();
  143 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
  144 |
  145 |     // Apply task type filter
  146 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
  147 |     await secondDropdown.locator("button").first().click();
  148 |     await page.locator('[role="option"]').filter({ hasText: "Features" }).click();
  149 |
  150 |     // Verify both filters are applied
  151 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
  152 |     await expect(secondDropdown.locator("button").first()).toContainText("Features");
  153 |
  154 |     // Verify that only Feature category tasks are shown
  155 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  156 |     for (const category of categoryCells) {
  157 |       expect(category).toBe("Feature");
  158 |     }
  159 |
  160 |     // There should be fewer rows due to combined filters
  161 |     const rowCount = await page.locator(".ag-row").count();
  162 |     expect(rowCount).toBeGreaterThan(0);
  163 |     expect(rowCount).toBeLessThan(10); // Combined filters should show very few rows
  164 |   });
  165 |
  166 |   test("should update stats when filters are applied", async ({ page }) => {
  167 |     // Get initial task count
  168 |     const initialTaskCount = await page.locator('p:has-text("Number of Tasks") + p').textContent();
  169 |     const initialCount = parseInt(initialTaskCount?.replace(/,/g, "") || "0");
  170 |
  171 |     // Apply a filter
  172 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  173 |     await firstDropdown.locator("button").first().click();
  174 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  175 |
  176 |     // Wait for grid to update
  177 |     await page.waitForTimeout(500);
  178 |
```
