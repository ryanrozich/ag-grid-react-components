import { test, expect } from "@playwright/test";

test.describe("Simple Filter Test", () => {
  test("should filter data when DateFilter is initialized with model", async ({ page }) => {
    // Enable console logging
    page.on("console", (msg) => {
      if (msg.text().includes("[DateFilter]") || msg.text().includes("Row count")) {
        console.log("BROWSER:", msg.text());
      }
    });

    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Get initial row count and set a simple filter
    const result = await page.evaluate(async () => {
      const api = (window as any).agGridApi;
      if (!api) return { error: "No API found" };

      const initialRowCount = api.getDisplayedRowCount();
      console.log("Row count before filter:", initialRowCount);

      // Get some sample dates from the grid
      const sampleDates: string[] = [];
      api.forEachNode((node: any, index: number) => {
        if (index < 5 && node.data && node.data.dueDate) {
          sampleDates.push(new Date(node.data.dueDate).toISOString());
        }
      });

      // Set a filter for "Today" (which should match no rows since data is in the future)
      const filterModel = {
        dueDate: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today"
        }
      };

      console.log("Setting filter model:", JSON.stringify(filterModel));
      api.setFilterModel(filterModel);
      
      // Force grid to refresh
      api.onFilterChanged();
      
      // Wait a bit for React to update
      await new Promise(resolve => setTimeout(resolve, 500));

      const finalRowCount = api.getDisplayedRowCount();
      console.log("Row count after filter:", finalRowCount);

      // Get filter instance info
      const filterInstance = await api.getColumnFilterInstance("dueDate");
      const filterInstanceInfo = {
        hasInstance: !!filterInstance,
        hasDoesFilterPass: typeof filterInstance?.doesFilterPass === 'function',
        currentModel: filterInstance?.getModel ? filterInstance.getModel() : null
      };

      return {
        initialRowCount,
        finalRowCount,
        filterChanged: initialRowCount !== finalRowCount,
        sampleDates,
        filterInstanceInfo,
        currentFilterModel: api.getFilterModel()
      };
    });

    console.log("Test result:", JSON.stringify(result, null, 2));

    // The filter should have changed the row count
    expect(result.filterChanged).toBe(true);
    
    // Since we're filtering for "Today" and all data is in the future, 
    // we expect 0 rows
    expect(result.finalRowCount).toBe(0);
  });

  test("should show some rows when filtering for future dates", async ({ page }) => {
    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Set a filter for future dates
    const result = await page.evaluate(async () => {
      const api = (window as any).agGridApi;
      if (!api) return { error: "No API found" };

      const initialRowCount = api.getDisplayedRowCount();

      // Set a filter for dates after today (should include all future dates)
      const filterModel = {
        dueDate: {
          mode: "relative",
          type: "after",
          expressionFrom: "Today",
          fromInclusive: false
        }
      };

      api.setFilterModel(filterModel);
      api.onFilterChanged();
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const finalRowCount = api.getDisplayedRowCount();

      return {
        initialRowCount,
        finalRowCount,
        filterChanged: initialRowCount !== finalRowCount,
        currentFilterModel: api.getFilterModel()
      };
    });

    console.log("Future dates test result:", JSON.stringify(result, null, 2));

    // Since all data is in the future, filtering for "after Today" should keep most/all rows
    expect(result.finalRowCount).toBeGreaterThan(0);
  });
});