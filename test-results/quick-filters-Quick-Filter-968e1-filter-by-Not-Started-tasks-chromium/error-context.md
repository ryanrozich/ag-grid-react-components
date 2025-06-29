# Test info

- Name: Quick Filters >> should filter by Not Started tasks
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:92:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="option"]').filter({ hasText: 'Not Started' })
    - locator resolved to <button type="button" role="option" aria-selected="false" class="_option_aaln3_132  " data-testid="quick-filter-option-notStarted">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-ref="eText" class="ag-header-cell-text">Due Date</span> from <div class="flex-1 bg-gray-900/50 rounded-xl border border-gray-800 flex flex-col">…</div> subtree intercepts pointer events
  52 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-ref="eText" class="ag-header-cell-text">Due Date</span> from <div class="flex-1 bg-gray-900/50 rounded-xl border border-gray-800 flex flex-col">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:103:8
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
- button "Quick filter options" [expanded]:
  - text: All Time
  - img
- listbox "Quick filter options":
  - option "All Time" [selected]:
    - text: All Time
    - img
  - option "Last 7 Days"
  - option "This Month"
  - option "Overdue"
  - option "Not Started"
- button "Quick filter options":
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "55"
- img
- paragraph: Total Budget
- paragraph: $239,625
- img
- paragraph: Progress
- paragraph: 47.3%
- img
- paragraph: Budget Remaining
- paragraph: $130,419
- text: 1 to 25 of 56. Page 1 of 3
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
    - row "821 [UI-1821] Add input sanitization (Tech Debt) 🔒 Security Critical Michael Anderson Michael Anderson 6/27/2025 $9,200 Testing 87%":
      - gridcell "821"
      - gridcell "[UI-1821] Add input sanitization (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/27/2025"
      - gridcell "$9,200"
      - gridcell "Testing"
      - gridcell "87%"
    - row "158 [USER-1158] Optimize bundle size (Tech Debt) ⚡ Performance High James Wilson James Wilson 6/27/2025 $1,575 In Review 66%":
      - gridcell "158"
      - gridcell "[USER-1158] Optimize bundle size (Tech Debt)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/27/2025"
      - gridcell "$1,575"
      - gridcell "In Review"
      - gridcell "66%"
    - row "569 [CORE-1569] Fix login form validation error 🐛 Bug High Jessica Lopez Jessica Lopez 6/27/2025 $7,350 Blocked 18%":
      - gridcell "569"
      - gridcell "[CORE-1569] Fix login form validation error"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/27/2025"
      - gridcell "$7,350"
      - gridcell "Blocked"
      - gridcell "18%"
    - row "931 [ADMIN-1931] Document new filter components (Sprint 27) 📝 Documentation Critical Marcus Williams Marcus Williams 6/27/2025 $825 Backlog 0%":
      - gridcell "931"
      - gridcell "[ADMIN-1931] Document new filter components (Sprint 27)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/27/2025"
      - gridcell "$825"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "109 [AUTH-1109] Set up penetration testing (Sprint 24) 🔒 Security Critical John Robinson John Robinson 6/23/2025 $19,075 In Progress 25%":
      - gridcell "109"
      - gridcell "[AUTH-1109] Set up penetration testing (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/23/2025"
      - gridcell "$19,075"
      - gridcell "In Progress"
      - gridcell "25%"
    - row "359 [WEB-1359] Test offline functionality 🧪 Testing Critical John Robinson John Robinson 6/24/2025 $4,075 Blocked 32%":
      - gridcell "359"
      - gridcell "[WEB-1359] Test offline functionality"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/24/2025"
      - gridcell "$4,075"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "791 [FRONTEND-1791] Write performance optimization tips 📝 Documentation Critical Emma Davis Emma Davis 6/24/2025 $1,950 In Progress 38%":
      - gridcell "791"
      - gridcell "[FRONTEND-1791] Write performance optimization tips"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/24/2025"
      - gridcell "$1,950"
      - gridcell "In Progress"
      - gridcell "38%"
    - row "877 [UI-1877] Implement service workers (Sprint 26) ⚡ Performance Critical Emily Jackson Emily Jackson 6/24/2025 $300 Backlog 0%":
      - gridcell "877"
      - gridcell "[UI-1877] Implement service workers (Sprint 26)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/24/2025"
      - gridcell "$300"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "889 [MOBILE-1889] Add input sanitization (Q1 Goals) 🔒 Security High Kevin Zhang Kevin Zhang 6/26/2025 $3,925 Blocked 19%":
      - gridcell "889"
      - gridcell "[MOBILE-1889] Add input sanitization (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/26/2025"
      - gridcell "$3,925"
      - gridcell "Blocked"
      - gridcell "19%"
    - row "535 [INFRA-1535] Debug crash on mobile Safari (Performance Sprint) 🐛 Bug High Chris Martinez Chris Martinez 6/26/2025 $725 In Progress 26%":
      - gridcell "535"
      - gridcell "[INFRA-1535] Debug crash on mobile Safari (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/26/2025"
      - gridcell "$725"
      - gridcell "In Progress"
      - gridcell "26%"
    - row "732 [USER-1732] Test cross-browser compatibility (Q1 Goals) 🧪 Testing Critical James Wilson James Wilson 6/24/2025 $4,275 In Progress 48%":
      - gridcell "732"
      - gridcell "[USER-1732] Test cross-browser compatibility (Q1 Goals)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/24/2025"
      - gridcell "$4,275"
      - gridcell "In Progress"
      - gridcell "48%"
    - row "781 [ADMIN-1781] Fix infinite scroll pagination bug (Sprint 24) 🐛 Bug Medium Daniel Kim Daniel Kim 6/25/2025 $11,400 Blocked 35%":
      - gridcell "781"
      - gridcell "[ADMIN-1781] Fix infinite scroll pagination bug (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "6/25/2025"
      - gridcell "$11,400"
      - gridcell "Blocked"
      - gridcell "35%"
    - row "462 [INFRA-1462] Document error handling patterns 📝 Documentation High Chris Martinez Chris Martinez 6/27/2025 $450 Blocked 21%":
      - gridcell "462"
      - gridcell "[INFRA-1462] Document error handling patterns"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/27/2025"
      - gridcell "$450"
      - gridcell "Blocked"
      - gridcell "21%"
    - row "621 [USER-1621] Add drag-and-drop file upload ✨ Feature Critical Olivia Brown Olivia Brown 6/23/2025 $3,275 In Progress 52%":
      - gridcell "621"
      - gridcell "[USER-1621] Add drag-and-drop file upload"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/23/2025"
      - gridcell "$3,275"
      - gridcell "In Progress"
      - gridcell "52%"
    - row "480 [WEB-1480] Create onboarding tutorial (Sprint 24) 📝 Documentation High Olivia Brown Olivia Brown 6/26/2025 $2,575 Blocked 15%":
      - gridcell "480"
      - gridcell "[WEB-1480] Create onboarding tutorial (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/26/2025"
      - gridcell "$2,575"
      - gridcell "Blocked"
      - gridcell "15%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$239,625 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$239,625"
      - gridcell
      - gridcell "47%"
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
- text: Page 1 of 3
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
   3 | test.describe("Quick Filters", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for the grid to be ready
   9 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
   10 |
   11 |     // Wait for data to load
   12 |     await page.waitForTimeout(1000);
   13 |   });
   14 |
   15 |   test("should have default filter applied on load", async ({ page }) => {
   16 |     // Wait a bit for the default filter to be applied
   17 |     await page.waitForTimeout(1500);
   18 |
   19 |     // Check that the first quick filter dropdown shows "Last 7 Days" as selected
   20 |     const firstDropdown = page
   21 |       .locator('[data-testid="quick-filter-dropdown"]')
   22 |       .first();
   23 |     await expect(firstDropdown.locator("button").first()).toContainText(
   24 |       "Last 7 Days",
   25 |     );
   26 |
   27 |     // Check that there are active filters displayed
   28 |     const activeFilters = page.locator('[data-testid="active-filters"]');
   29 |     await expect(activeFilters).toBeVisible();
   30 |
   31 |     // Verify the filter is working by checking row count
   32 |     const rowCount = await page.locator(".ag-row").count();
   33 |     expect(rowCount).toBeGreaterThan(0);
   34 |     expect(rowCount).toBeLessThan(25); // Should be filtered, not showing all 1000 rows
   35 |   });
   36 |
   37 |   test("should filter by time period", async ({ page }) => {
   38 |     // Click on the first quick filter dropdown
   39 |     const firstDropdown = page
   40 |       .locator('[data-testid="quick-filter-dropdown"]')
   41 |       .first();
   42 |     await firstDropdown.locator("button").first().click();
   43 |
   44 |     // Wait for dropdown menu to be visible
   45 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   46 |
   47 |     // Select "This Month"
   48 |     await page
   49 |       .locator('[role="option"]')
   50 |       .filter({ hasText: "This Month" })
   51 |       .click();
   52 |
   53 |     // Verify the dropdown shows the new selection
   54 |     await expect(firstDropdown.locator("button").first()).toContainText(
   55 |       "This Month",
   56 |     );
   57 |
   58 |     // Verify row count changed
   59 |     const rowCount = await page.locator(".ag-row").count();
   60 |     expect(rowCount).toBeGreaterThan(0);
   61 |   });
   62 |
   63 |   test("should filter by Overdue tasks", async ({ page }) => {
   64 |     // Click on the first quick filter dropdown
   65 |     const firstDropdown = page
   66 |       .locator('[data-testid="quick-filter-dropdown"]')
   67 |       .first();
   68 |     await firstDropdown.locator("button").first().click();
   69 |
   70 |     // Select "Overdue"
   71 |     await page
   72 |       .locator('[role="option"]')
   73 |       .filter({ hasText: "Overdue" })
   74 |       .click();
   75 |
   76 |     // Verify the dropdown shows the new selection
   77 |     await expect(firstDropdown.locator("button").first()).toContainText(
   78 |       "Overdue",
   79 |     );
   80 |
   81 |     // Verify that no "Done" status tasks are shown
   82 |     const statusCells = await page
   83 |       .locator('.ag-cell[col-id="status"]')
   84 |       .allTextContents();
   85 |
   86 |     // Check that none of the visible statuses are "Done"
   87 |     for (const status of statusCells) {
   88 |       expect(status).not.toBe("Done");
   89 |     }
   90 |   });
   91 |
   92 |   test("should filter by Not Started tasks", async ({ page }) => {
   93 |     // Click on the first quick filter dropdown
   94 |     const firstDropdown = page
   95 |       .locator('[data-testid="quick-filter-dropdown"]')
   96 |       .first();
   97 |     await firstDropdown.locator("button").first().click();
   98 |
   99 |     // Select "Not Started"
  100 |     await page
  101 |       .locator('[role="option"]')
  102 |       .filter({ hasText: "Not Started" })
> 103 |       .click();
      |        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  104 |
  105 |     // Verify the dropdown shows the new selection
  106 |     await expect(firstDropdown.locator("button").first()).toContainText(
  107 |       "Not Started",
  108 |     );
  109 |
  110 |     // Verify that only "Backlog" or "Todo" status tasks are shown
  111 |     const statusCells = await page
  112 |       .locator('.ag-cell[col-id="status"]')
  113 |       .allTextContents();
  114 |
  115 |     // Check that all visible statuses are either "Backlog" or "Todo"
  116 |     for (const status of statusCells) {
  117 |       expect(["Backlog", "Todo"]).toContain(status);
  118 |     }
  119 |   });
  120 |
  121 |   test("should filter by task type", async ({ page }) => {
  122 |     // Click on the second quick filter dropdown (task type)
  123 |     const secondDropdown = page
  124 |       .locator('[data-testid="quick-filter-dropdown"]')
  125 |       .nth(1);
  126 |     await secondDropdown.locator("button").first().click();
  127 |
  128 |     // Wait for dropdown menu to be visible
  129 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
  130 |
  131 |     // Select "Critical Bugs"
  132 |     await page
  133 |       .locator('[role="option"]')
  134 |       .filter({ hasText: "Critical Bugs" })
  135 |       .click();
  136 |
  137 |     // Verify the dropdown shows the new selection
  138 |     await expect(secondDropdown.locator("button").first()).toContainText(
  139 |       "Critical Bugs",
  140 |     );
  141 |
  142 |     // Verify that only Bug category with Critical/High priority are shown
  143 |     const categoryCells = await page
  144 |       .locator('.ag-cell[col-id="category"]')
  145 |       .allTextContents();
  146 |     const priorityCells = await page
  147 |       .locator('.ag-cell[col-id="priority"]')
  148 |       .allTextContents();
  149 |
  150 |     // Check categories are all "Bug"
  151 |     for (const category of categoryCells) {
  152 |       expect(category).toBe("Bug");
  153 |     }
  154 |
  155 |     // Check priorities are either "Critical" or "High"
  156 |     for (const priority of priorityCells) {
  157 |       expect(["Critical", "High"]).toContain(priority);
  158 |     }
  159 |   });
  160 |
  161 |   test("should clear all filters", async ({ page }) => {
  162 |     // Wait for default filter first
  163 |     await page.waitForTimeout(1500);
  164 |
  165 |     // Apply another filter
  166 |     const firstDropdown = page
  167 |       .locator('[data-testid="quick-filter-dropdown"]')
  168 |       .first();
  169 |     await firstDropdown.locator("button").first().click();
  170 |     await page
  171 |       .locator('[role="option"]')
  172 |       .filter({ hasText: "Overdue" })
  173 |       .click();
  174 |
  175 |     // Wait for filter to apply
  176 |     await page.waitForTimeout(1000);
  177 |
  178 |     // Verify filter is applied
  179 |     await expect(firstDropdown.locator("button").first()).toContainText(
  180 |       "Overdue",
  181 |     );
  182 |
  183 |     // Clear the filter by selecting "All Time"
  184 |     await firstDropdown.locator("button").first().click();
  185 |     await page
  186 |       .locator('[role="option"]')
  187 |       .filter({ hasText: "All Time" })
  188 |       .click();
  189 |
  190 |     // Wait for filter to clear
  191 |     await page.waitForTimeout(1000);
  192 |
  193 |     // Verify the dropdown shows "All Time"
  194 |     await expect(firstDropdown.locator("button").first()).toContainText(
  195 |       "All Time",
  196 |     );
  197 |
  198 |     // Active filters should not be visible
  199 |     const activeFilters = page.locator('[data-testid="active-filters"]');
  200 |     await expect(activeFilters).not.toBeVisible();
  201 |   });
  202 |
  203 |   test("should combine time and task type filters", async ({ page }) => {
```