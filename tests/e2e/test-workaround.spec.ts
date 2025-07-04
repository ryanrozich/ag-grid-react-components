import { test, expect } from "@playwright/test";

test.describe("Test Filter Workaround", () => {
  test("should properly apply filter with workaround", async ({ page }) => {
    // Enable ALL console logging
    page.on("console", (msg) => {
      console.log(`[${msg.type()}]`, msg.text());
    });

    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Get initial row count
    const initialRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    console.log("\n=== Initial row count:", initialRows);

    // Click on Quick Filter tab
    await page.click('button:has-text("Quick Filter")');
    await page.waitForTimeout(500);

    // Open the dropdown
    await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first()
      .locator('button[aria-haspopup="listbox"]')
      .click();
    await page.waitForTimeout(500);

    // Select "Last 7 Days" - this should filter the data
    await page.click('[role="option"]:has-text("Last 7 Days")');

    // Wait for filter to apply and grid to re-render
    await page.waitForTimeout(1000);

    // Wait for the row count to change from initial value
    await page.waitForFunction(
      (initialCount) => {
        const api = window.agGridApi;
        return api && api.getDisplayedRowCount() !== initialCount;
      },
      initialRows,
      { timeout: 5000 },
    );

    // Additional wait for grid to finish rendering
    await page.waitForTimeout(500);

    // Force a grid refresh
    await page.evaluate(() => {
      const api = window.agGridApi;
      if (api) {
        api.refreshCells({ force: true });
      }
    });

    await page.waitForTimeout(500);

    // Get filtered row count from the API first
    const apiRowCount = await page.evaluate(() => {
      const api = window.agGridApi;
      return api ? api.getDisplayedRowCount() : -1;
    });
    console.log("=== API row count:", apiRowCount);

    // Get filtered row count from DOM
    const filteredRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    console.log("=== DOM row count:", filteredRows);

    // Get detailed info from the grid
    const gridInfo = await page.evaluate(() => {
      const api = window.agGridApi;
      if (!api) return { error: "No API found" };

      const filterModel = api.getFilterModel();
      const rowCount = api.getDisplayedRowCount();
      const filterInstance = api.getColumnFilterInstance("dueDate");

      // Check if filter instance has the model
      let instanceModel = null;
      if (
        filterInstance &&
        typeof (filterInstance as any).then === "function"
      ) {
        // It's a promise, can't get model synchronously
        instanceModel = "Promise - cannot inspect";
      } else if (
        filterInstance &&
        typeof (filterInstance as any).getModel === "function"
      ) {
        instanceModel = (filterInstance as any).getModel();
      }

      return {
        filterModel,
        rowCount,
        hasFilterInstance: !!filterInstance,
        instanceModel,
      };
    });
    console.log("=== Grid info:", JSON.stringify(gridInfo, null, 2));

    // The filter should have reduced the row count
    expect(filteredRows).toBeLessThan(initialRows);
    expect(filteredRows).toBeGreaterThan(0);
  });
});
