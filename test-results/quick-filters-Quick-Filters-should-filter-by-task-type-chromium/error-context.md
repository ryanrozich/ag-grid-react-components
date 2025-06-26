# Test info

- Name: Quick Filters >> should filter by task type
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:92:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    56 × locator resolved to 3 elements. Proceeding with the first one: <div role="listbox" id="quick-filter-dropdown" aria-label="Quick filter options" class="_dropdown_a39xr_55 _positionBottomLeft_a39xr_83 ">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:98:16
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
    - text: Last 7 Days
    - img
- button "Quick filter options" [expanded]:
    - text: All Tasks
    - img
- listbox "Quick filter options":
    - option "📋 All Tasks" [selected]
    - option "🐛 Critical Bugs"
    - option "✨ Features"
    - option "🚀 In Progress"
    - option "🛑 Blocked"
- paragraph: Number of Tasks
- paragraph: "60"
- img
- paragraph: Total Budget
- paragraph: $315,575
- img
- paragraph: Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $175,239
- img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- text: 1 to 25 of 61. Page 1 of 3
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
        - row "84 [UI-1084] Correct data corruption in cache layer 🐛 Bug Critical Emily Jackson Emily Jackson 6/24/2025 $7,925 Blocked 31%":
            - gridcell "84"
            - gridcell "[UI-1084] Correct data corruption in cache layer"
            - gridcell "🐛 Bug"
            - gridcell "Critical"
            - gridcell "Emily Jackson Emily Jackson":
                - img "Emily Jackson"
                - text: Emily Jackson
            - gridcell "6/24/2025"
            - gridcell "$7,925"
            - gridcell "Blocked"
            - gridcell "31%"
        - row "325 [INFRA-1325] Test cross-browser compatibility (Sprint 25) 🧪 Testing Critical Sarah Johnson Sarah Johnson 6/24/2025 $4,625 In Progress 51%":
            - gridcell "325"
            - gridcell "[INFRA-1325] Test cross-browser compatibility (Sprint 25)"
            - gridcell "🧪 Testing"
            - gridcell "Critical"
            - gridcell "Sarah Johnson Sarah Johnson":
                - img "Sarah Johnson"
                - text: Sarah Johnson
            - gridcell "6/24/2025"
            - gridcell "$4,625"
            - gridcell "In Progress"
            - gridcell "51%"
        - row "296 [BACKEND-1296] Refactor authentication flow (Performance Sprint) ♻️ Refactor Critical Daniel Kim Daniel Kim 6/24/2025 $13,600 Blocked 25%":
            - gridcell "296"
            - gridcell "[BACKEND-1296] Refactor authentication flow (Performance Sprint)"
            - gridcell "♻️ Refactor"
            - gridcell "Critical"
            - gridcell "Daniel Kim Daniel Kim":
                - img "Daniel Kim"
                - text: Daniel Kim
            - gridcell "6/24/2025"
            - gridcell "$13,600"
            - gridcell "Blocked"
            - gridcell "25%"
        - row "479 [CORE-1479] Fix date picker timezone issue (Sprint 24) 🐛 Bug High Amanda White Amanda White 6/24/2025 $250 Blocked 14%":
            - gridcell "479"
            - gridcell "[CORE-1479] Fix date picker timezone issue (Sprint 24)"
            - gridcell "🐛 Bug"
            - gridcell "High"
            - gridcell "Amanda White Amanda White":
                - img "Amanda White"
                - text: Amanda White
            - gridcell "6/24/2025"
            - gridcell "$250"
            - gridcell "Blocked"
            - gridcell "14%"
        - row "367 [AUTH-1367] Implement blue-green deployment (Q1 Goals) 🔧 DevOps Critical Ryan Thomas Ryan Thomas 6/24/2025 $2,000 Testing 91%":
            - gridcell "367"
            - gridcell "[AUTH-1367] Implement blue-green deployment (Q1 Goals)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Ryan Thomas Ryan Thomas":
                - img "Ryan Thomas"
                - text: Ryan Thomas
            - gridcell "6/24/2025"
            - gridcell "$2,000"
            - gridcell "Testing"
            - gridcell "91%"
        - row "793 [USER-1793] Fix login form validation error (Sprint 23) 🐛 Bug Critical Daniel Kim Daniel Kim 6/21/2025 $2,925 In Progress 39%":
            - gridcell "793"
            - gridcell "[USER-1793] Fix login form validation error (Sprint 23)"
            - gridcell "🐛 Bug"
            - gridcell "Critical"
            - gridcell "Daniel Kim Daniel Kim":
                - img "Daniel Kim"
                - text: Daniel Kim
            - gridcell "6/21/2025"
            - gridcell "$2,925"
            - gridcell "In Progress"
            - gridcell "39%"
        - row "17 [DATA-1017] Implement dark mode toggle ✨ Feature Critical Kevin Zhang Kevin Zhang 6/21/2025 $3,375 Done 100%":
            - gridcell "17"
            - gridcell "[DATA-1017] Implement dark mode toggle"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "Kevin Zhang Kevin Zhang":
                - img "Kevin Zhang"
                - text: Kevin Zhang
            - gridcell "6/21/2025"
            - gridcell "$3,375"
            - gridcell "Done"
            - gridcell "100%"
        - row "85 [DATA-1085] Fix infinite scroll pagination bug (Sprint 25) 🐛 Bug High Sarah Johnson Sarah Johnson 6/22/2025 $11,750 Blocked 39%":
            - gridcell "85"
            - gridcell "[DATA-1085] Fix infinite scroll pagination bug (Sprint 25)"
            - gridcell "🐛 Bug"
            - gridcell "High"
            - gridcell "Sarah Johnson Sarah Johnson":
                - img "Sarah Johnson"
                - text: Sarah Johnson
            - gridcell "6/22/2025"
            - gridcell "$11,750"
            - gridcell "Blocked"
            - gridcell "39%"
        - row "816 [API-1816] Configure Docker containers (Sprint 27) 🔧 DevOps Critical Olivia Brown Olivia Brown 6/21/2025 $4,350 Backlog 0%":
            - gridcell "816"
            - gridcell "[API-1816] Configure Docker containers (Sprint 27)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Olivia Brown Olivia Brown":
                - img "Olivia Brown"
                - text: Olivia Brown
            - gridcell "6/21/2025"
            - gridcell "$4,350"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "239 [UI-1239] Fix date picker timezone issue 🐛 Bug Medium Alex Chen Alex Chen 6/22/2025 $1,450 In Progress 40%":
            - gridcell "239"
            - gridcell "[UI-1239] Fix date picker timezone issue"
            - gridcell "🐛 Bug"
            - gridcell "Medium"
            - gridcell "Alex Chen Alex Chen":
                - img "Alex Chen"
                - text: Alex Chen
            - gridcell "6/22/2025"
            - gridcell "$1,450"
            - gridcell "In Progress"
            - gridcell "40%"
        - row "505 [API-1505] Debug WebSocket connection timeout 🐛 Bug Medium Chris Martinez Chris Martinez 6/24/2025 $5,825 Backlog 0%":
            - gridcell "505"
            - gridcell "[API-1505] Debug WebSocket connection timeout"
            - gridcell "🐛 Bug"
            - gridcell "Medium"
            - gridcell "Chris Martinez Chris Martinez":
                - img "Chris Martinez"
                - text: Chris Martinez
            - gridcell "6/24/2025"
            - gridcell "$5,825"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "468 [INFRA-1468] Migrate to TypeScript strict mode (Sprint 25) ♻️ Refactor Critical Alex Chen Alex Chen 6/21/2025 $850 In Progress 51%":
            - gridcell "468"
            - gridcell "[INFRA-1468] Migrate to TypeScript strict mode (Sprint 25)"
            - gridcell "♻️ Refactor"
            - gridcell "Critical"
            - gridcell "Alex Chen Alex Chen":
                - img "Alex Chen"
                - text: Alex Chen
            - gridcell "6/21/2025"
            - gridcell "$850"
            - gridcell "In Progress"
            - gridcell "51%"
        - row "499 [ADMIN-1499] Write migration guide for v2 (Sprint 24) 📝 Documentation High Isabella Garcia Isabella Garcia 6/22/2025 $16,050 Blocked 28%":
            - gridcell "499"
            - gridcell "[ADMIN-1499] Write migration guide for v2 (Sprint 24)"
            - gridcell "📝 Documentation"
            - gridcell "High"
            - gridcell "Isabella Garcia Isabella Garcia":
                - img "Isabella Garcia"
                - text: Isabella Garcia
            - gridcell "6/22/2025"
            - gridcell "$16,050"
            - gridcell "Blocked"
            - gridcell "28%"
        - row "605 [CORE-1605] Implement service workers (Q2 Planning) ⚡ Performance High Sarah Johnson Sarah Johnson 6/24/2025 $1,100 Done 100%":
            - gridcell "605"
            - gridcell "[CORE-1605] Implement service workers (Q2 Planning)"
            - gridcell "⚡ Performance"
            - gridcell "High"
            - gridcell "Sarah Johnson Sarah Johnson":
                - img "Sarah Johnson"
                - text: Sarah Johnson
            - gridcell "6/24/2025"
            - gridcell "$1,100"
            - gridcell "Done"
            - gridcell "100%"
    - rowgroup
    - rowgroup
    - rowgroup
    - rowgroup:
        - row "$315,575 46%":
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell "$315,575"
            - gridcell
            - gridcell "46%"
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
- text: Page 1 of 3
- button "Next Page": 
- button "Last Page": 
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
   16 |     // Wait a bit for the default filter to be applied
   17 |     await page.waitForTimeout(1500);
   18 |
   19 |     // Check that the first quick filter dropdown shows "Last 7 Days" as selected
   20 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   21 |     await expect(firstDropdown.locator("button").first()).toContainText("Last 7 Days");
   22 |
   23 |     // Check that there are active filters displayed
   24 |     const activeFilters = page.locator('[data-testid="active-filters"]');
   25 |     await expect(activeFilters).toBeVisible();
   26 |
   27 |     // Verify the filter is working by checking row count
   28 |     const rowCount = await page.locator(".ag-row").count();
   29 |     expect(rowCount).toBeGreaterThan(0);
   30 |     expect(rowCount).toBeLessThan(25); // Should be filtered, not showing all 1000 rows
   31 |   });
   32 |
   33 |   test("should filter by time period", async ({ page }) => {
   34 |     // Click on the first quick filter dropdown
   35 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   36 |     await firstDropdown.locator("button").first().click();
   37 |
   38 |     // Wait for dropdown menu to be visible
   39 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   40 |
   41 |     // Select "This Month"
   42 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
   43 |
   44 |     // Verify the dropdown shows the new selection
   45 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
   46 |
   47 |     // Verify row count changed
   48 |     const rowCount = await page.locator(".ag-row").count();
   49 |     expect(rowCount).toBeGreaterThan(0);
   50 |   });
   51 |
   52 |   test("should filter by Overdue tasks", async ({ page }) => {
   53 |     // Click on the first quick filter dropdown
   54 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   55 |     await firstDropdown.locator("button").first().click();
   56 |
   57 |     // Select "Overdue"
   58 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
   59 |
   60 |     // Verify the dropdown shows the new selection
   61 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
   62 |
   63 |     // Verify that no "Done" status tasks are shown
   64 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   65 |
   66 |     // Check that none of the visible statuses are "Done"
   67 |     for (const status of statusCells) {
   68 |       expect(status).not.toBe("Done");
   69 |     }
   70 |   });
   71 |
   72 |   test("should filter by Not Started tasks", async ({ page }) => {
   73 |     // Click on the first quick filter dropdown
   74 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   75 |     await firstDropdown.locator("button").first().click();
   76 |
   77 |     // Select "Not Started"
   78 |     await page.locator('[role="option"]').filter({ hasText: "Not Started" }).click();
   79 |
   80 |     // Verify the dropdown shows the new selection
   81 |     await expect(firstDropdown.locator("button").first()).toContainText("Not Started");
   82 |
   83 |     // Verify that only "Backlog" or "Todo" status tasks are shown
   84 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   85 |
   86 |     // Check that all visible statuses are either "Backlog" or "Todo"
   87 |     for (const status of statusCells) {
   88 |       expect(["Backlog", "Todo"]).toContain(status);
   89 |     }
   90 |   });
   91 |
   92 |   test("should filter by task type", async ({ page }) => {
   93 |     // Click on the second quick filter dropdown (task type)
   94 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
   95 |     await secondDropdown.locator("button").first().click();
   96 |
   97 |     // Wait for dropdown menu to be visible
>  98 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   99 |
  100 |     // Select "Critical Bugs"
  101 |     await page.locator('[role="option"]').filter({ hasText: "Critical Bugs" }).click();
  102 |
  103 |     // Verify the dropdown shows the new selection
  104 |     await expect(secondDropdown.locator("button").first()).toContainText("Critical Bugs");
  105 |
  106 |     // Verify that only Bug category with Critical/High priority are shown
  107 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  108 |     const priorityCells = await page.locator('.ag-cell[col-id="priority"]').allTextContents();
  109 |
  110 |     // Check categories are all "Bug"
  111 |     for (const category of categoryCells) {
  112 |       expect(category).toBe("Bug");
  113 |     }
  114 |
  115 |     // Check priorities are either "Critical" or "High"
  116 |     for (const priority of priorityCells) {
  117 |       expect(["Critical", "High"]).toContain(priority);
  118 |     }
  119 |   });
  120 |
  121 |   test("should clear all filters", async ({ page }) => {
  122 |     // Wait for default filter first
  123 |     await page.waitForTimeout(1500);
  124 |
  125 |     // Apply another filter
  126 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  127 |     await firstDropdown.locator("button").first().click();
  128 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  129 |
  130 |     // Wait for filter to apply
  131 |     await page.waitForTimeout(1000);
  132 |
  133 |     // Verify filter is applied
  134 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
  135 |
  136 |     // Clear the filter by selecting "All Time"
  137 |     await firstDropdown.locator("button").first().click();
  138 |     await page.locator('[role="option"]').filter({ hasText: "All Time" }).click();
  139 |
  140 |     // Wait for filter to clear
  141 |     await page.waitForTimeout(1000);
  142 |
  143 |     // Verify the dropdown shows "All Time"
  144 |     await expect(firstDropdown.locator("button").first()).toContainText("All Time");
  145 |
  146 |     // Active filters should not be visible
  147 |     const activeFilters = page.locator('[data-testid="active-filters"]');
  148 |     await expect(activeFilters).not.toBeVisible();
  149 |   });
  150 |
  151 |   test("should combine time and task type filters", async ({ page }) => {
  152 |     // Apply time filter
  153 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  154 |     await firstDropdown.locator("button").first().click();
  155 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
  156 |
  157 |     // Apply task type filter
  158 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
  159 |     await secondDropdown.locator("button").first().click();
  160 |     await page.locator('[role="option"]').filter({ hasText: "Features" }).click();
  161 |
  162 |     // Verify both filters are applied
  163 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
  164 |     await expect(secondDropdown.locator("button").first()).toContainText("Features");
  165 |
  166 |     // Verify that only Feature category tasks are shown
  167 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  168 |     for (const category of categoryCells) {
  169 |       expect(category).toBe("Feature");
  170 |     }
  171 |
  172 |     // There should be fewer rows due to combined filters
  173 |     const rowCount = await page.locator(".ag-row").count();
  174 |     expect(rowCount).toBeGreaterThan(0);
  175 |     expect(rowCount).toBeLessThan(10); // Combined filters should show very few rows
  176 |   });
  177 |
  178 |   test("should update stats when filters are applied", async ({ page }) => {
  179 |     // Get initial task count
  180 |     const initialTaskCount = await page.locator('p:has-text("Number of Tasks") + p').textContent();
  181 |     const initialCount = parseInt(initialTaskCount?.replace(/,/g, "") || "0");
  182 |
  183 |     // Apply a filter
  184 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  185 |     await firstDropdown.locator("button").first().click();
  186 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  187 |
  188 |     // Wait for grid to update
  189 |     await page.waitForTimeout(500);
  190 |
  191 |     // Get new task count
  192 |     const newTaskCount = await page.locator('p:has-text("Number of Tasks") + p').textContent();
  193 |     const newCount = parseInt(newTaskCount?.replace(/,/g, "") || "0");
  194 |
  195 |     // Task count should decrease when filter is applied
  196 |     expect(newCount).toBeLessThan(initialCount);
  197 |     expect(newCount).toBeGreaterThan(0);
  198 |   });
```
