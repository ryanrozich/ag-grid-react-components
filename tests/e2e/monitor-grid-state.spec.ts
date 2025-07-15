import { test } from "@playwright/test";

test("Monitor grid state persistence for infinite loop", async ({ page }) => {
  console.log("=== Grid State Monitoring Test ===\n");

  // Enhanced logging
  const logs: { timestamp: number; type: string; text: string }[] = [];
  let gridStateSaves = 0;
  let gridStateLoads = 0;
  const startTime = Date.now();

  // Capture ALL console messages
  page.on("console", (msg) => {
    const text = msg.text();
    const timestamp = Date.now() - startTime;
    const type = msg.type();

    // Store all logs
    logs.push({ timestamp, type, text });

    // Track grid state messages specifically
    if (text.includes("Grid state saved to URL")) {
      gridStateSaves++;
      console.log(`[${timestamp}ms] 🔴 SAVE #${gridStateSaves}: ${text}`);
    } else if (text.includes("Grid state loaded from URL")) {
      gridStateLoads++;
      console.log(`[${timestamp}ms] 🔵 LOAD #${gridStateLoads}: ${text}`);
    } else if (
      text.includes("grid") ||
      text.includes("Grid") ||
      text.includes("state") ||
      text.includes("URL")
    ) {
      // Log any other grid-related messages
      console.log(`[${timestamp}ms] ${type.toUpperCase()}: ${text}`);
    }
  });

  // Also log errors
  page.on("pageerror", (error) => {
    console.error(`PAGE ERROR: ${error.message}`);
  });

  try {
    console.log("Step 1: Navigate to localhost:5173");
    await page.goto("http://localhost:5173/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    console.log("Step 2: Wait for React to render");
    await page.waitForTimeout(2000);

    console.log("Step 3: Click Demo tab");
    const demoTab = page.locator('button:has-text("Demo")');
    await demoTab.click();

    console.log("Step 4: Wait for AG Grid to initialize");
    // Wait for the grid container
    await page.waitForSelector(".ag-theme-quartz", {
      state: "visible",
      timeout: 10000,
    });

    console.log("Step 5: Wait for grid to be ready");
    // Wait for grid rows to appear
    await page.waitForSelector(".ag-row", {
      state: "visible",
      timeout: 10000,
    });

    console.log("Step 6: Monitor for 10 seconds\n");

    // Monitor in 1-second intervals
    for (let i = 1; i <= 10; i++) {
      await page.waitForTimeout(1000);
      console.log(`... ${i} seconds elapsed (${gridStateSaves} saves so far)`);

      // Check if we're in a loop
      if (gridStateSaves > i * 5) {
        console.log(
          `\n🚨 INFINITE LOOP DETECTED! ${gridStateSaves} saves in ${i} seconds`,
        );
        break;
      }
    }

    console.log("\n=== FINAL ANALYSIS ===");
    console.log(`Total time monitored: ${Date.now() - startTime}ms`);
    console.log(`Grid state saves: ${gridStateSaves}`);
    console.log(`Grid state loads: ${gridStateLoads}`);
    console.log(`Total console logs: ${logs.length}`);

    // Analyze save pattern
    const saveLogs = logs.filter((l) =>
      l.text.includes("Grid state saved to URL"),
    );
    if (saveLogs.length > 1) {
      console.log("\nSave timing analysis:");
      let totalDiff = 0;
      for (let i = 1; i < Math.min(10, saveLogs.length); i++) {
        const diff = saveLogs[i].timestamp - saveLogs[i - 1].timestamp;
        totalDiff += diff;
        console.log(`  Save ${i - 1} → ${i}: ${diff}ms`);
      }
      const avgDiff = totalDiff / (Math.min(10, saveLogs.length) - 1);
      console.log(`  Average: ${avgDiff.toFixed(0)}ms between saves`);

      if (avgDiff < 200) {
        console.log(
          "\n🚨 RAPID SAVES DETECTED - This indicates an infinite loop!",
        );
      }
    }

    // Show recent logs if no saves detected
    if (gridStateSaves === 0) {
      console.log("\nNo grid state saves detected. Recent logs:");
      const recentLogs = logs.slice(-20);
      recentLogs.forEach((log) => {
        console.log(
          `  [${log.timestamp}ms] ${log.type}: ${log.text.substring(0, 100)}`,
        );
      });
    }

    // Check current URL
    const currentUrl = page.url();
    console.log(`\nCurrent URL: ${currentUrl}`);
    if (currentUrl.includes("gridState=")) {
      console.log("URL contains gridState parameter ✓");
    } else {
      console.log("URL does NOT contain gridState parameter");
    }

    // Take screenshot
    await page.screenshot({ path: "grid-state-monitor.png", fullPage: true });
    console.log("Screenshot saved to grid-state-monitor.png");
  } catch (error) {
    console.error("\nError during test:", error);
    throw error;
  }
});
