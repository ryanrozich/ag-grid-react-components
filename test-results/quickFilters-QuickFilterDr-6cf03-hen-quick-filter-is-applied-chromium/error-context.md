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
- paragraph: $4,162,150
- img
- paragraph: Progress
- paragraph: 46.5%
- img
- paragraph: Budget Remaining
- paragraph: $2,280,761
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
    - row "198 [MOBILE-1198] Optimize memory usage (Tech Debt) ⚡ Performance Low Michael Anderson Michael Anderson 9/19/2025 $8,125 Testing 87%":
      - gridcell "198"
      - gridcell "[MOBILE-1198] Optimize memory usage (Tech Debt)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/19/2025"
      - gridcell "$8,125"
      - gridcell "Testing"
      - gridcell "87%"
    - row "190 [API-1190] Implement service workers ⚡ Performance Medium Ryan Thomas Ryan Thomas 8/23/2025 $6,200 In Progress 36%":
      - gridcell "190"
      - gridcell "[API-1190] Implement service workers"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/23/2025"
      - gridcell "$6,200"
      - gridcell "In Progress"
      - gridcell "36%"
    - row "570 [PROJ-1570] Implement CSRF protection (Sprint 24) 🔒 Security Critical Alex Chen Alex Chen 8/12/2025 $3,275 Testing 82%":
      - gridcell "570"
      - gridcell "[PROJ-1570] Implement CSRF protection (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/12/2025"
      - gridcell "$3,275"
      - gridcell "Testing"
      - gridcell "82%"
    - row "185 [API-1185] Create user profile dashboard (Q1 Goals) ✨ Feature Critical Marcus Williams Marcus Williams 8/12/2025 $7,200 Backlog 0%":
      - gridcell "185"
      - gridcell "[API-1185] Create user profile dashboard (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/12/2025"
      - gridcell "$7,200"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "453 [PROJ-1453] Write performance optimization tips (Q2 Planning) 📝 Documentation Medium Isabella Garcia Isabella Garcia 8/24/2025 $1,425 In Review 79%":
      - gridcell "453"
      - gridcell "[PROJ-1453] Write performance optimization tips (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/24/2025"
      - gridcell "$1,425"
      - gridcell "In Review"
      - gridcell "79%"
    - row "236 [AUTH-1236] Set up CI/CD pipeline 🔧 DevOps Medium Emily Jackson Emily Jackson 8/25/2025 $725 Testing 85%":
      - gridcell "236"
      - gridcell "[AUTH-1236] Set up CI/CD pipeline"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/25/2025"
      - gridcell "$725"
      - gridcell "Testing"
      - gridcell "85%"
    - row "621 [API-1621] Implement secrets management 🔧 DevOps Low Emily Jackson Emily Jackson 9/18/2025 $5,325 Testing 85%":
      - gridcell "621"
      - gridcell "[API-1621] Implement secrets management"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/18/2025"
      - gridcell "$5,325"
      - gridcell "Testing"
      - gridcell "85%"
    - row "650 [API-1650] Implement auto-scaling (Sprint 26) 🔧 DevOps Low Emma Davis Emma Davis 9/10/2025 $5,625 Testing 94%":
      - gridcell "650"
      - gridcell "[API-1650] Implement auto-scaling (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/10/2025"
      - gridcell "$5,625"
      - gridcell "Testing"
      - gridcell "94%"
    - row "787 [PROJ-1787] Implement secure file upload 🔒 Security High Emily Jackson Emily Jackson 8/12/2025 $200 Testing 89%":
      - gridcell "787"
      - gridcell "[PROJ-1787] Implement secure file upload"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/12/2025"
      - gridcell "$200"
      - gridcell "Testing"
      - gridcell "89%"
    - row "33 [AUTH-1033] Clean up deprecated APIs ♻️ Refactor Low Emily Jackson Emily Jackson 8/29/2025 $4,800 Todo 6%":
      - gridcell "33"
      - gridcell "[AUTH-1033] Clean up deprecated APIs"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/29/2025"
      - gridcell "$4,800"
      - gridcell "Todo"
      - gridcell "6%"
    - row "375 [INFRA-1375] Optimize render performance ⚡ Performance Low Emily Jackson Emily Jackson 9/4/2025 $7,100 Backlog 0%":
      - gridcell "375"
      - gridcell "[INFRA-1375] Optimize render performance"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/4/2025"
      - gridcell "$7,100"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "755 [PROJ-1755] Set up penetration testing 🔒 Security Low Sophia Taylor Sophia Taylor 8/21/2025 $15,200 Backlog 0%":
      - gridcell "755"
      - gridcell "[PROJ-1755] Set up penetration testing"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/21/2025"
      - gridcell "$15,200"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "819 [CORE-1819] Optimize database queries (Q1 Goals) ⚡ Performance Medium Emily Jackson Emily Jackson 8/19/2025 $2,550 Testing 82%":
      - gridcell "819"
      - gridcell "[CORE-1819] Optimize database queries (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/19/2025"
      - gridcell "$2,550"
      - gridcell "Testing"
      - gridcell "82%"
    - row "321 [CORE-1321] Add performance benchmarks 🧪 Testing High Olivia Brown Olivia Brown 8/12/2025 $3,750 Backlog 0%":
      - gridcell "321"
      - gridcell "[CORE-1321] Add performance benchmarks"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/12/2025"
      - gridcell "$3,750"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "777 [WEB-1777] Test mobile responsiveness (Sprint 26) 🧪 Testing Medium Ryan Thomas Ryan Thomas 8/26/2025 $3,250 Backlog 0%":
      - gridcell "777"
      - gridcell "[WEB-1777] Test mobile responsiveness (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/26/2025"
      - gridcell "$3,250"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "780 [CORE-1780] Write API contract tests (Q2 Planning) 🧪 Testing Low Alex Chen Alex Chen 9/10/2025 $7,750 In Progress 44%":
      - gridcell "780"
      - gridcell "[CORE-1780] Write API contract tests (Q2 Planning)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/10/2025"
      - gridcell "$7,750"
      - gridcell "In Progress"
      - gridcell "44%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,162,150 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,162,150"
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