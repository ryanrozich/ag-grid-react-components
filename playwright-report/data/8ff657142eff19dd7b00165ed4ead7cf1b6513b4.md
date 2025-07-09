# Test info

- Name: QuickFilterDropdown Portal Rendering >> should apply filter when option is selected from portal-rendered dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickfilter-portal-rendering.spec.ts:79:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('button:has-text("All Time")').first()
Expected string: "Last 7 Days"
Received: <element(s) not found>
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('button:has-text("All Time")').first()

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/quickfilter-portal-rendering.spec.ts:95:30
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
  - text: Last 7 Days
  - img
- button "Quick filter options":
  - text: Task type
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- button "My Views":
  - img
  - text: My Views
  - img
- button "Filter view options":
  - img
- img
- paragraph: Number of Tasks
- paragraph: "513"
- img
- paragraph: Total Budget
- paragraph: $2,047,600
- img
- paragraph: Average Progress
- paragraph: 43.8%
- img
- paragraph: Budget Remaining
- paragraph: $1,155,160
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
    - row "BACKEND-8584":
      - gridcell "BACKEND-8584"
    - row "BACKEND-1097":
      - gridcell "BACKEND-1097"
    - row "PROJ-1239":
      - gridcell "PROJ-1239"
    - row "BACKEND-1495":
      - gridcell "BACKEND-1495"
    - row "DASH-1496":
      - gridcell "DASH-1496"
    - row "MOBILE-3747":
      - gridcell "MOBILE-3747"
    - row "WEB-4549":
      - gridcell "WEB-4549"
    - row "DATA-8582":
      - gridcell "DATA-8582"
    - row "API-8708":
      - gridcell "API-8708"
    - row "API-10184":
      - gridcell "API-10184"
    - row "ADMIN-10674":
      - gridcell "ADMIN-10674"
    - row "PROJ-2161":
      - gridcell "PROJ-2161"
    - row "AUTH-3162":
      - gridcell "AUTH-3162"
    - row "API-3301":
      - gridcell "API-3301"
    - row "FRONTEND-3715":
      - gridcell "FRONTEND-3715"
    - row "ADMIN-3829":
      - gridcell "ADMIN-3829"
    - row "BACKEND-4919":
      - gridcell "BACKEND-4919"
    - row "FRONTEND-4989":
      - gridcell "FRONTEND-4989"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Implement session management (Performance Sprint) In Progress Critical 🔒 Security Emma Davis Emma Davis 7/8/2025 27% $925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement session management (Performance Sprint)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "7/8/2025"
      - gridcell "27%"
      - gridcell "$925"
    - row "Press Space to toggle row selection (unchecked) Add internationalization tests (Q1 Goals) Blocked Critical 🧪 Testing Priya Sharma Priya Sharma 7/8/2025 22% $3,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add internationalization tests (Q1 Goals)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/8/2025"
      - gridcell "22%"
      - gridcell "$3,650"
    - row "Press Space to toggle row selection (unchecked) Create user profile dashboard (Sprint 25) Blocked Critical ✨ Feature EJ Emily Jackson 7/8/2025 29% $1,100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create user profile dashboard (Sprint 25)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "EJ Emily Jackson"
      - gridcell "7/8/2025"
      - gridcell "29%"
      - gridcell "$1,100"
    - row "Press Space to toggle row selection (unchecked) Fix broken deep links in navigation (Sprint 24) In Progress High 🐛 Bug Olivia Brown Olivia Brown 7/8/2025 37% $5,475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken deep links in navigation (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "7/8/2025"
      - gridcell "37%"
      - gridcell "$5,475"
    - row "Press Space to toggle row selection (unchecked) Fix broken deep links in navigation (Sprint 27) Blocked Critical 🐛 Bug Maya Patel Maya Patel 7/8/2025 37% $1,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken deep links in navigation (Sprint 27)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "7/8/2025"
      - gridcell "37%"
      - gridcell "$1,900"
    - row "Press Space to toggle row selection (unchecked) Update API documentation (Sprint 23) In Progress Critical 📝 Documentation Sophia Taylor Sophia Taylor 7/8/2025 40% $2,925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update API documentation (Sprint 23)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "7/8/2025"
      - gridcell "40%"
      - gridcell "$2,925"
    - row "Press Space to toggle row selection (unchecked) Fix responsive layout on tablets Todo Critical 🐛 Bug Priya Sharma Priya Sharma 7/7/2025 13% $1,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix responsive layout on tablets"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "7/7/2025"
      - gridcell "13%"
      - gridcell "$1,350"
    - row "Press Space to toggle row selection (unchecked) Set up vulnerability scanning (Q1 Goals) Blocked Critical 🔒 Security Chris Martinez Chris Martinez 7/8/2025 39% $8,550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up vulnerability scanning (Q1 Goals)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "7/8/2025"
      - gridcell "39%"
      - gridcell "$8,550"
    - row "Press Space to toggle row selection (unchecked) Configure security headers (Performance Sprint) Backlog Critical 🔒 Security Michael Anderson Michael Anderson 7/8/2025 0% $725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure security headers (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "7/8/2025"
      - gridcell "0%"
      - gridcell "$725"
    - row "Press Space to toggle row selection (unchecked) Update README with examples (Performance Sprint) In Progress Critical 📝 Documentation Michael Anderson Michael Anderson 7/8/2025 53% $550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update README with examples (Performance Sprint)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "7/8/2025"
      - gridcell "53%"
      - gridcell "$550"
    - row "Press Space to toggle row selection (unchecked) Add encryption at rest (Performance Sprint) Backlog High 🔒 Security JL Jessica Lopez 7/8/2025 0% $8,100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add encryption at rest (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "JL Jessica Lopez"
      - gridcell "7/8/2025"
      - gridcell "0%"
      - gridcell "$8,100"
    - row "Press Space to toggle row selection (unchecked) Simplify complex conditionals (Sprint 27) Blocked Critical ♻️ Refactor Ryan Thomas Ryan Thomas 7/7/2025 28% $18,200":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Simplify complex conditionals (Sprint 27)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "7/7/2025"
      - gridcell "28%"
      - gridcell "$18,200"
    - row "Press Space to toggle row selection (unchecked) Debug WebSocket connection timeout Blocked Critical 🐛 Bug James Wilson James Wilson 7/6/2025 18% $4,950":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug WebSocket connection timeout"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "7/6/2025"
      - gridcell "18%"
      - gridcell "$4,950"
    - row "Press Space to toggle row selection (unchecked) Create troubleshooting guide (Tech Debt) In Progress Critical 📝 Documentation Sarah Johnson Sarah Johnson 7/8/2025 30% $350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create troubleshooting guide (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "7/8/2025"
      - gridcell "30%"
      - gridcell "$350"
    - row "Press Space to toggle row selection (unchecked) Add drag-and-drop file upload (Sprint 23) Blocked Critical ✨ Feature KZ Kevin Zhang 7/7/2025 25% $675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add drag-and-drop file upload (Sprint 23)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "KZ Kevin Zhang"
      - gridcell "7/7/2025"
      - gridcell "25%"
      - gridcell "$675"
    - row "Press Space to toggle row selection (unchecked) Add export to PDF functionality (Security Audit) Blocked Critical ✨ Feature Sarah Johnson Sarah Johnson 7/8/2025 28% $1,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add export to PDF functionality (Security Audit)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "7/8/2025"
      - gridcell "28%"
      - gridcell "$1,350"
    - row "Press Space to toggle row selection (unchecked) Document new filter components (Tech Debt) Blocked Critical 📝 Documentation JL Jessica Lopez 7/8/2025 34% $5,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document new filter components (Tech Debt)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "JL Jessica Lopez"
      - gridcell "7/8/2025"
      - gridcell "34%"
      - gridcell "$5,350"
    - row "Press Space to toggle row selection (unchecked) Add encryption at rest (Q1 Goals) In Progress Critical 🔒 Security JR John Robinson 7/7/2025 32% $100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add encryption at rest (Q1 Goals)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "JR John Robinson"
      - gridcell "7/7/2025"
      - gridcell "32%"
      - gridcell "$100"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $2,047,600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$2,047,600"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 513 of 10,000"
