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
  - text: All Tasks
  - img
- text: "Status: Backlog, Todo, In Progress, In Review, Testing, Blocked"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "791"
- img
- paragraph: Total Budget
- paragraph: $3,218,175
- img
- paragraph: Progress
- paragraph: 32.8%
- img
- paragraph: Budget Remaining
- paragraph: $2,177,389
- text: 1 to 25 of 792. Page 1 of 32
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
    - row "496 [WEB-1496] Debug crash on mobile Safari 🐛 Bug Low Sophia Taylor Sophia Taylor 8/31/2025 $2,600 Testing 82%":
      - gridcell "496"
      - gridcell "[WEB-1496] Debug crash on mobile Safari"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/31/2025"
      - gridcell "$2,600"
      - gridcell "Testing"
      - gridcell "82%"
    - row "184 [PROJ-1184] Optimize database queries ♻️ Refactor High David Lee David Lee 8/12/2025 $6,575 Backlog 0%":
      - gridcell "184"
      - gridcell "[PROJ-1184] Optimize database queries"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/12/2025"
      - gridcell "$6,575"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "533 [API-1533] Update README with examples (Sprint 23) 📝 Documentation Critical James Wilson James Wilson 8/10/2025 $250 In Review 74%":
      - gridcell "533"
      - gridcell "[API-1533] Update README with examples (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/10/2025"
      - gridcell "$250"
      - gridcell "In Review"
      - gridcell "74%"
    - row "890 [MOBILE-1890] Implement OAuth integration ✨ Feature Critical Daniel Kim Daniel Kim 8/10/2025 $3,700 Backlog 0%":
      - gridcell "890"
      - gridcell "[MOBILE-1890] Implement OAuth integration"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/10/2025"
      - gridcell "$3,700"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "92 [BACKEND-1092] Add request batching (Security Audit) ⚡ Performance Low Sarah Johnson Sarah Johnson 9/8/2025 $375 Todo 17%":
      - gridcell "92"
      - gridcell "[BACKEND-1092] Add request batching (Security Audit)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/8/2025"
      - gridcell "$375"
      - gridcell "Todo"
      - gridcell "17%"
    - row "874 [CORE-1874] Add performance benchmarks 🧪 Testing Medium John Robinson John Robinson 8/14/2025 $6,700 Backlog 0%":
      - gridcell "874"
      - gridcell "[CORE-1874] Add performance benchmarks"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/14/2025"
      - gridcell "$6,700"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "137 [BACKEND-1137] Configure Docker containers (Performance Sprint) 🔧 DevOps Medium Sophia Taylor Sophia Taylor 8/26/2025 $275 Backlog 0%":
      - gridcell "137"
      - gridcell "[BACKEND-1137] Configure Docker containers (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/26/2025"
      - gridcell "$275"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "142 [UI-1142] Set up vulnerability scanning (Q2 Planning) 🔒 Security Medium Maya Patel Maya Patel 8/10/2025 $3,650 In Progress 56%":
      - gridcell "142"
      - gridcell "[UI-1142] Set up vulnerability scanning (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/10/2025"
      - gridcell "$3,650"
      - gridcell "In Progress"
      - gridcell "56%"
    - row "395 [FRONTEND-1395] Configure Docker containers (Tech Debt) 🔧 DevOps Medium Jessica Lopez Jessica Lopez 8/25/2025 $3,500 In Progress 41%":
      - gridcell "395"
      - gridcell "[FRONTEND-1395] Configure Docker containers (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/25/2025"
      - gridcell "$3,500"
      - gridcell "In Progress"
      - gridcell "41%"
    - row "629 [DATA-1629] Create data visualization charts (Sprint 25) ✨ Feature Critical Chris Martinez Chris Martinez 8/6/2025 $3,100 Todo 10%":
      - gridcell "629"
      - gridcell "[DATA-1629] Create data visualization charts (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/6/2025"
      - gridcell "$3,100"
      - gridcell "Todo"
      - gridcell "10%"
    - row "202 [CORE-1202] Set up SSL certificates (Tech Debt) 🔒 Security Medium Jessica Lopez Jessica Lopez 8/10/2025 $12,200 Backlog 0%":
      - gridcell "202"
      - gridcell "[CORE-1202] Set up SSL certificates (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/10/2025"
      - gridcell "$12,200"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "755 [DATA-1755] Add progressive web app features (Sprint 24) ⚡ Performance Critical Isabella Garcia Isabella Garcia 8/6/2025 $2,450 Todo 18%":
      - gridcell "755"
      - gridcell "[DATA-1755] Add progressive web app features (Sprint 24)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/6/2025"
      - gridcell "$2,450"
      - gridcell "Todo"
      - gridcell "18%"
    - row "778 [APP-1778] Configure security headers (Sprint 23) 🔒 Security Critical Kevin Zhang Kevin Zhang 8/3/2025 $550 Backlog 0%":
      - gridcell "778"
      - gridcell "[APP-1778] Configure security headers (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/3/2025"
      - gridcell "$550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "542 [MOBILE-1542] Resolve CORS issue with external API (Q1 Goals) 🐛 Bug Low Alex Chen Alex Chen 8/16/2025 $3,625 In Progress 55%":
      - gridcell "542"
      - gridcell "[MOBILE-1542] Resolve CORS issue with external API (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/16/2025"
      - gridcell "$3,625"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "298 [BACKEND-1298] Clean up deprecated APIs (Q1 Goals) ♻️ Refactor High John Robinson John Robinson 8/5/2025 $7,350 Backlog 0%":
      - gridcell "298"
      - gridcell "[BACKEND-1298] Clean up deprecated APIs (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/5/2025"
      - gridcell "$7,350"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,218,175 33%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,218,175"
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