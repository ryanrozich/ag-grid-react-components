# Test info

- Name: captures console errors when switching to server-side tab
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-error.spec.ts:3:1

# Error details

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Server-Side Data")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-error.spec.ts:23:14
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
   3 | test("captures console errors when switching to server-side tab", async ({
   4 |   page,
   5 | }) => {
   6 |   // Collect all console messages
   7 |   const consoleMessages: { type: string; text: string }[] = [];
   8 |
   9 |   page.on("console", (msg) => {
  10 |     consoleMessages.push({
  11 |       type: msg.type(),
  12 |       text: msg.text(),
  13 |     });
  14 |   });
  15 |
  16 |   // Navigate to demo page
  17 |   await page.goto("http://localhost:5173/demo");
  18 |
  19 |   // Wait for initial page load
  20 |   await page.waitForLoadState("networkidle");
  21 |
  22 |   // Click on the server-side tab
> 23 |   await page.click('button:has-text("Server-Side Data")');
     |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  24 |
  25 |   // Wait a bit for any errors to appear
  26 |   await page.waitForTimeout(2000);
  27 |
  28 |   // Check for console errors (excluding AG Grid license warnings)
  29 |   const errors = consoleMessages.filter(
  30 |     (msg) =>
  31 |       msg.type === "error" &&
  32 |       !msg.text.includes("AG Grid Enterprise License") &&
  33 |       !msg.text.includes("License Key Not Found") &&
  34 |       !msg.text.includes("***"),
  35 |   );
  36 |
  37 |   console.log("Actual errors found:", errors.length);
  38 |   errors.forEach((error, index) => {
  39 |     console.log(`Error ${index + 1}:`, error.text);
  40 |   });
  41 |
  42 |   // Also check warnings
  43 |   const warnings = consoleMessages.filter((msg) => msg.type === "warning");
  44 |   console.log("\nWarnings found:", warnings.length);
  45 |   warnings.forEach((warning, index) => {
  46 |     console.log(`Warning ${index + 1}:`, warning.text);
  47 |   });
  48 |
  49 |   // Take a screenshot for debugging
  50 |   await page.screenshot({ path: "server-side-error.png", fullPage: true });
  51 |
  52 |   // This test is expected to fail so we can see the errors
  53 |   expect(errors).toHaveLength(0);
  54 | });
  55 |
```