# Test info

- Name: Filter Presets - URL Sharing >> should expire shared URLs after specified time
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/filter-presets-sharing.spec.ts:275:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-root') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/filter-presets-sharing.spec.ts:19:16
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
   2 | import type { Page } from "@playwright/test";
   3 |
   4 | /**
   5 |  * E2E tests for filter preset sharing via URL
   6 |  * Tests the functionality of generating shareable URLs and loading presets from URLs
   7 |  */
   8 |
   9 | test.describe("Filter Presets - URL Sharing", () => {
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
   20 |   });
   21 |
   22 |   test("should generate shareable URL for current filters", async () => {
   23 |     // Apply some filters
   24 |     await applyTestFilters(page);
   25 |
   26 |     // Open share dialog
   27 |     await page.click('[data-testid="share-filters-button"]');
   28 |
   29 |     // Get the generated URL
   30 |     const shareUrlInput = page.locator('[data-testid="share-url-input"]');
   31 |     await expect(shareUrlInput).toBeVisible();
   32 |
   33 |     const shareUrl = await shareUrlInput.inputValue();
   34 |
   35 |     // Verify URL format
   36 |     expect(shareUrl).toContain(page.url().split("?")[0]); // Base URL
   37 |     expect(shareUrl).toContain("?p="); // Parameter
   38 |
   39 |     // Verify copy button works
   40 |     await page.click('[data-testid="copy-share-url-button"]');
   41 |
   42 |     // Check for success message
   43 |     await expect(
   44 |       page.locator('[data-testid="url-copied-message"]'),
   45 |     ).toBeVisible();
   46 |     await expect(
   47 |       page.locator('[data-testid="url-copied-message"]'),
   48 |     ).toContainText("URL copied to clipboard");
   49 |   });
   50 |
   51 |   test("should load filters from shareable URL", async () => {
   52 |     // First, create a shareable URL
   53 |     await applyTestFilters(page);
   54 |     await page.click('[data-testid="share-filters-button"]');
   55 |     const shareUrl = await page
   56 |       .locator('[data-testid="share-url-input"]')
   57 |       .inputValue();
   58 |
   59 |     // Navigate to a clean state
   60 |     await page.goto("/");
   61 |     await page.waitForSelector(".ag-root", { timeout: 10000 });
   62 |
   63 |     // Verify no filters are active
   64 |     await expect(page.locator(".ag-filter-active")).not.toBeVisible();
   65 |
   66 |     // Navigate to the shareable URL
   67 |     await page.goto(shareUrl);
   68 |     await page.waitForSelector(".ag-root", { timeout: 10000 });
   69 |
   70 |     // Verify filters are applied from URL
   71 |     await verifyFiltersApplied(page);
   72 |   });
   73 |
   74 |   test("should generate shareable URL for saved preset", async () => {
   75 |     // Create a preset
   76 |     await createTestPreset(page, "Shareable Preset");
   77 |
   78 |     // Open preset manager
   79 |     await page.click('[data-testid="preset-manager-button"]');
   80 |
   81 |     // Click share button for the preset
   82 |     await page.click(
   83 |       '[data-testid="preset-item-Shareable Preset"] [data-testid="share-preset-button"]',
   84 |     );
   85 |
   86 |     // Verify share dialog opens with preset URL
   87 |     const shareUrlInput = page.locator('[data-testid="share-url-input"]');
   88 |     await expect(shareUrlInput).toBeVisible();
   89 |
   90 |     const shareUrl = await shareUrlInput.inputValue();
   91 |     expect(shareUrl).toContain("?p="); // Should contain preset data
   92 |   });
   93 |
   94 |   test("should handle loading invalid URL gracefully", async () => {
   95 |     // Navigate to URL with invalid preset data
   96 |     await page.goto("/?p=invalid-data-xyz");
   97 |
   98 |     // Wait for page to load
   99 |     await page.waitForSelector(".ag-root", { timeout: 10000 });
  100 |
  101 |     // Should show error message
  102 |     await expect(
  103 |       page.locator('[data-testid="invalid-url-message"]'),
  104 |     ).toBeVisible();
  105 |     await expect(
  106 |       page.locator('[data-testid="invalid-url-message"]'),
  107 |     ).toContainText("Unable to load filters from URL");
  108 |
  109 |     // Grid should still be functional
  110 |     await expect(page.locator(".ag-root")).toBeVisible();
  111 |   });
  112 |
  113 |   test("should update URL when filters change", async () => {
  114 |     // Enable URL sync
  115 |     await page.click('[data-testid="settings-button"]');
  116 |     await page.check('[data-testid="url-sync-checkbox"]');
  117 |     await page.click('[data-testid="close-settings"]');
  118 |
  119 |     // Apply initial filter
```