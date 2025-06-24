# Test info

- Name: QuickFilterDropdown >> should persist selected filter when navigating grid
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:181:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="option"]:has-text("Last 30 Days")')
    - locator resolved to <button type="button" role="option" aria-selected="true" class="_option_12ns2_132 _optionSelected_12ns2_167 ">…</button>
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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:186:16
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
    - row "13 [BACKEND-1013] Fix infinite scroll pagination bug (Sprint 23) 🐛 Bug Critical Emma Davis Emma Davis 8/8/2025 $500 Testing 87% $435":
      - gridcell "13"
      - gridcell "[BACKEND-1013] Fix infinite scroll pagination bug (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/8/2025"
      - gridcell "$500"
      - gridcell "Testing"
      - gridcell "87%"
      - gridcell "$435"
    - row "799 [AUTH-1799] Implement OAuth integration (Sprint 25) ✨ Feature Critical Emma Davis Emma Davis 8/5/2025 $800 Backlog 0% $0":
      - gridcell "799"
      - gridcell "[AUTH-1799] Implement OAuth integration (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/5/2025"
      - gridcell "$800"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "213 [BACKEND-1213] Create advanced search filters (Q1 Goals) ✨ Feature Low Michael Anderson Michael Anderson 8/17/2025 $200 Backlog 0% $0":
      - gridcell "213"
      - gridcell "[BACKEND-1213] Create advanced search filters (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/17/2025"
      - gridcell "$200"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "960 [CORE-1960] Extract shared utilities module ♻️ Refactor Low Maya Patel Maya Patel 8/26/2025 $6,525 In Progress 22% $1,436":
      - gridcell "960"
      - gridcell "[CORE-1960] Extract shared utilities module"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/26/2025"
      - gridcell "$6,525"
      - gridcell "In Progress"
      - gridcell "22%"
      - gridcell "$1,436"
    - row "31 [INFRA-1031] Implement dark mode toggle (Sprint 24) ✨ Feature Medium Maya Patel Maya Patel 8/13/2025 $14,050 In Review 61% $8,571":
      - gridcell "31"
      - gridcell "[INFRA-1031] Implement dark mode toggle (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/13/2025"
      - gridcell "$14,050"
      - gridcell "In Review"
      - gridcell "61%"
      - gridcell "$8,571"
    - row "87 [ADMIN-1087] Implement secure file upload (Q2 Planning) 🔒 Security High Jessica Lopez Jessica Lopez 8/3/2025 $200 In Review 71% $142":
      - gridcell "87"
      - gridcell "[ADMIN-1087] Implement secure file upload (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/3/2025"
      - gridcell "$200"
      - gridcell "In Review"
      - gridcell "71%"
      - gridcell "$142"
    - row "617 [API-1617] Configure CDN distribution (Q1 Goals) 🔧 DevOps Critical Sophia Taylor Sophia Taylor 8/5/2025 $500 Todo 16% $80":
      - gridcell "617"
      - gridcell "[API-1617] Configure CDN distribution (Q1 Goals)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/5/2025"
      - gridcell "$500"
      - gridcell "Todo"
      - gridcell "16%"
      - gridcell "$80"
    - row "953 [APP-1953] Write performance optimization tips (Sprint 25) 📝 Documentation High Olivia Brown Olivia Brown 8/9/2025 $675 Todo 15% $101":
      - gridcell "953"
      - gridcell "[APP-1953] Write performance optimization tips (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/9/2025"
      - gridcell "$675"
      - gridcell "Todo"
      - gridcell "15%"
      - gridcell "$101"
    - row "426 [API-1426] Create onboarding tutorial (Sprint 23) 📝 Documentation Critical Marcus Williams Marcus Williams 8/3/2025 $5,275 Todo 11% $580":
      - gridcell "426"
      - gridcell "[API-1426] Create onboarding tutorial (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/3/2025"
      - gridcell "$5,275"
      - gridcell "Todo"
      - gridcell "11%"
      - gridcell "$580"
    - row "226 [BACKEND-1226] Add internationalization tests (Sprint 26) 🧪 Testing Critical Emily Jackson Emily Jackson 7/30/2025 $600 Backlog 0% $0":
      - gridcell "226"
      - gridcell "[BACKEND-1226] Add internationalization tests (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "7/30/2025"
      - gridcell "$600"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "345 [MOBILE-1345] Add internationalization tests (Sprint 24) 🧪 Testing Medium Olivia Brown Olivia Brown 8/5/2025 $2,375 Testing 81% $1,924":
      - gridcell "345"
      - gridcell "[MOBILE-1345] Add internationalization tests (Sprint 24)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/5/2025"
      - gridcell "$2,375"
      - gridcell "Testing"
      - gridcell "81%"
      - gridcell "$1,924"
    - row "432 [CORE-1432] Add performance benchmarks (Tech Debt) 🧪 Testing High Emily Jackson Emily Jackson 8/5/2025 $1,750 Backlog 0% $0":
      - gridcell "432"
      - gridcell "[CORE-1432] Add performance benchmarks (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/5/2025"
      - gridcell "$1,750"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "460 [BACKEND-1460] Configure health checks (Sprint 23) 🔧 DevOps Critical Jessica Lopez Jessica Lopez 7/31/2025 $7,700 Backlog 0% $0":
      - gridcell "460"
      - gridcell "[BACKEND-1460] Configure health checks (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "7/31/2025"
      - gridcell "$7,700"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "47 [CORE-1047] Optimize database queries ⚡ Performance Low Priya Sharma Priya Sharma 8/30/2025 $375 In Review 69% $259":
      - gridcell "47"
      - gridcell "[CORE-1047] Optimize database queries"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/30/2025"
      - gridcell "$375"
      - gridcell "In Review"
      - gridcell "69%"
      - gridcell "$259"
    - row "520 [AUTH-1520] Implement social media sharing ✨ Feature Medium Michael Anderson Michael Anderson 8/12/2025 $5,050 In Review 61% $3,081":
      - gridcell "520"
      - gridcell "[AUTH-1520] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/12/2025"
      - gridcell "$5,050"
      - gridcell "In Review"
      - gridcell "61%"
      - gridcell "$3,081"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,345,775 45% $1,954,134":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,345,775"
      - gridcell
      - gridcell "45%"
      - gridcell "$1,954,134"
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
> 186 |     await page.click('[role="option"]:has-text("Last 30 Days")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
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
  256 |       .first()
  257 |       .locator("button")
  258 |       .click();
  259 |     await page.waitForSelector('[role="listbox"]');
  260 |
  261 |     // Type in search if search input exists
  262 |     const searchInput = page.locator('[data-testid="quick-filter-search"]');
  263 |     if (await searchInput.isVisible()) {
  264 |       await searchInput.fill("month");
  265 |
  266 |       // Verify filtered results
  267 |       const visibleOptions = await page
  268 |         .locator('[role="option"]:visible')
  269 |         .count();
  270 |       const monthOptions = await page
  271 |         .locator('[role="option"]:has-text("Month"):visible')
  272 |         .count();
  273 |
  274 |       expect(monthOptions).toBeGreaterThan(0);
  275 |       expect(visibleOptions).toBeLessThanOrEqual(4); // Should show only month-related options
  276 |     }
  277 |   });
  278 |
  279 |   test("should show option descriptions when enabled", async ({ page }) => {
  280 |     // Open first dropdown (Date Filters)
  281 |     await page
  282 |       .locator('[data-testid="quick-filter-dropdown"]')
  283 |       .first()
  284 |       .locator("button")
  285 |       .click();
  286 |     await page.waitForSelector('[role="listbox"]');
```