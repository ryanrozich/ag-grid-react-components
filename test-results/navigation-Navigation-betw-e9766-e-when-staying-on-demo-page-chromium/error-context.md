# Test info

- Name: Navigation between pages >> should maintain grid state when staying on demo page
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/navigation.spec.ts:78:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-theme-quartz-dark .ag-filter').first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-theme-quartz-dark .ag-filter').first()

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/navigation.spec.ts:92:32
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
- paragraph: $41,061,900
- img
- paragraph: Average Progress
- paragraph: 46.1%
- img
- paragraph: Budget Remaining
- paragraph: $21,956,952
- text: Press ENTER to sort. Press ALT DOWN to open column menu. Press CTRL ENTER to open filter
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
    - row "Press Space to toggle row selection (unchecked) [PROJ-2395] Correct CSS overflow in sidebar (Q2 Planning) Done Critical 🐛 Bug David Lee David Lee 4/26/2025 100% $7,075 $7,075":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-2395] Correct CSS overflow in sidebar (Q2 Planning)"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "4/26/2025"
      - gridcell "100%"
      - gridcell "$7,075"
      - gridcell "$7,075"
    - row "Press Space to toggle row selection (unchecked) [BACKEND-10810] Fix broken deep links in navigation (Sprint 25) Blocked Critical 🐛 Bug James Wilson James Wilson 4/27/2025 16% $1,550 $248":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[BACKEND-10810] Fix broken deep links in navigation (Sprint 25)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/27/2025"
      - gridcell "16%"
      - gridcell "$1,550"
      - gridcell "$248"
    - row "Press Space to toggle row selection (unchecked) [PROJ-6173] Add audit logging Blocked Critical 🔒 Security Emma Davis Emma Davis 4/27/2025 25% $575 $144":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-6173] Add audit logging"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "4/27/2025"
      - gridcell "25%"
      - gridcell "$575"
      - gridcell "$144"
    - row "Press Space to toggle row selection (unchecked) [ADMIN-8899] Fix login form validation error (Sprint 26) Blocked Critical 🐛 Bug Maya Patel Maya Patel 4/27/2025 34% $6,450 $2,193":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-8899] Fix login form validation error (Sprint 26)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "4/27/2025"
      - gridcell "34%"
      - gridcell "$6,450"
      - gridcell "$2,193"
    - row "Press Space to toggle row selection (unchecked) [APP-9332] Implement session management Blocked High 🔒 Security Kevin Zhang Kevin Zhang 4/27/2025 16% $4,550 $728":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[APP-9332] Implement session management"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "4/27/2025"
      - gridcell "16%"
      - gridcell "$4,550"
      - gridcell "$728"
    - row "Press Space to toggle row selection (unchecked) [APP-2919] Extract shared utilities module In Progress Critical ♻️ Refactor Maya Patel Maya Patel 4/27/2025 43% $18,350 $7,891":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[APP-2919] Extract shared utilities module"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "4/27/2025"
      - gridcell "43%"
      - gridcell "$18,350"
      - gridcell "$7,891"
    - row "Press Space to toggle row selection (unchecked) [PROJ-5256] Implement session management (Q2 Planning) Blocked High 🔒 Security Isabella Garcia Isabella Garcia 4/27/2025 22% $9,825 $2,162":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-5256] Implement session management (Q2 Planning)"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "4/27/2025"
      - gridcell "22%"
      - gridcell "$9,825"
      - gridcell "$2,162"
    - row "Press Space to toggle row selection (unchecked) [CORE-10908] Debug performance regression in search Done Critical 🐛 Bug Olivia Brown Olivia Brown 4/28/2025 100% $1,125 $1,125":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[CORE-10908] Debug performance regression in search"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "4/28/2025"
      - gridcell "100%"
      - gridcell "$1,125"
      - gridcell "$1,125"
    - row "Press Space to toggle row selection (unchecked) [ADMIN-3467] Clean up deprecated APIs Done Critical ♻️ Refactor Sarah Johnson Sarah Johnson 4/28/2025 100% $600 $600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-3467] Clean up deprecated APIs"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "4/28/2025"
      - gridcell "100%"
      - gridcell "$600"
      - gridcell "$600"
    - row "Press Space to toggle row selection (unchecked) [WEB-7168] Configure CDN distribution Blocked Critical 🔧 DevOps Maya Patel Maya Patel 4/28/2025 21% $975 $205":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-7168] Configure CDN distribution"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "4/28/2025"
      - gridcell "21%"
      - gridcell "$975"
      - gridcell "$205"
    - row "Press Space to toggle row selection (unchecked) [MOBILE-8969] Create disaster recovery plan (Sprint 25) Done Critical 🔧 DevOps Daniel Kim Daniel Kim 4/28/2025 100% $1,325 $1,325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-8969] Create disaster recovery plan (Sprint 25)"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "4/28/2025"
      - gridcell "100%"
      - gridcell "$1,325"
      - gridcell "$1,325"
    - row "Press Space to toggle row selection (unchecked) [PROJ-9498] Set up SSL certificates Blocked Critical 🔒 Security Chris Martinez Chris Martinez 4/28/2025 34% $7,450 $2,533":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-9498] Set up SSL certificates"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "4/28/2025"
      - gridcell "34%"
      - gridcell "$7,450"
      - gridcell "$2,533"
    - row "Press Space to toggle row selection (unchecked) [PROJ-9632] Set up vulnerability scanning (Sprint 24) In Progress Critical 🔒 Security Isabella Garcia Isabella Garcia 4/28/2025 23% $3,350 $771":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[PROJ-9632] Set up vulnerability scanning (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "4/28/2025"
      - gridcell "23%"
      - gridcell "$3,350"
      - gridcell "$771"
    - row "Press Space to toggle row selection (unchecked) [MOBILE-9915] Create integration test suite (Security Audit) Blocked Critical 🧪 Testing Chris Martinez Chris Martinez 4/28/2025 25% $2,925 $731":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-9915] Create integration test suite (Security Audit)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "4/28/2025"
      - gridcell "25%"
      - gridcell "$2,925"
      - gridcell "$731"
    - row "Press Space to toggle row selection (unchecked) [USER-1050] Optimize database queries (Q2 Planning) Done Critical ⚡ Performance Ryan Thomas Ryan Thomas 4/28/2025 100% $10,050 $10,050":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[USER-1050] Optimize database queries (Q2 Planning)"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "⚡ Performance"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "4/28/2025"
      - gridcell "100%"
      - gridcell "$10,050"
      - gridcell "$10,050"
    - row "Press Space to toggle row selection (unchecked) [MOBILE-2901] Configure load balancer (Performance Sprint) Blocked Critical 🔧 DevOps Sarah Johnson Sarah Johnson 4/28/2025 29% $3,350 $972":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[MOBILE-2901] Configure load balancer (Performance Sprint)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "4/28/2025"
      - gridcell "29%"
      - gridcell "$3,350"
      - gridcell "$972"
    - row "Press Space to toggle row selection (unchecked) [FRONTEND-4029] Implement secrets management (Sprint 24) Done Critical 🔧 DevOps John Robinson John Robinson 4/28/2025 100% $75 $75":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[FRONTEND-4029] Implement secrets management (Sprint 24)"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "4/28/2025"
      - gridcell "100%"
      - gridcell "$75"
      - gridcell "$75"
    - row "Press Space to toggle row selection (unchecked) [APP-6698] Create disaster recovery plan In Progress Critical 🔧 DevOps John Robinson John Robinson 4/28/2025 21% $13,650 $2,867":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[APP-6698] Create disaster recovery plan"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "4/28/2025"
      - gridcell "21%"
      - gridcell "$13,650"
      - gridcell "$2,867"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,061,900 $19,104,948":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,061,900"
      - gridcell "$19,104,948"
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
   20 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
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
>  92 |     await expect(filterDialog).toBeVisible();
      |                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
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