# Test info

- Name: Navigation between pages >> should navigate between Home, Demo, and Docs without errors
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/navigation.spec.ts:4:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-theme-quartz-dark')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-theme-quartz-dark')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/navigation.spec.ts:20:57
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
- paragraph: $42,242,925
- img
- paragraph: Average Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $22,629,811
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
    - row "DATA-3616":
      - gridcell "DATA-3616"
    - row "AUTH-8968":
      - gridcell "AUTH-8968"
    - row "FRONTEND-9254":
      - gridcell "FRONTEND-9254"
    - row "CORE-1466":
      - gridcell "CORE-1466"
    - row "PROJ-1523":
      - gridcell "PROJ-1523"
    - row "MOBILE-1303":
      - gridcell "MOBILE-1303"
    - row "USER-6414":
      - gridcell "USER-6414"
    - row "AUTH-8139":
      - gridcell "AUTH-8139"
    - row "API-9265":
      - gridcell "API-9265"
    - row "AUTH-9573":
      - gridcell "AUTH-9573"
    - row "AUTH-5062":
      - gridcell "AUTH-5062"
    - row "ADMIN-8072":
      - gridcell "ADMIN-8072"
    - row "API-8472":
      - gridcell "API-8472"
    - row "INFRA-10071":
      - gridcell "INFRA-10071"
    - row "WEB-2010":
      - gridcell "WEB-2010"
    - row "BACKEND-2134":
      - gridcell "BACKEND-2134"
    - row "WEB-3007":
      - gridcell "WEB-3007"
    - row "DASH-4419":
      - gridcell "DASH-4419"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Test mobile responsiveness In Review Critical 🧪 Testing DK Daniel Kim 8/29/2025 65% $11,325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Test mobile responsiveness"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "DK Daniel Kim"
      - gridcell "8/29/2025"
      - gridcell "65%"
      - gridcell "$11,325"
    - row "Press Space to toggle row selection (unchecked) Fix broken unit tests in CI pipeline (Q1 Goals) In Review Critical 🐛 Bug Sophia Taylor Sophia Taylor 8/27/2025 68% $11,850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken unit tests in CI pipeline (Q1 Goals)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/27/2025"
      - gridcell "68%"
      - gridcell "$11,850"
    - row "Press Space to toggle row selection (unchecked) Extract business logic layer Todo Critical ♻️ Refactor DK Daniel Kim 8/28/2025 11% $5,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Extract business logic layer"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "DK Daniel Kim"
      - gridcell "8/28/2025"
      - gridcell "11%"
      - gridcell "$5,975"
    - row "Press Space to toggle row selection (unchecked) Add multi-language support (Q1 Goals) Todo Medium ✨ Feature Ryan Thomas Ryan Thomas 9/4/2025 17% $525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add multi-language support (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/4/2025"
      - gridcell "17%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked) Add request batching Todo High ⚡ Performance Olivia Brown Olivia Brown 9/2/2025 5% $975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add request batching"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/2/2025"
      - gridcell "5%"
      - gridcell "$975"
    - row "Press Space to toggle row selection (unchecked) Create load testing scenarios (Sprint 26) In Review Critical 🧪 Testing JR John Robinson 8/26/2025 70% $2,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create load testing scenarios (Sprint 26)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "JR John Robinson"
      - gridcell "8/26/2025"
      - gridcell "70%"
      - gridcell "$2,725"
    - row "Press Space to toggle row selection (unchecked) Write API contract tests (Q1 Goals) Todo Critical 🧪 Testing JR John Robinson 8/26/2025 8% $975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write API contract tests (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "JR John Robinson"
      - gridcell "8/26/2025"
      - gridcell "8%"
      - gridcell "$975"
    - row "Press Space to toggle row selection (unchecked) Implement session management Testing Low 🔒 Security Sophia Taylor Sophia Taylor 9/14/2025 82% $825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement session management"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/14/2025"
      - gridcell "82%"
      - gridcell "$825"
    - row "Press Space to toggle row selection (unchecked) Fix broken deep links in navigation (Q2 Planning) In Progress Low 🐛 Bug Alex Chen Alex Chen 9/11/2025 36% $375":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken deep links in navigation (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/11/2025"
      - gridcell "36%"
      - gridcell "$375"
    - row "Press Space to toggle row selection (unchecked) Implement API key rotation (Sprint 23) Todo Low 🔒 Security Emma Davis Emma Davis 9/8/2025 18% $19,675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement API key rotation (Sprint 23)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/8/2025"
      - gridcell "18%"
      - gridcell "$19,675"
    - row "Press Space to toggle row selection (unchecked) Set up log aggregation (Security Audit) Backlog Medium 🔧 DevOps Sophia Taylor Sophia Taylor 9/6/2025 0% $300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up log aggregation (Security Audit)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$300"
    - row "Press Space to toggle row selection (unchecked) Add audit logging (Sprint 24) Todo Low 🔒 Security Maya Patel Maya Patel 9/12/2025 7% $8,175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add audit logging (Sprint 24)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/12/2025"
      - gridcell "7%"
      - gridcell "$8,175"
    - row "Press Space to toggle row selection (unchecked) Split monolithic components In Progress Low ♻️ Refactor Emma Davis Emma Davis 9/25/2025 20% $300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Split monolithic components"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/25/2025"
      - gridcell "20%"
      - gridcell "$300"
    - row "Press Space to toggle row selection (unchecked) Migrate to new testing framework Backlog Medium ♻️ Refactor David Lee David Lee 9/9/2025 0% $8,775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Migrate to new testing framework"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/9/2025"
      - gridcell "0%"
      - gridcell "$8,775"
    - row "Press Space to toggle row selection (unchecked) Create deployment rollback (Security Audit) In Review Critical 🔧 DevOps Olivia Brown Olivia Brown 8/25/2025 73% $625":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create deployment rollback (Security Audit)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/25/2025"
      - gridcell "73%"
      - gridcell "$625"
    - row "Press Space to toggle row selection (unchecked) Implement auto-scaling (Sprint 27) In Review Low 🔧 DevOps KZ Kevin Zhang 9/20/2025 76% $900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement auto-scaling (Sprint 27)"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "KZ Kevin Zhang"
      - gridcell "9/20/2025"
      - gridcell "76%"
      - gridcell "$900"
    - row "Press Space to toggle row selection (unchecked) Set up infrastructure as code (Performance Sprint) Testing Low 🔧 DevOps AW Amanda White 9/10/2025 93% $925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up infrastructure as code (Performance Sprint)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "AW Amanda White"
      - gridcell "9/10/2025"
      - gridcell "93%"
      - gridcell "$925"
    - row "Press Space to toggle row selection (unchecked) Create video tutorials Backlog Low 📝 Documentation James Wilson James Wilson 9/29/2025 0% $225":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create video tutorials"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/29/2025"
      - gridcell "0%"
      - gridcell "$225"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $42,242,925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$42,242,925"
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
   49 |           !text.includes("://ag-grid.com") && // More specific URL check to avoid security issue
   50 |           !text.includes("****") &&
   51 |           !text.toLowerCase().includes("license")
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