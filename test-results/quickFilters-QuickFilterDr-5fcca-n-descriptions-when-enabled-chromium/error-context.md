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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $4,133,025
- img
- paragraph: Progress
- paragraph: 45.5%
- img
- paragraph: Budget Remaining
- paragraph: $2,311,059
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
    - row "39 [API-1039] Create data visualization charts (Performance Sprint) ✨ Feature Medium Chris Martinez Chris Martinez 8/31/2025 $7,950 In Review 70%":
      - gridcell "39"
      - gridcell "[API-1039] Create data visualization charts (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/31/2025"
      - gridcell "$7,950"
      - gridcell "In Review"
      - gridcell "70%"
    - row "452 [BACKEND-1452] Correct CSS overflow in sidebar (Tech Debt) 🐛 Bug Low Marcus Williams Marcus Williams 8/26/2025 $3,650 In Progress 42%":
      - gridcell "452"
      - gridcell "[BACKEND-1452] Correct CSS overflow in sidebar (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/26/2025"
      - gridcell "$3,650"
      - gridcell "In Progress"
      - gridcell "42%"
    - row "684 [AUTH-1684] Debug WebSocket connection timeout (Security Audit) 🐛 Bug Low Kevin Zhang Kevin Zhang 8/21/2025 $8,475 In Progress 52%":
      - gridcell "684"
      - gridcell "[AUTH-1684] Debug WebSocket connection timeout (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/21/2025"
      - gridcell "$8,475"
      - gridcell "In Progress"
      - gridcell "52%"
    - row "956 [INFRA-1956] Optimize bundle size (Q1 Goals) ⚡ Performance Critical Ryan Thomas Ryan Thomas 8/14/2025 $5,000 Backlog 0%":
      - gridcell "956"
      - gridcell "[INFRA-1956] Optimize bundle size (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/14/2025"
      - gridcell "$5,000"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "246 [CORE-1246] Add request batching (Sprint 23) ⚡ Performance Low Emily Jackson Emily Jackson 9/2/2025 $4,200 In Progress 20%":
      - gridcell "246"
      - gridcell "[CORE-1246] Add request batching (Sprint 23)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/2/2025"
      - gridcell "$4,200"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "394 [AUTH-1394] Refactor state management (Q2 Planning) ♻️ Refactor High Alex Chen Alex Chen 8/20/2025 $450 Backlog 0%":
      - gridcell "394"
      - gridcell "[AUTH-1394] Refactor state management (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/20/2025"
      - gridcell "$450"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "118 [ADMIN-1118] Optimize database queries (Performance Sprint) ⚡ Performance High Daniel Kim Daniel Kim 8/12/2025 $14,200 Todo 7%":
      - gridcell "118"
      - gridcell "[ADMIN-1118] Optimize database queries (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/12/2025"
      - gridcell "$14,200"
      - gridcell "Todo"
      - gridcell "7%"
    - row "420 [FRONTEND-1420] Refactor state management ♻️ Refactor High Michael Anderson Michael Anderson 8/15/2025 $5,075 Testing 93%":
      - gridcell "420"
      - gridcell "[FRONTEND-1420] Refactor state management"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/15/2025"
      - gridcell "$5,075"
      - gridcell "Testing"
      - gridcell "93%"
    - row "490 [USER-1490] Debug crash on mobile Safari (Sprint 26) 🐛 Bug Medium Ryan Thomas Ryan Thomas 8/18/2025 $13,375 Todo 11%":
      - gridcell "490"
      - gridcell "[USER-1490] Debug crash on mobile Safari (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/18/2025"
      - gridcell "$13,375"
      - gridcell "Todo"
      - gridcell "11%"
    - row "672 [WEB-1672] Add request batching (Sprint 26) ⚡ Performance High John Robinson John Robinson 8/13/2025 $4,475 Todo 9%":
      - gridcell "672"
      - gridcell "[WEB-1672] Add request batching (Sprint 26)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/13/2025"
      - gridcell "$4,475"
      - gridcell "Todo"
      - gridcell "9%"
    - row "695 [USER-1695] Consolidate duplicate code ♻️ Refactor Medium Priya Sharma Priya Sharma 8/16/2025 $1,600 Testing 92%":
      - gridcell "695"
      - gridcell "[USER-1695] Consolidate duplicate code"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/16/2025"
      - gridcell "$1,600"
      - gridcell "Testing"
      - gridcell "92%"
    - row "841 [DATA-1841] Configure security headers (Security Audit) 🔒 Security Low Sophia Taylor Sophia Taylor 8/26/2025 $4,425 Backlog 0%":
      - gridcell "841"
      - gridcell "[DATA-1841] Configure security headers (Security Audit)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/26/2025"
      - gridcell "$4,425"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "951 [FRONTEND-1951] Document error handling patterns (Q1 Goals) 📝 Documentation Critical Emma Davis Emma Davis 8/11/2025 $1,575 Todo 18%":
      - gridcell "951"
      - gridcell "[FRONTEND-1951] Document error handling patterns (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/11/2025"
      - gridcell "$1,575"
      - gridcell "Todo"
      - gridcell "18%"
    - row "960 [DATA-1960] Optimize database queries ♻️ Refactor Low Emma Davis Emma Davis 9/2/2025 $800 In Progress 48%":
      - gridcell "960"
      - gridcell "[DATA-1960] Optimize database queries"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/2/2025"
      - gridcell "$800"
      - gridcell "In Progress"
      - gridcell "48%"
    - row "566 [WEB-1566] Create load testing scenarios (Tech Debt) 🧪 Testing High Amanda White Amanda White 8/14/2025 $925 Backlog 0%":
      - gridcell "566"
      - gridcell "[WEB-1566] Create load testing scenarios (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/14/2025"
      - gridcell "$925"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "445 [PROJ-1445] Fix broken deep links in navigation (Tech Debt) 🐛 Bug Medium John Robinson John Robinson 8/11/2025 $500 Backlog 0%":
      - gridcell "445"
      - gridcell "[PROJ-1445] Fix broken deep links in navigation (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/11/2025"
      - gridcell "$500"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,133,025 45%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,133,025"
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
- text: Page 1 of 41
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