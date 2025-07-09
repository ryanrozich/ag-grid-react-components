# Test info

- Name: Quick Filters >> should have default filter applied on load
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:15:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Last 7 Days"
Received string: "All Time"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" aria-controls="quick-filter-dropdown" class="_trigger_o1lml_8 _triggerActive_o1lml_37">…</button>
      - unexpected value "All Time"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:23:59
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
- paragraph: $41,363,650
- img
- paragraph: Average Progress
- paragraph: 46.6%
- img
- paragraph: Budget Remaining
- paragraph: $22,025,980
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
    - row "DATA-2808":
      - gridcell "DATA-2808"
    - row "MOBILE-3439":
      - gridcell "MOBILE-3439"
    - row "AUTH-3868":
      - gridcell "AUTH-3868"
    - row "UI-4219":
      - gridcell "UI-4219"
    - row "API-5416":
      - gridcell "API-5416"
    - row "DASH-5728":
      - gridcell "DASH-5728"
    - row "PROJ-2149":
      - gridcell "PROJ-2149"
    - row "MOBILE-2169":
      - gridcell "MOBILE-2169"
    - row "AUTH-4763":
      - gridcell "AUTH-4763"
    - row "AUTH-4967":
      - gridcell "AUTH-4967"
    - row "WEB-9518":
      - gridcell "WEB-9518"
    - row "DASH-9778":
      - gridcell "DASH-9778"
    - row "ADMIN-10441":
      - gridcell "ADMIN-10441"
    - row "APP-3372":
      - gridcell "APP-3372"
    - row "AUTH-5370":
      - gridcell "AUTH-5370"
    - row "INFRA-6006":
      - gridcell "INFRA-6006"
    - row "AUTH-9912":
      - gridcell "AUTH-9912"
    - row "MOBILE-10357":
      - gridcell "MOBILE-10357"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Document security protocols (Sprint 24) In Progress High 📝 Documentation Emma Davis Emma Davis 9/4/2025 46% $5,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document security protocols (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/4/2025"
      - gridcell "46%"
      - gridcell "$5,725"
    - row "Press Space to toggle row selection (unchecked) Configure CDN distribution (Sprint 25) Testing High 🔧 DevOps Ryan Thomas Ryan Thomas 8/29/2025 89% $3,600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure CDN distribution (Sprint 25)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/29/2025"
      - gridcell "89%"
      - gridcell "$3,600"
    - row "Press Space to toggle row selection (unchecked) Build analytics dashboard (Q2 Planning) In Progress Critical ✨ Feature Sophia Taylor Sophia Taylor 8/28/2025 30% $525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build analytics dashboard (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/28/2025"
      - gridcell "30%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked) Implement rate limiting (Sprint 24) Todo High 🔒 Security EJ Emily Jackson 8/29/2025 7% $75":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement rate limiting (Sprint 24)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "EJ Emily Jackson"
      - gridcell "8/29/2025"
      - gridcell "7%"
      - gridcell "$75"
    - row "Press Space to toggle row selection (unchecked) Set up staging environment (Performance Sprint) Backlog Low 🔧 DevOps Emma Davis Emma Davis 9/15/2025 0% $725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up staging environment (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/15/2025"
      - gridcell "0%"
      - gridcell "$725"
    - row "Press Space to toggle row selection (unchecked) Write migration guide for v2 In Progress Critical 📝 Documentation AW Amanda White 8/28/2025 44% $6,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write migration guide for v2"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "AW Amanda White"
      - gridcell "8/28/2025"
      - gridcell "44%"
      - gridcell "$6,700"
    - row "Press Space to toggle row selection (unchecked) Implement rate limiting Testing Medium 🔒 Security Ryan Thomas Ryan Thomas 8/30/2025 84% $675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement rate limiting"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/30/2025"
      - gridcell "84%"
      - gridcell "$675"
    - row "Press Space to toggle row selection (unchecked) Implement OAuth integration (Q1 Goals) Testing Low ✨ Feature Olivia Brown Olivia Brown 9/24/2025 92% $225":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement OAuth integration (Q1 Goals)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/24/2025"
      - gridcell "92%"
      - gridcell "$225"
    - row "Press Space to toggle row selection (unchecked) Implement secrets management (Q1 Goals) In Progress Critical 🔧 DevOps David Lee David Lee 8/27/2025 40% $175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement secrets management (Q1 Goals)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/27/2025"
      - gridcell "40%"
      - gridcell "$175"
    - row "Press Space to toggle row selection (unchecked) Create load testing scenarios (Q1 Goals) In Review Low 🧪 Testing Maya Patel Maya Patel 9/30/2025 73% $575":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create load testing scenarios (Q1 Goals)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/30/2025"
      - gridcell "73%"
      - gridcell "$575"
    - row "Press Space to toggle row selection (unchecked) Document new filter components (Sprint 24) Testing Critical 📝 Documentation Emma Davis Emma Davis 8/25/2025 89% $200":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document new filter components (Sprint 24)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/25/2025"
      - gridcell "89%"
      - gridcell "$200"
    - row "Press Space to toggle row selection (unchecked) Optimize database queries (Q1 Goals) Todo Low ♻️ Refactor JR John Robinson 9/8/2025 18% $8,250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Optimize database queries (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "JR John Robinson"
      - gridcell "9/8/2025"
      - gridcell "18%"
      - gridcell "$8,250"
    - row "Press Space to toggle row selection (unchecked) Split monolithic components (Performance Sprint) In Progress Low ♻️ Refactor Maya Patel Maya Patel 9/30/2025 53% $1,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Split monolithic components (Performance Sprint)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/30/2025"
      - gridcell "53%"
      - gridcell "$1,000"
    - row "Press Space to toggle row selection (unchecked) Write component snapshot tests (Tech Debt) In Progress Critical 🧪 Testing Michael Anderson Michael Anderson 8/25/2025 32% $8,825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write component snapshot tests (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/25/2025"
      - gridcell "32%"
      - gridcell "$8,825"
    - row "Press Space to toggle row selection (unchecked) Add progressive web app features (Q1 Goals) Backlog Medium ⚡ Performance Isabella Garcia Isabella Garcia 8/31/2025 0% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add progressive web app features (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/31/2025"
      - gridcell "0%"
      - gridcell "$450"
    - row "Press Space to toggle row selection (unchecked) Fix infinite scroll pagination bug (Sprint 23) Backlog Low 🐛 Bug David Lee David Lee 9/13/2025 0% $2,775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix infinite scroll pagination bug (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/13/2025"
      - gridcell "0%"
      - gridcell "$2,775"
    - row "Press Space to toggle row selection (unchecked) Correct CSS overflow in sidebar (Performance Sprint) Backlog Low 🐛 Bug Chris Martinez Chris Martinez 8/30/2025 0% $4,150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct CSS overflow in sidebar (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$4,150"
    - row "Press Space to toggle row selection (unchecked) Add drag-and-drop file upload (Sprint 27) Backlog Low ✨ Feature Maya Patel Maya Patel 10/5/2025 0% $19,150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add drag-and-drop file upload (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "10/5/2025"
      - gridcell "0%"
      - gridcell "$19,150"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,363,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,363,650"
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