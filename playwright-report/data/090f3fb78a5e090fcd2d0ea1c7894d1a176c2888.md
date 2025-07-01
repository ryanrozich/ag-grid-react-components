# Test info

- Name: Navigation between pages >> should maintain grid state when staying on demo page
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:78:3

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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:92:32
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
- paragraph: $4,199,275
- img
- paragraph: Progress
- paragraph: 46.8%
- img
- paragraph: Budget Remaining
- paragraph: $2,182,758
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
    - row "659 [CORE-1659] Write deployment guide (Sprint 27) 📝 Documentation Critical Marcus Williams Marcus Williams 4/12/2025 $7,075 Done 100%":
      - gridcell "659"
      - gridcell "[CORE-1659] Write deployment guide (Sprint 27)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "4/12/2025"
      - gridcell "$7,075"
      - gridcell "Done"
      - gridcell "100%"
    - row "675 [PROJ-1675] Implement API key rotation (Performance Sprint) 🔒 Security Critical David Lee David Lee 4/15/2025 $13,300 In Progress 55%":
      - gridcell "675"
      - gridcell "[PROJ-1675] Implement API key rotation (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "4/15/2025"
      - gridcell "$13,300"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "662 [API-1662] Add SQL injection prevention 🔒 Security Medium James Wilson James Wilson 4/15/2025 $425 In Progress 46%":
      - gridcell "662"
      - gridcell "[API-1662] Add SQL injection prevention"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/15/2025"
      - gridcell "$425"
      - gridcell "In Progress"
      - gridcell "46%"
    - row "378 [BACKEND-1378] Correct CSS overflow in sidebar (Security Audit) 🐛 Bug Critical Alex Chen Alex Chen 4/16/2025 $2,575 Done 100%":
      - gridcell "378"
      - gridcell "[BACKEND-1378] Correct CSS overflow in sidebar (Security Audit)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "4/16/2025"
      - gridcell "$2,575"
      - gridcell "Done"
      - gridcell "100%"
    - row "992 [API-1992] Implement service workers (Sprint 25) ⚡ Performance Critical Marcus Williams Marcus Williams 4/16/2025 $275 Blocked 10%":
      - gridcell "992"
      - gridcell "[API-1992] Implement service workers (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "4/16/2025"
      - gridcell "$275"
      - gridcell "Blocked"
      - gridcell "10%"
    - row "129 [ADMIN-1129] Add brute force protection (Sprint 26) 🔒 Security High Emma Davis Emma Davis 4/16/2025 $2,250 Done 100%":
      - gridcell "129"
      - gridcell "[ADMIN-1129] Add brute force protection (Sprint 26)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "4/16/2025"
      - gridcell "$2,250"
      - gridcell "Done"
      - gridcell "100%"
    - row "224 [PROJ-1224] Write component snapshot tests (Tech Debt) 🧪 Testing High Kevin Zhang Kevin Zhang 4/16/2025 $4,625 Blocked 26%":
      - gridcell "224"
      - gridcell "[PROJ-1224] Write component snapshot tests (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "4/16/2025"
      - gridcell "$4,625"
      - gridcell "Blocked"
      - gridcell "26%"
    - row "226 [ADMIN-1226] Test offline functionality (Security Audit) 🧪 Testing Critical Chris Martinez Chris Martinez 4/17/2025 $4,525 Blocked 21%":
      - gridcell "226"
      - gridcell "[ADMIN-1226] Test offline functionality (Security Audit)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "4/17/2025"
      - gridcell "$4,525"
      - gridcell "Blocked"
      - gridcell "21%"
    - row "650 [API-1650] Debug crash on mobile Safari (Sprint 26) 🐛 Bug High Olivia Brown Olivia Brown 4/18/2025 $875 Blocked 13%":
      - gridcell "650"
      - gridcell "[API-1650] Debug crash on mobile Safari (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "4/18/2025"
      - gridcell "$875"
      - gridcell "Blocked"
      - gridcell "13%"
    - row "647 [DASH-1647] Write deployment guide (Performance Sprint) 📝 Documentation Critical Kevin Zhang Kevin Zhang 4/18/2025 $17,400 Done 100%":
      - gridcell "647"
      - gridcell "[DASH-1647] Write deployment guide (Performance Sprint)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "4/18/2025"
      - gridcell "$17,400"
      - gridcell "Done"
      - gridcell "100%"
    - row "236 [MOBILE-1236] Configure security headers (Q2 Planning) 🔒 Security Medium Chris Martinez Chris Martinez 4/18/2025 $5,750 Blocked 15%":
      - gridcell "236"
      - gridcell "[MOBILE-1236] Configure security headers (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "4/18/2025"
      - gridcell "$5,750"
      - gridcell "Blocked"
      - gridcell "15%"
    - row "246 [AUTH-1246] Set up CI/CD pipeline (Sprint 27) 🔧 DevOps Critical James Wilson James Wilson 4/19/2025 $16,125 In Progress 45%":
      - gridcell "246"
      - gridcell "[AUTH-1246] Set up CI/CD pipeline (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/19/2025"
      - gridcell "$16,125"
      - gridcell "In Progress"
      - gridcell "45%"
    - row "518 [APP-1518] Implement code splitting (Sprint 27) ⚡ Performance Critical Emily Jackson Emily Jackson 4/19/2025 $12,600 Blocked 24%":
      - gridcell "518"
      - gridcell "[APP-1518] Implement code splitting (Sprint 27)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "4/19/2025"
      - gridcell "$12,600"
      - gridcell "Blocked"
      - gridcell "24%"
    - row "707 [UI-1707] Fix broken unit tests in CI pipeline (Q1 Goals) 🐛 Bug High Alex Chen Alex Chen 4/19/2025 $5,400 Blocked 32%":
      - gridcell "707"
      - gridcell "[UI-1707] Fix broken unit tests in CI pipeline (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "4/19/2025"
      - gridcell "$5,400"
      - gridcell "Blocked"
      - gridcell "32%"
    - row "886 [INFRA-1886] Implement secure file upload (Sprint 27) 🔒 Security Critical Priya Sharma Priya Sharma 4/20/2025 $1,275 In Progress 56%":
      - gridcell "886"
      - gridcell "[INFRA-1886] Implement secure file upload (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "4/20/2025"
      - gridcell "$1,275"
      - gridcell "In Progress"
      - gridcell "56%"
    - row "541 [API-1541] Document new filter components (Sprint 26) 📝 Documentation Critical Emily Jackson Emily Jackson 4/20/2025 $3,800 In Progress 38%":
      - gridcell "541"
      - gridcell "[API-1541] Document new filter components (Sprint 26)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "4/20/2025"
      - gridcell "$3,800"
      - gridcell "In Progress"
      - gridcell "38%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,199,275 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,199,275"
      - gridcell
      - gridcell "47%"
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