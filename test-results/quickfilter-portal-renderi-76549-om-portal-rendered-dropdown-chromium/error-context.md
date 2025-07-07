# Test info

- Name: QuickFilterDropdown Portal Rendering >> should apply filter when option is selected from portal-rendered dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickfilter-portal-rendering.spec.ts:79:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickfilter-portal-rendering.spec.ts:11:16
```

# Page snapshot

```yaml
- text: "[plugin:vite:import-analysis] Failed to resolve import \"../../components/ActiveFilters/ActiveFilters\" from \"src/demo/examples/AdvancedPresetExample.tsx\". Does the file exist? /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/src/demo/examples/AdvancedPresetExample.tsx:6:26 20 | import { Tab, Tabs, TabList, TabPanel } from \"react-tabs\"; 21 | import \"react-tabs/style/react-tabs.css\"; 22 | import ActiveFilters from \"../../components/ActiveFilters/ActiveFilters\"; | ^ 23 | import { generateRowData } from \"../data/generator\"; 24 | import styles from \"./Examples.module.css\"; at TransformPluginContext._formatLog (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42499:41) at TransformPluginContext.error (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42496:16) at normalizeUrl (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40475:23) at process.processTicksAndRejections (node:internal/process/task_queues:105:5) at async file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40594:37 at async Promise.all (index 7) at async TransformPluginContext.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:40521:7) at async EnvironmentPluginContainer.transform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:42294:18) at async loadAndTransform (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:35735:27) at async viteTransformMiddleware (file:///Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:37250:24 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
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
   3 | /**
   4 |  * This test prevents regression of the QuickFilterDropdown rendering issue
   5 |  * where dropdowns were being clipped by parent containers with overflow: hidden.
   6 |  * The fix was to add usePortal="always" to the QuickFilterDropdown components.
   7 |  */
   8 | test.describe("QuickFilterDropdown Portal Rendering", () => {
   9 |   test.beforeEach(async ({ page }) => {
   10 |     await page.goto("/demo");
>  11 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   12 |     await page.waitForTimeout(1000); // Give time for grid to fully render
   13 |   });
   14 |
   15 |   test("should render dropdown using portal without clipping", async ({
   16 |     page,
   17 |   }) => {
   18 |     // Wait for the quick filter dropdowns to be visible
   19 |     const dateFilter = page.locator('button:has-text("All Time")').first();
   20 |     const taskFilter = page.locator('button:has-text("Task type")').first();
   21 |
   22 |     // Check that the quick filter buttons exist
   23 |     await expect(dateFilter).toBeVisible({ timeout: 10000 });
   24 |     await expect(taskFilter).toBeVisible({ timeout: 10000 });
   25 |
   26 |     // Click the date filter dropdown
   27 |     await dateFilter.click();
   28 |
   29 |     // Wait for dropdown to open
   30 |     await page.waitForTimeout(500);
   31 |
   32 |     // Check that the dropdown menu is visible and not clipped
   33 |     const dropdownMenu = page.locator('#quick-filter-dropdown[role="listbox"]');
   34 |     await expect(dropdownMenu).toBeVisible();
   35 |
   36 |     // Get the bounding boxes to ensure dropdown is not clipped
   37 |     const dropdownBox = await dropdownMenu.boundingBox();
   38 |     const viewportSize = page.viewportSize();
   39 |
   40 |     // Verify dropdown is within viewport (not clipped)
   41 |     expect(dropdownBox).toBeTruthy();
   42 |     if (dropdownBox && viewportSize) {
   43 |       expect(dropdownBox.x).toBeGreaterThanOrEqual(0);
   44 |       expect(dropdownBox.y).toBeGreaterThanOrEqual(0);
   45 |       expect(dropdownBox.x + dropdownBox.width).toBeLessThanOrEqual(
   46 |         viewportSize.width,
   47 |       );
   48 |       // Y position can extend below viewport for scrolling
   49 |     }
   50 |
   51 |     // Check that options are visible
   52 |     const lastSevenDays = page.locator('text="Last 7 Days"').first();
   53 |     const thisMonth = page.locator('text="This Month"').first();
   54 |
   55 |     await expect(lastSevenDays).toBeVisible();
   56 |     await expect(thisMonth).toBeVisible();
   57 |
   58 |     // Click outside to close
   59 |     await page.click("body", { position: { x: 0, y: 0 } });
   60 |     await page.waitForTimeout(200);
   61 |
   62 |     // Test the task type filter as well
   63 |     await taskFilter.click();
   64 |     await page.waitForTimeout(500);
   65 |
   66 |     const taskDropdownMenu = page.locator(
   67 |       '#quick-filter-dropdown[role="listbox"]',
   68 |     );
   69 |     await expect(taskDropdownMenu).toBeVisible();
   70 |
   71 |     // Check task filter options
   72 |     const allTasks = page.locator('text="All Tasks"').first();
   73 |     const criticalBugs = page.locator('text="Critical Bugs"').first();
   74 |
   75 |     await expect(allTasks).toBeVisible();
   76 |     await expect(criticalBugs).toBeVisible();
   77 |   });
   78 |
   79 |   test("should apply filter when option is selected from portal-rendered dropdown", async ({
   80 |     page,
   81 |   }) => {
   82 |     // Click the date filter
   83 |     const dateFilter = page.locator('button:has-text("All Time")').first();
   84 |     await dateFilter.click();
   85 |     await page.waitForTimeout(500);
   86 |
   87 |     // Click "Last 7 Days"
   88 |     const lastSevenDays = page.locator('text="Last 7 Days"').first();
   89 |     await lastSevenDays.click();
   90 |
   91 |     // Wait for filter to be applied
   92 |     await page.waitForTimeout(1000);
   93 |
   94 |     // Check that the button text updated
   95 |     await expect(dateFilter).toContainText("Last 7 Days");
   96 |
   97 |     // Verify rows are filtered (should be less than total)
   98 |     const rows = page.locator(".ag-row");
   99 |     const rowCount = await rows.count();
  100 |
  101 |     // There should be some filtering applied (less than 1000 rows)
  102 |     expect(rowCount).toBeGreaterThan(0);
  103 |     expect(rowCount).toBeLessThan(1000);
  104 |   });
  105 | });
  106 |
```