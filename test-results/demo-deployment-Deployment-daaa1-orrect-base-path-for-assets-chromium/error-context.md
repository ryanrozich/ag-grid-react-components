# Test info

- Name: Deployment Validation >> should have correct base path for assets
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:95:3

# Error details

```
Error: page.goto: net::ERR_TIMED_OUT at https://demo.rozich.net/ag-grid-react-components-pr-17/
Call log:
  - navigating to "https://demo.rozich.net/ag-grid-react-components-pr-17/", waiting until "load"

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/demo-deployment.spec.ts:104:16
```

# Test source

```ts
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Get the demo URL from environment variable or use default
   6 |     const demoUrl = process.env.DEMO_URL || "http://localhost:3000";
   7 |     await page.goto(demoUrl);
   8 |   });
   9 |
   10 |   test("should load demo page successfully", async ({ page }) => {
   11 |     // Check that the page loads without errors
   12 |     await expect(page).toHaveTitle(/AG Grid React Components/);
   13 |
   14 |     // Check for main heading
   15 |     await expect(page.locator("h1")).toContainText("Project Tasks");
   16 |   });
   17 |
   18 |   test("should load all assets correctly", async ({ page }) => {
   19 |     // Listen for any failed requests
   20 |     const failedRequests: string[] = [];
   21 |
   22 |     page.on("requestfailed", (request) => {
   23 |       failedRequests.push(`${request.failure()?.errorText}: ${request.url()}`);
   24 |     });
   25 |
   26 |     // Wait for the page to be fully loaded
   27 |     await page.waitForLoadState("networkidle");
   28 |
   29 |     // Check that no requests failed
   30 |     expect(failedRequests).toHaveLength(0);
   31 |   });
   32 |
   33 |   test("should display stats cards", async ({ page }) => {
   34 |     // Check for stats cards
   35 |     await expect(page.locator("text=Number of Tasks")).toBeVisible();
   36 |     await expect(page.locator("text=Total Budget")).toBeVisible();
   37 |     await expect(page.locator("text=Progress")).toBeVisible();
   38 |     await expect(page.locator("text=Budget Remaining")).toBeVisible();
   39 |   });
   40 |
   41 |   test("should render AG Grid", async ({ page }) => {
   42 |     // Wait for AG Grid to be rendered
   43 |     await page.waitForSelector(".ag-root-wrapper");
   44 |
   45 |     // Check that grid has rendered with data
   46 |     const gridRows = await page.locator(".ag-row").count();
   47 |     expect(gridRows).toBeGreaterThan(0);
   48 |   });
   49 |
   50 |   test("should switch between client and server demos", async ({ page }) => {
   51 |     // Check for demo tabs
   52 |     const clientTab = page.locator("button:has-text('Client-Side Demo')");
   53 |     const serverTab = page.locator("button:has-text('Server-Side Demo')");
   54 |
   55 |     await expect(clientTab).toBeVisible();
   56 |     await expect(serverTab).toBeVisible();
   57 |
   58 |     // Switch to server-side demo
   59 |     await serverTab.click();
   60 |
   61 |     // Check for server-side demo banner
   62 |     await expect(page.locator("text=Server-Side Row Model Demo")).toBeVisible();
   63 |   });
   64 |
   65 |   test("should have working filters", async ({ page }) => {
   66 |     // Open filter menu for status column
   67 |     await page
   68 |       .locator(".ag-header-cell:has-text('Status') .ag-header-cell-menu-button")
   69 |       .click();
   70 |
   71 |     // Check that filter menu appears
   72 |     await expect(page.locator(".ag-menu")).toBeVisible();
   73 |   });
   74 |
   75 |   test("should load React DatePicker when opening date filter", async ({
   76 |     page,
   77 |   }) => {
   78 |     // Open filter for Due Date column
   79 |     await page
   80 |       .locator(
   81 |         ".ag-header-cell:has-text('Due Date') .ag-header-cell-menu-button",
   82 |       )
   83 |       .click();
   84 |
   85 |     // Wait for filter to load
   86 |     await page.waitForSelector(".ag-filter");
   87 |
   88 |     // Check that date filter is rendered
   89 |     await expect(page.locator(".ag-filter")).toBeVisible();
   90 |   });
   91 | });
   92 |
   93 | // Deployment-specific tests
   94 | test.describe("Deployment Validation", () => {
   95 |   test("should have correct base path for assets", async ({ page }) => {
   96 |     const demoUrl = process.env.DEMO_URL || "http://localhost:3000";
   97 |
   98 |     // Extract base path from URL
   99 |     const url = new URL(demoUrl);
  100 |     const expectedBasePath = url.pathname.endsWith("/")
  101 |       ? url.pathname
  102 |       : url.pathname + "/";
  103 |
> 104 |     await page.goto(demoUrl);
      |                ^ Error: page.goto: net::ERR_TIMED_OUT at https://demo.rozich.net/ag-grid-react-components-pr-17/
  105 |
  106 |     // Check that CSS and JS assets are loaded from correct path
  107 |     const cssLinks = await page.locator('link[rel="stylesheet"]').all();
  108 |     const scriptTags = await page.locator("script[src]").all();
  109 |
  110 |     for (const link of cssLinks) {
  111 |       const href = await link.getAttribute("href");
  112 |       if (href && !href.startsWith("http")) {
  113 |         expect(href).toMatch(
  114 |           new RegExp(`^${expectedBasePath.replace(/\//g, "\\/")}assets`),
  115 |         );
  116 |       }
  117 |     }
  118 |
  119 |     for (const script of scriptTags) {
  120 |       const src = await script.getAttribute("src");
  121 |       if (src && !src.startsWith("http")) {
  122 |         expect(src).toMatch(
  123 |           new RegExp(`^${expectedBasePath.replace(/\//g, "\\/")}assets`),
  124 |         );
  125 |       }
  126 |     }
  127 |   });
  128 | });
  129 |
```