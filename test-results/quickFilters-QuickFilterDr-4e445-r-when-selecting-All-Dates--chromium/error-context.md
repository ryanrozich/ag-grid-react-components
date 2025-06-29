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
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "40"
- img
- paragraph: Total Budget
- paragraph: $219,450
- img
- paragraph: Progress
- paragraph: 36.5%
- img
- paragraph: Budget Remaining
- paragraph: $136,536
- text: 1 to 25 of 41. Page 1 of 2
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
    - row "772 [DASH-1772] Set up vulnerability scanning (Sprint 27) 🔒 Security High Kevin Zhang Kevin Zhang 6/26/2025 $10,525 In Progress 37%":
      - gridcell "772"
      - gridcell "[DASH-1772] Set up vulnerability scanning (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/26/2025"
      - gridcell "$10,525"
      - gridcell "In Progress"
      - gridcell "37%"
    - row "294 [BACKEND-1294] Optimize memory usage (Sprint 26) ⚡ Performance Critical Daniel Kim Daniel Kim 6/27/2025 $350 Backlog 0%":
      - gridcell "294"
      - gridcell "[BACKEND-1294] Optimize memory usage (Sprint 26)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "6/27/2025"
      - gridcell "$350"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "395 [DATA-1395] Fix login form validation error (Q2 Planning) 🐛 Bug High Ryan Thomas Ryan Thomas 6/27/2025 $3,675 Blocked 12%":
      - gridcell "395"
      - gridcell "[DATA-1395] Fix login form validation error (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/27/2025"
      - gridcell "$3,675"
      - gridcell "Blocked"
      - gridcell "12%"
    - row "565 [WEB-1565] Add audit logging (Sprint 23) 🔒 Security Critical Emma Davis Emma Davis 6/25/2025 $450 Todo 14%":
      - gridcell "565"
      - gridcell "[WEB-1565] Add audit logging (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/25/2025"
      - gridcell "$450"
      - gridcell "Todo"
      - gridcell "14%"
    - row "882 [MOBILE-1882] Implement dark mode toggle (Sprint 25) ✨ Feature Critical Ryan Thomas Ryan Thomas 6/25/2025 $1,300 In Progress 47%":
      - gridcell "882"
      - gridcell "[MOBILE-1882] Implement dark mode toggle (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/25/2025"
      - gridcell "$1,300"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "368 [PROJ-1368] Debug crash on mobile Safari 🐛 Bug Critical Emma Davis Emma Davis 6/23/2025 $14,725 Done 100%":
      - gridcell "368"
      - gridcell "[PROJ-1368] Debug crash on mobile Safari"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/23/2025"
      - gridcell "$14,725"
      - gridcell "Done"
      - gridcell "100%"
    - row "669 [ADMIN-1669] Write performance optimization tips (Q2 Planning) 📝 Documentation High Amanda White Amanda White 6/27/2025 $9,650 In Progress 43%":
      - gridcell "669"
      - gridcell "[ADMIN-1669] Write performance optimization tips (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/27/2025"
      - gridcell "$9,650"
      - gridcell "In Progress"
      - gridcell "43%"
    - row "266 [AUTH-1266] Write deployment guide 📝 Documentation Critical Michael Anderson Michael Anderson 6/23/2025 $9,700 Blocked 29%":
      - gridcell "266"
      - gridcell "[AUTH-1266] Write deployment guide"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/23/2025"
      - gridcell "$9,700"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "466 [FRONTEND-1466] Debug WebSocket connection timeout (Security Audit) 🐛 Bug Medium Emily Jackson Emily Jackson 6/25/2025 $1,125 Blocked 16%":
      - gridcell "466"
      - gridcell "[FRONTEND-1466] Debug WebSocket connection timeout (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/25/2025"
      - gridcell "$1,125"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "718 [PROJ-1718] Optimize memory usage ⚡ Performance Critical James Wilson James Wilson 6/22/2025 $525 In Progress 23%":
      - gridcell "718"
      - gridcell "[PROJ-1718] Optimize memory usage"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/22/2025"
      - gridcell "$525"
      - gridcell "In Progress"
      - gridcell "23%"
    - row "370 [CORE-1370] Implement code splitting (Tech Debt) ⚡ Performance High Olivia Brown Olivia Brown 6/25/2025 $14,000 In Progress 26%":
      - gridcell "370"
      - gridcell "[CORE-1370] Implement code splitting (Tech Debt)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/25/2025"
      - gridcell "$14,000"
      - gridcell "In Progress"
      - gridcell "26%"
    - row "627 [INFRA-1627] Write unit tests for auth module 🧪 Testing High Emma Davis Emma Davis 6/27/2025 $4,175 Blocked 13%":
      - gridcell "627"
      - gridcell "[INFRA-1627] Write unit tests for auth module"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/27/2025"
      - gridcell "$4,175"
      - gridcell "Blocked"
      - gridcell "13%"
    - row "71 [FRONTEND-1071] Implement lazy loading ⚡ Performance High Sarah Johnson Sarah Johnson 6/27/2025 $1,300 Blocked 38%":
      - gridcell "71"
      - gridcell "[FRONTEND-1071] Implement lazy loading"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/27/2025"
      - gridcell "$1,300"
      - gridcell "Blocked"
      - gridcell "38%"
    - row "533 [API-1533] Implement API key rotation (Security Audit) 🔒 Security Medium Emma Davis Emma Davis 6/24/2025 $9,975 In Progress 59%":
      - gridcell "533"
      - gridcell "[API-1533] Implement API key rotation (Security Audit)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/24/2025"
      - gridcell "$9,975"
      - gridcell "In Progress"
      - gridcell "59%"
    - row "638 [ADMIN-1638] Split monolithic components ♻️ Refactor High Sophia Taylor Sophia Taylor 6/22/2025 $19,700 Blocked 23%":
      - gridcell "638"
      - gridcell "[ADMIN-1638] Split monolithic components"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/22/2025"
      - gridcell "$19,700"
      - gridcell "Blocked"
      - gridcell "23%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$219,450 37%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$219,450"
      - gridcell
      - gridcell "37%"
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