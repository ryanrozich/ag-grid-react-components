import { test } from "@playwright/test";

test("Detect infinite loop on page load", async ({ page }) => {
  console.log("Starting infinite loop detection...\n");

  // Track console logs
  let saveCount = 0;
  let loadCount = 0;
  const startTime = Date.now();
  const logs: { timestamp: number; type: string; text: string }[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    const timestamp = Date.now() - startTime;

    if (text.includes("Grid state saved to URL")) {
      saveCount++;
      logs.push({ timestamp, type: "save", text });
      console.log(
        `[${timestamp}ms] SAVE #${saveCount}: ${text.substring(0, 100)}...`,
      );
    } else if (text.includes("Grid state loaded from URL")) {
      loadCount++;
      logs.push({ timestamp, type: "load", text });
      console.log(
        `[${timestamp}ms] LOAD #${loadCount}: ${text.substring(0, 100)}...`,
      );
    } else if (msg.type() === "error") {
      console.error(`[${timestamp}ms] ERROR: ${text}`);
    }
  });

  page.on("pageerror", (error) => {
    console.error("Page error:", error.message);
  });

  try {
    console.log("Navigating to http://localhost:5173/...\n");
    await page.goto("http://localhost:5173/", {
      waitUntil: "domcontentloaded",
    });

    // Wait for the page to stabilize
    console.log("Monitoring for 10 seconds...\n");
    await page.waitForTimeout(10000);

    // Analyze results
    const elapsed = Date.now() - startTime;
    const saveRate = (saveCount / (elapsed / 1000)).toFixed(2);

    console.log("\n=== ANALYSIS ===");
    console.log(`Total time: ${elapsed}ms`);
    console.log(`Total saves: ${saveCount}`);
    console.log(`Total loads: ${loadCount}`);
    console.log(`Save rate: ${saveRate} saves/second`);

    if (parseFloat(saveRate) > 10) {
      console.log(
        "\n🚨 INFINITE LOOP DETECTED! High save rate indicates a problem.",
      );
      console.log("The page is continuously saving state to the URL.");
    } else if (saveCount > 20) {
      console.log("\n⚠️  WARNING: Excessive saves detected.");
      console.log("This might indicate a problem with state management.");
    } else if (saveCount === 0) {
      console.log(
        "\n❓ No saves detected. The grid might not be loading properly.",
      );
    } else {
      console.log("\n✅ No infinite loop detected.");
      console.log("Save count is within normal range.");
    }

    // Show timing between saves
    if (logs.filter((l) => l.type === "save").length > 1) {
      console.log("\nTiming between saves (first 10):");
      const saves = logs.filter((l) => l.type === "save");
      for (let i = 1; i < Math.min(10, saves.length); i++) {
        const timeDiff = saves[i].timestamp - saves[i - 1].timestamp;
        console.log(`  Save ${i} to ${i + 1}: ${timeDiff}ms`);
        if (timeDiff < 100) {
          console.log("    ^ Very fast succession - likely a loop!");
        }
      }
    }

    // Take a screenshot for debugging
    await page.screenshot({ path: "infinite-loop-test.png", fullPage: true });
    console.log("\nScreenshot saved to infinite-loop-test.png");
  } catch (error) {
    console.error("Error during test:", error);
  }
});
