# Test info

- Name: Avatar Loading >> should load avatar images for assignees
- Location: /Users/ryan/code-repos/ag-grid-react-components/tests/e2e/avatars.spec.ts:12:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /Users/ryan/Library/Caches/ms-playwright/chromium_headless_shell-1169/chrome-mac/headless_shell
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
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
   8 |     await page.waitForSelector(".ag-root-wrapper");
   9 |     await page.waitForTimeout(1000); // Give time for data to load
   10 |   });
   11 |
>  12 |   test("should load avatar images for assignees", async ({ page }) => {
      |   ^ Error: browserType.launch: Executable doesn't exist at /Users/ryan/Library/Caches/ms-playwright/chromium_headless_shell-1169/chrome-mac/headless_shell
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
   44 |       // Check that the image is visible (opacity should be 1 when loaded)
   45 |       await avatar.waitForFunction(
   46 |         (el) => {
   47 |           const style = window.getComputedStyle(el);
   48 |           return style.opacity === "1";
   49 |         },
   50 |         { timeout: 5000 },
   51 |       );
   52 |
   53 |       // Verify the image has loaded by checking natural dimensions
   54 |       const hasLoaded = await avatar.evaluate((img: HTMLImageElement) => {
   55 |         return img.complete && img.naturalHeight > 0 && img.naturalWidth > 0;
   56 |       });
   57 |       expect(hasLoaded).toBeTruthy();
   58 |     }
   59 |   });
   60 |
   61 |   test("should show initials fallback while loading", async ({ page }) => {
   62 |     // Reload with network throttling to see loading state
   63 |     await page.context().route("**/*.pravatar.cc/**", async (route) => {
   64 |       // Delay the response to see loading state
   65 |       await new Promise((resolve) => setTimeout(resolve, 1000));
   66 |       await route.continue();
   67 |     });
   68 |
   69 |     await page.reload();
   70 |     await page.waitForSelector(".ag-root-wrapper");
   71 |
   72 |     // Check that fallback avatars are shown initially
   73 |     const fallbackAvatars = await page
   74 |       .locator("div[class*='avatarFallback']")
   75 |       .count();
   76 |     expect(fallbackAvatars).toBeGreaterThan(0);
   77 |   });
   78 |
   79 |   test("should fall back to initials on error", async ({ page }) => {
   80 |     // Block pravatar requests to force errors
   81 |     await page.context().route("**/*.pravatar.cc/**", (route) => {
   82 |       route.abort();
   83 |     });
   84 |
   85 |     await page.reload();
   86 |     await page.waitForSelector(".ag-root-wrapper");
   87 |     await page.waitForTimeout(2000); // Wait for error handling
   88 |
   89 |     // Check that some fallback avatars are shown due to errors
   90 |     const fallbackAvatars = await page
   91 |       .locator("div[class*='avatarFallback']")
   92 |       .count();
   93 |     expect(fallbackAvatars).toBeGreaterThan(0);
   94 |   });
   95 |
   96 |   test("should use consistent avatars for same names", async ({ page }) => {
   97 |     // Find all instances of a specific assignee
   98 |     const assigneeName = "Alex Chen";
   99 |     const assigneeCells = page.locator(`text="${assigneeName}"`);
  100 |     const count = await assigneeCells.count();
  101 |
  102 |     if (count > 1) {
  103 |       // Get the src of all avatars for this assignee
  104 |       const avatarSrcs: string[] = [];
  105 |
  106 |       for (let i = 0; i < count; i++) {
  107 |         const cell = assigneeCells.nth(i);
  108 |         const avatar = cell.locator("..").locator("img[class*='avatar']");
  109 |         const src = await avatar.getAttribute("src");
  110 |         if (src) avatarSrcs.push(src);
  111 |       }
  112 |
```
