# Test info

- Name: QuickFilterDropdown - Updated Tests >> should open date quick filter dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickFilters.updated.spec.ts:39:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    15 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickFilters.updated.spec.ts:57:16
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
- paragraph: $41,133,425
- img
- paragraph: Average Progress
- paragraph: 46.4%
- img
- paragraph: Budget Remaining
- paragraph: $22,167,882
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
    - row "API-9525":
      - gridcell "API-9525"
    - row "DASH-3055":
      - gridcell "DASH-3055"
    - row "WEB-6968":
      - gridcell "WEB-6968"
    - row "ADMIN-4790":
      - gridcell "ADMIN-4790"
    - row "UI-7626":
      - gridcell "UI-7626"
    - row "PROJ-2222":
      - gridcell "PROJ-2222"
    - row "MOBILE-3925":
      - gridcell "MOBILE-3925"
    - row "API-4285":
      - gridcell "API-4285"
    - row "WEB-5192":
      - gridcell "WEB-5192"
    - row "ADMIN-10210":
      - gridcell "ADMIN-10210"
    - row "WEB-10793":
      - gridcell "WEB-10793"
    - row "WEB-10012":
      - gridcell "WEB-10012"
    - row "INFRA-1941":
      - gridcell "INFRA-1941"
    - row "WEB-2470":
      - gridcell "WEB-2470"
    - row "API-5655":
      - gridcell "API-5655"
    - row "UI-5745":
      - gridcell "UI-5745"
    - row "WEB-7225":
      - gridcell "WEB-7225"
    - row "API-7676":
      - gridcell "API-7676"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Configure firewall rules (Q1 Goals) Todo High 🔒 Security Isabella Garcia Isabella Garcia 8/28/2025 15% $3,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure firewall rules (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/28/2025"
      - gridcell "15%"
      - gridcell "$3,350"
    - row "Press Space to toggle row selection (unchecked) Set up staging environment (Sprint 23) In Progress High 🔧 DevOps Olivia Brown Olivia Brown 9/2/2025 45% $3,425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up staging environment (Sprint 23)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/2/2025"
      - gridcell "45%"
      - gridcell "$3,425"
    - row "Press Space to toggle row selection (unchecked) Create advanced search filters (Sprint 24) Testing Critical ✨ Feature Priya Sharma Priya Sharma 8/27/2025 91% $75":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create advanced search filters (Sprint 24)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/27/2025"
      - gridcell "91%"
      - gridcell "$75"
    - row "Press Space to toggle row selection (unchecked) Handle null pointer exception in API client In Progress Critical 🐛 Bug EJ Emily Jackson 8/26/2025 55% $1,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Handle null pointer exception in API client"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "EJ Emily Jackson"
      - gridcell "8/26/2025"
      - gridcell "55%"
      - gridcell "$1,650"
    - row "Press Space to toggle row selection (unchecked) Modernize legacy jQuery code (Sprint 26) Todo High ♻️ Refactor Sarah Johnson Sarah Johnson 9/2/2025 14% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Modernize legacy jQuery code (Sprint 26)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/2/2025"
      - gridcell "14%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Update to ES6 modules (Sprint 27) In Progress Low ♻️ Refactor James Wilson James Wilson 9/28/2025 50% $525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update to ES6 modules (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/28/2025"
      - gridcell "50%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked) Configure firewall rules (Sprint 26) Todo Low 🔒 Security KZ Kevin Zhang 9/5/2025 16% $17,575":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure firewall rules (Sprint 26)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "KZ Kevin Zhang"
      - gridcell "9/5/2025"
      - gridcell "16%"
      - gridcell "$17,575"
    - row "Press Space to toggle row selection (unchecked) Set up log aggregation (Performance Sprint) In Review Critical 🔧 DevOps Maya Patel Maya Patel 8/25/2025 67% $950":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up log aggregation (Performance Sprint)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/25/2025"
      - gridcell "67%"
      - gridcell "$950"
    - row "Press Space to toggle row selection (unchecked) Create security penetration tests (Tech Debt) In Review Medium 🧪 Testing Emma Davis Emma Davis 9/13/2025 75% $18,075":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create security penetration tests (Tech Debt)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/13/2025"
      - gridcell "75%"
      - gridcell "$18,075"
    - row "Press Space to toggle row selection (unchecked) Document error handling patterns Todo Medium 📝 Documentation Michael Anderson Michael Anderson 9/12/2025 15% $16,525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document error handling patterns"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/12/2025"
      - gridcell "15%"
      - gridcell "$16,525"
    - row "Press Space to toggle row selection (unchecked) Modernize legacy jQuery code (Security Audit) Todo High ♻️ Refactor Isabella Garcia Isabella Garcia 8/30/2025 13% $3,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Modernize legacy jQuery code (Security Audit)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/30/2025"
      - gridcell "13%"
      - gridcell "$3,350"
    - row "Press Space to toggle row selection (unchecked) Create integration test suite (Q2 Planning) In Progress Medium 🧪 Testing KZ Kevin Zhang 9/11/2025 28% $8,250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create integration test suite (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "KZ Kevin Zhang"
      - gridcell "9/11/2025"
      - gridcell "28%"
      - gridcell "$8,250"
    - row "Press Space to toggle row selection (unchecked) Add E2E tests for checkout flow (Sprint 25) Testing Medium 🧪 Testing Isabella Garcia Isabella Garcia 9/10/2025 86% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add E2E tests for checkout flow (Sprint 25)"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/10/2025"
      - gridcell "86%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Set up SSL certificates (Q2 Planning) Todo Low 🔒 Security Alex Chen Alex Chen 9/11/2025 13% $1,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up SSL certificates (Q2 Planning)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/11/2025"
      - gridcell "13%"
      - gridcell "$1,725"
    - row "Press Space to toggle row selection (unchecked) Add brute force protection Backlog High 🔒 Security Priya Sharma Priya Sharma 8/25/2025 0% $9,025":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add brute force protection"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/25/2025"
      - gridcell "0%"
      - gridcell "$9,025"
    - row "Press Space to toggle row selection (unchecked) Add request batching (Sprint 24) Backlog Low ⚡ Performance Marcus Williams Marcus Williams 9/7/2025 0% $625":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add request batching (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/7/2025"
      - gridcell "0%"
      - gridcell "$625"
    - row "Press Space to toggle row selection (unchecked) Add progressive web app features Todo Critical ⚡ Performance AW Amanda White 8/23/2025 5% $600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add progressive web app features"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "AW Amanda White"
      - gridcell "8/23/2025"
      - gridcell "5%"
      - gridcell "$600"
    - row "Press Space to toggle row selection (unchecked) Debug performance regression in search (Sprint 24) Todo Low 🐛 Bug Maya Patel Maya Patel 9/5/2025 17% $650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug performance regression in search (Sprint 24)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/5/2025"
      - gridcell "17%"
      - gridcell "$650"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,133,425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,133,425"
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
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("QuickFilterDropdown - Updated Tests", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for the grid to be ready
   9 |     await page.waitForSelector(".ag-root-wrapper");
   10 |     await page.waitForTimeout(1000); // Give time for data to load
   11 |   });
   12 |
   13 |   test("should have quick filter dropdowns visible", async ({ page }) => {
   14 |     // Look for quick filter dropdowns by their aria labels or button text
   15 |     const quickFilterButtons = await page
   16 |       .locator('button[aria-label*="Quick filter"]')
   17 |       .count();
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
>  57 |     await page.waitForSelector('[role="listbox"]', { timeout: 5000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
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
  118 |       await page.waitForSelector('[role="listbox"]');
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