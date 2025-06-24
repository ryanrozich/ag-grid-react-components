# Test info

- Name: QuickFilterDropdown >> should open dropdown and show filter options
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:40:3

# Error details

```
Error: locator.click: Error: strict mode violation: locator('[data-testid="quick-filter-dropdown"]').first().locator('button') resolved to 5 elements:
    1) <button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" aria-controls="quick-filter-dropdown" class="_trigger_12ns2_8 _triggerActive_12ns2_37">…</button> aka locator('button').filter({ hasText: /^All Data$/ })
    2) <button type="button" role="option" aria-selected="true" class="_option_12ns2_132 _optionSelected_12ns2_167 ">…</button> aka getByText('🌍All DataShow all records')
    3) <button type="button" role="option" aria-selected="false" class="_option_12ns2_132  ">…</button> aka getByText('📅Last 7 DaysRecords from the')
    4) <button type="button" role="option" aria-selected="false" class="_option_12ns2_132  ">…</button> aka getByText('📆This MonthAll records from')
    5) <button type="button" role="option" aria-selected="false" class="_option_12ns2_132  ">…</button> aka getByText('🔮Future DatesUpcoming')

Call log:
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:46:8
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
- button "Date Filter"
- button "Quick Filter"
- button "URL State"
- heading "Quick Filter Dropdown Link to Quick Filter Dropdown" [level=2]:
  - text: Quick Filter Dropdown
  - link "Link to Quick Filter Dropdown":
    - /url: "#quick-filter-dropdown-info"
    - img
- paragraph: Apply predefined filters with a single click. Works with any column type.
- heading "Date Filters Link to Date Filters" [level=3]:
  - text: Date Filters
  - link "Link to Date Filters":
    - /url: "#date-filters-demo"
    - img
- button "Quick filter options":
  - text: All Data
  - img
- heading "Combined Filters Link to Combined Filters" [level=3]:
  - text: Combined Filters
  - link "Link to Combined Filters":
    - /url: "#combined-filters-demo"
    - img
- button "Quick filter options":
  - text: High Value Recent
  - img
- heading "Features Link to Features" [level=3]:
  - text: Features
  - link "Link to Features":
    - /url: "#quick-filter-features"
    - img
- list:
  - listitem: ✓ Works with any AG Grid column type
  - listitem: ✓ Combine multiple filters in one action
  - listitem: ✓ Keyboard navigation support
  - listitem: ✓ Customizable icons and descriptions
- heading "Live Demo Grid Link to Live Demo Grid" [level=2]:
  - text: Live Demo Grid
  - link "Link to Live Demo Grid":
    - /url: "#live-demo-grid"
    - img
- paragraph: Use the dropdowns above to quickly filter the data
- text: 1 to 15 of 1,001. Page 1 of 67
- grid:
  - rowgroup:
    - row "ID Name Category Priority Assignee Due Date Amount Status % Delivered $ Delivered":
      - columnheader "ID"
      - columnheader "Name"
      - columnheader "Category"
      - columnheader "Priority"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "Amount"
      - columnheader "Status"
      - columnheader "% Delivered"
      - columnheader "$ Delivered"
    - row "Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu":
      - gridcell "Open Filter Menu":
        - spinbutton "ID Filter Input"
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "Name Filter Input"
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "Category Filter Input" [disabled]
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "Priority Filter Input" [disabled]
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "Assignee Filter Input"
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "Due Date Filter Input" [disabled]
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - spinbutton "Amount Filter Input"
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "Status Filter Input" [disabled]
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "% Delivered Filter Input" [disabled]
        - button "Open Filter Menu": 
      - gridcell "Open Filter Menu":
        - textbox "$ Delivered Filter Input" [disabled]
        - button "Open Filter Menu": 
  - rowgroup:
    - row "67 [BACKEND-1067] Update README with examples (Q1 Goals) 📝 Documentation Critical Jessica Lopez Jessica Lopez 8/9/2025 $525 Testing 88% $462":
      - gridcell "67"
      - gridcell "[BACKEND-1067] Update README with examples (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/9/2025"
      - gridcell "$525"
      - gridcell "Testing"
      - gridcell "88%"
      - gridcell "$462"
    - row "529 [APP-1529] Document component props (Q1 Goals) 📝 Documentation Low Michael Anderson Michael Anderson 9/10/2025 $75 Backlog 0% $0":
      - gridcell "529"
      - gridcell "[APP-1529] Document component props (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/10/2025"
      - gridcell "$75"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "764 [MOBILE-1764] Update API documentation (Q1 Goals) 📝 Documentation Critical Emma Davis Emma Davis 8/8/2025 $2,600 In Review 60% $1,560":
      - gridcell "764"
      - gridcell "[MOBILE-1764] Update API documentation (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/8/2025"
      - gridcell "$2,600"
      - gridcell "In Review"
      - gridcell "60%"
      - gridcell "$1,560"
    - row "321 [UI-1321] Implement two-factor authentication (Sprint 23) ✨ Feature Critical Jessica Lopez Jessica Lopez 8/7/2025 $350 In Review 62% $217":
      - gridcell "321"
      - gridcell "[UI-1321] Implement two-factor authentication (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/7/2025"
      - gridcell "$350"
      - gridcell "In Review"
      - gridcell "62%"
      - gridcell "$217"
    - row "689 [PROJ-1689] Refactor authentication flow (Q2 Planning) ♻️ Refactor Critical Jessica Lopez Jessica Lopez 8/5/2025 $6,900 Backlog 0% $0":
      - gridcell "689"
      - gridcell "[PROJ-1689] Refactor authentication flow (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/5/2025"
      - gridcell "$6,900"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "113 [FRONTEND-1113] Test error boundary behavior 🧪 Testing High Priya Sharma Priya Sharma 8/6/2025 $975 In Progress 29% $283":
      - gridcell "113"
      - gridcell "[FRONTEND-1113] Test error boundary behavior"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/6/2025"
      - gridcell "$975"
      - gridcell "In Progress"
      - gridcell "29%"
      - gridcell "$283"
    - row "471 [MOBILE-1471] Update to React 18 patterns (Performance Sprint) ♻️ Refactor Medium Michael Anderson Michael Anderson 8/23/2025 $225 Backlog 0% $0":
      - gridcell "471"
      - gridcell "[MOBILE-1471] Update to React 18 patterns (Performance Sprint)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/23/2025"
      - gridcell "$225"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "660 [DATA-1660] Add keyboard shortcuts (Sprint 23) ✨ Feature Critical Emma Davis Emma Davis 8/6/2025 $925 Todo 6% $56":
      - gridcell "660"
      - gridcell "[DATA-1660] Add keyboard shortcuts (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/6/2025"
      - gridcell "$925"
      - gridcell "Todo"
      - gridcell "6%"
      - gridcell "$56"
    - row "70 [AUTH-1070] Update to ES6 modules ♻️ Refactor Critical Alex Chen Alex Chen 8/5/2025 $5,950 Todo 16% $952":
      - gridcell "70"
      - gridcell "[AUTH-1070] Update to ES6 modules"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/5/2025"
      - gridcell "$5,950"
      - gridcell "Todo"
      - gridcell "16%"
      - gridcell "$952"
    - row "889 [BACKEND-1889] Create video tutorials (Tech Debt) 📝 Documentation Medium Chris Martinez Chris Martinez 8/14/2025 $175 In Review 77% $135":
      - gridcell "889"
      - gridcell "[BACKEND-1889] Create video tutorials (Tech Debt)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/14/2025"
      - gridcell "$175"
      - gridcell "In Review"
      - gridcell "77%"
      - gridcell "$135"
    - row "931 [APP-1931] Configure Docker containers (Sprint 25) 🔧 DevOps Low Kevin Zhang Kevin Zhang 8/21/2025 $6,475 Backlog 0% $0":
      - gridcell "931"
      - gridcell "[APP-1931] Configure Docker containers (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/21/2025"
      - gridcell "$6,475"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "711 [PROJ-1711] Refactor authentication flow (Sprint 27) ♻️ Refactor Critical Emma Davis Emma Davis 8/1/2025 $650 In Review 74% $481":
      - gridcell "711"
      - gridcell "[PROJ-1711] Refactor authentication flow (Sprint 27)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/1/2025"
      - gridcell "$650"
      - gridcell "In Review"
      - gridcell "74%"
      - gridcell "$481"
    - row "599 [API-1599] Modernize legacy jQuery code (Sprint 24) ♻️ Refactor High Chris Martinez Chris Martinez 8/3/2025 $500 Backlog 0% $0":
      - gridcell "599"
      - gridcell "[API-1599] Modernize legacy jQuery code (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/3/2025"
      - gridcell "$500"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "125 [WEB-1125] Write accessibility tests 🧪 Testing High John Robinson John Robinson 8/2/2025 $325 Todo 15% $49":
      - gridcell "125"
      - gridcell "[WEB-1125] Write accessibility tests"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/2/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "15%"
      - gridcell "$49"
    - row "251 [BACKEND-1251] Implement blue-green deployment (Sprint 23) 🔧 DevOps Medium Amanda White Amanda White 8/4/2025 $475 In Progress 35% $166":
      - gridcell "251"
      - gridcell "[BACKEND-1251] Implement blue-green deployment (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/4/2025"
      - gridcell "$475"
      - gridcell "In Progress"
      - gridcell "35%"
      - gridcell "$166"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,934,450 45% $1,804,111":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,934,450"
      - gridcell
      - gridcell "45%"
      - gridcell "$1,804,111"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status
- status
- status
- text: "Page Size:"
- combobox "Page Size": "15"
- button "First Page" [disabled]: 
- button "Previous Page" [disabled]: 
- text: Page 1 of 67
- button "Next Page": 
- button "Last Page": 
- contentinfo:
  - heading "AG Grid React Components" [level=3]
  - paragraph: Enterprise-ready date filtering components for AG Grid. Released under the MIT License.
  - heading "Resources" [level=3]
  - list:
    - listitem:
      - link "GitHub Repository":
        - /url: https://github.com/ryanrozich/ag-grid-react-components
    - listitem:
      - link "NPM Package":
        - /url: https://www.npmjs.com/package/ag-grid-react-components
    - listitem:
      - link "AG Grid Documentation":
        - /url: https://www.ag-grid.com/react-data-grid/
  - heading "Legal" [level=3]
  - paragraph: This project is not affiliated with AG Grid Ltd.
  - paragraph: Use at your own risk. No warranty provided.
  - paragraph: © 2025 Ryan Rozich. All rights reserved.
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
   13 |     await page.click('button:has-text("Quick Filter")');
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
>  46 |       .click();
      |        ^ Error: locator.click: Error: strict mode violation: locator('[data-testid="quick-filter-dropdown"]').first().locator('button') resolved to 5 elements:
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
  114 |     expect(buttonText).toContain("Last 7 Days");
  115 |   });
  116 |
  117 |   test("should apply 'This Week' date range filter", async ({ page }) => {
  118 |     // Open dropdown and select "This Week"
  119 |     await page.click('[data-testid="quick-filter-dropdown"] button');
  120 |     await page.click('[role="option"]:has-text("This Week")');
  121 |
  122 |     // Wait for grid to update
  123 |     await page.waitForTimeout(500);
  124 |
  125 |     // Get all date values from filtered rows
  126 |     const dates = await page.evaluate(() => {
  127 |       const rows = Array.from(
  128 |         document.querySelectorAll(".ag-center-cols-container .ag-row"),
  129 |       );
  130 |       return rows.map((row) => {
  131 |         const dateCell = row.querySelector('[col-id="dueDate"]');
  132 |         return dateCell ? dateCell.textContent : "";
  133 |       });
  134 |     });
  135 |
  136 |     // Verify all dates are within this week
  137 |     const today = new Date();
  138 |     const startOfWeek = new Date(today);
  139 |     startOfWeek.setDate(today.getDate() - 6); // Last 7 days
  140 |     const endOfWeek = new Date(today);
  141 |     endOfWeek.setDate(today.getDate() + 1); // Include today
  142 |
  143 |     dates.forEach((dateStr) => {
  144 |       if (dateStr) {
  145 |         const date = new Date(dateStr);
  146 |         expect(date >= startOfWeek).toBeTruthy();
```