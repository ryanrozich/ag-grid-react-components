# Test info

- Name: QuickFilterDropdown >> should update grid filter model when quick filter is applied
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:211:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('[col-id="dueDate"] .ag-header-cell-filtered')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('[col-id="dueDate"] .ag-header-cell-filtered')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:223:35
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
  - text: This Month
  - img
- heading "Combined Filters Link to Combined Filters" [level=3]:
  - text: Combined Filters
  - link "Link to Combined Filters":
    - /url: "#combined-filters-demo"
    - img
- button "Quick filter options":
  - text: Combined filters
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
    - row "498 [WEB-1498] Create troubleshooting guide (Sprint 24) 📝 Documentation High John Robinson John Robinson 8/15/2025 $8,325 Backlog 0% $0":
      - gridcell "498"
      - gridcell "[WEB-1498] Create troubleshooting guide (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/15/2025"
      - gridcell "$8,325"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "381 [AUTH-1381] Configure security headers (Q2 Planning) 🔒 Security Low Michael Anderson Michael Anderson 8/21/2025 $5,325 Backlog 0% $0":
      - gridcell "381"
      - gridcell "[AUTH-1381] Configure security headers (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/21/2025"
      - gridcell "$5,325"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "389 [ADMIN-1389] Implement session management (Sprint 25) 🔒 Security Low Amanda White Amanda White 8/19/2025 $5,575 Todo 6% $335":
      - gridcell "389"
      - gridcell "[ADMIN-1389] Implement session management (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/19/2025"
      - gridcell "$5,575"
      - gridcell "Todo"
      - gridcell "6%"
      - gridcell "$335"
    - row "303 [CORE-1303] Test offline functionality (Sprint 27) 🧪 Testing Critical John Robinson John Robinson 8/5/2025 $19,450 In Progress 46% $8,947":
      - gridcell "303"
      - gridcell "[CORE-1303] Test offline functionality (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/5/2025"
      - gridcell "$19,450"
      - gridcell "In Progress"
      - gridcell "46%"
      - gridcell "$8,947"
    - row "968 [BACKEND-1968] Optimize bundle size (Q1 Goals) ⚡ Performance Low Jessica Lopez Jessica Lopez 8/29/2025 $3,675 Backlog 0% $0":
      - gridcell "968"
      - gridcell "[BACKEND-1968] Optimize bundle size (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/29/2025"
      - gridcell "$3,675"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "97 [AUTH-1097] Add audit logging 🔒 Security Medium Emily Jackson Emily Jackson 8/6/2025 $1,700 Testing 91% $1,547":
      - gridcell "97"
      - gridcell "[AUTH-1097] Add audit logging"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/6/2025"
      - gridcell "$1,700"
      - gridcell "Testing"
      - gridcell "91%"
      - gridcell "$1,547"
    - row "3 [BACKEND-1003] Write API contract tests (Tech Debt) 🧪 Testing Critical Emma Davis Emma Davis 8/3/2025 $18,675 In Progress 53% $9,898":
      - gridcell "3"
      - gridcell "[BACKEND-1003] Write API contract tests (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/3/2025"
      - gridcell "$18,675"
      - gridcell "In Progress"
      - gridcell "53%"
      - gridcell "$9,898"
    - row "873 [API-1873] Create deployment rollback (Performance Sprint) 🔧 DevOps Critical Sophia Taylor Sophia Taylor 8/2/2025 $1,950 Backlog 0% $0":
      - gridcell "873"
      - gridcell "[API-1873] Create deployment rollback (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/2/2025"
      - gridcell "$1,950"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "168 [DATA-1168] Create backup automation (Sprint 23) 🔧 DevOps Medium Jessica Lopez Jessica Lopez 8/17/2025 $5,475 Todo 6% $329":
      - gridcell "168"
      - gridcell "[DATA-1168] Create backup automation (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/17/2025"
      - gridcell "$5,475"
      - gridcell "Todo"
      - gridcell "6%"
      - gridcell "$329"
    - row "287 [MOBILE-1287] Migrate to TypeScript strict mode ♻️ Refactor Medium Sophia Taylor Sophia Taylor 8/16/2025 $8,675 Backlog 0% $0":
      - gridcell "287"
      - gridcell "[MOBILE-1287] Migrate to TypeScript strict mode"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/16/2025"
      - gridcell "$8,675"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "542 [UI-1542] Implement virtual scrolling (Sprint 27) ⚡ Performance Low Isabella Garcia Isabella Garcia 8/31/2025 $9,725 Todo 15% $1,459":
      - gridcell "542"
      - gridcell "[UI-1542] Implement virtual scrolling (Sprint 27)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/31/2025"
      - gridcell "$9,725"
      - gridcell "Todo"
      - gridcell "15%"
      - gridcell "$1,459"
    - row "559 [WEB-1559] Create data visualization charts (Q2 Planning) ✨ Feature High Ryan Thomas Ryan Thomas 8/5/2025 $9,225 Backlog 0% $0":
      - gridcell "559"
      - gridcell "[WEB-1559] Create data visualization charts (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/5/2025"
      - gridcell "$9,225"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "382 [API-1382] Optimize bundle size (Performance Sprint) ⚡ Performance Critical Priya Sharma Priya Sharma 7/31/2025 $550 Backlog 0% $0":
      - gridcell "382"
      - gridcell "[API-1382] Optimize bundle size (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/31/2025"
      - gridcell "$550"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "642 [DASH-1642] Implement OAuth integration (Sprint 26) ✨ Feature Critical Jessica Lopez Jessica Lopez 7/31/2025 $3,750 Todo 5% $188":
      - gridcell "642"
      - gridcell "[DASH-1642] Implement OAuth integration (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "7/31/2025"
      - gridcell "$3,750"
      - gridcell "Todo"
      - gridcell "5%"
      - gridcell "$188"
    - row "133 [CORE-1133] Implement auto-scaling (Sprint 27) 🔧 DevOps Medium Amanda White Amanda White 8/10/2025 $625 Backlog 0% $0":
      - gridcell "133"
      - gridcell "[CORE-1133] Implement auto-scaling (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/10/2025"
      - gridcell "$625"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,147,350 46% $1,944,161":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,147,350"
      - gridcell
      - gridcell "46%"
      - gridcell "$1,944,161"
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
  221 |       '[col-id="dueDate"] .ag-header-cell-filtered',
  222 |     );
