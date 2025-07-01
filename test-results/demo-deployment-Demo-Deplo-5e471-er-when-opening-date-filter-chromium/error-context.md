# Test info

- Name: Demo Deployment >> should load React DatePicker when opening date filter
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:79:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-header-cell:has-text(\'Due Date\') .ag-header-cell-menu-button')
    - locator resolved to <span data-ref="eMenu" aria-hidden="true" class="ag-header-icon ag-header-cell-menu-button ag-header-menu-icon ag-header-menu-always-show">…</span>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="ag-watermark ag-opacity-zero">…</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="px-6 py-5">…</div> from <div class="border-b border-gray-700/50 bg-gray-900/30">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="ag-status-bar">…</div> intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="ag-37" class="ag-paging-panel ag-unselectable ag-focus-managed">…</div> intercepts pointer events
  13 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="px-6 py-5">…</div> from <div class="border-b border-gray-700/50 bg-gray-900/30">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="ag-status-bar">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="ag-37" class="ag-paging-panel ag-unselectable ag-focus-managed">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="ag-37" class="ag-paging-panel ag-unselectable ag-focus-managed">…</div> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="px-6 py-5">…</div> from <div class="border-b border-gray-700/50 bg-gray-900/30">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="ag-status-bar">…</div> intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div id="ag-37" class="ag-paging-panel ag-unselectable ag-focus-managed">…</div> intercepts pointer events
  - retrying click action
    - waiting 500ms

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:87:8
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
- paragraph: $4,125,500
- img
- paragraph: Progress
- paragraph: 44.3%
- img
- paragraph: Budget Remaining
- paragraph: $2,313,821
- text: 1 to 25 of 1,001. Page 1 of 41
- grid:
  - rowgroup:
    - row "Task Name Category Priority Assignee Due Date Budget Status Progress Spent Remaining":
      - columnheader "Task Name"
      - columnheader "Category"
      - columnheader "Priority"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "Budget"
      - columnheader "Status"
      - columnheader "Progress"
      - columnheader "Spent"
      - columnheader "Remaining"
  - rowgroup:
    - row "[AUTH-1414] Create batch operations feature (Sprint 23) ✨ Feature Medium Maya Patel Maya Patel 8/22/2025 $4,425 Todo 5% $221 $4,204":
      - gridcell "[AUTH-1414] Create batch operations feature (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/22/2025"
      - gridcell "$4,425"
      - gridcell "Todo"
      - gridcell "5%"
      - gridcell "$221"
      - gridcell "$4,204"
    - row "[FRONTEND-1433] Configure CDN distribution (Q1 Goals) 🔧 DevOps High Olivia Brown Olivia Brown 8/22/2025 $400 Backlog 0% $0 $400":
      - gridcell "[FRONTEND-1433] Configure CDN distribution (Q1 Goals)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/22/2025"
      - gridcell "$400"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
      - gridcell "$400"
    - row "[PROJ-1567] Debug WebSocket connection timeout (Performance Sprint) 🐛 Bug Medium Emma Davis Emma Davis 8/21/2025 $2,125 In Progress 30% $638 $1,487":
      - gridcell "[PROJ-1567] Debug WebSocket connection timeout (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/21/2025"
      - gridcell "$2,125"
      - gridcell "In Progress"
      - gridcell "30%"
      - gridcell "$638"
      - gridcell "$1,487"
    - row "[CORE-1705] Update README with examples 📝 Documentation Medium Isabella Garcia Isabella Garcia 8/28/2025 $11,500 In Progress 49% $5,635 $5,865":
      - gridcell "[CORE-1705] Update README with examples"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/28/2025"
      - gridcell "$11,500"
      - gridcell "In Progress"
      - gridcell "49%"
      - gridcell "$5,635"
      - gridcell "$5,865"
    - row "[USER-1374] Create deployment rollback (Sprint 26) 🔧 DevOps Medium Jessica Lopez Jessica Lopez 8/26/2025 $975 In Review 74% $722 $253":
      - gridcell "[USER-1374] Create deployment rollback (Sprint 26)"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/26/2025"
      - gridcell "$975"
      - gridcell "In Review"
      - gridcell "74%"
      - gridcell "$722"
      - gridcell "$253"
    - row "[APP-1837] Optimize database queries ♻️ Refactor High Ryan Thomas Ryan Thomas 8/18/2025 $800 Todo 9% $72 $728":
      - gridcell "[APP-1837] Optimize database queries"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/18/2025"
      - gridcell "$800"
      - gridcell "Todo"
      - gridcell "9%"
      - gridcell "$72"
      - gridcell "$728"
    - row "[INFRA-1956] Migrate to new testing framework (Q2 Planning) ♻️ Refactor Critical Priya Sharma Priya Sharma 8/12/2025 $14,600 Backlog 0% $0 $14,600":
      - gridcell "[INFRA-1956] Migrate to new testing framework (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/12/2025"
      - gridcell "$14,600"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
      - gridcell "$14,600"
    - row "[ADMIN-1271] Refactor state management (Sprint 23) ♻️ Refactor Critical John Robinson John Robinson 8/12/2025 $7,075 Todo 13% $920 $6,155":
      - gridcell "[ADMIN-1271] Refactor state management (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/12/2025"
      - gridcell "$7,075"
      - gridcell "Todo"
      - gridcell "13%"
      - gridcell "$920"
      - gridcell "$6,155"
    - row "[APP-1371] Optimize database queries (Q1 Goals) ♻️ Refactor High Ryan Thomas Ryan Thomas 8/12/2025 $2,775 Backlog 0% $0 $2,775":
      - gridcell "[APP-1371] Optimize database queries (Q1 Goals)"
      - gridcell "♻️ Refactor"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/12/2025"
      - gridcell "$2,775"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
      - gridcell "$2,775"
    - row "[DASH-1583] Consolidate duplicate code ♻️ Refactor Low Daniel Kim Daniel Kim 9/5/2025 $400 Todo 5% $20 $380":
      - gridcell "[DASH-1583] Consolidate duplicate code"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "9/5/2025"
      - gridcell "$400"
      - gridcell "Todo"
      - gridcell "5%"
      - gridcell "$20"
      - gridcell "$380"
    - row "[AUTH-1752] Add E2E tests for checkout flow 🧪 Testing Critical James Wilson James Wilson 8/12/2025 $1,625 Backlog 0% $0 $1,625":
      - gridcell "[AUTH-1752] Add E2E tests for checkout flow"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/12/2025"
      - gridcell "$1,625"
      - gridcell "Backlog"
      - gridcell "0%"
      - gridcell "$0"
      - gridcell "$1,625"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,125,500 44% $1,811,679 $2,313,821":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,125,500"
      - gridcell
      - gridcell "44%"
      - gridcell "$1,811,679"
      - gridcell "$2,313,821"
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
>  87 |       .click();
      |        ^ Error: locator.click: Test timeout of 30000ms exceeded.
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