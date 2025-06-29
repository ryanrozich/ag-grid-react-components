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
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "44"
- img
- paragraph: Total Budget
- paragraph: $242,725
- img
- paragraph: Progress
- paragraph: 45.5%
- img
- paragraph: Budget Remaining
- paragraph: $129,542
- text: 1 to 25 of 45. Page 1 of 2
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
    - row "91 [UI-1091] Set up penetration testing (Q2 Planning) 🔒 Security High James Wilson James Wilson 6/27/2025 $100 Blocked 12%":
      - gridcell "91"
      - gridcell "[UI-1091] Set up penetration testing (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/27/2025"
      - gridcell "$100"
      - gridcell "Blocked"
      - gridcell "12%"
    - row "359 [PROJ-1359] Implement secrets management (Sprint 24) 🔧 DevOps Critical Emma Davis Emma Davis 6/27/2025 $1,275 Blocked 38%":
      - gridcell "359"
      - gridcell "[PROJ-1359] Implement secrets management (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/27/2025"
      - gridcell "$1,275"
      - gridcell "Blocked"
      - gridcell "38%"
    - row "534 [DATA-1534] Split monolithic components (Performance Sprint) ♻️ Refactor Critical Amanda White Amanda White 6/26/2025 $200 Todo 13%":
      - gridcell "534"
      - gridcell "[DATA-1534] Split monolithic components (Performance Sprint)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/26/2025"
      - gridcell "$200"
      - gridcell "Todo"
      - gridcell "13%"
    - row "337 [ADMIN-1337] Configure firewall rules (Performance Sprint) 🔒 Security Critical James Wilson James Wilson 6/25/2025 $4,925 In Progress 31%":
      - gridcell "337"
      - gridcell "[ADMIN-1337] Configure firewall rules (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/25/2025"
      - gridcell "$4,925"
      - gridcell "In Progress"
      - gridcell "31%"
    - row "450 [BACKEND-1450] Write component snapshot tests (Sprint 27) 🧪 Testing Critical Olivia Brown Olivia Brown 6/25/2025 $450 Todo 5%":
      - gridcell "450"
      - gridcell "[BACKEND-1450] Write component snapshot tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/25/2025"
      - gridcell "$450"
      - gridcell "Todo"
      - gridcell "5%"
    - row "820 [USER-1820] Add keyboard shortcuts (Sprint 25) ✨ Feature Critical Sophia Taylor Sophia Taylor 6/25/2025 $15,975 Blocked 25%":
      - gridcell "820"
      - gridcell "[USER-1820] Add keyboard shortcuts (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/25/2025"
      - gridcell "$15,975"
      - gridcell "Blocked"
      - gridcell "25%"
    - row "188 [APP-1188] Add request batching (Sprint 27) ⚡ Performance High John Robinson John Robinson 6/26/2025 $13,825 Blocked 30%":
      - gridcell "188"
      - gridcell "[APP-1188] Add request batching (Sprint 27)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/26/2025"
      - gridcell "$13,825"
      - gridcell "Blocked"
      - gridcell "30%"
    - row "261 [PROJ-1261] Refactor error handling ♻️ Refactor Critical Sarah Johnson Sarah Johnson 6/24/2025 $4,500 Blocked 13%":
      - gridcell "261"
      - gridcell "[PROJ-1261] Refactor error handling"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/24/2025"
      - gridcell "$4,500"
      - gridcell "Blocked"
      - gridcell "13%"
    - row "795 [CORE-1795] Fix broken deep links in navigation (Sprint 24) 🐛 Bug Critical Michael Anderson Michael Anderson 6/24/2025 $9,075 Blocked 19%":
      - gridcell "795"
      - gridcell "[CORE-1795] Fix broken deep links in navigation (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/24/2025"
      - gridcell "$9,075"
      - gridcell "Blocked"
      - gridcell "19%"
    - row "129 [BACKEND-1129] Resolve CORS issue with external API (Sprint 24) 🐛 Bug High James Wilson James Wilson 6/26/2025 $12,250 Testing 83%":
      - gridcell "129"
      - gridcell "[BACKEND-1129] Resolve CORS issue with external API (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/26/2025"
      - gridcell "$12,250"
      - gridcell "Testing"
      - gridcell "83%"
    - row "258 [API-1258] Add E2E tests for checkout flow (Security Audit) 🧪 Testing Critical Chris Martinez Chris Martinez 6/25/2025 $900 Testing 93%":
      - gridcell "258"
      - gridcell "[API-1258] Add E2E tests for checkout flow (Security Audit)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/25/2025"
      - gridcell "$900"
      - gridcell "Testing"
      - gridcell "93%"
    - row "618 [CORE-1618] Add encryption at rest (Q1 Goals) 🔒 Security Critical Priya Sharma Priya Sharma 6/23/2025 $450 Blocked 17%":
      - gridcell "618"
      - gridcell "[CORE-1618] Add encryption at rest (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/23/2025"
      - gridcell "$450"
      - gridcell "Blocked"
      - gridcell "17%"
    - row "967 [MOBILE-1967] Fix responsive layout on tablets 🐛 Bug High Kevin Zhang Kevin Zhang 6/25/2025 $8,100 Blocked 33%":
      - gridcell "967"
      - gridcell "[MOBILE-1967] Fix responsive layout on tablets"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/25/2025"
      - gridcell "$8,100"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "276 [MOBILE-1276] Resolve CORS issue with external API 🐛 Bug Medium Michael Anderson Michael Anderson 6/26/2025 $5,050 In Progress 35%":
      - gridcell "276"
      - gridcell "[MOBILE-1276] Resolve CORS issue with external API"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/26/2025"
      - gridcell "$5,050"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "282 [FRONTEND-1282] Clean up deprecated APIs ♻️ Refactor Critical Maya Patel Maya Patel 6/22/2025 $2,775 Blocked 32%":
      - gridcell "282"
      - gridcell "[FRONTEND-1282] Clean up deprecated APIs"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/22/2025"
      - gridcell "$2,775"
      - gridcell "Blocked"
      - gridcell "32%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$242,725 46%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$242,725"
      - gridcell
      - gridcell "46%"
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