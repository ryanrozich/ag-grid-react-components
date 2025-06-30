# Test info

- Name: Relative Date Range Bug >> documents current behavior - to field clears immediately
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relative-date-range-bug.spec.ts:84:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-filter').first().locator('button:has-text("Relative")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relative-date-range-bug.spec.ts:94:62
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
- paragraph: $4,150,300
- img
- paragraph: Progress
- paragraph: 45.7%
- img
- paragraph: Budget Remaining
- paragraph: $2,298,001
- text: Press ENTER to sort. Press ALT DOWN to open column menu. Press CTRL ENTER to open filter
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
    - row "514 [MOBILE-1514] Write API contract tests (Q1 Goals) 🧪 Testing Critical Kevin Zhang Kevin Zhang 8/19/2025 $600 In Review 71%":
      - gridcell "514"
      - gridcell "[MOBILE-1514] Write API contract tests (Q1 Goals)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/19/2025"
      - gridcell "$600"
      - gridcell "In Review"
      - gridcell "71%"
    - row "605 [BACKEND-1605] Write component snapshot tests (Sprint 27) 🧪 Testing Medium David Lee David Lee 8/29/2025 $4,025 Todo 10%":
      - gridcell "605"
      - gridcell "[BACKEND-1605] Write component snapshot tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/29/2025"
      - gridcell "$4,025"
      - gridcell "Todo"
      - gridcell "10%"
    - row "220 [USER-1220] Implement CSRF protection 🔒 Security High Marcus Williams Marcus Williams 8/15/2025 $750 Backlog 0%":
      - gridcell "220"
      - gridcell "[USER-1220] Implement CSRF protection"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/15/2025"
      - gridcell "$750"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "393 [APP-1393] Implement lazy loading ⚡ Performance Critical Emma Davis Emma Davis 8/13/2025 $1,100 In Review 67%":
      - gridcell "393"
      - gridcell "[APP-1393] Implement lazy loading"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/13/2025"
      - gridcell "$1,100"
      - gridcell "In Review"
      - gridcell "67%"
    - row "597 [ADMIN-1597] Update API documentation (Q1 Goals) 📝 Documentation High Sophia Taylor Sophia Taylor 8/13/2025 $250 In Progress 48%":
      - gridcell "597"
      - gridcell "[ADMIN-1597] Update API documentation (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/13/2025"
      - gridcell "$250"
      - gridcell "In Progress"
      - gridcell "48%"
    - row "633 [DATA-1633] Update to ES6 modules ♻️ Refactor Medium David Lee David Lee 8/28/2025 $150 Testing 86%":
      - gridcell "633"
      - gridcell "[DATA-1633] Update to ES6 modules"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/28/2025"
      - gridcell "$150"
      - gridcell "Testing"
      - gridcell "86%"
    - row "430 [DATA-1430] Refactor state management (Sprint 23) ♻️ Refactor Critical Sarah Johnson Sarah Johnson 8/10/2025 $400 Testing 93%":
      - gridcell "430"
      - gridcell "[DATA-1430] Refactor state management (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/10/2025"
      - gridcell "$400"
      - gridcell "Testing"
      - gridcell "93%"
    - row "179 [FRONTEND-1179] Optimize memory usage (Sprint 25) ⚡ Performance Critical Emily Jackson Emily Jackson 8/10/2025 $4,700 Todo 17%":
      - gridcell "179"
      - gridcell "[FRONTEND-1179] Optimize memory usage (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/10/2025"
      - gridcell "$4,700"
      - gridcell "Todo"
      - gridcell "17%"
    - row "569 [DATA-1569] Create load testing scenarios (Performance Sprint) 🧪 Testing High Isabella Garcia Isabella Garcia 8/11/2025 $4,150 Backlog 0%":
      - gridcell "569"
      - gridcell "[DATA-1569] Create load testing scenarios (Performance Sprint)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/11/2025"
      - gridcell "$4,150"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "62 [API-1062] Optimize render performance (Security Audit) ⚡ Performance High Amanda White Amanda White 8/13/2025 $525 Backlog 0%":
      - gridcell "62"
      - gridcell "[API-1062] Optimize render performance (Security Audit)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/13/2025"
      - gridcell "$525"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "490 [AUTH-1490] Add internationalization tests (Sprint 27) 🧪 Testing Low Marcus Williams Marcus Williams 9/11/2025 $16,350 Backlog 0%":
      - gridcell "490"
      - gridcell "[AUTH-1490] Add internationalization tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/11/2025"
      - gridcell "$16,350"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "438 [APP-1438] Configure load balancer (Tech Debt) 🔧 DevOps High Daniel Kim Daniel Kim 8/10/2025 $975 In Review 65%":
      - gridcell "438"
      - gridcell "[APP-1438] Configure load balancer (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/10/2025"
      - gridcell "$975"
      - gridcell "In Review"
      - gridcell "65%"
    - row "730 [PROJ-1730] Add keyboard shortcuts (Sprint 25) ✨ Feature Medium Michael Anderson Michael Anderson 8/14/2025 $575 Testing 87%":
      - gridcell "730"
      - gridcell "[PROJ-1730] Add keyboard shortcuts (Sprint 25)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/14/2025"
      - gridcell "$575"
      - gridcell "Testing"
      - gridcell "87%"
    - row "434 [ADMIN-1434] Implement lazy loading (Tech Debt) ⚡ Performance Medium Chris Martinez Chris Martinez 8/12/2025 $4,200 Backlog 0%":
      - gridcell "434"
      - gridcell "[ADMIN-1434] Implement lazy loading (Tech Debt)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/12/2025"
      - gridcell "$4,200"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "141 [USER-1141] Implement secure file upload (Sprint 25) 🔒 Security High James Wilson James Wilson 8/3/2025 $17,675 In Progress 40%":
      - gridcell "141"
      - gridcell "[USER-1141] Implement secure file upload (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/3/2025"
      - gridcell "$17,675"
      - gridcell "In Progress"
      - gridcell "40%"
    - row "229 [USER-1229] Configure Docker containers (Performance Sprint) 🔧 DevOps Critical Amanda White Amanda White 8/5/2025 $725 In Progress 37%":
      - gridcell "229"
      - gridcell "[USER-1229] Configure Docker containers (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/5/2025"
      - gridcell "$725"
      - gridcell "In Progress"
      - gridcell "37%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,150,300 46%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,150,300"
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
- menu:
  - menuitem " Sort Ascending"
  - menuitem " Sort Descending"
  - menuitem " Pin Column "
  - menuitem "Autosize This Column"
  - menuitem "Autosize All Columns"
  - menuitem " Choose Columns"
  - menuitem "Reset Columns"
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | /**
   4 |  * This test documents a bug where the "to" field in relative date range filters
   5 |  * disappears after selecting or typing a value.
   6 |  * 
   7 |  * Steps to reproduce:
   8 |  * 1. Open date filter
   9 |  * 2. Switch to "Relative" mode
   10 |  * 3. Select "In Range" filter type
   11 |  * 4. Type or select a value in the "to" field
   12 |  * 5. The value disappears immediately
   13 |  * 
   14 |  * GitHub Issue: TBD
   15 |  */
   16 | test.describe("Relative Date Range Bug", () => {
   17 |   test.beforeEach(async ({ page }) => {
   18 |     await page.goto("/demo");
   19 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
   20 |     await page.waitForTimeout(1000); // Give time for grid to fully render
   21 |   });
   22 |
   23 |   test("to field value disappears in relative date range filter", async ({ page }) => {
   24 |     // Find the date column header
   25 |     const dateHeader = page.locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper').first();
   26 |     
   27 |     // Open the filter menu
   28 |     await dateHeader.hover();
   29 |     await dateHeader.locator(".ag-header-cell-menu-button").click();
   30 |     await page.waitForTimeout(500);
   31 |     
   32 |     // Get the filter panel
   33 |     const filterPanel = page.locator(".ag-filter").first();
   34 |     await expect(filterPanel).toBeVisible();
   35 |     
   36 |     // Switch to Relative mode
   37 |     const relativeButton = filterPanel.locator('button:has-text("Relative")');
   38 |     await relativeButton.click();
   39 |     await page.waitForTimeout(200);
   40 |     
   41 |     // Select "In Range" filter type
   42 |     const filterTypeDropdown = filterPanel.locator('select').first();
   43 |     await filterTypeDropdown.selectOption({ label: "In Range" });
   44 |     await page.waitForTimeout(200);
   45 |     
   46 |     // Find the from and to inputs
   47 |     const fromInput = filterPanel.locator('input[placeholder*="Today"]').first();
   48 |     const toInput = filterPanel.locator('input[placeholder*="Today+30d"]').first();
   49 |     
   50 |     // Verify both inputs are visible
   51 |     await expect(fromInput).toBeVisible();
   52 |     await expect(toInput).toBeVisible();
   53 |     
   54 |     // Type in the from field first (this should work)
   55 |     await fromInput.fill("Today");
   56 |     await page.waitForTimeout(200);
   57 |     await expect(fromInput).toHaveValue("Today");
   58 |     
   59 |     // Now type in the to field - THIS IS WHERE THE BUG OCCURS
   60 |     await toInput.fill("Today+7d");
   61 |     await page.waitForTimeout(200);
   62 |     
   63 |     // BUG: The value should remain but it disappears
   64 |     // This assertion will fail, documenting the bug
   65 |     await expect(toInput).toHaveValue("Today+7d");
   66 |     
   67 |     // Also test with autocomplete selection
   68 |     await toInput.clear();
   69 |     await toInput.click();
   70 |     await toInput.type("Today");
   71 |     
   72 |     // Wait for suggestions to appear
   73 |     await page.waitForSelector('[role="listbox"]', { timeout: 2000 });
   74 |     
   75 |     // Click on a suggestion
   76 |     const suggestion = page.locator('[role="option"]').first();
   77 |     await suggestion.click();
   78 |     await page.waitForTimeout(200);
   79 |     
   80 |     // BUG: The selected value should remain but it disappears
   81 |     await expect(toInput).not.toHaveValue("");
   82 |   });
   83 |
   84 |   test("documents current behavior - to field clears immediately", async ({ page }) => {
   85 |     // This test documents the actual buggy behavior
   86 |     
   87 |     // Open date filter and switch to relative in range
   88 |     const dateHeader = page.locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper').first();
   89 |     await dateHeader.hover();
   90 |     await dateHeader.locator(".ag-header-cell-menu-button").click();
   91 |     await page.waitForTimeout(500);
   92 |     
   93 |     const filterPanel = page.locator(".ag-filter").first();
>  94 |     await filterPanel.locator('button:has-text("Relative")').click();
      |                                                              ^ Error: locator.click: Test timeout of 30000ms exceeded.
   95 |     await filterPanel.locator('select').first().selectOption({ label: "In Range" });
   96 |     
   97 |     const toInput = filterPanel.locator('input[placeholder*="Today+30d"]').first();
   98 |     
   99 |     // Type a value
  100 |     await toInput.fill("Today+14d");
  101 |     
  102 |     // Give it a moment to process
  103 |     await page.waitForTimeout(500);
  104 |     
  105 |     // Document that the field is empty (the bug)
  106 |     const actualValue = await toInput.inputValue();
  107 |     console.log("To field value after typing:", actualValue);
  108 |     
  109 |     // This will pass, documenting the buggy behavior
  110 |     await expect(toInput).toHaveValue("");
  111 |   });
  112 | });
```