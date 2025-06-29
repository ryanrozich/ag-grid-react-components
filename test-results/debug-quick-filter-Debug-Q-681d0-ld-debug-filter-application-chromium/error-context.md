# Test info

- Name: Debug QuickFilterDropdown >> should debug filter application
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/debug-quick-filter.spec.ts:4:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Quick Filter")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/debug-quick-filter.spec.ts:20:16
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
  - text: All Time
  - img
- button "Quick filter options":
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "50"
- img
- paragraph: Total Budget
- paragraph: $160,200
- img
- paragraph: Progress
- paragraph: 51.5%
- img
- paragraph: Budget Remaining
- paragraph: $61,192
- text: 1 to 25 of 51. Page 1 of 3
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
    - row "157 [WEB-1157] Resolve race condition in state update (Q2 Planning) 🐛 Bug Critical Maya Patel Maya Patel 6/27/2025 $8,850 Blocked 31%":
      - gridcell "157"
      - gridcell "[WEB-1157] Resolve race condition in state update (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/27/2025"
      - gridcell "$8,850"
      - gridcell "Blocked"
      - gridcell "31%"
    - row "704 [DATA-1704] Add performance benchmarks 🧪 Testing Critical David Lee David Lee 6/27/2025 $5,750 In Progress 32%":
      - gridcell "704"
      - gridcell "[DATA-1704] Add performance benchmarks"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/27/2025"
      - gridcell "$5,750"
      - gridcell "In Progress"
      - gridcell "32%"
    - row "747 [WEB-1747] Update API documentation (Sprint 23) 📝 Documentation Critical James Wilson James Wilson 6/27/2025 $125 In Progress 35%":
      - gridcell "747"
      - gridcell "[WEB-1747] Update API documentation (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/27/2025"
      - gridcell "$125"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "37 [API-1037] Implement CSRF protection (Sprint 27) 🔒 Security Critical Emma Davis Emma Davis 6/26/2025 $17,425 Done 100%":
      - gridcell "37"
      - gridcell "[API-1037] Implement CSRF protection (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/26/2025"
      - gridcell "$17,425"
      - gridcell "Done"
      - gridcell "100%"
    - row "111 [UI-1111] Correct CSS overflow in sidebar (Sprint 23) 🐛 Bug High Michael Anderson Michael Anderson 6/27/2025 $475 In Progress 44%":
      - gridcell "111"
      - gridcell "[UI-1111] Correct CSS overflow in sidebar (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/27/2025"
      - gridcell "$475"
      - gridcell "In Progress"
      - gridcell "44%"
    - row "774 [PROJ-1774] Set up staging environment 🔧 DevOps Critical Amanda White Amanda White 6/27/2025 $2,750 Blocked 39%":
      - gridcell "774"
      - gridcell "[PROJ-1774] Set up staging environment"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/27/2025"
      - gridcell "$2,750"
      - gridcell "Blocked"
      - gridcell "39%"
    - row "553 [CORE-1553] Create disaster recovery plan (Sprint 25) 🔧 DevOps Critical Marcus Williams Marcus Williams 6/25/2025 $425 In Progress 56%":
      - gridcell "553"
      - gridcell "[CORE-1553] Create disaster recovery plan (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/25/2025"
      - gridcell "$425"
      - gridcell "In Progress"
      - gridcell "56%"
    - row "916 [BACKEND-1916] Handle null pointer exception in API client (Security Audit) 🐛 Bug Critical Emily Jackson Emily Jackson 6/23/2025 $375 Done 100%":
      - gridcell "916"
      - gridcell "[BACKEND-1916] Handle null pointer exception in API client (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/23/2025"
      - gridcell "$375"
      - gridcell "Done"
      - gridcell "100%"
    - row "67 [UI-1067] Add database indexing (Sprint 25) ⚡ Performance Critical Chris Martinez Chris Martinez 6/22/2025 $700 Done 100%":
      - gridcell "67"
      - gridcell "[UI-1067] Add database indexing (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/22/2025"
      - gridcell "$700"
      - gridcell "Done"
      - gridcell "100%"
    - row "90 [DATA-1090] Implement auto-scaling 🔧 DevOps High Olivia Brown Olivia Brown 6/27/2025 $975 In Progress 49%":
      - gridcell "90"
      - gridcell "[DATA-1090] Implement auto-scaling"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/27/2025"
      - gridcell "$975"
      - gridcell "In Progress"
      - gridcell "49%"
    - row "212 [MOBILE-1212] Refactor authentication flow (Sprint 26) ♻️ Refactor High Emily Jackson Emily Jackson 6/25/2025 $125 In Progress 26%":
      - gridcell "212"
      - gridcell "[MOBILE-1212] Refactor authentication flow (Sprint 26)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/25/2025"
      - gridcell "$125"
      - gridcell "In Progress"
      - gridcell "26%"
    - row "490 [INFRA-1490] Implement social media sharing ✨ Feature Critical Alex Chen Alex Chen 6/22/2025 $800 Blocked 30%":
      - gridcell "490"
      - gridcell "[INFRA-1490] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/22/2025"
      - gridcell "$800"
      - gridcell "Blocked"
      - gridcell "30%"
    - row "806 [APP-1806] Document new filter components (Performance Sprint) 📝 Documentation High Michael Anderson Michael Anderson 6/23/2025 $9,200 Done 100%":
      - gridcell "806"
      - gridcell "[APP-1806] Document new filter components (Performance Sprint)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/23/2025"
      - gridcell "$9,200"
      - gridcell "Done"
      - gridcell "100%"
    - row "941 [BACKEND-1941] Fix login form validation error 🐛 Bug Medium John Robinson John Robinson 6/25/2025 $1,450 Done 100%":
      - gridcell "941"
      - gridcell "[BACKEND-1941] Fix login form validation error"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/25/2025"
      - gridcell "$1,450"
      - gridcell "Done"
      - gridcell "100%"
    - row "466 [AUTH-1466] Migrate to TypeScript strict mode (Q1 Goals) ♻️ Refactor High Kevin Zhang Kevin Zhang 6/27/2025 $5,575 In Progress 53%":
      - gridcell "466"
      - gridcell "[AUTH-1466] Migrate to TypeScript strict mode (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/27/2025"
      - gridcell "$5,575"
      - gridcell "In Progress"
      - gridcell "53%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$160,200 52%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$160,200"
      - gridcell
      - gridcell "52%"
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
   1 | import { test } from "@playwright/test";
   2 |
   3 | test.describe("Debug QuickFilterDropdown", () => {
   4 |   test("should debug filter application", async ({ page }) => {
   5 |     // Enable console logging
   6 |     page.on("console", (msg) => {
   7 |       if (msg.type() === "log") {
   8 |         console.log("BROWSER LOG:", msg.text());
   9 |       }
   10 |     });
   11 |
   12 |     // Navigate to the demo page
   13 |     await page.goto("/demo");
   14 |
   15 |     // Wait for grid to be ready
   16 |     await page.waitForSelector(".ag-root-wrapper");
   17 |     await page.waitForTimeout(1000);
   18 |
   19 |     // Click on Quick Filter tab
>  20 |     await page.click('button:has-text("Quick Filter")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
   21 |     await page.waitForTimeout(500);
   22 |
   23 |     // Get initial row count
   24 |     const initialRows = await page
   25 |       .locator(".ag-center-cols-container .ag-row")
   26 |       .count();
   27 |     console.log("Initial row count:", initialRows);
   28 |
   29 |     // Open the first dropdown
   30 |     await page
   31 |       .locator('[data-testid="quick-filter-dropdown"]')
   32 |       .first()
   33 |       .locator('button[aria-haspopup="listbox"]')
   34 |       .click();
   35 |     await page.waitForTimeout(500);
   36 |
   37 |     // Select "This Month" which should filter to only current month (June 2025)
   38 |     await page.click('[role="option"]:has-text("This Month")');
   39 |
   40 |     // Wait for filter to apply
   41 |     await page.waitForTimeout(2000);
   42 |
   43 |     // Get filtered row count
   44 |     const filteredRows = await page
   45 |       .locator(".ag-center-cols-container .ag-row")
   46 |       .count();
   47 |     console.log("Filtered row count:", filteredRows);
   48 |
   49 |     // Check if floating filter is visible
   50 |     const floatingFilterVisible = await page
   51 |       .locator(".ag-floating-filter")
   52 |       .first()
   53 |       .isVisible();
   54 |     console.log("Floating filter visible:", floatingFilterVisible);
   55 |
   56 |     // Check filter indicator
   57 |     const filterIndicator = await page
   58 |       .locator('[col-id="dueDate"] .ag-header-cell-filtered')
   59 |       .isVisible()
   60 |       .catch(() => false);
   61 |     console.log("Filter indicator visible:", filterIndicator);
   62 |
   63 |     // Get detailed info from the grid
   64 |     const gridInfo = await page.evaluate(() => {
   65 |       // @ts-expect-error - agGridApi is added by the demo
   66 |       const api = window.agGridApi;
   67 |       if (!api) return { error: "No API found" };
   68 |
   69 |       const filterModel = api.getFilterModel();
   70 |       const rowCount = api.getDisplayedRowCount();
   71 |
   72 |       // Try to get the filter instance directly
   73 |       let filterInstance = null;
   74 |       try {
   75 |         filterInstance = api.getColumnFilterInstance("dueDate");
   76 |       } catch (e) {
   77 |         console.error("Error getting filter instance:", e);
   78 |       }
   79 |
   80 |       return {
   81 |         filterModel,
   82 |         rowCount,
   83 |         hasFilterInstance: !!filterInstance,
   84 |         filterInstanceType: filterInstance
   85 |           ? filterInstance.constructor.name
   86 |           : null,
   87 |       };
   88 |     });
   89 |     console.log("Grid info:", JSON.stringify(gridInfo, null, 2));
   90 |
   91 |     // Check if the test data has dates in the last 7 days
   92 |     const dateInfo = await page.evaluate(() => {
   93 |       const dates = [];
   94 |       const api = window.agGridApi;
   95 |       if (!api) return { error: "No API" };
   96 |
   97 |       // Get the raw data from the grid
   98 |       api.forEachNode((node) => {
   99 |         if (node.data && node.data.dueDate) {
  100 |           dates.push({
  101 |             raw: node.data.dueDate,
  102 |             formatted: new Date(node.data.dueDate).toLocaleDateString(),
  103 |             iso: new Date(node.data.dueDate).toISOString(),
  104 |           });
  105 |         }
  106 |       });
  107 |
  108 |       return dates.slice(0, 10); // First 10 rows
  109 |     });
  110 |     console.log("Date info from grid:", JSON.stringify(dateInfo, null, 2));
  111 |   });
  112 | });
  113 |
```