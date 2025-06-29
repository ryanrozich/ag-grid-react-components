# Test info

- Name: QuickFilterDropdown >> should persist selected filter when navigating grid
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:181:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Quick Filter")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:13:16
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
- paragraph: "37"
- img
- paragraph: Total Budget
- paragraph: $168,475
- img
- paragraph: Progress
- paragraph: 42.6%
- img
- paragraph: Budget Remaining
- paragraph: $87,398
- text: 1 to 25 of 38. Page 1 of 2
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
    - row "418 [PROJ-1418] Build real-time notifications system (Sprint 23) ✨ Feature Critical Amanda White Amanda White 6/27/2025 $4,575 Blocked 32%":
      - gridcell "418"
      - gridcell "[PROJ-1418] Build real-time notifications system (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/27/2025"
      - gridcell "$4,575"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "250 [FRONTEND-1250] Resolve race condition in state update (Security Audit) 🐛 Bug Critical Priya Sharma Priya Sharma 6/25/2025 $2,075 Blocked 11%":
      - gridcell "250"
      - gridcell "[FRONTEND-1250] Resolve race condition in state update (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/25/2025"
      - gridcell "$2,075"
      - gridcell "Blocked"
      - gridcell "11%"
    - row "575 [FRONTEND-1575] Set up penetration testing (Sprint 24) 🔒 Security High Maya Patel Maya Patel 6/27/2025 $5,825 Done 100%":
      - gridcell "575"
      - gridcell "[FRONTEND-1575] Set up penetration testing (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/27/2025"
      - gridcell "$5,825"
      - gridcell "Done"
      - gridcell "100%"
    - row "791 [FRONTEND-1791] Update API documentation 📝 Documentation Critical Isabella Garcia Isabella Garcia 6/27/2025 $4,000 Blocked 19%":
      - gridcell "791"
      - gridcell "[FRONTEND-1791] Update API documentation"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/27/2025"
      - gridcell "$4,000"
      - gridcell "Blocked"
      - gridcell "19%"
    - row "406 [FRONTEND-1406] Set up staging environment (Sprint 26) 🔧 DevOps Critical Ryan Thomas Ryan Thomas 6/27/2025 $4,300 In Progress 22%":
      - gridcell "406"
      - gridcell "[FRONTEND-1406] Set up staging environment (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/27/2025"
      - gridcell "$4,300"
      - gridcell "In Progress"
      - gridcell "22%"
    - row "54 [PROJ-1054] Configure load balancer (Sprint 23) 🔧 DevOps Critical Sophia Taylor Sophia Taylor 6/25/2025 $2,050 Blocked 28%":
      - gridcell "54"
      - gridcell "[PROJ-1054] Configure load balancer (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/25/2025"
      - gridcell "$2,050"
      - gridcell "Blocked"
      - gridcell "28%"
    - row "420 [CORE-1420] Implement secure file upload (Performance Sprint) 🔒 Security High Chris Martinez Chris Martinez 6/24/2025 $2,150 In Progress 23%":
      - gridcell "420"
      - gridcell "[CORE-1420] Implement secure file upload (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/24/2025"
      - gridcell "$2,150"
      - gridcell "In Progress"
      - gridcell "23%"
    - row "894 [APP-1894] Add input sanitization 🔒 Security Medium David Lee David Lee 6/26/2025 $6,850 Blocked 11%":
      - gridcell "894"
      - gridcell "[APP-1894] Add input sanitization"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/26/2025"
      - gridcell "$6,850"
      - gridcell "Blocked"
      - gridcell "11%"
    - row "178 [API-1178] Build analytics dashboard ✨ Feature Critical Chris Martinez Chris Martinez 6/25/2025 $275 In Progress 28%":
      - gridcell "178"
      - gridcell "[API-1178] Build analytics dashboard"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/25/2025"
      - gridcell "$275"
      - gridcell "In Progress"
      - gridcell "28%"
    - row "548 [AUTH-1548] Build analytics dashboard (Q2 Planning) ✨ Feature Critical Amanda White Amanda White 6/23/2025 $8,125 In Progress 37%":
      - gridcell "548"
      - gridcell "[AUTH-1548] Build analytics dashboard (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/23/2025"
      - gridcell "$8,125"
      - gridcell "In Progress"
      - gridcell "37%"
    - row "569 [INFRA-1569] Implement OAuth integration (Q1 Goals) ✨ Feature High Marcus Williams Marcus Williams 6/26/2025 $475 Backlog 0%":
      - gridcell "569"
      - gridcell "[INFRA-1569] Implement OAuth integration (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "6/26/2025"
      - gridcell "$475"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "616 [UI-1616] Resolve race condition in state update (Q1 Goals) 🐛 Bug Critical Emma Davis Emma Davis 6/22/2025 $18,825 In Progress 30%":
      - gridcell "616"
      - gridcell "[UI-1616] Resolve race condition in state update (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/22/2025"
      - gridcell "$18,825"
      - gridcell "In Progress"
      - gridcell "30%"
    - row "687 [PROJ-1687] Create integration test suite (Sprint 26) 🧪 Testing Critical Kevin Zhang Kevin Zhang 6/25/2025 $3,800 Done 100%":
      - gridcell "687"
      - gridcell "[PROJ-1687] Create integration test suite (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/25/2025"
      - gridcell "$3,800"
      - gridcell "Done"
      - gridcell "100%"
    - row "786 [INFRA-1786] Write unit tests for auth module 🧪 Testing Critical Kevin Zhang Kevin Zhang 6/23/2025 $200 Blocked 17%":
      - gridcell "786"
      - gridcell "[INFRA-1786] Write unit tests for auth module"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/23/2025"
      - gridcell "$200"
      - gridcell "Blocked"
      - gridcell "17%"
    - row "84 [DATA-1084] Add progressive web app features (Performance Sprint) ⚡ Performance Critical John Robinson John Robinson 6/23/2025 $200 Blocked 16%":
      - gridcell "84"
      - gridcell "[DATA-1084] Add progressive web app features (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/23/2025"
      - gridcell "$200"
      - gridcell "Blocked"
      - gridcell "16%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$168,475 43%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$168,475"
      - gridcell
      - gridcell "43%"
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
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("QuickFilterDropdown", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page that has QuickFilterDropdown
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for grid to be ready
   9 |     await page.waitForSelector(".ag-root-wrapper");
   10 |     await page.waitForTimeout(1000); // Give time for data to load
   11 |
   12 |     // Click on Quick Filter tab to show the quick filter dropdowns
>  13 |     await page.click('button:has-text("Quick Filter")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
   14 |     await page.waitForTimeout(500); // Wait for tab content to render
   15 |
   16 |     // Wait for QuickFilterDropdown to be visible
   17 |     await page.waitForSelector('[data-testid="quick-filter-dropdown"]', {
   18 |       timeout: 10000,
   19 |     });
   20 |   });
   21 |
   22 |   test("should display quick filter dropdown button", async ({ page }) => {
   23 |     // Get the first dropdown (Date Filters)
   24 |     const dropdown = await page
   25 |       .locator('[data-testid="quick-filter-dropdown"]')
   26 |       .first();
   27 |     await expect(dropdown).toBeVisible();
   28 |
   29 |     // Check the trigger button (not the option buttons)
   30 |     const triggerButton = await dropdown.locator(
   31 |       'button[aria-haspopup="listbox"]',
   32 |     );
   33 |     await expect(triggerButton).toBeVisible();
   34 |
   35 |     // The button might show "All Data" if that's the default selection
   36 |     const buttonText = await triggerButton.textContent();
   37 |     expect(buttonText?.length).toBeGreaterThan(0);
   38 |   });
   39 |
   40 |   test("should open dropdown and show filter options", async ({ page }) => {
   41 |     // Click the first dropdown button (Date Filters)
   42 |     await page
   43 |       .locator('[data-testid="quick-filter-dropdown"]')
   44 |       .first()
   45 |       .locator("button")
   46 |       .click();
   47 |
   48 |     // Wait for dropdown menu to appear
   49 |     await page.waitForSelector('[role="listbox"]');
   50 |
   51 |     // Verify filter options are visible
   52 |     const options = await page.locator('[role="option"]').count();
   53 |     expect(options).toBeGreaterThan(0);
   54 |
   55 |     // Check for specific options
   56 |     await expect(
   57 |       page.locator('[role="option"]:has-text("Today")'),
   58 |     ).toBeVisible();
   59 |     await expect(
   60 |       page.locator('[role="option"]:has-text("This Week")'),
   61 |     ).toBeVisible();
   62 |     await expect(
   63 |       page.locator('[role="option"]:has-text("Last 7 Days")'),
   64 |     ).toBeVisible();
   65 |   });
   66 |
   67 |   test("should apply 'Today' filter to grid", async ({ page }) => {
   68 |     // Get initial row count
   69 |     const initialRows = await page
   70 |       .locator(".ag-center-cols-container .ag-row")
   71 |       .count();
   72 |     console.log("Initial row count:", initialRows);
   73 |     expect(initialRows).toBeGreaterThan(0);
   74 |
   75 |     // Check if dropdown is already open, if not open it
   76 |     const dropdownOpen = await page
   77 |       .locator('[role="listbox"]')
   78 |       .isVisible()
   79 |       .catch(() => false);
   80 |     if (!dropdownOpen) {
   81 |       await page
   82 |         .locator('[data-testid="quick-filter-dropdown"]')
   83 |         .first()
   84 |         .locator('button[aria-haspopup="listbox"]')
   85 |         .click();
   86 |     }
   87 |
   88 |     // Select "All Dates" first to clear any filter
   89 |     await page.click('[role="option"]:has-text("All Dates")');
   90 |
   91 |     // Wait for grid to update
   92 |     await page.waitForTimeout(1000);
   93 |
   94 |     // Verify filter was applied by checking row count changed
   95 |     const filteredRows = await page
   96 |       .locator(".ag-center-cols-container .ag-row")
   97 |       .count();
   98 |     console.log("Filtered row count:", filteredRows);
   99 |
  100 |     // The filter should have changed the row count
  101 |     expect(filteredRows).not.toBe(initialRows);
  102 |
  103 |     // Verify the column header shows filter indicator
  104 |     await expect(
  105 |       page.locator('[col-id="dueDate"] .ag-header-cell-filtered'),
  106 |     ).toBeVisible();
  107 |
  108 |     // Verify dropdown shows selected option
  109 |     const buttonText = await page
  110 |       .locator('[data-testid="quick-filter-dropdown"]')
  111 |       .first()
  112 |       .locator("button")
  113 |       .textContent();
```