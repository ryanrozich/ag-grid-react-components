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
- paragraph: $4,324,775
- img
- paragraph: Progress
- paragraph: 47.5%
- img
- paragraph: Budget Remaining
- paragraph: $2,305,565
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
    - row "899 [UI-1899] Add E2E tests for checkout flow (Q1 Goals) 🧪 Testing Medium Sophia Taylor Sophia Taylor 9/2/2025 $8,800 In Review 61%":
      - gridcell "899"
      - gridcell "[UI-1899] Add E2E tests for checkout flow (Q1 Goals)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/2/2025"
      - gridcell "$8,800"
      - gridcell "In Review"
      - gridcell "61%"
    - row "445 [CORE-1445] Add internationalization tests (Sprint 23) 🧪 Testing High Ryan Thomas Ryan Thomas 8/18/2025 $5,350 Testing 88%":
      - gridcell "445"
      - gridcell "[CORE-1445] Add internationalization tests (Sprint 23)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/18/2025"
      - gridcell "$5,350"
      - gridcell "Testing"
      - gridcell "88%"
    - row "165 [AUTH-1165] Create security penetration tests (Tech Debt) 🧪 Testing Medium Amanda White Amanda White 8/22/2025 $750 Backlog 0%":
      - gridcell "165"
      - gridcell "[AUTH-1165] Create security penetration tests (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/22/2025"
      - gridcell "$750"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "327 [FRONTEND-1327] Add encryption at rest (Sprint 24) 🔒 Security Low Priya Sharma Priya Sharma 8/23/2025 $8,875 In Review 74%":
      - gridcell "327"
      - gridcell "[FRONTEND-1327] Add encryption at rest (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/23/2025"
      - gridcell "$8,875"
      - gridcell "In Review"
      - gridcell "74%"
    - row "517 [INFRA-1517] Implement rate limiting 🔒 Security Critical Olivia Brown Olivia Brown 8/11/2025 $5,000 In Review 72%":
      - gridcell "517"
      - gridcell "[INFRA-1517] Implement rate limiting"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/11/2025"
      - gridcell "$5,000"
      - gridcell "In Review"
      - gridcell "72%"
    - row "441 [DATA-1441] Set up penetration testing 🔒 Security Critical Sophia Taylor Sophia Taylor 8/10/2025 $950 In Review 61%":
      - gridcell "441"
      - gridcell "[DATA-1441] Set up penetration testing"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/10/2025"
      - gridcell "$950"
      - gridcell "In Review"
      - gridcell "61%"
    - row "929 [UI-1929] Migrate to TypeScript strict mode (Sprint 26) ♻️ Refactor Low Sarah Johnson Sarah Johnson 9/1/2025 $5,275 Testing 90%":
      - gridcell "929"
      - gridcell "[UI-1929] Migrate to TypeScript strict mode (Sprint 26)"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/1/2025"
      - gridcell "$5,275"
      - gridcell "Testing"
      - gridcell "90%"
    - row "651 [API-1651] Debug WebSocket connection timeout (Tech Debt) 🐛 Bug Critical Michael Anderson Michael Anderson 8/9/2025 $1,725 Backlog 0%":
      - gridcell "651"
      - gridcell "[API-1651] Debug WebSocket connection timeout (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/9/2025"
      - gridcell "$1,725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "407 [PROJ-1407] Add request batching (Performance Sprint) ⚡ Performance Low Maya Patel Maya Patel 8/27/2025 $2,225 Testing 81%":
      - gridcell "407"
      - gridcell "[PROJ-1407] Add request batching (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/27/2025"
      - gridcell "$2,225"
      - gridcell "Testing"
      - gridcell "81%"
    - row "462 [UI-1462] Add keyboard shortcuts (Q2 Planning) ✨ Feature Critical Ryan Thomas Ryan Thomas 8/9/2025 $575 Testing 85%":
      - gridcell "462"
      - gridcell "[UI-1462] Add keyboard shortcuts (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/9/2025"
      - gridcell "$575"
      - gridcell "Testing"
      - gridcell "85%"
    - row "640 [UI-1640] Debug crash on mobile Safari (Sprint 26) 🐛 Bug Low Michael Anderson Michael Anderson 8/20/2025 $750 In Review 73%":
      - gridcell "640"
      - gridcell "[UI-1640] Debug crash on mobile Safari (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/20/2025"
      - gridcell "$750"
      - gridcell "In Review"
      - gridcell "73%"
    - row "677 [UI-1677] Optimize render performance ⚡ Performance Medium Alex Chen Alex Chen 8/13/2025 $4,475 Todo 7%":
      - gridcell "677"
      - gridcell "[UI-1677] Optimize render performance"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/13/2025"
      - gridcell "$4,475"
      - gridcell "Todo"
      - gridcell "7%"
    - row "405 [AUTH-1405] Optimize database queries ⚡ Performance Low Isabella Garcia Isabella Garcia 9/3/2025 $3,550 In Progress 53%":
      - gridcell "405"
      - gridcell "[AUTH-1405] Optimize database queries"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/3/2025"
      - gridcell "$3,550"
      - gridcell "In Progress"
      - gridcell "53%"
    - row "801 [DASH-1801] Extract business logic layer (Security Audit) ♻️ Refactor Critical Marcus Williams Marcus Williams 8/7/2025 $4,575 Backlog 0%":
      - gridcell "801"
      - gridcell "[DASH-1801] Extract business logic layer (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/7/2025"
      - gridcell "$4,575"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "847 [DATA-1847] Optimize bundle size (Sprint 24) ⚡ Performance Critical Chris Martinez Chris Martinez 8/8/2025 $1,150 Todo 18%":
      - gridcell "847"
      - gridcell "[DATA-1847] Optimize bundle size (Sprint 24)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/8/2025"
      - gridcell "$1,150"
      - gridcell "Todo"
      - gridcell "18%"
    - row "362 [DASH-1362] Reduce API call frequency (Q2 Planning) ⚡ Performance High Maya Patel Maya Patel 8/13/2025 $3,550 Backlog 0%":
      - gridcell "362"
      - gridcell "[DASH-1362] Reduce API call frequency (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/13/2025"
      - gridcell "$3,550"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,324,775 48%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,324,775"
      - gridcell
      - gridcell "48%"
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