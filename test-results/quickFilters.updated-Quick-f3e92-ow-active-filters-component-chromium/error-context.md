# Test info

- Name: QuickFilterDropdown - Updated Tests >> should show active filters component
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.updated.spec.ts:110:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.updated.spec.ts:9:16
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
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("QuickFilterDropdown - Updated Tests", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for the grid to be ready
>  9 |     await page.waitForSelector(".ag-root-wrapper");
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   10 |     await page.waitForTimeout(1000); // Give time for data to load
   11 |   });
   12 |
   13 |   test("should have quick filter dropdowns visible", async ({ page }) => {
   14 |     // Look for quick filter dropdowns by their aria labels or button text
   15 |     const quickFilterButtons = await page
   16 |       .locator('button[aria-label*="Quick filter"]')
   17 |       .count();
   18 |
   19 |     // We should have at least one quick filter dropdown
   20 |     expect(quickFilterButtons).toBeGreaterThan(0);
   21 |
   22 |     // Alternative: look for the specific dropdown containers
   23 |     const dropdownContainers = await page
   24 |       .locator('[data-testid="quick-filter-dropdown"]')
   25 |       .count();
   26 |
   27 |     if (dropdownContainers > 0) {
   28 |       expect(dropdownContainers).toBeGreaterThan(0);
   29 |     } else {
   30 |       // If no data-testid, look for buttons with dropdown indicators
   31 |       const dropdownButtons = await page
   32 |         .locator("button:has(svg)")
   33 |         .filter({ hasText: /All Time|All Tasks|Today|This Week/ })
   34 |         .count();
   35 |       expect(dropdownButtons).toBeGreaterThan(0);
   36 |     }
   37 |   });
   38 |
   39 |   test("should open date quick filter dropdown", async ({ page }) => {
   40 |     // Find the first quick filter that looks like a date filter
   41 |     const dateFilterButton = page
   42 |       .locator("button")
   43 |       .filter({ hasText: /All Time|Today|This Week|Last/ })
   44 |       .first();
   45 |
   46 |     // Check if it exists
   47 |     const exists = (await dateFilterButton.count()) > 0;
   48 |     if (!exists) {
   49 |       test.skip();
   50 |       return;
   51 |     }
   52 |
   53 |     // Click to open dropdown
   54 |     await dateFilterButton.click();
   55 |
   56 |     // Wait for dropdown to appear
   57 |     await page.waitForSelector('[role="listbox"]', { timeout: 5000 });
   58 |
   59 |     // Check that options are visible
   60 |     const options = await page.locator('[role="option"]').count();
   61 |     expect(options).toBeGreaterThan(0);
   62 |
   63 |     // Close dropdown by clicking outside
   64 |     await page.click("body", { position: { x: 0, y: 0 } });
   65 |   });
   66 |
   67 |   test("should filter grid when selecting date option", async ({ page }) => {
   68 |     // Get initial row count
   69 |     const initialRows = await page
   70 |       .locator(".ag-center-cols-container .ag-row")
   71 |       .count();
   72 |
   73 |     // Find date filter button
   74 |     const dateFilterButton = page
   75 |       .locator("button")
   76 |       .filter({ hasText: /All Time/ })
   77 |       .first();
   78 |     const exists = (await dateFilterButton.count()) > 0;
   79 |     if (!exists) {
   80 |       test.skip();
   81 |       return;
   82 |     }
   83 |
   84 |     // Open dropdown
   85 |     await dateFilterButton.click();
   86 |     await page.waitForSelector('[role="listbox"]');
   87 |
   88 |     // Select "Today" option if it exists
   89 |     const todayOption = page
   90 |       .locator('[role="option"]')
   91 |       .filter({ hasText: "Today" })
   92 |       .first();
   93 |     if ((await todayOption.count()) > 0) {
   94 |       await todayOption.click();
   95 |
   96 |       // Wait for grid to update
   97 |       await page.waitForTimeout(1000);
   98 |
   99 |       // Check that row count changed
  100 |       const filteredRows = await page
  101 |         .locator(".ag-center-cols-container .ag-row")
  102 |         .count();
  103 |       expect(filteredRows).toBeLessThanOrEqual(initialRows);
  104 |
  105 |       // Verify the button now shows "Today"
  106 |       await expect(dateFilterButton).toContainText("Today");
  107 |     }
  108 |   });
  109 |
```