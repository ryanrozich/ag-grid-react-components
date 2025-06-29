# Test info

- Name: Quick Filters >> should combine time and task type filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:203:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
Expected string: "Features"
Received string: "All Tasks"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Quick filter options" aria-controls="quick-filter-dropdown" class="_trigger_aaln3_8 _triggerActive_aaln3_37">…</button>
      - unexpected value "All Tasks"

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
  - text: All Tasks
  - img
- text: "Due Date: StartOfMonth to EndOfMonth"
- button "Remove Due Date filter": ×
- text: "Category: Feature"
- button "Remove Category filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "33"
- img
- paragraph: Total Budget
- paragraph: $121,525
- img
- paragraph: Progress
- paragraph: 50.7%
- img
- paragraph: Budget Remaining
- paragraph: $51,101
- text: 1 to 25 of 34. Page 1 of 2
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
    - row "589 [CORE-1589] Implement social media sharing (Q2 Planning) ✨ Feature High David Lee David Lee 6/29/2025 $3,125 Done 100%":
      - gridcell "589"
      - gridcell "[CORE-1589] Implement social media sharing (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/29/2025"
      - gridcell "$3,125"
      - gridcell "Done"
      - gridcell "100%"
    - row "516 [CORE-1516] Create data visualization charts (Q1 Goals) ✨ Feature Critical Sophia Taylor Sophia Taylor 6/21/2025 $8,575 Done 100%":
      - gridcell "516"
      - gridcell "[CORE-1516] Create data visualization charts (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/21/2025"
      - gridcell "$8,575"
      - gridcell "Done"
      - gridcell "100%"
    - row "279 [API-1279] Implement social media sharing (Sprint 24) ✨ Feature Critical Olivia Brown Olivia Brown 6/20/2025 $1,700 Blocked 36%":
      - gridcell "279"
      - gridcell "[API-1279] Implement social media sharing (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/20/2025"
      - gridcell "$1,700"
      - gridcell "Blocked"
      - gridcell "36%"
    - row "681 [DASH-1681] Implement dark mode toggle (Sprint 26) ✨ Feature Medium Emma Davis Emma Davis 6/29/2025 $3,300 In Review 72%":
      - gridcell "681"
      - gridcell "[DASH-1681] Implement dark mode toggle (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/29/2025"
      - gridcell "$3,300"
      - gridcell "In Review"
      - gridcell "72%"
    - row "635 [BACKEND-1635] Build analytics dashboard (Sprint 26) ✨ Feature High Kevin Zhang Kevin Zhang 6/19/2025 $1,850 In Progress 45%":
      - gridcell "635"
      - gridcell "[BACKEND-1635] Build analytics dashboard (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/19/2025"
      - gridcell "$1,850"
      - gridcell "In Progress"
      - gridcell "45%"
    - row "223 [PROJ-1223] Create advanced search filters (Q1 Goals) ✨ Feature Critical Sophia Taylor Sophia Taylor 6/12/2025 $475 Blocked 38%":
      - gridcell "223"
      - gridcell "[PROJ-1223] Create advanced search filters (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/12/2025"
      - gridcell "$475"
      - gridcell "Blocked"
      - gridcell "38%"
    - row "379 [BACKEND-1379] Add drag-and-drop file upload (Security Audit) ✨ Feature High Isabella Garcia Isabella Garcia 6/13/2025 $1,375 Blocked 16%":
      - gridcell "379"
      - gridcell "[BACKEND-1379] Add drag-and-drop file upload (Security Audit)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/13/2025"
      - gridcell "$1,375"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "383 [INFRA-1383] Create user profile dashboard (Q2 Planning) ✨ Feature Medium Priya Sharma Priya Sharma 6/28/2025 $200 Done 100%":
      - gridcell "383"
      - gridcell "[INFRA-1383] Create user profile dashboard (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/28/2025"
      - gridcell "$200"
      - gridcell "Done"
      - gridcell "100%"
    - row "470 [MOBILE-1470] Add drag-and-drop file upload ✨ Feature Medium John Robinson John Robinson 6/15/2025 $375 Blocked 32%":
      - gridcell "470"
      - gridcell "[MOBILE-1470] Add drag-and-drop file upload"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/15/2025"
      - gridcell "$375"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "911 [DASH-1911] Create user profile dashboard (Q1 Goals) ✨ Feature Critical Sophia Taylor Sophia Taylor 6/8/2025 $7,725 In Progress 53%":
      - gridcell "911"
      - gridcell "[DASH-1911] Create user profile dashboard (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/8/2025"
      - gridcell "$7,725"
      - gridcell "In Progress"
      - gridcell "53%"
    - row "939 [MOBILE-1939] Create batch operations feature (Sprint 25) ✨ Feature Medium Michael Anderson Michael Anderson 6/23/2025 $8,250 Done 100%":
      - gridcell "939"
      - gridcell "[MOBILE-1939] Create batch operations feature (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/23/2025"
      - gridcell "$8,250"
      - gridcell "Done"
      - gridcell "100%"
    - row "677 [WEB-1677] Add keyboard shortcuts (Q1 Goals) ✨ Feature Critical Jessica Lopez Jessica Lopez 6/8/2025 $3,550 Blocked 32%":
      - gridcell "677"
      - gridcell "[WEB-1677] Add keyboard shortcuts (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/8/2025"
      - gridcell "$3,550"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "237 [WEB-1237] Implement social media sharing (Q1 Goals) ✨ Feature High Kevin Zhang Kevin Zhang 6/11/2025 $4,025 In Progress 54%":
      - gridcell "237"
      - gridcell "[WEB-1237] Implement social media sharing (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/11/2025"
      - gridcell "$4,025"
      - gridcell "In Progress"
      - gridcell "54%"
    - row "707 [FRONTEND-1707] Create batch operations feature (Security Audit) ✨ Feature Medium Maya Patel Maya Patel 6/14/2025 $2,525 Blocked 33%":
      - gridcell "707"
      - gridcell "[FRONTEND-1707] Create batch operations feature (Security Audit)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/14/2025"
      - gridcell "$2,525"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "643 [BACKEND-1643] Implement social media sharing (Tech Debt) ✨ Feature Medium Sophia Taylor Sophia Taylor 6/15/2025 $4,275 In Progress 51%":
      - gridcell "643"
      - gridcell "[BACKEND-1643] Implement social media sharing (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/15/2025"
      - gridcell "$4,275"
      - gridcell "In Progress"
      - gridcell "51%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$121,525 51%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$121,525"
      - gridcell
      - gridcell "51%"
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