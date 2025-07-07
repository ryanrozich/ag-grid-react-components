# Test info

- Name: Server-Side Demo >> should display correct column headers for server-side
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo.spec.ts:52:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Server-Side Data")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo.spec.ts:56:16
```

# Page snapshot

```yaml
- text: "[plugin:vite:import-analysis] Failed to resolve import \"../../components/ActiveFilters/ActiveFilters\" from \"src/demo/examples/RealWorldExamples.tsx\". Does the file exist? /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/src/demo/examples/RealWorldExamples.tsx:6:26 20 | import { Tab, Tabs, TabList, TabPanel } from \"react-tabs\"; 21 | import \"react-tabs/style/react-tabs.css\"; 22 | import ActiveFilters from \"../../components/ActiveFilters/ActiveFilters\"; | ^ 23 | import QuickFilterDropdown from \"../../components/QuickFilterDropdown/QuickFilterDropdown\"; 24 | import styles from \"./Examples.module.css\"; at TransformPluginContext._formatLog (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42499:41) at TransformPluginContext.error (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42496:16) at normalizeUrl (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40475:23) at process.processTicksAndRejections (node:internal/process/task_queues:105:5) at async file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40594:37 at async Promise.all (index 7) at async TransformPluginContext.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40521:7) at async EnvironmentPluginContainer.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42294:18) at async loadAndTransform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:35735:27) at async viteTransformMiddleware (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:37250:24 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Server-Side Demo", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto("http://localhost:5173/demo");
   6 |   });
   7 |
   8 |   test("should switch to server-side tab without errors", async ({ page }) => {
   9 |     // Start monitoring console errors
   10 |     const consoleErrors: string[] = [];
   11 |     page.on("console", (msg) => {
   12 |       if (msg.type() === "error") {
   13 |         consoleErrors.push(msg.text());
   14 |       }
   15 |     });
   16 |
   17 |     // Click on server-side tab
   18 |     await page.click('button:has-text("Server-Side Data")');
   19 |
   20 |     // Wait for the server-side demo to load
   21 |     await page.waitForSelector('text="Server-Side Row Model Demo"', {
   22 |       timeout: 5000,
   23 |     });
   24 |
   25 |     // Check that no console errors occurred
   26 |     expect(consoleErrors).toHaveLength(0);
   27 |   });
   28 |
   29 |   test("should load server-side data correctly", async ({ page }) => {
   30 |     // Switch to server-side tab
   31 |     await page.click('button:has-text("Server-Side Data")');
   32 |
   33 |     // Wait for the demo to load
   34 |     await page.waitForSelector('text="Server-Side Row Model Demo"');
   35 |
   36 |     // Check that the API health check shows
   37 |     await expect(page.locator('text="API Status:"')).toBeVisible();
   38 |
   39 |     // Check that the grid is rendered
   40 |     const grid = page.locator(".ag-root-wrapper");
   41 |     await expect(grid).toBeVisible();
   42 |
   43 |     // Wait for data to load (look for task IDs)
   44 |     await page.waitForSelector('[col-id="taskId"]', { timeout: 10000 });
   45 |
   46 |     // Verify that data rows are present
   47 |     const rows = page.locator(".ag-row");
   48 |     const rowCount = await rows.count();
   49 |     expect(rowCount).toBeGreaterThan(0);
   50 |   });
   51 |
   52 |   test("should display correct column headers for server-side", async ({
   53 |     page,
   54 |   }) => {
   55 |     // Switch to server-side tab
>  56 |     await page.click('button:has-text("Server-Side Data")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
   57 |
   58 |     // Wait for the grid to load
   59 |     await page.waitForSelector(".ag-header-cell");
   60 |
   61 |     // Check for server-side specific column headers
   62 |     await expect(
   63 |       page.locator('.ag-header-cell-text:has-text("Task ID")'),
   64 |     ).toBeVisible();
   65 |     await expect(
   66 |       page.locator('.ag-header-cell-text:has-text("Title")'),
   67 |     ).toBeVisible();
   68 |     await expect(
   69 |       page.locator('.ag-header-cell-text:has-text("Budget")'),
   70 |     ).toBeVisible();
   71 |     await expect(
   72 |       page.locator('.ag-header-cell-text:has-text("Spent")'),
   73 |     ).toBeVisible();
   74 |   });
   75 |
   76 |   test("should not show agTotalAndFilteredRowCountComponent error", async ({
   77 |     page,
   78 |   }) => {
   79 |     // Monitor for specific AG Grid error
   80 |     let hasSpecificError = false;
   81 |     page.on("console", (msg) => {
   82 |       if (
   83 |         msg.type() === "error" &&
   84 |         msg.text().includes("agTotalAndFilteredRowCountComponent")
   85 |       ) {
   86 |         hasSpecificError = true;
   87 |       }
   88 |     });
   89 |
   90 |     // Switch to server-side tab
   91 |     await page.click('button:has-text("Server-Side Data")');
   92 |
   93 |     // Wait for the grid to render
   94 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 5000 });
   95 |
   96 |     // Give it a moment to ensure any errors would have fired
   97 |     await page.waitForTimeout(1000);
   98 |
   99 |     // Check that the specific error did not occur
  100 |     expect(hasSpecificError).toBe(false);
  101 |   });
  102 |
  103 |   test("should handle search functionality", async ({ page }) => {
  104 |     // Switch to server-side tab
  105 |     await page.click('button:has-text("Server-Side Data")');
  106 |
  107 |     // Wait for the search input
  108 |     const searchInput = page.locator(
  109 |       'input[placeholder="Search all columns..."]',
  110 |     );
  111 |     await expect(searchInput).toBeVisible();
  112 |
  113 |     // Type in search
  114 |     await searchInput.fill("bug");
  115 |
  116 |     // Wait for the grid to update (debounced)
  117 |     await page.waitForTimeout(500);
  118 |
  119 |     // Verify that results are filtered
  120 |     await expect(page.locator('text="results"')).toBeVisible();
  121 |   });
  122 |
  123 |   test("should display server stats", async ({ page }) => {
  124 |     // Switch to server-side tab
  125 |     await page.click('button:has-text("Server-Side Data")');
  126 |
  127 |     // Wait for stats to load
  128 |     await page.waitForSelector('text="Total Tasks"');
  129 |
  130 |     // Check that all stats are displayed
  131 |     await expect(page.locator('text="Total Tasks"')).toBeVisible();
  132 |     await expect(page.locator('text="Total Budget"')).toBeVisible();
  133 |     await expect(page.locator('text="Average Progress"')).toBeVisible();
  134 |     await expect(page.locator('text="Budget Remaining"')).toBeVisible();
  135 |   });
  136 | });
  137 |
```