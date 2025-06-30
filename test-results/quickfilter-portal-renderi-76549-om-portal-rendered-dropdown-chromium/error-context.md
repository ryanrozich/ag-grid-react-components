# Test info

- Name: QuickFilterDropdown Portal Rendering >> should apply filter when option is selected from portal-rendered dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickfilter-portal-rendering.spec.ts:79:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('button:has-text("All Time")').first()
Expected string: "Last 7 Days"
Received: <element(s) not found>
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('button:has-text("All Time")').first()

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickfilter-portal-rendering.spec.ts:95:30
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
  - text: Last 7 Days
  - img
- button "Quick filter options":
  - text: Task type
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "52"
- img
- paragraph: Total Budget
- paragraph: $223,750
- img
- paragraph: Progress
- paragraph: 49.3%
- img
- paragraph: Budget Remaining
- paragraph: $116,036
- text: 1 to 25 of 53. Page 1 of 3
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
    - row "659 [FRONTEND-1659] Create backup automation 🔧 DevOps Critical Amanda White Amanda White 6/29/2025 $2,150 Blocked 12%":
      - gridcell "659"
      - gridcell "[FRONTEND-1659] Create backup automation"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/29/2025"
      - gridcell "$2,150"
      - gridcell "Blocked"
      - gridcell "12%"
    - row "648 [INFRA-1648] Configure security headers (Sprint 26) 🔒 Security High Daniel Kim Daniel Kim 6/28/2025 $1,550 In Progress 34%":
      - gridcell "648"
      - gridcell "[INFRA-1648] Configure security headers (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "6/28/2025"
      - gridcell "$1,550"
      - gridcell "In Progress"
      - gridcell "34%"
    - row "228 [WEB-1228] Test mobile responsiveness (Security Audit) 🧪 Testing Critical Emma Davis Emma Davis 6/28/2025 $12,400 In Progress 55%":
      - gridcell "228"
      - gridcell "[WEB-1228] Test mobile responsiveness (Security Audit)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/28/2025"
      - gridcell "$12,400"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "365 [DATA-1365] Set up log aggregation 🔧 DevOps Critical Sarah Johnson Sarah Johnson 6/29/2025 $3,500 Blocked 33%":
      - gridcell "365"
      - gridcell "[DATA-1365] Set up log aggregation"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/29/2025"
      - gridcell "$3,500"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "831 [MOBILE-1831] Fix broken unit tests in CI pipeline 🐛 Bug Critical Michael Anderson Michael Anderson 6/27/2025 $1,125 Blocked 16%":
      - gridcell "831"
      - gridcell "[MOBILE-1831] Fix broken unit tests in CI pipeline"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/27/2025"
      - gridcell "$1,125"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "854 [PROJ-1854] Optimize database queries (Performance Sprint) ⚡ Performance High Kevin Zhang Kevin Zhang 6/29/2025 $3,300 Testing 94%":
      - gridcell "854"
      - gridcell "[PROJ-1854] Optimize database queries (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/29/2025"
      - gridcell "$3,300"
      - gridcell "Testing"
      - gridcell "94%"
    - row "697 [API-1697] Optimize memory usage (Sprint 27) ⚡ Performance High Marcus Williams Marcus Williams 6/29/2025 $5,275 Blocked 15%":
      - gridcell "697"
      - gridcell "[API-1697] Optimize memory usage (Sprint 27)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/29/2025"
      - gridcell "$5,275"
      - gridcell "Blocked"
      - gridcell "15%"
    - row "729 [DATA-1729] Fix login form validation error (Q1 Goals) 🐛 Bug Medium John Robinson John Robinson 6/29/2025 $18,950 Backlog 0%":
      - gridcell "729"
      - gridcell "[DATA-1729] Fix login form validation error (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/29/2025"
      - gridcell "$18,950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "286 [DASH-1286] Implement CSRF protection (Sprint 24) 🔒 Security High Alex Chen Alex Chen 6/25/2025 $2,475 Blocked 27%":
      - gridcell "286"
      - gridcell "[DASH-1286] Implement CSRF protection (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/25/2025"
      - gridcell "$2,475"
      - gridcell "Blocked"
      - gridcell "27%"
    - row "392 [CORE-1392] Extract shared utilities module (Q1 Goals) ♻️ Refactor Critical Maya Patel Maya Patel 6/26/2025 $2,525 Todo 13%":
      - gridcell "392"
      - gridcell "[CORE-1392] Extract shared utilities module (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/26/2025"
      - gridcell "$2,525"
      - gridcell "Todo"
      - gridcell "13%"
    - row "577 [ADMIN-1577] Add brute force protection (Sprint 25) 🔒 Security High Michael Anderson Michael Anderson 6/25/2025 $925 In Progress 33%":
      - gridcell "577"
      - gridcell "[ADMIN-1577] Add brute force protection (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/25/2025"
      - gridcell "$925"
      - gridcell "In Progress"
      - gridcell "33%"
    - row "672 [UI-1672] Set up SSL certificates (Security Audit) 🔒 Security Critical Sophia Taylor Sophia Taylor 6/24/2025 $350 In Progress 38%":
      - gridcell "672"
      - gridcell "[UI-1672] Set up SSL certificates (Security Audit)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/24/2025"
      - gridcell "$350"
      - gridcell "In Progress"
      - gridcell "38%"
    - row "883 [DASH-1883] Add input sanitization 🔒 Security High Isabella Garcia Isabella Garcia 6/26/2025 $225 Blocked 17%":
      - gridcell "883"
      - gridcell "[DASH-1883] Add input sanitization"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/26/2025"
      - gridcell "$225"
      - gridcell "Blocked"
      - gridcell "17%"
    - row "109 [PROJ-1109] Test offline functionality (Performance Sprint) 🧪 Testing Critical David Lee David Lee 6/24/2025 $11,750 Done 100%":
      - gridcell "109"
      - gridcell "[PROJ-1109] Test offline functionality (Performance Sprint)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/24/2025"
      - gridcell "$11,750"
      - gridcell "Done"
      - gridcell "100%"
    - row "301 [DATA-1301] Build analytics dashboard (Sprint 25) ✨ Feature Critical Michael Anderson Michael Anderson 6/24/2025 $250 Blocked 12%":
      - gridcell "301"
      - gridcell "[DATA-1301] Build analytics dashboard (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/24/2025"
      - gridcell "$250"
      - gridcell "Blocked"
      - gridcell "12%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$223,750 49%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$223,750"
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
- text: Page 1 of 3
- button "Next Page": 
- button "Last Page": 
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