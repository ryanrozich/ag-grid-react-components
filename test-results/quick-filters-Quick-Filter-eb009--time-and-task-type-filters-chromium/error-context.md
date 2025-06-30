# Test info

- Name: Quick Filters >> should combine time and task type filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:203:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
Expected string: "Features"
Received string: "Task type"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_aaln3_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Task type"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:228:60
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
  - text: This Month
  - img
- button "Quick filter options":
  - text: Task type
  - img
- text: "Due Date: StartOfMonth to EndOfMonth"
- button "Remove Due Date filter": ×
- text: "Category: Feature"
- button "Remove Category filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "27"
- img
- paragraph: Total Budget
- paragraph: $108,525
- img
- paragraph: Progress
- paragraph: 49.1%
- img
- paragraph: Budget Remaining
- paragraph: $52,523
- text: 1 to 25 of 28. Page 1 of 2
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
    - row "811 [APP-1811] Create batch operations feature (Sprint 23) ✨ Feature Critical Kevin Zhang Kevin Zhang 6/27/2025 $2,825 In Progress 26%":
      - gridcell "811"
      - gridcell "[APP-1811] Create batch operations feature (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/27/2025"
      - gridcell "$2,825"
      - gridcell "In Progress"
      - gridcell "26%"
    - row "810 [USER-1810] Implement social media sharing (Sprint 26) ✨ Feature Critical David Lee David Lee 6/26/2025 $675 In Progress 20%":
      - gridcell "810"
      - gridcell "[USER-1810] Implement social media sharing (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/26/2025"
      - gridcell "$675"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "414 [APP-1414] Add drag-and-drop file upload ✨ Feature High Marcus Williams Marcus Williams 6/19/2025 $17,125 Blocked 39%":
      - gridcell "414"
      - gridcell "[APP-1414] Add drag-and-drop file upload"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/19/2025"
      - gridcell "$17,125"
      - gridcell "Blocked"
      - gridcell "39%"
    - row "994 [WEB-1994] Create batch operations feature (Q1 Goals) ✨ Feature Critical Ryan Thomas Ryan Thomas 6/13/2025 $975 Blocked 22%":
      - gridcell "994"
      - gridcell "[WEB-1994] Create batch operations feature (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/13/2025"
      - gridcell "$975"
      - gridcell "Blocked"
      - gridcell "22%"
    - row "597 [INFRA-1597] Add keyboard shortcuts (Performance Sprint) ✨ Feature Critical Daniel Kim Daniel Kim 6/12/2025 $9,750 In Progress 29%":
      - gridcell "597"
      - gridcell "[INFRA-1597] Add keyboard shortcuts (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "6/12/2025"
      - gridcell "$9,750"
      - gridcell "In Progress"
      - gridcell "29%"
    - row "652 [ADMIN-1652] Add export to PDF functionality ✨ Feature High Kevin Zhang Kevin Zhang 6/12/2025 $850 Testing 88%":
      - gridcell "652"
      - gridcell "[ADMIN-1652] Add export to PDF functionality"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/12/2025"
      - gridcell "$850"
      - gridcell "Testing"
      - gridcell "88%"
    - row "21 [API-1021] Implement social media sharing (Performance Sprint) ✨ Feature High Marcus Williams Marcus Williams 6/10/2025 $7,425 Blocked 13%":
      - gridcell "21"
      - gridcell "[API-1021] Implement social media sharing (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/10/2025"
      - gridcell "$7,425"
      - gridcell "Blocked"
      - gridcell "13%"
    - row "914 [INFRA-1914] Add multi-language support (Q1 Goals) ✨ Feature High Kevin Zhang Kevin Zhang 6/12/2025 $950 Blocked 32%":
      - gridcell "914"
      - gridcell "[INFRA-1914] Add multi-language support (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/12/2025"
      - gridcell "$950"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "632 [FRONTEND-1632] Create user profile dashboard (Sprint 24) ✨ Feature Low Emily Jackson Emily Jackson 6/17/2025 $1,750 Done 100%":
      - gridcell "632"
      - gridcell "[FRONTEND-1632] Create user profile dashboard (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/17/2025"
      - gridcell "$1,750"
      - gridcell "Done"
      - gridcell "100%"
    - row "562 [API-1562] Add drag-and-drop file upload (Sprint 24) ✨ Feature High Alex Chen Alex Chen 6/9/2025 $750 Blocked 23%":
      - gridcell "562"
      - gridcell "[API-1562] Add drag-and-drop file upload (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/9/2025"
      - gridcell "$750"
      - gridcell "Blocked"
      - gridcell "23%"
    - row "786 [FRONTEND-1786] Build real-time notifications system ✨ Feature High Daniel Kim Daniel Kim 6/5/2025 $525 Done 100%":
      - gridcell "786"
      - gridcell "[FRONTEND-1786] Build real-time notifications system"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "6/5/2025"
      - gridcell "$525"
      - gridcell "Done"
      - gridcell "100%"
    - row "547 [API-1547] Implement social media sharing (Sprint 24) ✨ Feature Critical Sarah Johnson Sarah Johnson 6/3/2025 $100 In Progress 50%":
      - gridcell "547"
      - gridcell "[API-1547] Implement social media sharing (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/3/2025"
      - gridcell "$100"
      - gridcell "In Progress"
      - gridcell "50%"
    - row "111 [CORE-1111] Build analytics dashboard (Sprint 23) ✨ Feature High Olivia Brown Olivia Brown 6/2/2025 $19,075 Done 100%":
      - gridcell "111"
      - gridcell "[CORE-1111] Build analytics dashboard (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/2/2025"
      - gridcell "$19,075"
      - gridcell "Done"
      - gridcell "100%"
    - row "39 [APP-1039] Build analytics dashboard ✨ Feature Medium Emily Jackson Emily Jackson 6/5/2025 $7,050 Blocked 30%":
      - gridcell "39"
      - gridcell "[APP-1039] Build analytics dashboard"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/5/2025"
      - gridcell "$7,050"
      - gridcell "Blocked"
      - gridcell "30%"
    - row "491 [AUTH-1491] Implement social media sharing (Security Audit) ✨ Feature Low Priya Sharma Priya Sharma 6/19/2025 $6,050 In Progress 45%":
      - gridcell "491"
      - gridcell "[AUTH-1491] Implement social media sharing (Security Audit)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/19/2025"
      - gridcell "$6,050"
      - gridcell "In Progress"
      - gridcell "45%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$108,525 49%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$108,525"
      - gridcell
      - gridcell "49%"
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
> 228 |     await expect(secondDropdown.locator("button").first()).toContainText(
      |                                                            ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
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
  239 |
  240 |     // There should be fewer rows due to combined filters
  241 |     const rowCount = await page.locator(".ag-row").count();
  242 |     expect(rowCount).toBeGreaterThan(0);
  243 |     expect(rowCount).toBeLessThan(10); // Combined filters should show very few rows
  244 |   });
  245 |
  246 |   test("should update stats when filters are applied", async ({ page }) => {
  247 |     // Get initial task count
  248 |     const initialTaskCount = await page
  249 |       .locator('p:has-text("Number of Tasks") + p')
  250 |       .textContent();
  251 |     const initialCount = parseInt(initialTaskCount?.replace(/,/g, "") || "0");
  252 |
  253 |     // Apply a filter
  254 |     const firstDropdown = page
  255 |       .locator('[data-testid="quick-filter-dropdown"]')
  256 |       .first();
  257 |     await firstDropdown.locator("button").first().click();
  258 |     await page
  259 |       .locator('[role="option"]')
  260 |       .filter({ hasText: "Overdue" })
  261 |       .click();
  262 |
  263 |     // Wait for grid to update
  264 |     await page.waitForTimeout(500);
  265 |
  266 |     // Get new task count
  267 |     const newTaskCount = await page
  268 |       .locator('p:has-text("Number of Tasks") + p')
  269 |       .textContent();
  270 |     const newCount = parseInt(newTaskCount?.replace(/,/g, "") || "0");
  271 |
  272 |     // Task count should decrease when filter is applied
  273 |     expect(newCount).toBeLessThan(initialCount);
  274 |     expect(newCount).toBeGreaterThan(0);
  275 |   });
  276 | });
  277 |
```