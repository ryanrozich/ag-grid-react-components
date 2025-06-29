# Test info

- Name: QuickFilterDropdown >> should open dropdown and show filter options
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:40:3

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
- paragraph: "38"
- img
- paragraph: Total Budget
- paragraph: $183,850
- img
- paragraph: Progress
- paragraph: 47.2%
- img
- paragraph: Budget Remaining
- paragraph: $105,434
- text: 1 to 25 of 39. Page 1 of 2
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
    - row "82 [DASH-1082] Extract business logic layer (Q2 Planning) ♻️ Refactor Critical Amanda White Amanda White 6/26/2025 $13,200 Testing 94%":
      - gridcell "82"
      - gridcell "[DASH-1082] Extract business logic layer (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/26/2025"
      - gridcell "$13,200"
      - gridcell "Testing"
      - gridcell "94%"
    - row "923 [AUTH-1923] Split monolithic components ♻️ Refactor Critical Alex Chen Alex Chen 6/26/2025 $575 In Progress 40%":
      - gridcell "923"
      - gridcell "[AUTH-1923] Split monolithic components"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/26/2025"
      - gridcell "$575"
      - gridcell "In Progress"
      - gridcell "40%"
    - row "78 [DASH-1078] Set up SSL certificates 🔒 Security High Chris Martinez Chris Martinez 6/25/2025 $7,100 Blocked 18%":
      - gridcell "78"
      - gridcell "[DASH-1078] Set up SSL certificates"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/25/2025"
      - gridcell "$7,100"
      - gridcell "Blocked"
      - gridcell "18%"
    - row "192 [WEB-1192] Correct data corruption in cache layer (Q1 Goals) 🐛 Bug Medium Priya Sharma Priya Sharma 6/24/2025 $17,325 Blocked 30%":
      - gridcell "192"
      - gridcell "[WEB-1192] Correct data corruption in cache layer (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/24/2025"
      - gridcell "$17,325"
      - gridcell "Blocked"
      - gridcell "30%"
    - row "200 [CORE-1200] Implement rate limiting (Sprint 24) 🔒 Security High David Lee David Lee 6/25/2025 $19,925 Blocked 18%":
      - gridcell "200"
      - gridcell "[CORE-1200] Implement rate limiting (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/25/2025"
      - gridcell "$19,925"
      - gridcell "Blocked"
      - gridcell "18%"
    - row "405 [DATA-1405] Add encryption at rest 🔒 Security Critical Olivia Brown Olivia Brown 6/22/2025 $950 In Progress 29%":
      - gridcell "405"
      - gridcell "[DATA-1405] Add encryption at rest"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/22/2025"
      - gridcell "$950"
      - gridcell "In Progress"
      - gridcell "29%"
    - row "750 [AUTH-1750] Fix broken unit tests in CI pipeline (Security Audit) 🐛 Bug High Emma Davis Emma Davis 6/23/2025 $675 In Progress 32%":
      - gridcell "750"
      - gridcell "[AUTH-1750] Fix broken unit tests in CI pipeline (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/23/2025"
      - gridcell "$675"
      - gridcell "In Progress"
      - gridcell "32%"
    - row "5 [AUTH-1005] Write testing best practices (Q1 Goals) 📝 Documentation High Jessica Lopez Jessica Lopez 6/26/2025 $2,125 In Progress 39%":
      - gridcell "5"
      - gridcell "[AUTH-1005] Write testing best practices (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/26/2025"
      - gridcell "$2,125"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "887 [BACKEND-1887] Create onboarding tutorial (Q1 Goals) 📝 Documentation Critical Sophia Taylor Sophia Taylor 6/22/2025 $350 Blocked 25%":
      - gridcell "887"
      - gridcell "[BACKEND-1887] Create onboarding tutorial (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/22/2025"
      - gridcell "$350"
      - gridcell "Blocked"
      - gridcell "25%"
    - row "233 [PROJ-1233] Implement blue-green deployment (Q1 Goals) 🔧 DevOps High Olivia Brown Olivia Brown 6/23/2025 $925 In Progress 51%":
      - gridcell "233"
      - gridcell "[PROJ-1233] Implement blue-green deployment (Q1 Goals)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/23/2025"
      - gridcell "$925"
      - gridcell "In Progress"
      - gridcell "51%"
    - row "831 [WEB-1831] Configure firewall rules 🔒 Security High Chris Martinez Chris Martinez 6/23/2025 $350 Done 100%":
      - gridcell "831"
      - gridcell "[WEB-1831] Configure firewall rules"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/23/2025"
      - gridcell "$350"
      - gridcell "Done"
      - gridcell "100%"
    - row "978 [AUTH-1978] Refactor authentication flow ♻️ Refactor High Emily Jackson Emily Jackson 6/27/2025 $8,050 In Progress 23%":
      - gridcell "978"
      - gridcell "[AUTH-1978] Refactor authentication flow"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/27/2025"
      - gridcell "$8,050"
      - gridcell "In Progress"
      - gridcell "23%"
    - row "573 [ADMIN-1573] Configure security headers 🔒 Security Medium John Robinson John Robinson 6/23/2025 $175 Blocked 37%":
      - gridcell "573"
      - gridcell "[ADMIN-1573] Configure security headers"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "6/23/2025"
      - gridcell "$175"
      - gridcell "Blocked"
      - gridcell "37%"
    - row "845 [UI-1845] Update API documentation (Sprint 25) 📝 Documentation High Chris Martinez Chris Martinez 6/24/2025 $11,200 In Progress 39%":
      - gridcell "845"
      - gridcell "[UI-1845] Update API documentation (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/24/2025"
      - gridcell "$11,200"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "618 [CORE-1618] Create backup automation (Security Audit) 🔧 DevOps Medium Priya Sharma Priya Sharma 6/25/2025 $650 Done 100%":
      - gridcell "618"
      - gridcell "[CORE-1618] Create backup automation (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "6/25/2025"
      - gridcell "$650"
      - gridcell "Done"
      - gridcell "100%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$183,850 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$183,850"
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