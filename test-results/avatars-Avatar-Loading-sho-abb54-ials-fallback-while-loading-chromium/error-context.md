# Test info

- Name: Avatar Loading >> should show initials fallback while loading
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/avatars.spec.ts:55:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.ag-root-wrapper') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/avatars.spec.ts:8:16
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
   3 | test.describe("Avatar Loading", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto("/demo");
   6 |
   7 |     // Wait for the grid to be ready
>  8 |     await page.waitForSelector(".ag-root-wrapper");
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   9 |     await page.waitForTimeout(1000); // Give time for data to load
   10 |   });
   11 |
   12 |   test("should load avatar images for assignees", async ({ page }) => {
   13 |     // Check that avatar containers exist (using partial class match for CSS modules)
   14 |     const avatarContainers = await page
   15 |       .locator("[class*='avatarContainer']")
   16 |       .count();
   17 |     expect(avatarContainers).toBeGreaterThan(0);
   18 |
   19 |     // Get all avatar images (using partial class match for CSS modules)
   20 |     const avatarImages = page.locator("img[class*='avatar']");
   21 |     const avatarCount = await avatarImages.count();
   22 |     expect(avatarCount).toBeGreaterThan(0);
   23 |
   24 |     // Check first few avatars to ensure they're loading
   25 |     const firstFiveAvatars = Math.min(5, avatarCount);
   26 |
   27 |     for (let i = 0; i < firstFiveAvatars; i++) {
   28 |       const avatar = avatarImages.nth(i);
   29 |
   30 |       // Check that the image has a src attribute
   31 |       const src = await avatar.getAttribute("src");
   32 |       expect(src).toBeTruthy();
   33 |
   34 |       // For Pravatar images, check the URL format
   35 |       if (src?.includes("pravatar")) {
   36 |         expect(src).toMatch(/https:\/\/i\.pravatar\.cc\/64\?u=.+/);
   37 |       }
   38 |
   39 |       // For UI Avatars, check the URL format
   40 |       if (src?.includes("ui-avatars")) {
   41 |         expect(src).toMatch(/https:\/\/ui-avatars\.com\/api\/.+/);
   42 |       }
   43 |
   44 |       // Wait a bit for the image to load
   45 |       await page.waitForTimeout(500);
   46 |
   47 |       // Verify the image has loaded by checking natural dimensions
   48 |       const hasLoaded = await avatar.evaluate((img: HTMLImageElement) => {
   49 |         return img.complete && img.naturalHeight > 0 && img.naturalWidth > 0;
   50 |       });
   51 |       expect(hasLoaded).toBeTruthy();
   52 |     }
   53 |   });
   54 |
   55 |   test("should show initials fallback while loading", async ({ page }) => {
   56 |     // Reload with network throttling to see loading state
   57 |     await page.context().route("**/*.pravatar.cc/**", async (route) => {
   58 |       // Delay the response to see loading state
   59 |       await new Promise((resolve) => setTimeout(resolve, 1000));
   60 |       await route.continue();
   61 |     });
   62 |
   63 |     await page.reload();
   64 |     await page.waitForSelector(".ag-root-wrapper");
   65 |
   66 |     // Check that fallback avatars are shown initially
   67 |     const fallbackAvatars = await page
   68 |       .locator("div[class*='avatarFallback']")
   69 |       .count();
   70 |     expect(fallbackAvatars).toBeGreaterThan(0);
   71 |   });
   72 |
   73 |   test("should fall back to initials on error", async ({ page }) => {
   74 |     // Block pravatar requests to force errors
   75 |     await page.context().route("**/*.pravatar.cc/**", (route) => {
   76 |       route.abort();
   77 |     });
   78 |
   79 |     await page.reload();
   80 |     await page.waitForSelector(".ag-root-wrapper");
   81 |     await page.waitForTimeout(2000); // Wait for error handling
   82 |
   83 |     // Check that some fallback avatars are shown due to errors
   84 |     const fallbackAvatars = await page
   85 |       .locator("div[class*='avatarFallback']")
   86 |       .count();
   87 |     expect(fallbackAvatars).toBeGreaterThan(0);
   88 |   });
   89 |
   90 |   test("should use consistent avatars for same names", async ({ page }) => {
   91 |     // Find all instances of a specific assignee
   92 |     const assigneeName = "Alex Chen";
   93 |     const assigneeCells = page.locator(`text="${assigneeName}"`);
   94 |     const count = await assigneeCells.count();
   95 |
   96 |     if (count > 1) {
   97 |       // Get the src of all avatars for this assignee
   98 |       const avatarSrcs: string[] = [];
   99 |
  100 |       for (let i = 0; i < count; i++) {
  101 |         const cell = assigneeCells.nth(i);
  102 |         const avatar = cell.locator("..").locator("img[class*='avatar']");
  103 |         const src = await avatar.getAttribute("src");
  104 |         if (src) avatarSrcs.push(src);
  105 |       }
  106 |
  107 |       // All avatars for the same person should have the same URL
  108 |       const uniqueSrcs = new Set(avatarSrcs);
```