# Test info

- Name: Relative Date Expressions >> should handle complex expressions
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relativeDateExpressions.spec.ts:223:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/relativeDateExpressions.spec.ts:9:16
```

# Page snapshot

```yaml
- text: "[plugin:vite:esbuild] Transform failed with 1 error: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/src/index.ts:94:2: ERROR: Multiple exports with the same name \"PresetManager\" /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/src/index.ts:94:2 Multiple exports with the same name \"PresetManager\" 92 | // Preset System exports 93 | export { 94 | PresetManager, | ^ 95 | resolveTemplate, 96 | resolveTemplateInGridState, at failureErrorWithLog (/Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/esbuild/lib/main.js:1463:15) at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/esbuild/lib/main.js:734:50 at responseCallbacks.<computed> (/Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/esbuild/lib/main.js:601:9) at handleIncomingPacket (/Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/esbuild/lib/main.js:656:12) at Socket.readFromStdout (/Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/node_modules/esbuild/lib/main.js:579:7) at Socket.emit (node:events:507:28) at addChunk (node:internal/streams/readable:559:12) at readableAddChunkPushByteMode (node:internal/streams/readable:510:3) at Readable.push (node:internal/streams/readable:390:5) at Pipe.onStreamRead (node:internal/stream_base_commons:189:23 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
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
   3 | test.describe("Relative Date Expressions", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for grid to be ready
>  9 |     await page.waitForSelector(".ag-root-wrapper");
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   10 |     await page.waitForTimeout(1000); // Give time for data to load
   11 |
   12 |     // Open date filter - need to find the correct column
   13 |     await page.hover('[col-id="dueDate"] .ag-header-cell-label');
   14 |     await page.click('[col-id="dueDate"] .ag-header-cell-menu-button');
   15 |     await page.waitForSelector(".ag-filter-wrapper");
   16 |   });
   17 |
   18 |   test("should switch to relative date mode", async ({ page }) => {
   19 |     // Click relative mode toggle
   20 |     const relativeToggle = page.locator('button:has-text("Relative")');
   21 |     await relativeToggle.click();
   22 |
   23 |     // Verify relative input is visible
   24 |     const relativeInput = page.locator('[data-testid="relative-input"]');
   25 |     await expect(relativeInput).toBeVisible();
   26 |
   27 |     // Check for expression input
   28 |     const expressionInput = page.locator('input[placeholder*="Today"]');
   29 |     await expect(expressionInput).toBeVisible();
   30 |   });
   31 |
   32 |   test("should filter using 'Today' expression", async ({ page }) => {
   33 |     // Switch to relative mode
   34 |     await page.click('button:has-text("Relative")');
   35 |
   36 |     // Enter "Today" expression
   37 |     const expressionInput = page.locator('input[placeholder*="Today"]').first();
   38 |     await expressionInput.fill("Today");
   39 |
   40 |     // Apply filter
   41 |     await page.click('button:has-text("Apply")');
   42 |     await page.waitForTimeout(500);
   43 |
   44 |     // Verify filter is applied
   45 |     const filterIndicator = page.locator(
   46 |       '[col-id="date"] .ag-header-cell-filtered',
   47 |     );
   48 |     await expect(filterIndicator).toBeVisible();
   49 |
   50 |     // Check filtered rows contain today's date
   51 |     const today = new Date().toLocaleDateString();
   52 |     const firstRowDate = await page
   53 |       .locator('.ag-center-cols-container .ag-row:first-child [col-id="date"]')
   54 |       .textContent();
   55 |     expect(firstRowDate).toContain(today.split("/")[1]); // Check day part
   56 |   });
   57 |
   58 |   test("should show autocomplete suggestions", async ({ page }) => {
   59 |     // Switch to relative mode
   60 |     await page.click('button:has-text("Relative")');
   61 |
   62 |     // Focus on expression input
   63 |     const expressionInput = page.locator('input[placeholder*="Today"]').first();
   64 |     await expressionInput.click();
   65 |
   66 |     // Verify autocomplete dropdown appears
   67 |     await page.waitForSelector('[role="listbox"]', { timeout: 5000 });
   68 |
   69 |     // Check for suggestions
   70 |     await expect(
   71 |       page.locator('[role="option"]:has-text("Today")'),
   72 |     ).toBeVisible();
   73 |     await expect(
   74 |       page.locator('[role="option"]:has-text("Yesterday")'),
   75 |     ).toBeVisible();
   76 |     await expect(
   77 |       page.locator('[role="option"]:has-text("Tomorrow")'),
   78 |     ).toBeVisible();
   79 |     await expect(
   80 |       page.locator('[role="option"]:has-text("Start of week")'),
   81 |     ).toBeVisible();
   82 |   });
   83 |
   84 |   test("should filter suggestions based on input", async ({ page }) => {
   85 |     // Switch to relative mode
   86 |     await page.click('button:has-text("Relative")');
   87 |
   88 |     // Type "week" in expression input
   89 |     const expressionInput = page.locator('input[placeholder*="Today"]').first();
   90 |     await expressionInput.fill("week");
   91 |
   92 |     // Wait for filtered suggestions
   93 |     await page.waitForTimeout(300);
   94 |
   95 |     // Verify only week-related suggestions are shown
   96 |     const suggestions = await page.locator('[role="option"]:visible').count();
   97 |     const weekSuggestions = await page
   98 |       .locator('[role="option"]:visible:has-text("week")')
   99 |       .count();
  100 |
  101 |     expect(weekSuggestions).toBeGreaterThan(0);
  102 |     expect(suggestions).toBeLessThan(10); // Should be filtered
  103 |   });
  104 |
  105 |   test("should select suggestion with keyboard", async ({ page }) => {
  106 |     // Switch to relative mode
  107 |     await page.click('button:has-text("Relative")');
  108 |
  109 |     // Focus expression input
```