# Test info

- Name: Simple Filter Test >> should filter data when DateFilter is initialized with model
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/simple-filter-test.spec.ts:4:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/simple-filter-test.spec.ts:21:16
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
   3 | test.describe("Simple Filter Test", () => {
   4 |   test("should filter data when DateFilter is initialized with model", async ({
   5 |     page,
   6 |   }) => {
   7 |     // Enable console logging
   8 |     page.on("console", (msg) => {
   9 |       if (
   10 |         msg.text().includes("[DateFilter]") ||
   11 |         msg.text().includes("Row count")
   12 |       ) {
   13 |         console.log("BROWSER:", msg.text());
   14 |       }
   15 |     });
   16 |
   17 |     // Navigate to the demo page
   18 |     await page.goto("/demo");
   19 |
   20 |     // Wait for grid to be ready
>  21 |     await page.waitForSelector(".ag-root-wrapper");
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   22 |     await page.waitForTimeout(1000);
   23 |
   24 |     // Get initial row count and set a simple filter
   25 |     const result = await page.evaluate(async () => {
   26 |       const api = window.agGridApi;
   27 |       if (!api) return { error: "No API found" };
   28 |
   29 |       const initialRowCount = api.getDisplayedRowCount();
   30 |       console.log("Row count before filter:", initialRowCount);
   31 |
   32 |       // Get some sample dates from the grid
   33 |       const sampleDates: string[] = [];
   34 |       api.forEachNode((node, index) => {
   35 |         if (index < 5 && node.data && node.data.dueDate) {
   36 |           sampleDates.push(new Date(node.data.dueDate).toISOString());
   37 |         }
   38 |       });
   39 |
   40 |       // Set a filter for "Today" (which should match no rows since data is in the future)
   41 |       const filterModel = {
   42 |         dueDate: {
   43 |           mode: "relative",
   44 |           type: "equals",
   45 |           expressionFrom: "Today",
   46 |         },
   47 |       };
   48 |
   49 |       console.log("Setting filter model:", JSON.stringify(filterModel));
   50 |       api.setFilterModel(filterModel);
   51 |
   52 |       // Force grid to refresh
   53 |       api.onFilterChanged();
   54 |
   55 |       // Wait a bit for React to update
   56 |       await new Promise((resolve) => setTimeout(resolve, 500));
   57 |
   58 |       const finalRowCount = api.getDisplayedRowCount();
   59 |       console.log("Row count after filter:", finalRowCount);
   60 |
   61 |       // Get filter instance info
   62 |       const filterInstance = await api.getColumnFilterInstance("dueDate");
   63 |       const filterInstanceInfo = {
   64 |         hasInstance: !!filterInstance,
   65 |         hasDoesFilterPass: typeof filterInstance?.doesFilterPass === "function",
   66 |         currentModel: filterInstance?.getModel
   67 |           ? filterInstance.getModel()
   68 |           : null,
   69 |       };
   70 |
   71 |       return {
   72 |         initialRowCount,
   73 |         finalRowCount,
   74 |         filterChanged: initialRowCount !== finalRowCount,
   75 |         sampleDates,
   76 |         filterInstanceInfo,
   77 |         currentFilterModel: api.getFilterModel(),
   78 |       };
   79 |     });
   80 |
   81 |     console.log("Test result:", JSON.stringify(result, null, 2));
   82 |
   83 |     // The filter should have changed the row count
   84 |     expect(result.filterChanged).toBe(true);
   85 |
   86 |     // Since we're filtering for "Today" and all data is in the future,
   87 |     // we expect 0 rows
   88 |     expect(result.finalRowCount).toBe(0);
   89 |   });
   90 |
   91 |   test("should show some rows when filtering for future dates", async ({
   92 |     page,
   93 |   }) => {
   94 |     // Navigate to the demo page
   95 |     await page.goto("/demo");
   96 |
   97 |     // Wait for grid to be ready
   98 |     await page.waitForSelector(".ag-root-wrapper");
   99 |     await page.waitForTimeout(1000);
  100 |
  101 |     // Set a filter for future dates
  102 |     const result = await page.evaluate(async () => {
  103 |       const api = window.agGridApi;
  104 |       if (!api) return { error: "No API found" };
  105 |
  106 |       const initialRowCount = api.getDisplayedRowCount();
  107 |
  108 |       // Set a filter for dates after today (should include all future dates)
  109 |       const filterModel = {
  110 |         dueDate: {
  111 |           mode: "relative",
  112 |           type: "after",
  113 |           expressionFrom: "Today",
  114 |           fromInclusive: false,
  115 |         },
  116 |       };
  117 |
  118 |       api.setFilterModel(filterModel);
  119 |       api.onFilterChanged();
  120 |
  121 |       await new Promise((resolve) => setTimeout(resolve, 500));
```