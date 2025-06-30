# Test info

- Name: Navigation between pages >> should navigate between Home, Demo, and Docs without errors
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:4:3

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 14
Received array:  ["****************************************************************************************************************************", "************************************************ AG Grid Enterprise License ************************************************", "************************************************** License Key Not Found ***************************************************", "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "****************************************************************************************************************************", "****************************************************************************************************************************", "****************************************************************************************************************************", "************************************************ AG Grid Enterprise License ************************************************", "************************************************** License Key Not Found ***************************************************", …]
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:61:27
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
- paragraph: $4,188,525
- img
- paragraph: Progress
- paragraph: 47.7%
- img
- paragraph: Budget Remaining
- paragraph: $2,289,126
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
    - row "590 [FRONTEND-1590] Implement auto-scaling 🔧 DevOps Low Chris Martinez Chris Martinez 8/29/2025 $4,925 Backlog 0%":
      - gridcell "590"
      - gridcell "[FRONTEND-1590] Implement auto-scaling"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/29/2025"
      - gridcell "$4,925"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "802 [DASH-1802] Update API documentation (Tech Debt) 📝 Documentation Medium Sarah Johnson Sarah Johnson 8/21/2025 $450 Backlog 0%":
      - gridcell "802"
      - gridcell "[DASH-1802] Update API documentation (Tech Debt)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/21/2025"
      - gridcell "$450"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "468 [INFRA-1468] Test mobile responsiveness (Sprint 24) 🧪 Testing Low Sarah Johnson Sarah Johnson 9/24/2025 $1,275 In Progress 51%":
      - gridcell "468"
      - gridcell "[INFRA-1468] Test mobile responsiveness (Sprint 24)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/24/2025"
      - gridcell "$1,275"
      - gridcell "In Progress"
      - gridcell "51%"
    - row "449 [DASH-1449] Build custom report generator (Q2 Planning) ✨ Feature Critical Jessica Lopez Jessica Lopez 8/12/2025 $7,750 Todo 5%":
      - gridcell "449"
      - gridcell "[DASH-1449] Build custom report generator (Q2 Planning)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/12/2025"
      - gridcell "$7,750"
      - gridcell "Todo"
      - gridcell "5%"
    - row "780 [AUTH-1780] Set up staging environment 🔧 DevOps Low Chris Martinez Chris Martinez 9/3/2025 $2,225 In Progress 27%":
      - gridcell "780"
      - gridcell "[AUTH-1780] Set up staging environment"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/3/2025"
      - gridcell "$2,225"
      - gridcell "In Progress"
      - gridcell "27%"
    - row "975 [APP-1975] Fix responsive layout on tablets 🐛 Bug Low David Lee David Lee 8/26/2025 $650 Todo 19%":
      - gridcell "975"
      - gridcell "[APP-1975] Fix responsive layout on tablets"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/26/2025"
      - gridcell "$650"
      - gridcell "Todo"
      - gridcell "19%"
    - row "867 [INFRA-1867] Implement API key rotation (Sprint 24) 🔒 Security High Alex Chen Alex Chen 8/10/2025 $525 Backlog 0%":
      - gridcell "867"
      - gridcell "[INFRA-1867] Implement API key rotation (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/10/2025"
      - gridcell "$525"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "899 [WEB-1899] Implement CSRF protection (Sprint 27) 🔒 Security Low Isabella Garcia Isabella Garcia 8/21/2025 $4,400 In Progress 30%":
      - gridcell "899"
      - gridcell "[WEB-1899] Implement CSRF protection (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/21/2025"
      - gridcell "$4,400"
      - gridcell "In Progress"
      - gridcell "30%"
    - row "1 [DASH-1001] Write component snapshot tests (Sprint 26) 🧪 Testing Medium Emily Jackson Emily Jackson 8/22/2025 $225 Testing 91%":
      - gridcell "1"
      - gridcell "[DASH-1001] Write component snapshot tests (Sprint 26)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/22/2025"
      - gridcell "$225"
      - gridcell "Testing"
      - gridcell "91%"
    - row "529 [INFRA-1529] Create integration test suite (Sprint 23) 🧪 Testing Critical Marcus Williams Marcus Williams 8/7/2025 $850 Backlog 0%":
      - gridcell "529"
      - gridcell "[INFRA-1529] Create integration test suite (Sprint 23)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/7/2025"
      - gridcell "$850"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "569 [CORE-1569] Update to React 18 patterns ♻️ Refactor Critical Ryan Thomas Ryan Thomas 8/6/2025 $275 In Progress 56%":
      - gridcell "569"
      - gridcell "[CORE-1569] Update to React 18 patterns"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/6/2025"
      - gridcell "$275"
      - gridcell "In Progress"
      - gridcell "56%"
    - row "93 [BACKEND-1093] Create disaster recovery plan (Sprint 24) 🔧 DevOps Critical Emily Jackson Emily Jackson 8/6/2025 $800 Backlog 0%":
      - gridcell "93"
      - gridcell "[BACKEND-1093] Create disaster recovery plan (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/6/2025"
      - gridcell "$800"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "131 [UI-1131] Optimize database queries ♻️ Refactor Medium Ryan Thomas Ryan Thomas 8/15/2025 $15,025 Todo 14%":
      - gridcell "131"
      - gridcell "[UI-1131] Optimize database queries"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/15/2025"
      - gridcell "$15,025"
      - gridcell "Todo"
      - gridcell "14%"
    - row "618 [PROJ-1618] Update README with examples 📝 Documentation Critical David Lee David Lee 8/6/2025 $525 Todo 7%":
      - gridcell "618"
      - gridcell "[PROJ-1618] Update README with examples"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/6/2025"
      - gridcell "$525"
      - gridcell "Todo"
      - gridcell "7%"
    - row "857 [AUTH-1857] Add keyboard shortcuts (Sprint 27) ✨ Feature High Marcus Williams Marcus Williams 8/11/2025 $4,450 Testing 85%":
      - gridcell "857"
      - gridcell "[AUTH-1857] Add keyboard shortcuts (Sprint 27)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/11/2025"
      - gridcell "$4,450"
      - gridcell "Testing"
      - gridcell "85%"
    - row "276 [WEB-1276] Create onboarding tutorial 📝 Documentation Medium Ryan Thomas Ryan Thomas 8/22/2025 $900 Testing 94%":
      - gridcell "276"
      - gridcell "[WEB-1276] Create onboarding tutorial"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/22/2025"
      - gridcell "$900"
      - gridcell "Testing"
      - gridcell "94%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,188,525 48%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,188,525"
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
  40 |     // Check console for errors
  41 |     const consoleErrors: string[] = [];
  42 |     page.on("console", (msg) => {
  43 |       if (msg.type() === "error") {
  44 |         consoleErrors.push(msg.text());
  45 |       }
  46 |     });
  47 |
  48 |     // Navigate to docs and back
  49 |     await page.click('a[href="/docs"]');
  50 |     await page.waitForLoadState("networkidle");
  51 |     // Use a more specific selector since there are multiple "Documentation" texts on the page
  52 |     await expect(page.locator("h1").filter({ hasText: "AG Grid React Components Documentation" })).toBeVisible();
  53 |
  54 |     await page.click('a[href="/demo"]');
  55 |     await page.waitForLoadState("networkidle");
  56 |
  57 |     // Final check for grid
  58 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
  59 |
  60 |     // Verify no console errors
> 61 |     expect(consoleErrors).toHaveLength(0);
     |                           ^ Error: expect(received).toHaveLength(expected)
  62 |   });
  63 |
  64 |   test("should maintain grid state when staying on demo page", async ({
  65 |     page,
  66 |   }) => {
  67 |     await page.goto("/demo");
  68 |     await page.waitForLoadState("networkidle");
  69 |
  70 |     // Apply a filter
  71 |     await page.click("text=Due Date");
  72 |     await page.waitForTimeout(500);
  73 |
  74 |     // Verify filter UI appears (use first() to avoid strict mode violation)
  75 |     const filterDialog = page
  76 |       .locator(".ag-theme-quartz-dark .ag-filter")
  77 |       .first();
  78 |     await expect(filterDialog).toBeVisible();
  79 |
  80 |     // Close filter
  81 |     await page.keyboard.press("Escape");
  82 |
  83 |     // Grid should still be functional
  84 |     await expect(page.locator(".ag-header-row")).toBeVisible();
  85 |   });
  86 | });
  87 |
```