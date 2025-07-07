# Test info

- Name: Server-Side Demo Fixed >> should handle search functionality in server-side mode
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo-fixed.spec.ts:115:3

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Server-Side Data")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo-fixed.spec.ts:119:16
```

# Page snapshot

```yaml
- text: "[plugin:vite:import-analysis] Failed to resolve import \"../../components/ActiveFilters/ActiveFilters\" from \"src/demo/examples/CustomUIExample.tsx\". Does the file exist? /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/src/demo/examples/CustomUIExample.tsx:4:26 18 | import { useState, useCallback } from \"react\"; 19 | import { AgGridReact } from \"ag-grid-react\"; 20 | import ActiveFilters from \"../../components/ActiveFilters/ActiveFilters\"; | ^ 21 | import { generateRowData } from \"../data/generator\"; 22 | import styles from \"./Examples.module.css\"; at TransformPluginContext._formatLog (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42499:41) at TransformPluginContext.error (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42496:16) at normalizeUrl (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40475:23) at process.processTicksAndRejections (node:internal/process/task_queues:105:5) at async file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40594:37 at async Promise.all (index 5) at async TransformPluginContext.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40521:7) at async EnvironmentPluginContainer.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42294:18) at async loadAndTransform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:35735:27) at async viteTransformMiddleware (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:37250:24 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```

# Test source

```ts
   19 |           !text.includes("License Key Not Found") &&
   20 |           !text.includes("***")
   21 |         ) {
   22 |           criticalErrors.push(text);
   23 |         }
   24 |       }
   25 |     });
   26 |
   27 |     // Click on server-side tab
   28 |     await page.click('button:has-text("Server-Side Data")');
   29 |
   30 |     // Wait for the server-side demo to load
   31 |     await page.waitForLoadState("networkidle");
   32 |     await page.waitForTimeout(1000); // Give time for any errors to surface
   33 |
   34 |     // Check that no critical console errors occurred
   35 |     expect(criticalErrors).toHaveLength(0);
   36 |   });
   37 |
   38 |   test("should render server-side demo components", async ({ page }) => {
   39 |     // Switch to server-side tab
   40 |     await page.click('button:has-text("Server-Side Data")');
   41 |
   42 |     // Check that the banner is visible
   43 |     await expect(page.locator('text="Server-Side Row Model Demo"')).toBeVisible(
   44 |       { timeout: 10000 },
   45 |     );
   46 |
   47 |     // Check that the API status is shown
   48 |     await expect(page.locator('text="API Status:"')).toBeVisible();
   49 |
   50 |     // Check that stats are displayed
   51 |     await expect(page.locator('text="Total Tasks"')).toBeVisible();
   52 |     await expect(page.locator('text="Total Budget"')).toBeVisible();
   53 |   });
   54 |
   55 |   test("should display the AG Grid with server-side data", async ({ page }) => {
   56 |     // Switch to server-side tab
   57 |     await page.click('button:has-text("Server-Side Data")');
   58 |
   59 |     // Wait for the grid to be visible
   60 |     const grid = page.locator(".ag-root-wrapper");
   61 |     await expect(grid).toBeVisible({ timeout: 10000 });
   62 |
   63 |     // Check that headers are visible
   64 |     await expect(page.locator(".ag-header-row")).toBeVisible();
   65 |
   66 |     // Check for specific server-side headers
   67 |     await expect(
   68 |       page.locator('.ag-header-cell-text:has-text("Task ID")'),
   69 |     ).toBeVisible();
   70 |     await expect(
   71 |       page.locator('.ag-header-cell-text:has-text("Title")'),
   72 |     ).toBeVisible();
   73 |
   74 |     // Wait for data rows to appear
   75 |     await page.waitForSelector(".ag-row", { timeout: 10000 });
   76 |
   77 |     // Verify data is loaded
   78 |     const rows = await page.locator(".ag-row").count();
   79 |     expect(rows).toBeGreaterThan(0);
   80 |   });
   81 |
   82 |   test("should not have incompatible status bar components", async ({
   83 |     page,
   84 |   }) => {
   85 |     // Monitor for specific AG Grid warnings
   86 |     let hasIncompatibleComponents = false;
   87 |     page.on("console", (msg) => {
   88 |       if (msg.type() === "warning") {
   89 |         const text = msg.text();
   90 |         if (
   91 |           text.includes("agTotalAndFilteredRowCountComponent") ||
   92 |           text.includes(
   93 |             "agTotalRowCountComponent should only be used with the client side",
   94 |           ) ||
   95 |           text.includes(
   96 |             "agFilteredRowCountComponent should only be used with the client side",
   97 |           )
   98 |         ) {
   99 |           hasIncompatibleComponents = true;
  100 |         }
  101 |       }
  102 |     });
  103 |
  104 |     // Switch to server-side tab
  105 |     await page.click('button:has-text("Server-Side Data")');
  106 |
  107 |     // Wait for the grid to render
  108 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
  109 |     await page.waitForTimeout(1000);
  110 |
  111 |     // Verify no incompatible components were used
  112 |     expect(hasIncompatibleComponents).toBe(false);
  113 |   });
  114 |
  115 |   test("should handle search functionality in server-side mode", async ({
  116 |     page,
  117 |   }) => {
  118 |     // Switch to server-side tab
> 119 |     await page.click('button:has-text("Server-Side Data")');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
  120 |
  121 |     // Wait for search input
  122 |     const searchInput = page.locator(
  123 |       'input[placeholder="Search all columns..."]',
  124 |     );
  125 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  126 |
  127 |     // Type a search term
  128 |     await searchInput.fill("bug");
  129 |
  130 |     // Wait for debounce and check results
  131 |     await page.waitForTimeout(500);
  132 |
  133 |     // Verify search is working by checking for results indicator
  134 |     await expect(page.locator('text="results"')).toBeVisible();
  135 |   });
  136 |
  137 |   test("server-side data should be different from client-side", async ({
  138 |     page,
  139 |   }) => {
  140 |     // First check client-side headers
  141 |     await page.waitForSelector(".ag-header-cell-text");
  142 |     const clientHeaders = await page
  143 |       .locator(".ag-header-cell-text")
  144 |       .allTextContents();
  145 |
  146 |     // Switch to server-side
  147 |     await page.click('button:has-text("Server-Side Data")');
  148 |     await page.waitForTimeout(1000);
  149 |
  150 |     // Check server-side headers
  151 |     await page.waitForSelector(".ag-header-cell-text");
  152 |     const serverHeaders = await page
  153 |       .locator(".ag-header-cell-text")
  154 |       .allTextContents();
  155 |
  156 |     // Headers should be different (Task ID vs ID, Title vs Task, etc.)
  157 |     expect(serverHeaders).toContain("Task ID");
  158 |     expect(serverHeaders).toContain("Title");
  159 |     expect(clientHeaders).not.toContain("Task ID");
  160 |     expect(clientHeaders).not.toContain("Title");
  161 |   });
  162 | });
  163 |
```