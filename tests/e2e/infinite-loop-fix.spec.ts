import { test, expect } from "@playwright/test";

test.describe("Infinite Loop Fix Verification", () => {
  test("should not have infinite loop on initial page load", async ({
    page,
  }) => {
    // Set up console log monitoring
    const consoleLogs: { text: string; timestamp: number }[] = [];
    const errors: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (msg.type() === "log" && text.includes("Grid state saved to URL")) {
        consoleLogs.push({ text, timestamp: Date.now() });
      } else if (msg.type() === "error") {
        errors.push(text);
      }
    });

    // Navigate to the page
    console.log("Navigating to demo page...");
    await page.goto("/");

    // Wait for the grid to load
    await page.waitForSelector(".ag-theme-quartz", { timeout: 10000 });

    // Navigate to demo tab
    const demoTab = page.locator('button:has-text("Demo")');
    if (await demoTab.isVisible()) {
      await demoTab.click();
      await page.waitForTimeout(500);
    }

    // Wait to see if infinite loop occurs
    await page.waitForTimeout(3000);

    // Analyze the logs
    console.log(
      `Total "Grid state saved to URL" messages: ${consoleLogs.length}`,
    );
    console.log(`Errors encountered: ${errors.length}`);

    if (errors.length > 0) {
      console.log("First 3 errors:", errors.slice(0, 3));
    }

    // There should be very few saves on initial load
    expect(consoleLogs.length).toBeLessThan(5);

    // Check timing between saves
    if (consoleLogs.length > 1) {
      const timeDiffs = [];
      for (let i = 1; i < consoleLogs.length; i++) {
        timeDiffs.push(consoleLogs[i].timestamp - consoleLogs[i - 1].timestamp);
      }
      console.log("Time differences between saves (ms):", timeDiffs);

      // Average time should be reasonable (not rapid fire)
      const avgTime = timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length;
      console.log(`Average time between saves: ${avgTime}ms`);

      // If saves happen too quickly, it's a loop
      expect(avgTime).toBeGreaterThan(50);
    }
  });

  test("should handle filter changes without loops", async ({ page }) => {
    const consoleLogs: string[] = [];

    page.on("console", (msg) => {
      if (
        msg.type() === "log" &&
        msg.text().includes("Grid state saved to URL")
      ) {
        consoleLogs.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForSelector(".ag-theme-quartz", { timeout: 10000 });

    // Navigate to demo tab
    const demoTab = page.locator('button:has-text("Demo")');
    if (await demoTab.isVisible()) {
      await demoTab.click();
      await page.waitForTimeout(500);
    }

    // Clear any initial logs
    consoleLogs.length = 0;

    // Apply a filter via quick filter dropdown
    const presetDropdown = page
      .locator('[data-component="quick-filter-trigger"]')
      .first();
    await expect(presetDropdown).toBeVisible({ timeout: 5000 });
    await presetDropdown.click();

    await page.waitForSelector(
      '[data-component="quick-filter-dropdown-content"]',
    );

    const last7DaysOption = page
      .locator('[data-component="quick-filter-option"]')
      .filter({ hasText: "Last 7 days" });
    await last7DaysOption.click();

    // Wait for any reactions
    await page.waitForTimeout(2000);

    // Should have minimal saves (1-3 is normal for a single action)
    console.log(`Saves after filter change: ${consoleLogs.length}`);
    expect(consoleLogs.length).toBeLessThan(5);
  });

  test("should handle rapid filter changes gracefully", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(".ag-theme-quartz", { timeout: 10000 });

    const demoTab = page.locator('button:has-text("Demo")');
    if (await demoTab.isVisible()) {
      await demoTab.click();
      await page.waitForTimeout(500);
    }

    // Monitor performance
    const startTime = Date.now();

    // Apply multiple filters rapidly
    for (let i = 0; i < 3; i++) {
      const presetDropdown = page
        .locator('[data-component="quick-filter-trigger"]')
        .first();
      await presetDropdown.click();

      const option = page
        .locator('[data-component="quick-filter-option"]')
        .nth(i % 3);
      await option.click();

      await page.waitForTimeout(100);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`Rapid filter changes completed in ${duration}ms`);

    // Should complete quickly without hanging
    expect(duration).toBeLessThan(5000);

    // Page should still be responsive
    const grid = page.locator(".ag-theme-quartz");
    await expect(grid).toBeVisible();
  });
});
