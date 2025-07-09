# Test info

- Name: Navigation between pages >> should maintain grid state when staying on demo page
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/navigation.spec.ts:78:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-theme-quartz-dark .ag-filter').first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-theme-quartz-dark .ag-filter').first()

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/navigation.spec.ts:92:32
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
- paragraph: $40,602,250
- img
- paragraph: Average Progress
- paragraph: 46.1%
- img
- paragraph: Budget Remaining
- paragraph: $22,119,086
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
    - row "PROJ-10986":
      - gridcell "PROJ-10986"
    - row "MOBILE-10090":
      - gridcell "MOBILE-10090"
    - row "INFRA-10604":
      - gridcell "INFRA-10604"
    - row "WEB-10629":
      - gridcell "WEB-10629"
    - row "UI-10847":
      - gridcell "UI-10847"
    - row "APP-1494":
      - gridcell "APP-1494"
    - row "MOBILE-4513":
      - gridcell "MOBILE-4513"
    - row "MOBILE-8206":
      - gridcell "MOBILE-8206"
    - row "INFRA-9811":
      - gridcell "INFRA-9811"
    - row "API-3900":
      - gridcell "API-3900"
    - row "ADMIN-9981":
      - gridcell "ADMIN-9981"
    - row "UI-8876":
      - gridcell "UI-8876"
    - row "MOBILE-6752":
      - gridcell "MOBILE-6752"
    - row "DATA-7410":
      - gridcell "DATA-7410"
    - row "INFRA-8537":
      - gridcell "INFRA-8537"
    - row "API-10454":
      - gridcell "API-10454"
    - row "UI-1256":
      - gridcell "UI-1256"
    - row "PROJ-1755":
      - gridcell "PROJ-1755"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Correct CSS overflow in sidebar (Sprint 24) Blocked Critical 🐛 Bug James Wilson James Wilson 4/21/2025 13% $4,400":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct CSS overflow in sidebar (Sprint 24)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/21/2025"
      - gridcell "13%"
      - gridcell "$4,400"
    - row "Press Space to toggle row selection (unchecked) Resolve memory leak in data grid In Progress Critical 🐛 Bug Alex Chen Alex Chen 4/21/2025 42% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve memory leak in data grid"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "4/21/2025"
      - gridcell "42%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Resolve memory leak in data grid In Progress High 🐛 Bug Priya Sharma Priya Sharma 4/21/2025 41% $100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve memory leak in data grid"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "4/21/2025"
      - gridcell "41%"
      - gridcell "$100"
    - row "Press Space to toggle row selection (unchecked) Implement blue-green deployment (Q2 Planning) In Progress Critical 🔧 DevOps Priya Sharma Priya Sharma 4/21/2025 45% $6,275":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement blue-green deployment (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "4/21/2025"
      - gridcell "45%"
      - gridcell "$6,275"
    - row "Press Space to toggle row selection (unchecked) Configure firewall rules Done High 🔒 Security James Wilson James Wilson 4/21/2025 100% $12,525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure firewall rules"
      - gridcell "Done"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/21/2025"
      - gridcell "100%"
      - gridcell "$12,525"
    - row "Press Space to toggle row selection (unchecked) Create security penetration tests Blocked Critical 🧪 Testing JL Jessica Lopez 4/22/2025 13% $15,150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create security penetration tests"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "JL Jessica Lopez"
      - gridcell "4/22/2025"
      - gridcell "13%"
      - gridcell "$15,150"
    - row "Press Space to toggle row selection (unchecked) Implement session management In Progress Critical 🔒 Security JR John Robinson 4/22/2025 40% $675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement session management"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "JR John Robinson"
      - gridcell "4/22/2025"
      - gridcell "40%"
      - gridcell "$675"
    - row "Press Space to toggle row selection (unchecked) Create disaster recovery plan (Sprint 26) Blocked Critical 🔧 DevOps Michael Anderson Michael Anderson 4/22/2025 26% $3,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create disaster recovery plan (Sprint 26)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "4/22/2025"
      - gridcell "26%"
      - gridcell "$3,975"
    - row "Press Space to toggle row selection (unchecked) Implement blue-green deployment (Sprint 25) In Review Critical 🔧 DevOps Chris Martinez Chris Martinez 4/22/2025 66% $5,800":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement blue-green deployment (Sprint 25)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "4/22/2025"
      - gridcell "66%"
      - gridcell "$5,800"
    - row "Press Space to toggle row selection (unchecked) Implement OAuth integration (Tech Debt) Done Critical ✨ Feature Isabella Garcia Isabella Garcia 4/22/2025 100% $925":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement OAuth integration (Tech Debt)"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "4/22/2025"
      - gridcell "100%"
      - gridcell "$925"
    - row "Press Space to toggle row selection (unchecked) Fix broken deep links in navigation (Sprint 26) Blocked High 🐛 Bug Ryan Thomas Ryan Thomas 4/22/2025 16% $525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken deep links in navigation (Sprint 26)"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "4/22/2025"
      - gridcell "16%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked) Configure security headers (Sprint 27) In Progress Critical 🔒 Security James Wilson James Wilson 4/23/2025 47% $825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure security headers (Sprint 27)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/23/2025"
      - gridcell "47%"
      - gridcell "$825"
    - row "Press Space to toggle row selection (unchecked) Correct CSS overflow in sidebar (Sprint 25) Todo Critical 🐛 Bug Chris Martinez Chris Martinez 4/23/2025 9% $850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct CSS overflow in sidebar (Sprint 25)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "4/23/2025"
      - gridcell "9%"
      - gridcell "$850"
    - row "Press Space to toggle row selection (unchecked) Write component snapshot tests Blocked Critical 🧪 Testing James Wilson James Wilson 4/23/2025 26% $9,450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write component snapshot tests"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/23/2025"
      - gridcell "26%"
      - gridcell "$9,450"
    - row "Press Space to toggle row selection (unchecked) Add multi-language support (Tech Debt) Blocked Critical ✨ Feature Alex Chen Alex Chen 4/23/2025 37% $4,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add multi-language support (Tech Debt)"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "4/23/2025"
      - gridcell "37%"
      - gridcell "$4,300"
    - row "Press Space to toggle row selection (unchecked) Add SQL injection prevention (Tech Debt) In Progress Critical 🔒 Security Sarah Johnson Sarah Johnson 4/23/2025 52% $5,600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add SQL injection prevention (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "4/23/2025"
      - gridcell "52%"
      - gridcell "$5,600"
    - row "Press Space to toggle row selection (unchecked) Write component snapshot tests (Tech Debt) In Progress Critical 🧪 Testing Ryan Thomas Ryan Thomas 4/23/2025 21% $700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write component snapshot tests (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "4/23/2025"
      - gridcell "21%"
      - gridcell "$700"
    - row "Press Space to toggle row selection (unchecked) Fix broken deep links in navigation (Q1 Goals) Blocked High 🐛 Bug David Lee David Lee 4/23/2025 26% $6,850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken deep links in navigation (Q1 Goals)"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "4/23/2025"
      - gridcell "26%"
      - gridcell "$6,850"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,602,250":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,602,250"
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