> 223 |     await expect(filterIndicator).toBeVisible();
      |                                   ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
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
  287 |
  288 |     // Check for descriptions
  289 |     const optionWithDescription = page.locator(
  290 |       '[role="option"]:has-text("Today")',
  291 |     );
  292 |     const description = await optionWithDescription
  293 |       .locator("text=/today.*date/i")
  294 |       .count();
  295 |
  296 |     expect(description).toBeGreaterThan(0);
  297 |   });
  298 | });
  299 |
  300 | test.describe("QuickFilterDropdown with Multiple Columns", () => {
  301 |   test("should work with multiple quick filter dropdowns", async ({ page }) => {
  302 |     // Navigate to a page with multiple dropdowns
  303 |     await page.goto("/demo");
  304 |     await page.waitForSelector(".ag-root-wrapper");
  305 |
  306 |     // Check if there are multiple quick filter dropdowns
  307 |     const dropdowns = await page
  308 |       .locator('[data-testid^="quick-filter-"]')
  309 |       .count();
  310 |
  311 |     if (dropdowns > 1) {
  312 |       // Apply filter to first dropdown
  313 |       await page.click('[data-testid^="quick-filter-"]:first-child button');
  314 |       await page.click('[role="option"]:has-text("Today")');
  315 |       await page.waitForTimeout(500);
  316 |
  317 |       // Apply filter to second dropdown
  318 |       await page.click('[data-testid^="quick-filter-"]:nth-child(2) button');
  319 |       await page.click('[role="option"]:first-child');
  320 |       await page.waitForTimeout(500);
  321 |
  322 |       // Verify both filters are applied
  323 |       const filterIndicators = await page
```