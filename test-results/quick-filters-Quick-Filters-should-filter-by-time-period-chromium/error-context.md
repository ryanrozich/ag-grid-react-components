# Test info

- Name: Quick Filters >> should filter by time period
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:37:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    60 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:45:16
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
- button "Quick filter options" [expanded]:
  - text: All Time
  - img
- button "Quick filter options":
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
- paragraph: $40,830,925
- img
- paragraph: Average Progress
- paragraph: 45.8%
- img
- paragraph: Budget Remaining
- paragraph: $22,297,965
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
    - row "CORE-3047":
      - gridcell "CORE-3047"
    - row "AUTH-1132":
      - gridcell "AUTH-1132"
    - row "INFRA-1786":
      - gridcell "INFRA-1786"
    - row "MOBILE-2387":
      - gridcell "MOBILE-2387"
    - row "UI-10791":
      - gridcell "UI-10791"
    - row "APP-10962":
      - gridcell "APP-10962"
    - row "PROJ-2811":
      - gridcell "PROJ-2811"
    - row "INFRA-3413":
      - gridcell "INFRA-3413"
    - row "INFRA-3551":
      - gridcell "INFRA-3551"
    - row "MOBILE-9255":
      - gridcell "MOBILE-9255"
    - row "UI-2826":
      - gridcell "UI-2826"
    - row "INFRA-3774":
      - gridcell "INFRA-3774"
    - row "FRONTEND-5142":
      - gridcell "FRONTEND-5142"
    - row "FRONTEND-6291":
      - gridcell "FRONTEND-6291"
    - row "DASH-8969":
      - gridcell "DASH-8969"
    - row "INFRA-9096":
      - gridcell "INFRA-9096"
    - row "DATA-10141":
      - gridcell "DATA-10141"
    - row "ADMIN-1999":
      - gridcell "ADMIN-1999"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Optimize render performance (Security Audit) In Review High ⚡ Performance Maya Patel Maya Patel 9/1/2025 73% $1,625":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Optimize render performance (Security Audit)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/1/2025"
      - gridcell "73%"
      - gridcell "$1,625"
    - row "Press Space to toggle row selection (unchecked) Configure security headers (Q1 Goals) Todo Critical 🔒 Security Emma Davis Emma Davis 8/27/2025 6% $18,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure security headers (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/27/2025"
      - gridcell "6%"
      - gridcell "$18,975"
    - row "Press Space to toggle row selection (unchecked) Resolve memory leak in data grid (Sprint 26) Backlog High 🐛 Bug Priya Sharma Priya Sharma 8/28/2025 0% $250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve memory leak in data grid (Sprint 26)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/28/2025"
      - gridcell "0%"
      - gridcell "$250"
    - row "Press Space to toggle row selection (unchecked) Implement virtual scrolling (Q2 Planning) Backlog Critical ⚡ Performance KZ Kevin Zhang 8/28/2025 0% $875":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement virtual scrolling (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "KZ Kevin Zhang"
      - gridcell "8/28/2025"
      - gridcell "0%"
      - gridcell "$875"
    - row "Press Space to toggle row selection (unchecked) Update to React 18 patterns Backlog Critical ♻️ Refactor Emma Davis Emma Davis 8/29/2025 0% $2,225":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update to React 18 patterns"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/29/2025"
      - gridcell "0%"
      - gridcell "$2,225"
    - row "Press Space to toggle row selection (unchecked) Reduce API call frequency (Security Audit) In Review High ⚡ Performance Michael Anderson Michael Anderson 9/2/2025 61% $4,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Reduce API call frequency (Security Audit)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/2/2025"
      - gridcell "61%"
      - gridcell "$4,650"
    - row "Press Space to toggle row selection (unchecked) Resolve memory leak in data grid (Sprint 27) Todo Low 🐛 Bug JR John Robinson 8/31/2025 9% $2,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve memory leak in data grid (Sprint 27)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "JR John Robinson"
      - gridcell "8/31/2025"
      - gridcell "9%"
      - gridcell "$2,650"
    - row "Press Space to toggle row selection (unchecked) Resolve memory leak in data grid (Sprint 26) In Review Medium 🐛 Bug AW Amanda White 8/28/2025 70% $2,750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve memory leak in data grid (Sprint 26)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "AW Amanda White"
      - gridcell "8/28/2025"
      - gridcell "70%"
      - gridcell "$2,750"
    - row "Press Space to toggle row selection (unchecked) Write testing best practices (Q2 Planning) In Progress Low 📝 Documentation Michael Anderson Michael Anderson 10/3/2025 43% $4,875":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write testing best practices (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "10/3/2025"
      - gridcell "43%"
      - gridcell "$4,875"
    - row "Press Space to toggle row selection (unchecked) Add request batching In Review Medium ⚡ Performance JR John Robinson 9/5/2025 75% $4,950":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add request batching"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "JR John Robinson"
      - gridcell "9/5/2025"
      - gridcell "75%"
      - gridcell "$4,950"
    - row "Press Space to toggle row selection (unchecked) Debug crash on mobile Safari (Sprint 24) In Progress High 🐛 Bug Olivia Brown Olivia Brown 8/26/2025 29% $13,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug crash on mobile Safari (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/26/2025"
      - gridcell "29%"
      - gridcell "$13,000"
    - row "Press Space to toggle row selection (unchecked) Create deployment rollback (Security Audit) Backlog High 🔧 DevOps Chris Martinez Chris Martinez 8/30/2025 0% $3,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create deployment rollback (Security Audit)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$3,700"
    - row "Press Space to toggle row selection (unchecked) Write deployment guide (Q2 Planning) In Progress Low 📝 Documentation Sophia Taylor Sophia Taylor 9/29/2025 24% $1,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write deployment guide (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/29/2025"
      - gridcell "24%"
      - gridcell "$1,975"
    - row "Press Space to toggle row selection (unchecked) Write migration guide for v2 (Security Audit) Backlog Critical 📝 Documentation James Wilson James Wilson 8/24/2025 0% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write migration guide for v2 (Security Audit)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/24/2025"
      - gridcell "0%"
      - gridcell "$450"
    - row "Press Space to toggle row selection (unchecked) Optimize memory usage (Q2 Planning) Todo Critical ⚡ Performance EJ Emily Jackson 8/26/2025 5% $2,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Optimize memory usage (Q2 Planning)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "EJ Emily Jackson"
      - gridcell "8/26/2025"
      - gridcell "5%"
      - gridcell "$2,300"
    - row "Press Space to toggle row selection (unchecked) Add keyboard shortcuts In Review Medium ✨ Feature EJ Emily Jackson 9/1/2025 63% $475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add keyboard shortcuts"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "EJ Emily Jackson"
      - gridcell "9/1/2025"
      - gridcell "63%"
      - gridcell "$475"
    - row "Press Space to toggle row selection (unchecked) Create deployment rollback In Progress Medium 🔧 DevOps DK Daniel Kim 9/8/2025 29% $8,575":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create deployment rollback"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "DK Daniel Kim"
      - gridcell "9/8/2025"
      - gridcell "29%"
      - gridcell "$8,575"
    - row "Press Space to toggle row selection (unchecked) Migrate to new testing framework (Sprint 24) In Progress Low ♻️ Refactor Chris Martinez Chris Martinez 9/26/2025 22% $900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Migrate to new testing framework (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/26/2025"
      - gridcell "22%"
      - gridcell "$900"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,830,925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,830,925"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
- listbox "Quick filter options":
  - option "All Time" [selected]:
    - text: All Time
    - img
  - option "Last 7 Days"
  - option "This Month"
  - option "Overdue"
  - option "Not Started"
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
>  45 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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
```