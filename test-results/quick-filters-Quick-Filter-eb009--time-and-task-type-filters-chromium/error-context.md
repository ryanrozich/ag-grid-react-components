# Test info

- Name: Quick Filters >> should combine time and task type filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:151:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
Expected string: "Features"
Received string: "All Tasks"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" aria-controls="quick-filter-dropdown" class="_trigger_a39xr_8 _triggerActive_a39xr_37">…</button>
      - unexpected value "All Tasks"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:164:60
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
    - text: This Month
    - img
- button "Quick filter options":
    - text: All Tasks
    - img
- paragraph: Number of Tasks
- paragraph: "30"
- img
- paragraph: Total Budget
- paragraph: $158,575
- img
- paragraph: Progress
- paragraph: 44.0%
- img
- paragraph: Budget Remaining
- paragraph: $72,770
- img
- text: "Due Date: StartOfMonth to EndOfMonth"
- button "Remove Due Date filter": ×
- text: "Category: Feature"
- button "Remove Category filter": ×
- button "Clear all filters": Clear all
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
        - row "543 [FRONTEND-1543] Implement dark mode toggle (Sprint 26) ✨ Feature Critical Daniel Kim Daniel Kim 6/26/2025 $14,900 In Review 70%":
            - gridcell "543"
            - gridcell "[FRONTEND-1543] Implement dark mode toggle (Sprint 26)"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "Daniel Kim Daniel Kim":
                - img "Daniel Kim"
                - text: Daniel Kim
            - gridcell "6/26/2025"
            - gridcell "$14,900"
            - gridcell "In Review"
            - gridcell "70%"
        - row "377 [DASH-1377] Build custom report generator ✨ Feature Medium Marcus Williams Marcus Williams 6/28/2025 $3,150 Blocked 28%":
            - gridcell "377"
            - gridcell "[DASH-1377] Build custom report generator"
            - gridcell "✨ Feature"
            - gridcell "Medium"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/28/2025"
            - gridcell "$3,150"
            - gridcell "Blocked"
            - gridcell "28%"
        - row "935 [FRONTEND-1935] Add multi-language support ✨ Feature Critical John Robinson John Robinson 6/24/2025 $650 In Review 65%":
            - gridcell "935"
            - gridcell "[FRONTEND-1935] Add multi-language support"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "John Robinson John Robinson":
                - img "John Robinson"
                - text: John Robinson
            - gridcell "6/24/2025"
            - gridcell "$650"
            - gridcell "In Review"
            - gridcell "65%"
        - row "398 [AUTH-1398] Add drag-and-drop file upload (Performance Sprint) ✨ Feature High Sophia Taylor Sophia Taylor 6/23/2025 $12,575 Backlog 0%":
            - gridcell "398"
            - gridcell "[AUTH-1398] Add drag-and-drop file upload (Performance Sprint)"
            - gridcell "✨ Feature"
            - gridcell "High"
            - gridcell "Sophia Taylor Sophia Taylor":
                - img "Sophia Taylor"
                - text: Sophia Taylor
            - gridcell "6/23/2025"
            - gridcell "$12,575"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "10 [USER-1010] Add keyboard shortcuts ✨ Feature Critical Emily Jackson Emily Jackson 6/18/2025 $450 Blocked 13%":
            - gridcell "10"
            - gridcell "[USER-1010] Add keyboard shortcuts"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "Emily Jackson Emily Jackson":
                - img "Emily Jackson"
                - text: Emily Jackson
            - gridcell "6/18/2025"
            - gridcell "$450"
            - gridcell "Blocked"
            - gridcell "13%"
        - row "126 [DASH-1126] Add keyboard shortcuts (Q2 Planning) ✨ Feature High Amanda White Amanda White 6/21/2025 $9,425 Blocked 30%":
            - gridcell "126"
            - gridcell "[DASH-1126] Add keyboard shortcuts (Q2 Planning)"
            - gridcell "✨ Feature"
            - gridcell "High"
            - gridcell "Amanda White Amanda White":
                - img "Amanda White"
                - text: Amanda White
            - gridcell "6/21/2025"
            - gridcell "$9,425"
            - gridcell "Blocked"
            - gridcell "30%"
        - row "273 [UI-1273] Create user profile dashboard ✨ Feature High Isabella Garcia Isabella Garcia 6/25/2025 $625 In Progress 23%":
            - gridcell "273"
            - gridcell "[UI-1273] Create user profile dashboard"
            - gridcell "✨ Feature"
            - gridcell "High"
            - gridcell "Isabella Garcia Isabella Garcia":
                - img "Isabella Garcia"
                - text: Isabella Garcia
            - gridcell "6/25/2025"
            - gridcell "$625"
            - gridcell "In Progress"
            - gridcell "23%"
        - row "373 [CORE-1373] Implement OAuth integration (Sprint 24) ✨ Feature Critical Sophia Taylor Sophia Taylor 6/14/2025 $6,575 In Progress 29%":
            - gridcell "373"
            - gridcell "[CORE-1373] Implement OAuth integration (Sprint 24)"
            - gridcell "✨ Feature"
            - gridcell "Critical"
            - gridcell "Sophia Taylor Sophia Taylor":
                - img "Sophia Taylor"
                - text: Sophia Taylor
            - gridcell "6/14/2025"
            - gridcell "$6,575"
            - gridcell "In Progress"
            - gridcell "29%"
        - row "571 [AUTH-1571] Create advanced search filters (Sprint 26) ✨ Feature Medium Michael Anderson Michael Anderson 6/20/2025 $150 Blocked 11%":
            - gridcell "571"
            - gridcell "[AUTH-1571] Create advanced search filters (Sprint 26)"
            - gridcell "✨ Feature"
            - gridcell "Medium"
            - gridcell "Michael Anderson Michael Anderson":
                - img "Michael Anderson"
                - text: Michael Anderson
            - gridcell "6/20/2025"
            - gridcell "$150"
            - gridcell "Blocked"
            - gridcell "11%"
        - row "264 [AUTH-1264] Create batch operations feature ✨ Feature Medium Daniel Kim Daniel Kim 6/20/2025 $500 In Progress 48%":
            - gridcell "264"
            - gridcell "[AUTH-1264] Create batch operations feature"
            - gridcell "✨ Feature"
            - gridcell "Medium"
            - gridcell "Daniel Kim Daniel Kim":
                - img "Daniel Kim"
                - text: Daniel Kim
            - gridcell "6/20/2025"
            - gridcell "$500"
            - gridcell "In Progress"
            - gridcell "48%"
        - row "350 [MOBILE-1350] Create advanced search filters ✨ Feature High Olivia Brown Olivia Brown 6/17/2025 $2,425 Done 100%":
            - gridcell "350"
            - gridcell "[MOBILE-1350] Create advanced search filters"
            - gridcell "✨ Feature"
            - gridcell "High"
            - gridcell "Olivia Brown Olivia Brown":
                - img "Olivia Brown"
                - text: Olivia Brown
            - gridcell "6/17/2025"
            - gridcell "$2,425"
            - gridcell "Done"
            - gridcell "100%"
        - row "310 [APP-1310] Add drag-and-drop file upload (Sprint 27) ✨ Feature Medium Ryan Thomas Ryan Thomas 6/25/2025 $4,450 In Progress 44%":
            - gridcell "310"
            - gridcell "[APP-1310] Add drag-and-drop file upload (Sprint 27)"
            - gridcell "✨ Feature"
            - gridcell "Medium"
            - gridcell "Ryan Thomas Ryan Thomas":
                - img "Ryan Thomas"
                - text: Ryan Thomas
            - gridcell "6/25/2025"
            - gridcell "$4,450"
            - gridcell "In Progress"
            - gridcell "44%"
        - row "71 [ADMIN-1071] Create advanced search filters (Sprint 24) ✨ Feature High Marcus Williams Marcus Williams 6/16/2025 $550 In Progress 50%":
            - gridcell "71"
            - gridcell "[ADMIN-1071] Create advanced search filters (Sprint 24)"
            - gridcell "✨ Feature"
            - gridcell "High"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/16/2025"
            - gridcell "$550"
            - gridcell "In Progress"
            - gridcell "50%"
        - row "686 [FRONTEND-1686] Implement social media sharing (Q1 Goals) ✨ Feature Medium David Lee David Lee 6/26/2025 $12,225 Done 100%":
            - gridcell "686"
            - gridcell "[FRONTEND-1686] Implement social media sharing (Q1 Goals)"
            - gridcell "✨ Feature"
            - gridcell "Medium"
            - gridcell "David Lee David Lee":
                - img "David Lee"
                - text: David Lee
            - gridcell "6/26/2025"
            - gridcell "$12,225"
            - gridcell "Done"
            - gridcell "100%"
    - rowgroup
    - rowgroup
    - rowgroup
    - rowgroup:
        - row "$158,575 44%":
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell "$158,575"
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
  134 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
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
> 164 |     await expect(secondDropdown.locator("button").first()).toContainText("Features");
      |                                                            ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
