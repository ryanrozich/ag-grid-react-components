# Test info

- Name: Debug QuickFilterDropdown >> should debug filter application
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/debug-quick-filter.spec.ts:4:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/debug-quick-filter.spec.ts:16:16
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
   1 | import { test } from "@playwright/test";
   2 |
   3 | test.describe("Debug QuickFilterDropdown", () => {
   4 |   test("should debug filter application", async ({ page }) => {
   5 |     // Enable console logging
   6 |     page.on("console", (msg) => {
   7 |       if (msg.type() === "log") {
   8 |         console.log("BROWSER LOG:", msg.text());
   9 |       }
   10 |     });
   11 |
   12 |     // Navigate to the demo page
   13 |     await page.goto("/demo");
   14 |
   15 |     // Wait for grid to be ready
>  16 |     await page.waitForSelector(".ag-root-wrapper");
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   17 |     await page.waitForTimeout(1000);
   18 |
   19 |     // Click on Quick Filter tab
   20 |     await page.click('button:has-text("Quick Filter")');
   21 |     await page.waitForTimeout(500);
   22 |
   23 |     // Get initial row count
   24 |     const initialRows = await page
   25 |       .locator(".ag-center-cols-container .ag-row")
   26 |       .count();
   27 |     console.log("Initial row count:", initialRows);
   28 |
   29 |     // Open the first dropdown
   30 |     await page
   31 |       .locator('[data-testid="quick-filter-dropdown"]')
   32 |       .first()
   33 |       .locator('button[aria-haspopup="listbox"]')
   34 |       .click();
   35 |     await page.waitForTimeout(500);
   36 |
   37 |     // Select "This Month" which should filter to only current month (June 2025)
   38 |     await page.click('[role="option"]:has-text("This Month")');
   39 |
   40 |     // Wait for filter to apply
   41 |     await page.waitForTimeout(2000);
   42 |
   43 |     // Get filtered row count
   44 |     const filteredRows = await page
   45 |       .locator(".ag-center-cols-container .ag-row")
   46 |       .count();
   47 |     console.log("Filtered row count:", filteredRows);
   48 |
   49 |     // Check if floating filter is visible
   50 |     const floatingFilterVisible = await page
   51 |       .locator(".ag-floating-filter")
   52 |       .first()
   53 |       .isVisible();
   54 |     console.log("Floating filter visible:", floatingFilterVisible);
   55 |
   56 |     // Check filter indicator
   57 |     const filterIndicator = await page
   58 |       .locator('[col-id="dueDate"] .ag-header-cell-filtered')
   59 |       .isVisible()
   60 |       .catch(() => false);
   61 |     console.log("Filter indicator visible:", filterIndicator);
   62 |
   63 |     // Get detailed info from the grid
   64 |     const gridInfo = await page.evaluate(() => {
   65 |       const api = window.agGridApi;
   66 |       if (!api) return { error: "No API found" };
   67 |
   68 |       const filterModel = api.getFilterModel();
   69 |       const rowCount = api.getDisplayedRowCount();
   70 |
   71 |       // Try to get the filter instance directly
   72 |       let filterInstance = null;
   73 |       try {
   74 |         filterInstance = api.getColumnFilterInstance("dueDate");
   75 |       } catch (e) {
   76 |         console.error("Error getting filter instance:", e);
   77 |       }
   78 |
   79 |       return {
   80 |         filterModel,
   81 |         rowCount,
   82 |         hasFilterInstance: !!filterInstance,
   83 |         filterInstanceType: filterInstance
   84 |           ? filterInstance.constructor.name
   85 |           : null,
   86 |       };
   87 |     });
   88 |     console.log("Grid info:", JSON.stringify(gridInfo, null, 2));
   89 |
   90 |     // Check if the test data has dates in the last 7 days
   91 |     const dateInfo = await page.evaluate(() => {
   92 |       const dates: any[] = [];
   93 |       const api = window.agGridApi;
   94 |       if (!api) return { error: "No API" };
   95 |
   96 |       // Get the raw data from the grid
   97 |       api.forEachNode((node) => {
   98 |         if (node.data && node.data.dueDate) {
   99 |           dates.push({
  100 |             raw: node.data.dueDate,
  101 |             formatted: new Date(node.data.dueDate).toLocaleDateString(),
  102 |             iso: new Date(node.data.dueDate).toISOString(),
  103 |           });
  104 |         }
  105 |       });
  106 |
  107 |       return dates.slice(0, 10); // First 10 rows
  108 |     });
  109 |     console.log("Date info from grid:", JSON.stringify(dateInfo, null, 2));
  110 |   });
  111 | });
  112 |
```