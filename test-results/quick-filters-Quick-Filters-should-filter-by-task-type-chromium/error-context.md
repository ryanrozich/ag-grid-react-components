# Test info

- Name: Quick Filters >> should filter by task type
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:121:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    60 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:129:16
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
- button "Quick filter options" [expanded]:
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $4,052,200
- img
- paragraph: Progress
- paragraph: 46.9%
- img
- paragraph: Budget Remaining
- paragraph: $2,199,970
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
    - row "265 [APP-1265] Add CDN for static assets (Sprint 27) ⚡ Performance Critical Isabella Garcia Isabella Garcia 8/16/2025 $1,875 In Review 78%":
      - gridcell "265"
      - gridcell "[APP-1265] Add CDN for static assets (Sprint 27)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/16/2025"
      - gridcell "$1,875"
      - gridcell "In Review"
      - gridcell "78%"
    - row "89 [API-1089] Add brute force protection (Performance Sprint) 🔒 Security Medium Amanda White Amanda White 8/17/2025 $4,900 In Review 65%":
      - gridcell "89"
      - gridcell "[API-1089] Add brute force protection (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/17/2025"
      - gridcell "$4,900"
      - gridcell "In Review"
      - gridcell "65%"
    - row "162 [DASH-1162] Implement auto-scaling (Sprint 25) 🔧 DevOps Critical Kevin Zhang Kevin Zhang 8/14/2025 $4,725 Backlog 0%":
      - gridcell "162"
      - gridcell "[DASH-1162] Implement auto-scaling (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/14/2025"
      - gridcell "$4,725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "827 [UI-1827] Refactor authentication flow (Tech Debt) ♻️ Refactor Medium Sophia Taylor Sophia Taylor 8/29/2025 $225 In Progress 38%":
      - gridcell "827"
      - gridcell "[UI-1827] Refactor authentication flow (Tech Debt)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/29/2025"
      - gridcell "$225"
      - gridcell "In Progress"
      - gridcell "38%"
    - row "207 [ADMIN-1207] Resolve race condition in state update 🐛 Bug Critical Isabella Garcia Isabella Garcia 8/11/2025 $8,525 In Progress 22%":
      - gridcell "207"
      - gridcell "[ADMIN-1207] Resolve race condition in state update"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/11/2025"
      - gridcell "$8,525"
      - gridcell "In Progress"
      - gridcell "22%"
    - row "372 [CORE-1372] Resolve memory leak in data grid (Performance Sprint) 🐛 Bug Critical Marcus Williams Marcus Williams 8/10/2025 $6,850 In Progress 36%":
      - gridcell "372"
      - gridcell "[CORE-1372] Resolve memory leak in data grid (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/10/2025"
      - gridcell "$6,850"
      - gridcell "In Progress"
      - gridcell "36%"
    - row "598 [BACKEND-1598] Refactor state management ♻️ Refactor Low Amanda White Amanda White 9/3/2025 $350 Backlog 0%":
      - gridcell "598"
      - gridcell "[BACKEND-1598] Refactor state management"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/3/2025"
      - gridcell "$350"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "843 [CORE-1843] Fix login form validation error (Security Audit) 🐛 Bug High David Lee David Lee 8/12/2025 $4,225 Blocked 16%":
      - gridcell "843"
      - gridcell "[CORE-1843] Fix login form validation error (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/12/2025"
      - gridcell "$4,225"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "83 [UI-1083] Implement code splitting (Q2 Planning) ⚡ Performance Critical Isabella Garcia Isabella Garcia 8/9/2025 $975 Backlog 0%":
      - gridcell "83"
      - gridcell "[UI-1083] Implement code splitting (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/9/2025"
      - gridcell "$975"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "700 [AUTH-1700] Implement social media sharing ✨ Feature Low Michael Anderson Michael Anderson 9/16/2025 $800 In Progress 20%":
      - gridcell "700"
      - gridcell "[AUTH-1700] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/16/2025"
      - gridcell "$800"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "777 [ADMIN-1777] Create data visualization charts (Sprint 24) ✨ Feature Low Sarah Johnson Sarah Johnson 8/25/2025 $2,525 Backlog 0%":
      - gridcell "777"
      - gridcell "[ADMIN-1777] Create data visualization charts (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/25/2025"
      - gridcell "$2,525"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "412 [BACKEND-1412] Extract business logic layer (Performance Sprint) ♻️ Refactor Medium Alex Chen Alex Chen 8/16/2025 $825 Todo 7%":
      - gridcell "412"
      - gridcell "[BACKEND-1412] Extract business logic layer (Performance Sprint)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/16/2025"
      - gridcell "$825"
      - gridcell "Todo"
      - gridcell "7%"
    - row "447 [PROJ-1447] Migrate to TypeScript strict mode (Q1 Goals) ♻️ Refactor Critical Emily Jackson Emily Jackson 8/8/2025 $3,650 Backlog 0%":
      - gridcell "447"
      - gridcell "[PROJ-1447] Migrate to TypeScript strict mode (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/8/2025"
      - gridcell "$3,650"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "393 [WEB-1393] Handle null pointer exception in API client (Q2 Planning) 🐛 Bug Critical Alex Chen Alex Chen 8/4/2025 $325 Todo 16%":
      - gridcell "393"
      - gridcell "[WEB-1393] Handle null pointer exception in API client (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/4/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "16%"
    - row "617 [AUTH-1617] Set up infrastructure as code (Sprint 25) 🔧 DevOps Low Ryan Thomas Ryan Thomas 8/29/2025 $550 Backlog 0%":
      - gridcell "617"
      - gridcell "[AUTH-1617] Set up infrastructure as code (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/29/2025"
      - gridcell "$550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "630 [APP-1630] Implement caching strategy (Q2 Planning) ⚡ Performance Critical Maya Patel Maya Patel 8/5/2025 $4,875 Testing 81%":
      - gridcell "630"
      - gridcell "[APP-1630] Implement caching strategy (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/5/2025"
      - gridcell "$4,875"
      - gridcell "Testing"
      - gridcell "81%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,052,200 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,052,200"
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
- listbox "Quick filter options":
  - option "All Tasks"
  - option "Critical Bugs"
  - option "Features"
  - option "In Progress"
  - option "Blocked"
