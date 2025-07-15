# Test info

- Name: DateFilter Dropdown Component >> Integration with Grid >> should clear filter when reset is clicked
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/date-filter-dropdown.spec.ts:235:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[col-id="date"] .ag-header-cell-menu-button')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/date-filter-dropdown.spec.ts:238:24
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
  - button "Show version details": v0.2.0-rc3+5 release/v0.2.0-rc3
  - img
  - text: MIT License
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: My Views
  - img
- button "View management menu":
  - img
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $41,600,325
- img
- paragraph: Average Progress
- paragraph: 45.7%
- img
- paragraph: Budget Remaining
- paragraph: $22,671,422
- grid:
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value Delivered":
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
      - columnheader "Delivered"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) [INFRA-1026] Optimize database queries (Sprint 27) Backlog High ⚡ Performance Jessica Lopez Jessica Lopez 9/6/2025 0% $1,425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[INFRA-1026] Optimize database queries (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$1,425"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [CORE-5037] Test mobile responsiveness (Performance Sprint) Backlog Medium 🧪 Testing Olivia Brown Olivia Brown 9/14/2025 0% $800":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-5037] Test mobile responsiveness (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/14/2025"
      - gridcell "0%"
      - gridcell "$800"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [CORE-4971] Resolve CORS issue with external API (Sprint 24) Backlog Critical 🐛 Bug Priya Sharma Priya Sharma 8/31/2025 0% $550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-4971] Resolve CORS issue with external API (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/31/2025"
      - gridcell "0%"
      - gridcell "$550"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [DATA-5319] Set up staging environment (Security Audit) Testing Low 🔧 DevOps Marcus Williams Marcus Williams 9/16/2025 91% $6,600 $6,006":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-5319] Set up staging environment (Security Audit)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/16/2025"
      - gridcell "91%"
      - gridcell "$6,600"
      - gridcell "$6,006"
    - row "Press Space to toggle row selection (unchecked) [ADMIN-8236] Optimize image loading (Sprint 25) In Progress Low ⚡ Performance Emily Jackson Emily Jackson 10/4/2025 22% $150 $33":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-8236] Optimize image loading (Sprint 25)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "10/4/2025"
      - gridcell "22%"
      - gridcell "$150"
      - gridcell "$33"
    - row "Press Space to toggle row selection (unchecked) [DATA-8486] Implement auto-scaling (Sprint 26) In Review Critical 🔧 DevOps Sophia Taylor Sophia Taylor 9/1/2025 65% $1,000 $650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-8486] Implement auto-scaling (Sprint 26)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/1/2025"
      - gridcell "65%"
      - gridcell "$1,000"
      - gridcell "$650"
    - row "Press Space to toggle row selection (unchecked) [WEB-10674] Implement dark mode toggle (Sprint 24) Backlog Medium ✨ Feature James Wilson James Wilson 9/8/2025 0% $8,200":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-10674] Implement dark mode toggle (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/8/2025"
      - gridcell "0%"
      - gridcell "$8,200"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [DASH-2313] Write migration guide for v2 Backlog Medium 📝 Documentation Sarah Johnson Sarah Johnson 9/14/2025 0% $350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-2313] Write migration guide for v2"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/14/2025"
      - gridcell "0%"
      - gridcell "$350"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [PROJ-4489] Add CDN for static assets (Sprint 27) In Progress High ⚡ Performance Maya Patel Maya Patel 9/6/2025 33% $2,350 $776":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-4489] Add CDN for static assets (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/6/2025"
      - gridcell "33%"
      - gridcell "$2,350"
      - gridcell "$776"
    - row "Press Space to toggle row selection (unchecked) [DASH-4908] Write unit tests for auth module (Performance Sprint) Todo Low 🧪 Testing Marcus Williams Marcus Williams 10/3/2025 13% $550 $72":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-4908] Write unit tests for auth module (Performance Sprint)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "10/3/2025"
      - gridcell "13%"
      - gridcell "$550"
      - gridcell "$72"
    - row "Press Space to toggle row selection (unchecked) [DASH-5272] Create architecture overview (Tech Debt) In Review Medium 📝 Documentation Chris Martinez Chris Martinez 9/12/2025 72% $525 $378":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-5272] Create architecture overview (Tech Debt)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/12/2025"
      - gridcell "72%"
      - gridcell "$525"
      - gridcell "$378"
    - row "Press Space to toggle row selection (unchecked) [DATA-6362] Implement lazy loading (Security Audit) Backlog High ⚡ Performance Ryan Thomas Ryan Thomas 9/6/2025 0% $4,375":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-6362] Implement lazy loading (Security Audit)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$4,375"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [MOBILE-8330] Split monolithic components (Tech Debt) Backlog Medium ♻️ Refactor David Lee David Lee 9/11/2025 0% $8,625":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-8330] Split monolithic components (Tech Debt)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/11/2025"
      - gridcell "0%"
      - gridcell "$8,625"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [UI-8437] Optimize memory usage (Sprint 23) In Review Low ⚡ Performance Isabella Garcia Isabella Garcia 9/17/2025 77% $5,875 $4,524":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[UI-8437] Optimize memory usage (Sprint 23)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/17/2025"
      - gridcell "77%"
      - gridcell "$5,875"
      - gridcell "$4,524"
    - row "Press Space to toggle row selection (unchecked) [CORE-9546] Document component props (Sprint 25) Backlog Medium 📝 Documentation Olivia Brown Olivia Brown 9/13/2025 0% $750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-9546] Document component props (Sprint 25)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/13/2025"
      - gridcell "0%"
      - gridcell "$750"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [PROJ-9864] Implement auto-scaling (Q1 Goals) Backlog High 🔧 DevOps Chris Martinez Chris Martinez 9/8/2025 0% $10,225":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-9864] Implement auto-scaling (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/8/2025"
      - gridcell "0%"
      - gridcell "$10,225"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-10536] Configure Docker containers Testing Critical 🔧 DevOps Priya Sharma Priya Sharma 8/31/2025 89% $8,100 $7,209":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-10536] Configure Docker containers"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/31/2025"
      - gridcell "89%"
      - gridcell "$8,100"
      - gridcell "$7,209"
    - row "Press Space to toggle row selection (unchecked) [AUTH-3709] Document error handling patterns (Tech Debt) In Review Medium 📝 Documentation Sophia Taylor Sophia Taylor 9/18/2025 79% $14,200 $11,218":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[AUTH-3709] Document error handling patterns (Tech Debt)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/18/2025"
      - gridcell "79%"
      - gridcell "$14,200"
      - gridcell "$11,218"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,600,325 $18,928,903":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,600,325"
      - gridcell "$18,928,903"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
