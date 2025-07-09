# Test info

- Name: Quick Filters >> should filter by Not Started tasks
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:92:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Not Started"
Received string: "Time period"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    8 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_o1lml_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Time period"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:106:59
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
- text: "Status: Backlog, Todo"
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
- paragraph: "183"
- img
- paragraph: Total Budget
- paragraph: $735,150
- img
- paragraph: Average Progress
- paragraph: 5.7%
- img
- paragraph: Budget Remaining
- paragraph: $695,736
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
    - row "INFRA-4854":
      - gridcell "INFRA-4854"
    - row "PROJ-1980":
      - gridcell "PROJ-1980"
    - row "PROJ-3156":
      - gridcell "PROJ-3156"
    - row "MOBILE-6945":
      - gridcell "MOBILE-6945"
    - row "USER-9996":
      - gridcell "USER-9996"
    - row "USER-7348":
      - gridcell "USER-7348"
    - row "PROJ-5796":
      - gridcell "PROJ-5796"
    - row "FRONTEND-10760":
      - gridcell "FRONTEND-10760"
    - row "AUTH-3652":
      - gridcell "AUTH-3652"
    - row "MOBILE-10354":
      - gridcell "MOBILE-10354"
    - row "APP-10534":
      - gridcell "APP-10534"
    - row "FRONTEND-3084":
      - gridcell "FRONTEND-3084"
    - row "DASH-5103":
      - gridcell "DASH-5103"
    - row "FRONTEND-6997":
      - gridcell "FRONTEND-6997"
    - row "INFRA-4779":
      - gridcell "INFRA-4779"
    - row "AUTH-8151":
      - gridcell "AUTH-8151"
    - row "CORE-8521":
      - gridcell "CORE-8521"
    - row "BACKEND-9581":
      - gridcell "BACKEND-9581"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Fix responsive layout on tablets Todo Critical 🐛 Bug Chris Martinez Chris Martinez 7/8/2025 18% $3,450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix responsive layout on tablets"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "7/8/2025"
      - gridcell "18%"
      - gridcell "$3,450"
    - row "Press Space to toggle row selection (unchecked) Update contribution guidelines (Sprint 23) Todo Critical 📝 Documentation Olivia Brown Olivia Brown 7/7/2025 18% $875":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update contribution guidelines (Sprint 23)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "7/7/2025"
      - gridcell "18%"
      - gridcell "$875"
    - row "Press Space to toggle row selection (unchecked) Set up infrastructure as code Backlog Critical 🔧 DevOps James Wilson James Wilson 7/8/2025 0% $975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up infrastructure as code"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "7/8/2025"
      - gridcell "0%"
      - gridcell "$975"
    - row "Press Space to toggle row selection (unchecked) Create video tutorials (Sprint 25) Backlog Critical 📝 Documentation David Lee David Lee 7/8/2025 0% $950":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create video tutorials (Sprint 25)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "7/8/2025"
      - gridcell "0%"
      - gridcell "$950"
    - row "Press Space to toggle row selection (unchecked) Correct data corruption in cache layer (Performance Sprint) Backlog Critical 🐛 Bug Priya Sharma Priya Sharma 7/5/2025 0% $13,475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct data corruption in cache layer (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/5/2025"
      - gridcell "0%"
      - gridcell "$13,475"
    - row "Press Space to toggle row selection (unchecked) Implement API key rotation (Sprint 24) Backlog Critical 🔒 Security Ryan Thomas Ryan Thomas 7/4/2025 0% $5,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement API key rotation (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "7/4/2025"
      - gridcell "0%"
      - gridcell "$5,700"
    - row "Press Space to toggle row selection (unchecked) Implement lazy loading (Q2 Planning) Todo Critical ⚡ Performance AW Amanda White 7/3/2025 10% $75":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement lazy loading (Q2 Planning)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "AW Amanda White"
      - gridcell "7/3/2025"
      - gridcell "10%"
      - gridcell "$75"
    - row "Press Space to toggle row selection (unchecked) Configure firewall rules (Q1 Goals) Todo High 🔒 Security Chris Martinez Chris Martinez 7/5/2025 6% $8,425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure firewall rules (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "7/5/2025"
      - gridcell "6%"
      - gridcell "$8,425"
    - row "Press Space to toggle row selection (unchecked) Resolve CORS issue with external API (Sprint 24) Backlog Critical 🐛 Bug Michael Anderson Michael Anderson 6/30/2025 0% $2,025":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve CORS issue with external API (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/30/2025"
      - gridcell "0%"
      - gridcell "$2,025"
    - row "Press Space to toggle row selection (unchecked) Fix responsive layout on tablets (Sprint 24) Backlog High 🐛 Bug Sarah Johnson Sarah Johnson 7/2/2025 0% $2,250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix responsive layout on tablets (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "7/2/2025"
      - gridcell "0%"
      - gridcell "$2,250"
    - row "Press Space to toggle row selection (unchecked) Implement dark mode toggle (Sprint 24) Backlog High ✨ Feature Maya Patel Maya Patel 7/7/2025 0% $4,225":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement dark mode toggle (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "7/7/2025"
      - gridcell "0%"
      - gridcell "$4,225"
    - row "Press Space to toggle row selection (unchecked) Implement secrets management (Sprint 23) Todo Critical 🔧 DevOps Emma Davis Emma Davis 6/29/2025 18% $4,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement secrets management (Sprint 23)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/29/2025"
      - gridcell "18%"
      - gridcell "$4,350"
    - row "Press Space to toggle row selection (unchecked) Update to ES6 modules (Security Audit) Todo Medium ♻️ Refactor Emma Davis Emma Davis 7/5/2025 19% $1,100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update to ES6 modules (Security Audit)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "7/5/2025"
      - gridcell "19%"
      - gridcell "$1,100"
    - row "Press Space to toggle row selection (unchecked) Add keyboard shortcuts (Sprint 23) Todo High ✨ Feature Michael Anderson Michael Anderson 7/7/2025 11% $100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add keyboard shortcuts (Sprint 23)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "7/7/2025"
      - gridcell "11%"
      - gridcell "$100"
    - row "Press Space to toggle row selection (unchecked) Create user profile dashboard Todo Medium ✨ Feature Olivia Brown Olivia Brown 7/4/2025 17% $875":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create user profile dashboard"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "7/4/2025"
      - gridcell "17%"
      - gridcell "$875"
    - row "Press Space to toggle row selection (unchecked) Simplify complex conditionals (Sprint 27) Todo Critical ♻️ Refactor KZ Kevin Zhang 6/28/2025 18% $1,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Simplify complex conditionals (Sprint 27)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "KZ Kevin Zhang"
      - gridcell "6/28/2025"
      - gridcell "18%"
      - gridcell "$1,000"
    - row "Press Space to toggle row selection (unchecked) Create architecture overview (Performance Sprint) Backlog High 📝 Documentation Chris Martinez Chris Martinez 7/5/2025 0% $6,150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create architecture overview (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "7/5/2025"
      - gridcell "0%"
      - gridcell "$6,150"
    - row "Press Space to toggle row selection (unchecked) Add input sanitization Backlog High 🔒 Security JL Jessica Lopez 7/1/2025 0% $7,375":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add input sanitization"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "JL Jessica Lopez"
      - gridcell "7/1/2025"
      - gridcell "0%"
      - gridcell "$7,375"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $735,150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$735,150"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 183 of 10,000"
- status: "Total Rows : 10,000 Filtered : 183"
- status
```

# Test source

```ts
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
   20 |     const firstDropdown = page
   21 |       .locator('[data-testid="quick-filter-dropdown"]')
   22 |       .first();
   23 |     await expect(firstDropdown.locator("button").first()).toContainText(
   24 |       "Last 7 Days",
   25 |     );
   26 |
   27 |     // Check that there are active filters displayed
   28 |     const activeFilters = page.locator('[data-testid="active-filters"]');
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
> 106 |     await expect(firstDropdown.locator("button").first()).toContainText(
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
  200 |     await expect(activeFilters).not.toBeVisible();
  201 |   });
  202 |
  203 |   test("should combine time and task type filters", async ({ page }) => {
  204 |     // Apply time filter
  205 |     const firstDropdown = page
  206 |       .locator('[data-testid="quick-filter-dropdown"]')
```