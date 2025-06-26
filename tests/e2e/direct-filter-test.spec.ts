import { test, expect } from "@playwright/test";

test.describe("Direct Filter Test", () => {
  test("test filter directly without QuickFilterDropdown", async ({ page }) => {
    page.on("console", (msg) => {
      if (msg.text().includes("[")) {
        console.log(msg.text());
      }
    });

    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Get initial state
    const initial = await page.evaluate(() => {
      const api = window.agGridApi;
      return {
        rowCount: api.getDisplayedRowCount(),
        filterModel: api.getFilterModel(),
      };
    });
    console.log("Initial state:", initial);

    // Apply filter directly via API
    const result = await page.evaluate(async () => {
      const api = window.agGridApi;

      // Set filter model
      api.setFilterModel({
        dueDate: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        },
      });

      // Wait a bit
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get filter instance and manually call setModel
      const filterInstance = await api.getColumnFilterInstance("dueDate");
      if (filterInstance && filterInstance.setModel) {
        await filterInstance.setModel({
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        });
      }

      // Trigger filter
      api.onFilterChanged();

      // Wait for filtering
      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        rowCount: api.getDisplayedRowCount(),
        filterModel: api.getFilterModel(),
        hasActiveFilter: api.isAnyFilterPresent(),
      };
    });

    console.log("After filter:", result);

    // The filter should have worked
    expect(result.rowCount).toBeLessThan(initial.rowCount);
    expect(result.hasActiveFilter).toBe(true);

    // Check DOM after more waiting
    await page.waitForTimeout(1000);

    const domRowCount = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    console.log("DOM row count:", domRowCount);
  });
});
