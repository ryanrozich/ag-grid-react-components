import { test } from "@playwright/test";

test.describe("Debug QuickFilterDropdown", () => {
  test("should debug filter application", async ({ page }) => {
    // Enable console logging
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        console.log("BROWSER LOG:", msg.text());
      }
    });

    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Click on Quick Filter tab
    await page.click('button:has-text("Quick Filter")');
    await page.waitForTimeout(500);

    // Get initial row count
    const initialRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    console.log("Initial row count:", initialRows);

    // Open the first dropdown
    await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first()
      .locator('button[aria-haspopup="listbox"]')
      .click();
    await page.waitForTimeout(500);

    // Select "This Month" which should filter to only current month (June 2025)
    await page.click('[role="option"]:has-text("This Month")');

    // Wait for filter to apply
    await page.waitForTimeout(2000);

    // Get filtered row count
    const filteredRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    console.log("Filtered row count:", filteredRows);

    // Check if floating filter is visible
    const floatingFilterVisible = await page
      .locator(".ag-floating-filter")
      .first()
      .isVisible();
    console.log("Floating filter visible:", floatingFilterVisible);

    // Check filter indicator
    const filterIndicator = await page
      .locator('[col-id="dueDate"] .ag-header-cell-filtered')
      .isVisible()
      .catch(() => false);
    console.log("Filter indicator visible:", filterIndicator);

    // Get detailed info from the grid
    const gridInfo = await page.evaluate(() => {
      const api = window.agGridApi;
      if (!api) return { error: "No API found" };

      const filterModel = api.getFilterModel();
      const rowCount = api.getDisplayedRowCount();

      // Try to get the filter instance directly
      let filterInstance = null;
      try {
        filterInstance = api.getColumnFilterInstance("dueDate");
      } catch (e) {
        console.error("Error getting filter instance:", e);
      }

      return {
        filterModel,
        rowCount,
        hasFilterInstance: !!filterInstance,
        filterInstanceType: filterInstance
          ? filterInstance.constructor.name
          : null,
      };
    });
    console.log("Grid info:", JSON.stringify(gridInfo, null, 2));

    // Check if the test data has dates in the last 7 days
    const dateInfo = await page.evaluate(() => {
      const dates: any[] = [];
      const api = window.agGridApi;
      if (!api) return { error: "No API" };

      // Get the raw data from the grid
      api.forEachNode((node) => {
        if (node.data && node.data.dueDate) {
          dates.push({
            raw: node.data.dueDate,
            formatted: new Date(node.data.dueDate).toLocaleDateString(),
            iso: new Date(node.data.dueDate).toISOString(),
          });
        }
      });

      return dates.slice(0, 10); // First 10 rows
    });
    console.log("Date info from grid:", JSON.stringify(dateInfo, null, 2));
  });
});
