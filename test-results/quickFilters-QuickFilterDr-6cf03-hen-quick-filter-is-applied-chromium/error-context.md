# Test info

- Name: QuickFilterDropdown >> should update grid filter model when quick filter is applied
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:211:3

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
- paragraph: $4,112,225
- img
- paragraph: Progress
- paragraph: 44.5%
- img
- paragraph: Budget Remaining
- paragraph: $2,304,563
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
    - row "490 [DASH-1490] Split monolithic components (Sprint 23) ♻️ Refactor Medium Jessica Lopez Jessica Lopez 8/31/2025 $725 Backlog 0%":
      - gridcell "490"
      - gridcell "[DASH-1490] Split monolithic components (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/31/2025"
      - gridcell "$725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "683 [API-1683] Fix infinite scroll pagination bug 🐛 Bug High James Wilson James Wilson 8/16/2025 $2,500 In Review 76%":
      - gridcell "683"
      - gridcell "[API-1683] Fix infinite scroll pagination bug"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/16/2025"
      - gridcell "$2,500"
      - gridcell "In Review"
      - gridcell "76%"
    - row "953 [ADMIN-1953] Set up penetration testing 🔒 Security Low James Wilson James Wilson 8/24/2025 $875 In Review 74%":
      - gridcell "953"
      - gridcell "[ADMIN-1953] Set up penetration testing"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/24/2025"
      - gridcell "$875"
      - gridcell "In Review"
      - gridcell "74%"
    - row "147 [USER-1147] Fix broken unit tests in CI pipeline (Sprint 23) 🐛 Bug High Isabella Garcia Isabella Garcia 8/12/2025 $850 Backlog 0%":
      - gridcell "147"
      - gridcell "[USER-1147] Fix broken unit tests in CI pipeline (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/12/2025"
      - gridcell "$850"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "603 [CORE-1603] Create batch operations feature (Q2 Planning) ✨ Feature High Emma Davis Emma Davis 8/12/2025 $3,175 In Progress 22%":
      - gridcell "603"
      - gridcell "[CORE-1603] Create batch operations feature (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/12/2025"
      - gridcell "$3,175"
      - gridcell "In Progress"
      - gridcell "22%"
    - row "841 [ADMIN-1841] Implement code splitting (Q1 Goals) ⚡ Performance Critical Olivia Brown Olivia Brown 8/7/2025 $175 Testing 89%":
      - gridcell "841"
      - gridcell "[ADMIN-1841] Implement code splitting (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/7/2025"
      - gridcell "$175"
      - gridcell "Testing"
      - gridcell "89%"
    - row "418 [CORE-1418] Refactor state management (Sprint 27) ♻️ Refactor High Kevin Zhang Kevin Zhang 8/14/2025 $4,500 In Review 76%":
      - gridcell "418"
      - gridcell "[CORE-1418] Refactor state management (Sprint 27)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/14/2025"
      - gridcell "$4,500"
      - gridcell "In Review"
      - gridcell "76%"
    - row "732 [MOBILE-1732] Set up SSL certificates 🔒 Security Critical Priya Sharma Priya Sharma 8/6/2025 $3,950 Backlog 0%":
      - gridcell "732"
      - gridcell "[MOBILE-1732] Set up SSL certificates"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/6/2025"
      - gridcell "$3,950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "118 [PROJ-1118] Add audit logging (Performance Sprint) 🔒 Security Low Sarah Johnson Sarah Johnson 8/21/2025 $725 Backlog 0%":
      - gridcell "118"
      - gridcell "[PROJ-1118] Add audit logging (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/21/2025"
      - gridcell "$725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "223 [CORE-1223] Set up infrastructure as code (Tech Debt) 🔧 DevOps Low Kevin Zhang Kevin Zhang 9/5/2025 $7,425 In Progress 21%":
      - gridcell "223"
      - gridcell "[CORE-1223] Set up infrastructure as code (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "9/5/2025"
      - gridcell "$7,425"
      - gridcell "In Progress"
      - gridcell "21%"
    - row "591 [API-1591] Set up infrastructure as code 🔧 DevOps Low John Robinson John Robinson 9/4/2025 $325 Todo 15%":
      - gridcell "591"
      - gridcell "[API-1591] Set up infrastructure as code"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "9/4/2025"
      - gridcell "$325"
      - gridcell "Todo"
      - gridcell "15%"
    - row "908 [INFRA-1908] Create load testing scenarios (Sprint 27) 🧪 Testing High Chris Martinez Chris Martinez 8/8/2025 $575 In Progress 20%":
      - gridcell "908"
      - gridcell "[INFRA-1908] Create load testing scenarios (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/8/2025"
      - gridcell "$575"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "66 [FRONTEND-1066] Write migration guide for v2 📝 Documentation High Daniel Kim Daniel Kim 8/7/2025 $75 Backlog 0%":
      - gridcell "66"
      - gridcell "[FRONTEND-1066] Write migration guide for v2"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/7/2025"
      - gridcell "$75"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "386 [API-1386] Write performance optimization tips (Q1 Goals) 📝 Documentation Medium Jessica Lopez Jessica Lopez 8/8/2025 $7,375 Todo 19%":
      - gridcell "386"
      - gridcell "[API-1386] Write performance optimization tips (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/8/2025"
      - gridcell "$7,375"
      - gridcell "Todo"
      - gridcell "19%"
    - row "257 [MOBILE-1257] Set up SSL certificates (Tech Debt) 🔒 Security Low Olivia Brown Olivia Brown 8/19/2025 $475 Backlog 0%":
      - gridcell "257"
      - gridcell "[MOBILE-1257] Set up SSL certificates (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/19/2025"
      - gridcell "$475"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "718 [CORE-1718] Implement dark mode toggle (Performance Sprint) ✨ Feature High Sophia Taylor Sophia Taylor 8/7/2025 $1,150 In Review 61%":
      - gridcell "718"
      - gridcell "[CORE-1718] Implement dark mode toggle (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/7/2025"
      - gridcell "$1,150"
      - gridcell "In Review"
      - gridcell "61%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,112,225 44%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,112,225"
      - gridcell
      - gridcell "44%"
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