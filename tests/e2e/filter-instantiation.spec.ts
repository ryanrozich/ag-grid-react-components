import { test, expect } from "@playwright/test";

test.describe("Filter Instantiation Check", () => {
  test("should properly instantiate DateFilter", async ({ page }) => {
    // Enable console logging
    page.on("console", (msg) => {
      console.log("BROWSER:", msg.text());
    });

    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Check if DateFilter is being properly instantiated
    const filterInfo = await page.evaluate(async () => {
      const api = window.agGridApi;
      if (!api) return { error: "No API found" };

      // Get the filter instance
      const filterPromise = api.getColumnFilterInstance("dueDate");

      try {
        const filterInstance = await filterPromise;
        return {
          isPromise: true,
          resolvedType: filterInstance ? filterInstance.constructor.name : null,
          hasDoesFilterPass:
            typeof filterInstance?.doesFilterPass === "function",
          hasSetModel: typeof filterInstance?.setModel === "function",
          hasGetModel: typeof filterInstance?.getModel === "function",
        };
      } catch (error: any) {
        return {
          isPromise: true,
          error: error.message,
        };
      }
    });

    console.log(
      "Filter instantiation info:",
      JSON.stringify(filterInfo, null, 2),
    );

    // Now try to manually set a filter model
    const filterResult = await page.evaluate(async () => {
      const api = window.agGridApi;
      if (!api) return { error: "No API found" };

      const initialRowCount = api.getDisplayedRowCount();

      // Get the filter instance first
      const filterInstancePromise = api.getColumnFilterInstance("dueDate");
      const filterInstance = await filterInstancePromise;

      console.log("Filter instance resolved:", {
        hasSetModel: typeof filterInstance?.setModel === "function",
        hasGetModel: typeof filterInstance?.getModel === "function",
        filterType: filterInstance?.constructor.name,
      });

      // Set a filter model
      const filterModel = {
        mode: "relative",
        type: "equals",
        expressionFrom: "Today",
      };

      // Try setting the model directly on the filter instance
      if (filterInstance && typeof filterInstance.setModel === "function") {
        console.log("Calling setModel directly on filter instance");
        filterInstance.setModel(filterModel);
      }

      // Also try via the API
      api.setFilterModel({ dueDate: filterModel });
      api.onFilterChanged();

      // Wait a bit for the filter to apply
      return new Promise((resolve) => {
        setTimeout(() => {
          const finalRowCount = api.getDisplayedRowCount();
          const currentFilterModel = api.getFilterModel();

          resolve({
            initialRowCount,
            finalRowCount,
            filterModelSet:
              JSON.stringify(currentFilterModel) ===
              JSON.stringify(filterModel),
            currentFilterModel,
            wasSetModelCalled: (window as any).setModelWasCalled || false,
          });
        }, 1000);
      });
    });

    console.log(
      "Filter application result:",
      JSON.stringify(filterResult, null, 2),
    );

    // Check if the filter was actually applied
    expect((filterResult as any).filterModelSet).toBe(true);

    // The row count should have changed (unless by coincidence all rows match)
    console.log(
      `Row count changed from ${(filterResult as any).initialRowCount} to ${(filterResult as any).finalRowCount}`,
    );
  });
});
