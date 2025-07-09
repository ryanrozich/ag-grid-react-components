# Test info

- Name: Quick Filters >> should combine time and task type filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:203:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
Expected string: "Features"
Received string: "Task type"
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('[data-testid="quick-filter-dropdown"]').nth(1).locator('button').first()
    9 × locator resolved to <button type="button" aria-expanded="false" aria-haspopup="listbox" class="_trigger_o1lml_8 " aria-label="Quick filter options" aria-controls="quick-filter-dropdown">…</button>
      - unexpected value "Task type"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quick-filters.spec.ts:228:60
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
  - button "Show version details": v0.2.0-rc1+20 release/v0.2.0-rc1
  - link "NPM":
    - /url: https://www.npmjs.com/package/ag-grid-react-components
    - img
    - text: NPM
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
  - button "Filter PresetsNEW"
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
- button "My Views":
  - img
  - text: My Views
  - img
- button "Filter view options":
  - img
- img
- paragraph: Number of Tasks
- paragraph: "285"
- img
- paragraph: Total Budget
- paragraph: $1,164,250
- img
- paragraph: Average Progress
- paragraph: 50.6%
- img
- paragraph: Budget Remaining
- paragraph: $569,057
- grid:
  - rowgroup:
    - row "ID":
      - columnheader "ID"
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value":
      - columnheader "Column with Header Selection":
        - checkbox "Column with Header Selection"
      - columnheader "Task"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "% Delivered"
      - columnheader "Value"
  - rowgroup:
    - row "MOBILE-1879":
      - gridcell "MOBILE-1879"
    - row "API-7455":
      - gridcell "API-7455"
    - row "WEB-8852":
      - gridcell "WEB-8852"
    - row "APP-5825":
      - gridcell "APP-5825"
    - row "FRONTEND-10288":
      - gridcell "FRONTEND-10288"
    - row "USER-10843":
      - gridcell "USER-10843"
    - row "PROJ-4806":
      - gridcell "PROJ-4806"
    - row "INFRA-3907":
      - gridcell "INFRA-3907"
    - row "WEB-9751":
      - gridcell "WEB-9751"
    - row "FRONTEND-1587":
      - gridcell "FRONTEND-1587"
    - row "MOBILE-3513":
      - gridcell "MOBILE-3513"
    - row "UI-5611":
      - gridcell "UI-5611"
    - row "INFRA-10271":
      - gridcell "INFRA-10271"
    - row "BACKEND-1806":
      - gridcell "BACKEND-1806"
    - row "APP-1833":
      - gridcell "APP-1833"
    - row "CORE-2057":
      - gridcell "CORE-2057"
    - row "APP-2462":
      - gridcell "APP-2462"
    - row "INFRA-3877":
      - gridcell "INFRA-3877"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Build analytics dashboard (Q2 Planning) In Progress Critical ✨ Feature Maya Patel Maya Patel 7/28/2025 38% $2,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build analytics dashboard (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "7/28/2025"
      - gridcell "38%"
      - gridcell "$2,650"
    - row "Press Space to toggle row selection (unchecked) Implement two-factor authentication In Progress Critical ✨ Feature Marcus Williams Marcus Williams 7/28/2025 43% $3,625":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement two-factor authentication"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "7/28/2025"
      - gridcell "43%"
      - gridcell "$3,625"
    - row "Press Space to toggle row selection (unchecked) Implement OAuth integration Backlog Critical ✨ Feature Sophia Taylor Sophia Taylor 7/29/2025 0% $6,025":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement OAuth integration"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "7/29/2025"
      - gridcell "0%"
      - gridcell "$6,025"
    - row "Press Space to toggle row selection (unchecked) Implement OAuth integration (Q2 Planning) Backlog Critical ✨ Feature JR John Robinson 7/27/2025 0% $15,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement OAuth integration (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "JR John Robinson"
      - gridcell "7/27/2025"
      - gridcell "0%"
      - gridcell "$15,700"
    - row "Press Space to toggle row selection (unchecked) Create user profile dashboard (Sprint 26) Todo High ✨ Feature Isabella Garcia Isabella Garcia 7/29/2025 18% $1,925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create user profile dashboard (Sprint 26)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "7/29/2025"
      - gridcell "18%"
      - gridcell "$1,925"
    - row "Press Space to toggle row selection (unchecked) Build custom report generator (Sprint 24) In Progress Critical ✨ Feature AW Amanda White 7/27/2025 20% $825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build custom report generator (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "AW Amanda White"
      - gridcell "7/27/2025"
      - gridcell "20%"
      - gridcell "$825"
    - row "Press Space to toggle row selection (unchecked) Build real-time notifications system (Sprint 24) In Progress Critical ✨ Feature Priya Sharma Priya Sharma 7/26/2025 35% $4,950":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build real-time notifications system (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/26/2025"
      - gridcell "35%"
      - gridcell "$4,950"
    - row "Press Space to toggle row selection (unchecked) Implement two-factor authentication (Sprint 24) In Review High ✨ Feature Isabella Garcia Isabella Garcia 7/29/2025 65% $275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement two-factor authentication (Sprint 24)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "7/29/2025"
      - gridcell "65%"
      - gridcell "$275"
    - row "Press Space to toggle row selection (unchecked) Build custom report generator Backlog Critical ✨ Feature Olivia Brown Olivia Brown 7/25/2025 0% $550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build custom report generator"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "7/25/2025"
      - gridcell "0%"
      - gridcell "$550"
    - row "Press Space to toggle row selection (unchecked) Implement two-factor authentication (Sprint 24) Backlog Critical ✨ Feature AW Amanda White 7/24/2025 0% $1,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement two-factor authentication (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "AW Amanda White"
      - gridcell "7/24/2025"
      - gridcell "0%"
      - gridcell "$1,900"
    - row "Press Space to toggle row selection (unchecked) Build analytics dashboard (Tech Debt) In Progress High ✨ Feature James Wilson James Wilson 7/28/2025 45% $325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build analytics dashboard (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "7/28/2025"
      - gridcell "45%"
      - gridcell "$325"
    - row "Press Space to toggle row selection (unchecked) Create data visualization charts Testing Critical ✨ Feature Alex Chen Alex Chen 7/23/2025 92% $250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create data visualization charts"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "7/23/2025"
      - gridcell "92%"
      - gridcell "$250"
    - row "Press Space to toggle row selection (unchecked) Create user profile dashboard (Tech Debt) In Progress Critical ✨ Feature DK Daniel Kim 7/25/2025 43% $4,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create user profile dashboard (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "DK Daniel Kim"
      - gridcell "7/25/2025"
      - gridcell "43%"
      - gridcell "$4,900"
    - row "Press Space to toggle row selection (unchecked) Implement social media sharing (Q2 Planning) In Progress High ✨ Feature Alex Chen Alex Chen 7/30/2025 23% $650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement social media sharing (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "7/30/2025"
      - gridcell "23%"
      - gridcell "$650"
    - row "Press Space to toggle row selection (unchecked) Add export to PDF functionality Todo Critical ✨ Feature KZ Kevin Zhang 7/22/2025 7% $17,125":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add export to PDF functionality"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "KZ Kevin Zhang"
      - gridcell "7/22/2025"
      - gridcell "7%"
      - gridcell "$17,125"
    - row "Press Space to toggle row selection (unchecked) Add keyboard shortcuts (Sprint 23) Testing High ✨ Feature Maya Patel Maya Patel 7/24/2025 84% $12,475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add keyboard shortcuts (Sprint 23)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "7/24/2025"
      - gridcell "84%"
      - gridcell "$12,475"
    - row "Press Space to toggle row selection (unchecked) Add multi-language support Backlog Critical ✨ Feature Priya Sharma Priya Sharma 7/22/2025 0% $500":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add multi-language support"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/22/2025"
      - gridcell "0%"
      - gridcell "$500"
    - row "Press Space to toggle row selection (unchecked) Build custom report generator (Security Audit) In Progress Critical ✨ Feature Priya Sharma Priya Sharma 7/22/2025 45% $19,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build custom report generator (Security Audit)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/22/2025"
      - gridcell "45%"
      - gridcell "$19,900"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $1,164,250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$1,164,250"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 285 of 10,000"
- status: "Total Rows : 10,000 Filtered : 285"
- status
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