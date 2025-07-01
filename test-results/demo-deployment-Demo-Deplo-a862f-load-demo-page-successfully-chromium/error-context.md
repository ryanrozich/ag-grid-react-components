# Test info

- Name: Demo Deployment >> should load demo page successfully
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:14:3

# Error details

```
Error: expect.toContainText: Error: strict mode violation: locator('h1') resolved to 2 elements:
    1) <h1 class="text-2xl font-bold">AG Grid React Components</h1> aka getByRole('heading', { name: 'AG Grid React Components' })
    2) <h1 class="text-2xl font-semibold text-white">Project Tasks</h1> aka getByRole('heading', { name: 'Project Tasks' })

Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('h1')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:19:38
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
- paragraph: $4,365,175
- img
- paragraph: Progress
- paragraph: 46.4%
- img
- paragraph: Budget Remaining
- paragraph: $2,331,954
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
    - row "500 [DATA-1500] Correct data corruption in cache layer (Sprint 23) 🐛 Bug Low James Wilson James Wilson 9/5/2025 $350 Blocked 39%":
      - gridcell "500"
      - gridcell "[DATA-1500] Correct data corruption in cache layer (Sprint 23)"
      - gridcell "🐛 Bug"
      - gridcell "Low"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/5/2025"
      - gridcell "$350"
      - gridcell "Blocked"
      - gridcell "39%"
    - row "721 [WEB-1721] Implement lazy loading (Q1 Goals) ⚡ Performance Low Maya Patel Maya Patel 9/25/2025 $250 In Progress 50%":
      - gridcell "721"
      - gridcell "[WEB-1721] Implement lazy loading (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "9/25/2025"
      - gridcell "$250"
      - gridcell "In Progress"
      - gridcell "50%"
    - row "254 [WEB-1254] Set up vulnerability scanning (Q2 Planning) 🔒 Security Critical Olivia Brown Olivia Brown 8/13/2025 $375 In Progress 43%":
      - gridcell "254"
      - gridcell "[WEB-1254] Set up vulnerability scanning (Q2 Planning)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/13/2025"
      - gridcell "$375"
      - gridcell "In Progress"
      - gridcell "43%"
    - row "580 [PROJ-1580] Implement OAuth integration (Performance Sprint) ✨ Feature Critical Jessica Lopez Jessica Lopez 8/15/2025 $17,275 Backlog 0%":
      - gridcell "580"
      - gridcell "[PROJ-1580] Implement OAuth integration (Performance Sprint)"
      - gridcell "✨ Feature"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/15/2025"
      - gridcell "$17,275"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "375 [API-1375] Test mobile responsiveness (Sprint 25) 🧪 Testing High Maya Patel Maya Patel 8/19/2025 $350 In Review 70%":
      - gridcell "375"
      - gridcell "[API-1375] Test mobile responsiveness (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/19/2025"
      - gridcell "$350"
      - gridcell "In Review"
      - gridcell "70%"
    - row "141 [ADMIN-1141] Create deployment rollback 🔧 DevOps High Isabella Garcia Isabella Garcia 8/15/2025 $800 Testing 80%":
      - gridcell "141"
      - gridcell "[ADMIN-1141] Create deployment rollback"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/15/2025"
      - gridcell "$800"
      - gridcell "Testing"
      - gridcell "80%"
    - row "347 [DATA-1347] Update API documentation (Sprint 26) 📝 Documentation Medium Daniel Kim Daniel Kim 8/21/2025 $6,375 In Progress 44%":
      - gridcell "347"
      - gridcell "[DATA-1347] Update API documentation (Sprint 26)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/21/2025"
      - gridcell "$6,375"
      - gridcell "In Progress"
      - gridcell "44%"
    - row "568 [APP-1568] Configure CDN distribution (Sprint 27) 🔧 DevOps Critical David Lee David Lee 8/11/2025 $75 Testing 80%":
      - gridcell "568"
      - gridcell "[APP-1568] Configure CDN distribution (Sprint 27)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/11/2025"
      - gridcell "$75"
      - gridcell "Testing"
      - gridcell "80%"
    - row "709 [DASH-1709] Modernize legacy jQuery code (Q1 Goals) ♻️ Refactor High Isabella Garcia Isabella Garcia 8/13/2025 $19,575 In Progress 39%":
      - gridcell "709"
      - gridcell "[DASH-1709] Modernize legacy jQuery code (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/13/2025"
      - gridcell "$19,575"
      - gridcell "In Progress"
      - gridcell "39%"
    - row "736 [APP-1736] Add brute force protection (Sprint 24) 🔒 Security Low Daniel Kim Daniel Kim 8/23/2025 $3,050 Backlog 0%":
      - gridcell "736"
      - gridcell "[APP-1736] Add brute force protection (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "Low"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/23/2025"
      - gridcell "$3,050"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "891 [PROJ-1891] Implement lazy loading (Sprint 25) ⚡ Performance Critical Chris Martinez Chris Martinez 8/10/2025 $3,975 In Progress 40%":
      - gridcell "891"
      - gridcell "[PROJ-1891] Implement lazy loading (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/10/2025"
      - gridcell "$3,975"
      - gridcell "In Progress"
      - gridcell "40%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,365,175 46%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,365,175"
      - gridcell
      - gridcell "46%"
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
>  19 |     await expect(page.locator("h1")).toContainText("Project Tasks");
      |                                      ^ Error: expect.toContainText: Error: strict mode violation: locator('h1') resolved to 2 elements:
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
   59 |     await expect(clientTab).toBeVisible();
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
```