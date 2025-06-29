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
  - text: All Tasks
  - img
- text: "Due Date: Today-7d to Today"
- button "Remove Due Date filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "47"
- img
- paragraph: Total Budget
- paragraph: $185,175
- img
- paragraph: Progress
- paragraph: 47.2%
- img
- paragraph: Budget Remaining
- paragraph: $106,012
- text: 1 to 25 of 48. Page 1 of 2
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
    - row "937 [PROJ-1937] Add keyboard shortcuts (Performance Sprint) ✨ Feature Critical Isabella Garcia Isabella Garcia 6/27/2025 $925 Blocked 27%":
      - gridcell "937"
      - gridcell "[PROJ-1937] Add keyboard shortcuts (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "6/27/2025"
      - gridcell "$925"
      - gridcell "Blocked"
      - gridcell "27%"
    - row "938 [AUTH-1938] Test mobile responsiveness 🧪 Testing Critical Sophia Taylor Sophia Taylor 6/27/2025 $5,325 Blocked 29%":
      - gridcell "938"
      - gridcell "[AUTH-1938] Test mobile responsiveness"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/27/2025"
      - gridcell "$5,325"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "232 [MOBILE-1232] Create deployment rollback (Security Audit) 🔧 DevOps Critical Alex Chen Alex Chen 6/25/2025 $100 Blocked 28%":
      - gridcell "232"
      - gridcell "[MOBILE-1232] Create deployment rollback (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/25/2025"
      - gridcell "$100"
      - gridcell "Blocked"
      - gridcell "28%"
    - row "235 [ADMIN-1235] Configure CDN distribution (Security Audit) 🔧 DevOps Critical Jessica Lopez Jessica Lopez 6/26/2025 $2,475 Blocked 36%":
      - gridcell "235"
      - gridcell "[ADMIN-1235] Configure CDN distribution (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "6/26/2025"
      - gridcell "$2,475"
      - gridcell "Blocked"
      - gridcell "36%"
    - row "485 [UI-1485] Modernize legacy jQuery code (Sprint 23) ♻️ Refactor Critical David Lee David Lee 6/24/2025 $750 In Progress 36%":
      - gridcell "485"
      - gridcell "[UI-1485] Modernize legacy jQuery code (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/24/2025"
      - gridcell "$750"
      - gridcell "In Progress"
      - gridcell "36%"
    - row "517 [CORE-1517] Fix login form validation error 🐛 Bug Critical Sarah Johnson Sarah Johnson 6/24/2025 $2,300 Done 100%":
      - gridcell "517"
      - gridcell "[CORE-1517] Fix login form validation error"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/24/2025"
      - gridcell "$2,300"
      - gridcell "Done"
      - gridcell "100%"
    - row "211 [DATA-1211] Implement social media sharing ✨ Feature High Chris Martinez Chris Martinez 6/25/2025 $19,775 Blocked 23%":
      - gridcell "211"
      - gridcell "[DATA-1211] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/25/2025"
      - gridcell "$19,775"
      - gridcell "Blocked"
      - gridcell "23%"
    - row "316 [APP-1316] Add keyboard shortcuts ✨ Feature Critical Ryan Thomas Ryan Thomas 6/24/2025 $500 Blocked 16%":
      - gridcell "316"
      - gridcell "[APP-1316] Add keyboard shortcuts"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/24/2025"
      - gridcell "$500"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "630 [DASH-1630] Implement secrets management 🔧 DevOps Critical Amanda White Amanda White 6/24/2025 $1,375 Blocked 17%":
      - gridcell "630"
      - gridcell "[DASH-1630] Implement secrets management"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "6/24/2025"
      - gridcell "$1,375"
      - gridcell "Blocked"
      - gridcell "17%"
    - row "687 [DATA-1687] Write deployment guide (Q1 Goals) 📝 Documentation Critical Daniel Kim Daniel Kim 6/23/2025 $350 Testing 92%":
      - gridcell "687"
      - gridcell "[DATA-1687] Write deployment guide (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "6/23/2025"
      - gridcell "$350"
      - gridcell "Testing"
      - gridcell "92%"
    - row "876 [BACKEND-1876] Implement API key rotation (Q2 Planning) 🔒 Security Critical Sarah Johnson Sarah Johnson 6/22/2025 $5,625 In Progress 58%":
      - gridcell "876"
      - gridcell "[BACKEND-1876] Implement API key rotation (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "6/22/2025"
      - gridcell "$5,625"
      - gridcell "In Progress"
      - gridcell "58%"
    - row "884 [BACKEND-1884] Fix infinite scroll pagination bug 🐛 Bug High Olivia Brown Olivia Brown 6/24/2025 $3,350 Blocked 16%":
      - gridcell "884"
      - gridcell "[BACKEND-1884] Fix infinite scroll pagination bug"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/24/2025"
      - gridcell "$3,350"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "495 [MOBILE-1495] Update to React 18 patterns (Q1 Goals) ♻️ Refactor Critical Sophia Taylor Sophia Taylor 6/22/2025 $9,800 In Progress 20%":
      - gridcell "495"
      - gridcell "[MOBILE-1495] Update to React 18 patterns (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/22/2025"
      - gridcell "$9,800"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "557 [DATA-1557] Configure firewall rules (Sprint 24) 🔒 Security High Ryan Thomas Ryan Thomas 6/25/2025 $4,600 In Progress 23%":
      - gridcell "557"
      - gridcell "[DATA-1557] Configure firewall rules (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "6/25/2025"
      - gridcell "$4,600"
      - gridcell "In Progress"
      - gridcell "23%"
    - row "764 [WEB-1764] Configure firewall rules (Q2 Planning) 🔒 Security High Michael Anderson Michael Anderson 6/22/2025 $3,800 Done 100%":
      - gridcell "764"
      - gridcell "[WEB-1764] Configure firewall rules (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "6/22/2025"
      - gridcell "$3,800"
      - gridcell "Done"
      - gridcell "100%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$185,175 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$185,175"
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