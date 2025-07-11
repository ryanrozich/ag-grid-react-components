# Test info

- Name: Quick Filters >> should filter by task type
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:121:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    60 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:129:16
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
  - button "Show version details": v0.2.0-rc1+31 fix/e2e-test-selectors
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
  - button "Server-Side Data API"
  - button "Filter Presets NEW"
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options" [expanded]:
  - text: Task type
  - img
- button "My Views":
  - img
  - text: My Views
  - img
- button "Filter view options":
  - img
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $41,730,525
- img
- paragraph: Average Progress
- paragraph: 46.3%
- img
- paragraph: Budget Remaining
- paragraph: $22,653,877
- grid:
  - rowgroup:
    - row "ID":
      - columnheader "ID"
  - rowgroup:
    - row "Column with Header Selection  Task Status Priority Category Assignee Due Date % Delivered Value":
      - columnheader "Column with Header Selection ":
        - checkbox "Column with Header Selection"
        - text: 
      - columnheader "Task"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "% Delivered"
      - columnheader "Value"
  - rowgroup:
    - row "PROJ-3072":
      - gridcell "PROJ-3072"
    - row "WEB-8115":
      - gridcell "WEB-8115"
    - row "UI-3814":
      - gridcell "UI-3814"
    - row "DATA-7131":
      - gridcell "DATA-7131"
    - row "PROJ-2072":
      - gridcell "PROJ-2072"
    - row "PROJ-2541":
      - gridcell "PROJ-2541"
    - row "BACKEND-3219":
      - gridcell "BACKEND-3219"
    - row "UI-4671":
      - gridcell "UI-4671"
    - row "BACKEND-6593":
      - gridcell "BACKEND-6593"
    - row "PROJ-6798":
      - gridcell "PROJ-6798"
    - row "USER-8643":
      - gridcell "USER-8643"
    - row "USER-8771":
      - gridcell "USER-8771"
    - row "FRONTEND-8887":
      - gridcell "FRONTEND-8887"
    - row "DATA-1226":
      - gridcell "DATA-1226"
    - row "APP-4517":
      - gridcell "APP-4517"
    - row "DASH-4743":
      - gridcell "DASH-4743"
    - row "ADMIN-6247":
      - gridcell "ADMIN-6247"
    - row "AUTH-8909":
      - gridcell "AUTH-8909"
    - row "APP-1745":
      - gridcell "APP-1745"
    - row "AUTH-3490":
      - gridcell "AUTH-3490"
    - row "MOBILE-4768":
      - gridcell "MOBILE-4768"
    - row "INFRA-7461":
      - gridcell "INFRA-7461"
    - row "PROJ-7499":
      - gridcell "PROJ-7499"
    - row "BACKEND-7575":
      - gridcell "BACKEND-7575"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked)  Implement OAuth integration (Tech Debt) In Review Medium ✨ Feature Emma Davis Emma Davis 9/14/2025 60% $600":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Implement OAuth integration (Tech Debt)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/14/2025"
      - gridcell "60%"
      - gridcell "$600"
    - row "Press Space to toggle row selection (unchecked)  Create troubleshooting guide (Sprint 24) Backlog Low 📝 Documentation Emma Davis Emma Davis 9/23/2025 0% $3,025":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Create troubleshooting guide (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/23/2025"
      - gridcell "0%"
      - gridcell "$3,025"
    - row "Press Space to toggle row selection (unchecked)  Reduce API call frequency In Review High ⚡ Performance Sarah Johnson Sarah Johnson 8/31/2025 72% $225":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Reduce API call frequency"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/31/2025"
      - gridcell "72%"
      - gridcell "$225"
    - row "Press Space to toggle row selection (unchecked)  Write unit tests for auth module (Q2 Planning) In Progress Low 🧪 Testing Emma Davis Emma Davis 10/2/2025 51% $475":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Write unit tests for auth module (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "10/2/2025"
      - gridcell "51%"
      - gridcell "$475"
    - row "Press Space to toggle row selection (unchecked)  Implement lazy loading Backlog Low ⚡ Performance Priya Sharma Priya Sharma 10/4/2025 0% $8,025":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Implement lazy loading"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "10/4/2025"
      - gridcell "0%"
      - gridcell "$8,025"
    - row "Press Space to toggle row selection (unchecked)  Add performance benchmarks (Tech Debt) Testing High 🧪 Testing EJ Emily Jackson 8/28/2025 85% $325":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Add performance benchmarks (Tech Debt)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "EJ Emily Jackson"
      - gridcell "8/28/2025"
      - gridcell "85%"
      - gridcell "$325"
    - row "Press Space to toggle row selection (unchecked)  Write component snapshot tests Backlog Medium 🧪 Testing EJ Emily Jackson 9/7/2025 0% $3,825":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Write component snapshot tests"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "EJ Emily Jackson"
      - gridcell "9/7/2025"
      - gridcell "0%"
      - gridcell "$3,825"
    - row "Press Space to toggle row selection (unchecked)  Implement blue-green deployment (Performance Sprint) Backlog Low 🔧 DevOps Sarah Johnson Sarah Johnson 9/13/2025 0% $925":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Implement blue-green deployment (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/13/2025"
      - gridcell "0%"
      - gridcell "$925"
    - row "Press Space to toggle row selection (unchecked)  Optimize image loading (Q1 Goals) Todo Low ⚡ Performance Priya Sharma Priya Sharma 9/20/2025 13% $675":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Optimize image loading (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/20/2025"
      - gridcell "13%"
      - gridcell "$675"
    - row "Press Space to toggle row selection (unchecked)  Implement code splitting (Q1 Goals) Backlog Low ⚡ Performance EJ Emily Jackson 9/24/2025 0% $525":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Implement code splitting (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "EJ Emily Jackson"
      - gridcell "9/24/2025"
      - gridcell "0%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked)  Write accessibility tests In Progress Low 🧪 Testing Alex Chen Alex Chen 9/30/2025 58% $2,525":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Write accessibility tests"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/30/2025"
      - gridcell "58%"
      - gridcell "$2,525"
    - row "Press Space to toggle row selection (unchecked)  Fix infinite scroll pagination bug (Security Audit) Backlog Low 🐛 Bug Emma Davis Emma Davis 9/14/2025 0% $900":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Fix infinite scroll pagination bug (Security Audit)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/14/2025"
      - gridcell "0%"
      - gridcell "$900"
    - row "Press Space to toggle row selection (unchecked)  Fix infinite scroll pagination bug (Tech Debt) Testing Medium 🐛 Bug Michael Anderson Michael Anderson 9/2/2025 83% $300":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Fix infinite scroll pagination bug (Tech Debt)"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/2/2025"
      - gridcell "83%"
      - gridcell "$300"
    - row "Press Space to toggle row selection (unchecked)  Implement dark mode toggle (Sprint 24) In Progress High ✨ Feature Michael Anderson Michael Anderson 8/31/2025 27% $11,125":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Implement dark mode toggle (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/31/2025"
      - gridcell "27%"
      - gridcell "$11,125"
    - row "Press Space to toggle row selection (unchecked)  Handle null pointer exception in API client (Q2 Planning) Blocked High 🐛 Bug Emma Davis Emma Davis 8/25/2025 28% $5,575":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Handle null pointer exception in API client (Q2 Planning)"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/25/2025"
      - gridcell "28%"
      - gridcell "$5,575"
    - row "Press Space to toggle row selection (unchecked)  Create troubleshooting guide (Security Audit) In Review Medium 📝 Documentation Chris Martinez Chris Martinez 9/8/2025 62% $300":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Create troubleshooting guide (Security Audit)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/8/2025"
      - gridcell "62%"
      - gridcell "$300"
    - row "Press Space to toggle row selection (unchecked)  Test cross-browser compatibility (Q2 Planning) Testing Medium 🧪 Testing AW Amanda White 9/8/2025 90% $1,000":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Test cross-browser compatibility (Q2 Planning)"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "AW Amanda White"
      - gridcell "9/8/2025"
      - gridcell "90%"
      - gridcell "$1,000"
    - row "Press Space to toggle row selection (unchecked)  Create deployment rollback (Sprint 26) Backlog Medium 🔧 DevOps Ryan Thomas Ryan Thomas 9/8/2025 0% $750":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Create deployment rollback (Sprint 26)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/8/2025"
      - gridcell "0%"
      - gridcell "$750"
    - row "Press Space to toggle row selection (unchecked)  Add input sanitization (Tech Debt) Testing Critical 🔒 Security James Wilson James Wilson 8/23/2025 91% $725":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Add input sanitization (Tech Debt)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/23/2025"
      - gridcell "91%"
      - gridcell "$725"
    - row "Press Space to toggle row selection (unchecked)  Refactor authentication flow (Sprint 23) Backlog Critical ♻️ Refactor KZ Kevin Zhang 8/23/2025 0% $2,200":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Refactor authentication flow (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "KZ Kevin Zhang"
      - gridcell "8/23/2025"
      - gridcell "0%"
      - gridcell "$2,200"
    - row "Press Space to toggle row selection (unchecked)  Update README with examples (Sprint 26) Testing Critical 📝 Documentation Sophia Taylor Sophia Taylor 8/25/2025 87% $525":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Update README with examples (Sprint 26)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/25/2025"
      - gridcell "87%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked)  Optimize memory usage (Sprint 24) In Progress Medium ⚡ Performance EJ Emily Jackson 9/2/2025 41% $200":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Optimize memory usage (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "EJ Emily Jackson"
      - gridcell "9/2/2025"
      - gridcell "41%"
      - gridcell "$200"
    - row "Press Space to toggle row selection (unchecked)  Implement two-factor authentication (Sprint 27) In Review Low ✨ Feature Alex Chen Alex Chen 10/2/2025 77% $775":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Implement two-factor authentication (Sprint 27)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "10/2/2025"
      - gridcell "77%"
      - gridcell "$775"
    - row "Press Space to toggle row selection (unchecked)  Test offline functionality (Performance Sprint) Testing High 🧪 Testing JL Jessica Lopez 8/27/2025 89% $650":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell "Test offline functionality (Performance Sprint)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "JL Jessica Lopez"
      - gridcell "8/27/2025"
      - gridcell "89%"
      - gridcell "$650"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked)  $41,730,525":
      - gridcell "Press Space to toggle row selection (unchecked) ":
        - checkbox "Press Space to toggle row selection (unchecked)"
        - text: 
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,730,525"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
- listbox "Quick filter options":
  - option "All Tasks"
  - option "Critical Bugs"
  - option "Features"
  - option "In Progress"
  - option "Blocked"
```

# Test source

```ts
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
> 129 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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
  228 |     await expect(secondDropdown.locator("button").first()).toContainText(
  229 |       "Features",
```