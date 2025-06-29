# Test info

- Name: Quick Filters >> should filter by task type
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:121:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
Expected string: "Critical Bugs"
Received string: "All Tasks"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" aria-controls="quick-filter-dropdown" class="_trigger_aaln3_8 _triggerActive_aaln3_37">…</button>
      - unexpected value "All Tasks"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:138:60
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
- text: "Category: Bug"
- button "Remove Category filter": ×
- text: "Priority: Critical, High"
- button "Remove Priority filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "3"
- img
- paragraph: Total Budget
- paragraph: $9,900
- img
- paragraph: Progress
- paragraph: 35.0%
- img
- paragraph: Budget Remaining
- paragraph: $6,479
- text: 1 to 4 of 4. Page 1 of 1
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
    - row "454 [MOBILE-1454] Correct data corruption in cache layer 🐛 Bug Critical Marcus Williams Marcus Williams 6/23/2025 $4,700 In Progress 56%":
      - gridcell "454"
      - gridcell "[MOBILE-1454] Correct data corruption in cache layer"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/23/2025"
      - gridcell "$4,700"
      - gridcell "In Progress"
      - gridcell "56%"
    - row "844 [ADMIN-1844] Debug performance regression in search (Sprint 25) 🐛 Bug Critical David Lee David Lee 6/23/2025 $4,275 Blocked 10%":
      - gridcell "844"
      - gridcell "[ADMIN-1844] Debug performance regression in search (Sprint 25)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/23/2025"
      - gridcell "$4,275"
      - gridcell "Blocked"
      - gridcell "10%"
    - row "117 [APP-1117] Fix broken deep links in navigation 🐛 Bug Critical Ryan Thomas Ryan Thomas 6/22/2025 $925 In Progress 39%":
      - gridcell "117"
      - gridcell "[APP-1117] Fix broken deep links in navigation"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/22/2025"
      - gridcell "$925"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "$9,900 35%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$9,900"
      - gridcell
      - gridcell "35%"
  - rowgroup
  - rowgroup
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
> 138 |     await expect(secondDropdown.locator("button").first()).toContainText(
      |                                                            ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
  218 |     await secondDropdown.locator("button").first().click();
  219 |     await page
  220 |       .locator('[role="option"]')
  221 |       .filter({ hasText: "Features" })
  222 |       .click();
  223 |
  224 |     // Verify both filters are applied
  225 |     await expect(firstDropdown.locator("button").first()).toContainText(
  226 |       "This Month",
  227 |     );
  228 |     await expect(secondDropdown.locator("button").first()).toContainText(
  229 |       "Features",
  230 |     );
  231 |
  232 |     // Verify that only Feature category tasks are shown
  233 |     const categoryCells = await page
  234 |       .locator('.ag-cell[col-id="category"]')
  235 |       .allTextContents();
  236 |     for (const category of categoryCells) {
  237 |       expect(category).toBe("Feature");
  238 |     }
```