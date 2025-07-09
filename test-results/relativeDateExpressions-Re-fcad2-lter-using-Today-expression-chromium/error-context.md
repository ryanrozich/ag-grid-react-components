# Test info

- Name: Relative Date Expressions >> should filter using 'Today' expression
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/relativeDateExpressions.spec.ts:32:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-filter-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/relativeDateExpressions.spec.ts:15:16
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
- paragraph: $41,650,100
- img
- paragraph: Average Progress
- paragraph: 45.7%
- img
- paragraph: Budget Remaining
- paragraph: $22,639,314
- text: Press ENTER to sort. Press ALT DOWN to open column menu. Press CTRL ENTER to open filter
- grid:
  - rowgroup:
    - row "ID":
      - columnheader "ID"
  - rowgroup:
    - row "Task Status Priority Category Assignee Due Date % Delivered Value Delivered":
      - columnheader "Task"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "% Delivered"
      - columnheader "Value"
      - columnheader "Delivered"
  - rowgroup:
    - row "API-3961":
      - gridcell "API-3961"
    - row "FRONTEND-7320":
      - gridcell "FRONTEND-7320"
    - row "AUTH-3041":
      - gridcell "AUTH-3041"
    - row "INFRA-3440":
      - gridcell "INFRA-3440"
    - row "ADMIN-6433":
      - gridcell "ADMIN-6433"
    - row "USER-7722":
      - gridcell "USER-7722"
    - row "DATA-4261":
      - gridcell "DATA-4261"
    - row "PROJ-5476":
      - gridcell "PROJ-5476"
    - row "APP-7331":
      - gridcell "APP-7331"
    - row "WEB-9689":
      - gridcell "WEB-9689"
    - row "UI-1220":
      - gridcell "UI-1220"
    - row "ADMIN-2758":
      - gridcell "ADMIN-2758"
    - row "DATA-3178":
      - gridcell "DATA-3178"
    - row "CORE-4134":
      - gridcell "CORE-4134"
    - row "MOBILE-4842":
      - gridcell "MOBILE-4842"
    - row "FRONTEND-9672":
      - gridcell "FRONTEND-9672"
    - row "APP-9687":
      - gridcell "APP-9687"
    - row "BACKEND-2385":
      - gridcell "BACKEND-2385"
  - rowgroup:
    - row "Optimize database queries (Sprint 27) Backlog High ♻️ Refactor Sophia Taylor Sophia Taylor 8/30/2025 0% $2,275":
      - gridcell "Optimize database queries (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$2,275"
      - gridcell
    - row "Extract business logic layer Backlog Medium ♻️ Refactor Michael Anderson Michael Anderson 9/12/2025 0% $4,000":
      - gridcell "Extract business logic layer"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/12/2025"
      - gridcell "0%"
      - gridcell "$4,000"
      - gridcell
    - row "Split monolithic components (Q2 Planning) Backlog High ♻️ Refactor Ryan Thomas Ryan Thomas 9/1/2025 0% $7,750":
      - gridcell "Split monolithic components (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/1/2025"
      - gridcell "0%"
      - gridcell "$7,750"
      - gridcell
    - row "Implement two-factor authentication (Sprint 25) In Review High ✨ Feature Michael Anderson Michael Anderson 9/3/2025 65% $8,850 $5,753":
      - gridcell "Implement two-factor authentication (Sprint 25)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/3/2025"
      - gridcell "65%"
      - gridcell "$8,850"
      - gridcell "$5,753"
    - row "Add SQL injection prevention In Review Medium 🔒 Security Maya Patel Maya Patel 9/1/2025 69% $5,025 $3,467":
      - gridcell "Add SQL injection prevention"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/1/2025"
      - gridcell "69%"
      - gridcell "$5,025"
      - gridcell "$3,467"
    - row "Resolve race condition in state update Backlog Low 🐛 Bug EJ Emily Jackson 9/13/2025 0% $7,450":
      - gridcell "Resolve race condition in state update"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "EJ Emily Jackson"
      - gridcell "9/13/2025"
      - gridcell "0%"
      - gridcell "$7,450"
      - gridcell
    - row "Implement social media sharing (Security Audit) In Progress High ✨ Feature DK Daniel Kim 8/27/2025 57% $6,275 $3,577":
      - gridcell "Implement social media sharing (Security Audit)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "DK Daniel Kim"
      - gridcell "8/27/2025"
      - gridcell "57%"
      - gridcell "$6,275"
      - gridcell "$3,577"
    - row "Implement caching strategy (Tech Debt) In Progress Medium ⚡ Performance Olivia Brown Olivia Brown 9/6/2025 24% $13,325 $3,198":
      - gridcell "Implement caching strategy (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/6/2025"
      - gridcell "24%"
      - gridcell "$13,325"
      - gridcell "$3,198"
    - row "Add encryption at rest (Tech Debt) In Review High 🔒 Security Priya Sharma Priya Sharma 8/28/2025 63% $250 $158":
      - gridcell "Add encryption at rest (Tech Debt)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/28/2025"
      - gridcell "63%"
      - gridcell "$250"
      - gridcell "$158"
    - row "Implement dark mode toggle (Sprint 24) Backlog Medium ✨ Feature Ryan Thomas Ryan Thomas 9/6/2025 0% $950":
      - gridcell "Implement dark mode toggle (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$950"
      - gridcell
    - row "Create deployment rollback (Q2 Planning) Backlog Critical 🔧 DevOps Marcus Williams Marcus Williams 8/24/2025 0% $5,175":
      - gridcell "Create deployment rollback (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/24/2025"
      - gridcell "0%"
      - gridcell "$5,175"
      - gridcell
    - row "Write accessibility tests (Sprint 26) Todo Critical 🧪 Testing EJ Emily Jackson 8/25/2025 9% $3,200 $288":
      - gridcell "Write accessibility tests (Sprint 26)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "EJ Emily Jackson"
      - gridcell "8/25/2025"
      - gridcell "9%"
      - gridcell "$3,200"
      - gridcell "$288"
    - row "Create batch operations feature (Sprint 23) Backlog Low ✨ Feature KZ Kevin Zhang 9/13/2025 0% $16,750":
      - gridcell "Create batch operations feature (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "KZ Kevin Zhang"
      - gridcell "9/13/2025"
      - gridcell "0%"
      - gridcell "$16,750"
      - gridcell
    - row "Split monolithic components (Sprint 27) Backlog Low ♻️ Refactor Sophia Taylor Sophia Taylor 10/2/2025 0% $725":
      - gridcell "Split monolithic components (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "10/2/2025"
      - gridcell "0%"
      - gridcell "$725"
      - gridcell
    - row "Configure Docker containers (Tech Debt) Todo Medium 🔧 DevOps Isabella Garcia Isabella Garcia 9/11/2025 12% $1,000 $120":
      - gridcell "Configure Docker containers (Tech Debt)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "9/11/2025"
      - gridcell "12%"
      - gridcell "$1,000"
      - gridcell "$120"
    - row "Implement social media sharing (Sprint 27) Backlog Low ✨ Feature Chris Martinez Chris Martinez 9/21/2025 0% $9,000":
      - gridcell "Implement social media sharing (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/21/2025"
      - gridcell "0%"
      - gridcell "$9,000"
      - gridcell
    - row "Correct CSS overflow in sidebar (Tech Debt) Testing Critical 🐛 Bug James Wilson James Wilson 8/23/2025 89% $800 $712":
      - gridcell "Correct CSS overflow in sidebar (Tech Debt)"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/23/2025"
      - gridcell "89%"
      - gridcell "$800"
      - gridcell "$712"
    - row "Document security protocols (Performance Sprint) Backlog Medium 📝 Documentation David Lee David Lee 9/6/2025 0% $875":
      - gridcell "Document security protocols (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$875"
      - gridcell
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "$41,650,100 $19,010,786":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,650,100"
      - gridcell "$19,010,786"
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
   3 | test.describe("Relative Date Expressions", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for grid to be ready
   9 |     await page.waitForSelector(".ag-root-wrapper");
   10 |     await page.waitForTimeout(1000); // Give time for data to load
   11 |
   12 |     // Open date filter - need to find the correct column
   13 |     await page.hover('[col-id="dueDate"] .ag-header-cell-label');
   14 |     await page.click('[col-id="dueDate"] .ag-header-cell-menu-button');
>  15 |     await page.waitForSelector(".ag-filter-wrapper");
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   16 |   });
   17 |
   18 |   test("should switch to relative date mode", async ({ page }) => {
   19 |     // Click relative mode toggle
   20 |     const relativeToggle = page.locator('button:has-text("Relative")');
   21 |     await relativeToggle.click();
   22 |
   23 |     // Verify relative input is visible
   24 |     const relativeInput = page.locator('[data-testid="relative-input"]');
   25 |     await expect(relativeInput).toBeVisible();
   26 |
   27 |     // Check for expression input
   28 |     const expressionInput = page.locator('input[placeholder*="Today"]');
   29 |     await expect(expressionInput).toBeVisible();
   30 |   });
   31 |
   32 |   test("should filter using 'Today' expression", async ({ page }) => {
   33 |     // Switch to relative mode
   34 |     await page.click('button:has-text("Relative")');
   35 |
   36 |     // Enter "Today" expression
   37 |     const expressionInput = page.locator('input[placeholder*="Today"]').first();
   38 |     await expressionInput.fill("Today");
   39 |
   40 |     // Apply filter
   41 |     await page.click('button:has-text("Apply")');
   42 |     await page.waitForTimeout(500);
   43 |
   44 |     // Verify filter is applied
   45 |     const filterIndicator = page.locator(
   46 |       '[col-id="date"] .ag-header-cell-filtered',
   47 |     );
   48 |     await expect(filterIndicator).toBeVisible();
   49 |
   50 |     // Check filtered rows contain today's date
   51 |     const today = new Date().toLocaleDateString();
   52 |     const firstRowDate = await page
   53 |       .locator('.ag-center-cols-container .ag-row:first-child [col-id="date"]')
   54 |       .textContent();
   55 |     expect(firstRowDate).toContain(today.split("/")[1]); // Check day part
   56 |   });
   57 |
   58 |   test("should show autocomplete suggestions", async ({ page }) => {
   59 |     // Switch to relative mode
   60 |     await page.click('button:has-text("Relative")');
   61 |
   62 |     // Focus on expression input
   63 |     const expressionInput = page.locator('input[placeholder*="Today"]').first();
   64 |     await expressionInput.click();
   65 |
   66 |     // Verify autocomplete dropdown appears
   67 |     await page.waitForSelector('[role="listbox"]', { timeout: 5000 });
   68 |
   69 |     // Check for suggestions
   70 |     await expect(
   71 |       page.locator('[role="option"]:has-text("Today")'),
   72 |     ).toBeVisible();
   73 |     await expect(
   74 |       page.locator('[role="option"]:has-text("Yesterday")'),
   75 |     ).toBeVisible();
   76 |     await expect(
   77 |       page.locator('[role="option"]:has-text("Tomorrow")'),
   78 |     ).toBeVisible();
   79 |     await expect(
   80 |       page.locator('[role="option"]:has-text("Start of week")'),
   81 |     ).toBeVisible();
   82 |   });
   83 |
   84 |   test("should filter suggestions based on input", async ({ page }) => {
   85 |     // Switch to relative mode
   86 |     await page.click('button:has-text("Relative")');
   87 |
   88 |     // Type "week" in expression input
   89 |     const expressionInput = page.locator('input[placeholder*="Today"]').first();
   90 |     await expressionInput.fill("week");
   91 |
   92 |     // Wait for filtered suggestions
   93 |     await page.waitForTimeout(300);
   94 |
   95 |     // Verify only week-related suggestions are shown
   96 |     const suggestions = await page.locator('[role="option"]:visible').count();
   97 |     const weekSuggestions = await page
   98 |       .locator('[role="option"]:visible:has-text("week")')
   99 |       .count();
  100 |
  101 |     expect(weekSuggestions).toBeGreaterThan(0);
  102 |     expect(suggestions).toBeLessThan(10); // Should be filtered
  103 |   });
  104 |
  105 |   test("should select suggestion with keyboard", async ({ page }) => {
  106 |     // Switch to relative mode
  107 |     await page.click('button:has-text("Relative")');
  108 |
  109 |     // Focus expression input
  110 |     const expressionInput = page.locator('input[placeholder*="Today"]').first();
  111 |     await expressionInput.click();
  112 |
  113 |     // Wait for suggestions
  114 |     await page.waitForSelector('[role="listbox"]');
  115 |
```