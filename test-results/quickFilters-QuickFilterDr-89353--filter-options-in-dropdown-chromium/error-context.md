# Test info

- Name: QuickFilterDropdown >> should search/filter options in dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:252:3

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
- paragraph: $4,002,925
- img
- paragraph: Progress
- paragraph: 45.2%
- img
- paragraph: Budget Remaining
- paragraph: $2,211,315
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
    - row "296 [USER-1296] Implement session management (Sprint 24) 🔒 Security Medium Michael Anderson Michael Anderson 8/18/2025 $3,150 Testing 93%":
      - gridcell "296"
      - gridcell "[USER-1296] Implement session management (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/18/2025"
      - gridcell "$3,150"
      - gridcell "Testing"
      - gridcell "93%"
    - row "643 [WEB-1643] Migrate to new testing framework (Q2 Planning) ♻️ Refactor Low Alex Chen Alex Chen 8/25/2025 $800 Backlog 0%":
      - gridcell "643"
      - gridcell "[WEB-1643] Migrate to new testing framework (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/25/2025"
      - gridcell "$800"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "164 [ADMIN-1164] Implement caching strategy ⚡ Performance High Priya Sharma Priya Sharma 8/15/2025 $950 Todo 11%":
      - gridcell "164"
      - gridcell "[ADMIN-1164] Implement caching strategy"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/15/2025"
      - gridcell "$950"
      - gridcell "Todo"
      - gridcell "11%"
    - row "223 [INFRA-1223] Fix broken deep links in navigation 🐛 Bug Low Sarah Johnson Sarah Johnson 8/21/2025 $400 Blocked 17%":
      - gridcell "223"
      - gridcell "[INFRA-1223] Fix broken deep links in navigation"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/21/2025"
      - gridcell "$400"
      - gridcell "Blocked"
      - gridcell "17%"
    - row "259 [APP-1259] Configure Docker containers (Sprint 24) 🔧 DevOps Low Ryan Thomas Ryan Thomas 9/2/2025 $4,125 Backlog 0%":
      - gridcell "259"
      - gridcell "[APP-1259] Configure Docker containers (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/2/2025"
      - gridcell "$4,125"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "799 [USER-1799] Add request batching ⚡ Performance Low Isabella Garcia Isabella Garcia 9/15/2025 $5,975 Backlog 0%":
      - gridcell "799"
      - gridcell "[USER-1799] Add request batching"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/15/2025"
      - gridcell "$5,975"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "379 [APP-1379] Extract shared utilities module (Sprint 23) ♻️ Refactor Medium Kevin Zhang Kevin Zhang 8/21/2025 $650 Todo 17%":
      - gridcell "379"
      - gridcell "[APP-1379] Extract shared utilities module (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/21/2025"
      - gridcell "$650"
      - gridcell "Todo"
      - gridcell "17%"
    - row "3 [AUTH-1003] Write unit tests for auth module 🧪 Testing High Sophia Taylor Sophia Taylor 8/11/2025 $550 In Progress 37%":
      - gridcell "3"
      - gridcell "[AUTH-1003] Write unit tests for auth module"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/11/2025"
      - gridcell "$550"
      - gridcell "In Progress"
      - gridcell "37%"
    - row "180 [API-1180] Refactor authentication flow (Security Audit) ♻️ Refactor Low Chris Martinez Chris Martinez 9/16/2025 $9,625 Todo 19%":
      - gridcell "180"
      - gridcell "[API-1180] Refactor authentication flow (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/16/2025"
      - gridcell "$9,625"
      - gridcell "Todo"
      - gridcell "19%"
    - row "744 [INFRA-1744] Debug crash on mobile Safari (Security Audit) 🐛 Bug High Maya Patel Maya Patel 8/7/2025 $950 Backlog 0%":
      - gridcell "744"
      - gridcell "[INFRA-1744] Debug crash on mobile Safari (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/7/2025"
      - gridcell "$950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "121 [WEB-1121] Implement rate limiting (Sprint 27) 🔒 Security Low Emily Jackson Emily Jackson 8/18/2025 $2,675 In Review 64%":
      - gridcell "121"
      - gridcell "[WEB-1121] Implement rate limiting (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/18/2025"
      - gridcell "$2,675"
      - gridcell "In Review"
      - gridcell "64%"
    - row "228 [INFRA-1228] Write component snapshot tests 🧪 Testing Critical Marcus Williams Marcus Williams 8/5/2025 $1,600 Todo 6%":
      - gridcell "228"
      - gridcell "[INFRA-1228] Write component snapshot tests"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/5/2025"
      - gridcell "$1,600"
      - gridcell "Todo"
      - gridcell "6%"
    - row "658 [API-1658] Document component props (Security Audit) 📝 Documentation High Marcus Williams Marcus Williams 8/4/2025 $625 In Review 66%":
      - gridcell "658"
      - gridcell "[API-1658] Document component props (Security Audit)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/4/2025"
      - gridcell "$625"
      - gridcell "In Review"
      - gridcell "66%"
    - row "29 [DATA-1029] Add performance benchmarks (Performance Sprint) 🧪 Testing High Olivia Brown Olivia Brown 8/7/2025 $3,550 Backlog 0%":
      - gridcell "29"
      - gridcell "[DATA-1029] Add performance benchmarks (Performance Sprint)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/7/2025"
      - gridcell "$3,550"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "597 [FRONTEND-1597] Create security penetration tests (Performance Sprint) 🧪 Testing High Alex Chen Alex Chen 8/2/2025 $950 In Review 73%":
      - gridcell "597"
      - gridcell "[FRONTEND-1597] Create security penetration tests (Performance Sprint)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/2/2025"
      - gridcell "$950"
      - gridcell "In Review"
      - gridcell "73%"
    - row "953 [FRONTEND-1953] Write API contract tests (Sprint 27) 🧪 Testing Medium Chris Martinez Chris Martinez 8/16/2025 $2,675 Todo 7%":
      - gridcell "953"
      - gridcell "[FRONTEND-1953] Write API contract tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/16/2025"
      - gridcell "$2,675"
      - gridcell "Todo"
      - gridcell "7%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,002,925 45%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,002,925"
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