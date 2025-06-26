# Test info

- Name: Quick Filters >> should filter by Not Started tasks
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:72:3

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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:81:59
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
- paragraph: "24"
- img
- paragraph: Total Budget
- paragraph: $75,375
- img
- paragraph: Progress
- paragraph: 5.9%
- img
- paragraph: Budget Remaining
- paragraph: $71,419
- img
- text: "Due Date: before Today"
- button "Remove Due Date filter": ×
- text: "Status: Backlog, Todo"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- text: 1 to 25 of 25. Page 1 of 1
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
        - row "236 [USER-1236] Write API contract tests (Q1 Goals) 🧪 Testing Critical Sarah Johnson Sarah Johnson 6/24/2025 $8,575 Backlog 0%":
            - gridcell "236"
            - gridcell "[USER-1236] Write API contract tests (Q1 Goals)"
            - gridcell "🧪 Testing"
            - gridcell "Critical"
            - gridcell "Sarah Johnson Sarah Johnson":
                - img "Sarah Johnson"
                - text: Sarah Johnson
            - gridcell "6/24/2025"
            - gridcell "$8,575"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "459 [AUTH-1459] Add audit logging 🔒 Security High Maya Patel Maya Patel 6/22/2025 $3,675 Todo 17%":
            - gridcell "459"
            - gridcell "[AUTH-1459] Add audit logging"
            - gridcell "🔒 Security"
            - gridcell "High"
            - gridcell "Maya Patel Maya Patel":
                - img "Maya Patel"
                - text: Maya Patel
            - gridcell "6/22/2025"
            - gridcell "$3,675"
            - gridcell "Todo"
            - gridcell "17%"
        - row "66 [ADMIN-1066] Extract business logic layer ♻️ Refactor High Ryan Thomas Ryan Thomas 6/22/2025 $1,800 Backlog 0%":
            - gridcell "66"
            - gridcell "[ADMIN-1066] Extract business logic layer"
            - gridcell "♻️ Refactor"
            - gridcell "High"
            - gridcell "Ryan Thomas Ryan Thomas":
                - img "Ryan Thomas"
                - text: Ryan Thomas
            - gridcell "6/22/2025"
            - gridcell "$1,800"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "37 [MOBILE-1037] Refactor state management (Sprint 23) ♻️ Refactor Critical Michael Anderson Michael Anderson 6/6/2025 $1,625 Backlog 0%":
            - gridcell "37"
            - gridcell "[MOBILE-1037] Refactor state management (Sprint 23)"
            - gridcell "♻️ Refactor"
            - gridcell "Critical"
            - gridcell "Michael Anderson Michael Anderson":
                - img "Michael Anderson"
                - text: Michael Anderson
            - gridcell "6/6/2025"
            - gridcell "$1,625"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "249 [CORE-1249] Optimize memory usage (Performance Sprint) ⚡ Performance Critical Marcus Williams Marcus Williams 6/7/2025 $8,275 Backlog 0%":
            - gridcell "249"
            - gridcell "[CORE-1249] Optimize memory usage (Performance Sprint)"
            - gridcell "⚡ Performance"
            - gridcell "Critical"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/7/2025"
            - gridcell "$8,275"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "960 [DASH-1960] Configure health checks 🔧 DevOps Medium David Lee David Lee 6/15/2025 $200 Backlog 0%":
            - gridcell "960"
            - gridcell "[DASH-1960] Configure health checks"
            - gridcell "🔧 DevOps"
            - gridcell "Medium"
            - gridcell "David Lee David Lee":
                - img "David Lee"
                - text: David Lee
            - gridcell "6/15/2025"
            - gridcell "$200"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "187 [MOBILE-1187] Create batch operations feature (Sprint 27) ✨ Feature Critical Marcus Williams Marcus Williams 5/30/2025 $3,875 Backlog 0%":
            - gridcell "187"
            - gridcell "[MOBILE-1187] Create batch operations feature (Sprint 27)"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "5/30/2025"
            - gridcell "$3,875"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "389 [APP-1389] Implement virtual scrolling ⚡ Performance High Kevin Zhang Kevin Zhang 5/27/2025 $3,550 Backlog 0%":
            - gridcell "389"
            - gridcell "[APP-1389] Implement virtual scrolling"
            - gridcell "⚡ Performance"
            - gridcell "High"
            - gridcell "Kevin Zhang Kevin Zhang":
                - img "Kevin Zhang"
                - text: Kevin Zhang
            - gridcell "5/27/2025"
            - gridcell "$3,550"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "572 [FRONTEND-1572] Set up CI/CD pipeline (Sprint 26) 🔧 DevOps High David Lee David Lee 5/28/2025 $725 Backlog 0%":
            - gridcell "572"
            - gridcell "[FRONTEND-1572] Set up CI/CD pipeline (Sprint 26)"
            - gridcell "🔧 DevOps"
            - gridcell "High"
            - gridcell "David Lee David Lee":
                - img "David Lee"
                - text: David Lee
            - gridcell "5/28/2025"
            - gridcell "$725"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "549 [DATA-1549] Optimize database queries (Performance Sprint) ⚡ Performance Low John Robinson John Robinson 6/19/2025 $125 Todo 6%":
            - gridcell "549"
            - gridcell "[DATA-1549] Optimize database queries (Performance Sprint)"
            - gridcell "⚡ Performance"
            - gridcell "Low"
            - gridcell "John Robinson John Robinson":
                - img "John Robinson"
                - text: John Robinson
            - gridcell "6/19/2025"
            - gridcell "$125"
            - gridcell "Todo"
            - gridcell "6%"
        - row "312 [APP-1312] Update README with examples (Sprint 25) 📝 Documentation High Priya Sharma Priya Sharma 5/28/2025 $5,850 Todo 16%":
            - gridcell "312"
            - gridcell "[APP-1312] Update README with examples (Sprint 25)"
            - gridcell "📝 Documentation"
            - gridcell "High"
            - gridcell "Priya Sharma Priya Sharma":
                - img "Priya Sharma"
                - text: Priya Sharma
            - gridcell "5/28/2025"
            - gridcell "$5,850"
            - gridcell "Todo"
            - gridcell "16%"
        - row "592 [ADMIN-1592] Write unit tests for auth module (Sprint 24) 🧪 Testing Critical Daniel Kim Daniel Kim 5/19/2025 $3,250 Todo 18%":
            - gridcell "592"
            - gridcell "[ADMIN-1592] Write unit tests for auth module (Sprint 24)"
            - gridcell "🧪 Testing"
            - gridcell "Critical"
            - gridcell "Daniel Kim Daniel Kim":
                - img "Daniel Kim"
                - text: Daniel Kim
            - gridcell "5/19/2025"
            - gridcell "$3,250"
            - gridcell "Todo"
            - gridcell "18%"
        - row "231 [APP-1231] Configure Docker containers 🔧 DevOps Critical Sophia Taylor Sophia Taylor 5/19/2025 $550 Todo 17%":
            - gridcell "231"
            - gridcell "[APP-1231] Configure Docker containers"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Sophia Taylor Sophia Taylor":
                - img "Sophia Taylor"
                - text: Sophia Taylor
            - gridcell "5/19/2025"
            - gridcell "$550"
            - gridcell "Todo"
            - gridcell "17%"
        - row "51 [FRONTEND-1051] Consolidate duplicate code (Sprint 26) ♻️ Refactor High Sophia Taylor Sophia Taylor 5/14/2025 $3,650 Todo 14%":
            - gridcell "51"
            - gridcell "[FRONTEND-1051] Consolidate duplicate code (Sprint 26)"
            - gridcell "♻️ Refactor"
            - gridcell "High"
            - gridcell "Sophia Taylor Sophia Taylor":
                - img "Sophia Taylor"
                - text: Sophia Taylor
            - gridcell "5/14/2025"
            - gridcell "$3,650"
            - gridcell "Todo"
            - gridcell "14%"
    - rowgroup
    - rowgroup
    - rowgroup
    - rowgroup:
        - row "$75,375 6%":
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell "$75,375"
            - gridcell
            - gridcell "6%"
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
>  81 |     await expect(firstDropdown.locator("button").first()).toContainText("Not Started");
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
   98 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
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
```
