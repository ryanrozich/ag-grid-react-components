# Test info

- Name: Relative Date Range Bug >> to field value disappears in relative date range filter
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relative-date-range-bug.spec.ts:23:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-filter').first()
Expected: visible
Received: hidden
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-filter').first()
    9 × locator resolved to <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div>
      - unexpected value "hidden"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relative-date-range-bug.spec.ts:38:31
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
- paragraph: $4,071,850
- img
- paragraph: Progress
- paragraph: 45.3%
- img
- paragraph: Budget Remaining
- paragraph: $2,168,494
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
    - row "37 [USER-1037] Implement dark mode toggle (Q1 Goals) ✨ Feature Medium Kevin Zhang Kevin Zhang 8/31/2025 $7,700 In Review 68%":
      - gridcell "37"
      - gridcell "[USER-1037] Implement dark mode toggle (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/31/2025"
      - gridcell "$7,700"
      - gridcell "In Review"
      - gridcell "68%"
    - row "895 [BACKEND-1895] Create deployment rollback (Sprint 27) 🔧 DevOps High John Robinson John Robinson 8/23/2025 $1,075 Backlog 0%":
      - gridcell "895"
      - gridcell "[BACKEND-1895] Create deployment rollback (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/23/2025"
      - gridcell "$1,075"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "992 [CORE-1992] Write API contract tests (Sprint 27) 🧪 Testing Low Maya Patel Maya Patel 9/24/2025 $200 Todo 16%":
      - gridcell "992"
      - gridcell "[CORE-1992] Write API contract tests (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/24/2025"
      - gridcell "$200"
      - gridcell "Todo"
      - gridcell "16%"
    - row "462 [FRONTEND-1462] Create advanced search filters (Tech Debt) ✨ Feature Critical David Lee David Lee 8/17/2025 $575 In Progress 27%":
      - gridcell "462"
      - gridcell "[FRONTEND-1462] Create advanced search filters (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/17/2025"
      - gridcell "$575"
      - gridcell "In Progress"
      - gridcell "27%"
    - row "117 [AUTH-1117] Debug WebSocket connection timeout (Q1 Goals) 🐛 Bug Critical Isabella Garcia Isabella Garcia 8/14/2025 $5,600 In Progress 57%":
      - gridcell "117"
      - gridcell "[AUTH-1117] Debug WebSocket connection timeout (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/14/2025"
      - gridcell "$5,600"
      - gridcell "In Progress"
      - gridcell "57%"
    - row "506 [INFRA-1506] Configure load balancer (Performance Sprint) 🔧 DevOps Critical Jessica Lopez Jessica Lopez 8/14/2025 $3,475 Testing 85%":
      - gridcell "506"
      - gridcell "[INFRA-1506] Configure load balancer (Performance Sprint)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/14/2025"
      - gridcell "$3,475"
      - gridcell "Testing"
      - gridcell "85%"
    - row "334 [USER-1334] Configure Docker containers (Sprint 27) 🔧 DevOps Low Sarah Johnson Sarah Johnson 9/8/2025 $875 In Progress 20%":
      - gridcell "334"
      - gridcell "[USER-1334] Configure Docker containers (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/8/2025"
      - gridcell "$875"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "471 [API-1471] Document component props 📝 Documentation High Alex Chen Alex Chen 8/16/2025 $4,875 In Progress 48%":
      - gridcell "471"
      - gridcell "[API-1471] Document component props"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/16/2025"
      - gridcell "$4,875"
      - gridcell "In Progress"
      - gridcell "48%"
    - row "1 [WEB-1001] Refactor error handling ♻️ Refactor Medium Sarah Johnson Sarah Johnson 8/25/2025 $7,600 In Review 61%":
      - gridcell "1"
      - gridcell "[WEB-1001] Refactor error handling"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/25/2025"
      - gridcell "$7,600"
      - gridcell "In Review"
      - gridcell "61%"
    - row "390 [WEB-1390] Add audit logging (Sprint 27) 🔒 Security Critical Emma Davis Emma Davis 8/9/2025 $275 In Progress 55%":
      - gridcell "390"
      - gridcell "[WEB-1390] Add audit logging (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/9/2025"
      - gridcell "$275"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "622 [UI-1622] Set up monitoring alerts (Security Audit) 🔧 DevOps Low Amanda White Amanda White 9/5/2025 $6,900 Testing 92%":
      - gridcell "622"
      - gridcell "[UI-1622] Set up monitoring alerts (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/5/2025"
      - gridcell "$6,900"
      - gridcell "Testing"
      - gridcell "92%"
    - row "773 [UI-1773] Configure security headers 🔒 Security High Kevin Zhang Kevin Zhang 8/10/2025 $750 Todo 9%":
      - gridcell "773"
      - gridcell "[UI-1773] Configure security headers"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/10/2025"
      - gridcell "$750"
      - gridcell "Todo"
      - gridcell "9%"
    - row "993 [ADMIN-1993] Write component snapshot tests 🧪 Testing Low Sarah Johnson Sarah Johnson 9/1/2025 $2,400 In Review 65%":
      - gridcell "993"
      - gridcell "[ADMIN-1993] Write component snapshot tests"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/1/2025"
      - gridcell "$2,400"
      - gridcell "In Review"
      - gridcell "65%"
    - row "753 [APP-1753] Implement auto-scaling 🔧 DevOps Low Daniel Kim Daniel Kim 9/14/2025 $675 Backlog 0%":
      - gridcell "753"
      - gridcell "[APP-1753] Implement auto-scaling"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "9/14/2025"
      - gridcell "$675"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "783 [ADMIN-1783] Extract shared utilities module (Performance Sprint) ♻️ Refactor High Alex Chen Alex Chen 8/10/2025 $1,750 In Progress 30%":
      - gridcell "783"
      - gridcell "[ADMIN-1783] Extract shared utilities module (Performance Sprint)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/10/2025"
      - gridcell "$1,750"
      - gridcell "In Progress"
      - gridcell "30%"
    - row "977 [BACKEND-1977] Add drag-and-drop file upload ✨ Feature Low Emma Davis Emma Davis 8/20/2025 $16,000 In Review 67%":
      - gridcell "977"
      - gridcell "[BACKEND-1977] Add drag-and-drop file upload"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/20/2025"
      - gridcell "$16,000"
      - gridcell "In Review"
      - gridcell "67%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,071,850 45%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,071,850"
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
   23 |   test("to field value disappears in relative date range filter", async ({
   24 |     page,
   25 |   }) => {
   26 |     // Find the date column header
   27 |     const dateHeader = page
   28 |       .locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper')
   29 |       .first();
   30 |
   31 |     // Open the filter menu
   32 |     await dateHeader.hover();
   33 |     await dateHeader.locator(".ag-header-cell-menu-button").click();
   34 |     await page.waitForTimeout(500);
   35 |
   36 |     // Get the filter panel
   37 |     const filterPanel = page.locator(".ag-filter").first();
>  38 |     await expect(filterPanel).toBeVisible();
      |                               ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   39 |
   40 |     // Switch to Relative mode
   41 |     const relativeButton = filterPanel.locator('button:has-text("Relative")');
   42 |     await relativeButton.click();
   43 |     await page.waitForTimeout(200);
   44 |
   45 |     // Select "In Range" filter type
   46 |     const filterTypeDropdown = filterPanel.locator("select").first();
   47 |     await filterTypeDropdown.selectOption({ label: "In Range" });
   48 |     await page.waitForTimeout(200);
   49 |
   50 |     // Find the from and to inputs
   51 |     const fromInput = filterPanel
   52 |       .locator('input[placeholder*="Today"]')
   53 |       .first();
   54 |     const toInput = filterPanel
   55 |       .locator('input[placeholder*="Today+30d"]')
   56 |       .first();
   57 |
   58 |     // Verify both inputs are visible
   59 |     await expect(fromInput).toBeVisible();
   60 |     await expect(toInput).toBeVisible();
   61 |
   62 |     // Type in the from field first (this should work)
   63 |     await fromInput.fill("Today");
   64 |     await page.waitForTimeout(200);
   65 |     await expect(fromInput).toHaveValue("Today");
   66 |
   67 |     // Now type in the to field - THIS IS WHERE THE BUG OCCURS
   68 |     await toInput.fill("Today+7d");
   69 |     await page.waitForTimeout(200);
   70 |
   71 |     // BUG: The value should remain but it disappears
   72 |     // This assertion will fail, documenting the bug
   73 |     await expect(toInput).toHaveValue("Today+7d");
   74 |
   75 |     // Also test with autocomplete selection
   76 |     await toInput.clear();
   77 |     await toInput.click();
   78 |     await toInput.type("Today");
   79 |
   80 |     // Wait for suggestions to appear
   81 |     await page.waitForSelector('[role="listbox"]', { timeout: 2000 });
   82 |
   83 |     // Click on a suggestion
   84 |     const suggestion = page.locator('[role="option"]').first();
   85 |     await suggestion.click();
   86 |     await page.waitForTimeout(200);
   87 |
   88 |     // BUG: The selected value should remain but it disappears
   89 |     await expect(toInput).not.toHaveValue("");
   90 |   });
   91 |
   92 |   test("documents current behavior - to field clears immediately", async ({
   93 |     page,
   94 |   }) => {
   95 |     // This test documents the actual buggy behavior
   96 |
   97 |     // Open date filter and switch to relative in range
   98 |     const dateHeader = page
   99 |       .locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper')
  100 |       .first();
  101 |     await dateHeader.hover();
  102 |     await dateHeader.locator(".ag-header-cell-menu-button").click();
  103 |     await page.waitForTimeout(500);
  104 |
  105 |     const filterPanel = page.locator(".ag-filter").first();
  106 |     await filterPanel.locator('button:has-text("Relative")').click();
  107 |     await filterPanel
  108 |       .locator("select")
  109 |       .first()
  110 |       .selectOption({ label: "In Range" });
  111 |
  112 |     const toInput = filterPanel
  113 |       .locator('input[placeholder*="Today+30d"]')
  114 |       .first();
  115 |
  116 |     // Type a value
  117 |     await toInput.fill("Today+14d");
  118 |
  119 |     // Give it a moment to process
  120 |     await page.waitForTimeout(500);
  121 |
  122 |     // Document that the field is empty (the bug)
  123 |     const actualValue = await toInput.inputValue();
  124 |     console.log("To field value after typing:", actualValue);
  125 |
  126 |     // This will pass, documenting the buggy behavior
  127 |     await expect(toInput).toHaveValue("");
  128 |   });
  129 | });
  130 |
```