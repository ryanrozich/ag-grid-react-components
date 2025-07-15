import { test, expect } from "@playwright/test";

test.describe("DateFilter Infinite Loop Bug", () => {
  test("should not cause infinite loop when selecting Last 7 days preset", async ({
    page,
  }) => {
    // Navigate to the demo page
    await page.goto("http://localhost:5173/");

    // Wait for the grid to load
    await page.waitForSelector(".ag-theme-quartz", { timeout: 10000 });

    // Set up console log monitoring
    const consoleLogs: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleLogs.push(msg.text());
      }
    });

    // Find and click the date filter preset dropdown
    // First, make sure we're on the demo tab
    const demoTab = page.locator('button:has-text("Demo")');
    if (await demoTab.isVisible()) {
      await demoTab.click();
      await page.waitForTimeout(500); // Wait for tab transition
    }

    // Now find the QuickFilterDropdown - it might be in a header or toolbar
    const presetDropdown = page
      .locator(
        '[data-component="quick-filter-trigger"], [data-testid="quick-filter-dropdown"]',
      )
      .first();
    await expect(presetDropdown).toBeVisible({ timeout: 5000 });
    await presetDropdown.click();

    // Wait for dropdown to open
    await page.waitForSelector(
      '[data-component="quick-filter-dropdown-content"]',
      { state: "visible" },
    );

    // Click on "Last 7 days" option
    const last7DaysOption = page
      .locator('[data-component="quick-filter-option"]')
      .filter({ hasText: "Last 7 days" });
    await expect(last7DaysOption).toBeVisible();
    await last7DaysOption.click();

    // Wait a bit to see if infinite loop occurs
    await page.waitForTimeout(3000);

    // Count how many times "Grid state saved to URL" appears in console logs
    const gridStateSaves = consoleLogs.filter((log) =>
      log.includes("Grid state saved to URL"),
    ).length;

    // There should be only 1 or 2 saves, not hundreds
    console.log(`Number of grid state saves: ${gridStateSaves}`);
    expect(gridStateSaves).toBeLessThan(5);

    // Also check that the filter is actually applied
    const activeFilters = page.locator(
      '[data-component="active-filters-item"]',
    );
    await expect(activeFilters).toHaveCount(1);

    // Check that the filter pill shows the correct value
    const filterValue = page
      .locator('[data-component="active-filters-value"]')
      .first();
    await expect(filterValue).toContainText("today-7d");
  });

  test("should monitor React re-renders when applying date filter", async ({
    page,
  }) => {
    // Enable React DevTools profiling if available
    await page.goto("http://localhost:5173/");

    // Wait for grid
    await page.waitForSelector(".ag-theme-quartz", { timeout: 10000 });

    // Monitor network requests to see if there are repeated API calls
    const requests: string[] = [];
    page.on("request", (request) => {
      requests.push(request.url());
    });

    // Apply a date filter
    // First, make sure we're on the demo tab
    const demoTab = page.locator('button:has-text("Demo")');
    if (await demoTab.isVisible()) {
      await demoTab.click();
      await page.waitForTimeout(500); // Wait for tab transition
    }

    const presetDropdown = page
      .locator(
        '[data-component="quick-filter-trigger"], [data-testid="quick-filter-dropdown"]',
      )
      .first();
    await expect(presetDropdown).toBeVisible({ timeout: 5000 });
    await presetDropdown.click();

    const last30DaysOption = page
      .locator('[data-component="quick-filter-option"]')
      .filter({ hasText: "Last 30 days" });
    await last30DaysOption.click();

    // Wait and check for repeated requests
    await page.waitForTimeout(2000);

    // Log any repeated requests
    const requestCounts = requests.reduce(
      (acc, url) => {
        acc[url] = (acc[url] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const repeatedRequests = Object.entries(requestCounts)
      .filter(([_, count]) => count > 2)
      .map(([url, count]) => `${url}: ${count} times`);

    if (repeatedRequests.length > 0) {
      console.log("Repeated requests detected:", repeatedRequests);
    }

    // There shouldn't be many repeated requests
    expect(repeatedRequests.length).toBe(0);
  });
});