```

# Test source

```ts
  138 |       const applyButton = page.locator('button:has-text("Apply")');
  139 |       await applyButton.click();
  140 |       
  141 |       await page.waitForTimeout(500);
  142 |       
  143 |       // Verify filtering occurred
  144 |       const rows = page.locator('.ag-center-cols-container .ag-row');
  145 |       const rowCount = await rows.count();
  146 |       expect(rowCount).toBeGreaterThanOrEqual(0);
  147 |     });
  148 |   });
  149 |
  150 |   test.describe("Filter Operators", () => {
  151 |     test.beforeEach(async () => {
  152 |       // Open date filter
  153 |       const dateHeader = page.locator('[col-id="date"] .ag-header-cell-menu-button');
  154 |       await dateHeader.click();
  155 |       await page.locator('.ag-menu-option[aria-label="Filter Columns"]').click();
  156 |     });
  157 |
  158 |     test("should filter with 'before' operator", async () => {
  159 |       const typeSelector = page.locator('[data-component="date-filter-type-selector"]');
  160 |       await typeSelector.selectOption('before');
  161 |       
  162 |       const input = page.locator('[data-component="date-filter-input"]');
  163 |       await input.fill('today');
  164 |       
  165 |       const applyButton = page.locator('button:has-text("Apply")');
  166 |       await applyButton.click();
  167 |       
  168 |       await page.waitForTimeout(500);
  169 |       
  170 |       // All dates should be before today
  171 |       const rows = page.locator('.ag-center-cols-container .ag-row');
  172 |       expect(await rows.count()).toBeGreaterThan(0);
  173 |     });
  174 |
  175 |     test("should filter with 'after' operator", async () => {
  176 |       const typeSelector = page.locator('[data-component="date-filter-type-selector"]');
  177 |       await typeSelector.selectOption('after');
  178 |       
  179 |       const input = page.locator('[data-component="date-filter-input"]');
  180 |       await input.fill('-30d');
  181 |       
  182 |       const applyButton = page.locator('button:has-text("Apply")');
  183 |       await applyButton.click();
  184 |       
  185 |       await page.waitForTimeout(500);
  186 |       
  187 |       // Should have rows from last 30 days
  188 |       const rows = page.locator('.ag-center-cols-container .ag-row');
  189 |       expect(await rows.count()).toBeGreaterThan(0);
  190 |     });
  191 |
  192 |     test("should filter with 'inRange' operator", async () => {
  193 |       const typeSelector = page.locator('[data-component="date-filter-type-selector"]');
  194 |       await typeSelector.selectOption('inRange');
  195 |       
  196 |       // Should show two inputs for range
  197 |       const fromInput = page.locator('[data-component="date-filter-input-from"]');
  198 |       const toInput = page.locator('[data-component="date-filter-input-to"]');
  199 |       
  200 |       await expect(fromInput).toBeVisible();
  201 |       await expect(toInput).toBeVisible();
  202 |       
  203 |       await fromInput.fill('-30d');
  204 |       await toInput.fill('today');
  205 |       
  206 |       const applyButton = page.locator('button:has-text("Apply")');
  207 |       await applyButton.click();
  208 |       
  209 |       await page.waitForTimeout(500);
  210 |       
  211 |       const rows = page.locator('.ag-center-cols-container .ag-row');
  212 |       expect(await rows.count()).toBeGreaterThan(0);
  213 |     });
  214 |   });
  215 |
  216 |   test.describe("Integration with Grid", () => {
  217 |     test("should update filter model when filter is applied", async () => {
  218 |       // Open date filter
  219 |       const dateHeader = page.locator('[col-id="date"] .ag-header-cell-menu-button');
  220 |       await dateHeader.click();
  221 |       await page.locator('.ag-menu-option[aria-label="Filter Columns"]').click();
  222 |       
  223 |       // Apply a filter
  224 |       const input = page.locator('[data-component="date-filter-input"]');
  225 |       await input.fill('-7d');
  226 |       
  227 |       const applyButton = page.locator('button:has-text("Apply")');
  228 |       await applyButton.click();
  229 |       
  230 |       // Check that filter is active (filter icon should be visible)
  231 |       const filterIcon = page.locator('[col-id="date"] .ag-header-filter-icon');
  232 |       await expect(filterIcon).toBeVisible();
  233 |     });
  234 |
  235 |     test("should clear filter when reset is clicked", async () => {
  236 |       // First apply a filter
  237 |       const dateHeader = page.locator('[col-id="date"] .ag-header-cell-menu-button');
> 238 |       await dateHeader.click();
      |                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  239 |       await page.locator('.ag-menu-option[aria-label="Filter Columns"]').click();
  240 |       
  241 |       const input = page.locator('[data-component="date-filter-input"]');
  242 |       await input.fill('-7d');
  243 |       
  244 |       const applyButton = page.locator('button:has-text("Apply")');
  245 |       await applyButton.click();
  246 |       
  247 |       // Now clear the filter
  248 |       await dateHeader.click();
  249 |       await page.locator('.ag-menu-option[aria-label="Filter Columns"]').click();
  250 |       
  251 |       const resetButton = page.locator('[data-component="date-filter-reset-button"]');
  252 |       await resetButton.click();
  253 |       
  254 |       await applyButton.click();
  255 |       
  256 |       // Filter icon should not be visible
  257 |       const filterIcon = page.locator('[col-id="date"] .ag-header-filter-icon');
  258 |       await expect(filterIcon).not.toBeVisible();
  259 |     });
  260 |   });
  261 |
  262 |   test.describe("Keyboard Navigation", () => {
  263 |     test("should support keyboard navigation", async () => {
  264 |       const dateHeader = page.locator('[col-id="date"] .ag-header-cell-menu-button');
  265 |       await dateHeader.click();
  266 |       await page.locator('.ag-menu-option[aria-label="Filter Columns"]').click();
  267 |       
  268 |       const input = page.locator('[data-component="date-filter-input"]');
  269 |       await input.focus();
  270 |       
  271 |       // Tab to type selector
  272 |       await page.keyboard.press('Tab');
  273 |       const typeSelector = page.locator('[data-component="date-filter-type-selector"]');
  274 |       await expect(typeSelector).toBeFocused();
  275 |       
  276 |       // Tab to mode toggle
  277 |       await page.keyboard.press('Tab');
  278 |       const modeToggle = page.locator('[data-component="date-filter-mode-toggle"]');
  279 |       await expect(modeToggle).toBeFocused();
  280 |     });
  281 |   });
  282 |
  283 |   test.describe("Accessibility", () => {
  284 |     test("should have proper ARIA labels", async () => {
  285 |       const dateHeader = page.locator('[col-id="date"] .ag-header-cell-menu-button');
  286 |       await dateHeader.click();
  287 |       await page.locator('.ag-menu-option[aria-label="Filter Columns"]').click();
  288 |       
  289 |       const typeSelector = page.locator('[data-component="date-filter-type-selector"]');
  290 |       await expect(typeSelector).toHaveAttribute('aria-label', /filter type/i);
  291 |       
  292 |       const input = page.locator('[data-component="date-filter-input"]');
  293 |       await expect(input).toHaveAttribute('aria-label', /date value/i);
  294 |     });
  295 |   });
  296 | });
```