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
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "51"
- img
- paragraph: Total Budget
- paragraph: $257,725
- img
- paragraph: Progress
- paragraph: 44.2%
- img
- paragraph: Budget Remaining
- paragraph: $133,285
- text: 1 to 25 of 52. Page 1 of 3
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
    - row "128 [API-1128] Implement auto-scaling (Sprint 23) 🔧 DevOps Critical Amanda White Amanda White 6/27/2025 $9,350 Blocked 33%":
      - gridcell "128"
      - gridcell "[API-1128] Implement auto-scaling (Sprint 23)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/27/2025"
      - gridcell "$9,350"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "188 [CORE-1188] Simplify complex conditionals (Sprint 27) ♻️ Refactor Critical James Wilson James Wilson 6/25/2025 $250 Blocked 16%":
      - gridcell "188"
      - gridcell "[CORE-1188] Simplify complex conditionals (Sprint 27)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/25/2025"
      - gridcell "$250"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "655 [APP-1655] Add drag-and-drop file upload ✨ Feature High Ryan Thomas Ryan Thomas 6/27/2025 $625 Blocked 21%":
      - gridcell "655"
      - gridcell "[APP-1655] Add drag-and-drop file upload"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/27/2025"
      - gridcell "$625"
      - gridcell "Blocked"
      - gridcell "21%"
    - row "717 [CORE-1717] Add CDN for static assets (Q2 Planning) ⚡ Performance High John Robinson John Robinson 6/27/2025 $13,325 Blocked 18%":
      - gridcell "717"
      - gridcell "[CORE-1717] Add CDN for static assets (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/27/2025"
      - gridcell "$13,325"
      - gridcell "Blocked"
      - gridcell "18%"
    - row "828 [AUTH-1828] Implement dark mode toggle (Security Audit) ✨ Feature Critical Emily Jackson Emily Jackson 6/25/2025 $1,825 Blocked 24%":
      - gridcell "828"
      - gridcell "[AUTH-1828] Implement dark mode toggle (Security Audit)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/25/2025"
      - gridcell "$1,825"
      - gridcell "Blocked"
      - gridcell "24%"
    - row "464 [WEB-1464] Configure Docker containers (Performance Sprint) 🔧 DevOps Critical Maya Patel Maya Patel 6/26/2025 $700 Blocked 15%":
      - gridcell "464"
      - gridcell "[WEB-1464] Configure Docker containers (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/26/2025"
      - gridcell "$700"
      - gridcell "Blocked"
      - gridcell "15%"
    - row "475 [PROJ-1475] Split monolithic components ♻️ Refactor High Michael Anderson Michael Anderson 6/27/2025 $4,000 In Progress 41%":
      - gridcell "475"
      - gridcell "[PROJ-1475] Split monolithic components"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/27/2025"
      - gridcell "$4,000"
      - gridcell "In Progress"
      - gridcell "41%"
    - row "956 [INFRA-1956] Implement two-factor authentication (Sprint 27) ✨ Feature Critical Sarah Johnson Sarah Johnson 6/24/2025 $125 In Progress 31%":
      - gridcell "956"
      - gridcell "[INFRA-1956] Implement two-factor authentication (Sprint 27)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/24/2025"
      - gridcell "$125"
      - gridcell "In Progress"
      - gridcell "31%"
    - row "957 [MOBILE-1957] Implement social media sharing ✨ Feature Critical Emily Jackson Emily Jackson 6/24/2025 $8,150 Blocked 33%":
      - gridcell "957"
      - gridcell "[MOBILE-1957] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/24/2025"
      - gridcell "$8,150"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "989 [ADMIN-1989] Update to React 18 patterns (Sprint 26) ♻️ Refactor High Emma Davis Emma Davis 6/26/2025 $275 In Progress 54%":
      - gridcell "989"
      - gridcell "[ADMIN-1989] Update to React 18 patterns (Sprint 26)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/26/2025"
      - gridcell "$275"
      - gridcell "In Progress"
      - gridcell "54%"
    - row "947 [AUTH-1947] Extract business logic layer ♻️ Refactor Critical Emma Davis Emma Davis 6/22/2025 $3,875 Blocked 24%":
      - gridcell "947"
      - gridcell "[AUTH-1947] Extract business logic layer"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/22/2025"
      - gridcell "$3,875"
      - gridcell "Blocked"
      - gridcell "24%"
    - row "304 [PROJ-1304] Simplify complex conditionals (Sprint 23) ♻️ Refactor High Sarah Johnson Sarah Johnson 6/22/2025 $1,600 In Progress 28%":
      - gridcell "304"
      - gridcell "[PROJ-1304] Simplify complex conditionals (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/22/2025"
      - gridcell "$1,600"
      - gridcell "In Progress"
      - gridcell "28%"
    - row "719 [PROJ-1719] Create disaster recovery plan 🔧 DevOps High Chris Martinez Chris Martinez 6/27/2025 $700 Done 100%":
      - gridcell "719"
      - gridcell "[PROJ-1719] Create disaster recovery plan"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/27/2025"
      - gridcell "$700"
      - gridcell "Done"
      - gridcell "100%"
    - row "313 [BACKEND-1313] Add multi-language support (Tech Debt) ✨ Feature High Emma Davis Emma Davis 6/22/2025 $1,350 Blocked 37%":
      - gridcell "313"
      - gridcell "[BACKEND-1313] Add multi-language support (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/22/2025"
      - gridcell "$1,350"
      - gridcell "Blocked"
      - gridcell "37%"
    - row "345 [API-1345] Handle null pointer exception in API client (Q1 Goals) 🐛 Bug Medium Emma Davis Emma Davis 6/25/2025 $17,225 In Progress 24%":
      - gridcell "345"
      - gridcell "[API-1345] Handle null pointer exception in API client (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/25/2025"
      - gridcell "$17,225"
      - gridcell "In Progress"
      - gridcell "24%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$257,725 44%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$257,725"
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
- text: Page 1 of 3
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