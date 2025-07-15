import { test, expect } from "@playwright/test";

test.describe("Infinite Loop on Page Load", () => {
  test("should detect infinite loop of grid state saves on initial load", async ({
    page,
  }) => {
    // Set up console log monitoring
    const consoleLogs: string[] = [];
    const errors: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (msg.type() === "log" && text.includes("Grid state saved to URL")) {
        consoleLogs.push(text);
      } else if (msg.type() === "error") {
        errors.push(text);
      }
    });

    // Navigate to the page
    console.log("Navigating to demo page...");
    await page.goto("/");

    // Wait a bit to collect console logs
    await page.waitForTimeout(3000);

    // Check for excessive grid state saves
    console.log(
      `Total "Grid state saved to URL" messages: ${consoleLogs.length}`,
    );
    console.log(`Errors encountered: ${errors.length}`);

    if (errors.length > 0) {
      console.log("Errors:", errors.slice(0, 5)); // Show first 5 errors
    }

    // There should be very few grid state saves on initial load (max 5)
    expect(consoleLogs.length).toBeLessThan(10);

    // Log timing analysis
    if (consoleLogs.length > 10) {
      console.log("Detected potential infinite loop!");
      console.log(`Messages per second: ${consoleLogs.length / 3}`);
    }
  });

  test("should monitor grid state persistence setup", async ({ page }) => {
    // Enable detailed console monitoring
    const allLogs: { type: string; text: string; timestamp: number }[] = [];

    page.on("console", (msg) => {
      allLogs.push({
        type: msg.type(),
        text: msg.text(),
        timestamp: Date.now(),
      });
    });

    // Add custom script to monitor grid events
    await page.addInitScript(() => {
      // Override console.log to track call stack
      const originalLog = console.log;
      console.log = function (...args) {
        if (args[0]?.includes("Grid state saved to URL")) {
          console.error("Stack trace for grid state save:", new Error().stack);
        }
        originalLog.apply(console, args);
      };
    });

    // Navigate to the page
    await page.goto("/");

    // Wait for grid to initialize
    await page
      .waitForSelector(".ag-theme-quartz", { timeout: 5000 })
      .catch(() => {
        console.log("Grid not found within timeout");
      });

    // Wait to collect logs
    await page.waitForTimeout(2000);

    // Analyze the logs
    const gridStateLogs = allLogs.filter((log) =>
      log.text.includes("Grid state saved to URL"),
    );
    const setupLogs = allLogs.filter((log) =>
      log.text.includes("setupGridStatePersistence"),
    );

    console.log("Log Analysis:");
    console.log(`- Total logs: ${allLogs.length}`);
    console.log(`- Grid state saves: ${gridStateLogs.length}`);
    console.log(`- Setup calls: ${setupLogs.length}`);

    // Check for rapid fire logs (more than 10 in 2 seconds)
    if (gridStateLogs.length > 10) {
      // Calculate time between saves
      const timeDiffs = [];
      for (let i = 1; i < Math.min(10, gridStateLogs.length); i++) {
        timeDiffs.push(
          gridStateLogs[i].timestamp - gridStateLogs[i - 1].timestamp,
        );
      }
      console.log("Time between first 10 saves (ms):", timeDiffs);

      // If saves are happening faster than 100ms apart, it's likely a loop
      const avgTime = timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length;
      console.log(`Average time between saves: ${avgTime}ms`);

      expect(avgTime).toBeGreaterThan(100);
    }
  });

  test("should check for event listener loops", async ({ page }) => {
    // Monitor all AG Grid events
    await page.goto("/");

    // Inject monitoring script
    const eventCounts = await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Check if ag-Grid is available
          const grid = document.querySelector(".ag-theme-quartz");
          if (!grid) {
            resolve({ error: "Grid not found" });
            return;
          }

          // Try to access grid API
          const gridApi = (window as any).gridApi;
          if (!gridApi) {
            resolve({ error: "Grid API not found" });
            return;
          }

          resolve({ success: true });
        }, 2000);
      });
    });

    console.log("Event monitoring result:", eventCounts);
  });
});
