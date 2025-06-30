# Test info

- Name: Quick Filters >> should filter by Not Started tasks
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:92:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: ""
Received array: ["Backlog", "Todo"]
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:117:35
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
  - text: Not Started
  - img
- button "Quick filter options":
  - text: Task type
  - img
- text: "Due Date: before Today"
- button "Remove Due Date filter": ×
- text: "Status: Backlog, Todo"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "30"
- img
- paragraph: Total Budget
- paragraph: $123,875
- img
- paragraph: Progress
- paragraph: 6.6%
- img
- paragraph: Budget Remaining
- paragraph: $117,582
- text: 1 to 25 of 31. Page 1 of 2
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
    - row "796 [MOBILE-1796] Write deployment guide (Sprint 26) 📝 Documentation High Olivia Brown Olivia Brown 6/27/2025 $725 Backlog 0%":
      - gridcell "796"
      - gridcell "[MOBILE-1796] Write deployment guide (Sprint 26)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/27/2025"
      - gridcell "$725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "111 [ADMIN-1111] Create architecture overview (Performance Sprint) 📝 Documentation Critical Sarah Johnson Sarah Johnson 6/23/2025 $16,125 Backlog 0%":
      - gridcell "111"
      - gridcell "[ADMIN-1111] Create architecture overview (Performance Sprint)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/23/2025"
      - gridcell "$16,125"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "179 [USER-1179] Implement virtual scrolling ⚡ Performance Critical James Wilson James Wilson 6/19/2025 $3,150 Todo 16%":
      - gridcell "179"
      - gridcell "[USER-1179] Implement virtual scrolling"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/19/2025"
      - gridcell "$3,150"
      - gridcell "Todo"
      - gridcell "16%"
    - row "966 [ADMIN-1966] Correct CSS overflow in sidebar (Sprint 26) 🐛 Bug High David Lee David Lee 6/19/2025 $3,575 Backlog 0%":
      - gridcell "966"
      - gridcell "[ADMIN-1966] Correct CSS overflow in sidebar (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/19/2025"
      - gridcell "$3,575"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "54 [API-1054] Optimize bundle size (Q1 Goals) ⚡ Performance Medium Maya Patel Maya Patel 6/24/2025 $500 Todo 5%":
      - gridcell "54"
      - gridcell "[API-1054] Optimize bundle size (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/24/2025"
      - gridcell "$500"
      - gridcell "Todo"
      - gridcell "5%"
    - row "487 [INFRA-1487] Implement lazy loading ⚡ Performance Critical Sarah Johnson Sarah Johnson 6/13/2025 $325 Todo 14%":
      - gridcell "487"
      - gridcell "[INFRA-1487] Implement lazy loading"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/13/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "14%"
    - row "670 [USER-1670] Implement OAuth integration (Sprint 27) ✨ Feature High Amanda White Amanda White 6/8/2025 $875 Todo 12%":
      - gridcell "670"
      - gridcell "[USER-1670] Implement OAuth integration (Sprint 27)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/8/2025"
      - gridcell "$875"
      - gridcell "Todo"
      - gridcell "12%"
    - row "793 [AUTH-1793] Refactor error handling (Sprint 26) ♻️ Refactor Low Ryan Thomas Ryan Thomas 6/15/2025 $975 Backlog 0%":
      - gridcell "793"
      - gridcell "[AUTH-1793] Refactor error handling (Sprint 26)"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/15/2025"
      - gridcell "$975"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "657 [INFRA-1657] Implement blue-green deployment (Tech Debt) 🔧 DevOps Low Olivia Brown Olivia Brown 6/19/2025 $7,150 Todo 10%":
      - gridcell "657"
      - gridcell "[INFRA-1657] Implement blue-green deployment (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/19/2025"
      - gridcell "$7,150"
      - gridcell "Todo"
      - gridcell "10%"
    - row "342 [PROJ-1342] Set up log aggregation (Sprint 23) 🔧 DevOps Medium Maya Patel Maya Patel 6/12/2025 $3,100 Backlog 0%":
      - gridcell "342"
      - gridcell "[PROJ-1342] Set up log aggregation (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/12/2025"
      - gridcell "$3,100"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "753 [DASH-1753] Set up infrastructure as code (Tech Debt) 🔧 DevOps Medium John Robinson John Robinson 6/9/2025 $100 Todo 15%":
      - gridcell "753"
      - gridcell "[DASH-1753] Set up infrastructure as code (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/9/2025"
      - gridcell "$100"
      - gridcell "Todo"
      - gridcell "15%"
    - row "461 [ADMIN-1461] Implement OAuth integration ✨ Feature Low John Robinson John Robinson 6/27/2025 $8,800 Backlog 0%":
      - gridcell "461"
      - gridcell "[ADMIN-1461] Implement OAuth integration"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/27/2025"
      - gridcell "$8,800"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "524 [API-1524] Optimize database queries (Tech Debt) ⚡ Performance High Sophia Taylor Sophia Taylor 5/28/2025 $500 Backlog 0%":
      - gridcell "524"
      - gridcell "[API-1524] Optimize database queries (Tech Debt)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "5/28/2025"
      - gridcell "$500"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "528 [USER-1528] Set up CI/CD pipeline (Q2 Planning) 🔧 DevOps Critical Emma Davis Emma Davis 5/24/2025 $6,175 Backlog 0%":
      - gridcell "528"
      - gridcell "[USER-1528] Set up CI/CD pipeline (Q2 Planning)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "5/24/2025"
      - gridcell "$6,175"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "170 [CORE-1170] Extract shared utilities module (Tech Debt) ♻️ Refactor Critical Priya Sharma Priya Sharma 5/23/2025 $17,025 Todo 13%":
      - gridcell "170"
      - gridcell "[CORE-1170] Extract shared utilities module (Tech Debt)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "5/23/2025"
      - gridcell "$17,025"
      - gridcell "Todo"
      - gridcell "13%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$123,875 7%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$123,875"
      - gridcell
      - gridcell "7%"
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
  103 |       .click();
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
> 117 |       expect(["Backlog", "Todo"]).toContain(status);
      |                                   ^ Error: expect(received).toContain(expected) // indexOf
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
  204 |     // Apply time filter
  205 |     const firstDropdown = page
  206 |       .locator('[data-testid="quick-filter-dropdown"]')
  207 |       .first();
  208 |     await firstDropdown.locator("button").first().click();
  209 |     await page
  210 |       .locator('[role="option"]')
  211 |       .filter({ hasText: "This Month" })
  212 |       .click();
  213 |
  214 |     // Apply task type filter
  215 |     const secondDropdown = page
  216 |       .locator('[data-testid="quick-filter-dropdown"]')
  217 |       .nth(1);
```