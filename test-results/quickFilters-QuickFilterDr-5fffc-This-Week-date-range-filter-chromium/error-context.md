# Test info

- Name: QuickFilterDropdown >> should apply 'This Week' date range filter
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:117:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="option"]:has-text("This Week")')
    - locator resolved to <button type="button" role="option" aria-selected="false" class="_option_12ns2_132  ">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    51 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:120:16
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
    - row "144 [CORE-1144] Implement auto-scaling (Sprint 25) 🔧 DevOps Low Jessica Lopez Jessica Lopez 9/10/2025 $1,825 Todo 12% $219":
      - gridcell "144"
      - gridcell "[CORE-1144] Implement auto-scaling (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "9/10/2025"
      - gridcell "$1,825"
      - gridcell "Todo"
      - gridcell "12%"
      - gridcell "$219"
    - row "52 [FRONTEND-1052] Add input sanitization (Q1 Goals) 🔒 Security Low Daniel Kim Daniel Kim 8/24/2025 $2,850 In Progress 37% $1,055":
      - gridcell "52"
      - gridcell "[FRONTEND-1052] Add input sanitization (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/24/2025"
      - gridcell "$2,850"
      - gridcell "In Progress"
      - gridcell "37%"
      - gridcell "$1,055"
    - row "308 [PROJ-1308] Implement two-factor authentication ✨ Feature Low Sophia Taylor Sophia Taylor 9/6/2025 $10,250 Todo 16% $1,640":
      - gridcell "308"
      - gridcell "[PROJ-1308] Implement two-factor authentication"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/6/2025"
      - gridcell "$10,250"
      - gridcell "Todo"
      - gridcell "16%"
      - gridcell "$1,640"
    - row "315 [USER-1315] Configure Docker containers (Sprint 23) 🔧 DevOps Critical Alex Chen Alex Chen 8/7/2025 $1,000 Todo 18% $180":
      - gridcell "315"
      - gridcell "[USER-1315] Configure Docker containers (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/7/2025"
      - gridcell "$1,000"
      - gridcell "Todo"
      - gridcell "18%"
      - gridcell "$180"
    - row "584 [DATA-1584] Implement two-factor authentication (Sprint 24) ✨ Feature Critical Amanda White Amanda White 8/6/2025 $225 Todo 11% $25":
      - gridcell "584"
      - gridcell "[DATA-1584] Implement two-factor authentication (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/6/2025"
      - gridcell "$225"
      - gridcell "Todo"
      - gridcell "11%"
      - gridcell "$25"
    - row "966 [CORE-1966] Set up CI/CD pipeline (Q2 Planning) 🔧 DevOps Medium Daniel Kim Daniel Kim 8/16/2025 $4,525 Backlog 0% $0":
      - gridcell "966"
      - gridcell "[CORE-1966] Set up CI/CD pipeline (Q2 Planning)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/16/2025"
      - gridcell "$4,525"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "973 [API-1973] Create troubleshooting guide (Sprint 23) 📝 Documentation Medium Olivia Brown Olivia Brown 8/21/2025 $4,500 Testing 86% $3,870":
      - gridcell "973"
      - gridcell "[API-1973] Create troubleshooting guide (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/21/2025"
      - gridcell "$4,500"
      - gridcell "Testing"
      - gridcell "86%"
      - gridcell "$3,870"
    - row "292 [INFRA-1292] Create architecture overview (Sprint 25) 📝 Documentation Low Sarah Johnson Sarah Johnson 8/23/2025 $3,975 Todo 18% $716":
      - gridcell "292"
      - gridcell "[INFRA-1292] Create architecture overview (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/23/2025"
      - gridcell "$3,975"
      - gridcell "Todo"
      - gridcell "18%"
      - gridcell "$716"
    - row "716 [CORE-1716] Document component props (Sprint 24) 📝 Documentation Low Emily Jackson Emily Jackson 8/27/2025 $2,925 In Review 74% $2,165":
      - gridcell "716"
      - gridcell "[CORE-1716] Document component props (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/27/2025"
      - gridcell "$2,925"
      - gridcell "In Review"
      - gridcell "74%"
      - gridcell "$2,165"
    - row "764 [APP-1764] Correct data corruption in cache layer (Sprint 27) 🐛 Bug Critical Jessica Lopez Jessica Lopez 7/31/2025 $625 Todo 17% $106":
      - gridcell "764"
      - gridcell "[APP-1764] Correct data corruption in cache layer (Sprint 27)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "7/31/2025"
      - gridcell "$625"
      - gridcell "Todo"
      - gridcell "17%"
      - gridcell "$106"
    - row "4 [CORE-1004] Create video tutorials (Sprint 25) 📝 Documentation Medium Ryan Thomas Ryan Thomas 8/13/2025 $775 Backlog 0% $0":
      - gridcell "4"
      - gridcell "[CORE-1004] Create video tutorials (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/13/2025"
      - gridcell "$775"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "388 [ADMIN-1388] Add SQL injection prevention (Sprint 23) 🔒 Security Critical Sarah Johnson Sarah Johnson 7/29/2025 $375 Backlog 0% $0":
      - gridcell "388"
      - gridcell "[ADMIN-1388] Add SQL injection prevention (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "7/29/2025"
      - gridcell "$375"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "648 [AUTH-1648] Set up infrastructure as code (Sprint 25) 🔧 DevOps Low Emma Davis Emma Davis 9/1/2025 $5,200 Backlog 0% $0":
      - gridcell "648"
      - gridcell "[AUTH-1648] Set up infrastructure as code (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/1/2025"
      - gridcell "$5,200"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "478 [WEB-1478] Implement code splitting (Sprint 26) ⚡ Performance Medium Sarah Johnson Sarah Johnson 8/8/2025 $6,950 In Progress 52% $3,614":
      - gridcell "478"
      - gridcell "[WEB-1478] Implement code splitting (Sprint 26)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/8/2025"
      - gridcell "$6,950"
      - gridcell "In Progress"
      - gridcell "52%"
      - gridcell "$3,614"
    - row "825 [CORE-1825] Write performance optimization tips (Q1 Goals) 📝 Documentation Critical Maya Patel Maya Patel 7/28/2025 $950 Backlog 0% $0":
      - gridcell "825"
      - gridcell "[CORE-1825] Write performance optimization tips (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "7/28/2025"
      - gridcell "$950"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,391,225 47% $2,051,960":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,391,225"
      - gridcell
      - gridcell "47%"
      - gridcell "$2,051,960"
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
  114 |     expect(buttonText).toContain("Last 7 Days");
  115 |   });
  116 |
  117 |   test("should apply 'This Week' date range filter", async ({ page }) => {
  118 |     // Open dropdown and select "This Week"
  119 |     await page.click('[data-testid="quick-filter-dropdown"] button');
> 120 |     await page.click('[role="option"]:has-text("This Week")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
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
```