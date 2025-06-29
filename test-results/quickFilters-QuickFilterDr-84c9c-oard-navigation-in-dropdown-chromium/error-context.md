# Test info

- Name: QuickFilterDropdown >> should handle keyboard navigation in dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.spec.ts:226:3

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
- paragraph: "49"
- img
- paragraph: Total Budget
- paragraph: $160,750
- img
- paragraph: Progress
- paragraph: 53.8%
- img
- paragraph: Budget Remaining
- paragraph: $78,819
- text: 1 to 25 of 50. Page 1 of 2
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
    - row "61 [DATA-1061] Create troubleshooting guide (Sprint 24) 📝 Documentation Critical Emily Jackson Emily Jackson 6/27/2025 $1,225 In Progress 52%":
      - gridcell "61"
      - gridcell "[DATA-1061] Create troubleshooting guide (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/27/2025"
      - gridcell "$1,225"
      - gridcell "In Progress"
      - gridcell "52%"
    - row "635 [APP-1635] Debug performance regression in search (Security Audit) 🐛 Bug Critical David Lee David Lee 6/27/2025 $6,275 Blocked 19%":
      - gridcell "635"
      - gridcell "[APP-1635] Debug performance regression in search (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/27/2025"
      - gridcell "$6,275"
      - gridcell "Blocked"
      - gridcell "19%"
    - row "723 [BACKEND-1723] Implement session management (Sprint 24) 🔒 Security Critical Sophia Taylor Sophia Taylor 6/27/2025 $3,250 In Progress 55%":
      - gridcell "723"
      - gridcell "[BACKEND-1723] Implement session management (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/27/2025"
      - gridcell "$3,250"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "412 [UI-1412] Optimize memory usage (Sprint 25) ⚡ Performance Critical Emma Davis Emma Davis 6/25/2025 $4,625 In Progress 28%":
      - gridcell "412"
      - gridcell "[UI-1412] Optimize memory usage (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "6/25/2025"
      - gridcell "$4,625"
      - gridcell "In Progress"
      - gridcell "28%"
    - row "510 [PROJ-1510] Create batch operations feature (Sprint 26) ✨ Feature Critical Olivia Brown Olivia Brown 6/26/2025 $8,825 Blocked 32%":
      - gridcell "510"
      - gridcell "[PROJ-1510] Create batch operations feature (Sprint 26)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "6/26/2025"
      - gridcell "$8,825"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "453 [API-1453] Set up penetration testing (Sprint 26) 🔒 Security Critical Chris Martinez Chris Martinez 6/24/2025 $9,675 Blocked 31%":
      - gridcell "453"
      - gridcell "[API-1453] Set up penetration testing (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "6/24/2025"
      - gridcell "$9,675"
      - gridcell "Blocked"
      - gridcell "31%"
    - row "564 [BACKEND-1564] Resolve CORS issue with external API (Q1 Goals) 🐛 Bug Medium Emily Jackson Emily Jackson 6/27/2025 $4,000 In Progress 20%":
      - gridcell "564"
      - gridcell "[BACKEND-1564] Resolve CORS issue with external API (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "6/27/2025"
      - gridcell "$4,000"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "674 [DASH-1674] Configure firewall rules (Sprint 25) 🔒 Security Critical James Wilson James Wilson 6/24/2025 $1,325 Blocked 35%":
      - gridcell "674"
      - gridcell "[DASH-1674] Configure firewall rules (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/24/2025"
      - gridcell "$1,325"
      - gridcell "Blocked"
      - gridcell "35%"
    - row "539 [API-1539] Implement secure file upload (Sprint 25) 🔒 Security High James Wilson James Wilson 6/25/2025 $1,550 Blocked 33%":
      - gridcell "539"
      - gridcell "[API-1539] Implement secure file upload (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "6/25/2025"
      - gridcell "$1,550"
      - gridcell "Blocked"
      - gridcell "33%"
    - row "834 [PROJ-1834] Fix login form validation error (Tech Debt) 🐛 Bug Critical Sophia Taylor Sophia Taylor 6/23/2025 $1,450 Blocked 18%":
      - gridcell "834"
      - gridcell "[PROJ-1834] Fix login form validation error (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "6/23/2025"
      - gridcell "$1,450"
      - gridcell "Blocked"
      - gridcell "18%"
    - row "36 [INFRA-1036] Add CDN for static assets (Sprint 23) ⚡ Performance High Alex Chen Alex Chen 6/24/2025 $350 Blocked 29%":
      - gridcell "36"
      - gridcell "[INFRA-1036] Add CDN for static assets (Sprint 23)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/24/2025"
      - gridcell "$350"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "40 [WEB-1040] Update API documentation (Sprint 25) 📝 Documentation Critical Alex Chen Alex Chen 6/24/2025 $925 Done 100%":
      - gridcell "40"
      - gridcell "[WEB-1040] Update API documentation (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/24/2025"
      - gridcell "$925"
      - gridcell "Done"
      - gridcell "100%"
    - row "90 [DATA-1090] Write deployment guide (Sprint 23) 📝 Documentation Critical Alex Chen Alex Chen 6/24/2025 $2,925 Blocked 35%":
      - gridcell "90"
      - gridcell "[DATA-1090] Write deployment guide (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "6/24/2025"
      - gridcell "$2,925"
      - gridcell "Blocked"
      - gridcell "35%"
    - row "918 [FRONTEND-1918] Write component snapshot tests (Q2 Planning) 🧪 Testing Critical Kevin Zhang Kevin Zhang 6/24/2025 $775 Done 100%":
      - gridcell "918"
      - gridcell "[FRONTEND-1918] Write component snapshot tests (Q2 Planning)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "6/24/2025"
      - gridcell "$775"
      - gridcell "Done"
      - gridcell "100%"
    - row "398 [FRONTEND-1398] Create architecture overview (Security Audit) 📝 Documentation High David Lee David Lee 6/27/2025 $7,200 Blocked 26%":
      - gridcell "398"
      - gridcell "[FRONTEND-1398] Create architecture overview (Security Audit)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "6/27/2025"
      - gridcell "$7,200"
      - gridcell "Blocked"
      - gridcell "26%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$160,750 54%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$160,750"
      - gridcell
      - gridcell "54%"
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