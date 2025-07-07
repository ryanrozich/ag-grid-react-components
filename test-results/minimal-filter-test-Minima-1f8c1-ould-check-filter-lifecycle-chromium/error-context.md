# Test info

- Name: Minimal Filter Test >> should check filter lifecycle
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/minimal-filter-test.spec.ts:4:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/minimal-filter-test.spec.ts:15:16
```

# Page snapshot

```yaml
- text: "[plugin:vite:import-analysis] Failed to resolve import \"../../components/ActiveFilters/ActiveFilters\" from \"src/demo/examples/BasicPresetExample.tsx\". Does the file exist? /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/src/demo/examples/BasicPresetExample.tsx:4:26 18 | import { useState, useMemo } from \"react\"; 19 | import { AgGridReact } from \"ag-grid-react\"; 20 | import ActiveFilters from \"../../components/ActiveFilters/ActiveFilters\"; | ^ 21 | import { generateRowData } from \"../data/generator\"; 22 | import \"../styles/demo.css\"; at TransformPluginContext._formatLog (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42499:41) at TransformPluginContext.error (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42496:16) at normalizeUrl (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40475:23) at process.processTicksAndRejections (node:internal/process/task_queues:105:5) at async file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40594:37 at async Promise.all (index 5) at async TransformPluginContext.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40521:7) at async EnvironmentPluginContainer.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42294:18) at async loadAndTransform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:35735:27) at async viteTransformMiddleware (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:37250:24 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```

# Test source

```ts
   1 | import { test } from "@playwright/test";
   2 |
   3 | test.describe("Minimal Filter Test", () => {
   4 |   test("should check filter lifecycle", async ({ page }) => {
   5 |     // Enable ALL console logging
   6 |     const logs: string[] = [];
   7 |     page.on("console", (msg) => {
   8 |       logs.push(msg.text());
   9 |     });
  10 |
  11 |     // Navigate to the demo page
  12 |     await page.goto("/demo");
  13 |
  14 |     // Wait for grid to be ready
> 15 |     await page.waitForSelector(".ag-root-wrapper");
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  16 |     await page.waitForTimeout(1000);
  17 |
  18 |     // Clear logs before setting filter
  19 |     logs.length = 0;
  20 |
  21 |     // Set a filter and observe what happens
  22 |     await page.evaluate(async () => {
  23 |       const api = window.agGridApi;
  24 |       if (!api) return;
  25 |
  26 |       console.log("=== BEFORE SETTING FILTER MODEL ===");
  27 |
  28 |       const filterModel = {
  29 |         dueDate: {
  30 |           mode: "relative",
  31 |           type: "equals",
  32 |           expressionFrom: "Today",
  33 |         },
  34 |       };
  35 |
  36 |       console.log("=== CALLING setFilterModel ===");
  37 |       api.setFilterModel(filterModel);
  38 |
  39 |       console.log("=== CALLING onFilterChanged ===");
  40 |       api.onFilterChanged();
  41 |
  42 |       console.log("=== DONE ===");
  43 |     });
  44 |
  45 |     // Wait for any async operations
  46 |     await page.waitForTimeout(1000);
  47 |
  48 |     // Print all logs
  49 |     console.log("\n=== CAPTURED LOGS ===");
  50 |     logs.forEach((log) => console.log(log));
  51 |
  52 |     // Check if setModel was called
  53 |     const wasSetModelCalled = logs.some((log) =>
  54 |       log.includes("setModel called"),
  55 |     );
  56 |     console.log("\nWas setModel called?", wasSetModelCalled);
  57 |
  58 |     // Check if new component was instantiated
  59 |     const newComponentCreated = logs.some(
  60 |       (log) =>
  61 |         log.includes("Component instantiated") &&
  62 |         logs.indexOf(log) > logs.findIndex((l) => l.includes("BEFORE SETTING")),
  63 |     );
  64 |     console.log("Was new component created?", newComponentCreated);
  65 |   });
  66 | });
  67 |
```