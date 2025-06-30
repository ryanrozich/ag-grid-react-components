# Test info

- Name: Navigation between pages >> should maintain grid state when staying on demo page
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:64:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-theme-quartz-dark .ag-filter').first()
Expected: visible
Received: hidden
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-theme-quartz-dark .ag-filter').first()
    9 × locator resolved to <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div>
      - unexpected value "hidden"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:78:32
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
- paragraph: $4,252,150
- img
- paragraph: Progress
- paragraph: 45.2%
- img
- paragraph: Budget Remaining
- paragraph: $2,336,041
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
    - row "759 [USER-1759] Implement rate limiting 🔒 Security Critical Priya Sharma Priya Sharma 4/13/2025 $925 Blocked 34%":
      - gridcell "759"
      - gridcell "[USER-1759] Implement rate limiting"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "4/13/2025"
      - gridcell "$925"
      - gridcell "Blocked"
      - gridcell "34%"
    - row "359 [INFRA-1359] Configure security headers (Sprint 24) 🔒 Security Critical John Robinson John Robinson 4/15/2025 $350 Blocked 35%":
      - gridcell "359"
      - gridcell "[INFRA-1359] Configure security headers (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "4/15/2025"
      - gridcell "$350"
      - gridcell "Blocked"
      - gridcell "35%"
    - row "457 [MOBILE-1457] Set up CI/CD pipeline (Sprint 25) 🔧 DevOps Critical Priya Sharma Priya Sharma 4/15/2025 $4,525 In Progress 40%":
      - gridcell "457"
      - gridcell "[MOBILE-1457] Set up CI/CD pipeline (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "4/15/2025"
      - gridcell "$4,525"
      - gridcell "In Progress"
      - gridcell "40%"
    - row "597 [MOBILE-1597] Resolve CORS issue with external API (Q1 Goals) 🐛 Bug Critical Sarah Johnson Sarah Johnson 4/16/2025 $325 In Progress 28%":
      - gridcell "597"
      - gridcell "[MOBILE-1597] Resolve CORS issue with external API (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "4/16/2025"
      - gridcell "$325"
      - gridcell "In Progress"
      - gridcell "28%"
    - row "262 [PROJ-1262] Consolidate duplicate code (Sprint 24) ♻️ Refactor Critical Michael Anderson Michael Anderson 4/16/2025 $875 In Progress 59%":
      - gridcell "262"
      - gridcell "[PROJ-1262] Consolidate duplicate code (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "4/16/2025"
      - gridcell "$875"
      - gridcell "In Progress"
      - gridcell "59%"
    - row "446 [WEB-1446] Resolve CORS issue with external API (Sprint 27) 🐛 Bug Medium Marcus Williams Marcus Williams 4/16/2025 $11,125 Blocked 21%":
      - gridcell "446"
      - gridcell "[WEB-1446] Resolve CORS issue with external API (Sprint 27)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "4/16/2025"
      - gridcell "$11,125"
      - gridcell "Blocked"
      - gridcell "21%"
    - row "570 [UI-1570] Debug crash on mobile Safari (Sprint 24) 🐛 Bug Critical Sarah Johnson Sarah Johnson 4/17/2025 $125 In Progress 20%":
      - gridcell "570"
      - gridcell "[UI-1570] Debug crash on mobile Safari (Sprint 24)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "4/17/2025"
      - gridcell "$125"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "813 [INFRA-1813] Implement code splitting ⚡ Performance Critical Jessica Lopez Jessica Lopez 4/17/2025 $3,550 Done 100%":
      - gridcell "813"
      - gridcell "[INFRA-1813] Implement code splitting"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "4/17/2025"
      - gridcell "$3,550"
      - gridcell "Done"
      - gridcell "100%"
    - row "187 [WEB-1187] Write performance optimization tips 📝 Documentation Critical Jessica Lopez Jessica Lopez 4/17/2025 $9,250 In Progress 42%":
      - gridcell "187"
      - gridcell "[WEB-1187] Write performance optimization tips"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "4/17/2025"
      - gridcell "$9,250"
      - gridcell "In Progress"
      - gridcell "42%"
    - row "530 [DASH-1530] Fix broken unit tests in CI pipeline 🐛 Bug High Priya Sharma Priya Sharma 4/18/2025 $2,225 In Progress 55%":
      - gridcell "530"
      - gridcell "[DASH-1530] Fix broken unit tests in CI pipeline"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "4/18/2025"
      - gridcell "$2,225"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "23 [ADMIN-1023] Write migration guide for v2 (Q2 Planning) 📝 Documentation Critical Daniel Kim Daniel Kim 4/18/2025 $875 In Progress 57%":
      - gridcell "23"
      - gridcell "[ADMIN-1023] Write migration guide for v2 (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "4/18/2025"
      - gridcell "$875"
      - gridcell "In Progress"
      - gridcell "57%"
    - row "78 [PROJ-1078] Implement CSRF protection (Sprint 25) 🔒 Security Medium Kevin Zhang Kevin Zhang 4/18/2025 $100 Done 100%":
      - gridcell "78"
      - gridcell "[PROJ-1078] Implement CSRF protection (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "4/18/2025"
      - gridcell "$100"
      - gridcell "Done"
      - gridcell "100%"
    - row "873 [INFRA-1873] Write deployment guide (Sprint 25) 📝 Documentation Critical Maya Patel Maya Patel 4/19/2025 $2,775 Blocked 29%":
      - gridcell "873"
      - gridcell "[INFRA-1873] Write deployment guide (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "4/19/2025"
      - gridcell "$2,775"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "386 [API-1386] Add encryption at rest (Sprint 26) 🔒 Security High Ryan Thomas Ryan Thomas 4/19/2025 $3,400 Blocked 30%":
      - gridcell "386"
      - gridcell "[API-1386] Add encryption at rest (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "4/19/2025"
      - gridcell "$3,400"
      - gridcell "Blocked"
      - gridcell "30%"
    - row "537 [USER-1537] Resolve memory leak in data grid (Sprint 23) 🐛 Bug Critical Ryan Thomas Ryan Thomas 4/20/2025 $8,600 Done 100%":
      - gridcell "537"
      - gridcell "[USER-1537] Resolve memory leak in data grid (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "4/20/2025"
      - gridcell "$8,600"
      - gridcell "Done"
      - gridcell "100%"
    - row "761 [DASH-1761] Add encryption at rest (Security Audit) 🔒 Security Critical Olivia Brown Olivia Brown 4/20/2025 $9,425 Blocked 29%":
      - gridcell "761"
      - gridcell "[DASH-1761] Add encryption at rest (Security Audit)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "4/20/2025"
      - gridcell "$9,425"
      - gridcell "Blocked"
      - gridcell "29%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,252,150 45%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,252,150"
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
  61 |     expect(consoleErrors).toHaveLength(0);
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
> 78 |     await expect(filterDialog).toBeVisible();
     |                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
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