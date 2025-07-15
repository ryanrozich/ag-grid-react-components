import { test } from "@playwright/test";

test("Reproduce infinite loop issue", async ({ page }) => {
  console.log("Attempting to reproduce infinite loop...\n");

  // Track all console logs
  const allLogs: { timestamp: number; type: string; text: string }[] = [];
  let saveCount = 0;
  const startTime = Date.now();

  page.on("console", (msg) => {
    const text = msg.text();
    const timestamp = Date.now() - startTime;
    const type = msg.type();

    allLogs.push({ timestamp, type, text });

    // Print all logs to see what's happening
    if (type === "log") {
      console.log(`[${timestamp}ms] LOG: ${text}`);

      if (text.includes("Grid state saved to URL")) {
        saveCount++;
      }
    } else if (type === "error") {
      console.error(`[${timestamp}ms] ERROR: ${text}`);
    } else if (type === "warning") {
      console.warn(`[${timestamp}ms] WARN: ${text}`);
    }
  });

  try {
    console.log("1. Navigating to http://localhost:5173/...");
    await page.goto("http://localhost:5173/");

    console.log("2. Waiting for initial load...");
    await page.waitForTimeout(2000);

    console.log("3. Looking for Demo tab...");
    const demoTab = page.locator('button:has-text("Demo")');
    const isDemoVisible = await demoTab.isVisible().catch(() => false);

    if (isDemoVisible) {
      console.log("4. Clicking Demo tab...");
      await demoTab.click();
      await page.waitForTimeout(1000);
    } else {
      console.log("4. Demo tab not found, might already be on demo page");
    }

    console.log("5. Waiting for grid to load...");
    const gridLocator = page.locator(".ag-theme-quartz");
    const isGridVisible = await gridLocator.isVisible().catch(() => false);
    console.log(`   Grid visible: ${isGridVisible}`);

    console.log("6. Monitoring for 5 more seconds...");
    await page.waitForTimeout(5000);

    // Analysis
    console.log("\n=== ANALYSIS ===");
    console.log(`Total logs captured: ${allLogs.length}`);
    console.log(`Grid state saves: ${saveCount}`);

    // Show save pattern
    const saveLogs = allLogs.filter((l) =>
      l.text.includes("Grid state saved to URL"),
    );
    if (saveLogs.length > 0) {
      console.log("\nSave log pattern:");
      for (let i = 0; i < Math.min(10, saveLogs.length); i++) {
        console.log(`  ${i + 1}. At ${saveLogs[i].timestamp}ms`);
        if (i > 0) {
          const diff = saveLogs[i].timestamp - saveLogs[i - 1].timestamp;
          console.log(`     (${diff}ms since previous)`);
        }
      }

      // Calculate save rate
      const timeSpan =
        saveLogs[saveLogs.length - 1].timestamp - saveLogs[0].timestamp;
      if (timeSpan > 0) {
        const rate = (saveLogs.length / (timeSpan / 1000)).toFixed(2);
        console.log(`\nSave rate: ${rate} saves/second over ${timeSpan}ms`);

        if (parseFloat(rate) > 5) {
          console.log("🚨 HIGH SAVE RATE - Likely infinite loop!");
        }
      }
    } else {
      console.log("\nNo grid state saves detected.");
      console.log("First 10 logs:");
      for (let i = 0; i < Math.min(10, allLogs.length); i++) {
        console.log(
          `  ${allLogs[i].type}: ${allLogs[i].text.substring(0, 100)}`,
        );
      }
    }

    // Take screenshot
    await page.screenshot({
      path: "reproduce-infinite-loop.png",
      fullPage: true,
    });
    console.log("\nScreenshot saved to reproduce-infinite-loop.png");

    // Check page state
    const url = page.url();
    console.log(`\nFinal URL: ${url}`);
  } catch (error) {
    console.error("Error during test:", error);
  }
});