```

# Test source

```ts
   29 |     await expect(activeFilters).toBeVisible();
   30 |
   31 |     // Verify the filter is working by checking row count
   32 |     const rowCount = await page.locator(".ag-row").count();
   33 |     expect(rowCount).toBeGreaterThan(0);
   34 |     expect(rowCount).toBeLessThan(25); // Should be filtered, not showing all 1000 rows
   35 |   });
   36 |
   37 |   test("should filter by time period", async ({ page }) => {
   38 |     // Click on the first quick filter dropdown
   39 |     const firstDropdown = page
   40 |       .locator('[data-testid="quick-filter-dropdown"]')
   41 |       .first();
   42 |     await firstDropdown.locator("button").first().click();
   43 |
   44 |     // Wait for dropdown menu to be visible
   45 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   46 |
   47 |     // Select "This Month"
   48 |     await page
   49 |       .locator('[role="option"]')
   50 |       .filter({ hasText: "This Month" })
   51 |       .click();
   52 |
   53 |     // Verify the dropdown shows the new selection
   54 |     await expect(firstDropdown.locator("button").first()).toContainText(
   55 |       "This Month",
   56 |     );
   57 |
   58 |     // Verify row count changed
   59 |     const rowCount = await page.locator(".ag-row").count();
   60 |     expect(rowCount).toBeGreaterThan(0);
   61 |   });
   62 |
   63 |   test("should filter by Overdue tasks", async ({ page }) => {
   64 |     // Click on the first quick filter dropdown
   65 |     const firstDropdown = page
   66 |       .locator('[data-testid="quick-filter-dropdown"]')
   67 |       .first();
   68 |     await firstDropdown.locator("button").first().click();
   69 |
   70 |     // Select "Overdue"
   71 |     await page
   72 |       .locator('[role="option"]')
   73 |       .filter({ hasText: "Overdue" })
   74 |       .click();
   75 |
   76 |     // Verify the dropdown shows the new selection
   77 |     await expect(firstDropdown.locator("button").first()).toContainText(
   78 |       "Overdue",
   79 |     );
   80 |
   81 |     // Verify that no "Done" status tasks are shown
   82 |     const statusCells = await page
   83 |       .locator('.ag-cell[col-id="status"]')
   84 |       .allTextContents();
   85 |
   86 |     // Check that none of the visible statuses are "Done"
   87 |     for (const status of statusCells) {
   88 |       expect(status).not.toBe("Done");
   89 |     }
   90 |   });
   91 |
   92 |   test("should filter by Not Started tasks", async ({ page }) => {
   93 |     // Click on the first quick filter dropdown
   94 |     const firstDropdown = page
   95 |       .locator('[data-testid="quick-filter-dropdown"]')
   96 |       .first();
   97 |     await firstDropdown.locator("button").first().click();
   98 |
   99 |     // Select "Not Started"
  100 |     await page
  101 |       .locator('[role="option"]')
  102 |       .filter({ hasText: "Not Started" })
  103 |       .click();
  104 |
  105 |     // Verify the dropdown shows the new selection
  106 |     await expect(firstDropdown.locator("button").first()).toContainText(
  107 |       "Not Started",
  108 |     );
  109 |
  110 |     // Verify that only "Backlog" or "Todo" status tasks are shown
  111 |     const statusCells = await page
  112 |       .locator('.ag-cell[col-id="status"]')
  113 |       .allTextContents();
  114 |
  115 |     // Check that all visible statuses are either "Backlog" or "Todo"
  116 |     for (const status of statusCells) {
  117 |       expect(["Backlog", "Todo"]).toContain(status);
  118 |     }
  119 |   });
  120 |
  121 |   test("should filter by task type", async ({ page }) => {
  122 |     // Click on the second quick filter dropdown (task type)
  123 |     const secondDropdown = page
  124 |       .locator('[data-testid="quick-filter-dropdown"]')
  125 |       .nth(1);
  126 |     await secondDropdown.locator("button").first().click();
  127 |
  128 |     // Wait for dropdown menu to be visible
> 129 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  130 |
  131 |     // Select "Critical Bugs"
  132 |     await page
  133 |       .locator('[role="option"]')
  134 |       .filter({ hasText: "Critical Bugs" })
  135 |       .click();
  136 |
  137 |     // Verify the dropdown shows the new selection
  138 |     await expect(secondDropdown.locator("button").first()).toContainText(
  139 |       "Critical Bugs",
  140 |     );
  141 |
  142 |     // Verify that only Bug category with Critical/High priority are shown
  143 |     const categoryCells = await page
  144 |       .locator('.ag-cell[col-id="category"]')
  145 |       .allTextContents();
  146 |     const priorityCells = await page
  147 |       .locator('.ag-cell[col-id="priority"]')
  148 |       .allTextContents();
  149 |
  150 |     // Check categories are all "Bug"
  151 |     for (const category of categoryCells) {
  152 |       expect(category).toBe("Bug");
  153 |     }
  154 |
  155 |     // Check priorities are either "Critical" or "High"
  156 |     for (const priority of priorityCells) {
  157 |       expect(["Critical", "High"]).toContain(priority);
  158 |     }
  159 |   });
  160 |
  161 |   test("should clear all filters", async ({ page }) => {
  162 |     // Wait for default filter first
  163 |     await page.waitForTimeout(1500);
  164 |
  165 |     // Apply another filter
  166 |     const firstDropdown = page
  167 |       .locator('[data-testid="quick-filter-dropdown"]')
  168 |       .first();
  169 |     await firstDropdown.locator("button").first().click();
  170 |     await page
  171 |       .locator('[role="option"]')
  172 |       .filter({ hasText: "Overdue" })
  173 |       .click();
  174 |
  175 |     // Wait for filter to apply
  176 |     await page.waitForTimeout(1000);
  177 |
  178 |     // Verify filter is applied
  179 |     await expect(firstDropdown.locator("button").first()).toContainText(
  180 |       "Overdue",
  181 |     );
  182 |
  183 |     // Clear the filter by selecting "All Time"
  184 |     await firstDropdown.locator("button").first().click();
  185 |     await page
  186 |       .locator('[role="option"]')
  187 |       .filter({ hasText: "All Time" })
  188 |       .click();
  189 |
  190 |     // Wait for filter to clear
  191 |     await page.waitForTimeout(1000);
  192 |
  193 |     // Verify the dropdown shows "All Time"
  194 |     await expect(firstDropdown.locator("button").first()).toContainText(
  195 |       "All Time",
  196 |     );
  197 |
  198 |     // Active filters should not be visible
  199 |     const activeFilters = page.locator('[data-testid="active-filters"]');
  200 |     await expect(activeFilters).not.toBeVisible();
  201 |   });
  202 |
  203 |   test("should combine time and task type filters", async ({ page }) => {
  204 |     // Apply time filter
  205 |     const firstDropdown = page
  206 |       .locator('[data-testid="quick-filter-dropdown"]')
  207 |       .first();
  208 |     await firstDropdown.locator("button").first().click();
  209 |     await page
  210 |       .locator('[role="option"]')
  211 |       .filter({ hasText: "This Month" })
  212 |       .click();
  213 |
  214 |     // Apply task type filter
  215 |     const secondDropdown = page
  216 |       .locator('[data-testid="quick-filter-dropdown"]')
  217 |       .nth(1);
  218 |     await secondDropdown.locator("button").first().click();
  219 |     await page
  220 |       .locator('[role="option"]')
  221 |       .filter({ hasText: "Features" })
  222 |       .click();
  223 |
  224 |     // Verify both filters are applied
  225 |     await expect(firstDropdown.locator("button").first()).toContainText(
  226 |       "This Month",
  227 |     );
  228 |     await expect(secondDropdown.locator("button").first()).toContainText(
  229 |       "Features",
```