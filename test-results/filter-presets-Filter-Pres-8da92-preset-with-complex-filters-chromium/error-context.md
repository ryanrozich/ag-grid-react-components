# Test info

- Name: Filter Presets - Save and Load Flow >> should handle preset with complex filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/filter-presets.spec.ts:244:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-root') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/filter-presets.spec.ts:19:16
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
   2 | import type { Page } from "@playwright/test";
   3 |
   4 | /**
   5 |  * E2E tests for filter preset functionality
   6 |  * Tests the complete user flow of saving, loading, and managing filter presets
   7 |  */
   8 |
   9 | test.describe("Filter Presets - Save and Load Flow", () => {
   10 |   let page: Page;
   11 |
   12 |   test.beforeEach(async ({ page: testPage }) => {
   13 |     page = testPage;
   14 |
   15 |     // Navigate to the demo page
   16 |     await page.goto("/");
   17 |
   18 |     // Wait for the grid to be ready
>  19 |     await page.waitForSelector(".ag-root", { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   20 |
   21 |     // Clear any existing presets from localStorage
   22 |     await page.evaluate(() => {
   23 |       localStorage.removeItem("ag-grid-filter-presets");
   24 |     });
   25 |   });
   26 |
   27 |   test("should save current filters as a preset", async () => {
   28 |     // Apply some filters first
   29 |     await applyTestFilters(page);
   30 |
   31 |     // Open preset manager
   32 |     await page.click('[data-testid="preset-manager-button"]');
   33 |
   34 |     // Click save preset button
   35 |     await page.click('[data-testid="save-preset-button"]');
   36 |
   37 |     // Fill in preset details
   38 |     await page.fill('[data-testid="preset-name-input"]', "My Test Preset");
   39 |     await page.fill(
   40 |       '[data-testid="preset-description-input"]',
   41 |       "Filters for testing",
   42 |     );
   43 |
   44 |     // Add tags
   45 |     await page.fill('[data-testid="preset-tags-input"]', "test, e2e");
   46 |
   47 |     // Save the preset
   48 |     await page.click('[data-testid="confirm-save-preset"]');
   49 |
   50 |     // Verify success message
   51 |     await expect(
   52 |       page.locator('[data-testid="preset-saved-message"]'),
   53 |     ).toBeVisible();
   54 |     await expect(
   55 |       page.locator('[data-testid="preset-saved-message"]'),
   56 |     ).toContainText("Preset saved successfully");
   57 |
   58 |     // Verify preset appears in the list
   59 |     await expect(
   60 |       page.locator('[data-testid="preset-item-My Test Preset"]'),
   61 |     ).toBeVisible();
   62 |   });
   63 |
   64 |   test("should load a saved preset", async () => {
   65 |     // First save a preset
   66 |     await createTestPreset(page, "Test Load Preset");
   67 |
   68 |     // Clear current filters
   69 |     await page.click('[data-testid="clear-all-filters"]');
   70 |
   71 |     // Verify filters are cleared
   72 |     await expect(page.locator(".ag-filter-active")).not.toBeVisible();
   73 |
   74 |     // Open preset manager
   75 |     await page.click('[data-testid="preset-manager-button"]');
   76 |
   77 |     // Click on the preset to load it
   78 |     await page.click('[data-testid="preset-item-Test Load Preset"]');
   79 |
   80 |     // Verify filters are applied
   81 |     await expect(page.locator(".ag-filter-active")).toBeVisible();
   82 |
   83 |     // Verify specific filter values
   84 |     await verifyFiltersApplied(page);
   85 |   });
   86 |
   87 |   test("should show system presets alongside user presets", async () => {
   88 |     // Open preset manager
   89 |     await page.click('[data-testid="preset-manager-button"]');
   90 |
   91 |     // Verify system presets are visible
   92 |     await expect(
   93 |       page.locator('[data-testid="preset-item-Recent Activity"]'),
   94 |     ).toBeVisible();
   95 |     await expect(
   96 |       page.locator('[data-testid="preset-item-High Priority"]'),
   97 |     ).toBeVisible();
   98 |
   99 |     // Verify system preset indicators
  100 |     await expect(
  101 |       page.locator(
  102 |         '[data-testid="preset-item-Recent Activity"] [data-testid="system-preset-badge"]',
  103 |       ),
  104 |     ).toBeVisible();
  105 |
  106 |     // Create a user preset
  107 |     await createTestPreset(page, "My User Preset");
  108 |
  109 |     // Verify both types are shown
  110 |     await page.click('[data-testid="preset-manager-button"]');
  111 |     await expect(
  112 |       page.locator('[data-testid="preset-item-Recent Activity"]'),
  113 |     ).toBeVisible();
  114 |     await expect(
  115 |       page.locator('[data-testid="preset-item-My User Preset"]'),
  116 |     ).toBeVisible();
  117 |
  118 |     // Verify user preset doesn't have system badge
  119 |     await expect(
```