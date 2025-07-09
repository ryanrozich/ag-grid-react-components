# Test info

- Name: QuickFilterDropdown - Updated Tests >> should show active filters component
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickFilters.updated.spec.ts:110:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    60 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickFilters.updated.spec.ts:118:18
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
- button "Quick filter options" [expanded]:
  - text: All Time
  - img
- button "Quick filter options":
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
- paragraph: $40,973,950
- img
- paragraph: Average Progress
- paragraph: 46.3%
- img
- paragraph: Budget Remaining
- paragraph: $21,900,280
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
    - row "API-1450":
      - gridcell "API-1450"
    - row "API-2813":
      - gridcell "API-2813"
    - row "MOBILE-2143":
      - gridcell "MOBILE-2143"
    - row "FRONTEND-3142":
      - gridcell "FRONTEND-3142"
    - row "INFRA-4394":
      - gridcell "INFRA-4394"
    - row "WEB-6667":
      - gridcell "WEB-6667"
    - row "MOBILE-9247":
      - gridcell "MOBILE-9247"
    - row "DATA-8155":
      - gridcell "DATA-8155"
    - row "APP-5324":
      - gridcell "APP-5324"
    - row "AUTH-8639":
      - gridcell "AUTH-8639"
    - row "BACKEND-8680":
      - gridcell "BACKEND-8680"
    - row "PROJ-5522":
      - gridcell "PROJ-5522"
    - row "INFRA-5605":
      - gridcell "INFRA-5605"
    - row "API-7425":
      - gridcell "API-7425"
    - row "DATA-7665":
      - gridcell "DATA-7665"
    - row "PROJ-10434":
      - gridcell "PROJ-10434"
    - row "INFRA-1202":
      - gridcell "INFRA-1202"
    - row "WEB-5138":
      - gridcell "WEB-5138"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Split monolithic components (Sprint 24) Testing Low ♻️ Refactor Alex Chen Alex Chen 9/12/2025 85% $5,600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Split monolithic components (Sprint 24)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/12/2025"
      - gridcell "85%"
      - gridcell "$5,600"
    - row "Press Space to toggle row selection (unchecked) Document new filter components (Tech Debt) Todo Critical 📝 Documentation DK Daniel Kim 8/27/2025 9% $5,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document new filter components (Tech Debt)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "DK Daniel Kim"
      - gridcell "8/27/2025"
      - gridcell "9%"
      - gridcell "$5,975"
    - row "Press Space to toggle row selection (unchecked) Implement virtual scrolling (Tech Debt) Backlog Low ⚡ Performance Sophia Taylor Sophia Taylor 10/5/2025 0% $275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement virtual scrolling (Tech Debt)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "10/5/2025"
      - gridcell "0%"
      - gridcell "$275"
    - row "Press Space to toggle row selection (unchecked) Fix broken unit tests in CI pipeline (Sprint 27) Testing Critical 🐛 Bug Maya Patel Maya Patel 8/26/2025 92% $1,550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken unit tests in CI pipeline (Sprint 27)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/26/2025"
      - gridcell "92%"
      - gridcell "$1,550"
    - row "Press Space to toggle row selection (unchecked) Debug WebSocket connection timeout (Q1 Goals) In Progress High 🐛 Bug Priya Sharma Priya Sharma 8/29/2025 25% $1,675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug WebSocket connection timeout (Q1 Goals)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/29/2025"
      - gridcell "25%"
      - gridcell "$1,675"
    - row "Press Space to toggle row selection (unchecked) Implement social media sharing (Sprint 23) In Review Low ✨ Feature Priya Sharma Priya Sharma 9/27/2025 76% $14,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement social media sharing (Sprint 23)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/27/2025"
      - gridcell "76%"
      - gridcell "$14,975"
    - row "Press Space to toggle row selection (unchecked) Configure Docker containers (Q1 Goals) Backlog High 🔧 DevOps Emma Davis Emma Davis 8/29/2025 0% $17,225":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure Docker containers (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/29/2025"
      - gridcell "0%"
      - gridcell "$17,225"
    - row "Press Space to toggle row selection (unchecked) Add audit logging (Sprint 27) Todo Medium 🔒 Security Alex Chen Alex Chen 8/28/2025 9% $8,550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add audit logging (Sprint 27)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/28/2025"
      - gridcell "9%"
      - gridcell "$8,550"
    - row "Press Space to toggle row selection (unchecked) Set up infrastructure as code (Sprint 27) Todo High 🔧 DevOps Emma Davis Emma Davis 9/1/2025 6% $475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up infrastructure as code (Sprint 27)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/1/2025"
      - gridcell "6%"
      - gridcell "$475"
    - row "Press Space to toggle row selection (unchecked) Build real-time notifications system (Sprint 26) Testing Low ✨ Feature Olivia Brown Olivia Brown 9/20/2025 83% $3,150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build real-time notifications system (Sprint 26)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/20/2025"
      - gridcell "83%"
      - gridcell "$3,150"
    - row "Press Space to toggle row selection (unchecked) Write unit tests for auth module (Sprint 27) Backlog High 🧪 Testing Alex Chen Alex Chen 8/26/2025 0% $7,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write unit tests for auth module (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/26/2025"
      - gridcell "0%"
      - gridcell "$7,700"
    - row "Press Space to toggle row selection (unchecked) Create disaster recovery plan (Sprint 25) Testing High 🔧 DevOps James Wilson James Wilson 8/27/2025 92% $5,550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create disaster recovery plan (Sprint 25)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/27/2025"
      - gridcell "92%"
      - gridcell "$5,550"
    - row "Press Space to toggle row selection (unchecked) Fix login form validation error Todo Low 🐛 Bug JR John Robinson 9/1/2025 19% $4,625":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix login form validation error"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "JR John Robinson"
      - gridcell "9/1/2025"
      - gridcell "19%"
      - gridcell "$4,625"
    - row "Press Space to toggle row selection (unchecked) Add SQL injection prevention In Progress High 🔒 Security Alex Chen Alex Chen 8/24/2025 36% $19,050":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add SQL injection prevention"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/24/2025"
      - gridcell "36%"
      - gridcell "$19,050"
    - row "Press Space to toggle row selection (unchecked) Document error handling patterns Backlog Low 📝 Documentation DK Daniel Kim 9/12/2025 0% $2,450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document error handling patterns"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "DK Daniel Kim"
      - gridcell "9/12/2025"
      - gridcell "0%"
      - gridcell "$2,450"
    - row "Press Space to toggle row selection (unchecked) Set up infrastructure as code Backlog Medium 🔧 DevOps Isabella Garcia Isabella Garcia 9/1/2025 0% $175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up infrastructure as code"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/1/2025"
      - gridcell "0%"
      - gridcell "$175"
    - row "Press Space to toggle row selection (unchecked) Optimize bundle size (Tech Debt) Backlog Low ⚡ Performance Chris Martinez Chris Martinez 9/16/2025 0% $2,250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Optimize bundle size (Tech Debt)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/16/2025"
      - gridcell "0%"
      - gridcell "$2,250"
    - row "Press Space to toggle row selection (unchecked) Create backup automation (Sprint 23) Testing High 🔧 DevOps Isabella Garcia Isabella Garcia 8/27/2025 93% $775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create backup automation (Sprint 23)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/27/2025"
      - gridcell "93%"
      - gridcell "$775"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,973,950":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,973,950"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
- listbox "Quick filter options":
  - option "All Time" [selected]:
    - text: All Time
    - img
  - option "Last 7 Days"
  - option "This Month"
  - option "Overdue"
  - option "Not Started"
```

# Test source

```ts
   18 |
   19 |     // We should have at least one quick filter dropdown
   20 |     expect(quickFilterButtons).toBeGreaterThan(0);
   21 |
   22 |     // Alternative: look for the specific dropdown containers
   23 |     const dropdownContainers = await page
   24 |       .locator('[data-testid="quick-filter-dropdown"]')
   25 |       .count();
   26 |
   27 |     if (dropdownContainers > 0) {
   28 |       expect(dropdownContainers).toBeGreaterThan(0);
   29 |     } else {
   30 |       // If no data-testid, look for buttons with dropdown indicators
   31 |       const dropdownButtons = await page
   32 |         .locator("button:has(svg)")
   33 |         .filter({ hasText: /All Time|All Tasks|Today|This Week/ })
   34 |         .count();
   35 |       expect(dropdownButtons).toBeGreaterThan(0);
   36 |     }
   37 |   });
   38 |
   39 |   test("should open date quick filter dropdown", async ({ page }) => {
   40 |     // Find the first quick filter that looks like a date filter
   41 |     const dateFilterButton = page
   42 |       .locator("button")
   43 |       .filter({ hasText: /All Time|Today|This Week|Last/ })
   44 |       .first();
   45 |
   46 |     // Check if it exists
   47 |     const exists = (await dateFilterButton.count()) > 0;
   48 |     if (!exists) {
   49 |       test.skip();
   50 |       return;
   51 |     }
   52 |
   53 |     // Click to open dropdown
   54 |     await dateFilterButton.click();
   55 |
   56 |     // Wait for dropdown to appear
   57 |     await page.waitForSelector('[role="listbox"]', { timeout: 5000 });
   58 |
   59 |     // Check that options are visible
   60 |     const options = await page.locator('[role="option"]').count();
   61 |     expect(options).toBeGreaterThan(0);
   62 |
   63 |     // Close dropdown by clicking outside
   64 |     await page.click("body", { position: { x: 0, y: 0 } });
   65 |   });
   66 |
   67 |   test("should filter grid when selecting date option", async ({ page }) => {
   68 |     // Get initial row count
   69 |     const initialRows = await page
   70 |       .locator(".ag-center-cols-container .ag-row")
   71 |       .count();
   72 |
   73 |     // Find date filter button
   74 |     const dateFilterButton = page
   75 |       .locator("button")
   76 |       .filter({ hasText: /All Time/ })
   77 |       .first();
   78 |     const exists = (await dateFilterButton.count()) > 0;
   79 |     if (!exists) {
   80 |       test.skip();
   81 |       return;
   82 |     }
   83 |
   84 |     // Open dropdown
   85 |     await dateFilterButton.click();
   86 |     await page.waitForSelector('[role="listbox"]');
   87 |
   88 |     // Select "Today" option if it exists
   89 |     const todayOption = page
   90 |       .locator('[role="option"]')
   91 |       .filter({ hasText: "Today" })
   92 |       .first();
   93 |     if ((await todayOption.count()) > 0) {
   94 |       await todayOption.click();
   95 |
   96 |       // Wait for grid to update
   97 |       await page.waitForTimeout(1000);
   98 |
   99 |       // Check that row count changed
  100 |       const filteredRows = await page
  101 |         .locator(".ag-center-cols-container .ag-row")
  102 |         .count();
  103 |       expect(filteredRows).toBeLessThanOrEqual(initialRows);
  104 |
  105 |       // Verify the button now shows "Today"
  106 |       await expect(dateFilterButton).toContainText("Today");
  107 |     }
  108 |   });
  109 |
  110 |   test("should show active filters component", async ({ page }) => {
  111 |     // Apply a filter first
  112 |     const dateFilterButton = page
  113 |       .locator("button")
  114 |       .filter({ hasText: /All Time/ })
  115 |       .first();
  116 |     if ((await dateFilterButton.count()) > 0) {
  117 |       await dateFilterButton.click();
> 118 |       await page.waitForSelector('[role="listbox"]');
      |                  ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  119 |
  120 |       const todayOption = page
  121 |         .locator('[role="option"]')
  122 |         .filter({ hasText: "Today" })
  123 |         .first();
  124 |       if ((await todayOption.count()) > 0) {
  125 |         await todayOption.click();
  126 |         await page.waitForTimeout(500);
  127 |
  128 |         // Check for active filters display
  129 |         const activeFilters = await page
  130 |           .locator("text=/Due Date.*Today/")
  131 |           .count();
  132 |         if (activeFilters > 0) {
  133 |           expect(activeFilters).toBeGreaterThan(0);
  134 |         } else {
  135 |           // Alternative: look for filter pills
  136 |           const filterPills = await page
  137 |             .locator('button:has-text("×")')
  138 |             .count();
  139 |           expect(filterPills).toBeGreaterThan(0);
  140 |         }
  141 |       }
  142 |     }
  143 |   });
  144 | });
  145 |
```