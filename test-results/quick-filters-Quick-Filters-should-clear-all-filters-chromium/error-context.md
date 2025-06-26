# Test info

- Name: Quick Filters >> should clear all filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:121:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
Expected string: "Overdue"
Received string: "Time period"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').first().locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_a39xr_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Time period"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:134:59
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
- text: "Quick filters:"
- button "Quick filter options":
    - text: Time period
    - img
- button "Quick filter options":
    - text: All Tasks
    - img
- paragraph: Number of Tasks
- paragraph: "572"
- img
- paragraph: Total Budget
- paragraph: $2,576,200
- img
- paragraph: Progress
- paragraph: 32.8%
- img
- paragraph: Budget Remaining
- paragraph: $1,743,597
- img
- text: "Due Date: before Today"
- button "Remove Due Date filter": ×
- text: "Status: Backlog, Todo, In Progress, In Review, Testing, Blocked"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- text: 1 to 25 of 573. Page 1 of 23
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
        - row "465 [FRONTEND-1465] Set up vulnerability scanning (Q2 Planning) 🔒 Security Critical Olivia Brown Olivia Brown 6/23/2025 $6,625 Blocked 27%":
            - gridcell "465"
            - gridcell "[FRONTEND-1465] Set up vulnerability scanning (Q2 Planning)"
            - gridcell "🔒 Security"
            - gridcell "Critical"
            - gridcell "Olivia Brown Olivia Brown":
                - img "Olivia Brown"
                - text: Olivia Brown
            - gridcell "6/23/2025"
            - gridcell "$6,625"
            - gridcell "Blocked"
            - gridcell "27%"
        - row "485 [DATA-1485] Add SQL injection prevention (Sprint 24) 🔒 Security High Marcus Williams Marcus Williams 6/24/2025 $7,750 In Progress 38%":
            - gridcell "485"
            - gridcell "[DATA-1485] Add SQL injection prevention (Sprint 24)"
            - gridcell "🔒 Security"
            - gridcell "High"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/24/2025"
            - gridcell "$7,750"
            - gridcell "In Progress"
            - gridcell "38%"
        - row "723 [AUTH-1723] Build real-time notifications system (Q2 Planning) ✨ Feature Critical Sarah Johnson Sarah Johnson 6/23/2025 $16,075 Blocked 21%":
            - gridcell "723"
            - gridcell "[AUTH-1723] Build real-time notifications system (Q2 Planning)"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "Sarah Johnson Sarah Johnson":
                - img "Sarah Johnson"
                - text: Sarah Johnson
            - gridcell "6/23/2025"
            - gridcell "$16,075"
            - gridcell "Blocked"
            - gridcell "21%"
        - row "24 [CORE-1024] Add visual regression tests 🧪 Testing Critical Jessica Lopez Jessica Lopez 6/23/2025 $9,900 Blocked 34%":
            - gridcell "24"
            - gridcell "[CORE-1024] Add visual regression tests"
            - gridcell "🧪 Testing"
            - gridcell "Critical"
            - gridcell "Jessica Lopez Jessica Lopez":
                - img "Jessica Lopez"
                - text: Jessica Lopez
            - gridcell "6/23/2025"
            - gridcell "$9,900"
            - gridcell "Blocked"
            - gridcell "34%"
        - row "694 [UI-1694] Configure firewall rules (Q1 Goals) 🔒 Security Critical Jessica Lopez Jessica Lopez 6/21/2025 $10,925 In Progress 44%":
            - gridcell "694"
            - gridcell "[UI-1694] Configure firewall rules (Q1 Goals)"
            - gridcell "🔒 Security"
            - gridcell "Critical"
            - gridcell "Jessica Lopez Jessica Lopez":
                - img "Jessica Lopez"
                - text: Jessica Lopez
            - gridcell "6/21/2025"
            - gridcell "$10,925"
            - gridcell "In Progress"
            - gridcell "44%"
        - row "33 [USER-1033] Modernize legacy jQuery code (Sprint 23) ♻️ Refactor High Olivia Brown Olivia Brown 6/24/2025 $9,950 Blocked 17%":
            - gridcell "33"
            - gridcell "[USER-1033] Modernize legacy jQuery code (Sprint 23)"
            - gridcell "♻️ Refactor"
            - gridcell "High"
            - gridcell "Olivia Brown Olivia Brown":
                - img "Olivia Brown"
                - text: Olivia Brown
            - gridcell "6/24/2025"
            - gridcell "$9,950"
            - gridcell "Blocked"
            - gridcell "17%"
        - row "543 [FRONTEND-1543] Handle null pointer exception in API client (Sprint 27) 🐛 Bug Critical Michael Anderson Michael Anderson 6/21/2025 $5,075 Blocked 37%":
            - gridcell "543"
            - gridcell "[FRONTEND-1543] Handle null pointer exception in API client (Sprint 27)"
            - gridcell "🐛 Bug"
            - gridcell "Critical"
            - gridcell "Michael Anderson Michael Anderson":
                - img "Michael Anderson"
                - text: Michael Anderson
            - gridcell "6/21/2025"
            - gridcell "$5,075"
            - gridcell "Blocked"
            - gridcell "37%"
        - row "645 [APP-1645] Add internationalization tests (Sprint 23) 🧪 Testing High Priya Sharma Priya Sharma 6/22/2025 $8,475 In Progress 46%":
            - gridcell "645"
            - gridcell "[APP-1645] Add internationalization tests (Sprint 23)"
            - gridcell "🧪 Testing"
            - gridcell "High"
            - gridcell "Priya Sharma Priya Sharma":
                - img "Priya Sharma"
                - text: Priya Sharma
            - gridcell "6/22/2025"
            - gridcell "$8,475"
            - gridcell "In Progress"
            - gridcell "46%"
        - row "46 [MOBILE-1046] Implement blue-green deployment (Tech Debt) 🔧 DevOps High David Lee David Lee 6/22/2025 $700 In Progress 20%":
            - gridcell "46"
            - gridcell "[MOBILE-1046] Implement blue-green deployment (Tech Debt)"
            - gridcell "🔧 DevOps"
            - gridcell "High"
            - gridcell "David Lee David Lee":
                - img "David Lee"
                - text: David Lee
            - gridcell "6/22/2025"
            - gridcell "$700"
            - gridcell "In Progress"
            - gridcell "20%"
        - row "278 [AUTH-1278] Debug WebSocket connection timeout (Sprint 25) 🐛 Bug High Emily Jackson Emily Jackson 6/21/2025 $3,125 Blocked 28%":
            - gridcell "278"
            - gridcell "[AUTH-1278] Debug WebSocket connection timeout (Sprint 25)"
            - gridcell "🐛 Bug"
            - gridcell "High"
            - gridcell "Emily Jackson Emily Jackson":
                - img "Emily Jackson"
                - text: Emily Jackson
            - gridcell "6/21/2025"
            - gridcell "$3,125"
            - gridcell "Blocked"
            - gridcell "28%"
        - row "423 [USER-1423] Implement auto-scaling (Sprint 26) 🔧 DevOps Critical Amanda White Amanda White 6/19/2025 $1,475 In Progress 45%":
            - gridcell "423"
            - gridcell "[USER-1423] Implement auto-scaling (Sprint 26)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Amanda White Amanda White":
                - img "Amanda White"
                - text: Amanda White
            - gridcell "6/19/2025"
            - gridcell "$1,475"
            - gridcell "In Progress"
            - gridcell "45%"
        - row "778 [PROJ-1778] Add progressive web app features ⚡ Performance High Emma Davis Emma Davis 6/23/2025 $1,775 In Progress 25%":
            - gridcell "778"
            - gridcell "[PROJ-1778] Add progressive web app features"
            - gridcell "⚡ Performance"
            - gridcell "High"
            - gridcell "Emma Davis Emma Davis":
                - img "Emma Davis"
                - text: Emma Davis
            - gridcell "6/23/2025"
            - gridcell "$1,775"
            - gridcell "In Progress"
            - gridcell "25%"
        - row "43 [UI-1043] Fix responsive layout on tablets (Security Audit) 🐛 Bug High Daniel Kim Daniel Kim 6/18/2025 $450 In Progress 56%":
            - gridcell "43"
            - gridcell "[UI-1043] Fix responsive layout on tablets (Security Audit)"
            - gridcell "🐛 Bug"
            - gridcell "High"
            - gridcell "Daniel Kim Daniel Kim":
                - img "Daniel Kim"
                - text: Daniel Kim
            - gridcell "6/18/2025"
            - gridcell "$450"
            - gridcell "In Progress"
            - gridcell "56%"
        - row "66 [FRONTEND-1066] Add E2E tests for checkout flow (Sprint 26) 🧪 Testing High Emily Jackson Emily Jackson 6/22/2025 $4,325 In Progress 31%":
            - gridcell "66"
            - gridcell "[FRONTEND-1066] Add E2E tests for checkout flow (Sprint 26)"
            - gridcell "🧪 Testing"
            - gridcell "High"
            - gridcell "Emily Jackson Emily Jackson":
                - img "Emily Jackson"
                - text: Emily Jackson
            - gridcell "6/22/2025"
            - gridcell "$4,325"
            - gridcell "In Progress"
            - gridcell "31%"
    - rowgroup
    - rowgroup
    - rowgroup
    - rowgroup:
        - row "$2,576,200 33%":
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell "$2,576,200"
            - gridcell
            - gridcell "33%"
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
- text: Page 1 of 23
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
   34 |     // Click on the first quick filter dropdown
   35 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   36 |     await firstDropdown.locator("button").first().click();
   37 |
   38 |     // Wait for dropdown menu to be visible
   39 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   40 |
   41 |     // Select "This Month"
   42 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
   43 |
   44 |     // Verify the dropdown shows the new selection
   45 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
   46 |
   47 |     // Verify row count changed
   48 |     const rowCount = await page.locator(".ag-row").count();
   49 |     expect(rowCount).toBeGreaterThan(0);
   50 |   });
   51 |
   52 |   test("should filter by Overdue tasks", async ({ page }) => {
   53 |     // Click on the first quick filter dropdown
   54 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   55 |     await firstDropdown.locator("button").first().click();
   56 |
   57 |     // Select "Overdue"
   58 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
   59 |
   60 |     // Verify the dropdown shows the new selection
   61 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
   62 |
   63 |     // Verify that no "Done" status tasks are shown
   64 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   65 |
   66 |     // Check that none of the visible statuses are "Done"
   67 |     for (const status of statusCells) {
   68 |       expect(status).not.toBe("Done");
   69 |     }
   70 |   });
   71 |
   72 |   test("should filter by Not Started tasks", async ({ page }) => {
   73 |     // Click on the first quick filter dropdown
   74 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
   75 |     await firstDropdown.locator("button").first().click();
   76 |
   77 |     // Select "Not Started"
   78 |     await page.locator('[role="option"]').filter({ hasText: "Not Started" }).click();
   79 |
   80 |     // Verify the dropdown shows the new selection
   81 |     await expect(firstDropdown.locator("button").first()).toContainText("Not Started");
   82 |
   83 |     // Verify that only "Backlog" or "Todo" status tasks are shown
   84 |     const statusCells = await page.locator('.ag-cell[col-id="status"]').allTextContents();
   85 |
   86 |     // Check that all visible statuses are either "Backlog" or "Todo"
   87 |     for (const status of statusCells) {
   88 |       expect(["Backlog", "Todo"]).toContain(status);
   89 |     }
   90 |   });
   91 |
   92 |   test("should filter by task type", async ({ page }) => {
   93 |     // Click on the second quick filter dropdown (task type)
   94 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
   95 |     await secondDropdown.locator("button").first().click();
   96 |
   97 |     // Wait for dropdown menu to be visible
   98 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   99 |
  100 |     // Select "Critical Bugs"
  101 |     await page.locator('[role="option"]').filter({ hasText: "Critical Bugs" }).click();
  102 |
  103 |     // Verify the dropdown shows the new selection
  104 |     await expect(secondDropdown.locator("button").first()).toContainText("Critical Bugs");
  105 |
  106 |     // Verify that only Bug category with Critical/High priority are shown
  107 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  108 |     const priorityCells = await page.locator('.ag-cell[col-id="priority"]').allTextContents();
  109 |
  110 |     // Check categories are all "Bug"
  111 |     for (const category of categoryCells) {
  112 |       expect(category).toBe("Bug");
  113 |     }
  114 |
  115 |     // Check priorities are either "Critical" or "High"
  116 |     for (const priority of priorityCells) {
  117 |       expect(["Critical", "High"]).toContain(priority);
  118 |     }
  119 |   });
  120 |
  121 |   test("should clear all filters", async ({ page }) => {
  122 |     // Wait for default filter first
  123 |     await page.waitForTimeout(1500);
  124 |
  125 |     // Apply another filter
  126 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  127 |     await firstDropdown.locator("button").first().click();
  128 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  129 |
  130 |     // Wait for filter to apply
  131 |     await page.waitForTimeout(1000);
  132 |
  133 |     // Verify filter is applied
> 134 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
      |                                                           ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  135 |
  136 |     // Clear the filter by selecting "All Time"
  137 |     await firstDropdown.locator("button").first().click();
  138 |     await page.locator('[role="option"]').filter({ hasText: "All Time" }).click();
  139 |
  140 |     // Wait for filter to clear
  141 |     await page.waitForTimeout(1000);
  142 |
  143 |     // Verify the dropdown shows "All Time"
  144 |     await expect(firstDropdown.locator("button").first()).toContainText("All Time");
  145 |
  146 |     // Active filters should not be visible
  147 |     const activeFilters = page.locator('[data-testid="active-filters"]');
  148 |     await expect(activeFilters).not.toBeVisible();
  149 |   });
  150 |
  151 |   test("should combine time and task type filters", async ({ page }) => {
  152 |     // Apply time filter
  153 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  154 |     await firstDropdown.locator("button").first().click();
  155 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
  156 |
  157 |     // Apply task type filter
  158 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
  159 |     await secondDropdown.locator("button").first().click();
  160 |     await page.locator('[role="option"]').filter({ hasText: "Features" }).click();
  161 |
  162 |     // Verify both filters are applied
  163 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
  164 |     await expect(secondDropdown.locator("button").first()).toContainText("Features");
  165 |
  166 |     // Verify that only Feature category tasks are shown
  167 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  168 |     for (const category of categoryCells) {
  169 |       expect(category).toBe("Feature");
  170 |     }
  171 |
  172 |     // There should be fewer rows due to combined filters
  173 |     const rowCount = await page.locator(".ag-row").count();
  174 |     expect(rowCount).toBeGreaterThan(0);
  175 |     expect(rowCount).toBeLessThan(10); // Combined filters should show very few rows
  176 |   });
  177 |
  178 |   test("should update stats when filters are applied", async ({ page }) => {
  179 |     // Get initial task count
  180 |     const initialTaskCount = await page.locator('p:has-text("Number of Tasks") + p').textContent();
  181 |     const initialCount = parseInt(initialTaskCount?.replace(/,/g, "") || "0");
  182 |
  183 |     // Apply a filter
  184 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  185 |     await firstDropdown.locator("button").first().click();
  186 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  187 |
  188 |     // Wait for grid to update
  189 |     await page.waitForTimeout(500);
  190 |
  191 |     // Get new task count
  192 |     const newTaskCount = await page.locator('p:has-text("Number of Tasks") + p').textContent();
  193 |     const newCount = parseInt(newTaskCount?.replace(/,/g, "") || "0");
  194 |
  195 |     // Task count should decrease when filter is applied
  196 |     expect(newCount).toBeLessThan(initialCount);
  197 |     expect(newCount).toBeGreaterThan(0);
  198 |   });
  199 | });
```
