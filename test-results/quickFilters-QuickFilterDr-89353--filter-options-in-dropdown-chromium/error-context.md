# Test info

- Name: QuickFilterDropdown >> should search/filter options in dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:252:3

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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:258:8
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
    - row "653 [PROJ-1653] Create backup automation 🔧 DevOps Low Amanda White Amanda White 9/2/2025 $18,025 Testing 90% $16,223":
      - gridcell "653"
      - gridcell "[PROJ-1653] Create backup automation"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/2/2025"
      - gridcell "$18,025"
      - gridcell "Testing"
      - gridcell "90%"
      - gridcell "$16,223"
    - row "453 [API-1453] Correct CSS overflow in sidebar 🐛 Bug Critical Maya Patel Maya Patel 8/5/2025 $19,700 In Progress 55% $10,835":
      - gridcell "453"
      - gridcell "[API-1453] Correct CSS overflow in sidebar"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/5/2025"
      - gridcell "$19,700"
      - gridcell "In Progress"
      - gridcell "55%"
      - gridcell "$10,835"
    - row "707 [PROJ-1707] Add E2E tests for checkout flow (Sprint 23) 🧪 Testing Low David Lee David Lee 9/10/2025 $225 Todo 9% $20":
      - gridcell "707"
      - gridcell "[PROJ-1707] Add E2E tests for checkout flow (Sprint 23)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/10/2025"
      - gridcell "$225"
      - gridcell "Todo"
      - gridcell "9%"
      - gridcell "$20"
    - row "197 [USER-1197] Debug WebSocket connection timeout (Sprint 23) 🐛 Bug Critical Alex Chen Alex Chen 8/4/2025 $875 Todo 8% $70":
      - gridcell "197"
      - gridcell "[USER-1197] Debug WebSocket connection timeout (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/4/2025"
      - gridcell "$875"
      - gridcell "Todo"
      - gridcell "8%"
      - gridcell "$70"
    - row "395 [DATA-1395] Fix broken unit tests in CI pipeline 🐛 Bug Low John Robinson John Robinson 8/11/2025 $900 Backlog 0% $0":
      - gridcell "395"
      - gridcell "[DATA-1395] Fix broken unit tests in CI pipeline"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/11/2025"
      - gridcell "$900"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "652 [ADMIN-1652] Optimize render performance (Sprint 25) ⚡ Performance Critical Alex Chen Alex Chen 8/4/2025 $825 Backlog 0% $0":
      - gridcell "652"
      - gridcell "[ADMIN-1652] Optimize render performance (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/4/2025"
      - gridcell "$825"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "944 [AUTH-1944] Document new filter components (Q1 Goals) 📝 Documentation High James Wilson James Wilson 8/11/2025 $9,825 Backlog 0% $0":
      - gridcell "944"
      - gridcell "[AUTH-1944] Document new filter components (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/11/2025"
      - gridcell "$9,825"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "733 [MOBILE-1733] Refactor error handling ♻️ Refactor Medium John Robinson John Robinson 8/12/2025 $975 Backlog 0% $0":
      - gridcell "733"
      - gridcell "[MOBILE-1733] Refactor error handling"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/12/2025"
      - gridcell "$975"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "238 [FRONTEND-1238] Add request batching (Security Audit) ⚡ Performance Low Ryan Thomas Ryan Thomas 9/11/2025 $1,725 Testing 93% $1,604":
      - gridcell "238"
      - gridcell "[FRONTEND-1238] Add request batching (Security Audit)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/11/2025"
      - gridcell "$1,725"
      - gridcell "Testing"
      - gridcell "93%"
      - gridcell "$1,604"
    - row "89 [UI-1089] Build custom report generator ✨ Feature Medium Emma Davis Emma Davis 8/7/2025 $1,575 Backlog 0% $0":
      - gridcell "89"
      - gridcell "[UI-1089] Build custom report generator"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/7/2025"
      - gridcell "$1,575"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "215 [FRONTEND-1215] Document component props 📝 Documentation Medium Kevin Zhang Kevin Zhang 8/12/2025 $4,025 Todo 10% $403":
      - gridcell "215"
      - gridcell "[FRONTEND-1215] Document component props"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/12/2025"
      - gridcell "$4,025"
      - gridcell "Todo"
      - gridcell "10%"
      - gridcell "$403"
    - row "948 [MOBILE-1948] Create troubleshooting guide 📝 Documentation High Emma Davis Emma Davis 8/8/2025 $4,375 In Review 61% $2,669":
      - gridcell "948"
      - gridcell "[MOBILE-1948] Create troubleshooting guide"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/8/2025"
      - gridcell "$4,375"
      - gridcell "In Review"
      - gridcell "61%"
      - gridcell "$2,669"
    - row "321 [BACKEND-1321] Fix login form validation error 🐛 Bug Low Olivia Brown Olivia Brown 8/9/2025 $200 Testing 93% $186":
      - gridcell "321"
      - gridcell "[BACKEND-1321] Fix login form validation error"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/9/2025"
      - gridcell "$200"
      - gridcell "Testing"
      - gridcell "93%"
      - gridcell "$186"
    - row "290 [APP-1290] Split monolithic components (Tech Debt) ♻️ Refactor High Isabella Garcia Isabella Garcia 8/6/2025 $875 Backlog 0% $0":
      - gridcell "290"
      - gridcell "[APP-1290] Split monolithic components (Tech Debt)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/6/2025"
      - gridcell "$875"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "437 [API-1437] Add E2E tests for checkout flow (Q1 Goals) 🧪 Testing High Ryan Thomas Ryan Thomas 7/31/2025 $5,675 Testing 91% $5,164":
      - gridcell "437"
      - gridcell "[API-1437] Add E2E tests for checkout flow (Q1 Goals)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "7/31/2025"
      - gridcell "$5,675"
      - gridcell "Testing"
      - gridcell "91%"
      - gridcell "$5,164"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,094,450 45% $1,878,613":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,094,450"
      - gridcell
      - gridcell "45%"
      - gridcell "$1,878,613"
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
  256 |       .first()
  257 |       .locator("button")
> 258 |       .click();
      |        ^ Error: locator.click: Error: strict mode violation: locator('[data-testid="quick-filter-dropdown"]').first().locator('button') resolved to 5 elements:
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
  324 |         .locator(".ag-header-cell-filtered")
  325 |         .count();
  326 |       expect(filterIndicators).toBeGreaterThanOrEqual(2);
  327 |     }
  328 |   });
  329 | });
  330 |
```