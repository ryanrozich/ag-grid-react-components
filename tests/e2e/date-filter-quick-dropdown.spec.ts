import { test, expect } from "@playwright/test";

test.describe("Date Filter via QuickFilterDropdown", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto("http://localhost:5173/demo");

    // Wait for the grid to load
    await page.waitForSelector(".ag-root", { timeout: 30000 });

    // Wait for grid to be ready by checking for rows
    await page.waitForSelector(".ag-row", { timeout: 30000 });
  });

  test("should filter data when selecting 'Last 7 Days' from quick filter dropdown", async ({
    page,
  }) => {
    // Capture console logs
    const consoleLogs: string[] = [];
    page.on("console", (msg) => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Wait for the grid and stats to be visible
    await page.waitForSelector(".ag-root", { state: "visible" });

    // Look for the NUMBER OF TASKS stat instead of traditional status bar
    const statsSection = page.locator('text="NUMBER OF TASKS"').locator("..");
    await expect(statsSection).toBeVisible();

    // Get initial row count from the NUMBER OF TASKS stat
    const initialCountText = await statsSection
      .locator("text=/\\d{1,3}(,\\d{3})*/")
      .textContent();
    const initialRowCount = initialCountText
      ? parseInt(initialCountText.replace(/,/g, ""))
      : 0;
    console.log("Initial row count:", initialRowCount);
    expect(initialRowCount).toBeGreaterThan(0);

    // Find and click the due date quick filter dropdown
    // The date filter might show as "All Time" initially
    const dueDateDropdown = page
      .locator("button")
      .filter({ hasText: /All Time|Time period/ })
      .first();

    await expect(dueDateDropdown).toBeVisible({ timeout: 10000 });
    await dueDateDropdown.click();

    // Wait for dropdown to open
    await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
      state: "visible",
    });

    // Click on "Last 7 Days" option
    const last7DaysOption = page.locator(
      'button[role="option"]:has-text("Last 7 Days")',
    );
    await expect(last7DaysOption).toBeVisible();
    await last7DaysOption.click();

    // Wait for filter to be applied - give it time to process
    await page.waitForTimeout(2000);

    // Check if active filter pill appears
    const activeFilterPill = page.locator(
      '[data-testid="active-filters"] [data-component="active-filter-item"]',
    );
    await expect(activeFilterPill).toBeVisible({ timeout: 5000 });

    // Verify the filter pill shows "Due Date"
    const filterText = await activeFilterPill.textContent();
    expect(filterText).toContain("Due Date");

    // Get the new row count from the NUMBER OF TASKS stat
    const newCountText = await statsSection
      .locator("text=/\\d{1,3}(,\\d{3})*/")
      .textContent();
    const newRowCount = newCountText
      ? parseInt(newCountText.replace(/,/g, ""))
      : 0;
    console.log("New row count:", newRowCount);

    // The filtered count should be less than the initial count
    if (newRowCount === initialRowCount) {
      console.log(
        "\n!!! WARNING: Row count did not change after applying filter !!!",
      );
      console.log("Initial:", initialRowCount, "New:", newRowCount);

      // Print filter-related logs
      console.log("\n=== Filter-related console logs ===");
      consoleLogs
        .filter(
          (log) =>
            log.includes("Filter") ||
            log.includes("Workaround") ||
            log.includes("AGGrid"),
        )
        .forEach((log) => console.log(log));
    }

    expect(newRowCount).toBeLessThan(initialRowCount);
    expect(newRowCount).toBeGreaterThan(0); // Should have some results

    // Take a screenshot for debugging
    await page.screenshot({
      path: "test-results/date-filter-applied.png",
      fullPage: true,
    });
  });

  test("debug: check if doesFilterPass is called", async ({ page }) => {
    const consoleLogs: string[] = [];
    let doesFilterPassCalled = false;

    page.on("console", (msg) => {
      const text = msg.text();
      consoleLogs.push(text);
      if (text.includes("doesFilterPass")) {
        doesFilterPassCalled = true;
      }
    });

    // Apply a filter
    const dropdown = page
      .locator("button")
      .filter({ hasText: /All Time|Time period/ })
      .first();
    await dropdown.click();
    await page.locator('button[role="option"]:has-text("Last 7 Days")').click();

    // Wait for filter to process
    await page.waitForTimeout(3000);

    // Log all filter-related messages
    console.log("\n=== All Filter Logs ===");
    consoleLogs
      .filter(
        (log) =>
          log.includes("Filter") ||
          log.includes("Workaround") ||
          log.includes("AGGrid") ||
          log.includes("setModel") ||
          log.includes("getModel"),
      )
      .forEach((log) => console.log(log));

    // Check if doesFilterPass was called
    if (!doesFilterPassCalled) {
      console.log("\n!!! CRITICAL: doesFilterPass was NEVER called !!!");
      console.log(
        "This means AG Grid is not using our filter for filtering rows",
      );
    }

    expect(doesFilterPassCalled).toBeTruthy();
  });
});
