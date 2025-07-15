# Test info

- Name: Quick Filters >> should have default filter applied on load
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/quick-filters.spec.ts:15:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Last 7 Days"
Received string: "All Time"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    7 × locator resolved to <button type="button" data-open="false" data-active="true" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" data-component="quick-filter-trigger" aria-controls="quick-filter-dropdown-ccuhygi">…</button>
      - unexpected value "All Time"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/quick-filters.spec.ts:23:59
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
  - button "Show version details": v0.1.0+48 feat/headless-refactor
  - img
  - text: MIT License
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: My Views
  - img
- button
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $41,549,400
- img
- paragraph: Average Progress
- paragraph: 45.8%
- img
- paragraph: Budget Remaining
- paragraph: $22,310,104
- grid:
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value Delivered":
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
      - columnheader "Delivered"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) [CORE-7821] Create data visualization charts Backlog Medium ✨ Feature Daniel Kim Daniel Kim 9/12/2025 0% $6,775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-7821] Create data visualization charts"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "9/12/2025"
      - gridcell "0%"
      - gridcell "$6,775"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [AUTH-4445] Split monolithic components (Sprint 27) In Progress Low ♻️ Refactor Priya Sharma Priya Sharma 9/24/2025 21% $8,875 $1,864":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[AUTH-4445] Split monolithic components (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/24/2025"
      - gridcell "21%"
      - gridcell "$8,875"
      - gridcell "$1,864"
    - row "Press Space to toggle row selection (unchecked) [DASH-6349] Add CDN for static assets (Sprint 23) In Progress Medium ⚡ Performance James Wilson James Wilson 9/13/2025 22% $275 $61":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-6349] Add CDN for static assets (Sprint 23)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/13/2025"
      - gridcell "22%"
      - gridcell "$275"
      - gridcell "$61"
    - row "Press Space to toggle row selection (unchecked) [CORE-7806] Update API documentation In Progress Critical 📝 Documentation Ryan Thomas Ryan Thomas 8/31/2025 28% $4,075 $1,141":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-7806] Update API documentation"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/31/2025"
      - gridcell "28%"
      - gridcell "$4,075"
      - gridcell "$1,141"
    - row "Press Space to toggle row selection (unchecked) [UI-7842] Optimize memory usage In Review Critical ⚡ Performance Isabella Garcia Isabella Garcia 9/1/2025 69% $275 $190":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[UI-7842] Optimize memory usage"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/1/2025"
      - gridcell "69%"
      - gridcell "$275"
      - gridcell "$190"
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-9335] Update to React 18 patterns (Sprint 23) Backlog Medium ♻️ Refactor Marcus Williams Marcus Williams 9/14/2025 0% $8,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-9335] Update to React 18 patterns (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/14/2025"
      - gridcell "0%"
      - gridcell "$8,300"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [BACKEND-1098] Set up infrastructure as code Backlog Critical 🔧 DevOps Kevin Zhang Kevin Zhang 9/1/2025 0% $575":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[BACKEND-1098] Set up infrastructure as code"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "9/1/2025"
      - gridcell "0%"
      - gridcell "$575"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [DASH-1427] Extract business logic layer Backlog High ♻️ Refactor Alex Chen Alex Chen 9/5/2025 0% $350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-1427] Extract business logic layer"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/5/2025"
      - gridcell "0%"
      - gridcell "$350"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [ADMIN-2018] Update API documentation Testing High 📝 Documentation Alex Chen Alex Chen 9/4/2025 93% $15,400 $14,322":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-2018] Update API documentation"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/4/2025"
      - gridcell "93%"
      - gridcell "$15,400"
      - gridcell "$14,322"
    - row "Press Space to toggle row selection (unchecked) [WEB-9095] Implement auto-scaling (Q2 Planning) Backlog Low 🔧 DevOps Emily Jackson Emily Jackson 9/25/2025 0% $275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-9095] Implement auto-scaling (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/25/2025"
      - gridcell "0%"
      - gridcell "$275"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [AUTH-2454] Update README with examples (Performance Sprint) Backlog Critical 📝 Documentation Chris Martinez Chris Martinez 8/29/2025 0% $350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[AUTH-2454] Update README with examples (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/29/2025"
      - gridcell "0%"
      - gridcell "$350"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [MOBILE-4516] Document new filter components (Tech Debt) Todo High 📝 Documentation Emma Davis Emma Davis 9/3/2025 14% $19,400 $2,716":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-4516] Document new filter components (Tech Debt)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/3/2025"
      - gridcell "14%"
      - gridcell "$19,400"
      - gridcell "$2,716"
    - row "Press Space to toggle row selection (unchecked) [WEB-6969] Implement two-factor authentication (Sprint 25) Backlog High ✨ Feature Isabella Garcia Isabella Garcia 9/6/2025 0% $3,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-6969] Implement two-factor authentication (Sprint 25)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$3,700"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [API-7709] Debug performance regression in search (Sprint 27) In Progress Critical 🐛 Bug Isabella Garcia Isabella Garcia 8/29/2025 43% $8,675 $3,730":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[API-7709] Debug performance regression in search (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/29/2025"
      - gridcell "43%"
      - gridcell "$8,675"
      - gridcell "$3,730"
    - row "Press Space to toggle row selection (unchecked) [INFRA-9143] Optimize memory usage Todo High ⚡ Performance Ryan Thomas Ryan Thomas 9/6/2025 18% $375 $68":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[INFRA-9143] Optimize memory usage"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/6/2025"
      - gridcell "18%"
      - gridcell "$375"
      - gridcell "$68"
    - row "Press Space to toggle row selection (unchecked) [ADMIN-10684] Implement virtual scrolling (Sprint 24) Testing Low ⚡ Performance Emily Jackson Emily Jackson 9/17/2025 80% $6,575 $5,260":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-10684] Implement virtual scrolling (Sprint 24)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/17/2025"
      - gridcell "80%"
      - gridcell "$6,575"
      - gridcell "$5,260"
    - row "Press Space to toggle row selection (unchecked) [PROJ-2191] Write migration guide for v2 Todo Low 📝 Documentation Alex Chen Alex Chen 9/29/2025 8% $175 $14":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-2191] Write migration guide for v2"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/29/2025"
      - gridcell "8%"
      - gridcell "$175"
      - gridcell "$14"
    - row "Press Space to toggle row selection (unchecked) [AUTH-4526] Resolve memory leak in data grid (Q2 Planning) In Review Critical 🐛 Bug Sarah Johnson Sarah Johnson 8/28/2025 71% $625 $444":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[AUTH-4526] Resolve memory leak in data grid (Q2 Planning)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/28/2025"
      - gridcell "71%"
      - gridcell "$625"
      - gridcell "$444"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,549,400 $19,239,296":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,549,400"
      - gridcell "$19,239,296"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
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
>  23 |     await expect(firstDropdown.locator("button").first()).toContainText(
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
```