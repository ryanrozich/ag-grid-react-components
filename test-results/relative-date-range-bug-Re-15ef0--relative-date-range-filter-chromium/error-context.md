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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relative-date-range-bug.spec.ts:34:31
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
- paragraph: $3,999,425
- img
- paragraph: Progress
- paragraph: 48.3%
- img
- paragraph: Budget Remaining
- paragraph: $2,004,877
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
    - row "976 [APP-1976] Add input sanitization (Performance Sprint) 🔒 Security Medium James Wilson James Wilson 8/19/2025 $16,125 In Progress 23%":
      - gridcell "976"
      - gridcell "[APP-1976] Add input sanitization (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/19/2025"
      - gridcell "$16,125"
      - gridcell "In Progress"
      - gridcell "23%"
    - row "885 [MOBILE-1885] Test offline functionality (Sprint 27) 🧪 Testing High Olivia Brown Olivia Brown 8/19/2025 $575 In Progress 53%":
      - gridcell "885"
      - gridcell "[MOBILE-1885] Test offline functionality (Sprint 27)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/19/2025"
      - gridcell "$575"
      - gridcell "In Progress"
      - gridcell "53%"
    - row "152 [INFRA-1152] Split monolithic components ♻️ Refactor High Sarah Johnson Sarah Johnson 8/16/2025 $550 Testing 94%":
      - gridcell "152"
      - gridcell "[INFRA-1152] Split monolithic components"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/16/2025"
      - gridcell "$550"
      - gridcell "Testing"
      - gridcell "94%"
    - row "642 [DATA-1642] Fix responsive layout on tablets 🐛 Bug Critical James Wilson James Wilson 8/12/2025 $6,175 In Review 75%":
      - gridcell "642"
      - gridcell "[DATA-1642] Fix responsive layout on tablets"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/12/2025"
      - gridcell "$6,175"
      - gridcell "In Review"
      - gridcell "75%"
    - row "949 [APP-1949] Create data visualization charts (Performance Sprint) ✨ Feature Low Amanda White Amanda White 8/31/2025 $5,825 In Progress 40%":
      - gridcell "949"
      - gridcell "[APP-1949] Create data visualization charts (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/31/2025"
      - gridcell "$5,825"
      - gridcell "In Progress"
      - gridcell "40%"
    - row "95 [DATA-1095] Debug crash on mobile Safari (Sprint 26) 🐛 Bug Medium Emma Davis Emma Davis 8/15/2025 $475 Todo 6%":
      - gridcell "95"
      - gridcell "[DATA-1095] Debug crash on mobile Safari (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/15/2025"
      - gridcell "$475"
      - gridcell "Todo"
      - gridcell "6%"
    - row "422 [BACKEND-1422] Simplify complex conditionals (Sprint 26) ♻️ Refactor Low Chris Martinez Chris Martinez 8/24/2025 $3,950 Testing 94%":
      - gridcell "422"
      - gridcell "[BACKEND-1422] Simplify complex conditionals (Sprint 26)"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/24/2025"
      - gridcell "$3,950"
      - gridcell "Testing"
      - gridcell "94%"
    - row "141 [FRONTEND-1141] Test offline functionality 🧪 Testing Critical David Lee David Lee 8/10/2025 $150 In Review 64%":
      - gridcell "141"
      - gridcell "[FRONTEND-1141] Test offline functionality"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/10/2025"
      - gridcell "$150"
      - gridcell "In Review"
      - gridcell "64%"
    - row "577 [AUTH-1577] Test error boundary behavior (Tech Debt) 🧪 Testing Low Priya Sharma Priya Sharma 9/8/2025 $3,975 Backlog 0%":
      - gridcell "577"
      - gridcell "[AUTH-1577] Test error boundary behavior (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/8/2025"
      - gridcell "$3,975"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "664 [PROJ-1664] Resolve CORS issue with external API (Q2 Planning) 🐛 Bug Low Emma Davis Emma Davis 8/20/2025 $625 In Review 68%":
      - gridcell "664"
      - gridcell "[PROJ-1664] Resolve CORS issue with external API (Q2 Planning)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/20/2025"
      - gridcell "$625"
      - gridcell "In Review"
      - gridcell "68%"
    - row "910 [WEB-1910] Add keyboard shortcuts ✨ Feature Medium Alex Chen Alex Chen 8/16/2025 $4,975 Testing 92%":
      - gridcell "910"
      - gridcell "[WEB-1910] Add keyboard shortcuts"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/16/2025"
      - gridcell "$4,975"
      - gridcell "Testing"
      - gridcell "92%"
    - row "137 [WEB-1137] Configure security headers 🔒 Security Low Michael Anderson Michael Anderson 8/16/2025 $625 Todo 16%":
      - gridcell "137"
      - gridcell "[WEB-1137] Configure security headers"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/16/2025"
      - gridcell "$625"
      - gridcell "Todo"
      - gridcell "16%"
    - row "206 [DATA-1206] Implement caching strategy (Q2 Planning) ⚡ Performance Critical Maya Patel Maya Patel 8/8/2025 $825 In Progress 50%":
      - gridcell "206"
      - gridcell "[DATA-1206] Implement caching strategy (Q2 Planning)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/8/2025"
      - gridcell "$825"
      - gridcell "In Progress"
      - gridcell "50%"
    - row "438 [CORE-1438] Fix date picker timezone issue (Tech Debt) 🐛 Bug Low Sarah Johnson Sarah Johnson 8/13/2025 $300 In Progress 47%":
      - gridcell "438"
      - gridcell "[CORE-1438] Fix date picker timezone issue (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/13/2025"
      - gridcell "$300"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "88 [UI-1088] Modernize legacy jQuery code (Sprint 24) ♻️ Refactor Critical David Lee David Lee 8/7/2025 $2,300 In Progress 37%":
      - gridcell "88"
      - gridcell "[UI-1088] Modernize legacy jQuery code (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/7/2025"
      - gridcell "$2,300"
      - gridcell "In Progress"
      - gridcell "37%"
    - row "533 [INFRA-1533] Implement OAuth integration (Q2 Planning) ✨ Feature High David Lee David Lee 8/11/2025 $8,150 In Progress 48%":
      - gridcell "533"
      - gridcell "[INFRA-1533] Implement OAuth integration (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/11/2025"
      - gridcell "$8,150"
      - gridcell "In Progress"
      - gridcell "48%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,999,425 48%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,999,425"
      - gridcell
      - gridcell "48%"
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
>  34 |     await expect(filterPanel).toBeVisible();
      |                               ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
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
   94 |     await filterPanel.locator('button:has-text("Relative")').click();
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