- status: "Total Rows : 10,000 Filtered : 513"
- status
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | /**
   4 |  * This test prevents regression of the QuickFilterDropdown rendering issue
   5 |  * where dropdowns were being clipped by parent containers with overflow: hidden.
   6 |  * The fix was to add usePortal="always" to the QuickFilterDropdown components.
   7 |  */
   8 | test.describe("QuickFilterDropdown Portal Rendering", () => {
   9 |   test.beforeEach(async ({ page }) => {
   10 |     await page.goto("/demo");
   11 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
   12 |     await page.waitForTimeout(1000); // Give time for grid to fully render
   13 |   });
   14 |
   15 |   test("should render dropdown using portal without clipping", async ({
   16 |     page,
   17 |   }) => {
   18 |     // Wait for the quick filter dropdowns to be visible
   19 |     const dateFilter = page.locator('button:has-text("All Time")').first();
   20 |     const taskFilter = page.locator('button:has-text("Task type")').first();
   21 |
   22 |     // Check that the quick filter buttons exist
   23 |     await expect(dateFilter).toBeVisible({ timeout: 10000 });
   24 |     await expect(taskFilter).toBeVisible({ timeout: 10000 });
   25 |
   26 |     // Click the date filter dropdown
   27 |     await dateFilter.click();
   28 |
   29 |     // Wait for dropdown to open
   30 |     await page.waitForTimeout(500);
   31 |
   32 |     // Check that the dropdown menu is visible and not clipped
   33 |     const dropdownMenu = page.locator('#quick-filter-dropdown[role="listbox"]');
   34 |     await expect(dropdownMenu).toBeVisible();
   35 |
   36 |     // Get the bounding boxes to ensure dropdown is not clipped
   37 |     const dropdownBox = await dropdownMenu.boundingBox();
   38 |     const viewportSize = page.viewportSize();
   39 |
   40 |     // Verify dropdown is within viewport (not clipped)
   41 |     expect(dropdownBox).toBeTruthy();
   42 |     if (dropdownBox && viewportSize) {
   43 |       expect(dropdownBox.x).toBeGreaterThanOrEqual(0);
   44 |       expect(dropdownBox.y).toBeGreaterThanOrEqual(0);
   45 |       expect(dropdownBox.x + dropdownBox.width).toBeLessThanOrEqual(
   46 |         viewportSize.width,
   47 |       );
   48 |       // Y position can extend below viewport for scrolling
   49 |     }
   50 |
   51 |     // Check that options are visible
   52 |     const lastSevenDays = page.locator('text="Last 7 Days"').first();
   53 |     const thisMonth = page.locator('text="This Month"').first();
   54 |
   55 |     await expect(lastSevenDays).toBeVisible();
   56 |     await expect(thisMonth).toBeVisible();
   57 |
   58 |     // Click outside to close
   59 |     await page.click("body", { position: { x: 0, y: 0 } });
   60 |     await page.waitForTimeout(200);
   61 |
   62 |     // Test the task type filter as well
   63 |     await taskFilter.click();
   64 |     await page.waitForTimeout(500);
   65 |
   66 |     const taskDropdownMenu = page.locator(
   67 |       '#quick-filter-dropdown[role="listbox"]',
   68 |     );
   69 |     await expect(taskDropdownMenu).toBeVisible();
   70 |
   71 |     // Check task filter options
   72 |     const allTasks = page.locator('text="All Tasks"').first();
   73 |     const criticalBugs = page.locator('text="Critical Bugs"').first();
   74 |
   75 |     await expect(allTasks).toBeVisible();
   76 |     await expect(criticalBugs).toBeVisible();
   77 |   });
   78 |
   79 |   test("should apply filter when option is selected from portal-rendered dropdown", async ({
   80 |     page,
   81 |   }) => {
   82 |     // Click the date filter
   83 |     const dateFilter = page.locator('button:has-text("All Time")').first();
   84 |     await dateFilter.click();
   85 |     await page.waitForTimeout(500);
   86 |
   87 |     // Click "Last 7 Days"
   88 |     const lastSevenDays = page.locator('text="Last 7 Days"').first();
   89 |     await lastSevenDays.click();
   90 |
   91 |     // Wait for filter to be applied
   92 |     await page.waitForTimeout(1000);
   93 |
   94 |     // Check that the button text updated
>  95 |     await expect(dateFilter).toContainText("Last 7 Days");
      |                              ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
   96 |
   97 |     // Verify rows are filtered (should be less than total)
   98 |     const rows = page.locator(".ag-row");
   99 |     const rowCount = await rows.count();
  100 |
  101 |     // There should be some filtering applied (less than 1000 rows)
  102 |     expect(rowCount).toBeGreaterThan(0);
  103 |     expect(rowCount).toBeLessThan(1000);
  104 |   });
  105 | });
  106 |
```