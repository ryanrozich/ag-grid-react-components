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
- paragraph: $4,113,150
- img
- paragraph: Progress
- paragraph: 45.8%
- img
- paragraph: Budget Remaining
- paragraph: $2,191,002
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
    - row "799 [ADMIN-1799] Set up infrastructure as code (Q2 Planning) 🔧 DevOps High Daniel Kim Daniel Kim 8/21/2025 $225 Todo 12%":
      - gridcell "799"
      - gridcell "[ADMIN-1799] Set up infrastructure as code (Q2 Planning)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/21/2025"
      - gridcell "$225"
      - gridcell "Todo"
      - gridcell "12%"
    - row "656 [MOBILE-1656] Write migration guide for v2 📝 Documentation Medium Marcus Williams Marcus Williams 8/24/2025 $7,350 In Review 71%":
      - gridcell "656"
      - gridcell "[MOBILE-1656] Write migration guide for v2"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/24/2025"
      - gridcell "$7,350"
      - gridcell "In Review"
      - gridcell "71%"
    - row "773 [ADMIN-1773] Document error handling patterns (Tech Debt) 📝 Documentation Critical Alex Chen Alex Chen 8/15/2025 $500 Backlog 0%":
      - gridcell "773"
      - gridcell "[ADMIN-1773] Document error handling patterns (Tech Debt)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/15/2025"
      - gridcell "$500"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "174 [ADMIN-1174] Configure health checks (Sprint 23) 🔧 DevOps High James Wilson James Wilson 8/16/2025 $4,350 Backlog 0%":
      - gridcell "174"
      - gridcell "[ADMIN-1174] Configure health checks (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/16/2025"
      - gridcell "$4,350"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "170 [WEB-1170] Debug crash on mobile Safari (Sprint 23) 🐛 Bug Low Sophia Taylor Sophia Taylor 9/1/2025 $925 In Progress 47%":
      - gridcell "170"
      - gridcell "[WEB-1170] Debug crash on mobile Safari (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/1/2025"
      - gridcell "$925"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "777 [CORE-1777] Configure CDN distribution (Q2 Planning) 🔧 DevOps High Emma Davis Emma Davis 8/19/2025 $3,325 Backlog 0%":
      - gridcell "777"
      - gridcell "[CORE-1777] Configure CDN distribution (Q2 Planning)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/19/2025"
      - gridcell "$3,325"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "108 [CORE-1108] Document component props 📝 Documentation High Isabella Garcia Isabella Garcia 8/19/2025 $775 Todo 9%":
      - gridcell "108"
      - gridcell "[CORE-1108] Document component props"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/19/2025"
      - gridcell "$775"
      - gridcell "Todo"
      - gridcell "9%"
    - row "358 [BACKEND-1358] Create user profile dashboard ✨ Feature Medium John Robinson John Robinson 8/18/2025 $8,675 Backlog 0%":
      - gridcell "358"
      - gridcell "[BACKEND-1358] Create user profile dashboard"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/18/2025"
      - gridcell "$8,675"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "513 [UI-1513] Update to React 18 patterns ♻️ Refactor High Olivia Brown Olivia Brown 8/11/2025 $8,300 In Review 77%":
      - gridcell "513"
      - gridcell "[UI-1513] Update to React 18 patterns"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/11/2025"
      - gridcell "$8,300"
      - gridcell "In Review"
      - gridcell "77%"
    - row "802 [USER-1802] Implement social media sharing (Q2 Planning) ✨ Feature Low Alex Chen Alex Chen 9/5/2025 $450 Todo 19%":
      - gridcell "802"
      - gridcell "[USER-1802] Implement social media sharing (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/5/2025"
      - gridcell "$450"
      - gridcell "Todo"
      - gridcell "19%"
    - row "50 [API-1050] Implement service workers (Performance Sprint) ⚡ Performance Medium Sarah Johnson Sarah Johnson 8/19/2025 $875 Backlog 0%":
      - gridcell "50"
      - gridcell "[API-1050] Implement service workers (Performance Sprint)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/19/2025"
      - gridcell "$875"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "517 [UI-1517] Configure health checks 🔧 DevOps High Chris Martinez Chris Martinez 8/9/2025 $225 Testing 84%":
      - gridcell "517"
      - gridcell "[UI-1517] Configure health checks"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/9/2025"
      - gridcell "$225"
      - gridcell "Testing"
      - gridcell "84%"
    - row "53 [WEB-1053] Build real-time notifications system ✨ Feature Critical Marcus Williams Marcus Williams 8/7/2025 $600 Backlog 0%":
      - gridcell "53"
      - gridcell "[WEB-1053] Build real-time notifications system"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/7/2025"
      - gridcell "$600"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "185 [DASH-1185] Resolve race condition in state update (Q2 Planning) 🐛 Bug Medium James Wilson James Wilson 8/14/2025 $325 In Progress 35%":
      - gridcell "185"
      - gridcell "[DASH-1185] Resolve race condition in state update (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/14/2025"
      - gridcell "$325"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "485 [CORE-1485] Consolidate duplicate code (Performance Sprint) ♻️ Refactor Critical Emily Jackson Emily Jackson 8/6/2025 $10,150 Todo 6%":
      - gridcell "485"
      - gridcell "[CORE-1485] Consolidate duplicate code (Performance Sprint)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/6/2025"
      - gridcell "$10,150"
      - gridcell "Todo"
      - gridcell "6%"
    - row "991 [ADMIN-1991] Add CDN for static assets ⚡ Performance Critical Chris Martinez Chris Martinez 8/6/2025 $11,900 In Review 65%":
      - gridcell "991"
      - gridcell "[ADMIN-1991] Add CDN for static assets"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/6/2025"
      - gridcell "$11,900"
      - gridcell "In Review"
      - gridcell "65%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,113,150 46%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,113,150"
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