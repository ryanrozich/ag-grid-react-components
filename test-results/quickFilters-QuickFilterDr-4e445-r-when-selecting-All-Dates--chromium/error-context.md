# Test info

- Name: QuickFilterDropdown >> should clear filter when selecting 'All Dates'
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:152:3

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
- paragraph: $4,060,950
- img
- paragraph: Progress
- paragraph: 46.7%
- img
- paragraph: Budget Remaining
- paragraph: $2,209,536
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
    - row "89 [APP-1089] Fix login form validation error (Q1 Goals) 🐛 Bug Low John Robinson John Robinson 8/28/2025 $550 Backlog 0%":
      - gridcell "89"
      - gridcell "[APP-1089] Fix login form validation error (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/28/2025"
      - gridcell "$550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "909 [APP-1909] Update to React 18 patterns (Tech Debt) ♻️ Refactor Critical Priya Sharma Priya Sharma 8/14/2025 $100 In Progress 31%":
      - gridcell "909"
      - gridcell "[APP-1909] Update to React 18 patterns (Tech Debt)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/14/2025"
      - gridcell "$100"
      - gridcell "In Progress"
      - gridcell "31%"
    - row "614 [USER-1614] Implement service workers ⚡ Performance Critical Daniel Kim Daniel Kim 8/11/2025 $125 In Progress 55%":
      - gridcell "614"
      - gridcell "[USER-1614] Implement service workers"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/11/2025"
      - gridcell "$125"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "472 [MOBILE-1472] Correct data corruption in cache layer 🐛 Bug Critical James Wilson James Wilson 8/9/2025 $9,725 Backlog 0%":
      - gridcell "472"
      - gridcell "[MOBILE-1472] Correct data corruption in cache layer"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/9/2025"
      - gridcell "$9,725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "875 [FRONTEND-1875] Configure Docker containers (Sprint 25) 🔧 DevOps Low Kevin Zhang Kevin Zhang 8/23/2025 $825 Todo 10%":
      - gridcell "875"
      - gridcell "[FRONTEND-1875] Configure Docker containers (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/23/2025"
      - gridcell "$825"
      - gridcell "Todo"
      - gridcell "10%"
    - row "886 [DASH-1886] Simplify complex conditionals (Sprint 23) ♻️ Refactor Critical Daniel Kim Daniel Kim 8/10/2025 $3,225 Backlog 0%":
      - gridcell "886"
      - gridcell "[DASH-1886] Simplify complex conditionals (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/10/2025"
      - gridcell "$3,225"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "916 [USER-1916] Document component props (Sprint 24) 📝 Documentation High Emma Davis Emma Davis 8/14/2025 $3,200 Testing 83%":
      - gridcell "916"
      - gridcell "[USER-1916] Document component props (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/14/2025"
      - gridcell "$3,200"
      - gridcell "Testing"
      - gridcell "83%"
    - row "266 [BACKEND-1266] Optimize database queries (Sprint 25) ⚡ Performance Medium David Lee David Lee 8/16/2025 $3,225 Backlog 0%":
      - gridcell "266"
      - gridcell "[BACKEND-1266] Optimize database queries (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/16/2025"
      - gridcell "$3,225"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "690 [AUTH-1690] Add encryption at rest 🔒 Security High Chris Martinez Chris Martinez 8/10/2025 $2,825 Todo 5%":
      - gridcell "690"
      - gridcell "[AUTH-1690] Add encryption at rest"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/10/2025"
      - gridcell "$2,825"
      - gridcell "Todo"
      - gridcell "5%"
    - row "15 [ADMIN-1015] Add brute force protection 🔒 Security Low Kevin Zhang Kevin Zhang 8/13/2025 $300 In Progress 35%":
      - gridcell "15"
      - gridcell "[ADMIN-1015] Add brute force protection"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/13/2025"
      - gridcell "$300"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "19 [DASH-1019] Test error boundary behavior (Sprint 25) 🧪 Testing Medium Olivia Brown Olivia Brown 8/18/2025 $825 In Progress 58%":
      - gridcell "19"
      - gridcell "[DASH-1019] Test error boundary behavior (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/18/2025"
      - gridcell "$825"
      - gridcell "In Progress"
      - gridcell "58%"
    - row "32 [PROJ-1032] Debug performance regression in search (Q2 Planning) 🐛 Bug Medium Maya Patel Maya Patel 8/12/2025 $1,375 Backlog 0%":
      - gridcell "32"
      - gridcell "[PROJ-1032] Debug performance regression in search (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/12/2025"
      - gridcell "$1,375"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "459 [API-1459] Write testing best practices (Sprint 27) 📝 Documentation High Alex Chen Alex Chen 8/8/2025 $6,525 In Progress 35%":
      - gridcell "459"
      - gridcell "[API-1459] Write testing best practices (Sprint 27)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/8/2025"
      - gridcell "$6,525"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "619 [ADMIN-1619] Debug crash on mobile Safari 🐛 Bug Medium Daniel Kim Daniel Kim 8/11/2025 $14,325 In Progress 53%":
      - gridcell "619"
      - gridcell "[ADMIN-1619] Debug crash on mobile Safari"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/11/2025"
      - gridcell "$14,325"
      - gridcell "In Progress"
      - gridcell "53%"
    - row "353 [USER-1353] Clean up deprecated APIs (Security Audit) ♻️ Refactor Medium Kevin Zhang Kevin Zhang 8/22/2025 $500 Backlog 0%":
      - gridcell "353"
      - gridcell "[USER-1353] Clean up deprecated APIs (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/22/2025"
      - gridcell "$500"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "455 [AUTH-1455] Build custom report generator (Sprint 25) ✨ Feature High James Wilson James Wilson 8/11/2025 $1,300 Todo 10%":
      - gridcell "455"
      - gridcell "[AUTH-1455] Build custom report generator (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/11/2025"
      - gridcell "$1,300"
      - gridcell "Todo"
      - gridcell "10%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,060,950 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,060,950"
      - gridcell
      - gridcell "47%"
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