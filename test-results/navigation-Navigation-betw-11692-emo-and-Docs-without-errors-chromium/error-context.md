# Test info

- Name: Navigation between pages >> should navigate between Home, Demo, and Docs without errors
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/navigation.spec.ts:4:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-theme-quartz-dark')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-theme-quartz-dark')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/navigation.spec.ts:20:57
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
  - button "Show version details": v0.1.0+48 feat/headless-refactor
  - img
  - text: MIT License
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: My Views
  - img
- button
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $41,727,350
- img
- paragraph: Average Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $22,571,936
- grid:
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value Delivered":
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
      - columnheader "Delivered"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) [USER-4709] Create disaster recovery plan (Security Audit) Testing Low 🔧 DevOps Daniel Kim Daniel Kim 10/12/2025 92% $800 $736":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[USER-4709] Create disaster recovery plan (Security Audit)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "10/12/2025"
      - gridcell "92%"
      - gridcell "$800"
      - gridcell "$736"
    - row "Press Space to toggle row selection (unchecked) [UI-8274] Configure CDN distribution Backlog Medium 🔧 DevOps Marcus Williams Marcus Williams 9/9/2025 0% $325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[UI-8274] Configure CDN distribution"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/9/2025"
      - gridcell "0%"
      - gridcell "$325"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [CORE-1184] Update contribution guidelines (Sprint 23) Backlog Low 📝 Documentation Alex Chen Alex Chen 9/25/2025 0% $425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-1184] Update contribution guidelines (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/25/2025"
      - gridcell "0%"
      - gridcell "$425"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [CORE-3192] Debug performance regression in search (Security Audit) Testing Medium 🐛 Bug Marcus Williams Marcus Williams 9/3/2025 94% $1,575 $1,481":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-3192] Debug performance regression in search (Security Audit)"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/3/2025"
      - gridcell "94%"
      - gridcell "$1,575"
      - gridcell "$1,481"
    - row "Press Space to toggle row selection (unchecked) [BACKEND-10744] Extract shared utilities module Backlog Medium ♻️ Refactor Chris Martinez Chris Martinez 9/16/2025 0% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[BACKEND-10744] Extract shared utilities module"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/16/2025"
      - gridcell "0%"
      - gridcell "$700"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [APP-10763] Set up SSL certificates Testing Medium 🔒 Security Sophia Taylor Sophia Taylor 9/3/2025 80% $425 $340":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[APP-10763] Set up SSL certificates"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/3/2025"
      - gridcell "80%"
      - gridcell "$425"
      - gridcell "$340"
    - row "Press Space to toggle row selection (unchecked) [WEB-10799] Configure security headers (Sprint 23) Backlog High 🔒 Security Kevin Zhang Kevin Zhang 8/31/2025 0% $14,250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-10799] Configure security headers (Sprint 23)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/31/2025"
      - gridcell "0%"
      - gridcell "$14,250"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [DATA-5933] Refactor state management In Progress Critical ♻️ Refactor Emily Jackson Emily Jackson 9/1/2025 32% $575 $184":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-5933] Refactor state management"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/1/2025"
      - gridcell "32%"
      - gridcell "$575"
      - gridcell "$184"
    - row "Press Space to toggle row selection (unchecked) [CORE-10121] Handle null pointer exception in API client (Performance Sprint) Todo Critical 🐛 Bug David Lee David Lee 8/30/2025 19% $100 $19":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-10121] Handle null pointer exception in API client (Performance Sprint)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/30/2025"
      - gridcell "19%"
      - gridcell "$100"
      - gridcell "$19"
    - row "Press Space to toggle row selection (unchecked) [ADMIN-2031] Build custom report generator (Sprint 24) Backlog Low ✨ Feature Amanda White Amanda White 9/23/2025 0% $3,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-2031] Build custom report generator (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/23/2025"
      - gridcell "0%"
      - gridcell "$3,650"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-2583] Configure load balancer (Sprint 25) In Review Low 🔧 DevOps David Lee David Lee 9/17/2025 66% $300 $198":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-2583] Configure load balancer (Sprint 25)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/17/2025"
      - gridcell "66%"
      - gridcell "$300"
      - gridcell "$198"
    - row "Press Space to toggle row selection (unchecked) [API-2759] Optimize database queries (Security Audit) In Progress High ⚡ Performance Priya Sharma Priya Sharma 9/1/2025 58% $6,450 $3,741":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[API-2759] Optimize database queries (Security Audit)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/1/2025"
      - gridcell "58%"
      - gridcell "$6,450"
      - gridcell "$3,741"
    - row "Press Space to toggle row selection (unchecked) [MOBILE-5055] Resolve memory leak in data grid Backlog Critical 🐛 Bug Alex Chen Alex Chen 8/29/2025 0% $4,400":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-5055] Resolve memory leak in data grid"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/29/2025"
      - gridcell "0%"
      - gridcell "$4,400"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [UI-5775] Implement secrets management (Q1 Goals) In Review Low 🔧 DevOps John Robinson John Robinson 9/16/2025 64% $650 $416":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[UI-5775] Implement secrets management (Q1 Goals)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "9/16/2025"
      - gridcell "64%"
      - gridcell "$650"
      - gridcell "$416"
    - row "Press Space to toggle row selection (unchecked) [CORE-6732] Set up vulnerability scanning Backlog Critical 🔒 Security Emily Jackson Emily Jackson 8/29/2025 0% $575":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-6732] Set up vulnerability scanning"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/29/2025"
      - gridcell "0%"
      - gridcell "$575"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-8717] Add visual regression tests (Q2 Planning) Backlog High 🧪 Testing Sophia Taylor Sophia Taylor 8/31/2025 0% $4,525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-8717] Add visual regression tests (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/31/2025"
      - gridcell "0%"
      - gridcell "$4,525"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [MOBILE-1511] Create backup automation (Sprint 24) Testing Low 🔧 DevOps Michael Anderson Michael Anderson 9/21/2025 86% $925 $796":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-1511] Create backup automation (Sprint 24)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/21/2025"
      - gridcell "86%"
      - gridcell "$925"
      - gridcell "$796"
    - row "Press Space to toggle row selection (unchecked) [MOBILE-2637] Add request batching Testing Low ⚡ Performance Emily Jackson Emily Jackson 9/16/2025 83% $11,375 $9,441":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-2637] Add request batching"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/16/2025"
      - gridcell "83%"
      - gridcell "$11,375"
      - gridcell "$9,441"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,727,350 $19,155,414":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,727,350"
      - gridcell "$19,155,414"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Navigation between pages", () => {
   4 |   test("should navigate between Home, Demo, and Docs without errors", async ({
   5 |     page,
   6 |   }) => {
   7 |     // Start on the home page
   8 |     await page.goto("/");
   9 |
   10 |     // Verify we're on the home page
   11 |     await expect(page.locator("h1").first()).toContainText(
   12 |       "AG Grid React Components",
   13 |     );
   14 |
   15 |     // Navigate to Demo
   16 |     await page.click('a[href="/demo"]');
   17 |     await page.waitForLoadState("networkidle");
   18 |
   19 |     // Verify the grid is loaded
>  20 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
      |                                                         ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   21 |     await expect(page.locator(".ag-header-row")).toBeVisible();
   22 |
   23 |     // Navigate back to Home
   24 |     await page.click('a[href="/"]');
   25 |     await page.waitForLoadState("networkidle");
   26 |
   27 |     // Verify we're back on home
   28 |     await expect(
   29 |       page.locator('text=AG Grid filters that understand "today"'),
   30 |     ).toBeVisible();
   31 |
   32 |     // Navigate to Demo again
   33 |     await page.click('a[href="/demo"]');
   34 |     await page.waitForLoadState("networkidle");
   35 |
   36 |     // Verify the grid loads without errors
   37 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
   38 |     await expect(page.locator(".ag-header-row")).toBeVisible();
   39 |
   40 |     // Check console for errors (excluding AG Grid license warnings)
   41 |     const consoleErrors: string[] = [];
   42 |     page.on("console", (msg) => {
   43 |       if (msg.type() === "error") {
   44 |         const text = msg.text();
   45 |         // Ignore AG Grid Enterprise license warnings - they contain asterisks and license-related text
   46 |         if (
   47 |           !text.includes("AG Grid Enterprise") &&
   48 |           !text.includes("License Key Not Found") &&
   49 |           !text.includes("ag-grid.com") &&
   50 |           !text.includes("****") &&
   51 |           !text.includes("license")
   52 |         ) {
   53 |           consoleErrors.push(text);
   54 |         }
   55 |       }
   56 |     });
   57 |
   58 |     // Navigate to docs and back
   59 |     await page.click('a[href="/docs"]');
   60 |     await page.waitForLoadState("networkidle");
   61 |     // Use a more specific selector since there are multiple "Documentation" texts on the page
   62 |     await expect(
   63 |       page
   64 |         .locator("h1")
   65 |         .filter({ hasText: "AG Grid React Components Documentation" }),
   66 |     ).toBeVisible();
   67 |
   68 |     await page.click('a[href="/demo"]');
   69 |     await page.waitForLoadState("networkidle");
   70 |
   71 |     // Final check for grid
   72 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
   73 |
   74 |     // Verify no console errors
   75 |     expect(consoleErrors).toHaveLength(0);
   76 |   });
   77 |
   78 |   test("should maintain grid state when staying on demo page", async ({
   79 |     page,
   80 |   }) => {
   81 |     await page.goto("/demo");
   82 |     await page.waitForLoadState("networkidle");
   83 |
   84 |     // Apply a filter
   85 |     await page.click("text=Due Date");
   86 |     await page.waitForTimeout(500);
   87 |
   88 |     // Verify filter UI appears (use first() to avoid strict mode violation)
   89 |     const filterDialog = page
   90 |       .locator(".ag-theme-quartz-dark .ag-filter")
   91 |       .first();
   92 |     await expect(filterDialog).toBeVisible();
   93 |
   94 |     // Close filter
   95 |     await page.keyboard.press("Escape");
   96 |
   97 |     // Grid should still be functional
   98 |     await expect(page.locator(".ag-header-row")).toBeVisible();
   99 |   });
  100 | });
  101 |
```