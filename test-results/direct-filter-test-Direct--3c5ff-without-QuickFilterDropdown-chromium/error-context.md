# Test info

- Name: Direct Filter Test >> test filter directly without QuickFilterDropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/direct-filter-test.spec.ts:4:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/direct-filter-test.spec.ts:12:16
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
   3 | test.describe("Direct Filter Test", () => {
   4 |   test("test filter directly without QuickFilterDropdown", async ({ page }) => {
   5 |     page.on("console", (msg) => {
   6 |       if (msg.text().includes("[")) {
   7 |         console.log(msg.text());
   8 |       }
   9 |     });
  10 |
  11 |     await page.goto("/demo");
> 12 |     await page.waitForSelector(".ag-root-wrapper");
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  13 |     await page.waitForTimeout(1000);
  14 |
  15 |     // Get initial state
  16 |     const initial = await page.evaluate(() => {
  17 |       const api = window.agGridApi;
  18 |       return {
  19 |         rowCount: api?.getDisplayedRowCount(),
  20 |         filterModel: api?.getFilterModel(),
  21 |       };
  22 |     });
  23 |     console.log("Initial state:", initial);
  24 |
  25 |     // Apply filter directly via API
  26 |     const result = await page.evaluate(async () => {
  27 |       const api = window.agGridApi;
  28 |
  29 |       // Set filter model
  30 |       api?.setFilterModel({
  31 |         dueDate: {
  32 |           mode: "relative",
  33 |           type: "equals",
  34 |           expressionFrom: "Today",
  35 |         },
  36 |       });
  37 |
  38 |       // Wait a bit
  39 |       await new Promise((resolve) => setTimeout(resolve, 100));
  40 |
  41 |       // Get filter instance and manually call setModel
  42 |       const filterInstance = await api?.getColumnFilterInstance("dueDate");
  43 |       if (filterInstance && filterInstance.setModel) {
  44 |         await filterInstance.setModel({
  45 |           mode: "relative",
  46 |           type: "equals",
  47 |           expressionFrom: "Today",
  48 |         });
  49 |       }
  50 |
  51 |       // Trigger filter
  52 |       api?.onFilterChanged();
  53 |
  54 |       // Wait for filtering
  55 |       await new Promise((resolve) => setTimeout(resolve, 500));
  56 |
  57 |       return {
  58 |         rowCount: api?.getDisplayedRowCount(),
  59 |         filterModel: api?.getFilterModel(),
  60 |         hasActiveFilter: api?.isAnyFilterPresent(),
  61 |       };
  62 |     });
  63 |
  64 |     console.log("After filter:", result);
  65 |
  66 |     // The filter should have worked
  67 |     expect(result.rowCount || 0).toBeLessThan(initial.rowCount || 0);
  68 |     expect(result.hasActiveFilter).toBe(true);
  69 |
  70 |     // Check DOM after more waiting
  71 |     await page.waitForTimeout(1000);
  72 |
  73 |     const domRowCount = await page
  74 |       .locator(".ag-center-cols-container .ag-row")
  75 |       .count();
  76 |     console.log("DOM row count:", domRowCount);
  77 |   });
  78 | });
  79 |
```