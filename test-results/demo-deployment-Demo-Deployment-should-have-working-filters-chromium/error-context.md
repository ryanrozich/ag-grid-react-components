# Test info

- Name: Demo Deployment >> should have working filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:69:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-header-cell:has-text(\'Status\') .ag-header-cell-menu-button')
    - locator resolved to <span data-ref="eMenu" aria-hidden="true" class="ag-header-icon ag-header-cell-menu-button ag-header-menu-icon ag-header-menu-always-show">…</span>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="ag-status-bar">…</div> intercepts pointer events
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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:73:8
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
- paragraph: $4,053,600
- img
- paragraph: Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $2,175,308
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
    - row "[DASH-1801] Refactor authentication flow (Security Audit) ♻️ Refactor Critical Alex Chen Alex Chen 8/14/2025 $5,950 Todo 17% $1,012 $4,938":
      - gridcell "[DASH-1801] Refactor authentication flow (Security Audit)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/14/2025"
      - gridcell "$5,950"
      - gridcell "Todo"
      - gridcell "17%"
      - gridcell "$1,012"
      - gridcell "$4,938"
    - row "[USER-1049] Update to React 18 patterns (Sprint 24) ♻️ Refactor Critical Priya Sharma Priya Sharma 8/13/2025 $7,900 Testing 86% $6,794 $1,106":
      - gridcell "[USER-1049] Update to React 18 patterns (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/13/2025"
      - gridcell "$7,900"
      - gridcell "Testing"
      - gridcell "86%"
      - gridcell "$6,794"
      - gridcell "$1,106"
    - row "[FRONTEND-1300] Add encryption at rest (Sprint 25) 🔒 Security High Emily Jackson Emily Jackson 8/15/2025 $375 In Progress 30% $113 $262":
      - gridcell "[FRONTEND-1300] Add encryption at rest (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/15/2025"
      - gridcell "$375"
      - gridcell "In Progress"
      - gridcell "30%"
      - gridcell "$113"
      - gridcell "$262"
    - row "[UI-1153] Implement auto-scaling 🔧 DevOps Medium Kevin Zhang Kevin Zhang 8/24/2025 $850 In Review 60% $510 $340":
      - gridcell "[UI-1153] Implement auto-scaling"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/24/2025"
      - gridcell "$850"
      - gridcell "In Review"
      - gridcell "60%"
      - gridcell "$510"
      - gridcell "$340"
    - row "[CORE-1172] Resolve CORS issue with external API (Performance Sprint) 🐛 Bug Critical Amanda White Amanda White 8/10/2025 $5,325 In Review 67% $3,568 $1,757":
      - gridcell "[CORE-1172] Resolve CORS issue with external API (Performance Sprint)"
      - gridcell "🐛 Bug"
      - gridcell "Critical"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/10/2025"
      - gridcell "$5,325"
      - gridcell "In Review"
      - gridcell "67%"
      - gridcell "$3,568"
      - gridcell "$1,757"
    - row "[DASH-1280] Write component snapshot tests (Sprint 25) 🧪 Testing Critical Maya Patel Maya Patel 8/12/2025 $2,075 In Progress 49% $1,017 $1,058":
      - gridcell "[DASH-1280] Write component snapshot tests (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "Critical"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/12/2025"
      - gridcell "$2,075"
      - gridcell "In Progress"
      - gridcell "49%"
      - gridcell "$1,017"
      - gridcell "$1,058"
    - row "[API-1601] Write API contract tests (Sprint 25) 🧪 Testing Low Michael Anderson Michael Anderson 9/16/2025 $825 Todo 17% $140 $685":
      - gridcell "[API-1601] Write API contract tests (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "Low"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/16/2025"
      - gridcell "$825"
      - gridcell "Todo"
      - gridcell "17%"
      - gridcell "$140"
      - gridcell "$685"
    - row "[USER-1568] Implement virtual scrolling (Q1 Goals) ⚡ Performance Low Sophia Taylor Sophia Taylor 9/6/2025 $375 In Review 61% $229 $146":
      - gridcell "[USER-1568] Implement virtual scrolling (Q1 Goals)"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/6/2025"
      - gridcell "$375"
      - gridcell "In Review"
      - gridcell "61%"
      - gridcell "$229"
      - gridcell "$146"
    - row "[PROJ-1677] Implement code splitting (Sprint 25) ⚡ Performance Medium James Wilson James Wilson 8/22/2025 $2,500 Todo 18% $450 $2,050":
      - gridcell "[PROJ-1677] Implement code splitting (Sprint 25)"
      - gridcell "⚡ Performance"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/22/2025"
      - gridcell "$2,500"
      - gridcell "Todo"
      - gridcell "18%"
      - gridcell "$450"
      - gridcell "$2,050"
    - row "[AUTH-1803] Configure CDN distribution (Sprint 25) 🔧 DevOps Low Priya Sharma Priya Sharma 8/28/2025 $4,625 In Progress 28% $1,295 $3,330":
      - gridcell "[AUTH-1803] Configure CDN distribution (Sprint 25)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/28/2025"
      - gridcell "$4,625"
      - gridcell "In Progress"
      - gridcell "28%"
      - gridcell "$1,295"
      - gridcell "$3,330"
    - row "[BACKEND-1979] Write accessibility tests (Performance Sprint) 🧪 Testing High David Lee David Lee 8/13/2025 $4,300 Testing 84% $3,612 $688":
      - gridcell "[BACKEND-1979] Write accessibility tests (Performance Sprint)"
      - gridcell "🧪 Testing"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/13/2025"
      - gridcell "$4,300"
      - gridcell "Testing"
      - gridcell "84%"
      - gridcell "$3,612"
      - gridcell "$688"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,053,600 46% $1,878,292 $2,175,308":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,053,600"
      - gridcell
      - gridcell "46%"
      - gridcell "$1,878,292"
      - gridcell "$2,175,308"
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
>  73 |       .click();
      |        ^ Error: locator.click: Test timeout of 30000ms exceeded.
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