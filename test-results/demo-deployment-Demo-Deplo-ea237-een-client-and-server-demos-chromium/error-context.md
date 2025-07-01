# Test info

- Name: Demo Deployment >> should switch between client and server demos
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:54:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('button:has-text(\'Client-Side Demo\')')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('button:has-text(\'Client-Side Demo\')')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:59:29
```

# Page snapshot

```yaml
- banner:
  - heading "AG Grid React Components" [level=1]
  - navigation:
    - link "Home":
      - /url: /ag-grid-react-components-pr-17
    - link "Demo":
      - /url: /ag-grid-react-components-pr-17/demo
    - link "Docs":
      - /url: /ag-grid-react-components-pr-17/docs
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
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $3,935,675
- img
- paragraph: Progress
- paragraph: 48.6%
- img
- paragraph: Budget Remaining
- paragraph: $2,057,676
- text: 1 to 25 of 1,001. Page 1 of 41
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
    - row "425 [UI-1425] Modernize legacy jQuery code (Security Audit) ♻️ Refactor High Isabella Garcia Isabella Garcia 8/27/2025 $16,050 In Review 78%":
      - gridcell "425"
      - gridcell "[UI-1425] Modernize legacy jQuery code (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/27/2025"
      - gridcell "$16,050"
      - gridcell "In Review"
      - gridcell "78%"
    - row "388 [INFRA-1388] Optimize render performance (Sprint 23) ⚡ Performance High Daniel Kim Daniel Kim 8/18/2025 $6,325 Todo 12%":
      - gridcell "388"
      - gridcell "[INFRA-1388] Optimize render performance (Sprint 23)"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/18/2025"
      - gridcell "$6,325"
      - gridcell "Todo"
      - gridcell "12%"
    - row "432 [WEB-1432] Document error handling patterns (Sprint 26) 📝 Documentation Critical Amanda White Amanda White 8/14/2025 $550 In Progress 56%":
      - gridcell "432"
      - gridcell "[WEB-1432] Document error handling patterns (Sprint 26)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/14/2025"
      - gridcell "$550"
      - gridcell "In Progress"
      - gridcell "56%"
    - row "625 [AUTH-1625] Create user profile dashboard ✨ Feature Medium Amanda White Amanda White 8/18/2025 $11,050 In Review 78%":
      - gridcell "625"
      - gridcell "[AUTH-1625] Create user profile dashboard"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/18/2025"
      - gridcell "$11,050"
      - gridcell "In Review"
      - gridcell "78%"
    - row "27 [UI-1027] Set up log aggregation (Sprint 24) 🔧 DevOps Critical David Lee David Lee 8/11/2025 $5,050 Todo 9%":
      - gridcell "27"
      - gridcell "[UI-1027] Set up log aggregation (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/11/2025"
      - gridcell "$5,050"
      - gridcell "Todo"
      - gridcell "9%"
    - row "903 [FRONTEND-1903] Add progressive web app features (Q1 Goals) ⚡ Performance Low James Wilson James Wilson 9/6/2025 $5,475 In Progress 45%":
      - gridcell "903"
      - gridcell "[FRONTEND-1903] Add progressive web app features (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/6/2025"
      - gridcell "$5,475"
      - gridcell "In Progress"
      - gridcell "45%"
    - row "183 [CORE-1183] Implement CSRF protection (Sprint 23) 🔒 Security Medium David Lee David Lee 8/10/2025 $6,550 Testing 86%":
      - gridcell "183"
      - gridcell "[CORE-1183] Implement CSRF protection (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/10/2025"
      - gridcell "$6,550"
      - gridcell "Testing"
      - gridcell "86%"
    - row "867 [CORE-1867] Document new filter components (Q2 Planning) 📝 Documentation Low Olivia Brown Olivia Brown 9/8/2025 $725 In Progress 27%":
      - gridcell "867"
      - gridcell "[CORE-1867] Document new filter components (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/8/2025"
      - gridcell "$725"
      - gridcell "In Progress"
      - gridcell "27%"
    - row "895 [APP-1895] Extract shared utilities module (Q2 Planning) ♻️ Refactor Medium Ryan Thomas Ryan Thomas 8/21/2025 $3,225 Todo 8%":
      - gridcell "895"
      - gridcell "[APP-1895] Extract shared utilities module (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/21/2025"
      - gridcell "$3,225"
      - gridcell "Todo"
      - gridcell "8%"
    - row "309 [UI-1309] Build analytics dashboard (Q1 Goals) ✨ Feature Medium Olivia Brown Olivia Brown 8/17/2025 $650 In Progress 33%":
      - gridcell "309"
      - gridcell "[UI-1309] Build analytics dashboard (Q1 Goals)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/17/2025"
      - gridcell "$650"
      - gridcell "In Progress"
      - gridcell "33%"
    - row "558 [FRONTEND-1558] Write accessibility tests (Tech Debt) 🧪 Testing Medium Emma Davis Emma Davis 8/16/2025 $4,025 Todo 6%":
      - gridcell "558"
      - gridcell "[FRONTEND-1558] Write accessibility tests (Tech Debt)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/16/2025"
      - gridcell "$4,025"
      - gridcell "Todo"
      - gridcell "6%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$3,935,675 49%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$3,935,675"
      - gridcell
      - gridcell "49%"
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
- text: For Trial Use Only
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Demo Deployment", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Get the demo URL from environment variable or use default
   6 |     const demoUrl = process.env.DEMO_URL || "http://localhost:3000";
   7 |     // Navigate to the demo page, not the landing page
   8 |     const demoDashboardUrl = demoUrl.endsWith("/") 
   9 |       ? `${demoUrl}demo` 
   10 |       : `${demoUrl}/demo`;
   11 |     await page.goto(demoDashboardUrl);
   12 |   });
   13 |
   14 |   test("should load demo page successfully", async ({ page }) => {
   15 |     // Check that the page loads without errors
   16 |     await expect(page).toHaveTitle(/AG Grid React Components/);
   17 |
   18 |     // Check for main heading
   19 |     await expect(page.locator("h1")).toContainText("Project Tasks");
   20 |   });
   21 |
   22 |   test("should load all assets correctly", async ({ page }) => {
   23 |     // Listen for any failed requests
   24 |     const failedRequests: string[] = [];
   25 |
   26 |     page.on("requestfailed", (request) => {
   27 |       failedRequests.push(`${request.failure()?.errorText}: ${request.url()}`);
   28 |     });
   29 |
   30 |     // Wait for the page to be fully loaded
   31 |     await page.waitForLoadState("networkidle");
   32 |
   33 |     // Check that no requests failed
   34 |     expect(failedRequests).toHaveLength(0);
   35 |   });
   36 |
   37 |   test("should display stats cards", async ({ page }) => {
   38 |     // Check for stats cards
   39 |     await expect(page.locator("text=Number of Tasks")).toBeVisible();
   40 |     await expect(page.locator("text=Total Budget")).toBeVisible();
   41 |     await expect(page.locator("text=Progress")).toBeVisible();
   42 |     await expect(page.locator("text=Budget Remaining")).toBeVisible();
   43 |   });
   44 |
   45 |   test("should render AG Grid", async ({ page }) => {
   46 |     // Wait for AG Grid to be rendered
   47 |     await page.waitForSelector(".ag-root-wrapper");
   48 |
   49 |     // Check that grid has rendered with data
   50 |     const gridRows = await page.locator(".ag-row").count();
   51 |     expect(gridRows).toBeGreaterThan(0);
   52 |   });
   53 |
   54 |   test("should switch between client and server demos", async ({ page }) => {
   55 |     // Check for demo tabs
   56 |     const clientTab = page.locator("button:has-text('Client-Side Demo')");
   57 |     const serverTab = page.locator("button:has-text('Server-Side Demo')");
   58 |
>  59 |     await expect(clientTab).toBeVisible();
      |                             ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   60 |     await expect(serverTab).toBeVisible();
   61 |
   62 |     // Switch to server-side demo
   63 |     await serverTab.click();
   64 |
   65 |     // Check for server-side demo banner
   66 |     await expect(page.locator("text=Server-Side Row Model Demo")).toBeVisible();
   67 |   });
   68 |
   69 |   test("should have working filters", async ({ page }) => {
   70 |     // Open filter menu for status column
   71 |     await page
   72 |       .locator(".ag-header-cell:has-text('Status') .ag-header-cell-menu-button")
   73 |       .click();
   74 |
   75 |     // Check that filter menu appears
   76 |     await expect(page.locator(".ag-menu")).toBeVisible();
   77 |   });
   78 |
   79 |   test("should load React DatePicker when opening date filter", async ({
   80 |     page,
   81 |   }) => {
   82 |     // Open filter for Due Date column
   83 |     await page
   84 |       .locator(
   85 |         ".ag-header-cell:has-text('Due Date') .ag-header-cell-menu-button",
   86 |       )
   87 |       .click();
   88 |
   89 |     // Wait for filter to load
   90 |     await page.waitForSelector(".ag-filter");
   91 |
   92 |     // Check that date filter is rendered
   93 |     await expect(page.locator(".ag-filter")).toBeVisible();
   94 |   });
   95 | });
   96 |
   97 | // Deployment-specific tests
   98 | test.describe("Deployment Validation", () => {
   99 |   test("should have correct base path for assets", async ({ page }) => {
  100 |     const demoUrl = process.env.DEMO_URL || "http://localhost:3000";
  101 |
  102 |     // Extract base path from URL
  103 |     const url = new URL(demoUrl);
  104 |     const expectedBasePath = url.pathname.endsWith("/")
  105 |       ? url.pathname
  106 |       : url.pathname + "/";
  107 |
  108 |     // Navigate to demo page
  109 |     const demoDashboardUrl = demoUrl.endsWith("/") 
  110 |       ? `${demoUrl}demo` 
  111 |       : `${demoUrl}/demo`;
  112 |     await page.goto(demoDashboardUrl);
  113 |
  114 |     // Check that CSS and JS assets are loaded from correct path
  115 |     const cssLinks = await page.locator('link[rel="stylesheet"]').all();
  116 |     const scriptTags = await page.locator("script[src]").all();
  117 |
  118 |     for (const link of cssLinks) {
  119 |       const href = await link.getAttribute("href");
  120 |       if (href && !href.startsWith("http")) {
  121 |         expect(href).toMatch(
  122 |           new RegExp(`^${expectedBasePath.replace(/\//g, "\\/")}assets`),
  123 |         );
  124 |       }
  125 |     }
  126 |
  127 |     for (const script of scriptTags) {
  128 |       const src = await script.getAttribute("src");
  129 |       if (src && !src.startsWith("http")) {
  130 |         expect(src).toMatch(
  131 |           new RegExp(`^${expectedBasePath.replace(/\//g, "\\/")}assets`),
  132 |         );
  133 |       }
  134 |     }
  135 |   });
  136 | });
  137 |
```