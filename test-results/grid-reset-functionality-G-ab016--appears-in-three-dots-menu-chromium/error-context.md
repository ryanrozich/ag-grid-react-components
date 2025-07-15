# Test info

- Name: Grid Reset Functionality >> reset to defaults option appears in three-dots menu
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/grid-reset-functionality.spec.ts:9:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('[data-testid="view-management-menu-trigger"]').first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('[data-testid="view-management-menu-trigger"]').first()

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/grid-reset-functionality.spec.ts:20:31
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
- paragraph: $41,010,825
- img
- paragraph: Average Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $22,070,691
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
    - row "Press Space to toggle row selection (unchecked) [USER-10693] Split monolithic components Todo Medium ♻️ Refactor Daniel Kim Daniel Kim 9/7/2025 14% $775 $109":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[USER-10693] Split monolithic components"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "9/7/2025"
      - gridcell "14%"
      - gridcell "$775"
      - gridcell "$109"
    - row "Press Space to toggle row selection (unchecked) [INFRA-3080] Update API documentation Testing Low 📝 Documentation Amanda White Amanda White 10/10/2025 91% $7,500 $6,825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[INFRA-3080] Update API documentation"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "10/10/2025"
      - gridcell "91%"
      - gridcell "$7,500"
      - gridcell "$6,825"
    - row "Press Space to toggle row selection (unchecked) [INFRA-6241] Test mobile responsiveness (Sprint 26) In Progress Medium 🧪 Testing Michael Anderson Michael Anderson 9/17/2025 31% $4,900 $1,519":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[INFRA-6241] Test mobile responsiveness (Sprint 26)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/17/2025"
      - gridcell "31%"
      - gridcell "$4,900"
      - gridcell "$1,519"
    - row "Press Space to toggle row selection (unchecked) [ADMIN-7644] Add CDN for static assets (Q2 Planning) In Review Critical ⚡ Performance Ryan Thomas Ryan Thomas 9/1/2025 78% $525 $410":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-7644] Add CDN for static assets (Q2 Planning)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/1/2025"
      - gridcell "78%"
      - gridcell "$525"
      - gridcell "$410"
    - row "Press Space to toggle row selection (unchecked) [AUTH-8005] Add drag-and-drop file upload (Sprint 23) Backlog Medium ✨ Feature Daniel Kim Daniel Kim 9/6/2025 0% $4,925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[AUTH-8005] Add drag-and-drop file upload (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$4,925"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [MOBILE-8926] Optimize memory usage (Sprint 23) Testing Critical ⚡ Performance David Lee David Lee 8/31/2025 84% $3,550 $2,982":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-8926] Optimize memory usage (Sprint 23)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/31/2025"
      - gridcell "84%"
      - gridcell "$3,550"
      - gridcell "$2,982"
    - row "Press Space to toggle row selection (unchecked) [WEB-2449] Update API documentation (Performance Sprint) Backlog High 📝 Documentation Emma Davis Emma Davis 9/4/2025 0% $18,450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-2449] Update API documentation (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/4/2025"
      - gridcell "0%"
      - gridcell "$18,450"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [USER-4235] Build custom report generator (Sprint 27) Backlog Low ✨ Feature James Wilson James Wilson 10/2/2025 0% $350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[USER-4235] Build custom report generator (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "10/2/2025"
      - gridcell "0%"
      - gridcell "$350"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [API-4843] Fix infinite scroll pagination bug In Progress Medium 🐛 Bug Marcus Williams Marcus Williams 9/1/2025 28% $2,125 $595":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[API-4843] Fix infinite scroll pagination bug"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/1/2025"
      - gridcell "28%"
      - gridcell "$2,125"
      - gridcell "$595"
    - row "Press Space to toggle row selection (unchecked) [CORE-1246] Create load testing scenarios (Sprint 25) In Review Medium 🧪 Testing Amanda White Amanda White 9/5/2025 79% $19,775 $15,622":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-1246] Create load testing scenarios (Sprint 25)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/5/2025"
      - gridcell "79%"
      - gridcell "$19,775"
      - gridcell "$15,622"
    - row "Press Space to toggle row selection (unchecked) [DATA-1544] Set up vulnerability scanning (Sprint 23) Testing Medium 🔒 Security Emma Davis Emma Davis 9/3/2025 93% $19,675 $18,298":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-1544] Set up vulnerability scanning (Sprint 23)"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/3/2025"
      - gridcell "93%"
      - gridcell "$19,675"
      - gridcell "$18,298"
    - row "Press Space to toggle row selection (unchecked) [AUTH-1875] Create load testing scenarios (Sprint 27) In Progress Critical 🧪 Testing Priya Sharma Priya Sharma 8/29/2025 55% $4,575 $2,516":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[AUTH-1875] Create load testing scenarios (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/29/2025"
      - gridcell "55%"
      - gridcell "$4,575"
      - gridcell "$2,516"
    - row "Press Space to toggle row selection (unchecked) [WEB-2722] Migrate to TypeScript strict mode (Sprint 25) Todo Medium ♻️ Refactor Marcus Williams Marcus Williams 9/6/2025 11% $5,275 $580":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-2722] Migrate to TypeScript strict mode (Sprint 25)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/6/2025"
      - gridcell "11%"
      - gridcell "$5,275"
      - gridcell "$580"
    - row "Press Space to toggle row selection (unchecked) [DASH-3982] Write migration guide for v2 Backlog Critical 📝 Documentation Chris Martinez Chris Martinez 8/30/2025 0% $3,325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-3982] Write migration guide for v2"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$3,325"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [DATA-4202] Create user profile dashboard In Progress Medium ✨ Feature James Wilson James Wilson 9/13/2025 46% $9,875 $4,543":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-4202] Create user profile dashboard"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/13/2025"
      - gridcell "46%"
      - gridcell "$9,875"
      - gridcell "$4,543"
    - row "Press Space to toggle row selection (unchecked) [DATA-5034] Fix date picker timezone issue Blocked Medium 🐛 Bug Emma Davis Emma Davis 9/6/2025 18% $7,650 $1,377":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-5034] Fix date picker timezone issue"
      - gridcell "Blocked"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/6/2025"
      - gridcell "18%"
      - gridcell "$7,650"
      - gridcell "$1,377"
    - row "Press Space to toggle row selection (unchecked) [DATA-6697] Test mobile responsiveness (Sprint 26) In Progress Critical 🧪 Testing Sarah Johnson Sarah Johnson 8/29/2025 23% $5,650 $1,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-6697] Test mobile responsiveness (Sprint 26)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/29/2025"
      - gridcell "23%"
      - gridcell "$5,650"
      - gridcell "$1,300"
    - row "Press Space to toggle row selection (unchecked) [DASH-8340] Add multi-language support (Q2 Planning) Backlog Critical ✨ Feature Amanda White Amanda White 8/29/2025 0% $7,375":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-8340] Add multi-language support (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/29/2025"
      - gridcell "0%"
      - gridcell "$7,375"
      - gridcell
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,010,825 $18,940,134":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,010,825"
      - gridcell "$18,940,134"
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
>  20 |     await expect(menuTrigger).toBeVisible();
      |                               ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
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
   59 |     await lastWeekOption.click();
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
```