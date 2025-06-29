# Test info

- Name: QuickFilterDropdown >> should show option descriptions when enabled
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:279:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Quick Filter")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:13:16
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
- paragraph: "61"
- img
- paragraph: Total Budget
- paragraph: $247,100
- img
- paragraph: Progress
- paragraph: 52.5%
- img
- paragraph: Budget Remaining
- paragraph: $127,843
- text: 1 to 25 of 62. Page 1 of 3
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
    - row "38 [BACKEND-1038] Create backup automation (Q1 Goals) 🔧 DevOps Critical Isabella Garcia Isabella Garcia 6/27/2025 $18,875 Blocked 22%":
      - gridcell "38"
      - gridcell "[BACKEND-1038] Create backup automation (Q1 Goals)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/27/2025"
      - gridcell "$18,875"
      - gridcell "Blocked"
      - gridcell "22%"
    - row "297 [DATA-1297] Consolidate duplicate code ♻️ Refactor Critical David Lee David Lee 6/27/2025 $5,225 In Review 66%":
      - gridcell "297"
      - gridcell "[DATA-1297] Consolidate duplicate code"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/27/2025"
      - gridcell "$5,225"
      - gridcell "In Review"
      - gridcell "66%"
    - row "600 [API-1600] Configure health checks (Sprint 26) 🔧 DevOps Critical Michael Anderson Michael Anderson 6/27/2025 $3,950 Backlog 0%":
      - gridcell "600"
      - gridcell "[API-1600] Configure health checks (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/27/2025"
      - gridcell "$3,950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "698 [DATA-1698] Fix broken deep links in navigation (Sprint 23) 🐛 Bug Critical Emma Davis Emma Davis 6/25/2025 $450 In Progress 47%":
      - gridcell "698"
      - gridcell "[DATA-1698] Fix broken deep links in navigation (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/25/2025"
      - gridcell "$450"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "457 [APP-1457] Build analytics dashboard ✨ Feature Critical Emily Jackson Emily Jackson 6/27/2025 $1,825 Todo 7%":
      - gridcell "457"
      - gridcell "[APP-1457] Build analytics dashboard"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/27/2025"
      - gridcell "$1,825"
      - gridcell "Todo"
      - gridcell "7%"
    - row "526 [DASH-1526] Fix broken unit tests in CI pipeline (Performance Sprint) 🐛 Bug Critical Emma Davis Emma Davis 6/25/2025 $200 Done 100%":
      - gridcell "526"
      - gridcell "[DASH-1526] Fix broken unit tests in CI pipeline (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/25/2025"
      - gridcell "$200"
      - gridcell "Done"
      - gridcell "100%"
    - row "735 [PROJ-1735] Write deployment guide 📝 Documentation High Amanda White Amanda White 6/27/2025 $8,900 Blocked 28%":
      - gridcell "735"
      - gridcell "[PROJ-1735] Write deployment guide"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/27/2025"
      - gridcell "$8,900"
      - gridcell "Blocked"
      - gridcell "28%"
    - row "835 [DASH-1835] Correct data corruption in cache layer 🐛 Bug High John Robinson John Robinson 6/26/2025 $4,400 In Progress 26%":
      - gridcell "835"
      - gridcell "[DASH-1835] Correct data corruption in cache layer"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/26/2025"
      - gridcell "$4,400"
      - gridcell "In Progress"
      - gridcell "26%"
    - row "10 [API-1010] Fix infinite scroll pagination bug (Sprint 23) 🐛 Bug High Alex Chen Alex Chen 6/27/2025 $2,600 Blocked 35%":
      - gridcell "10"
      - gridcell "[API-1010] Fix infinite scroll pagination bug (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/27/2025"
      - gridcell "$2,600"
      - gridcell "Blocked"
      - gridcell "35%"
    - row "487 [ADMIN-1487] Create batch operations feature (Q2 Planning) ✨ Feature High John Robinson John Robinson 6/27/2025 $4,950 In Progress 28%":
      - gridcell "487"
      - gridcell "[ADMIN-1487] Create batch operations feature (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/27/2025"
      - gridcell "$4,950"
      - gridcell "In Progress"
      - gridcell "28%"
    - row "871 [BACKEND-1871] Consolidate duplicate code ♻️ Refactor High Sarah Johnson Sarah Johnson 6/26/2025 $4,925 In Progress 48%":
      - gridcell "871"
      - gridcell "[BACKEND-1871] Consolidate duplicate code"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/26/2025"
      - gridcell "$4,925"
      - gridcell "In Progress"
      - gridcell "48%"
    - row "928 [INFRA-1928] Resolve CORS issue with external API (Performance Sprint) 🐛 Bug Critical Sophia Taylor Sophia Taylor 6/24/2025 $250 Blocked 14%":
      - gridcell "928"
      - gridcell "[INFRA-1928] Resolve CORS issue with external API (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/24/2025"
      - gridcell "$250"
      - gridcell "Blocked"
      - gridcell "14%"
    - row "184 [WEB-1184] Write deployment guide (Sprint 23) 📝 Documentation Critical Alex Chen Alex Chen 6/24/2025 $7,750 In Progress 39%":
      - gridcell "184"
      - gridcell "[WEB-1184] Write deployment guide (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/24/2025"
      - gridcell "$7,750"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "265 [BACKEND-1265] Update to React 18 patterns ♻️ Refactor High Amanda White Amanda White 6/26/2025 $9,475 In Review 61%":
      - gridcell "265"
      - gridcell "[BACKEND-1265] Update to React 18 patterns"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/26/2025"
      - gridcell "$9,475"
      - gridcell "In Review"
      - gridcell "61%"
    - row "493 [MOBILE-1493] Resolve memory leak in data grid (Q2 Planning) 🐛 Bug High Sarah Johnson Sarah Johnson 6/25/2025 $900 Blocked 13%":
      - gridcell "493"
      - gridcell "[MOBILE-1493] Resolve memory leak in data grid (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/25/2025"
      - gridcell "$900"
      - gridcell "Blocked"
      - gridcell "13%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$247,100 53%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$247,100"
      - gridcell
      - gridcell "53%"
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
- text: Page 1 of 3
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("QuickFilterDropdown", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page that has QuickFilterDropdown
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for grid to be ready
   9 |     await page.waitForSelector(".ag-root-wrapper");
   10 |     await page.waitForTimeout(1000); // Give time for data to load
   11 |
   12 |     // Click on Quick Filter tab to show the quick filter dropdowns
>  13 |     await page.click('button:has-text("Quick Filter")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
   14 |     await page.waitForTimeout(500); // Wait for tab content to render
   15 |
   16 |     // Wait for QuickFilterDropdown to be visible
   17 |     await page.waitForSelector('[data-testid="quick-filter-dropdown"]', {
   18 |       timeout: 10000,
   19 |     });
   20 |   });
   21 |
   22 |   test("should display quick filter dropdown button", async ({ page }) => {
   23 |     // Get the first dropdown (Date Filters)
   24 |     const dropdown = await page
   25 |       .locator('[data-testid="quick-filter-dropdown"]')
   26 |       .first();
   27 |     await expect(dropdown).toBeVisible();
   28 |
   29 |     // Check the trigger button (not the option buttons)
   30 |     const triggerButton = await dropdown.locator(
   31 |       'button[aria-haspopup="listbox"]',
   32 |     );
   33 |     await expect(triggerButton).toBeVisible();
   34 |
   35 |     // The button might show "All Data" if that's the default selection
   36 |     const buttonText = await triggerButton.textContent();
   37 |     expect(buttonText?.length).toBeGreaterThan(0);
   38 |   });
   39 |
   40 |   test("should open dropdown and show filter options", async ({ page }) => {
   41 |     // Click the first dropdown button (Date Filters)
   42 |     await page
   43 |       .locator('[data-testid="quick-filter-dropdown"]')
   44 |       .first()
   45 |       .locator("button")
   46 |       .click();
   47 |
   48 |     // Wait for dropdown menu to appear
   49 |     await page.waitForSelector('[role="listbox"]');
   50 |
   51 |     // Verify filter options are visible
   52 |     const options = await page.locator('[role="option"]').count();
   53 |     expect(options).toBeGreaterThan(0);
   54 |
   55 |     // Check for specific options
   56 |     await expect(
   57 |       page.locator('[role="option"]:has-text("Today")'),
   58 |     ).toBeVisible();
   59 |     await expect(
   60 |       page.locator('[role="option"]:has-text("This Week")'),
   61 |     ).toBeVisible();
   62 |     await expect(
   63 |       page.locator('[role="option"]:has-text("Last 7 Days")'),
   64 |     ).toBeVisible();
   65 |   });
   66 |
   67 |   test("should apply 'Today' filter to grid", async ({ page }) => {
   68 |     // Get initial row count
   69 |     const initialRows = await page
   70 |       .locator(".ag-center-cols-container .ag-row")
   71 |       .count();
   72 |     console.log("Initial row count:", initialRows);
   73 |     expect(initialRows).toBeGreaterThan(0);
   74 |
   75 |     // Check if dropdown is already open, if not open it
   76 |     const dropdownOpen = await page
   77 |       .locator('[role="listbox"]')
   78 |       .isVisible()
   79 |       .catch(() => false);
   80 |     if (!dropdownOpen) {
   81 |       await page
   82 |         .locator('[data-testid="quick-filter-dropdown"]')
   83 |         .first()
   84 |         .locator('button[aria-haspopup="listbox"]')
   85 |         .click();
   86 |     }
   87 |
   88 |     // Select "All Dates" first to clear any filter
   89 |     await page.click('[role="option"]:has-text("All Dates")');
   90 |
   91 |     // Wait for grid to update
   92 |     await page.waitForTimeout(1000);
   93 |
   94 |     // Verify filter was applied by checking row count changed
   95 |     const filteredRows = await page
   96 |       .locator(".ag-center-cols-container .ag-row")
   97 |       .count();
   98 |     console.log("Filtered row count:", filteredRows);
   99 |
  100 |     // The filter should have changed the row count
  101 |     expect(filteredRows).not.toBe(initialRows);
  102 |
  103 |     // Verify the column header shows filter indicator
  104 |     await expect(
  105 |       page.locator('[col-id="dueDate"] .ag-header-cell-filtered'),
  106 |     ).toBeVisible();
  107 |
  108 |     // Verify dropdown shows selected option
  109 |     const buttonText = await page
  110 |       .locator('[data-testid="quick-filter-dropdown"]')
  111 |       .first()
  112 |       .locator("button")
  113 |       .textContent();
```