# Test info

- Name: Grid Reset Functionality >> reset clears filters and restores grid state
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/grid-reset-functionality.spec.ts:44:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-component="quick-filter-option"]').filter({ hasText: 'Last Week' })

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/grid-reset-functionality.spec.ts:59:26
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
- button "Quick filter options" [expanded]:
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
- paragraph: $40,813,000
- img
- paragraph: Average Progress
- paragraph: 46.1%
- img
- paragraph: Budget Remaining
- paragraph: $22,022,022
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
    - row "Press Space to toggle row selection (unchecked) [DATA-2481] Create security penetration tests (Security Audit) In Review Critical 🧪 Testing Sophia Taylor Sophia Taylor 9/3/2025 79% $9,125 $7,209":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-2481] Create security penetration tests (Security Audit)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/3/2025"
      - gridcell "79%"
      - gridcell "$9,125"
      - gridcell "$7,209"
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-4816] Create video tutorials (Security Audit) In Review High 📝 Documentation Sarah Johnson Sarah Johnson 9/6/2025 79% $12,225 $9,658":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-4816] Create video tutorials (Security Audit)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/6/2025"
      - gridcell "79%"
      - gridcell "$12,225"
      - gridcell "$9,658"
    - row "Press Space to toggle row selection (unchecked) [UI-6647] Refactor error handling (Q1 Goals) Todo High ♻️ Refactor Sarah Johnson Sarah Johnson 9/3/2025 19% $875 $166":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[UI-6647] Refactor error handling (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/3/2025"
      - gridcell "19%"
      - gridcell "$875"
      - gridcell "$166"
    - row "Press Space to toggle row selection (unchecked) [BACKEND-3772] Configure load balancer (Performance Sprint) Backlog Medium 🔧 DevOps Sarah Johnson Sarah Johnson 9/12/2025 0% $15,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[BACKEND-3772] Configure load balancer (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/12/2025"
      - gridcell "0%"
      - gridcell "$15,000"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-3879] Configure security headers (Tech Debt) Todo Medium 🔒 Security Chris Martinez Chris Martinez 9/5/2025 16% $775 $124":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-3879] Configure security headers (Tech Debt)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/5/2025"
      - gridcell "16%"
      - gridcell "$775"
      - gridcell "$124"
    - row "Press Space to toggle row selection (unchecked) [APP-6929] Refactor error handling (Sprint 23) Backlog High ♻️ Refactor Alex Chen Alex Chen 9/4/2025 0% $850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[APP-6929] Refactor error handling (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/4/2025"
      - gridcell "0%"
      - gridcell "$850"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [WEB-9829] Refactor error handling Testing High ♻️ Refactor Isabella Garcia Isabella Garcia 9/4/2025 88% $500 $440":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-9829] Refactor error handling"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/4/2025"
      - gridcell "88%"
      - gridcell "$500"
      - gridcell "$440"
    - row "Press Space to toggle row selection (unchecked) [AUTH-2330] Implement session management In Progress Low 🔒 Security Amanda White Amanda White 9/16/2025 43% $375 $161":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[AUTH-2330] Implement session management"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/16/2025"
      - gridcell "43%"
      - gridcell "$375"
      - gridcell "$161"
    - row "Press Space to toggle row selection (unchecked) [DASH-2532] Extract business logic layer (Security Audit) Backlog Low ♻️ Refactor Daniel Kim Daniel Kim 10/7/2025 0% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-2532] Extract business logic layer (Security Audit)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "10/7/2025"
      - gridcell "0%"
      - gridcell "$450"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [UI-4584] Create integration test suite (Sprint 25) Todo Critical 🧪 Testing David Lee David Lee 9/1/2025 5% $325 $16":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[UI-4584] Create integration test suite (Sprint 25)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/1/2025"
      - gridcell "5%"
      - gridcell "$325"
      - gridcell "$16"
    - row "Press Space to toggle row selection (unchecked) [APP-5186] Fix broken deep links in navigation Blocked High 🐛 Bug Marcus Williams Marcus Williams 8/30/2025 34% $6,250 $2,125":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[APP-5186] Fix broken deep links in navigation"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/30/2025"
      - gridcell "34%"
      - gridcell "$6,250"
      - gridcell "$2,125"
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-1737] Add database indexing (Sprint 23) Testing Critical ⚡ Performance Priya Sharma Priya Sharma 8/31/2025 85% $18,575 $15,789":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-1737] Add database indexing (Sprint 23)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/31/2025"
      - gridcell "85%"
      - gridcell "$18,575"
      - gridcell "$15,789"
    - row "Press Space to toggle row selection (unchecked) [WEB-1953] Test cross-browser compatibility Testing High 🧪 Testing Marcus Williams Marcus Williams 9/1/2025 92% $16,150 $14,858":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-1953] Test cross-browser compatibility"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/1/2025"
      - gridcell "92%"
      - gridcell "$16,150"
      - gridcell "$14,858"
    - row "Press Space to toggle row selection (unchecked) [USER-3720] Add multi-language support Todo High ✨ Feature Jessica Lopez Jessica Lopez 9/3/2025 17% $925 $157":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[USER-3720] Add multi-language support"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "9/3/2025"
      - gridcell "17%"
      - gridcell "$925"
      - gridcell "$157"
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-5180] Test cross-browser compatibility In Progress High 🧪 Testing Emily Jackson Emily Jackson 9/1/2025 57% $625 $356":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-5180] Test cross-browser compatibility"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/1/2025"
      - gridcell "57%"
      - gridcell "$625"
      - gridcell "$356"
    - row "Press Space to toggle row selection (unchecked) [WEB-5410] Add request batching (Sprint 26) Backlog High ⚡ Performance Priya Sharma Priya Sharma 9/3/2025 0% $1,600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-5410] Add request batching (Sprint 26)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/3/2025"
      - gridcell "0%"
      - gridcell "$1,600"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [BACKEND-5943] Write component snapshot tests (Sprint 24) In Progress Low 🧪 Testing Amanda White Amanda White 10/4/2025 20% $300 $60":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[BACKEND-5943] Write component snapshot tests (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "10/4/2025"
      - gridcell "20%"
      - gridcell "$300"
      - gridcell "$60"
    - row "Press Space to toggle row selection (unchecked) [BACKEND-6174] Debug crash on mobile Safari Blocked Critical 🐛 Bug Chris Martinez Chris Martinez 8/28/2025 21% $600 $126":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[BACKEND-6174] Debug crash on mobile Safari"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/28/2025"
      - gridcell "21%"
      - gridcell "$600"
      - gridcell "$126"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,813,000 $18,790,978":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,813,000"
      - gridcell "$18,790,978"
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
   3 | test.describe("Grid Reset Functionality", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto("/demo");
   6 |     await page.waitForLoadState("networkidle");
   7 |   });
   8 |
   9 |   test("reset to defaults option appears in three-dots menu", async ({
   10 |     page,
   11 |   }) => {
   12 |     // Wait for grid to be ready
   13 |     await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
   14 |     await page.waitForTimeout(1000);
   15 |
   16 |     // Click the three-dots menu
   17 |     const menuTrigger = page
   18 |       .locator('[data-testid="view-management-menu-trigger"]')
   19 |       .first();
   20 |     await expect(menuTrigger).toBeVisible();
   21 |     await menuTrigger.click();
   22 |
   23 |     // Check that the menu appears
   24 |     const menu = page.locator('[data-testid="view-management-menu"]').first();
   25 |     await expect(menu).toBeVisible();
   26 |
   27 |     // Look for the reset option
   28 |     const resetOption = menu
   29 |       .locator("button")
   30 |       .filter({ hasText: "Reset to defaults" });
   31 |     await expect(resetOption).toBeVisible();
   32 |
   33 |     // Check that it's not disabled (grid is available)
   34 |     const isDisabled = await resetOption.isDisabled();
   35 |     expect(isDisabled).toBe(false);
   36 |
   37 |     // Take screenshot
   38 |     await page.screenshot({
   39 |       path: "screenshots/three-dots-menu-with-reset.png",
   40 |       fullPage: false,
   41 |     });
   42 |   });
   43 |
   44 |   test("reset clears filters and restores grid state", async ({ page }) => {
   45 |     // Wait for grid
   46 |     await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
   47 |     await page.waitForTimeout(1000);
   48 |
   49 |     // Apply a time period filter
   50 |     const timePeriodButton = page
   51 |       .locator("button")
   52 |       .filter({ hasText: "All Time" })
   53 |       .first();
   54 |     await timePeriodButton.click();
   55 |
   56 |     const lastWeekOption = page
   57 |       .locator('[data-component="quick-filter-option"]')
   58 |       .filter({ hasText: "Last Week" });
>  59 |     await lastWeekOption.click();
      |                          ^ Error: locator.click: Test timeout of 30000ms exceeded.
   60 |
   61 |     // Wait for filter to apply
   62 |     await page.waitForTimeout(500);
   63 |
   64 |     // Check that filter is applied
   65 |     const activeFilters = page.locator(".active-filters-container");
   66 |     await expect(activeFilters).toBeVisible();
   67 |
   68 |     // Open three-dots menu
   69 |     const menuTrigger = page
   70 |       .locator('[data-testid="view-management-menu-trigger"]')
   71 |       .first();
   72 |     await menuTrigger.click();
   73 |
   74 |     // Click reset to defaults
   75 |     const resetOption = page
   76 |       .locator("button")
   77 |       .filter({ hasText: "Reset to defaults" });
   78 |     await resetOption.click();
   79 |
   80 |     // Wait for reset
   81 |     await page.waitForTimeout(1000);
   82 |
   83 |     // Check that filters are cleared
   84 |     const activeFiltersAfter = page.locator(".active-filters-container");
   85 |     const isVisible = await activeFiltersAfter.isVisible();
   86 |     expect(isVisible).toBe(false);
   87 |
   88 |     // Check that time period button shows "All Time" again
   89 |     await expect(timePeriodButton).toHaveText("All Time");
   90 |   });
   91 |
   92 |   test("saved views dropdown shows only views without action items", async ({
   93 |     page,
   94 |   }) => {
   95 |     // Wait for grid
   96 |     await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
   97 |
   98 |     // Click My Views dropdown
   99 |     const myViewsButton = page
  100 |       .locator("button")
  101 |       .filter({ hasText: "My Views" })
  102 |       .first();
  103 |     await myViewsButton.click();
  104 |
  105 |     // Wait for dropdown
  106 |     await page.waitForTimeout(300);
  107 |
  108 |     // Check that dropdown doesn't contain "Clear filters" option
  109 |     const dropdown = page
  110 |       .locator('[data-component="quick-filter-dropdown"]')
  111 |       .first();
  112 |     const clearFiltersOption = dropdown.locator("text=Clear filters");
  113 |     const hasClearFilters = (await clearFiltersOption.count()) > 0;
  114 |
  115 |     expect(hasClearFilters).toBe(false);
  116 |
  117 |     // Close dropdown
  118 |     await page.keyboard.press("Escape");
  119 |   });
  120 | });
  121 |
```