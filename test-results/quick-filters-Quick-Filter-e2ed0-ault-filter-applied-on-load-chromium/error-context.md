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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $4,171,700
- img
- paragraph: Progress
- paragraph: 44.4%
- img
- paragraph: Budget Remaining
- paragraph: $2,215,998
- text: 1 to 25 of 1,001. Page 1 of 41
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
    - row "405 [USER-1405] Update to React 18 patterns ♻️ Refactor High Amanda White Amanda White 8/23/2025 $19,000 Todo 11%":
      - gridcell "405"
      - gridcell "[USER-1405] Update to React 18 patterns"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/23/2025"
      - gridcell "$19,000"
      - gridcell "Todo"
      - gridcell "11%"
    - row "636 [CORE-1636] Write testing best practices (Sprint 25) 📝 Documentation High Michael Anderson Michael Anderson 8/20/2025 $8,125 Todo 13%":
      - gridcell "636"
      - gridcell "[CORE-1636] Write testing best practices (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/20/2025"
      - gridcell "$8,125"
      - gridcell "Todo"
      - gridcell "13%"
    - row "720 [CORE-1720] Extract business logic layer (Q2 Planning) ♻️ Refactor Critical Chris Martinez Chris Martinez 8/16/2025 $5,550 In Review 61%":
      - gridcell "720"
      - gridcell "[CORE-1720] Extract business logic layer (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/16/2025"
      - gridcell "$5,550"
      - gridcell "In Review"
      - gridcell "61%"
    - row "108 [APP-1108] Implement OAuth integration ✨ Feature Medium Emily Jackson Emily Jackson 8/29/2025 $100 In Progress 49%":
      - gridcell "108"
      - gridcell "[APP-1108] Implement OAuth integration"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/29/2025"
      - gridcell "$100"
      - gridcell "In Progress"
      - gridcell "49%"
    - row "775 [DASH-1775] Write testing best practices 📝 Documentation Low James Wilson James Wilson 8/26/2025 $17,050 Todo 9%":
      - gridcell "775"
      - gridcell "[DASH-1775] Write testing best practices"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/26/2025"
      - gridcell "$17,050"
      - gridcell "Todo"
      - gridcell "9%"
    - row "936 [API-1936] Document error handling patterns (Sprint 26) 📝 Documentation Medium Emma Davis Emma Davis 8/30/2025 $850 Todo 15%":
      - gridcell "936"
      - gridcell "[API-1936] Document error handling patterns (Sprint 26)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/30/2025"
      - gridcell "$850"
      - gridcell "Todo"
      - gridcell "15%"
    - row "96 [MOBILE-1096] Create disaster recovery plan (Sprint 23) 🔧 DevOps High Marcus Williams Marcus Williams 8/15/2025 $75 In Progress 48%":
      - gridcell "96"
      - gridcell "[MOBILE-1096] Create disaster recovery plan (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/15/2025"
      - gridcell "$75"
      - gridcell "In Progress"
      - gridcell "48%"
    - row "285 [CORE-1285] Write component snapshot tests (Security Audit) 🧪 Testing Medium Ryan Thomas Ryan Thomas 8/15/2025 $6,125 Todo 8%":
      - gridcell "285"
      - gridcell "[CORE-1285] Write component snapshot tests (Security Audit)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/15/2025"
      - gridcell "$6,125"
      - gridcell "Todo"
      - gridcell "8%"
    - row "424 [WEB-1424] Set up log aggregation (Sprint 27) 🔧 DevOps Medium Daniel Kim Daniel Kim 8/19/2025 $200 In Progress 51%":
      - gridcell "424"
      - gridcell "[WEB-1424] Set up log aggregation (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/19/2025"
      - gridcell "$200"
      - gridcell "In Progress"
      - gridcell "51%"
    - row "948 [DATA-1948] Implement OAuth integration (Performance Sprint) ✨ Feature High Sophia Taylor Sophia Taylor 8/15/2025 $450 In Review 66%":
      - gridcell "948"
      - gridcell "[DATA-1948] Implement OAuth integration (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/15/2025"
      - gridcell "$450"
      - gridcell "In Review"
      - gridcell "66%"
    - row "989 [MOBILE-1989] Implement two-factor authentication (Sprint 26) ✨ Feature Low Amanda White Amanda White 9/14/2025 $425 In Progress 47%":
      - gridcell "989"
      - gridcell "[MOBILE-1989] Implement two-factor authentication (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/14/2025"
      - gridcell "$425"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "183 [USER-1183] Build real-time notifications system (Tech Debt) ✨ Feature Critical Sarah Johnson Sarah Johnson 8/7/2025 $600 Testing 81%":
      - gridcell "183"
      - gridcell "[USER-1183] Build real-time notifications system (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/7/2025"
      - gridcell "$600"
      - gridcell "Testing"
      - gridcell "81%"
    - row "874 [DATA-1874] Configure CDN distribution (Performance Sprint) 🔧 DevOps Low Isabella Garcia Isabella Garcia 9/9/2025 $275 Testing 82%":
      - gridcell "874"
      - gridcell "[DATA-1874] Configure CDN distribution (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/9/2025"
      - gridcell "$275"
      - gridcell "Testing"
      - gridcell "82%"
    - row "882 [INFRA-1882] Test error boundary behavior (Sprint 25) 🧪 Testing Low Emma Davis Emma Davis 9/10/2025 $11,425 Backlog 0%":
      - gridcell "882"
      - gridcell "[INFRA-1882] Test error boundary behavior (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/10/2025"
      - gridcell "$11,425"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "960 [AUTH-1960] Add drag-and-drop file upload (Q2 Planning) ✨ Feature High Ryan Thomas Ryan Thomas 8/11/2025 $675 In Progress 57%":
      - gridcell "960"
      - gridcell "[AUTH-1960] Add drag-and-drop file upload (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/11/2025"
      - gridcell "$675"
      - gridcell "In Progress"
      - gridcell "57%"
    - row "173 [AUTH-1173] Implement secrets management (Sprint 23) 🔧 DevOps Medium John Robinson John Robinson 8/17/2025 $1,100 In Review 60%":
      - gridcell "173"
      - gridcell "[AUTH-1173] Implement secrets management (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/17/2025"
      - gridcell "$1,100"
      - gridcell "In Review"
      - gridcell "60%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,171,700 44%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,171,700"
      - gridcell
      - gridcell "44%"
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
- text: Page 1 of 41
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