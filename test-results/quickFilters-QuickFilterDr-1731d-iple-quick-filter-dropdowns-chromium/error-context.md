# Test info

- Name: QuickFilterDropdown with Multiple Columns >> should work with multiple quick filter dropdowns
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:301:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid^="quick-filter-"]:first-child button')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:313:18
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
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "47"
- img
- paragraph: Total Budget
- paragraph: $169,725
- img
- paragraph: Progress
- paragraph: 44.1%
- img
- paragraph: Budget Remaining
- paragraph: $94,831
- text: 1 to 25 of 48. Page 1 of 2
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
    - row "182 [ADMIN-1182] Migrate to TypeScript strict mode (Q2 Planning) ♻️ Refactor Critical Amanda White Amanda White 6/26/2025 $450 In Progress 31%":
      - gridcell "182"
      - gridcell "[ADMIN-1182] Migrate to TypeScript strict mode (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/26/2025"
      - gridcell "$450"
      - gridcell "In Progress"
      - gridcell "31%"
    - row "209 [WEB-1209] Fix broken unit tests in CI pipeline 🐛 Bug Critical Alex Chen Alex Chen 6/26/2025 $4,325 In Progress 54%":
      - gridcell "209"
      - gridcell "[WEB-1209] Fix broken unit tests in CI pipeline"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/26/2025"
      - gridcell "$4,325"
      - gridcell "In Progress"
      - gridcell "54%"
    - row "181 [BACKEND-1181] Add performance benchmarks (Security Audit) 🧪 Testing Critical Kevin Zhang Kevin Zhang 6/25/2025 $9,825 Blocked 16%":
      - gridcell "181"
      - gridcell "[BACKEND-1181] Add performance benchmarks (Security Audit)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/25/2025"
      - gridcell "$9,825"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "630 [DATA-1630] Create video tutorials (Q1 Goals) 📝 Documentation Critical Sarah Johnson Sarah Johnson 6/26/2025 $575 Todo 13%":
      - gridcell "630"
      - gridcell "[DATA-1630] Create video tutorials (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/26/2025"
      - gridcell "$575"
      - gridcell "Todo"
      - gridcell "13%"
    - row "739 [UI-1739] Resolve race condition in state update 🐛 Bug Critical Kevin Zhang Kevin Zhang 6/24/2025 $6,200 Blocked 38%":
      - gridcell "739"
      - gridcell "[UI-1739] Resolve race condition in state update"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/24/2025"
      - gridcell "$6,200"
      - gridcell "Blocked"
      - gridcell "38%"
    - row "506 [INFRA-1506] Correct CSS overflow in sidebar 🐛 Bug High Marcus Williams Marcus Williams 6/27/2025 $9,575 In Progress 32%":
      - gridcell "506"
      - gridcell "[INFRA-1506] Correct CSS overflow in sidebar"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/27/2025"
      - gridcell "$9,575"
      - gridcell "In Progress"
      - gridcell "32%"
    - row "527 [USER-1527] Create data visualization charts (Q1 Goals) ✨ Feature Critical Isabella Garcia Isabella Garcia 6/24/2025 $200 Done 100%":
      - gridcell "527"
      - gridcell "[USER-1527] Create data visualization charts (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/24/2025"
      - gridcell "$200"
      - gridcell "Done"
      - gridcell "100%"
    - row "582 [WEB-1582] Document error handling patterns (Q2 Planning) 📝 Documentation Critical Emily Jackson Emily Jackson 6/24/2025 $2,425 Blocked 10%":
      - gridcell "582"
      - gridcell "[WEB-1582] Document error handling patterns (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/24/2025"
      - gridcell "$2,425"
      - gridcell "Blocked"
      - gridcell "10%"
    - row "162 [AUTH-1162] Implement social media sharing ✨ Feature High Maya Patel Maya Patel 6/27/2025 $100 In Progress 29%":
      - gridcell "162"
      - gridcell "[AUTH-1162] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/27/2025"
      - gridcell "$100"
      - gridcell "In Progress"
      - gridcell "29%"
    - row "333 [USER-1333] Test offline functionality (Tech Debt) 🧪 Testing High Emily Jackson Emily Jackson 6/27/2025 $450 In Progress 41%":
      - gridcell "333"
      - gridcell "[USER-1333] Test offline functionality (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/27/2025"
      - gridcell "$450"
      - gridcell "In Progress"
      - gridcell "41%"
    - row "68 [USER-1068] Configure health checks (Tech Debt) 🔧 DevOps Critical Ryan Thomas Ryan Thomas 6/22/2025 $775 Testing 80%":
      - gridcell "68"
      - gridcell "[USER-1068] Configure health checks (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/22/2025"
      - gridcell "$775"
      - gridcell "Testing"
      - gridcell "80%"
    - row "84 [ADMIN-1084] Set up SSL certificates 🔒 Security Critical Amanda White Amanda White 6/22/2025 $6,850 Blocked 31%":
      - gridcell "84"
      - gridcell "[ADMIN-1084] Set up SSL certificates"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/22/2025"
      - gridcell "$6,850"
      - gridcell "Blocked"
      - gridcell "31%"
    - row "173 [PROJ-1173] Correct CSS overflow in sidebar (Performance Sprint) 🐛 Bug Critical Sophia Taylor Sophia Taylor 6/22/2025 $7,375 In Progress 21%":
      - gridcell "173"
      - gridcell "[PROJ-1173] Correct CSS overflow in sidebar (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/22/2025"
      - gridcell "$7,375"
      - gridcell "In Progress"
      - gridcell "21%"
    - row "624 [INFRA-1624] Add progressive web app features (Tech Debt) ⚡ Performance High Isabella Garcia Isabella Garcia 6/26/2025 $4,100 Backlog 0%":
      - gridcell "624"
      - gridcell "[INFRA-1624] Add progressive web app features (Tech Debt)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/26/2025"
      - gridcell "$4,100"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "943 [WEB-1943] Set up vulnerability scanning (Sprint 26) 🔒 Security Medium Priya Sharma Priya Sharma 6/27/2025 $475 Blocked 13%":
      - gridcell "943"
      - gridcell "[WEB-1943] Set up vulnerability scanning (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/27/2025"
      - gridcell "$475"
      - gridcell "Blocked"
      - gridcell "13%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$169,725 44%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$169,725"
      - gridcell
      - gridcell "44%"
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
- text: Page 1 of 2
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
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
> 313 |       await page.click('[data-testid^="quick-filter-"]:first-child button');
      |                  ^ Error: page.click: Test timeout of 30000ms exceeded.
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