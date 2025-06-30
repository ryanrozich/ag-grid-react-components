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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $3,941,000
- img
- paragraph: Progress
- paragraph: 46.0%
- img
- paragraph: Budget Remaining
- paragraph: $2,155,611
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
    - row "948 [API-1948] Create onboarding tutorial 📝 Documentation Medium David Lee David Lee 8/30/2025 $525 In Progress 40%":
      - gridcell "948"
      - gridcell "[API-1948] Create onboarding tutorial"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/30/2025"
      - gridcell "$525"
      - gridcell "In Progress"
      - gridcell "40%"
    - row "656 [UI-1656] Implement API key rotation (Performance Sprint) 🔒 Security Critical Michael Anderson Michael Anderson 8/15/2025 $8,000 Todo 7%":
      - gridcell "656"
      - gridcell "[UI-1656] Implement API key rotation (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/15/2025"
      - gridcell "$8,000"
      - gridcell "Todo"
      - gridcell "7%"
    - row "991 [CORE-1991] Split monolithic components ♻️ Refactor Medium Priya Sharma Priya Sharma 9/2/2025 $5,950 Backlog 0%":
      - gridcell "991"
      - gridcell "[CORE-1991] Split monolithic components"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/2/2025"
      - gridcell "$5,950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "482 [WEB-1482] Update to ES6 modules ♻️ Refactor High Emily Jackson Emily Jackson 8/15/2025 $5,950 Todo 5%":
      - gridcell "482"
      - gridcell "[WEB-1482] Update to ES6 modules"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/15/2025"
      - gridcell "$5,950"
      - gridcell "Todo"
      - gridcell "5%"
    - row "118 [AUTH-1118] Test mobile responsiveness (Tech Debt) 🧪 Testing Low Sarah Johnson Sarah Johnson 9/12/2025 $650 In Review 77%":
      - gridcell "118"
      - gridcell "[AUTH-1118] Test mobile responsiveness (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/12/2025"
      - gridcell "$650"
      - gridcell "In Review"
      - gridcell "77%"
    - row "780 [DASH-1780] Add drag-and-drop file upload ✨ Feature Critical Maya Patel Maya Patel 8/13/2025 $1,500 Todo 14%":
      - gridcell "780"
      - gridcell "[DASH-1780] Add drag-and-drop file upload"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/13/2025"
      - gridcell "$1,500"
      - gridcell "Todo"
      - gridcell "14%"
    - row "578 [AUTH-1578] Set up SSL certificates (Sprint 25) 🔒 Security Medium John Robinson John Robinson 8/17/2025 $575 Todo 6%":
      - gridcell "578"
      - gridcell "[AUTH-1578] Set up SSL certificates (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/17/2025"
      - gridcell "$575"
      - gridcell "Todo"
      - gridcell "6%"
    - row "142 [CORE-1142] Add input sanitization (Q1 Goals) 🔒 Security Medium Alex Chen Alex Chen 8/12/2025 $900 In Progress 22%":
      - gridcell "142"
      - gridcell "[CORE-1142] Add input sanitization (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/12/2025"
      - gridcell "$900"
      - gridcell "In Progress"
      - gridcell "22%"
    - row "647 [FRONTEND-1647] Write performance optimization tips (Security Audit) 📝 Documentation Medium Sarah Johnson Sarah Johnson 8/23/2025 $1,425 In Review 73%":
      - gridcell "647"
      - gridcell "[FRONTEND-1647] Write performance optimization tips (Security Audit)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/23/2025"
      - gridcell "$1,425"
      - gridcell "In Review"
      - gridcell "73%"
    - row "321 [API-1321] Create architecture overview (Sprint 27) 📝 Documentation Critical Sophia Taylor Sophia Taylor 8/9/2025 $1,450 Backlog 0%":
      - gridcell "321"
      - gridcell "[API-1321] Create architecture overview (Sprint 27)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/9/2025"
      - gridcell "$1,450"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "900 [WEB-1900] Add internationalization tests (Sprint 23) 🧪 Testing High Kevin Zhang Kevin Zhang 8/11/2025 $375 Todo 17%":
      - gridcell "900"
      - gridcell "[WEB-1900] Add internationalization tests (Sprint 23)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/11/2025"
      - gridcell "$375"
      - gridcell "Todo"
      - gridcell "17%"
    - row "934 [FRONTEND-1934] Debug performance regression in search (Sprint 26) 🐛 Bug Critical Michael Anderson Michael Anderson 8/8/2025 $18,500 Backlog 0%":
      - gridcell "934"
      - gridcell "[FRONTEND-1934] Debug performance regression in search (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/8/2025"
      - gridcell "$18,500"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "738 [CORE-1738] Add E2E tests for checkout flow (Tech Debt) 🧪 Testing Medium Daniel Kim Daniel Kim 8/19/2025 $9,425 In Progress 38%":
      - gridcell "738"
      - gridcell "[CORE-1738] Add E2E tests for checkout flow (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/19/2025"
      - gridcell "$9,425"
      - gridcell "In Progress"
      - gridcell "38%"
    - row "632 [UI-1632] Write unit tests for auth module (Sprint 25) 🧪 Testing Medium Sophia Taylor Sophia Taylor 8/22/2025 $900 Todo 5%":
      - gridcell "632"
      - gridcell "[UI-1632] Write unit tests for auth module (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/22/2025"
      - gridcell "$900"
      - gridcell "Todo"
      - gridcell "5%"
    - row "712 [PROJ-1712] Write API contract tests (Sprint 26) 🧪 Testing Critical Alex Chen Alex Chen 8/5/2025 $14,475 In Progress 32%":
      - gridcell "712"
      - gridcell "[PROJ-1712] Write API contract tests (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/5/2025"
      - gridcell "$14,475"
      - gridcell "In Progress"
      - gridcell "32%"
    - row "117 [USER-1117] Add E2E tests for checkout flow 🧪 Testing Low Emma Davis Emma Davis 9/1/2025 $100 Backlog 0%":
      - gridcell "117"
      - gridcell "[USER-1117] Add E2E tests for checkout flow"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/1/2025"
      - gridcell "$100"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,941,000 46%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,941,000"
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