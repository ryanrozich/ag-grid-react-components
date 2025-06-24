# Test info

- Name: QuickFilterDropdown >> should show option descriptions when enabled
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:279:3

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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:285:8
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
    - row "656 [ADMIN-1656] Debug performance regression in search (Q2 Planning) 🐛 Bug Low Ryan Thomas Ryan Thomas 8/30/2025 $1,000 Blocked 10% $100":
      - gridcell "656"
      - gridcell "[ADMIN-1656] Debug performance regression in search (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/30/2025"
      - gridcell "$1,000"
      - gridcell "Blocked"
      - gridcell "10%"
      - gridcell "$100"
    - row "608 [API-1608] Create load testing scenarios (Q2 Planning) 🧪 Testing Medium James Wilson James Wilson 8/27/2025 $775 In Progress 30% $233":
      - gridcell "608"
      - gridcell "[API-1608] Create load testing scenarios (Q2 Planning)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/27/2025"
      - gridcell "$775"
      - gridcell "In Progress"
      - gridcell "30%"
      - gridcell "$233"
    - row "165 [INFRA-1165] Set up monitoring alerts (Sprint 26) 🔧 DevOps Low Olivia Brown Olivia Brown 9/9/2025 $9,850 Testing 94% $9,259":
      - gridcell "165"
      - gridcell "[INFRA-1165] Set up monitoring alerts (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/9/2025"
      - gridcell "$9,850"
      - gridcell "Testing"
      - gridcell "94%"
      - gridcell "$9,259"
    - row "910 [APP-1910] Create onboarding tutorial (Sprint 24) 📝 Documentation Low Kevin Zhang Kevin Zhang 9/6/2025 $175 Testing 91% $159":
      - gridcell "910"
      - gridcell "[APP-1910] Create onboarding tutorial (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "9/6/2025"
      - gridcell "$175"
      - gridcell "Testing"
      - gridcell "91%"
      - gridcell "$159"
    - row "560 [CORE-1560] Implement blue-green deployment (Q2 Planning) 🔧 DevOps High Marcus Williams Marcus Williams 8/10/2025 $4,450 Todo 13% $579":
      - gridcell "560"
      - gridcell "[CORE-1560] Implement blue-green deployment (Q2 Planning)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/10/2025"
      - gridcell "$4,450"
      - gridcell "Todo"
      - gridcell "13%"
      - gridcell "$579"
    - row "520 [FRONTEND-1520] Resolve race condition in state update (Performance Sprint) 🐛 Bug High Priya Sharma Priya Sharma 8/6/2025 $2,625 In Progress 34% $893":
      - gridcell "520"
      - gridcell "[FRONTEND-1520] Resolve race condition in state update (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/6/2025"
      - gridcell "$2,625"
      - gridcell "In Progress"
      - gridcell "34%"
      - gridcell "$893"
    - row "410 [UI-1410] Resolve memory leak in data grid 🐛 Bug Critical Sarah Johnson Sarah Johnson 8/1/2025 $625 Todo 19% $119":
      - gridcell "410"
      - gridcell "[UI-1410] Resolve memory leak in data grid"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/1/2025"
      - gridcell "$625"
      - gridcell "Todo"
      - gridcell "19%"
      - gridcell "$119"
    - row "632 [BACKEND-1632] Fix responsive layout on tablets (Sprint 23) 🐛 Bug Critical Ryan Thomas Ryan Thomas 8/2/2025 $650 In Progress 39% $254":
      - gridcell "632"
      - gridcell "[BACKEND-1632] Fix responsive layout on tablets (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/2/2025"
      - gridcell "$650"
      - gridcell "In Progress"
      - gridcell "39%"
      - gridcell "$254"
    - row "125 [DATA-1125] Update contribution guidelines 📝 Documentation High Chris Martinez Chris Martinez 8/3/2025 $725 In Progress 52% $377":
      - gridcell "125"
      - gridcell "[DATA-1125] Update contribution guidelines"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/3/2025"
      - gridcell "$725"
      - gridcell "In Progress"
      - gridcell "52%"
      - gridcell "$377"
    - row "361 [CORE-1361] Create security penetration tests 🧪 Testing Critical Alex Chen Alex Chen 8/3/2025 $3,525 In Progress 57% $2,009":
      - gridcell "361"
      - gridcell "[CORE-1361] Create security penetration tests"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/3/2025"
      - gridcell "$3,525"
      - gridcell "In Progress"
      - gridcell "57%"
      - gridcell "$2,009"
    - row "988 [APP-1988] Update to ES6 modules (Performance Sprint) ♻️ Refactor Medium Maya Patel Maya Patel 8/20/2025 $475 Backlog 0% $0":
      - gridcell "988"
      - gridcell "[APP-1988] Update to ES6 modules (Performance Sprint)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/20/2025"
      - gridcell "$475"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "233 [USER-1233] Refactor authentication flow ♻️ Refactor Critical Daniel Kim Daniel Kim 8/2/2025 $275 In Review 69% $190":
      - gridcell "233"
      - gridcell "[USER-1233] Refactor authentication flow"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/2/2025"
      - gridcell "$275"
      - gridcell "In Review"
      - gridcell "69%"
      - gridcell "$190"
    - row "517 [AUTH-1517] Create deployment rollback (Sprint 26) 🔧 DevOps High Olivia Brown Olivia Brown 8/3/2025 $75 In Review 71% $53":
      - gridcell "517"
      - gridcell "[AUTH-1517] Create deployment rollback (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/3/2025"
      - gridcell "$75"
      - gridcell "In Review"
      - gridcell "71%"
      - gridcell "$53"
    - row "531 [BACKEND-1531] Add input sanitization 🔒 Security Low John Robinson John Robinson 8/13/2025 $2,100 Testing 84% $1,764":
      - gridcell "531"
      - gridcell "[BACKEND-1531] Add input sanitization"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/13/2025"
      - gridcell "$2,100"
      - gridcell "Testing"
      - gridcell "84%"
      - gridcell "$1,764"
    - row "765 [BACKEND-1765] Create disaster recovery plan (Sprint 27) 🔧 DevOps Medium Maya Patel Maya Patel 8/14/2025 $6,450 Todo 13% $839":
      - gridcell "765"
      - gridcell "[BACKEND-1765] Create disaster recovery plan (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/14/2025"
      - gridcell "$6,450"
      - gridcell "Todo"
      - gridcell "13%"
      - gridcell "$839"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,916,875 46% $1,806,312":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,916,875"
      - gridcell
      - gridcell "46%"
      - gridcell "$1,806,312"
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
> 285 |       .click();
      |        ^ Error: locator.click: Error: strict mode violation: locator('[data-testid="quick-filter-dropdown"]').first().locator('button') resolved to 5 elements:
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