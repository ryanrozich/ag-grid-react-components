# Test info

- Name: Quick Filters >> should filter by Overdue tasks
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:52:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Overdue"
Received string: "Time period"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_a39xr_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Time period"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:61:59
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
- text: "Quick filters:"
- button "Quick filter options":
    - text: Time period
    - img
- button "Quick filter options":
    - text: All Tasks
    - img
- paragraph: Number of Tasks
- paragraph: "576"
- img
- paragraph: Total Budget
- paragraph: $2,334,750
- img
- paragraph: Progress
- paragraph: 32.2%
- img
- paragraph: Budget Remaining
- paragraph: $1,559,646
- img
- text: "Due Date: before Today"
- button "Remove Due Date filter": ×
- text: "Status: Backlog, Todo, In Progress, In Review, Testing, Blocked"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- text: 1 to 25 of 577. Page 1 of 24
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
        - row "792 [FRONTEND-1792] Write testing best practices 📝 Documentation Critical Olivia Brown Olivia Brown 6/24/2025 $550 Todo 15%":
            - gridcell "792"
            - gridcell "[FRONTEND-1792] Write testing best practices"
            - gridcell "📝 Documentation"
            - gridcell "Critical"
            - gridcell "Olivia Brown Olivia Brown":
                - img "Olivia Brown"
                - text: Olivia Brown
            - gridcell "6/24/2025"
            - gridcell "$550"
            - gridcell "Todo"
            - gridcell "15%"
        - row "441 [UI-1441] Implement API key rotation 🔒 Security High Amanda White Amanda White 6/24/2025 $150 In Progress 53%":
            - gridcell "441"
            - gridcell "[UI-1441] Implement API key rotation"
            - gridcell "🔒 Security"
            - gridcell "High"
            - gridcell "Amanda White Amanda White":
                - img "Amanda White"
                - text: Amanda White
            - gridcell "6/24/2025"
            - gridcell "$150"
            - gridcell "In Progress"
            - gridcell "53%"
        - row "15 [PROJ-1015] Implement auto-scaling (Q2 Planning) 🔧 DevOps Critical Emma Davis Emma Davis 6/22/2025 $825 Blocked 28%":
            - gridcell "15"
            - gridcell "[PROJ-1015] Implement auto-scaling (Q2 Planning)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Emma Davis Emma Davis":
                - img "Emma Davis"
                - text: Emma Davis
            - gridcell "6/22/2025"
            - gridcell "$825"
            - gridcell "Blocked"
            - gridcell "28%"
        - row "227 [API-1227] Update API documentation 📝 Documentation High Emma Davis Emma Davis 6/24/2025 $18,850 Blocked 32%":
            - gridcell "227"
            - gridcell "[API-1227] Update API documentation"
            - gridcell "📝 Documentation"
            - gridcell "High"
            - gridcell "Emma Davis Emma Davis":
                - img "Emma Davis"
                - text: Emma Davis
            - gridcell "6/24/2025"
            - gridcell "$18,850"
            - gridcell "Blocked"
            - gridcell "32%"
        - row "476 [WEB-1476] Implement auto-scaling (Tech Debt) 🔧 DevOps Critical Emma Davis Emma Davis 6/23/2025 $9,725 Blocked 21%":
            - gridcell "476"
            - gridcell "[WEB-1476] Implement auto-scaling (Tech Debt)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Emma Davis Emma Davis":
                - img "Emma Davis"
                - text: Emma Davis
            - gridcell "6/23/2025"
            - gridcell "$9,725"
            - gridcell "Blocked"
            - gridcell "21%"
        - row "821 [DATA-1821] Consolidate duplicate code ♻️ Refactor Critical David Lee David Lee 6/22/2025 $900 Blocked 37%":
            - gridcell "821"
            - gridcell "[DATA-1821] Consolidate duplicate code"
            - gridcell "♻️ Refactor"
            - gridcell "Critical"
            - gridcell "David Lee David Lee":
                - img "David Lee"
                - text: David Lee
            - gridcell "6/22/2025"
            - gridcell "$900"
            - gridcell "Blocked"
            - gridcell "37%"
        - row "920 [API-1920] Implement rate limiting (Sprint 26) 🔒 Security Critical John Robinson John Robinson 6/20/2025 $3,275 Backlog 0%":
            - gridcell "920"
            - gridcell "[API-1920] Implement rate limiting (Sprint 26)"
            - gridcell "🔒 Security"
            - gridcell "Critical"
            - gridcell "John Robinson John Robinson":
                - img "John Robinson"
                - text: John Robinson
            - gridcell "6/20/2025"
            - gridcell "$3,275"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "609 [MOBILE-1609] Configure firewall rules 🔒 Security Critical Kevin Zhang Kevin Zhang 6/20/2025 $19,600 In Progress 58%":
            - gridcell "609"
            - gridcell "[MOBILE-1609] Configure firewall rules"
            - gridcell "🔒 Security"
            - gridcell "Critical"
            - gridcell "Kevin Zhang Kevin Zhang":
                - img "Kevin Zhang"
                - text: Kevin Zhang
            - gridcell "6/20/2025"
            - gridcell "$19,600"
            - gridcell "In Progress"
            - gridcell "58%"
        - row "671 [APP-1671] Build analytics dashboard (Sprint 27) ✨ Feature Critical Marcus Williams Marcus Williams 6/21/2025 $14,025 Blocked 20%":
            - gridcell "671"
            - gridcell "[APP-1671] Build analytics dashboard (Sprint 27)"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/21/2025"
            - gridcell "$14,025"
            - gridcell "Blocked"
            - gridcell "20%"
        - row "254 [AUTH-1254] Implement API key rotation (Q2 Planning) 🔒 Security High Emma Davis Emma Davis 6/19/2025 $4,025 Blocked 33%":
            - gridcell "254"
            - gridcell "[AUTH-1254] Implement API key rotation (Q2 Planning)"
            - gridcell "🔒 Security"
            - gridcell "High"
            - gridcell "Emma Davis Emma Davis":
                - img "Emma Davis"
                - text: Emma Davis
            - gridcell "6/19/2025"
            - gridcell "$4,025"
            - gridcell "Blocked"
            - gridcell "33%"
        - row "561 [AUTH-1561] Modernize legacy jQuery code ♻️ Refactor High Chris Martinez Chris Martinez 6/23/2025 $275 Blocked 26%":
            - gridcell "561"
            - gridcell "[AUTH-1561] Modernize legacy jQuery code"
            - gridcell "♻️ Refactor"
            - gridcell "High"
            - gridcell "Chris Martinez Chris Martinez":
                - img "Chris Martinez"
                - text: Chris Martinez
            - gridcell "6/23/2025"
            - gridcell "$275"
            - gridcell "Blocked"
            - gridcell "26%"
        - row "669 [CORE-1669] Set up SSL certificates (Performance Sprint) 🔒 Security Medium Marcus Williams Marcus Williams 6/22/2025 $575 Blocked 10%":
            - gridcell "669"
            - gridcell "[CORE-1669] Set up SSL certificates (Performance Sprint)"
            - gridcell "🔒 Security"
            - gridcell "Medium"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/22/2025"
            - gridcell "$575"
            - gridcell "Blocked"
            - gridcell "10%"
        - row "914 [UI-1914] Update to ES6 modules (Sprint 25) ♻️ Refactor High Sophia Taylor Sophia Taylor 6/23/2025 $1,975 In Progress 22%":
            - gridcell "914"
            - gridcell "[UI-1914] Update to ES6 modules (Sprint 25)"
            - gridcell "♻️ Refactor"
            - gridcell "High"
            - gridcell "Sophia Taylor Sophia Taylor":
                - img "Sophia Taylor"
                - text: Sophia Taylor
            - gridcell "6/23/2025"
            - gridcell "$1,975"
            - gridcell "In Progress"
            - gridcell "22%"
        - row "947 [DASH-1947] Create troubleshooting guide (Sprint 23) 📝 Documentation Critical James Wilson James Wilson 6/20/2025 $4,425 In Progress 25%":
            - gridcell "947"
            - gridcell "[DASH-1947] Create troubleshooting guide (Sprint 23)"
            - gridcell "📝 Documentation"
            - gridcell "Critical"
            - gridcell "James Wilson James Wilson":
                - img "James Wilson"
                - text: James Wilson
            - gridcell "6/20/2025"
            - gridcell "$4,425"
            - gridcell "In Progress"
            - gridcell "25%"
    - rowgroup
    - rowgroup
    - rowgroup
    - rowgroup:
        - row "$2,334,750 32%":
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell "$2,334,750"
            - gridcell
            - gridcell "32%"
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
- text: Page 1 of 24
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
   20 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   21 |     await expect(firstDropdown.locator("button").first()).toContainText("Last 7 Days");
   22 |
   23 |     // Check that there are active filters displayed
   24 |     const activeFilters = page.locator('[data-testid="active-filters"]');
   25 |     await expect(activeFilters).toBeVisible();
   26 |
   27 |     // Verify the filter is working by checking row count
   28 |     const rowCount = await page.locator(".ag-row").count();
   29 |     expect(rowCount).toBeGreaterThan(0);
   30 |     expect(rowCount).toBeLessThan(25); // Should be filtered, not showing all 1000 rows
   31 |   });
   32 |
   33 |   test("should filter by time period", async ({ page }) => {
   34 |     // Click on the first quick filter dropdown
   35 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   36 |     await firstDropdown.locator("button").first().click();
   37 |
   38 |     // Wait for dropdown menu to be visible
   39 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   40 |
   41 |     // Select "This Month"
   42 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
   43 |
   44 |     // Verify the dropdown shows the new selection
   45 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
   46 |
   47 |     // Verify row count changed
   48 |     const rowCount = await page.locator(".ag-row").count();
   49 |     expect(rowCount).toBeGreaterThan(0);
   50 |   });
   51 |
   52 |   test("should filter by Overdue tasks", async ({ page }) => {
   53 |     // Click on the first quick filter dropdown
   54 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   55 |     await firstDropdown.locator("button").first().click();
   56 |
   57 |     // Select "Overdue"
   58 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
   59 |
   60 |     // Verify the dropdown shows the new selection
>  61 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
   62 |
   63 |     // Verify that no "Done" status tasks are shown
   64 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   65 |
   66 |     // Check that none of the visible statuses are "Done"
   67 |     for (const status of statusCells) {
   68 |       expect(status).not.toBe("Done");
   69 |     }
   70 |   });
   71 |
   72 |   test("should filter by Not Started tasks", async ({ page }) => {
   73 |     // Click on the first quick filter dropdown
   74 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   75 |     await firstDropdown.locator("button").first().click();
   76 |
   77 |     // Select "Not Started"
   78 |     await page.locator('[role="option"]').filter({ hasText: "Not Started" }).click();
   79 |
   80 |     // Verify the dropdown shows the new selection
   81 |     await expect(firstDropdown.locator("button").first()).toContainText("Not Started");
   82 |
   83 |     // Verify that only "Backlog" or "Todo" status tasks are shown
   84 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   85 |
   86 |     // Check that all visible statuses are either "Backlog" or "Todo"
   87 |     for (const status of statusCells) {
   88 |       expect(["Backlog", "Todo"]).toContain(status);
   89 |     }
   90 |   });
   91 |
   92 |   test("should filter by task type", async ({ page }) => {
   93 |     // Click on the second quick filter dropdown (task type)
   94 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
   95 |     await secondDropdown.locator("button").first().click();
   96 |
   97 |     // Wait for dropdown menu to be visible
   98 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   99 |
  100 |     // Select "Critical Bugs"
  101 |     await page.locator('[role="option"]').filter({ hasText: "Critical Bugs" }).click();
  102 |
  103 |     // Verify the dropdown shows the new selection
  104 |     await expect(secondDropdown.locator("button").first()).toContainText("Critical Bugs");
  105 |
  106 |     // Verify that only Bug category with Critical/High priority are shown
  107 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  108 |     const priorityCells = await page.locator('.ag-cell[col-id="priority"]').allTextContents();
  109 |
  110 |     // Check categories are all "Bug"
  111 |     for (const category of categoryCells) {
  112 |       expect(category).toBe("Bug");
  113 |     }
  114 |
  115 |     // Check priorities are either "Critical" or "High"
  116 |     for (const priority of priorityCells) {
  117 |       expect(["Critical", "High"]).toContain(priority);
  118 |     }
  119 |   });
  120 |
  121 |   test("should clear all filters", async ({ page }) => {
  122 |     // Wait for default filter first
  123 |     await page.waitForTimeout(1500);
  124 |
  125 |     // Apply another filter
  126 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  127 |     await firstDropdown.locator("button").first().click();
  128 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  129 |
  130 |     // Wait for filter to apply
  131 |     await page.waitForTimeout(1000);
  132 |
  133 |     // Verify filter is applied
  134 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
  135 |
  136 |     // Clear the filter by selecting "All Time"
  137 |     await firstDropdown.locator("button").first().click();
  138 |     await page.locator('[role="option"]').filter({ hasText: "All Time" }).click();
  139 |
  140 |     // Wait for filter to clear
  141 |     await page.waitForTimeout(1000);
  142 |
  143 |     // Verify the dropdown shows "All Time"
  144 |     await expect(firstDropdown.locator("button").first()).toContainText("All Time");
  145 |
  146 |     // Active filters should not be visible
  147 |     const activeFilters = page.locator('[data-testid="active-filters"]');
  148 |     await expect(activeFilters).not.toBeVisible();
  149 |   });
  150 |
  151 |   test("should combine time and task type filters", async ({ page }) => {
  152 |     // Apply time filter
  153 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  154 |     await firstDropdown.locator("button").first().click();
  155 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
  156 |
  157 |     // Apply task type filter
  158 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
  159 |     await secondDropdown.locator("button").first().click();
  160 |     await page.locator('[role="option"]').filter({ hasText: "Features" }).click();
  161 |
```
