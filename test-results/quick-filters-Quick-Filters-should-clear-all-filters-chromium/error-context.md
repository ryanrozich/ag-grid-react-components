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
- paragraph: "803"
- img
- paragraph: Total Budget
- paragraph: $3,288,125
- img
- paragraph: Progress
- paragraph: 33.3%
- img
- paragraph: Budget Remaining
- paragraph: $2,196,810
- text: 1 to 25 of 804. Page 1 of 33
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
    - row "95 [INFRA-1095] Implement social media sharing (Sprint 27) ✨ Feature Low Emily Jackson Emily Jackson 9/4/2025 $125 Backlog 0%":
      - gridcell "95"
      - gridcell "[INFRA-1095] Implement social media sharing (Sprint 27)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/4/2025"
      - gridcell "$125"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "166 [INFRA-1166] Implement two-factor authentication ✨ Feature High Emily Jackson Emily Jackson 8/23/2025 $1,800 Todo 15%":
      - gridcell "166"
      - gridcell "[INFRA-1166] Implement two-factor authentication"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/23/2025"
      - gridcell "$1,800"
      - gridcell "Todo"
      - gridcell "15%"
    - row "137 [INFRA-1137] Implement blue-green deployment (Sprint 26) 🔧 DevOps Medium Daniel Kim Daniel Kim 8/24/2025 $2,400 In Progress 38%":
      - gridcell "137"
      - gridcell "[INFRA-1137] Implement blue-green deployment (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/24/2025"
      - gridcell "$2,400"
      - gridcell "In Progress"
      - gridcell "38%"
    - row "651 [PROJ-1651] Configure security headers (Sprint 23) 🔒 Security High Sarah Johnson Sarah Johnson 8/14/2025 $875 In Review 68%":
      - gridcell "651"
      - gridcell "[PROJ-1651] Configure security headers (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/14/2025"
      - gridcell "$875"
      - gridcell "In Review"
      - gridcell "68%"
    - row "609 [WEB-1609] Document error handling patterns (Security Audit) 📝 Documentation High Priya Sharma Priya Sharma 8/13/2025 $300 Backlog 0%":
      - gridcell "609"
      - gridcell "[WEB-1609] Document error handling patterns (Security Audit)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/13/2025"
      - gridcell "$300"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "816 [PROJ-1816] Implement two-factor authentication (Sprint 27) ✨ Feature Critical Priya Sharma Priya Sharma 8/11/2025 $2,900 Backlog 0%":
      - gridcell "816"
      - gridcell "[PROJ-1816] Implement two-factor authentication (Sprint 27)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/11/2025"
      - gridcell "$2,900"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "238 [BACKEND-1238] Create architecture overview (Q2 Planning) 📝 Documentation Critical John Robinson John Robinson 8/9/2025 $650 Backlog 0%":
      - gridcell "238"
      - gridcell "[BACKEND-1238] Create architecture overview (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/9/2025"
      - gridcell "$650"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "558 [WEB-1558] Implement code splitting ⚡ Performance Medium Kevin Zhang Kevin Zhang 8/22/2025 $14,925 Testing 88%":
      - gridcell "558"
      - gridcell "[WEB-1558] Implement code splitting"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/22/2025"
      - gridcell "$14,925"
      - gridcell "Testing"
      - gridcell "88%"
    - row "845 [MOBILE-1845] Test error boundary behavior (Tech Debt) 🧪 Testing Critical Isabella Garcia Isabella Garcia 8/9/2025 $2,325 In Review 61%":
      - gridcell "845"
      - gridcell "[MOBILE-1845] Test error boundary behavior (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/9/2025"
      - gridcell "$2,325"
      - gridcell "In Review"
      - gridcell "61%"
    - row "136 [MOBILE-1136] Implement secrets management 🔧 DevOps Medium Isabella Garcia Isabella Garcia 8/16/2025 $8,550 Backlog 0%":
      - gridcell "136"
      - gridcell "[MOBILE-1136] Implement secrets management"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/16/2025"
      - gridcell "$8,550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "177 [USER-1177] Test offline functionality 🧪 Testing High Olivia Brown Olivia Brown 8/8/2025 $900 In Progress 41%":
      - gridcell "177"
      - gridcell "[USER-1177] Test offline functionality"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/8/2025"
      - gridcell "$900"
      - gridcell "In Progress"
      - gridcell "41%"
    - row "324 [FRONTEND-1324] Create integration test suite (Sprint 26) 🧪 Testing Medium Alex Chen Alex Chen 8/11/2025 $475 In Progress 57%":
      - gridcell "324"
      - gridcell "[FRONTEND-1324] Create integration test suite (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/11/2025"
      - gridcell "$475"
      - gridcell "In Progress"
      - gridcell "57%"
    - row "70 [DASH-1070] Implement social media sharing (Sprint 26) ✨ Feature Low Michael Anderson Michael Anderson 8/21/2025 $1,775 Backlog 0%":
      - gridcell "70"
      - gridcell "[DASH-1070] Implement social media sharing (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/21/2025"
      - gridcell "$1,775"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "328 [APP-1328] Configure load balancer 🔧 DevOps High Daniel Kim Daniel Kim 8/9/2025 $475 In Progress 21%":
      - gridcell "328"
      - gridcell "[APP-1328] Configure load balancer"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/9/2025"
      - gridcell "$475"
      - gridcell "In Progress"
      - gridcell "21%"
    - row "141 [FRONTEND-1141] Fix date picker timezone issue (Performance Sprint) 🐛 Bug Low Sophia Taylor Sophia Taylor 8/10/2025 $300 Blocked 35%":
      - gridcell "141"
      - gridcell "[FRONTEND-1141] Fix date picker timezone issue (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/10/2025"
      - gridcell "$300"
      - gridcell "Blocked"
      - gridcell "35%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,288,125 33%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,288,125"
      - gridcell
      - gridcell "33%"
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
- text: Page 1 of 33
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