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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $4,305,175
- img
- paragraph: Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $2,284,698
- text: 1 to 25 of 1,001. Page 1 of 41
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
    - row "441 [DASH-1441] Implement CSRF protection 🔒 Security Critical Sarah Johnson Sarah Johnson 8/14/2025 $12,150 Backlog 0%":
      - gridcell "441"
      - gridcell "[DASH-1441] Implement CSRF protection"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/14/2025"
      - gridcell "$12,150"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "277 [USER-1277] Correct data corruption in cache layer (Sprint 24) 🐛 Bug Medium Priya Sharma Priya Sharma 8/15/2025 $650 Blocked 36%":
      - gridcell "277"
      - gridcell "[USER-1277] Correct data corruption in cache layer (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/15/2025"
      - gridcell "$650"
      - gridcell "Blocked"
      - gridcell "36%"
    - row "558 [INFRA-1558] Add internationalization tests (Sprint 27) 🧪 Testing Medium Jessica Lopez Jessica Lopez 8/25/2025 $6,000 Backlog 0%":
      - gridcell "558"
      - gridcell "[INFRA-1558] Add internationalization tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/25/2025"
      - gridcell "$6,000"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "917 [MOBILE-1917] Fix broken unit tests in CI pipeline 🐛 Bug Medium James Wilson James Wilson 8/19/2025 $575 In Progress 35%":
      - gridcell "917"
      - gridcell "[MOBILE-1917] Fix broken unit tests in CI pipeline"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/19/2025"
      - gridcell "$575"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "486 [BACKEND-1486] Implement secure file upload 🔒 Security Low Ryan Thomas Ryan Thomas 8/23/2025 $150 In Review 77%":
      - gridcell "486"
      - gridcell "[BACKEND-1486] Implement secure file upload"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/23/2025"
      - gridcell "$150"
      - gridcell "In Review"
      - gridcell "77%"
    - row "998 [DASH-1998] Optimize database queries ♻️ Refactor High Amanda White Amanda White 8/15/2025 $500 Testing 87%":
      - gridcell "998"
      - gridcell "[DASH-1998] Optimize database queries"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/15/2025"
      - gridcell "$500"
      - gridcell "Testing"
      - gridcell "87%"
    - row "839 [API-1839] Implement auto-scaling (Sprint 27) 🔧 DevOps High David Lee David Lee 8/14/2025 $1,750 In Progress 47%":
      - gridcell "839"
      - gridcell "[API-1839] Implement auto-scaling (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/14/2025"
      - gridcell "$1,750"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "328 [UI-1328] Optimize memory usage (Sprint 23) ⚡ Performance High Sophia Taylor Sophia Taylor 8/13/2025 $75 In Progress 27%":
      - gridcell "328"
      - gridcell "[UI-1328] Optimize memory usage (Sprint 23)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/13/2025"
      - gridcell "$75"
      - gridcell "In Progress"
      - gridcell "27%"
    - row "521 [FRONTEND-1521] Implement code splitting ⚡ Performance Medium Olivia Brown Olivia Brown 8/23/2025 $800 Backlog 0%":
      - gridcell "521"
      - gridcell "[FRONTEND-1521] Implement code splitting"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/23/2025"
      - gridcell "$800"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "733 [UI-1733] Test mobile responsiveness (Sprint 25) 🧪 Testing Critical Amanda White Amanda White 8/5/2025 $7,250 In Progress 39%":
      - gridcell "733"
      - gridcell "[UI-1733] Test mobile responsiveness (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/5/2025"
      - gridcell "$7,250"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "607 [UI-1607] Optimize database queries (Sprint 23) ♻️ Refactor High Amanda White Amanda White 8/12/2025 $4,125 In Review 71%":
      - gridcell "607"
      - gridcell "[UI-1607] Optimize database queries (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/12/2025"
      - gridcell "$4,125"
      - gridcell "In Review"
      - gridcell "71%"
    - row "928 [DASH-1928] Set up monitoring alerts (Sprint 26) 🔧 DevOps Critical Chris Martinez Chris Martinez 8/5/2025 $6,300 Todo 14%":
      - gridcell "928"
      - gridcell "[DASH-1928] Set up monitoring alerts (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/5/2025"
      - gridcell "$6,300"
      - gridcell "Todo"
      - gridcell "14%"
    - row "978 [FRONTEND-1978] Build real-time notifications system (Q1 Goals) ✨ Feature Medium Jessica Lopez Jessica Lopez 8/11/2025 $14,725 Testing 84%":
      - gridcell "978"
      - gridcell "[FRONTEND-1978] Build real-time notifications system (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/11/2025"
      - gridcell "$14,725"
      - gridcell "Testing"
      - gridcell "84%"
    - row "986 [API-1986] Create data visualization charts ✨ Feature Critical Sophia Taylor Sophia Taylor 8/5/2025 $6,025 Backlog 0%":
      - gridcell "986"
      - gridcell "[API-1986] Create data visualization charts"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/5/2025"
      - gridcell "$6,025"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "322 [API-1322] Create backup automation (Performance Sprint) 🔧 DevOps High Olivia Brown Olivia Brown 8/9/2025 $8,925 In Review 67%":
      - gridcell "322"
      - gridcell "[API-1322] Create backup automation (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/9/2025"
      - gridcell "$8,925"
      - gridcell "In Review"
      - gridcell "67%"
    - row "400 [CORE-1400] Implement social media sharing ✨ Feature Critical Sophia Taylor Sophia Taylor 8/3/2025 $17,650 Backlog 0%":
      - gridcell "400"
      - gridcell "[CORE-1400] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/3/2025"
      - gridcell "$17,650"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,305,175 46%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,305,175"
      - gridcell
      - gridcell "46%"
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
- text: Page 1 of 41
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