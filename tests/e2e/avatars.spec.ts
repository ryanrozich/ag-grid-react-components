import { test, expect } from "@playwright/test";

test.describe("Avatar Loading", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");

    // Wait for the grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000); // Give time for data to load
  });

  test("should load avatar images for assignees", async ({ page }) => {
    // Check that avatar containers exist (using partial class match for CSS modules)
    const avatarContainers = await page
      .locator("[class*='avatarContainer']")
      .count();
    expect(avatarContainers).toBeGreaterThan(0);

    // Get all avatar images (using partial class match for CSS modules)
    const avatarImages = page.locator("img[class*='avatar']");
    const avatarCount = await avatarImages.count();
    expect(avatarCount).toBeGreaterThan(0);

    // Check first few avatars to ensure they're loading
    const firstFiveAvatars = Math.min(5, avatarCount);

    for (let i = 0; i < firstFiveAvatars; i++) {
      const avatar = avatarImages.nth(i);

      // Check that the image has a src attribute
      const src = await avatar.getAttribute("src");
      expect(src).toBeTruthy();

      // For Pravatar images, check the URL format
      if (src?.includes("pravatar")) {
        expect(src).toMatch(/https:\/\/i\.pravatar\.cc\/64\?u=.+/);
      }

      // For UI Avatars, check the URL format
      if (src?.includes("ui-avatars")) {
        expect(src).toMatch(/https:\/\/ui-avatars\.com\/api\/.+/);
      }

      // Check that the image is visible (opacity should be 1 when loaded)
      await avatar.waitForFunction(
        (el) => {
          const style = window.getComputedStyle(el);
          return style.opacity === "1";
        },
        { timeout: 5000 },
      );

      // Verify the image has loaded by checking natural dimensions
      const hasLoaded = await avatar.evaluate((img: HTMLImageElement) => {
        return img.complete && img.naturalHeight > 0 && img.naturalWidth > 0;
      });
      expect(hasLoaded).toBeTruthy();
    }
  });

  test("should show initials fallback while loading", async ({ page }) => {
    // Reload with network throttling to see loading state
    await page.context().route("**/*.pravatar.cc/**", async (route) => {
      // Delay the response to see loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    });

    await page.reload();
    await page.waitForSelector(".ag-root-wrapper");

    // Check that fallback avatars are shown initially
    const fallbackAvatars = await page
      .locator("div[class*='avatarFallback']")
      .count();
    expect(fallbackAvatars).toBeGreaterThan(0);
  });

  test("should fall back to initials on error", async ({ page }) => {
    // Block pravatar requests to force errors
    await page.context().route("**/*.pravatar.cc/**", (route) => {
      route.abort();
    });

    await page.reload();
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(2000); // Wait for error handling

    // Check that some fallback avatars are shown due to errors
    const fallbackAvatars = await page
      .locator("div[class*='avatarFallback']")
      .count();
    expect(fallbackAvatars).toBeGreaterThan(0);
  });

  test("should use consistent avatars for same names", async ({ page }) => {
    // Find all instances of a specific assignee
    const assigneeName = "Alex Chen";
    const assigneeCells = page.locator(`text="${assigneeName}"`);
    const count = await assigneeCells.count();

    if (count > 1) {
      // Get the src of all avatars for this assignee
      const avatarSrcs: string[] = [];

      for (let i = 0; i < count; i++) {
        const cell = assigneeCells.nth(i);
        const avatar = cell.locator("..").locator("img[class*='avatar']");
        const src = await avatar.getAttribute("src");
        if (src) avatarSrcs.push(src);
      }

      // All avatars for the same person should have the same URL
      const uniqueSrcs = new Set(avatarSrcs);
      expect(uniqueSrcs.size).toBe(1);
    }
  });
});
