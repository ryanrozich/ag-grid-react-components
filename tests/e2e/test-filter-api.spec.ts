import { test, expect } from "@playwright/test";

test.describe("AG Grid Filter API Investigation", () => {
  test("investigate filter instance behavior", async ({ page }) => {
    // Enable ALL console logging
    const logs: string[] = [];
    page.on("console", (msg) => {
      const text = msg.text();
      logs.push(`[${msg.type()}] ${text}`);
      console.log(`[${msg.type()}] ${text}`);
    });

    // Navigate to the demo page
    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Execute investigation code in the browser
    const investigation = await page.evaluate(async () => {
      const api = (window as any).agGridApi;
      if (!api) return { error: "No API found" };

      const results: any = {
        initialState: {},
        afterSetFilterModel: {},
        afterGetInstance: {},
        afterManualSetModel: {},
      };

      // 1. Check initial state
      results.initialState = {
        filterModel: api.getFilterModel(),
        rowCount: api.getDisplayedRowCount(),
      };

      // 2. Set filter model programmatically
      const testFilterModel = {
        mode: "relative",
        type: "inRange",
        expressionFrom: "Today-7d",
        expressionTo: "Today",
      };

      api.setFilterModel({ dueDate: testFilterModel });

      // 3. Check state after setFilterModel
      results.afterSetFilterModel = {
        filterModel: api.getFilterModel(),
        rowCount: api.getDisplayedRowCount(),
      };

      // 4. Try to get filter instance
      try {
        const filterInstance = api.getColumnFilterInstance("dueDate");

        // Check if it's a promise
        if (filterInstance && typeof filterInstance.then === "function") {
          results.afterGetInstance.isPromise = true;

          // Wait for the promise
          const resolvedInstance = await filterInstance;
          results.afterGetInstance.resolved = true;
          results.afterGetInstance.hasSetModel =
            typeof resolvedInstance?.setModel === "function";
          results.afterGetInstance.hasGetModel =
            typeof resolvedInstance?.getModel === "function";

          if (resolvedInstance?.getModel) {
            results.afterGetInstance.currentModel = resolvedInstance.getModel();
          }

          // Try to manually set the model
          if (resolvedInstance?.setModel) {
            await resolvedInstance.setModel(testFilterModel);
            api.onFilterChanged();

            // Wait a bit for the filter to apply
            await new Promise((resolve) => setTimeout(resolve, 100));

            results.afterManualSetModel = {
              filterModel: api.getFilterModel(),
              rowCount: api.getDisplayedRowCount(),
              instanceModel: resolvedInstance.getModel(),
            };
          }
        } else {
          results.afterGetInstance.isPromise = false;
          results.afterGetInstance.instanceType = filterInstance
            ? filterInstance.constructor.name
            : null;
        }
      } catch (error) {
        results.afterGetInstance.error = error.message;
      }

      return results;
    });

    console.log("\n=== INVESTIGATION RESULTS ===");
    console.log(JSON.stringify(investigation, null, 2));

    // Check if the filter actually worked
    if (!investigation.error) {
      expect(investigation.afterManualSetModel.rowCount).toBeLessThan(
        investigation.initialState.rowCount,
      );
    }
  });

  test("test synchronous filter application", async ({ page }) => {
    page.on("console", (msg) => {
      console.log(`[${msg.type()}] ${msg.text()}`);
    });

    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Try a different approach - set filter and immediately check
    const result = await page.evaluate(async () => {
      const api = (window as any).agGridApi;
      if (!api) return { error: "No API" };

      const initialCount = api.getDisplayedRowCount();

      // Set filter model
      api.setFilterModel({
        dueDate: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        },
      });

      // Try different methods to force filter application
      const attempts: any[] = [];

      // Attempt 1: Just onFilterChanged
      api.onFilterChanged();
      await new Promise((resolve) => setTimeout(resolve, 50));
      attempts.push({
        method: "onFilterChanged only",
        rowCount: api.getDisplayedRowCount(),
      });

      // Attempt 2: Get instance and set model
      const instance = await api.getColumnFilterInstance("dueDate");
      if (instance && instance.setModel) {
        await instance.setModel({
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        });
        api.onFilterChanged();
        await new Promise((resolve) => setTimeout(resolve, 50));
        attempts.push({
          method: "instance.setModel + onFilterChanged",
          rowCount: api.getDisplayedRowCount(),
        });
      }

      // Attempt 3: Clear and reapply
      api.setFilterModel({});
      api.onFilterChanged();
      await new Promise((resolve) => setTimeout(resolve, 50));

      api.setFilterModel({
        dueDate: {
          mode: "relative",
          type: "equals",
          expressionFrom: "Today",
        },
      });
      api.onFilterChanged();
      await new Promise((resolve) => setTimeout(resolve, 50));
      attempts.push({
        method: "clear and reapply",
        rowCount: api.getDisplayedRowCount(),
      });

      return {
        initialCount,
        attempts,
        finalFilterModel: api.getFilterModel(),
      };
    });

    console.log("\n=== SYNCHRONOUS TEST RESULTS ===");
    console.log(JSON.stringify(result, null, 2));
  });
});
