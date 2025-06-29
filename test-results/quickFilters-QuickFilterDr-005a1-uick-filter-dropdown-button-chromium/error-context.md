# Test info

- Name: QuickFilterDropdown >> should display quick filter dropdown button
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:22:3

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
- paragraph: "46"
- img
- paragraph: Total Budget
- paragraph: $196,050
- img
- paragraph: Progress
- paragraph: 51.4%
- img
- paragraph: Budget Remaining
- paragraph: $104,776
- text: 1 to 25 of 47. Page 1 of 2
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
    - row "611 [FRONTEND-1611] Refactor authentication flow (Q1 Goals) ♻️ Refactor Critical John Robinson John Robinson 6/27/2025 $275 Testing 82%":
      - gridcell "611"
      - gridcell "[FRONTEND-1611] Refactor authentication flow (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/27/2025"
      - gridcell "$275"
      - gridcell "Testing"
      - gridcell "82%"
    - row "81 [PROJ-1081] Implement auto-scaling (Sprint 24) 🔧 DevOps Critical John Robinson John Robinson 6/27/2025 $700 Blocked 13%":
      - gridcell "81"
      - gridcell "[PROJ-1081] Implement auto-scaling (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/27/2025"
      - gridcell "$700"
      - gridcell "Blocked"
      - gridcell "13%"
    - row "712 [DATA-1712] Test error boundary behavior (Tech Debt) 🧪 Testing Critical Maya Patel Maya Patel 6/27/2025 $8,100 Blocked 29%":
      - gridcell "712"
      - gridcell "[DATA-1712] Test error boundary behavior (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "6/27/2025"
      - gridcell "$8,100"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "933 [WEB-1933] Extract shared utilities module (Sprint 23) ♻️ Refactor Critical Kevin Zhang Kevin Zhang 6/26/2025 $8,550 In Progress 58%":
      - gridcell "933"
      - gridcell "[WEB-1933] Extract shared utilities module (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/26/2025"
      - gridcell "$8,550"
      - gridcell "In Progress"
      - gridcell "58%"
    - row "134 [CORE-1134] Create backup automation (Q1 Goals) 🔧 DevOps Critical Olivia Brown Olivia Brown 6/25/2025 $19,075 Todo 11%":
      - gridcell "134"
      - gridcell "[CORE-1134] Create backup automation (Q1 Goals)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/25/2025"
      - gridcell "$19,075"
      - gridcell "Todo"
      - gridcell "11%"
    - row "544 [AUTH-1544] Create user profile dashboard (Sprint 24) ✨ Feature Critical Jessica Lopez Jessica Lopez 6/25/2025 $3,225 Blocked 33%":
      - gridcell "544"
      - gridcell "[AUTH-1544] Create user profile dashboard (Sprint 24)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/25/2025"
      - gridcell "$3,225"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "878 [UI-1878] Update to React 18 patterns (Security Audit) ♻️ Refactor Critical Kevin Zhang Kevin Zhang 6/26/2025 $3,475 Blocked 26%":
      - gridcell "878"
      - gridcell "[UI-1878] Update to React 18 patterns (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/26/2025"
      - gridcell "$3,475"
      - gridcell "Blocked"
      - gridcell "26%"
    - row "775 [DATA-1775] Fix broken deep links in navigation (Sprint 23) 🐛 Bug Critical Isabella Garcia Isabella Garcia 6/24/2025 $7,025 In Progress 47%":
      - gridcell "775"
      - gridcell "[DATA-1775] Fix broken deep links in navigation (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/24/2025"
      - gridcell "$7,025"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "113 [FRONTEND-1113] Add encryption at rest 🔒 Security High John Robinson John Robinson 6/24/2025 $2,725 In Progress 32%":
      - gridcell "113"
      - gridcell "[FRONTEND-1113] Add encryption at rest"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/24/2025"
      - gridcell "$2,725"
      - gridcell "In Progress"
      - gridcell "32%"
    - row "154 [MOBILE-1154] Add internationalization tests (Sprint 27) 🧪 Testing Critical Sophia Taylor Sophia Taylor 6/23/2025 $4,825 In Progress 49%":
      - gridcell "154"
      - gridcell "[MOBILE-1154] Add internationalization tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/23/2025"
      - gridcell "$4,825"
      - gridcell "In Progress"
      - gridcell "49%"
    - row "246 [FRONTEND-1246] Optimize database queries (Q2 Planning) ⚡ Performance Critical Michael Anderson Michael Anderson 6/23/2025 $1,000 In Progress 55%":
      - gridcell "246"
      - gridcell "[FRONTEND-1246] Optimize database queries (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/23/2025"
      - gridcell "$1,000"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "281 [APP-1281] Fix infinite scroll pagination bug (Tech Debt) 🐛 Bug Critical Priya Sharma Priya Sharma 6/23/2025 $1,350 In Progress 30%":
      - gridcell "281"
      - gridcell "[APP-1281] Fix infinite scroll pagination bug (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/23/2025"
      - gridcell "$1,350"
      - gridcell "In Progress"
      - gridcell "30%"
    - row "192 [API-1192] Implement OAuth integration (Q1 Goals) ✨ Feature Critical Kevin Zhang Kevin Zhang 6/23/2025 $4,700 In Progress 42%":
      - gridcell "192"
      - gridcell "[API-1192] Implement OAuth integration (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/23/2025"
      - gridcell "$4,700"
      - gridcell "In Progress"
      - gridcell "42%"
    - row "267 [AUTH-1267] Write performance optimization tips 📝 Documentation High Olivia Brown Olivia Brown 6/25/2025 $6,800 In Progress 35%":
      - gridcell "267"
      - gridcell "[AUTH-1267] Write performance optimization tips"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/25/2025"
      - gridcell "$6,800"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "27 [APP-1027] Write accessibility tests (Security Audit) 🧪 Testing High Ryan Thomas Ryan Thomas 6/27/2025 $6,675 In Progress 46%":
      - gridcell "27"
      - gridcell "[APP-1027] Write accessibility tests (Security Audit)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/27/2025"
      - gridcell "$6,675"
      - gridcell "In Progress"
      - gridcell "46%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$196,050 51%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$196,050"
      - gridcell
      - gridcell "51%"
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