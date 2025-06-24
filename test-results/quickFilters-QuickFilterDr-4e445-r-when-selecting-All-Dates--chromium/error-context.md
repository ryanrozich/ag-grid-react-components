# Test info

- Name: QuickFilterDropdown >> should clear filter when selecting 'All Dates'
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:152:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="option"]:has-text("Today")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:155:16
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
    - row "538 [WEB-1538] Document security protocols (Security Audit) 📝 Documentation Medium Sophia Taylor Sophia Taylor 8/26/2025 $4,350 Backlog 0% $0":
      - gridcell "538"
      - gridcell "[WEB-1538] Document security protocols (Security Audit)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/26/2025"
      - gridcell "$4,350"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "759 [DATA-1759] Update to ES6 modules (Sprint 23) ♻️ Refactor High Jessica Lopez Jessica Lopez 8/10/2025 $850 Todo 6% $51":
      - gridcell "759"
      - gridcell "[DATA-1759] Update to ES6 modules (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/10/2025"
      - gridcell "$850"
      - gridcell "Todo"
      - gridcell "6%"
      - gridcell "$51"
    - row "543 [CORE-1543] Write accessibility tests (Sprint 23) 🧪 Testing Critical Chris Martinez Chris Martinez 8/7/2025 $5,100 In Progress 54% $2,754":
      - gridcell "543"
      - gridcell "[CORE-1543] Write accessibility tests (Sprint 23)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/7/2025"
      - gridcell "$5,100"
      - gridcell "In Progress"
      - gridcell "54%"
      - gridcell "$2,754"
    - row "321 [PROJ-1321] Implement auto-scaling 🔧 DevOps Low Sophia Taylor Sophia Taylor 8/21/2025 $7,725 In Review 79% $6,103":
      - gridcell "321"
      - gridcell "[PROJ-1321] Implement auto-scaling"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/21/2025"
      - gridcell "$7,725"
      - gridcell "In Review"
      - gridcell "79%"
      - gridcell "$6,103"
    - row "387 [CORE-1387] Create backup automation (Sprint 24) 🔧 DevOps Low David Lee David Lee 9/3/2025 $150 In Review 61% $92":
      - gridcell "387"
      - gridcell "[CORE-1387] Create backup automation (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/3/2025"
      - gridcell "$150"
      - gridcell "In Review"
      - gridcell "61%"
      - gridcell "$92"
    - row "914 [BACKEND-1914] Extract business logic layer (Sprint 23) ♻️ Refactor Medium Daniel Kim Daniel Kim 8/19/2025 $13,225 In Review 63% $8,332":
      - gridcell "914"
      - gridcell "[BACKEND-1914] Extract business logic layer (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/19/2025"
      - gridcell "$13,225"
      - gridcell "In Review"
      - gridcell "63%"
      - gridcell "$8,332"
    - row "113 [AUTH-1113] Set up staging environment (Security Audit) 🔧 DevOps Medium Sophia Taylor Sophia Taylor 8/14/2025 $225 In Progress 47% $106":
      - gridcell "113"
      - gridcell "[AUTH-1113] Set up staging environment (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/14/2025"
      - gridcell "$225"
      - gridcell "In Progress"
      - gridcell "47%"
      - gridcell "$106"
    - row "657 [MOBILE-1657] Configure Docker containers (Q1 Goals) 🔧 DevOps Low David Lee David Lee 8/23/2025 $4,725 Testing 80% $3,780":
      - gridcell "657"
      - gridcell "[MOBILE-1657] Configure Docker containers (Q1 Goals)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/23/2025"
      - gridcell "$4,725"
      - gridcell "Testing"
      - gridcell "80%"
      - gridcell "$3,780"
    - row "213 [APP-1213] Add request batching ⚡ Performance Low Olivia Brown Olivia Brown 8/17/2025 $4,150 Testing 94% $3,901":
      - gridcell "213"
      - gridcell "[APP-1213] Add request batching"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/17/2025"
      - gridcell "$4,150"
      - gridcell "Testing"
      - gridcell "94%"
      - gridcell "$3,901"
    - row "488 [CORE-1488] Set up infrastructure as code 🔧 DevOps Medium Sarah Johnson Sarah Johnson 8/10/2025 $3,900 Testing 81% $3,159":
      - gridcell "488"
      - gridcell "[CORE-1488] Set up infrastructure as code"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/10/2025"
      - gridcell "$3,900"
      - gridcell "Testing"
      - gridcell "81%"
      - gridcell "$3,159"
    - row "670 [UI-1670] Build analytics dashboard (Tech Debt) ✨ Feature Critical Priya Sharma Priya Sharma 8/1/2025 $1,150 Backlog 0% $0":
      - gridcell "670"
      - gridcell "[UI-1670] Build analytics dashboard (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/1/2025"
      - gridcell "$1,150"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "783 [PROJ-1783] Fix broken unit tests in CI pipeline (Performance Sprint) 🐛 Bug Medium Sophia Taylor Sophia Taylor 8/5/2025 $350 Blocked 15% $53":
      - gridcell "783"
      - gridcell "[PROJ-1783] Fix broken unit tests in CI pipeline (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/5/2025"
      - gridcell "$350"
      - gridcell "Blocked"
      - gridcell "15%"
      - gridcell "$53"
    - row "73 [DASH-1073] Modernize legacy jQuery code ♻️ Refactor High Ryan Thomas Ryan Thomas 8/1/2025 $5,025 Backlog 0% $0":
      - gridcell "73"
      - gridcell "[DASH-1073] Modernize legacy jQuery code"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/1/2025"
      - gridcell "$5,025"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "75 [DATA-1075] Handle null pointer exception in API client 🐛 Bug Low Priya Sharma Priya Sharma 8/3/2025 $5,925 Backlog 0% $0":
      - gridcell "75"
      - gridcell "[DATA-1075] Handle null pointer exception in API client"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/3/2025"
      - gridcell "$5,925"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "677 [CORE-1677] Implement session management 🔒 Security Medium James Wilson James Wilson 7/30/2025 $875 Backlog 0% $0":
      - gridcell "677"
      - gridcell "[CORE-1677] Implement session management"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "7/30/2025"
      - gridcell "$875"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,170,250 48% $1,930,605":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,170,250"
      - gridcell
      - gridcell "48%"
      - gridcell "$1,930,605"
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
  147 |         expect(date <= endOfWeek).toBeTruthy();
  148 |       }
  149 |     });
  150 |   });
  151 |
  152 |   test("should clear filter when selecting 'All Dates'", async ({ page }) => {
  153 |     // First apply a filter
  154 |     await page.click('[data-testid="quick-filter-dropdown"] button');
> 155 |     await page.click('[role="option"]:has-text("Today")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
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
  190 |     const paginationButton = page.locator(
  191 |       'button:has-text("Enable Pagination")',
  192 |     );
  193 |     if (await paginationButton.isVisible()) {
  194 |       await paginationButton.click();
  195 |     }
  196 |
  197 |     // Navigate to next page
  198 |     const nextButton = page.locator('.ag-paging-button[aria-label="Next"]');
  199 |     if (await nextButton.isVisible()) {
  200 |       await nextButton.click();
  201 |       await page.waitForTimeout(500);
  202 |     }
  203 |
  204 |     // Verify filter is still applied
  205 |     const buttonText = await page
  206 |       .locator('[data-testid="quick-filter-dropdown"] button')
  207 |       .textContent();
  208 |     expect(buttonText).toContain("Last 30 Days");
  209 |   });
  210 |
  211 |   test("should update grid filter model when quick filter is applied", async ({
  212 |     page,
  213 |   }) => {
  214 |     // Apply "This Month" filter
  215 |     await page.click('[data-testid="quick-filter-dropdown"] button');
  216 |     await page.click('[role="option"]:has-text("This Month")');
  217 |     await page.waitForTimeout(500);
  218 |
  219 |     // Check that the filter model was applied by looking for filter indicator
  220 |     const filterIndicator = await page.locator(
  221 |       '[col-id="dueDate"] .ag-header-cell-filtered',
  222 |     );
  223 |     await expect(filterIndicator).toBeVisible();
  224 |   });
  225 |
  226 |   test("should handle keyboard navigation in dropdown", async ({ page }) => {
  227 |     // Open first dropdown (Date Filters)
  228 |     await page
  229 |       .locator('[data-testid="quick-filter-dropdown"]')
  230 |       .first()
  231 |       .locator("button")
  232 |       .click();
  233 |     await page.waitForSelector('[role="listbox"]');
  234 |
  235 |     // Navigate with arrow keys
  236 |     await page.keyboard.press("ArrowDown");
  237 |     await page.keyboard.press("ArrowDown");
  238 |
  239 |     // Check highlighted option
  240 |     const highlightedOption = await page.locator(
  241 |       '[role="option"][aria-selected="true"]',
  242 |     );
  243 |     await expect(highlightedOption).toBeVisible();
  244 |
  245 |     // Select with Enter
  246 |     await page.keyboard.press("Enter");
  247 |
  248 |     // Verify dropdown closed and filter applied
  249 |     await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  250 |   });
  251 |
  252 |   test("should search/filter options in dropdown", async ({ page }) => {
  253 |     // Open first dropdown (Date Filters)
  254 |     await page
  255 |       .locator('[data-testid="quick-filter-dropdown"]')
```