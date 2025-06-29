# Test info

- Name: QuickFilterDropdown >> should apply 'This Week' date range filter
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:117:3

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
- paragraph: "55"
- img
- paragraph: Total Budget
- paragraph: $206,375
- img
- paragraph: Progress
- paragraph: 50.7%
- img
- paragraph: Budget Remaining
- paragraph: $91,927
- text: 1 to 25 of 56. Page 1 of 3
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
    - row "434 [DATA-1434] Create advanced search filters (Q1 Goals) ✨ Feature Critical John Robinson John Robinson 6/27/2025 $525 Done 100%":
      - gridcell "434"
      - gridcell "[DATA-1434] Create advanced search filters (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/27/2025"
      - gridcell "$525"
      - gridcell "Done"
      - gridcell "100%"
    - row "632 [USER-1632] Fix broken unit tests in CI pipeline (Sprint 24) 🐛 Bug High David Lee David Lee 6/27/2025 $450 In Progress 50%":
      - gridcell "632"
      - gridcell "[USER-1632] Fix broken unit tests in CI pipeline (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/27/2025"
      - gridcell "$450"
      - gridcell "In Progress"
      - gridcell "50%"
    - row "211 [WEB-1211] Implement CSRF protection (Tech Debt) 🔒 Security High Emily Jackson Emily Jackson 6/27/2025 $825 Backlog 0%":
      - gridcell "211"
      - gridcell "[WEB-1211] Implement CSRF protection (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/27/2025"
      - gridcell "$825"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "311 [BACKEND-1311] Write migration guide for v2 (Sprint 25) 📝 Documentation Critical Chris Martinez Chris Martinez 6/25/2025 $4,025 In Review 73%":
      - gridcell "311"
      - gridcell "[BACKEND-1311] Write migration guide for v2 (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/25/2025"
      - gridcell "$4,025"
      - gridcell "In Review"
      - gridcell "73%"
    - row "22 [WEB-1022] Refactor state management (Tech Debt) ♻️ Refactor Critical Marcus Williams Marcus Williams 6/26/2025 $625 Blocked 37%":
      - gridcell "22"
      - gridcell "[WEB-1022] Refactor state management (Tech Debt)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/26/2025"
      - gridcell "$625"
      - gridcell "Blocked"
      - gridcell "37%"
    - row "271 [CORE-1271] Fix infinite scroll pagination bug 🐛 Bug High John Robinson John Robinson 6/25/2025 $375 In Progress 56%":
      - gridcell "271"
      - gridcell "[CORE-1271] Fix infinite scroll pagination bug"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/25/2025"
      - gridcell "$375"
      - gridcell "In Progress"
      - gridcell "56%"
    - row "644 [WEB-1644] Add drag-and-drop file upload (Sprint 24) ✨ Feature Critical Ryan Thomas Ryan Thomas 6/24/2025 $725 Done 100%":
      - gridcell "644"
      - gridcell "[WEB-1644] Add drag-and-drop file upload (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/24/2025"
      - gridcell "$725"
      - gridcell "Done"
      - gridcell "100%"
    - row "830 [DASH-1830] Write deployment guide 📝 Documentation Critical Sophia Taylor Sophia Taylor 6/25/2025 $5,325 In Progress 50%":
      - gridcell "830"
      - gridcell "[DASH-1830] Write deployment guide"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/25/2025"
      - gridcell "$5,325"
      - gridcell "In Progress"
      - gridcell "50%"
    - row "1 [DATA-1001] Update API documentation (Sprint 23) 📝 Documentation Critical Ryan Thomas Ryan Thomas 6/25/2025 $425 In Progress 54%":
      - gridcell "1"
      - gridcell "[DATA-1001] Update API documentation (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/25/2025"
      - gridcell "$425"
      - gridcell "In Progress"
      - gridcell "54%"
    - row "447 [CORE-1447] Resolve race condition in state update (Sprint 25) 🐛 Bug Medium Ryan Thomas Ryan Thomas 6/27/2025 $1,300 In Progress 48%":
      - gridcell "447"
      - gridcell "[CORE-1447] Resolve race condition in state update (Sprint 25)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/27/2025"
      - gridcell "$1,300"
      - gridcell "In Progress"
      - gridcell "48%"
    - row "554 [USER-1554] Resolve race condition in state update (Sprint 25) 🐛 Bug High Alex Chen Alex Chen 6/25/2025 $750 In Progress 36%":
      - gridcell "554"
      - gridcell "[USER-1554] Resolve race condition in state update (Sprint 25)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/25/2025"
      - gridcell "$750"
      - gridcell "In Progress"
      - gridcell "36%"
    - row "680 [INFRA-1680] Write performance optimization tips (Q2 Planning) 📝 Documentation Critical John Robinson John Robinson 6/25/2025 $3,500 Blocked 27%":
      - gridcell "680"
      - gridcell "[INFRA-1680] Write performance optimization tips (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/25/2025"
      - gridcell "$3,500"
      - gridcell "Blocked"
      - gridcell "27%"
    - row "28 [DATA-1028] Implement OAuth integration ✨ Feature High Marcus Williams Marcus Williams 6/24/2025 $550 In Progress 37%":
      - gridcell "28"
      - gridcell "[DATA-1028] Implement OAuth integration"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/24/2025"
      - gridcell "$550"
      - gridcell "In Progress"
      - gridcell "37%"
    - row "185 [CORE-1185] Extract shared utilities module (Q2 Planning) ♻️ Refactor High Marcus Williams Marcus Williams 6/27/2025 $7,025 Done 100%":
      - gridcell "185"
      - gridcell "[CORE-1185] Extract shared utilities module (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/27/2025"
      - gridcell "$7,025"
      - gridcell "Done"
      - gridcell "100%"
    - row "573 [DASH-1573] Create troubleshooting guide (Sprint 23) 📝 Documentation High Sophia Taylor Sophia Taylor 6/27/2025 $4,275 In Progress 54%":
      - gridcell "573"
      - gridcell "[DASH-1573] Create troubleshooting guide (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/27/2025"
      - gridcell "$4,275"
      - gridcell "In Progress"
      - gridcell "54%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$206,375 51%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$206,375"
      - gridcell
      - gridcell "51%"
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