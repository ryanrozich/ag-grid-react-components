# Test info

- Name: Quick Filters >> should filter by task type
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:121:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    60 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:129:16
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
  - text: All Time
  - img
- button "Quick filter options" [expanded]:
  - text: Task type
  - img
- button "My Views":
  - img
  - text: My Views
  - img
- button "Filter view options":
  - img
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $40,978,000
- img
- paragraph: Average Progress
- paragraph: 46.5%
- img
- paragraph: Budget Remaining
- paragraph: $21,519,080
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
    - row "API-6325":
      - gridcell "API-6325"
    - row "CORE-8824":
      - gridcell "CORE-8824"
    - row "FRONTEND-3173":
      - gridcell "FRONTEND-3173"
    - row "PROJ-6051":
      - gridcell "PROJ-6051"
    - row "FRONTEND-2681":
      - gridcell "FRONTEND-2681"
    - row "FRONTEND-6750":
      - gridcell "FRONTEND-6750"
    - row "DASH-8809":
      - gridcell "DASH-8809"
    - row "APP-1024":
      - gridcell "APP-1024"
    - row "DATA-4294":
      - gridcell "DATA-4294"
    - row "APP-6373":
      - gridcell "APP-6373"
    - row "WEB-7909":
      - gridcell "WEB-7909"
    - row "USER-8501":
      - gridcell "USER-8501"
    - row "WEB-1091":
      - gridcell "WEB-1091"
    - row "INFRA-2396":
      - gridcell "INFRA-2396"
    - row "FRONTEND-3483":
      - gridcell "FRONTEND-3483"
    - row "CORE-4940":
      - gridcell "CORE-4940"
    - row "APP-9598":
      - gridcell "APP-9598"
    - row "FRONTEND-1507":
      - gridcell "FRONTEND-1507"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Write API contract tests In Review Critical 🧪 Testing EJ Emily Jackson 8/30/2025 70% $725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write API contract tests"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "EJ Emily Jackson"
      - gridcell "8/30/2025"
      - gridcell "70%"
      - gridcell "$725"
    - row "Press Space to toggle row selection (unchecked) Create user profile dashboard (Tech Debt) Backlog Medium ✨ Feature James Wilson James Wilson 9/11/2025 0% $2,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create user profile dashboard (Tech Debt)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/11/2025"
      - gridcell "0%"
      - gridcell "$2,300"
    - row "Press Space to toggle row selection (unchecked) Add progressive web app features (Q1 Goals) In Review Medium ⚡ Performance Sophia Taylor Sophia Taylor 9/2/2025 70% $7,750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add progressive web app features (Q1 Goals)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/2/2025"
      - gridcell "70%"
      - gridcell "$7,750"
    - row "Press Space to toggle row selection (unchecked) Document security protocols Testing Medium 📝 Documentation Olivia Brown Olivia Brown 9/2/2025 85% $17,825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document security protocols"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/2/2025"
      - gridcell "85%"
      - gridcell "$17,825"
    - row "Press Space to toggle row selection (unchecked) Document security protocols (Sprint 23) In Progress Low 📝 Documentation Michael Anderson Michael Anderson 9/23/2025 58% $300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document security protocols (Sprint 23)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/23/2025"
      - gridcell "58%"
      - gridcell "$300"
    - row "Press Space to toggle row selection (unchecked) Set up monitoring alerts (Sprint 26) In Review Low 🔧 DevOps Olivia Brown Olivia Brown 9/7/2025 74% $925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up monitoring alerts (Sprint 26)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/7/2025"
      - gridcell "74%"
      - gridcell "$925"
    - row "Press Space to toggle row selection (unchecked) Extract shared utilities module (Security Audit) In Progress High ♻️ Refactor Alex Chen Alex Chen 8/27/2025 22% $2,850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Extract shared utilities module (Security Audit)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/27/2025"
      - gridcell "22%"
      - gridcell "$2,850"
    - row "Press Space to toggle row selection (unchecked) Add visual regression tests Backlog Critical 🧪 Testing Priya Sharma Priya Sharma 8/26/2025 0% $3,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add visual regression tests"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/26/2025"
      - gridcell "0%"
      - gridcell "$3,300"
    - row "Press Space to toggle row selection (unchecked) Write accessibility tests (Tech Debt) Todo High 🧪 Testing Alex Chen Alex Chen 8/30/2025 16% $650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write accessibility tests (Tech Debt)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/30/2025"
      - gridcell "16%"
      - gridcell "$650"
    - row "Press Space to toggle row selection (unchecked) Create integration test suite (Security Audit) In Review High 🧪 Testing DK Daniel Kim 8/30/2025 63% $3,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create integration test suite (Security Audit)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "DK Daniel Kim"
      - gridcell "8/30/2025"
      - gridcell "63%"
      - gridcell "$3,650"
    - row "Press Space to toggle row selection (unchecked) Correct data corruption in cache layer (Performance Sprint) Testing Critical 🐛 Bug KZ Kevin Zhang 8/23/2025 84% $6,625":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct data corruption in cache layer (Performance Sprint)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "KZ Kevin Zhang"
      - gridcell "8/23/2025"
      - gridcell "84%"
      - gridcell "$6,625"
    - row "Press Space to toggle row selection (unchecked) Set up CI/CD pipeline (Q1 Goals) Testing High 🔧 DevOps Isabella Garcia Isabella Garcia 8/31/2025 80% $6,675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up CI/CD pipeline (Q1 Goals)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/31/2025"
      - gridcell "80%"
      - gridcell "$6,675"
    - row "Press Space to toggle row selection (unchecked) Fix infinite scroll pagination bug (Q2 Planning) In Progress High 🐛 Bug James Wilson James Wilson 8/25/2025 59% $2,025":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix infinite scroll pagination bug (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/25/2025"
      - gridcell "59%"
      - gridcell "$2,025"
    - row "Press Space to toggle row selection (unchecked) Set up log aggregation (Tech Debt) Todo Medium 🔧 DevOps Olivia Brown Olivia Brown 8/30/2025 18% $9,525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up log aggregation (Tech Debt)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/30/2025"
      - gridcell "18%"
      - gridcell "$9,525"
    - row "Press Space to toggle row selection (unchecked) Test error boundary behavior (Tech Debt) Todo Medium 🧪 Testing JR John Robinson 9/2/2025 19% $600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Test error boundary behavior (Tech Debt)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "JR John Robinson"
      - gridcell "9/2/2025"
      - gridcell "19%"
      - gridcell "$600"
    - row "Press Space to toggle row selection (unchecked) Document error handling patterns (Sprint 23) Backlog High 📝 Documentation JR John Robinson 8/25/2025 0% $425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document error handling patterns (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "JR John Robinson"
      - gridcell "8/25/2025"
      - gridcell "0%"
      - gridcell "$425"
    - row "Press Space to toggle row selection (unchecked) Create batch operations feature Backlog Low ✨ Feature AW Amanda White 9/26/2025 0% $1,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create batch operations feature"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "AW Amanda White"
      - gridcell "9/26/2025"
      - gridcell "0%"
      - gridcell "$1,975"
    - row "Press Space to toggle row selection (unchecked) Update API documentation (Sprint 24) In Review Critical 📝 Documentation Sarah Johnson Sarah Johnson 8/24/2025 66% $4,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update API documentation (Sprint 24)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/24/2025"
      - gridcell "66%"
      - gridcell "$4,000"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,978,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,978,000"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
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