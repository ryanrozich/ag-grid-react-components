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
- paragraph: "31"
- img
- paragraph: Total Budget
- paragraph: $141,675
- img
- paragraph: Progress
- paragraph: 44.5%
- img
- paragraph: Budget Remaining
- paragraph: $62,794
- text: 1 to 25 of 32. Page 1 of 2
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
    - row "659 [DATA-1659] Build analytics dashboard (Sprint 24) ✨ Feature High Jessica Lopez Jessica Lopez 6/29/2025 $7,575 Blocked 13%":
      - gridcell "659"
      - gridcell "[DATA-1659] Build analytics dashboard (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/29/2025"
      - gridcell "$7,575"
      - gridcell "Blocked"
      - gridcell "13%"
    - row "442 [API-1442] Implement dark mode toggle (Q1 Goals) ✨ Feature Critical Marcus Williams Marcus Williams 6/18/2025 $900 Backlog 0%":
      - gridcell "442"
      - gridcell "[API-1442] Implement dark mode toggle (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/18/2025"
      - gridcell "$900"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "913 [DATA-1913] Implement dark mode toggle ✨ Feature Critical Sarah Johnson Sarah Johnson 6/18/2025 $10,600 Done 100%":
      - gridcell "913"
      - gridcell "[DATA-1913] Implement dark mode toggle"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/18/2025"
      - gridcell "$10,600"
      - gridcell "Done"
      - gridcell "100%"
    - row "423 [FRONTEND-1423] Build real-time notifications system ✨ Feature Critical Sophia Taylor Sophia Taylor 6/19/2025 $7,225 Blocked 16%":
      - gridcell "423"
      - gridcell "[FRONTEND-1423] Build real-time notifications system"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/19/2025"
      - gridcell "$7,225"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "233 [BACKEND-1233] Implement OAuth integration (Security Audit) ✨ Feature High Isabella Garcia Isabella Garcia 6/23/2025 $325 Todo 17%":
      - gridcell "233"
      - gridcell "[BACKEND-1233] Implement OAuth integration (Security Audit)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/23/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "17%"
    - row "583 [WEB-1583] Build real-time notifications system ✨ Feature Critical Jessica Lopez Jessica Lopez 6/17/2025 $2,275 Done 100%":
      - gridcell "583"
      - gridcell "[WEB-1583] Build real-time notifications system"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/17/2025"
      - gridcell "$2,275"
      - gridcell "Done"
      - gridcell "100%"
    - row "447 [MOBILE-1447] Add keyboard shortcuts ✨ Feature Critical Olivia Brown Olivia Brown 6/12/2025 $250 In Progress 53%":
      - gridcell "447"
      - gridcell "[MOBILE-1447] Add keyboard shortcuts"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/12/2025"
      - gridcell "$250"
      - gridcell "In Progress"
      - gridcell "53%"
    - row "685 [AUTH-1685] Add keyboard shortcuts ✨ Feature Critical David Lee David Lee 6/11/2025 $625 Blocked 28%":
      - gridcell "685"
      - gridcell "[AUTH-1685] Add keyboard shortcuts"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/11/2025"
      - gridcell "$625"
      - gridcell "Blocked"
      - gridcell "28%"
    - row "373 [APP-1373] Add export to PDF functionality (Sprint 26) ✨ Feature High Jessica Lopez Jessica Lopez 6/11/2025 $1,675 In Progress 28%":
      - gridcell "373"
      - gridcell "[APP-1373] Add export to PDF functionality (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/11/2025"
      - gridcell "$1,675"
      - gridcell "In Progress"
      - gridcell "28%"
    - row "213 [APP-1213] Create user profile dashboard (Security Audit) ✨ Feature Critical Ryan Thomas Ryan Thomas 6/10/2025 $12,675 In Progress 42%":
      - gridcell "213"
      - gridcell "[APP-1213] Create user profile dashboard (Security Audit)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/10/2025"
      - gridcell "$12,675"
      - gridcell "In Progress"
      - gridcell "42%"
    - row "852 [DATA-1852] Implement OAuth integration ✨ Feature Medium Olivia Brown Olivia Brown 6/21/2025 $4,775 Done 100%":
      - gridcell "852"
      - gridcell "[DATA-1852] Implement OAuth integration"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/21/2025"
      - gridcell "$4,775"
      - gridcell "Done"
      - gridcell "100%"
    - row "458 [FRONTEND-1458] Create user profile dashboard (Performance Sprint) ✨ Feature High John Robinson John Robinson 6/10/2025 $200 Blocked 27%":
      - gridcell "458"
      - gridcell "[FRONTEND-1458] Create user profile dashboard (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/10/2025"
      - gridcell "$200"
      - gridcell "Blocked"
      - gridcell "27%"
    - row "846 [BACKEND-1846] Create user profile dashboard (Tech Debt) ✨ Feature Low Emma Davis Emma Davis 6/22/2025 $550 Blocked 13%":
      - gridcell "846"
      - gridcell "[BACKEND-1846] Create user profile dashboard (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/22/2025"
      - gridcell "$550"
      - gridcell "Blocked"
      - gridcell "13%"
    - row "493 [DASH-1493] Implement dark mode toggle (Q2 Planning) ✨ Feature Medium Emily Jackson Emily Jackson 6/21/2025 $2,925 In Progress 31%":
      - gridcell "493"
      - gridcell "[DASH-1493] Implement dark mode toggle (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/21/2025"
      - gridcell "$2,925"
      - gridcell "In Progress"
      - gridcell "31%"
    - row "563 [WEB-1563] Add keyboard shortcuts (Sprint 27) ✨ Feature Medium Priya Sharma Priya Sharma 6/17/2025 $2,275 In Progress 23%":
      - gridcell "563"
      - gridcell "[WEB-1563] Add keyboard shortcuts (Sprint 27)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/17/2025"
      - gridcell "$2,275"
      - gridcell "In Progress"
      - gridcell "23%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$141,675 44%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$141,675"
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