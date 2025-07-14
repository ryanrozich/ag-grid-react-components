import { test, expect } from "@playwright/test";

test.describe("Grid Reset Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
    await page.waitForLoadState("networkidle");
  });

  test("reset to defaults option appears in three-dots menu", async ({
    page,
  }) => {
    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
    await page.waitForTimeout(1000);

    // Click the three-dots menu
    const menuTrigger = page
      .locator('[data-testid="view-management-menu-trigger"]')
      .first();
    await expect(menuTrigger).toBeVisible();
    await menuTrigger.click();

    // Check that the menu appears
    const menu = page.locator('[data-testid="view-management-menu"]').first();
    await expect(menu).toBeVisible();

    // Look for the reset option
    const resetOption = menu
      .locator("button")
      .filter({ hasText: "Reset to defaults" });
    await expect(resetOption).toBeVisible();

    // Check that it's not disabled (grid is available)
    const isDisabled = await resetOption.isDisabled();
    expect(isDisabled).toBe(false);

    // Take screenshot
    await page.screenshot({
      path: "screenshots/three-dots-menu-with-reset.png",
      fullPage: false,
    });
  });

  test("reset clears filters and restores grid state", async ({ page }) => {
    // Wait for grid
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
    await page.waitForTimeout(1000);

    // Apply a time period filter
    const timePeriodButton = page
      .locator("button")
      .filter({ hasText: "All Time" })
      .first();
    await timePeriodButton.click();

    const lastWeekOption = page
      .locator('[data-component="quick-filter-option"]')
      .filter({ hasText: "Last Week" });
    await lastWeekOption.click();

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Check that filter is applied
    const activeFilters = page.locator(".active-filters-container");
    await expect(activeFilters).toBeVisible();

    // Open three-dots menu
    const menuTrigger = page
      .locator('[data-testid="view-management-menu-trigger"]')
      .first();
    await menuTrigger.click();

    // Click reset to defaults
    const resetOption = page
      .locator("button")
      .filter({ hasText: "Reset to defaults" });
    await resetOption.click();

    // Wait for reset
    await page.waitForTimeout(1000);

    // Check that filters are cleared
    const activeFiltersAfter = page.locator(".active-filters-container");
    const isVisible = await activeFiltersAfter.isVisible();
    expect(isVisible).toBe(false);

    // Check that time period button shows "All Time" again
    await expect(timePeriodButton).toHaveText("All Time");
  });

  test("saved views dropdown shows only views without action items", async ({
    page,
  }) => {
    // Wait for grid
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });

    // Click My Views dropdown
    const myViewsButton = page
      .locator("button")
      .filter({ hasText: "My Views" })
      .first();
    await myViewsButton.click();

    // Wait for dropdown
    await page.waitForTimeout(300);

    // Check that dropdown doesn't contain "Clear filters" option
    const dropdown = page
      .locator('[data-component="quick-filter-dropdown"]')
      .first();
    const clearFiltersOption = dropdown.locator("text=Clear filters");
    const hasClearFilters = (await clearFiltersOption.count()) > 0;

    expect(hasClearFilters).toBe(false);

    // Close dropdown
    await page.keyboard.press("Escape");
  });
});
