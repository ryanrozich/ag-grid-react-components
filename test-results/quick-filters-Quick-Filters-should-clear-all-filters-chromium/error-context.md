# Test info

- Name: Quick Filters >> should clear all filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:161:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Overdue"
Received string: "Time period"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_o1lml_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Time period"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:179:59
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
  - button "Show version details": v0.2.0-rc1+20 release/v0.2.0-rc1
  - link "NPM":
    - /url: https://www.npmjs.com/package/ag-grid-react-components
    - img
    - text: NPM
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
  - button "Filter PresetsNEW"
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: Time period
  - img
- button "Quick filter options":
  - text: Task type
  - img
- text: "Due Date: before Today"
- button "Remove Due Date filter": ×
- text: "Status: Backlog, Todo, In Progress, In Review, Testing, Blocked"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- button "My Views":
  - img
  - text: My Views
  - img
- button "Filter view options":
  - img
- img
- paragraph: Number of Tasks
- paragraph: 5,630
- img
- paragraph: Total Budget
- paragraph: $23,574,850
- img
- paragraph: Average Progress
- paragraph: 32.7%
- img
- paragraph: Budget Remaining
- paragraph: $15,900,943
- grid:
  - rowgroup:
    - row "ID":
      - columnheader "ID"
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value":
      - columnheader "Column with Header Selection":
        - checkbox "Column with Header Selection"
      - columnheader "Task"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "% Delivered"
      - columnheader "Value"
  - rowgroup:
    - row "FRONTEND-6920":
      - gridcell "FRONTEND-6920"
    - row "ADMIN-1089":
      - gridcell "ADMIN-1089"
    - row "FRONTEND-3368":
      - gridcell "FRONTEND-3368"
    - row "WEB-4008":
      - gridcell "WEB-4008"
    - row "INFRA-4262":
      - gridcell "INFRA-4262"
    - row "FRONTEND-4474":
      - gridcell "FRONTEND-4474"
    - row "ADMIN-5152":
      - gridcell "ADMIN-5152"
    - row "MOBILE-6670":
      - gridcell "MOBILE-6670"
    - row "WEB-7364":
      - gridcell "WEB-7364"
    - row "AUTH-9848":
      - gridcell "AUTH-9848"
    - row "MOBILE-10498":
      - gridcell "MOBILE-10498"
    - row "MOBILE-2369":
      - gridcell "MOBILE-2369"
    - row "PROJ-4399":
      - gridcell "PROJ-4399"
    - row "DATA-4657":
      - gridcell "DATA-4657"
    - row "PROJ-4800":
      - gridcell "PROJ-4800"
    - row "CORE-5068":
      - gridcell "CORE-5068"
    - row "INFRA-5156":
      - gridcell "INFRA-5156"
    - row "ADMIN-5902":
      - gridcell "ADMIN-5902"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Implement rate limiting Backlog Critical 🔒 Security KZ Kevin Zhang 7/8/2025 0% $300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement rate limiting"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "KZ Kevin Zhang"
      - gridcell "7/8/2025"
      - gridcell "0%"
      - gridcell "$300"
    - row "Press Space to toggle row selection (unchecked) Optimize database queries (Tech Debt) In Progress Critical ⚡ Performance Maya Patel Maya Patel 7/8/2025 20% $5,850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Optimize database queries (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "7/8/2025"
      - gridcell "20%"
      - gridcell "$5,850"
    - row "Press Space to toggle row selection (unchecked) Create onboarding tutorial (Sprint 27) In Progress Critical 📝 Documentation Ryan Thomas Ryan Thomas 7/8/2025 27% $875":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create onboarding tutorial (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "7/8/2025"
      - gridcell "27%"
      - gridcell "$875"
    - row "Press Space to toggle row selection (unchecked) Add SQL injection prevention (Performance Sprint) Blocked Critical 🔒 Security Michael Anderson Michael Anderson 7/8/2025 19% $1,925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add SQL injection prevention (Performance Sprint)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "7/8/2025"
      - gridcell "19%"
      - gridcell "$1,925"
    - row "Press Space to toggle row selection (unchecked) Correct CSS overflow in sidebar (Q1 Goals) In Progress Critical 🐛 Bug James Wilson James Wilson 7/7/2025 41% $725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct CSS overflow in sidebar (Q1 Goals)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "7/7/2025"
      - gridcell "41%"
      - gridcell "$725"
    - row "Press Space to toggle row selection (unchecked) Set up SSL certificates (Security Audit) Blocked Critical 🔒 Security JR John Robinson 7/8/2025 17% $1,500":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up SSL certificates (Security Audit)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "JR John Robinson"
      - gridcell "7/8/2025"
      - gridcell "17%"
      - gridcell "$1,500"
    - row "Press Space to toggle row selection (unchecked) Fix responsive layout on tablets (Sprint 27) Testing Critical 🐛 Bug JR John Robinson 7/8/2025 83% $850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix responsive layout on tablets (Sprint 27)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "JR John Robinson"
      - gridcell "7/8/2025"
      - gridcell "83%"
      - gridcell "$850"
    - row "Press Space to toggle row selection (unchecked) Fix broken unit tests in CI pipeline Todo Critical 🐛 Bug EJ Emily Jackson 7/7/2025 18% $750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken unit tests in CI pipeline"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "EJ Emily Jackson"
      - gridcell "7/7/2025"
      - gridcell "18%"
      - gridcell "$750"
    - row "Press Space to toggle row selection (unchecked) Set up SSL certificates (Q2 Planning) In Progress Critical 🔒 Security KZ Kevin Zhang 7/7/2025 41% $9,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up SSL certificates (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "KZ Kevin Zhang"
      - gridcell "7/7/2025"
      - gridcell "41%"
      - gridcell "$9,300"
    - row "Press Space to toggle row selection (unchecked) Write deployment guide (Sprint 24) Blocked Critical 📝 Documentation Alex Chen Alex Chen 7/8/2025 20% $9,550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write deployment guide (Sprint 24)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "7/8/2025"
      - gridcell "20%"
      - gridcell "$9,550"
    - row "Press Space to toggle row selection (unchecked) Fix responsive layout on tablets (Q2 Planning) In Progress High 🐛 Bug Priya Sharma Priya Sharma 7/8/2025 28% $150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix responsive layout on tablets (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/8/2025"
      - gridcell "28%"
      - gridcell "$150"
    - row "Press Space to toggle row selection (unchecked) Fix broken unit tests in CI pipeline (Security Audit) In Progress Critical 🐛 Bug David Lee David Lee 7/6/2025 45% $6,575":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken unit tests in CI pipeline (Security Audit)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "7/6/2025"
      - gridcell "45%"
      - gridcell "$6,575"
    - row "Press Space to toggle row selection (unchecked) Resolve CORS issue with external API In Review High 🐛 Bug David Lee David Lee 7/8/2025 63% $1,525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve CORS issue with external API"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "7/8/2025"
      - gridcell "63%"
      - gridcell "$1,525"
    - row "Press Space to toggle row selection (unchecked) Build real-time notifications system Blocked Critical ✨ Feature Priya Sharma Priya Sharma 7/8/2025 27% $5,150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build real-time notifications system"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/8/2025"
      - gridcell "27%"
      - gridcell "$5,150"
    - row "Press Space to toggle row selection (unchecked) Configure security headers In Progress Critical 🔒 Security Isabella Garcia Isabella Garcia 7/7/2025 45% $1,450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure security headers"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "7/7/2025"
      - gridcell "45%"
      - gridcell "$1,450"
    - row "Press Space to toggle row selection (unchecked) Add keyboard shortcuts Blocked Critical ✨ Feature Sophia Taylor Sophia Taylor 7/8/2025 34% $17,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add keyboard shortcuts"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "7/8/2025"
      - gridcell "34%"
      - gridcell "$17,000"
    - row "Press Space to toggle row selection (unchecked) Write API contract tests (Sprint 26) In Progress Critical 🧪 Testing AW Amanda White 7/7/2025 33% $2,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write API contract tests (Sprint 26)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "AW Amanda White"
      - gridcell "7/7/2025"
      - gridcell "33%"
      - gridcell "$2,975"
    - row "Press Space to toggle row selection (unchecked) Add brute force protection (Q2 Planning) In Progress High 🔒 Security David Lee David Lee 7/8/2025 46% $8,175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add brute force protection (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "7/8/2025"
      - gridcell "46%"
      - gridcell "$8,175"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $23,574,850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$23,574,850"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 5,630 of 10,000"
- status: "Total Rows : 10,000 Filtered : 5,630"
- status
```

# Test source

```ts
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
> 179 |     await expect(firstDropdown.locator("button").first()).toContainText(
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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