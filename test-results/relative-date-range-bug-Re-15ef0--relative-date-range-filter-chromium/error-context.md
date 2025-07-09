# Test info

- Name: Relative Date Range Bug >> to field value disappears in relative date range filter
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/relative-date-range-bug.spec.ts:23:3

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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/relative-date-range-bug.spec.ts:38:31
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
  - button "Show version details": v0.2.0-rc1+20 release/v0.2.0-rc1
  - link "NPM":
    - /url: https://www.npmjs.com/package/ag-grid-react-components
    - img
    - text: NPM
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
  - button "Filter PresetsNEW"
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: Task type
  - img
- button "My Views":
  - img
  - text: My Views
  - img
- button "Filter view options":
  - img
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $40,901,900
- img
- paragraph: Average Progress
- paragraph: 45.9%
- img
- paragraph: Budget Remaining
- paragraph: $22,161,252
- text: Press ENTER to sort. Press ALT DOWN to open column menu. Press CTRL ENTER to open filter
- grid:
  - rowgroup:
    - row "ID":
      - columnheader "ID"
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value":
      - columnheader "Column with Header Selection":
        - checkbox "Column with Header Selection"
      - columnheader "Task"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "% Delivered"
      - columnheader "Value"
  - rowgroup:
    - row "USER-1195":
      - gridcell "USER-1195"
    - row "USER-4126":
      - gridcell "USER-4126"
    - row "WEB-4150":
      - gridcell "WEB-4150"
    - row "WEB-6034":
      - gridcell "WEB-6034"
    - row "CORE-6412":
      - gridcell "CORE-6412"
    - row "DASH-10850":
      - gridcell "DASH-10850"
    - row "DATA-4413":
      - gridcell "DATA-4413"
    - row "MOBILE-7824":
      - gridcell "MOBILE-7824"
    - row "WEB-5956":
      - gridcell "WEB-5956"
    - row "PROJ-6158":
      - gridcell "PROJ-6158"
    - row "AUTH-7674":
      - gridcell "AUTH-7674"
    - row "PROJ-7977":
      - gridcell "PROJ-7977"
    - row "PROJ-8781":
      - gridcell "PROJ-8781"
    - row "DATA-1161":
      - gridcell "DATA-1161"
    - row "INFRA-1388":
      - gridcell "INFRA-1388"
    - row "WEB-7760":
      - gridcell "WEB-7760"
    - row "INFRA-8646":
      - gridcell "INFRA-8646"
    - row "WEB-10922":
      - gridcell "WEB-10922"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Build custom report generator (Performance Sprint) In Review High ✨ Feature DK Daniel Kim 9/2/2025 70% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Build custom report generator (Performance Sprint)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "DK Daniel Kim"
      - gridcell "9/2/2025"
      - gridcell "70%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Implement session management (Q1 Goals) Backlog Critical 🔒 Security Priya Sharma Priya Sharma 8/27/2025 0% $175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement session management (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/27/2025"
      - gridcell "0%"
      - gridcell "$175"
    - row "Press Space to toggle row selection (unchecked) Extract business logic layer (Sprint 27) Todo Medium ♻️ Refactor Ryan Thomas Ryan Thomas 9/7/2025 14% $2,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Extract business logic layer (Sprint 27)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/7/2025"
      - gridcell "14%"
      - gridcell "$2,725"
    - row "Press Space to toggle row selection (unchecked) Create load testing scenarios Todo Low 🧪 Testing Marcus Williams Marcus Williams 9/24/2025 13% $6,475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create load testing scenarios"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/24/2025"
      - gridcell "13%"
      - gridcell "$6,475"
    - row "Press Space to toggle row selection (unchecked) Write unit tests for auth module In Review Medium 🧪 Testing Alex Chen Alex Chen 9/13/2025 65% $6,175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write unit tests for auth module"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/13/2025"
      - gridcell "65%"
      - gridcell "$6,175"
    - row "Press Space to toggle row selection (unchecked) Update to React 18 patterns (Tech Debt) In Progress Medium ♻️ Refactor EJ Emily Jackson 9/5/2025 25% $6,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Update to React 18 patterns (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "EJ Emily Jackson"
      - gridcell "9/5/2025"
      - gridcell "25%"
      - gridcell "$6,725"
    - row "Press Space to toggle row selection (unchecked) Fix responsive layout on tablets Backlog Medium 🐛 Bug Olivia Brown Olivia Brown 8/31/2025 0% $500":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix responsive layout on tablets"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/31/2025"
      - gridcell "0%"
      - gridcell "$500"
    - row "Press Space to toggle row selection (unchecked) Optimize database queries (Q1 Goals) Testing Low ♻️ Refactor Ryan Thomas Ryan Thomas 10/6/2025 89% $8,100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Optimize database queries (Q1 Goals)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "10/6/2025"
      - gridcell "89%"
      - gridcell "$8,100"
    - row "Press Space to toggle row selection (unchecked) Configure CDN distribution Testing High 🔧 DevOps Sarah Johnson Sarah Johnson 8/28/2025 83% $15,275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure CDN distribution"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/28/2025"
      - gridcell "83%"
      - gridcell "$15,275"
    - row "Press Space to toggle row selection (unchecked) Create load testing scenarios Backlog High 🧪 Testing Sophia Taylor Sophia Taylor 8/30/2025 0% $650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create load testing scenarios"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$650"
    - row "Press Space to toggle row selection (unchecked) Add progressive web app features (Sprint 26) In Review Critical ⚡ Performance JL Jessica Lopez 8/27/2025 79% $7,350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add progressive web app features (Sprint 26)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "JL Jessica Lopez"
      - gridcell "8/27/2025"
      - gridcell "79%"
      - gridcell "$7,350"
    - row "Press Space to toggle row selection (unchecked) Fix broken deep links in navigation (Sprint 23) Backlog Critical 🐛 Bug JR John Robinson 8/24/2025 0% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken deep links in navigation (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "JR John Robinson"
      - gridcell "8/24/2025"
      - gridcell "0%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Fix infinite scroll pagination bug (Sprint 26) In Progress Medium 🐛 Bug Ryan Thomas Ryan Thomas 9/3/2025 45% $400":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix infinite scroll pagination bug (Sprint 26)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/3/2025"
      - gridcell "45%"
      - gridcell "$400"
    - row "Press Space to toggle row selection (unchecked) Write unit tests for auth module (Sprint 23) In Review Low 🧪 Testing Maya Patel Maya Patel 9/17/2025 60% $4,850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write unit tests for auth module (Sprint 23)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/17/2025"
      - gridcell "60%"
      - gridcell "$4,850"
    - row "Press Space to toggle row selection (unchecked) Add database indexing (Q2 Planning) In Review Medium ⚡ Performance Sophia Taylor Sophia Taylor 9/5/2025 75% $6,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add database indexing (Q2 Planning)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/5/2025"
      - gridcell "75%"
      - gridcell "$6,900"
    - row "Press Space to toggle row selection (unchecked) Implement secrets management (Sprint 23) Backlog Medium 🔧 DevOps Sarah Johnson Sarah Johnson 8/30/2025 0% $400":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement secrets management (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$400"
    - row "Press Space to toggle row selection (unchecked) Set up staging environment Todo High 🔧 DevOps Olivia Brown Olivia Brown 8/30/2025 12% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up staging environment"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/30/2025"
      - gridcell "12%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Document security protocols (Sprint 27) Testing Critical 📝 Documentation Priya Sharma Priya Sharma 8/24/2025 88% $750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document security protocols (Sprint 27)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "📝 Documentation"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/24/2025"
      - gridcell "88%"
      - gridcell "$750"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,901,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,901,900"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
- menu:
  - menuitem "Sort Ascending"
  - menuitem "Sort Descending"
  - menuitem "Pin Column"
  - menuitem "Autosize This Column"
  - menuitem "Autosize All Columns"
  - menuitem "Choose Columns"
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