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
- paragraph: $4,085,800
- img
- paragraph: Progress
- paragraph: 46.6%
- img
- paragraph: Budget Remaining
- paragraph: $2,249,451
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
    - row "518 [USER-1518] Add SQL injection prevention (Sprint 24) 🔒 Security High Maya Patel Maya Patel 8/18/2025 $17,875 Backlog 0%":
      - gridcell "518"
      - gridcell "[USER-1518] Add SQL injection prevention (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/18/2025"
      - gridcell "$17,875"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "374 [APP-1374] Implement secrets management 🔧 DevOps Low David Lee David Lee 8/30/2025 $450 Testing 93%":
      - gridcell "374"
      - gridcell "[APP-1374] Implement secrets management"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/30/2025"
      - gridcell "$450"
      - gridcell "Testing"
      - gridcell "93%"
    - row "162 [API-1162] Add CDN for static assets (Sprint 25) ⚡ Performance Medium Ryan Thomas Ryan Thomas 8/26/2025 $5,600 In Review 75%":
      - gridcell "162"
      - gridcell "[API-1162] Add CDN for static assets (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/26/2025"
      - gridcell "$5,600"
      - gridcell "In Review"
      - gridcell "75%"
    - row "56 [BACKEND-1056] Implement caching strategy ⚡ Performance Medium David Lee David Lee 8/19/2025 $300 In Review 65%":
      - gridcell "56"
      - gridcell "[BACKEND-1056] Implement caching strategy"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/19/2025"
      - gridcell "$300"
      - gridcell "In Review"
      - gridcell "65%"
    - row "94 [WEB-1094] Simplify complex conditionals ♻️ Refactor Critical Amanda White Amanda White 8/12/2025 $100 In Progress 41%":
      - gridcell "94"
      - gridcell "[WEB-1094] Simplify complex conditionals"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/12/2025"
      - gridcell "$100"
      - gridcell "In Progress"
      - gridcell "41%"
    - row "813 [WEB-1813] Set up penetration testing (Q1 Goals) 🔒 Security Low Michael Anderson Michael Anderson 8/24/2025 $550 In Progress 35%":
      - gridcell "813"
      - gridcell "[WEB-1813] Set up penetration testing (Q1 Goals)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/24/2025"
      - gridcell "$550"
      - gridcell "In Progress"
      - gridcell "35%"
    - row "831 [API-1831] Extract business logic layer (Performance Sprint) ♻️ Refactor Medium Alex Chen Alex Chen 8/18/2025 $9,950 Backlog 0%":
      - gridcell "831"
      - gridcell "[API-1831] Extract business logic layer (Performance Sprint)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/18/2025"
      - gridcell "$9,950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "941 [USER-1941] Migrate to TypeScript strict mode (Security Audit) ♻️ Refactor High Isabella Garcia Isabella Garcia 8/19/2025 $9,000 Backlog 0%":
      - gridcell "941"
      - gridcell "[USER-1941] Migrate to TypeScript strict mode (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/19/2025"
      - gridcell "$9,000"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "865 [DASH-1865] Debug crash on mobile Safari (Q2 Planning) 🐛 Bug High Kevin Zhang Kevin Zhang 8/13/2025 $9,425 In Review 78%":
      - gridcell "865"
      - gridcell "[DASH-1865] Debug crash on mobile Safari (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/13/2025"
      - gridcell "$9,425"
      - gridcell "In Review"
      - gridcell "78%"
    - row "467 [UI-1467] Consolidate duplicate code ♻️ Refactor Critical Sophia Taylor Sophia Taylor 8/10/2025 $6,400 In Progress 21%":
      - gridcell "467"
      - gridcell "[UI-1467] Consolidate duplicate code"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/10/2025"
      - gridcell "$6,400"
      - gridcell "In Progress"
      - gridcell "21%"
    - row "658 [WEB-1658] Extract shared utilities module ♻️ Refactor Medium Sophia Taylor Sophia Taylor 8/23/2025 $3,875 In Progress 24%":
      - gridcell "658"
      - gridcell "[WEB-1658] Extract shared utilities module"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/23/2025"
      - gridcell "$3,875"
      - gridcell "In Progress"
      - gridcell "24%"
    - row "939 [CORE-1939] Add database indexing ⚡ Performance Critical Emily Jackson Emily Jackson 8/8/2025 $16,425 In Progress 32%":
      - gridcell "939"
      - gridcell "[CORE-1939] Add database indexing"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/8/2025"
      - gridcell "$16,425"
      - gridcell "In Progress"
      - gridcell "32%"
    - row "459 [MOBILE-1459] Set up monitoring alerts (Security Audit) 🔧 DevOps Medium Marcus Williams Marcus Williams 8/25/2025 $11,100 Backlog 0%":
      - gridcell "459"
      - gridcell "[MOBILE-1459] Set up monitoring alerts (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/25/2025"
      - gridcell "$11,100"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "291 [DATA-1291] Create troubleshooting guide 📝 Documentation Low Olivia Brown Olivia Brown 8/23/2025 $4,950 Backlog 0%":
      - gridcell "291"
      - gridcell "[DATA-1291] Create troubleshooting guide"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/23/2025"
      - gridcell "$4,950"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "995 [API-1995] Implement session management (Performance Sprint) 🔒 Security High Sophia Taylor Sophia Taylor 8/5/2025 $3,900 In Progress 39%":
      - gridcell "995"
      - gridcell "[API-1995] Implement session management (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/5/2025"
      - gridcell "$3,900"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "51 [USER-1051] Create onboarding tutorial 📝 Documentation Low Kevin Zhang Kevin Zhang 9/13/2025 $9,225 Backlog 0%":
      - gridcell "51"
      - gridcell "[USER-1051] Create onboarding tutorial"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "9/13/2025"
      - gridcell "$9,225"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,085,800 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,085,800"
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