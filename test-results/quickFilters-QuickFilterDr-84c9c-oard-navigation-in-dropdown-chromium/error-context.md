# Test info

- Name: QuickFilterDropdown >> should handle keyboard navigation in dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:226:3

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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:232:8
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
    - row "966 [BACKEND-1966] Implement secure file upload (Tech Debt) 🔒 Security High Jessica Lopez Jessica Lopez 8/15/2025 $175 Testing 86% $151":
      - gridcell "966"
      - gridcell "[BACKEND-1966] Implement secure file upload (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/15/2025"
      - gridcell "$175"
      - gridcell "Testing"
      - gridcell "86%"
      - gridcell "$151"
    - row "771 [BACKEND-1771] Implement secrets management 🔧 DevOps High Chris Martinez Chris Martinez 8/15/2025 $8,350 Todo 15% $1,253":
      - gridcell "771"
      - gridcell "[BACKEND-1771] Implement secrets management"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/15/2025"
      - gridcell "$8,350"
      - gridcell "Todo"
      - gridcell "15%"
      - gridcell "$1,253"
    - row "306 [PROJ-1306] Add CDN for static assets ⚡ Performance High Sarah Johnson Sarah Johnson 8/16/2025 $10,875 Backlog 0% $0":
      - gridcell "306"
      - gridcell "[PROJ-1306] Add CDN for static assets"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/16/2025"
      - gridcell "$10,875"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "40 [PROJ-1040] Modernize legacy jQuery code (Sprint 27) ♻️ Refactor Critical Emily Jackson Emily Jackson 8/7/2025 $4,725 Testing 88% $4,158":
      - gridcell "40"
      - gridcell "[PROJ-1040] Modernize legacy jQuery code (Sprint 27)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/7/2025"
      - gridcell "$4,725"
      - gridcell "Testing"
      - gridcell "88%"
      - gridcell "$4,158"
    - row "98 [PROJ-1098] Document new filter components (Q1 Goals) 📝 Documentation High Emma Davis Emma Davis 8/8/2025 $425 Todo 16% $68":
      - gridcell "98"
      - gridcell "[PROJ-1098] Document new filter components (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/8/2025"
      - gridcell "$425"
      - gridcell "Todo"
      - gridcell "16%"
      - gridcell "$68"
    - row "221 [DATA-1221] Configure firewall rules (Sprint 23) 🔒 Security High Emily Jackson Emily Jackson 8/5/2025 $2,300 Backlog 0% $0":
      - gridcell "221"
      - gridcell "[DATA-1221] Configure firewall rules (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/5/2025"
      - gridcell "$2,300"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "256 [UI-1256] Modernize legacy jQuery code ♻️ Refactor Low Kevin Zhang Kevin Zhang 8/25/2025 $3,500 Backlog 0% $0":
      - gridcell "256"
      - gridcell "[UI-1256] Modernize legacy jQuery code"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/25/2025"
      - gridcell "$3,500"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "130 [INFRA-1130] Reduce API call frequency (Performance Sprint) ⚡ Performance Critical Kevin Zhang Kevin Zhang 8/4/2025 $3,525 In Progress 30% $1,058":
      - gridcell "130"
      - gridcell "[INFRA-1130] Reduce API call frequency (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/4/2025"
      - gridcell "$3,525"
      - gridcell "In Progress"
      - gridcell "30%"
      - gridcell "$1,058"
    - row "800 [CORE-1800] Optimize bundle size ⚡ Performance Low Sarah Johnson Sarah Johnson 9/6/2025 $1,500 In Review 63% $945":
      - gridcell "800"
      - gridcell "[CORE-1800] Optimize bundle size"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/6/2025"
      - gridcell "$1,500"
      - gridcell "In Review"
      - gridcell "63%"
      - gridcell "$945"
    - row "73 [DATA-1073] Add encryption at rest (Q2 Planning) 🔒 Security Medium Priya Sharma Priya Sharma 8/5/2025 $750 In Review 79% $593":
      - gridcell "73"
      - gridcell "[DATA-1073] Add encryption at rest (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/5/2025"
      - gridcell "$750"
      - gridcell "In Review"
      - gridcell "79%"
      - gridcell "$593"
    - row "198 [CORE-1198] Fix login form validation error (Sprint 26) 🐛 Bug Critical Daniel Kim Daniel Kim 8/1/2025 $10,800 In Review 64% $6,912":
      - gridcell "198"
      - gridcell "[CORE-1198] Fix login form validation error (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/1/2025"
      - gridcell "$10,800"
      - gridcell "In Review"
      - gridcell "64%"
      - gridcell "$6,912"
    - row "446 [AUTH-1446] Update contribution guidelines 📝 Documentation Low Emily Jackson Emily Jackson 8/21/2025 $8,525 In Progress 43% $3,666":
      - gridcell "446"
      - gridcell "[AUTH-1446] Update contribution guidelines"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/21/2025"
      - gridcell "$8,525"
      - gridcell "In Progress"
      - gridcell "43%"
      - gridcell "$3,666"
    - row "312 [UI-1312] Update API documentation 📝 Documentation High Isabella Garcia Isabella Garcia 8/6/2025 $3,200 In Progress 42% $1,344":
      - gridcell "312"
      - gridcell "[UI-1312] Update API documentation"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/6/2025"
      - gridcell "$3,200"
      - gridcell "In Progress"
      - gridcell "42%"
      - gridcell "$1,344"
    - row "707 [API-1707] Implement social media sharing ✨ Feature Low Michael Anderson Michael Anderson 8/16/2025 $650 Backlog 0% $0":
      - gridcell "707"
      - gridcell "[API-1707] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/16/2025"
      - gridcell "$650"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
    - row "481 [ADMIN-1481] Fix responsive layout on tablets (Sprint 25) 🐛 Bug High Kevin Zhang Kevin Zhang 7/29/2025 $9,225 Blocked 13% $1,199":
      - gridcell "481"
      - gridcell "[ADMIN-1481] Fix responsive layout on tablets (Sprint 25)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "7/29/2025"
      - gridcell "$9,225"
      - gridcell "Blocked"
      - gridcell "13%"
      - gridcell "$1,199"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,238,325 45% $1,875,521":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,238,325"
      - gridcell
      - gridcell "45%"
      - gridcell "$1,875,521"
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
  223 |     await expect(filterIndicator).toBeVisible();
  224 |   });
  225 |
  226 |   test("should handle keyboard navigation in dropdown", async ({ page }) => {
  227 |     // Open first dropdown (Date Filters)
  228 |     await page
  229 |       .locator('[data-testid="quick-filter-dropdown"]')
  230 |       .first()
  231 |       .locator("button")
> 232 |       .click();
      |        ^ Error: locator.click: Error: strict mode violation: locator('[data-testid="quick-filter-dropdown"]').first().locator('button') resolved to 5 elements:
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
  324 |         .locator(".ag-header-cell-filtered")
  325 |         .count();
  326 |       expect(filterIndicators).toBeGreaterThanOrEqual(2);
  327 |     }
  328 |   });
  329 | });
  330 |
```