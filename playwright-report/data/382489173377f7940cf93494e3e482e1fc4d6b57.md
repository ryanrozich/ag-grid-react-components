# Test info

- Name: Quick Filters >> should filter by Overdue tasks
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:63:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Overdue"
Received string: "Time period"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    - locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" aria-controls="quick-filter-dropdown" class="_trigger_o1lml_8 _triggerActive_o1lml_37">…</button>
    - unexpected value "All Time"
    7 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_o1lml_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Time period"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:77:59
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
- paragraph: 5,744
- img
- paragraph: Total Budget
- paragraph: $23,159,350
- img
- paragraph: Average Progress
- paragraph: 33.1%
- img
- paragraph: Budget Remaining
- paragraph: $15,487,601
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
    - row "INFRA-1285":
      - gridcell "INFRA-1285"
    - row "USER-2763":
      - gridcell "USER-2763"
    - row "MOBILE-2980":
      - gridcell "MOBILE-2980"
    - row "BACKEND-3736":
      - gridcell "BACKEND-3736"
    - row "DASH-9847":
      - gridcell "DASH-9847"
    - row "INFRA-1982":
      - gridcell "INFRA-1982"
    - row "PROJ-2897":
      - gridcell "PROJ-2897"
    - row "FRONTEND-3924":
      - gridcell "FRONTEND-3924"
    - row "ADMIN-3981":
      - gridcell "ADMIN-3981"
    - row "CORE-4462":
      - gridcell "CORE-4462"
    - row "INFRA-4531":
      - gridcell "INFRA-4531"
    - row "PROJ-5118":
      - gridcell "PROJ-5118"
    - row "CORE-6159":
      - gridcell "CORE-6159"
    - row "ADMIN-10206":
      - gridcell "ADMIN-10206"
    - row "FRONTEND-1276":
      - gridcell "FRONTEND-1276"
    - row "CORE-1569":
      - gridcell "CORE-1569"
    - row "ADMIN-1864":
      - gridcell "ADMIN-1864"
    - row "WEB-3335":
      - gridcell "WEB-3335"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Resolve race condition in state update (Sprint 23) Blocked Critical 🐛 Bug Marcus Williams Marcus Williams 7/8/2025 11% $6,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve race condition in state update (Sprint 23)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "7/8/2025"
      - gridcell "11%"
      - gridcell "$6,725"
    - row "Press Space to toggle row selection (unchecked) Correct data corruption in cache layer (Security Audit) Backlog Critical 🐛 Bug Sophia Taylor Sophia Taylor 7/8/2025 0% $475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct data corruption in cache layer (Security Audit)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "7/8/2025"
      - gridcell "0%"
      - gridcell "$475"
    - row "Press Space to toggle row selection (unchecked) Debug crash on mobile Safari (Performance Sprint) In Review Critical 🐛 Bug Sarah Johnson Sarah Johnson 7/8/2025 67% $900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug crash on mobile Safari (Performance Sprint)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "7/8/2025"
      - gridcell "67%"
      - gridcell "$900"
    - row "Press Space to toggle row selection (unchecked) Handle null pointer exception in API client In Progress Critical 🐛 Bug JL Jessica Lopez 7/8/2025 35% $550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Handle null pointer exception in API client"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "JL Jessica Lopez"
      - gridcell "7/8/2025"
      - gridcell "35%"
      - gridcell "$550"
    - row "Press Space to toggle row selection (unchecked) Implement session management Blocked Critical 🔒 Security Maya Patel Maya Patel 7/8/2025 24% $975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement session management"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "7/8/2025"
      - gridcell "24%"
      - gridcell "$975"
    - row "Press Space to toggle row selection (unchecked) Create advanced search filters Blocked Critical ✨ Feature Emma Davis Emma Davis 7/8/2025 18% $275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create advanced search filters"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "7/8/2025"
      - gridcell "18%"
      - gridcell "$275"
    - row "Press Space to toggle row selection (unchecked) Fix broken deep links in navigation (Sprint 27) In Progress Critical 🐛 Bug Olivia Brown Olivia Brown 7/8/2025 50% $12,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken deep links in navigation (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "7/8/2025"
      - gridcell "50%"
      - gridcell "$12,725"
    - row "Press Space to toggle row selection (unchecked) Add SQL injection prevention (Sprint 23) Blocked Critical 🔒 Security EJ Emily Jackson 7/7/2025 16% $225":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add SQL injection prevention (Sprint 23)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "EJ Emily Jackson"
      - gridcell "7/7/2025"
      - gridcell "16%"
      - gridcell "$225"
    - row "Press Space to toggle row selection (unchecked) Test error boundary behavior In Progress Critical 🧪 Testing Emma Davis Emma Davis 7/8/2025 30% $13,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Test error boundary behavior"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "7/8/2025"
      - gridcell "30%"
      - gridcell "$13,975"
    - row "Press Space to toggle row selection (unchecked) Add request batching In Progress Critical ⚡ Performance KZ Kevin Zhang 7/8/2025 40% $375":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add request batching"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "KZ Kevin Zhang"
      - gridcell "7/8/2025"
      - gridcell "40%"
      - gridcell "$375"
    - row "Press Space to toggle row selection (unchecked) Migrate to TypeScript strict mode (Sprint 27) In Progress Critical ♻️ Refactor Ryan Thomas Ryan Thomas 7/8/2025 35% $525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Migrate to TypeScript strict mode (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "7/8/2025"
      - gridcell "35%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked) Debug WebSocket connection timeout (Sprint 25) In Review High 🐛 Bug AW Amanda White 7/8/2025 78% $150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug WebSocket connection timeout (Sprint 25)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "AW Amanda White"
      - gridcell "7/8/2025"
      - gridcell "78%"
      - gridcell "$150"
    - row "Press Space to toggle row selection (unchecked) Implement OAuth integration Testing Critical ✨ Feature Alex Chen Alex Chen 7/8/2025 90% $275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement OAuth integration"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "7/8/2025"
      - gridcell "90%"
      - gridcell "$275"
    - row "Press Space to toggle row selection (unchecked) Implement session management (Security Audit) Blocked Critical 🔒 Security KZ Kevin Zhang 7/8/2025 34% $1,425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement session management (Security Audit)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "KZ Kevin Zhang"
      - gridcell "7/8/2025"
      - gridcell "34%"
      - gridcell "$1,425"
    - row "Press Space to toggle row selection (unchecked) Implement blue-green deployment (Tech Debt) Blocked Critical 🔧 DevOps Isabella Garcia Isabella Garcia 7/7/2025 17% $16,600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement blue-green deployment (Tech Debt)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "7/7/2025"
      - gridcell "17%"
      - gridcell "$16,600"
    - row "Press Space to toggle row selection (unchecked) Write component snapshot tests (Q1 Goals) Blocked Critical 🧪 Testing AW Amanda White 7/7/2025 19% $75":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write component snapshot tests (Q1 Goals)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "AW Amanda White"
      - gridcell "7/7/2025"
      - gridcell "19%"
      - gridcell "$75"
    - row "Press Space to toggle row selection (unchecked) Add progressive web app features In Progress Critical ⚡ Performance Sophia Taylor Sophia Taylor 7/7/2025 25% $525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add progressive web app features"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "7/7/2025"
      - gridcell "25%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked) Resolve CORS issue with external API Blocked Critical 🐛 Bug DK Daniel Kim 7/7/2025 17% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve CORS issue with external API"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "DK Daniel Kim"
      - gridcell "7/7/2025"
      - gridcell "17%"
      - gridcell "$450"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $23,159,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$23,159,350"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 5,744 of 10,000"
- status: "Total Rows : 10,000 Filtered : 5,744"
- status
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
>  77 |     await expect(firstDropdown.locator("button").first()).toContainText(
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
```