import { test, expect } from "@playwright/test";

test.describe("Server-Side Preset Filters", () => {
  test("should apply preset filters on server-side demo", async ({ page }) => {
    // Navigate to the demo page
    await page.goto("http://localhost:5173/demo");

    // Wait for the grid to load
    await page.waitForSelector(".ag-root", { timeout: 30000 });

    // Click on Server-Side Data tab
    const serverSideTab = page
      .locator("button")
      .filter({ hasText: "Server-Side Data" });
    await serverSideTab.click();

    // Wait for server-side grid to load
    await page.waitForTimeout(2000);

    // Get initial task count
    const initialCount = await page
      .locator('span:has-text("results")')
      .textContent();
    expect(initialCount).toContain("10,000");

    // Find and click the preset filters dropdown
    const presetDropdown = page
      .locator("button")
      .filter({ hasText: /All Tasks|Preset filters/ })
      .last();
    await expect(presetDropdown).toBeVisible({ timeout: 10000 });
    await presetDropdown.click();

    // Wait for dropdown to open
    await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
      state: "visible",
    });

    // Test "High Priority" preset
    const highPriorityOption = page.locator(
      'button[role="option"]:has-text("High Priority")',
    );
    await expect(highPriorityOption).toBeVisible();
    await highPriorityOption.click();

    // Wait for filter to be applied
    await page.waitForTimeout(3000);

    // Check that the count has changed
    const highPriorityCount = await page
      .locator('span:has-text("results")')
      .textContent();
    expect(highPriorityCount).not.toBe(initialCount);
    console.log(`High Priority tasks: ${highPriorityCount}`);

    // Click preset dropdown again to test another filter
    await presetDropdown.click();
    await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
      state: "visible",
    });

    // Test "Critical & Overdue" preset
    const criticalOverdueOption = page.locator(
      'button[role="option"]:has-text("Critical & Overdue")',
    );
    await expect(criticalOverdueOption).toBeVisible();
    await criticalOverdueOption.click();

    await page.waitForTimeout(3000);

    const criticalOverdueCount = await page
      .locator('span:has-text("results")')
      .textContent();
    expect(criticalOverdueCount).not.toBe(initialCount);
    expect(criticalOverdueCount).not.toBe(highPriorityCount);
    console.log(`Critical & Overdue tasks: ${criticalOverdueCount}`);

    // Clear filters by selecting "All Tasks"
    await presetDropdown.click();
    await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
      state: "visible",
    });

    const allTasksOption = page.locator(
      'button[role="option"]:has-text("All Tasks")',
    );
    await expect(allTasksOption).toBeVisible();
    await allTasksOption.click();

    await page.waitForTimeout(3000);

    const clearedCount = await page
      .locator('span:has-text("results")')
      .textContent();
    expect(clearedCount).toContain("10,000");

    // Take a screenshot for debugging
    await page.screenshot({
      path: "test-results/server-side-preset-filters.png",
      fullPage: true,
    });
  });
});
