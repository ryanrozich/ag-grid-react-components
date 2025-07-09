# Test info

- Name: Deployment Validation >> should have correct base path for assets
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/demo-deployment.spec.ts:109:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/demo
Call log:
  - navigating to "http://localhost:3000/demo", waiting until "load"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/demo-deployment.spec.ts:122:16
```

# Test source

```ts
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
  117 |
  118 |     // Navigate to demo page
  119 |     const demoDashboardUrl = demoUrl.endsWith("/")
  120 |       ? `${demoUrl}demo`
  121 |       : `${demoUrl}/demo`;
> 122 |     await page.goto(demoDashboardUrl);
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/demo
  123 |
  124 |     // Check that CSS and JS assets are loaded from correct path
  125 |     const cssLinks = await page.locator('link[rel="stylesheet"]').all();
  126 |     const scriptTags = await page.locator("script[src]").all();
  127 |
  128 |     for (const link of cssLinks) {
  129 |       const href = await link.getAttribute("href");
  130 |       if (href && !href.startsWith("http")) {
  131 |         const escapedPath = expectedBasePath.replace(
  132 |           /[.*+?^${}()|[\]\\]/g,
  133 |           "\\$&",
  134 |         );
  135 |         expect(href).toMatch(new RegExp(`^${escapedPath}assets`));
  136 |       }
  137 |     }
  138 |
  139 |     for (const script of scriptTags) {
  140 |       const src = await script.getAttribute("src");
  141 |       if (src && !src.startsWith("http")) {
  142 |         const escapedPath = expectedBasePath.replace(
  143 |           /[.*+?^${}()|[\]\\]/g,
  144 |           "\\$&",
  145 |         );
  146 |         expect(src).toMatch(new RegExp(`^${escapedPath}assets`));
  147 |       }
  148 |     }
  149 |   });
  150 | });
  151 |
```