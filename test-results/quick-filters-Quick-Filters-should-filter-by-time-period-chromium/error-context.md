# Test info

- Name: Quick Filters >> should filter by time period
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:37:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    61 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:45:16
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
- button "Quick filter options" [expanded]:
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
- paragraph: $4,083,925
- img
- paragraph: Progress
- paragraph: 47.5%
- img
- paragraph: Budget Remaining
- paragraph: $2,153,292
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
    - row "459 [MOBILE-1459] Modernize legacy jQuery code (Sprint 25) ♻️ Refactor High Chris Martinez Chris Martinez 8/22/2025 $4,450 Backlog 0%":
      - gridcell "459"
      - gridcell "[MOBILE-1459] Modernize legacy jQuery code (Sprint 25)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/22/2025"
      - gridcell "$4,450"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "707 [PROJ-1707] Add progressive web app features ⚡ Performance Low Emma Davis Emma Davis 9/19/2025 $475 Testing 91%":
      - gridcell "707"
      - gridcell "[PROJ-1707] Add progressive web app features"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/19/2025"
      - gridcell "$475"
      - gridcell "Testing"
      - gridcell "91%"
    - row "385 [CORE-1385] Write accessibility tests (Sprint 24) 🧪 Testing Medium Sarah Johnson Sarah Johnson 9/1/2025 $16,750 Testing 84%":
      - gridcell "385"
      - gridcell "[CORE-1385] Write accessibility tests (Sprint 24)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/1/2025"
      - gridcell "$16,750"
      - gridcell "Testing"
      - gridcell "84%"
    - row "489 [DATA-1489] Implement API key rotation (Tech Debt) 🔒 Security Critical Priya Sharma Priya Sharma 8/9/2025 $375 Todo 14%":
      - gridcell "489"
      - gridcell "[DATA-1489] Implement API key rotation (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/9/2025"
      - gridcell "$375"
      - gridcell "Todo"
      - gridcell "14%"
    - row "710 [WEB-1710] Fix date picker timezone issue (Q2 Planning) 🐛 Bug High Maya Patel Maya Patel 8/11/2025 $1,875 Blocked 14%":
      - gridcell "710"
      - gridcell "[WEB-1710] Fix date picker timezone issue (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/11/2025"
      - gridcell "$1,875"
      - gridcell "Blocked"
      - gridcell "14%"
    - row "888 [API-1888] Create advanced search filters ✨ Feature Medium Amanda White Amanda White 8/25/2025 $10,475 Backlog 0%":
      - gridcell "888"
      - gridcell "[API-1888] Create advanced search filters"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/25/2025"
      - gridcell "$10,475"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "172 [DASH-1172] Extract business logic layer (Q2 Planning) ♻️ Refactor Critical Sophia Taylor Sophia Taylor 8/7/2025 $300 Backlog 0%":
      - gridcell "172"
      - gridcell "[DASH-1172] Extract business logic layer (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/7/2025"
      - gridcell "$300"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "495 [MOBILE-1495] Set up penetration testing (Sprint 27) 🔒 Security High James Wilson James Wilson 8/10/2025 $100 Backlog 0%":
      - gridcell "495"
      - gridcell "[MOBILE-1495] Set up penetration testing (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/10/2025"
      - gridcell "$100"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "733 [BACKEND-1733] Update API documentation (Sprint 24) 📝 Documentation Critical Olivia Brown Olivia Brown 8/9/2025 $14,825 Backlog 0%":
      - gridcell "733"
      - gridcell "[BACKEND-1733] Update API documentation (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/9/2025"
      - gridcell "$14,825"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "256 [APP-1256] Fix infinite scroll pagination bug (Sprint 27) 🐛 Bug High Marcus Williams Marcus Williams 8/8/2025 $725 Backlog 0%":
      - gridcell "256"
      - gridcell "[APP-1256] Fix infinite scroll pagination bug (Sprint 27)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/8/2025"
      - gridcell "$725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "470 [UI-1470] Add encryption at rest 🔒 Security Critical Daniel Kim Daniel Kim 8/6/2025 $11,825 Backlog 0%":
      - gridcell "470"
      - gridcell "[UI-1470] Add encryption at rest"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/6/2025"
      - gridcell "$11,825"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "874 [WEB-1874] Implement rate limiting (Security Audit) 🔒 Security Low Emma Davis Emma Davis 8/14/2025 $950 Backlog 0%":
      - gridcell "874"
      - gridcell "[WEB-1874] Implement rate limiting (Security Audit)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/14/2025"
      - gridcell "$950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "957 [AUTH-1957] Fix login form validation error (Sprint 24) 🐛 Bug Critical Emma Davis Emma Davis 8/5/2025 $250 In Review 65%":
      - gridcell "957"
      - gridcell "[AUTH-1957] Fix login form validation error (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/5/2025"
      - gridcell "$250"
      - gridcell "In Review"
      - gridcell "65%"
    - row "117 [INFRA-1117] Implement social media sharing (Tech Debt) ✨ Feature Medium Daniel Kim Daniel Kim 8/13/2025 $600 Backlog 0%":
      - gridcell "117"
      - gridcell "[INFRA-1117] Implement social media sharing (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/13/2025"
      - gridcell "$600"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "154 [DASH-1154] Update README with examples 📝 Documentation Medium Maya Patel Maya Patel 8/16/2025 $6,225 In Progress 54%":
      - gridcell "154"
      - gridcell "[DASH-1154] Update README with examples"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/16/2025"
      - gridcell "$6,225"
      - gridcell "In Progress"
      - gridcell "54%"
    - row "278 [WEB-1278] Fix broken unit tests in CI pipeline 🐛 Bug Medium Jessica Lopez Jessica Lopez 8/12/2025 $775 Backlog 0%":
      - gridcell "278"
      - gridcell "[WEB-1278] Fix broken unit tests in CI pipeline"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/12/2025"
      - gridcell "$775"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,083,925 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,083,925"
      - gridcell
      - gridcell "47%"
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