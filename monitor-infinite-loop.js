const puppeteer = require("puppeteer");

async function monitorInfiniteLoop() {
  console.log("Starting infinite loop monitor...");

  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    devtools: true,
  });

  const page = await browser.newPage();

  // Track console logs
  let saveCount = 0;
  let loadCount = 0;
  const startTime = Date.now();
  const logs = [];

  page.on("console", (msg) => {
    const text = msg.text();
    const timestamp = Date.now() - startTime;

    if (text.includes("Grid state saved to URL")) {
      saveCount++;
      logs.push({ timestamp, type: "save", text });
      console.log(`[${timestamp}ms] SAVE #${saveCount}: ${text}`);
    } else if (text.includes("Grid state loaded from URL")) {
      loadCount++;
      logs.push({ timestamp, type: "load", text });
      console.log(`[${timestamp}ms] LOAD #${loadCount}: ${text}`);
    }
  });

  page.on("pageerror", (error) => {
    console.error("Page error:", error.message);
  });

  try {
    console.log("Navigating to http://localhost:5173/...");
    await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });

    // Wait for the page to stabilize
    console.log("Waiting for page to stabilize...");
    await page.waitForTimeout(5000);

    // Analyze results
    const elapsed = Date.now() - startTime;
    const saveRate = (saveCount / (elapsed / 1000)).toFixed(2);

    console.log("\n=== ANALYSIS ===");
    console.log(`Total time: ${elapsed}ms`);
    console.log(`Total saves: ${saveCount}`);
    console.log(`Total loads: ${loadCount}`);
    console.log(`Save rate: ${saveRate} saves/second`);

    if (saveRate > 10) {
      console.log(
        "\n⚠️  INFINITE LOOP DETECTED! High save rate indicates a problem.",
      );
    } else if (saveCount > 20) {
      console.log("\n⚠️  WARNING: Excessive saves detected.");
    } else {
      console.log("\n✅ No infinite loop detected.");
    }

    // Show timing between saves
    if (logs.length > 1) {
      console.log("\nTiming analysis (first 10 saves):");
      for (let i = 1; i < Math.min(10, logs.length); i++) {
        if (logs[i].type === "save" && logs[i - 1].type === "save") {
          const timeDiff = logs[i].timestamp - logs[i - 1].timestamp;
          console.log(`  Save ${i - 1} to ${i}: ${timeDiff}ms`);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("\nPress Ctrl+C to close the browser and exit.");

  // Keep the script running
  await new Promise(() => {});
}

// Check if puppeteer is installed
try {
  require.resolve("puppeteer");
  monitorInfiniteLoop();
} catch (e) {
  console.log("Puppeteer not found. Install it with:");
  console.log("npm install puppeteer");
  process.exit(1);
}
