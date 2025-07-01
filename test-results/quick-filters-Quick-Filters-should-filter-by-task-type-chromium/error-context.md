# Test info

- Name: Quick Filters >> should filter by task type
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:121:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    61 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

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
- paragraph: $4,151,425
- img
- paragraph: Progress
- paragraph: 45.4%
- img
- paragraph: Budget Remaining
- paragraph: $2,342,148
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
    - row "259 [MOBILE-1259] Implement API key rotation (Tech Debt) 🔒 Security Medium Olivia Brown Olivia Brown 8/19/2025 $3,625 Backlog 0%":
      - gridcell "259"
      - gridcell "[MOBILE-1259] Implement API key rotation (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/19/2025"
      - gridcell "$3,625"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "52 [BACKEND-1052] Correct data corruption in cache layer 🐛 Bug High Emma Davis Emma Davis 8/12/2025 $17,625 Backlog 0%":
      - gridcell "52"
      - gridcell "[BACKEND-1052] Correct data corruption in cache layer"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/12/2025"
      - gridcell "$17,625"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "934 [ADMIN-1934] Add input sanitization (Sprint 25) 🔒 Security High Sophia Taylor Sophia Taylor 8/15/2025 $8,600 Todo 10%":
      - gridcell "934"
      - gridcell "[ADMIN-1934] Add input sanitization (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/15/2025"
      - gridcell "$8,600"
      - gridcell "Todo"
      - gridcell "10%"
    - row "840 [API-1840] Implement blue-green deployment 🔧 DevOps Critical Maya Patel Maya Patel 8/12/2025 $4,025 Backlog 0%":
      - gridcell "840"
      - gridcell "[API-1840] Implement blue-green deployment"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/12/2025"
      - gridcell "$4,025"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "83 [BACKEND-1083] Implement virtual scrolling ⚡ Performance High John Robinson John Robinson 8/15/2025 $7,700 Todo 14%":
      - gridcell "83"
      - gridcell "[BACKEND-1083] Implement virtual scrolling"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/15/2025"
      - gridcell "$7,700"
      - gridcell "Todo"
      - gridcell "14%"
    - row "295 [ADMIN-1295] Configure security headers (Tech Debt) 🔒 Security High Olivia Brown Olivia Brown 8/12/2025 $4,200 Testing 84%":
      - gridcell "295"
      - gridcell "[ADMIN-1295] Configure security headers (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/12/2025"
      - gridcell "$4,200"
      - gridcell "Testing"
      - gridcell "84%"
    - row "485 [CORE-1485] Create load testing scenarios (Tech Debt) 🧪 Testing Low James Wilson James Wilson 9/18/2025 $375 Backlog 0%":
      - gridcell "485"
      - gridcell "[CORE-1485] Create load testing scenarios (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/18/2025"
      - gridcell "$375"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "199 [UI-1199] Write deployment guide (Sprint 26) 📝 Documentation Critical James Wilson James Wilson 8/8/2025 $9,475 In Progress 28%":
      - gridcell "199"
      - gridcell "[UI-1199] Write deployment guide (Sprint 26)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/8/2025"
      - gridcell "$9,475"
      - gridcell "In Progress"
      - gridcell "28%"
    - row "481 [WEB-1481] Set up staging environment 🔧 DevOps Critical John Robinson John Robinson 8/8/2025 $1,625 In Progress 22%":
      - gridcell "481"
      - gridcell "[WEB-1481] Set up staging environment"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/8/2025"
      - gridcell "$1,625"
      - gridcell "In Progress"
      - gridcell "22%"
    - row "558 [APP-1558] Implement secure file upload (Q1 Goals) 🔒 Security Low Daniel Kim Daniel Kim 8/16/2025 $8,050 In Progress 32%":
      - gridcell "558"
      - gridcell "[APP-1558] Implement secure file upload (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/16/2025"
      - gridcell "$8,050"
      - gridcell "In Progress"
      - gridcell "32%"
    - row "567 [WEB-1567] Update API documentation 📝 Documentation Critical Daniel Kim Daniel Kim 8/10/2025 $7,275 Todo 13%":
      - gridcell "567"
      - gridcell "[WEB-1567] Update API documentation"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/10/2025"
      - gridcell "$7,275"
      - gridcell "Todo"
      - gridcell "13%"
    - row "578 [USER-1578] Implement caching strategy (Q1 Goals) ⚡ Performance Low Chris Martinez Chris Martinez 9/11/2025 $18,075 Todo 5%":
      - gridcell "578"
      - gridcell "[USER-1578] Implement caching strategy (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/11/2025"
      - gridcell "$18,075"
      - gridcell "Todo"
      - gridcell "5%"
    - row "70 [AUTH-1070] Extract business logic layer (Security Audit) ♻️ Refactor Medium Jessica Lopez Jessica Lopez 8/20/2025 $550 Todo 10%":
      - gridcell "70"
      - gridcell "[AUTH-1070] Extract business logic layer (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/20/2025"
      - gridcell "$550"
      - gridcell "Todo"
      - gridcell "10%"
    - row "878 [DASH-1878] Set up log aggregation (Sprint 23) 🔧 DevOps Medium David Lee David Lee 8/17/2025 $6,975 Backlog 0%":
      - gridcell "878"
      - gridcell "[DASH-1878] Set up log aggregation (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/17/2025"
      - gridcell "$6,975"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "153 [AUTH-1153] Add input sanitization (Sprint 27) 🔒 Security Low Isabella Garcia Isabella Garcia 8/12/2025 $6,275 Backlog 0%":
      - gridcell "153"
      - gridcell "[AUTH-1153] Add input sanitization (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/12/2025"
      - gridcell "$6,275"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "316 [INFRA-1316] Clean up deprecated APIs (Q2 Planning) ♻️ Refactor Medium Ryan Thomas Ryan Thomas 8/23/2025 $525 Backlog 0%":
      - gridcell "316"
      - gridcell "[INFRA-1316] Clean up deprecated APIs (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/23/2025"
      - gridcell "$525"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,151,425 45%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,151,425"
      - gridcell
      - gridcell "45%"
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