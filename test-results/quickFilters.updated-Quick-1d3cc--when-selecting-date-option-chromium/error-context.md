# Test info

- Name: QuickFilterDropdown - Updated Tests >> should filter grid when selecting date option
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickFilters.updated.spec.ts:67:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    59 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickFilters.updated.spec.ts:86:16
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
- paragraph: $40,974,075
- img
- paragraph: Average Progress
- paragraph: 45.9%
- img
- paragraph: Budget Remaining
- paragraph: $22,100,072
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
    - row "API-4003":
      - gridcell "API-4003"
    - row "BACKEND-4832":
      - gridcell "BACKEND-4832"
    - row "MOBILE-2094":
      - gridcell "MOBILE-2094"
    - row "AUTH-2796":
      - gridcell "AUTH-2796"
    - row "ADMIN-8243":
      - gridcell "ADMIN-8243"
    - row "API-8666":
      - gridcell "API-8666"
    - row "UI-9240":
      - gridcell "UI-9240"
    - row "INFRA-1201":
      - gridcell "INFRA-1201"
    - row "PROJ-1935":
      - gridcell "PROJ-1935"
    - row "USER-2730":
      - gridcell "USER-2730"
    - row "INFRA-3863":
      - gridcell "INFRA-3863"
    - row "APP-5812":
      - gridcell "APP-5812"
    - row "MOBILE-9968":
      - gridcell "MOBILE-9968"
    - row "AUTH-2058":
      - gridcell "AUTH-2058"
    - row "API-2758":
      - gridcell "API-2758"
    - row "FRONTEND-5110":
      - gridcell "FRONTEND-5110"
    - row "CORE-5425":
      - gridcell "CORE-5425"
    - row "WEB-7109":
      - gridcell "WEB-7109"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Correct CSS overflow in sidebar (Q2 Planning) In Review Low 🐛 Bug EJ Emily Jackson 9/14/2025 79% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct CSS overflow in sidebar (Q2 Planning)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "EJ Emily Jackson"
      - gridcell "9/14/2025"
      - gridcell "79%"
      - gridcell "$450"
    - row "Press Space to toggle row selection (unchecked) Configure firewall rules (Sprint 25) Backlog High 🔒 Security JL Jessica Lopez 8/30/2025 0% $4,450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure firewall rules (Sprint 25)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "JL Jessica Lopez"
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$4,450"
    - row "Press Space to toggle row selection (unchecked) Implement auto-scaling (Sprint 27) In Progress Medium 🔧 DevOps Chris Martinez Chris Martinez 9/9/2025 57% $8,550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement auto-scaling (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/9/2025"
      - gridcell "57%"
      - gridcell "$8,550"
    - row "Press Space to toggle row selection (unchecked) Test offline functionality (Sprint 23) In Progress Low 🧪 Testing Marcus Williams Marcus Williams 9/13/2025 40% $1,125":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Test offline functionality (Sprint 23)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/13/2025"
      - gridcell "40%"
      - gridcell "$1,125"
    - row "Press Space to toggle row selection (unchecked) Refactor error handling (Sprint 24) In Progress Critical ♻️ Refactor Olivia Brown Olivia Brown 8/26/2025 30% $975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Refactor error handling (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/26/2025"
      - gridcell "30%"
      - gridcell "$975"
    - row "Press Space to toggle row selection (unchecked) Document component props (Sprint 27) Todo Low 📝 Documentation Emma Davis Emma Davis 9/14/2025 16% $100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document component props (Sprint 27)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/14/2025"
      - gridcell "16%"
      - gridcell "$100"
    - row "Press Space to toggle row selection (unchecked) Add CDN for static assets (Performance Sprint) In Review Low ⚡ Performance Ryan Thomas Ryan Thomas 9/28/2025 71% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add CDN for static assets (Performance Sprint)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/28/2025"
      - gridcell "71%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Handle null pointer exception in API client In Progress Low 🐛 Bug JL Jessica Lopez 9/10/2025 26% $7,825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Handle null pointer exception in API client"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "JL Jessica Lopez"
      - gridcell "9/10/2025"
      - gridcell "26%"
      - gridcell "$7,825"
    - row "Press Space to toggle row selection (unchecked) Implement social media sharing Todo Medium ✨ Feature Michael Anderson Michael Anderson 9/11/2025 10% $4,050":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement social media sharing"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/11/2025"
      - gridcell "10%"
      - gridcell "$4,050"
    - row "Press Space to toggle row selection (unchecked) Debug performance regression in search (Performance Sprint) Todo Medium 🐛 Bug Alex Chen Alex Chen 8/29/2025 5% $1,025":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug performance regression in search (Performance Sprint)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/29/2025"
      - gridcell "5%"
      - gridcell "$1,025"
    - row "Press Space to toggle row selection (unchecked) Add audit logging In Progress Critical 🔒 Security Maya Patel Maya Patel 8/24/2025 24% $13,275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add audit logging"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/24/2025"
      - gridcell "24%"
      - gridcell "$13,275"
    - row "Press Space to toggle row selection (unchecked) Document error handling patterns Backlog High 📝 Documentation Emma Davis Emma Davis 8/27/2025 0% $750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document error handling patterns"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/27/2025"
      - gridcell "0%"
      - gridcell "$750"
    - row "Press Space to toggle row selection (unchecked) Handle null pointer exception in API client In Progress Medium 🐛 Bug Sophia Taylor Sophia Taylor 8/28/2025 46% $350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Handle null pointer exception in API client"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/28/2025"
      - gridcell "46%"
      - gridcell "$350"
    - row "Press Space to toggle row selection (unchecked) Add drag-and-drop file upload (Sprint 26) Backlog Low ✨ Feature JR John Robinson 9/21/2025 0% $425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add drag-and-drop file upload (Sprint 26)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "JR John Robinson"
      - gridcell "9/21/2025"
      - gridcell "0%"
      - gridcell "$425"
    - row "Press Space to toggle row selection (unchecked) Add keyboard shortcuts (Security Audit) In Progress Medium ✨ Feature James Wilson James Wilson 8/31/2025 20% $3,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add keyboard shortcuts (Security Audit)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/31/2025"
      - gridcell "20%"
      - gridcell "$3,700"
    - row "Press Space to toggle row selection (unchecked) Create video tutorials (Q1 Goals) Testing Low 📝 Documentation Priya Sharma Priya Sharma 9/13/2025 93% $175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create video tutorials (Q1 Goals)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/13/2025"
      - gridcell "93%"
      - gridcell "$175"
    - row "Press Space to toggle row selection (unchecked) Configure load balancer (Q2 Planning) Testing Medium 🔧 DevOps Michael Anderson Michael Anderson 9/9/2025 81% $775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure load balancer (Q2 Planning)"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/9/2025"
      - gridcell "81%"
      - gridcell "$775"
    - row "Press Space to toggle row selection (unchecked) Refactor state management (Sprint 25) Backlog High ♻️ Refactor Michael Anderson Michael Anderson 8/30/2025 0% $300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Refactor state management (Sprint 25)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$300"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,974,075":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,974,075"
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
>  86 |     await page.waitForSelector('[role="listbox"]');
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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