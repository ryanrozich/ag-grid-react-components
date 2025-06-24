# Test info

- Name: QuickFilterDropdown >> should apply 'Today' filter to grid
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:67:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="option"]:has-text("All Dates")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:89:16
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
- button "Quick filter options" [expanded]:
  - text: All Data
  - img
- listbox "Quick filter options":
  - option "🌍 All Data Show all records" [selected]
  - option "📅 Last 7 Days Records from the past week"
  - option "📆 This Month All records from current month"
  - option "🔮 Future Dates Upcoming records only"
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
    - row "693 [CORE-1693] Correct data corruption in cache layer 🐛 Bug Low John Robinson John Robinson 8/24/2025 $325 In Review 75% $244":
      - gridcell "693"
      - gridcell "[CORE-1693] Correct data corruption in cache layer"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/24/2025"
      - gridcell "$325"
      - gridcell "In Review"
      - gridcell "75%"
      - gridcell "$244"
    - row "502 [INFRA-1502] Implement blue-green deployment (Security Audit) 🔧 DevOps High Marcus Williams Marcus Williams 8/17/2025 $800 Todo 14% $112":
      - gridcell "502"
      - gridcell "[INFRA-1502] Implement blue-green deployment (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/17/2025"
      - gridcell "$800"
      - gridcell "Todo"
      - gridcell "14%"
      - gridcell "$112"
    - row "986 [WEB-1986] Implement CSRF protection (Q2 Planning) 🔒 Security Low Jessica Lopez Jessica Lopez 8/22/2025 $2,525 In Progress 49% $1,237":
      - gridcell "986"
      - gridcell "[WEB-1986] Implement CSRF protection (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/22/2025"
      - gridcell "$2,525"
      - gridcell "In Progress"
      - gridcell "49%"
      - gridcell "$1,237"
    - row "6 [BACKEND-1006] Document new filter components 📝 Documentation High Daniel Kim Daniel Kim 8/8/2025 $400 Backlog 0% $0":
      - gridcell "6"
      - gridcell "[BACKEND-1006] Document new filter components"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/8/2025"
      - gridcell "$400"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "886 [DASH-1886] Refactor state management (Security Audit) ♻️ Refactor Critical Emma Davis Emma Davis 8/8/2025 $2,150 In Progress 37% $796":
      - gridcell "886"
      - gridcell "[DASH-1886] Refactor state management (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/8/2025"
      - gridcell "$2,150"
      - gridcell "In Progress"
      - gridcell "37%"
      - gridcell "$796"
    - row "752 [MOBILE-1752] Write API contract tests (Sprint 26) 🧪 Testing Medium Maya Patel Maya Patel 8/24/2025 $9,950 Todo 15% $1,493":
      - gridcell "752"
      - gridcell "[MOBILE-1752] Write API contract tests (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/24/2025"
      - gridcell "$9,950"
      - gridcell "Todo"
      - gridcell "15%"
      - gridcell "$1,493"
    - row "338 [INFRA-1338] Implement social media sharing (Sprint 26) ✨ Feature Critical Ryan Thomas Ryan Thomas 8/5/2025 $4,400 Backlog 0% $0":
      - gridcell "338"
      - gridcell "[INFRA-1338] Implement social media sharing (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/5/2025"
      - gridcell "$4,400"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "55 [APP-1055] Fix broken unit tests in CI pipeline (Q1 Goals) 🐛 Bug Low Priya Sharma Priya Sharma 8/19/2025 $325 Todo 10% $33":
      - gridcell "55"
      - gridcell "[APP-1055] Fix broken unit tests in CI pipeline (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/19/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "10%"
      - gridcell "$33"
    - row "919 [FRONTEND-1919] Update README with examples (Sprint 27) 📝 Documentation Critical Michael Anderson Michael Anderson 8/5/2025 $14,025 In Progress 21% $2,945":
      - gridcell "919"
      - gridcell "[FRONTEND-1919] Update README with examples (Sprint 27)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/5/2025"
      - gridcell "$14,025"
      - gridcell "In Progress"
      - gridcell "21%"
      - gridcell "$2,945"
    - row "601 [INFRA-1601] Optimize bundle size ⚡ Performance Low Alex Chen Alex Chen 8/24/2025 $900 In Review 71% $639":
      - gridcell "601"
      - gridcell "[INFRA-1601] Optimize bundle size"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/24/2025"
      - gridcell "$900"
      - gridcell "In Review"
      - gridcell "71%"
      - gridcell "$639"
    - row "761 [FRONTEND-1761] Optimize database queries ♻️ Refactor Medium Chris Martinez Chris Martinez 8/11/2025 $15,925 Todo 18% $2,867":
      - gridcell "761"
      - gridcell "[FRONTEND-1761] Optimize database queries"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/11/2025"
      - gridcell "$15,925"
      - gridcell "Todo"
      - gridcell "18%"
      - gridcell "$2,867"
    - row "954 [WEB-1954] Implement blue-green deployment (Sprint 27) 🔧 DevOps Critical Olivia Brown Olivia Brown 8/4/2025 $6,000 Testing 87% $5,220":
      - gridcell "954"
      - gridcell "[WEB-1954] Implement blue-green deployment (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/4/2025"
      - gridcell "$6,000"
      - gridcell "Testing"
      - gridcell "87%"
      - gridcell "$5,220"
    - row "431 [INFRA-1431] Debug crash on mobile Safari (Sprint 26) 🐛 Bug Critical Emily Jackson Emily Jackson 8/1/2025 $200 Backlog 0% $0":
      - gridcell "431"
      - gridcell "[INFRA-1431] Debug crash on mobile Safari (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/1/2025"
      - gridcell "$200"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "710 [APP-1710] Implement session management (Sprint 27) 🔒 Security High Olivia Brown Olivia Brown 8/1/2025 $525 In Progress 45% $236":
      - gridcell "710"
      - gridcell "[APP-1710] Implement session management (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/1/2025"
      - gridcell "$525"
      - gridcell "In Progress"
      - gridcell "45%"
      - gridcell "$236"
    - row "742 [BACKEND-1742] Implement lazy loading (Sprint 25) ⚡ Performance Critical Maya Patel Maya Patel 8/2/2025 $1,275 Backlog 0% $0":
      - gridcell "742"
      - gridcell "[BACKEND-1742] Implement lazy loading (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/2/2025"
      - gridcell "$1,275"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,285,200 44% $1,859,342":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,285,200"
      - gridcell
      - gridcell "44%"
      - gridcell "$1,859,342"
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
>  89 |     await page.click('[role="option"]:has-text("All Dates")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
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
  147 |         expect(date <= endOfWeek).toBeTruthy();
  148 |       }
  149 |     });
  150 |   });
  151 |
  152 |   test("should clear filter when selecting 'All Dates'", async ({ page }) => {
  153 |     // First apply a filter
  154 |     await page.click('[data-testid="quick-filter-dropdown"] button');
  155 |     await page.click('[role="option"]:has-text("Today")');
  156 |     await page.waitForTimeout(500);
  157 |
  158 |     // Get filtered row count
  159 |     const filteredRows = await page
  160 |       .locator(".ag-center-cols-container .ag-row")
  161 |       .count();
  162 |
  163 |     // Now select "All Dates"
  164 |     await page.click('[data-testid="quick-filter-dropdown"] button');
  165 |     await page.click('[role="option"]:has-text("All Dates")');
  166 |     await page.waitForTimeout(500);
  167 |
  168 |     // Verify all rows are shown again
  169 |     const allRows = await page
  170 |       .locator(".ag-center-cols-container .ag-row")
  171 |       .count();
  172 |     expect(allRows).toBeGreaterThan(filteredRows);
  173 |
  174 |     // Verify dropdown shows placeholder again
  175 |     const buttonText = await page
  176 |       .locator('[data-testid="quick-filter-dropdown"] button')
  177 |       .textContent();
  178 |     expect(buttonText).toContain("Quick date filters");
  179 |   });
  180 |
  181 |   test("should persist selected filter when navigating grid", async ({
  182 |     page,
  183 |   }) => {
  184 |     // Apply a filter
  185 |     await page.click('[data-testid="quick-filter-dropdown"] button');
  186 |     await page.click('[role="option"]:has-text("Last 30 Days")');
  187 |     await page.waitForTimeout(500);
  188 |
  189 |     // Enable pagination if available
```