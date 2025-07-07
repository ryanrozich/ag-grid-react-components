# Test info

- Name: Relative Date Range Bug >> documents current behavior - to field clears immediately
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relative-date-range-bug.spec.ts:92:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relative-date-range-bug.spec.ts:19:16
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
   3 | /**
   4 |  * This test documents a bug where the "to" field in relative date range filters
   5 |  * disappears after selecting or typing a value.
   6 |  *
   7 |  * Steps to reproduce:
   8 |  * 1. Open date filter
   9 |  * 2. Switch to "Relative" mode
   10 |  * 3. Select "In Range" filter type
   11 |  * 4. Type or select a value in the "to" field
   12 |  * 5. The value disappears immediately
   13 |  *
   14 |  * GitHub Issue: TBD
   15 |  */
   16 | test.describe("Relative Date Range Bug", () => {
   17 |   test.beforeEach(async ({ page }) => {
   18 |     await page.goto("/demo");
>  19 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   20 |     await page.waitForTimeout(1000); // Give time for grid to fully render
   21 |   });
   22 |
   23 |   test("to field value disappears in relative date range filter", async ({
   24 |     page,
   25 |   }) => {
   26 |     // Find the date column header
   27 |     const dateHeader = page
   28 |       .locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper')
   29 |       .first();
   30 |
   31 |     // Open the filter menu
   32 |     await dateHeader.hover();
   33 |     await dateHeader.locator(".ag-header-cell-menu-button").click();
   34 |     await page.waitForTimeout(500);
   35 |
   36 |     // Get the filter panel
   37 |     const filterPanel = page.locator(".ag-filter").first();
   38 |     await expect(filterPanel).toBeVisible();
   39 |
   40 |     // Switch to Relative mode
   41 |     const relativeButton = filterPanel.locator('button:has-text("Relative")');
   42 |     await relativeButton.click();
   43 |     await page.waitForTimeout(200);
   44 |
   45 |     // Select "In Range" filter type
   46 |     const filterTypeDropdown = filterPanel.locator("select").first();
   47 |     await filterTypeDropdown.selectOption({ label: "In Range" });
   48 |     await page.waitForTimeout(200);
   49 |
   50 |     // Find the from and to inputs
   51 |     const fromInput = filterPanel
   52 |       .locator('input[placeholder*="Today"]')
   53 |       .first();
   54 |     const toInput = filterPanel
   55 |       .locator('input[placeholder*="Today+30d"]')
   56 |       .first();
   57 |
   58 |     // Verify both inputs are visible
   59 |     await expect(fromInput).toBeVisible();
   60 |     await expect(toInput).toBeVisible();
   61 |
   62 |     // Type in the from field first (this should work)
   63 |     await fromInput.fill("Today");
   64 |     await page.waitForTimeout(200);
   65 |     await expect(fromInput).toHaveValue("Today");
   66 |
   67 |     // Now type in the to field - THIS IS WHERE THE BUG OCCURS
   68 |     await toInput.fill("Today+7d");
   69 |     await page.waitForTimeout(200);
   70 |
   71 |     // BUG: The value should remain but it disappears
   72 |     // This assertion will fail, documenting the bug
   73 |     await expect(toInput).toHaveValue("Today+7d");
   74 |
   75 |     // Also test with autocomplete selection
   76 |     await toInput.clear();
   77 |     await toInput.click();
   78 |     await toInput.type("Today");
   79 |
   80 |     // Wait for suggestions to appear
   81 |     await page.waitForSelector('[role="listbox"]', { timeout: 2000 });
   82 |
   83 |     // Click on a suggestion
   84 |     const suggestion = page.locator('[role="option"]').first();
   85 |     await suggestion.click();
   86 |     await page.waitForTimeout(200);
   87 |
   88 |     // BUG: The selected value should remain but it disappears
   89 |     await expect(toInput).not.toHaveValue("");
   90 |   });
   91 |
   92 |   test("documents current behavior - to field clears immediately", async ({
   93 |     page,
   94 |   }) => {
   95 |     // This test documents the actual buggy behavior
   96 |
   97 |     // Open date filter and switch to relative in range
   98 |     const dateHeader = page
   99 |       .locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper')
  100 |       .first();
  101 |     await dateHeader.hover();
  102 |     await dateHeader.locator(".ag-header-cell-menu-button").click();
  103 |     await page.waitForTimeout(500);
  104 |
  105 |     const filterPanel = page.locator(".ag-filter").first();
  106 |     await filterPanel.locator('button:has-text("Relative")').click();
  107 |     await filterPanel
  108 |       .locator("select")
  109 |       .first()
  110 |       .selectOption({ label: "In Range" });
  111 |
  112 |     const toInput = filterPanel
  113 |       .locator('input[placeholder*="Today+30d"]')
  114 |       .first();
  115 |
  116 |     // Type a value
  117 |     await toInput.fill("Today+14d");
  118 |
  119 |     // Give it a moment to process
```