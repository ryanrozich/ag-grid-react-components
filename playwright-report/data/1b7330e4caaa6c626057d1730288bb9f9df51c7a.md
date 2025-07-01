# Test info

- Name: Quick Filters >> should clear all filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:161:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).not.toBeVisible()

Locator: locator('[data-testid="active-filters"]')
Expected: not visible
Received: visible
Call log:
  - expect.not.toBeVisible with timeout 5000ms
  - waiting for locator('[data-testid="active-filters"]')
    9 × locator resolved to <div class="_container_1cj0q_1 " data-testid="active-filters">…</div>
      - unexpected value "visible"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:200:37
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
- text: "Status: Backlog, Todo, In Progress, In Review, Testing, Blocked"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "797"
- img
- paragraph: Total Budget
- paragraph: $3,499,550
- img
- paragraph: Progress
- paragraph: 33.6%
- img
- paragraph: Budget Remaining
- paragraph: $2,343,093
- text: 1 to 25 of 798. Page 1 of 32
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
    - row "141 [CORE-1141] Write component snapshot tests (Sprint 27) 🧪 Testing High Michael Anderson Michael Anderson 8/21/2025 $9,950 Todo 6%":
      - gridcell "141"
      - gridcell "[CORE-1141] Write component snapshot tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/21/2025"
      - gridcell "$9,950"
      - gridcell "Todo"
      - gridcell "6%"
    - row "879 [API-1879] Optimize render performance (Q2 Planning) ⚡ Performance Medium Sophia Taylor Sophia Taylor 8/29/2025 $1,175 Testing 87%":
      - gridcell "879"
      - gridcell "[API-1879] Optimize render performance (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/29/2025"
      - gridcell "$1,175"
      - gridcell "Testing"
      - gridcell "87%"
    - row "540 [APP-1540] Create onboarding tutorial 📝 Documentation Low Marcus Williams Marcus Williams 9/6/2025 $575 Testing 81%":
      - gridcell "540"
      - gridcell "[APP-1540] Create onboarding tutorial"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/6/2025"
      - gridcell "$575"
      - gridcell "Testing"
      - gridcell "81%"
    - row "963 [DASH-1963] Consolidate duplicate code ♻️ Refactor High James Wilson James Wilson 8/15/2025 $100 In Review 72%":
      - gridcell "963"
      - gridcell "[DASH-1963] Consolidate duplicate code"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/15/2025"
      - gridcell "$100"
      - gridcell "In Review"
      - gridcell "72%"
    - row "81 [APP-1081] Write accessibility tests (Sprint 27) 🧪 Testing Medium Michael Anderson Michael Anderson 8/27/2025 $900 Backlog 0%":
      - gridcell "81"
      - gridcell "[APP-1081] Write accessibility tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/27/2025"
      - gridcell "$900"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "194 [DATA-1194] Set up vulnerability scanning 🔒 Security Medium Olivia Brown Olivia Brown 8/15/2025 $375 Backlog 0%":
      - gridcell "194"
      - gridcell "[DATA-1194] Set up vulnerability scanning"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/15/2025"
      - gridcell "$375"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "647 [ADMIN-1647] Write migration guide for v2 (Sprint 27) 📝 Documentation Low Sarah Johnson Sarah Johnson 9/13/2025 $475 In Progress 44%":
      - gridcell "647"
      - gridcell "[ADMIN-1647] Write migration guide for v2 (Sprint 27)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/13/2025"
      - gridcell "$475"
      - gridcell "In Progress"
      - gridcell "44%"
    - row "169 [BACKEND-1169] Add performance benchmarks (Sprint 24) 🧪 Testing Low Sophia Taylor Sophia Taylor 9/4/2025 $500 In Progress 49%":
      - gridcell "169"
      - gridcell "[BACKEND-1169] Add performance benchmarks (Sprint 24)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/4/2025"
      - gridcell "$500"
      - gridcell "In Progress"
      - gridcell "49%"
    - row "878 [INFRA-1878] Test error boundary behavior (Sprint 23) 🧪 Testing Critical Olivia Brown Olivia Brown 8/5/2025 $300 In Progress 31%":
      - gridcell "878"
      - gridcell "[INFRA-1878] Test error boundary behavior (Sprint 23)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/5/2025"
      - gridcell "$300"
      - gridcell "In Progress"
      - gridcell "31%"
    - row "361 [APP-1361] Create advanced search filters (Performance Sprint) ✨ Feature Low Amanda White Amanda White 8/26/2025 $18,075 Backlog 0%":
      - gridcell "361"
      - gridcell "[APP-1361] Create advanced search filters (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/26/2025"
      - gridcell "$18,075"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "383 [DASH-1383] Add internationalization tests 🧪 Testing Low Isabella Garcia Isabella Garcia 8/31/2025 $10,075 In Progress 35%":
      - gridcell "383"
      - gridcell "[DASH-1383] Add internationalization tests"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/31/2025"
      - gridcell "$10,075"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "612 [CORE-1612] Optimize database queries (Performance Sprint) ⚡ Performance Critical James Wilson James Wilson 8/6/2025 $4,850 In Review 63%":
      - gridcell "612"
      - gridcell "[CORE-1612] Optimize database queries (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/6/2025"
      - gridcell "$4,850"
      - gridcell "In Review"
      - gridcell "63%"
    - row "128 [DATA-1128] Implement session management (Sprint 26) 🔒 Security High Jessica Lopez Jessica Lopez 8/3/2025 $2,800 Testing 83%":
      - gridcell "128"
      - gridcell "[DATA-1128] Implement session management (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/3/2025"
      - gridcell "$2,800"
      - gridcell "Testing"
      - gridcell "83%"
    - row "213 [API-1213] Migrate to new testing framework ♻️ Refactor Low Olivia Brown Olivia Brown 8/18/2025 $7,725 Todo 15%":
      - gridcell "213"
      - gridcell "[API-1213] Migrate to new testing framework"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/18/2025"
      - gridcell "$7,725"
      - gridcell "Todo"
      - gridcell "15%"
    - row "482 [AUTH-1482] Test mobile responsiveness (Performance Sprint) 🧪 Testing Medium Sarah Johnson Sarah Johnson 8/18/2025 $9,475 Backlog 0%":
      - gridcell "482"
      - gridcell "[AUTH-1482] Test mobile responsiveness (Performance Sprint)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/18/2025"
      - gridcell "$9,475"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,499,550 34%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,499,550"
      - gridcell
      - gridcell "34%"
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
- text: Page 1 of 32
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
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
  129 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
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
> 200 |     await expect(activeFilters).not.toBeVisible();
      |                                     ^ Error: Timed out 5000ms waiting for expect(locator).not.toBeVisible()
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
  230 |     );
  231 |
  232 |     // Verify that only Feature category tasks are shown
  233 |     const categoryCells = await page
  234 |       .locator('.ag-cell[col-id="category"]')
  235 |       .allTextContents();
  236 |     for (const category of categoryCells) {
  237 |       expect(category).toBe("Feature");
  238 |     }
  239 |
  240 |     // There should be fewer rows due to combined filters
  241 |     const rowCount = await page.locator(".ag-row").count();
  242 |     expect(rowCount).toBeGreaterThan(0);
  243 |     expect(rowCount).toBeLessThan(10); // Combined filters should show very few rows
  244 |   });
  245 |
  246 |   test("should update stats when filters are applied", async ({ page }) => {
  247 |     // Get initial task count
  248 |     const initialTaskCount = await page
  249 |       .locator('p:has-text("Number of Tasks") + p')
  250 |       .textContent();
  251 |     const initialCount = parseInt(initialTaskCount?.replace(/,/g, "") || "0");
  252 |
  253 |     // Apply a filter
  254 |     const firstDropdown = page
  255 |       .locator('[data-testid="quick-filter-dropdown"]')
  256 |       .first();
  257 |     await firstDropdown.locator("button").first().click();
  258 |     await page
  259 |       .locator('[role="option"]')
  260 |       .filter({ hasText: "Overdue" })
  261 |       .click();
  262 |
  263 |     // Wait for grid to update
  264 |     await page.waitForTimeout(500);
  265 |
  266 |     // Get new task count
  267 |     const newTaskCount = await page
  268 |       .locator('p:has-text("Number of Tasks") + p')
  269 |       .textContent();
  270 |     const newCount = parseInt(newTaskCount?.replace(/,/g, "") || "0");
  271 |
  272 |     // Task count should decrease when filter is applied
  273 |     expect(newCount).toBeLessThan(initialCount);
  274 |     expect(newCount).toBeGreaterThan(0);
  275 |   });
  276 | });
  277 |
```