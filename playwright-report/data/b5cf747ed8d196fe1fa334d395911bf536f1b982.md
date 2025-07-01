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
- paragraph: "10"
- img
- paragraph: Total Budget
- paragraph: $13,150
- img
- paragraph: Progress
- paragraph: 5.7%
- img
- paragraph: Budget Remaining
- paragraph: $12,117
- text: 1 to 11 of 11. Page 1 of 1
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
    - row "186 [WEB-1186] Set up infrastructure as code (Q1 Goals) 🔧 DevOps Critical Alex Chen Alex Chen 6/25/2025 $75 Backlog 0%":
      - gridcell "186"
      - gridcell "[WEB-1186] Set up infrastructure as code (Q1 Goals)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/25/2025"
      - gridcell "$75"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "505 [API-1505] Debug crash on mobile Safari (Sprint 23) 🐛 Bug Medium Marcus Williams Marcus Williams 6/22/2025 $75 Todo 19%":
      - gridcell "505"
      - gridcell "[API-1505] Debug crash on mobile Safari (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/22/2025"
      - gridcell "$75"
      - gridcell "Todo"
      - gridcell "19%"
    - row "850 [PROJ-1850] Configure firewall rules (Performance Sprint) 🔒 Security High Olivia Brown Olivia Brown 5/18/2025 $475 Todo 12%":
      - gridcell "850"
      - gridcell "[PROJ-1850] Configure firewall rules (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "5/18/2025"
      - gridcell "$475"
      - gridcell "Todo"
      - gridcell "12%"
    - row "704 [WEB-1704] Resolve race condition in state update (Sprint 27) 🐛 Bug Low Maya Patel Maya Patel 5/25/2025 $450 Backlog 0%":
      - gridcell "704"
      - gridcell "[WEB-1704] Resolve race condition in state update (Sprint 27)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "5/25/2025"
      - gridcell "$450"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "767 [INFRA-1767] Migrate to new testing framework ♻️ Refactor Medium Kevin Zhang Kevin Zhang 5/21/2025 $2,900 Backlog 0%":
      - gridcell "767"
      - gridcell "[INFRA-1767] Migrate to new testing framework"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "5/21/2025"
      - gridcell "$2,900"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "629 [PROJ-1629] Configure Docker containers (Sprint 26) 🔧 DevOps High Sophia Taylor Sophia Taylor 5/12/2025 $1,900 Todo 10%":
      - gridcell "629"
      - gridcell "[PROJ-1629] Configure Docker containers (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "5/12/2025"
      - gridcell "$1,900"
      - gridcell "Todo"
      - gridcell "10%"
    - row "451 [PROJ-1451] Split monolithic components ♻️ Refactor Critical Michael Anderson Michael Anderson 4/28/2025 $375 Backlog 0%":
      - gridcell "451"
      - gridcell "[PROJ-1451] Split monolithic components"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "4/28/2025"
      - gridcell "$375"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "723 [AUTH-1723] Correct data corruption in cache layer (Sprint 27) 🐛 Bug Low John Robinson John Robinson 5/14/2025 $550 Backlog 0%":
      - gridcell "723"
      - gridcell "[AUTH-1723] Correct data corruption in cache layer (Sprint 27)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "5/14/2025"
      - gridcell "$550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "296 [BACKEND-1296] Create load testing scenarios (Sprint 23) 🧪 Testing Medium Kevin Zhang Kevin Zhang 5/10/2025 $4,825 Todo 16%":
      - gridcell "296"
      - gridcell "[BACKEND-1296] Create load testing scenarios (Sprint 23)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "5/10/2025"
      - gridcell "$4,825"
      - gridcell "Todo"
      - gridcell "16%"
    - row "668 [API-1668] Document error handling patterns (Performance Sprint) 📝 Documentation High Sophia Taylor Sophia Taylor 4/20/2025 $1,525 Backlog 0%":
      - gridcell "668"
      - gridcell "[API-1668] Document error handling patterns (Performance Sprint)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "4/20/2025"
      - gridcell "$1,525"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$13,150 6%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$13,150"
      - gridcell
      - gridcell "6%"
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
- text: Page 1 of 1
- button "Next Page" [disabled]: 
- button "Last Page" [disabled]: 
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