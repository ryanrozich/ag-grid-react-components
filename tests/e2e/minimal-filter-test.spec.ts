import { test, expect } from "@playwright/test";

test.describe("Minimal Filter Test", () => {
  test("should check filter lifecycle", async ({ page }) => {
    // Enable ALL console logging
    const logs: string[] = [];
    page.on("console", (msg) => {
      logs.push(msg.text());
    });

    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000);

    // Clear logs before setting filter
    logs.length = 0;

    // Set a filter and observe what happens
    await page.evaluate(async () => {
      const api = (window as any).agGridApi;
      if (!api) return;

      console.log("=== BEFORE SETTING FILTER MODEL ===");
      
      const filterModel = {
        dueDate: {
          mode: "relative",
          type: "equals", 
          expressionFrom: "Today"
        }
      };

      console.log("=== CALLING setFilterModel ===");
      api.setFilterModel(filterModel);
      
      console.log("=== CALLING onFilterChanged ===");
      api.onFilterChanged();
      
      console.log("=== DONE ===");
    });

    // Wait for any async operations
    await page.waitForTimeout(1000);

    // Print all logs
    console.log("\n=== CAPTURED LOGS ===");
    logs.forEach(log => console.log(log));
    
    // Check if setModel was called
    const wasSetModelCalled = logs.some(log => log.includes("setModel called"));
    console.log("\nWas setModel called?", wasSetModelCalled);
    
    // Check if new component was instantiated
    const newComponentCreated = logs.some(log => 
      log.includes("Component instantiated") && 
      logs.indexOf(log) > logs.findIndex(l => l.includes("BEFORE SETTING"))
    );
    console.log("Was new component created?", newComponentCreated);
  });
});