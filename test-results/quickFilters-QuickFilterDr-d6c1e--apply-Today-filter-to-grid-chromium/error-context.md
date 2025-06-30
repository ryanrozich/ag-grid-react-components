# Test info

- Name: QuickFilterDropdown >> should apply 'Today' filter to grid
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:67:3

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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $4,269,925
- img
- paragraph: Progress
- paragraph: 45.2%
- img
- paragraph: Budget Remaining
- paragraph: $2,313,480
- text: 1 to 25 of 1,001. Page 1 of 41
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
    - row "12 [APP-1012] Fix login form validation error 🐛 Bug Low Marcus Williams Marcus Williams 8/31/2025 $700 Todo 6%":
      - gridcell "12"
      - gridcell "[APP-1012] Fix login form validation error"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/31/2025"
      - gridcell "$700"
      - gridcell "Todo"
      - gridcell "6%"
    - row "46 [DATA-1046] Fix infinite scroll pagination bug (Performance Sprint) 🐛 Bug Critical James Wilson James Wilson 8/13/2025 $6,425 Todo 16%":
      - gridcell "46"
      - gridcell "[DATA-1046] Fix infinite scroll pagination bug (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/13/2025"
      - gridcell "$6,425"
      - gridcell "Todo"
      - gridcell "16%"
    - row "523 [FRONTEND-1523] Refactor error handling (Q1 Goals) ♻️ Refactor High Ryan Thomas Ryan Thomas 8/18/2025 $7,975 In Progress 26%":
      - gridcell "523"
      - gridcell "[FRONTEND-1523] Refactor error handling (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/18/2025"
      - gridcell "$7,975"
      - gridcell "In Progress"
      - gridcell "26%"
    - row "438 [UI-1438] Write unit tests for auth module (Q1 Goals) 🧪 Testing Medium Sarah Johnson Sarah Johnson 8/18/2025 $925 In Progress 57%":
      - gridcell "438"
      - gridcell "[UI-1438] Write unit tests for auth module (Q1 Goals)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/18/2025"
      - gridcell "$925"
      - gridcell "In Progress"
      - gridcell "57%"
    - row "397 [INFRA-1397] Build analytics dashboard ✨ Feature Critical Priya Sharma Priya Sharma 8/13/2025 $8,800 Backlog 0%":
      - gridcell "397"
      - gridcell "[INFRA-1397] Build analytics dashboard"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/13/2025"
      - gridcell "$8,800"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "890 [BACKEND-1890] Modernize legacy jQuery code ♻️ Refactor Medium Ryan Thomas Ryan Thomas 8/23/2025 $300 Testing 86%":
      - gridcell "890"
      - gridcell "[BACKEND-1890] Modernize legacy jQuery code"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/23/2025"
      - gridcell "$300"
      - gridcell "Testing"
      - gridcell "86%"
    - row "223 [ADMIN-1223] Modernize legacy jQuery code (Sprint 24) ♻️ Refactor Medium Sarah Johnson Sarah Johnson 8/23/2025 $4,350 Backlog 0%":
      - gridcell "223"
      - gridcell "[ADMIN-1223] Modernize legacy jQuery code (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/23/2025"
      - gridcell "$4,350"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "512 [FRONTEND-1512] Reduce API call frequency (Performance Sprint) ⚡ Performance Critical Daniel Kim Daniel Kim 8/9/2025 $925 In Review 66%":
      - gridcell "512"
      - gridcell "[FRONTEND-1512] Reduce API call frequency (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/9/2025"
      - gridcell "$925"
      - gridcell "In Review"
      - gridcell "66%"
    - row "605 [UI-1605] Extract business logic layer ♻️ Refactor Medium Maya Patel Maya Patel 8/21/2025 $450 Testing 93%":
      - gridcell "605"
      - gridcell "[UI-1605] Extract business logic layer"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/21/2025"
      - gridcell "$450"
      - gridcell "Testing"
      - gridcell "93%"
    - row "558 [CORE-1558] Update to React 18 patterns (Sprint 26) ♻️ Refactor High Sophia Taylor Sophia Taylor 8/11/2025 $225 In Progress 58%":
      - gridcell "558"
      - gridcell "[CORE-1558] Update to React 18 patterns (Sprint 26)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/11/2025"
      - gridcell "$225"
      - gridcell "In Progress"
      - gridcell "58%"
    - row "225 [AUTH-1225] Resolve memory leak in data grid 🐛 Bug Low Sarah Johnson Sarah Johnson 8/13/2025 $175 Backlog 0%":
      - gridcell "225"
      - gridcell "[AUTH-1225] Resolve memory leak in data grid"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/13/2025"
      - gridcell "$175"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "235 [CORE-1235] Add keyboard shortcuts (Sprint 26) ✨ Feature Critical Amanda White Amanda White 8/8/2025 $7,100 Testing 90%":
      - gridcell "235"
      - gridcell "[CORE-1235] Add keyboard shortcuts (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/8/2025"
      - gridcell "$7,100"
      - gridcell "Testing"
      - gridcell "90%"
    - row "789 [WEB-1789] Set up staging environment 🔧 DevOps High David Lee David Lee 8/8/2025 $900 Backlog 0%":
      - gridcell "789"
      - gridcell "[WEB-1789] Set up staging environment"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/8/2025"
      - gridcell "$900"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "981 [CORE-1981] Migrate to new testing framework (Security Audit) ♻️ Refactor Critical Olivia Brown Olivia Brown 8/7/2025 $325 Todo 14%":
      - gridcell "981"
      - gridcell "[CORE-1981] Migrate to new testing framework (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/7/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "14%"
    - row "576 [CORE-1576] Configure security headers (Q1 Goals) 🔒 Security Low Isabella Garcia Isabella Garcia 8/16/2025 $100 Backlog 0%":
      - gridcell "576"
      - gridcell "[CORE-1576] Configure security headers (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/16/2025"
      - gridcell "$100"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "966 [UI-1966] Refactor error handling (Q1 Goals) ♻️ Refactor High James Wilson James Wilson 8/10/2025 $8,350 Todo 16%":
      - gridcell "966"
      - gridcell "[UI-1966] Refactor error handling (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/10/2025"
      - gridcell "$8,350"
      - gridcell "Todo"
      - gridcell "16%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,269,925 45%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,269,925"
      - gridcell
      - gridcell "45%"
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
- text: Page 1 of 41
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