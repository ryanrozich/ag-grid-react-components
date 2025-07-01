# Test info

- Name: Demo Deployment >> should display stats cards
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:37:3

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('text=Progress') resolved to 7 elements:
    1) <p class="text-sm text-gray-400 mt-1">Manage and track your team's progress</p> aka getByText('Manage and track your team\'s')
    2) <p class="text-xs text-gray-500 uppercase tracking-wider">Progress</p> aka getByRole('paragraph').filter({ hasText: /^Progress$/ })
    3) <span data-ref="eText" class="ag-header-cell-text">Progress</span> aka getByRole('grid').getByText('Progress', { exact: true })
    4) <span class="px-3 py-1 rounded-full text-xs font-medium border bg-blue-500/20 text-blue-400 border-blue-500/50">In Progress</span> aka getByText('In Progress')
    5) <span data-ref="eText" aria-hidden="true" class="ag-column-drop-cell-text ag-column-drop-vertical-cell-text">avg(Progress)</span> aka getByText('avg(Progress)')
    6) <span data-ref="eTitle" class="ag-group-title ag-filter-toolpanel-group-title">Progress</span> aka getByText('Progress', { exact: true }).nth(2)
    7) <span data-ref="eFilterName" class="ag-header-cell-text">Progress</span> aka getByText('Progress', { exact: true }).nth(3)

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=Progress')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:41:49
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
- paragraph: $4,153,125
- img
- paragraph: Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $2,215,300
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
    - row "804 [USER-1804] Create user profile dashboard (Tech Debt) ✨ Feature High John Robinson John Robinson 8/20/2025 $15,600 In Review 63%":
      - gridcell "804"
      - gridcell "[USER-1804] Create user profile dashboard (Tech Debt)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/20/2025"
      - gridcell "$15,600"
      - gridcell "In Review"
      - gridcell "63%"
    - row "48 [AUTH-1048] Configure Docker containers (Tech Debt) 🔧 DevOps Medium Emily Jackson Emily Jackson 8/26/2025 $4,125 Backlog 0%":
      - gridcell "48"
      - gridcell "[AUTH-1048] Configure Docker containers (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/26/2025"
      - gridcell "$4,125"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "978 [DASH-1978] Implement CSRF protection 🔒 Security High Chris Martinez Chris Martinez 8/12/2025 $375 Todo 9%":
      - gridcell "978"
      - gridcell "[DASH-1978] Implement CSRF protection"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/12/2025"
      - gridcell "$375"
      - gridcell "Todo"
      - gridcell "9%"
    - row "64 [WEB-1064] Add export to PDF functionality (Sprint 23) ✨ Feature Medium Jessica Lopez Jessica Lopez 8/27/2025 $3,100 Backlog 0%":
      - gridcell "64"
      - gridcell "[WEB-1064] Add export to PDF functionality (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/27/2025"
      - gridcell "$3,100"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "357 [DASH-1357] Optimize bundle size ⚡ Performance Medium Sarah Johnson Sarah Johnson 8/26/2025 $8,375 Testing 94%":
      - gridcell "357"
      - gridcell "[DASH-1357] Optimize bundle size"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/26/2025"
      - gridcell "$8,375"
      - gridcell "Testing"
      - gridcell "94%"
    - row "762 [WEB-1762] Fix login form validation error (Sprint 26) 🐛 Bug Critical Chris Martinez Chris Martinez 8/8/2025 $9,350 Testing 86%":
      - gridcell "762"
      - gridcell "[WEB-1762] Fix login form validation error (Sprint 26)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/8/2025"
      - gridcell "$9,350"
      - gridcell "Testing"
      - gridcell "86%"
    - row "128 [DASH-1128] Write migration guide for v2 📝 Documentation High Daniel Kim Daniel Kim 8/14/2025 $400 In Progress 25%":
      - gridcell "128"
      - gridcell "[DASH-1128] Write migration guide for v2"
      - gridcell "📝 Documentation"
      - gridcell "High"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "8/14/2025"
      - gridcell "$400"
      - gridcell "In Progress"
      - gridcell "25%"
    - row "192 [BACKEND-1192] Optimize bundle size ⚡ Performance Medium Sarah Johnson Sarah Johnson 8/18/2025 $9,700 Backlog 0%":
      - gridcell "192"
      - gridcell "[BACKEND-1192] Optimize bundle size"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/18/2025"
      - gridcell "$9,700"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "222 [UI-1222] Implement rate limiting (Tech Debt) 🔒 Security Medium Emily Jackson Emily Jackson 8/12/2025 $3,175 Backlog 0%":
      - gridcell "222"
      - gridcell "[UI-1222] Implement rate limiting (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/12/2025"
      - gridcell "$3,175"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "597 [DATA-1597] Add database indexing ⚡ Performance High Sarah Johnson Sarah Johnson 8/10/2025 $3,700 Todo 10%":
      - gridcell "597"
      - gridcell "[DATA-1597] Add database indexing"
      - gridcell "⚡ Performance"
      - gridcell "High"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/10/2025"
      - gridcell "$3,700"
      - gridcell "Todo"
      - gridcell "10%"
    - row "680 [API-1680] Add performance benchmarks (Security Audit) 🧪 Testing Low Maya Patel Maya Patel 8/22/2025 $1,625 Backlog 0%":
      - gridcell "680"
      - gridcell "[API-1680] Add performance benchmarks (Security Audit)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/22/2025"
      - gridcell "$1,625"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,153,125 46%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,153,125"
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
>  41 |     await expect(page.locator("text=Progress")).toBeVisible();
      |                                                 ^ Error: expect.toBeVisible: Error: strict mode violation: locator('text=Progress') resolved to 7 elements:
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