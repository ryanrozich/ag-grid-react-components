# Test info

- Name: Demo Deployment >> should load demo page successfully
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/demo-deployment.spec.ts:14:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

Locator: locator(':root')
Expected pattern: /AG Grid React Components/
Received string:  "OpenMemory - Developer Dashboard"
Call log:
  - expect.toHaveTitle with timeout 5000ms
  - waiting for locator(':root')
    9 × locator resolved to <html lang="en" class="dark">…</html>
      - unexpected value "OpenMemory - Developer Dashboard"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/demo-deployment.spec.ts:16:24
```

# Page snapshot

```yaml
- banner:
  - link "OpenMemory OpenMemory":
    - /url: /
    - img "OpenMemory"
    - text: OpenMemory
  - link "Dashboard":
    - /url: /
    - button "Dashboard"
  - link "Memories":
    - /url: /memories
    - button "Memories"
  - link "Apps":
    - /url: /apps
    - button "Apps":
      - img
      - text: Apps
  - link "Settings":
    - /url: /settings
    - button "Settings":
      - img
      - text: Settings
  - button "Refresh":
    - img
    - text: Refresh
  - button "Create Memory":
    - img
    - text: Create Memory
- heading "404 Page Not Found" [level=1]
- button "Go Home":
  - link "Go Home":
    - /url: /
- region "Notifications (F8)":
  - list
- alert
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
>  16 |     await expect(page).toHaveTitle(/AG Grid React Components/);
      |                        ^ Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)
   17 |
   18 |     // Check for main heading - be more specific to avoid multiple matches
   19 |     await expect(page.locator("h1.text-2xl.font-semibold")).toContainText(
   20 |       "Project Tasks",
   21 |     );
   22 |   });
   23 |
   24 |   test("should load all assets correctly", async ({ page }) => {
   25 |     // Listen for any failed requests
   26 |     const failedRequests: string[] = [];
   27 |
   28 |     page.on("requestfailed", (request) => {
   29 |       failedRequests.push(`${request.failure()?.errorText}: ${request.url()}`);
   30 |     });
   31 |
   32 |     // Wait for the page to be fully loaded
   33 |     await page.waitForLoadState("networkidle");
   34 |
   35 |     // Check that no requests failed
   36 |     expect(failedRequests).toHaveLength(0);
   37 |   });
   38 |
   39 |   test("should display stats cards", async ({ page }) => {
   40 |     // Check for stats cards - use more specific selectors
   41 |     await expect(
   42 |       page.locator("p").filter({ hasText: "Number of Tasks" }),
   43 |     ).toBeVisible();
   44 |     await expect(
   45 |       page.locator("p").filter({ hasText: "Total Budget" }),
   46 |     ).toBeVisible();
   47 |     await expect(
   48 |       page.locator("p").filter({ hasText: /^Progress$/ }),
   49 |     ).toBeVisible();
   50 |     await expect(
   51 |       page.locator("p").filter({ hasText: "Budget Remaining" }),
   52 |     ).toBeVisible();
   53 |   });
   54 |
   55 |   test("should render AG Grid", async ({ page }) => {
   56 |     // Wait for AG Grid to be rendered
   57 |     await page.waitForSelector(".ag-root-wrapper");
   58 |
   59 |     // Check that grid has rendered with data
   60 |     const gridRows = await page.locator(".ag-row").count();
   61 |     expect(gridRows).toBeGreaterThan(0);
   62 |   });
   63 |
   64 |   test("should switch between client and server demos", async ({ page }) => {
   65 |     // Check for demo tabs - match actual button text
   66 |     const clientTab = page.locator("button:has-text('Client-Side Data')");
   67 |     const serverTab = page.locator("button:has-text('Server-Side Data')");
   68 |
   69 |     await expect(clientTab).toBeVisible();
   70 |     await expect(serverTab).toBeVisible();
   71 |
   72 |     // Switch to server-side demo
   73 |     await serverTab.click();
   74 |
   75 |     // Check for server-side demo banner
   76 |     await expect(page.locator("text=Server-Side Row Model Demo")).toBeVisible();
   77 |   });
   78 |
   79 |   test("should have working filters", async ({ page }) => {
   80 |     // Open filter menu for status column
   81 |     await page
   82 |       .locator(".ag-header-cell:has-text('Status') .ag-header-cell-menu-button")
   83 |       .click();
   84 |
   85 |     // Check that filter menu appears
   86 |     await expect(page.locator(".ag-menu")).toBeVisible();
   87 |   });
   88 |
   89 |   test("should load React DatePicker when opening date filter", async ({
   90 |     page,
   91 |   }) => {
   92 |     // Open filter for Due Date column
   93 |     await page
   94 |       .locator(
   95 |         ".ag-header-cell:has-text('Due Date') .ag-header-cell-menu-button",
   96 |       )
   97 |       .click();
   98 |
   99 |     // Wait for filter to load
  100 |     await page.waitForSelector(".ag-filter");
  101 |
  102 |     // Check that date filter is rendered
  103 |     await expect(page.locator(".ag-filter")).toBeVisible();
  104 |   });
  105 | });
  106 |
  107 | // Deployment-specific tests
  108 | test.describe("Deployment Validation", () => {
  109 |   test("should have correct base path for assets", async ({ page }) => {
  110 |     const demoUrl = process.env.DEMO_URL || "http://localhost:3000";
  111 |
  112 |     // Extract base path from URL
  113 |     const url = new URL(demoUrl);
  114 |     const expectedBasePath = url.pathname.endsWith("/")
  115 |       ? url.pathname
  116 |       : url.pathname + "/";
```