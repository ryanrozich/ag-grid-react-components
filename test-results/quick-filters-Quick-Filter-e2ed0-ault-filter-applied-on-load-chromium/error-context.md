# Test info

- Name: Quick Filters >> should have default filter applied on load
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:15:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Last 7 Days"
Received string: "All Time"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" aria-controls="quick-filter-dropdown" class="_trigger_aaln3_8 _triggerActive_aaln3_37">…</button>
      - unexpected value "All Time"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:23:59
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
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "47"
- img
- paragraph: Total Budget
- paragraph: $233,175
- img
- paragraph: Progress
- paragraph: 45.4%
- img
- paragraph: Budget Remaining
- paragraph: $138,658
- text: 1 to 25 of 48. Page 1 of 2
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
    - row "586 [BACKEND-1586] Implement secure file upload 🔒 Security High Emma Davis Emma Davis 6/27/2025 $2,675 Blocked 16%":
      - gridcell "586"
      - gridcell "[BACKEND-1586] Implement secure file upload"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/27/2025"
      - gridcell "$2,675"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "797 [USER-1797] Implement session management (Tech Debt) 🔒 Security Critical Emily Jackson Emily Jackson 6/27/2025 $9,375 Blocked 10%":
      - gridcell "797"
      - gridcell "[USER-1797] Implement session management (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/27/2025"
      - gridcell "$9,375"
      - gridcell "Blocked"
      - gridcell "10%"
    - row "844 [WEB-1844] Implement session management (Q1 Goals) 🔒 Security High Alex Chen Alex Chen 6/26/2025 $675 Testing 82%":
      - gridcell "844"
      - gridcell "[WEB-1844] Implement session management (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/26/2025"
      - gridcell "$675"
      - gridcell "Testing"
      - gridcell "82%"
    - row "912 [BACKEND-1912] Update API documentation 📝 Documentation Critical Jessica Lopez Jessica Lopez 6/27/2025 $700 In Progress 42%":
      - gridcell "912"
      - gridcell "[BACKEND-1912] Update API documentation"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/27/2025"
      - gridcell "$700"
      - gridcell "In Progress"
      - gridcell "42%"
    - row "692 [INFRA-1692] Fix broken unit tests in CI pipeline (Performance Sprint) 🐛 Bug High Isabella Garcia Isabella Garcia 6/26/2025 $650 Blocked 19%":
      - gridcell "692"
      - gridcell "[INFRA-1692] Fix broken unit tests in CI pipeline (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/26/2025"
      - gridcell "$650"
      - gridcell "Blocked"
      - gridcell "19%"
    - row "833 [MOBILE-1833] Debug crash on mobile Safari (Tech Debt) 🐛 Bug Critical Priya Sharma Priya Sharma 6/24/2025 $3,375 In Review 72%":
      - gridcell "833"
      - gridcell "[MOBILE-1833] Debug crash on mobile Safari (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/24/2025"
      - gridcell "$3,375"
      - gridcell "In Review"
      - gridcell "72%"
    - row "1 [AUTH-1001] Write testing best practices 📝 Documentation Critical James Wilson James Wilson 6/25/2025 $3,300 In Progress 22%":
      - gridcell "1"
      - gridcell "[AUTH-1001] Write testing best practices"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/25/2025"
      - gridcell "$3,300"
      - gridcell "In Progress"
      - gridcell "22%"
    - row "97 [BACKEND-1097] Add CDN for static assets (Sprint 25) ⚡ Performance High Marcus Williams Marcus Williams 6/26/2025 $3,300 Backlog 0%":
      - gridcell "97"
      - gridcell "[BACKEND-1097] Add CDN for static assets (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/26/2025"
      - gridcell "$3,300"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "987 [USER-1987] Resolve memory leak in data grid (Security Audit) 🐛 Bug High Alex Chen Alex Chen 6/26/2025 $14,225 Blocked 29%":
      - gridcell "987"
      - gridcell "[USER-1987] Resolve memory leak in data grid (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/26/2025"
      - gridcell "$14,225"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "173 [USER-1173] Set up infrastructure as code (Performance Sprint) 🔧 DevOps High Priya Sharma Priya Sharma 6/25/2025 $9,475 In Progress 21%":
      - gridcell "173"
      - gridcell "[USER-1173] Set up infrastructure as code (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/25/2025"
      - gridcell "$9,475"
      - gridcell "In Progress"
      - gridcell "21%"
    - row "255 [DASH-1255] Implement session management (Performance Sprint) 🔒 Security High Michael Anderson Michael Anderson 6/25/2025 $3,900 Blocked 32%":
      - gridcell "255"
      - gridcell "[DASH-1255] Implement session management (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/25/2025"
      - gridcell "$3,900"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "402 [API-1402] Add internationalization tests (Sprint 26) 🧪 Testing High Isabella Garcia Isabella Garcia 6/27/2025 $4,800 Blocked 17%":
      - gridcell "402"
      - gridcell "[API-1402] Add internationalization tests (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/27/2025"
      - gridcell "$4,800"
      - gridcell "Blocked"
      - gridcell "17%"
    - row "482 [INFRA-1482] Simplify complex conditionals (Sprint 23) ♻️ Refactor Critical Amanda White Amanda White 6/23/2025 $575 In Progress 46%":
      - gridcell "482"
      - gridcell "[INFRA-1482] Simplify complex conditionals (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/23/2025"
      - gridcell "$575"
      - gridcell "In Progress"
      - gridcell "46%"
    - row "730 [APP-1730] Document new filter components 📝 Documentation High Alex Chen Alex Chen 6/27/2025 $3,675 In Progress 58%":
      - gridcell "730"
      - gridcell "[APP-1730] Document new filter components"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/27/2025"
      - gridcell "$3,675"
      - gridcell "In Progress"
      - gridcell "58%"
    - row "837 [API-1837] Document component props 📝 Documentation Critical Sarah Johnson Sarah Johnson 6/25/2025 $12,975 Blocked 28%":
      - gridcell "837"
      - gridcell "[API-1837] Document component props"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/25/2025"
      - gridcell "$12,975"
      - gridcell "Blocked"
      - gridcell "28%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$233,175 45%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$233,175"
      - gridcell
      - gridcell "45%"
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
- text: Page 1 of 2
- button "Next Page": 
- button "Last Page": 
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