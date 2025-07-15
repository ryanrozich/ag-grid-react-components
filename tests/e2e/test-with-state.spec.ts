import { test } from "@playwright/test";

test("Test with initial state in URL", async ({ page }) => {
  console.log("🔍 Testing with initial state in URL...\n");

  let saveCount = 0;
  let loadCount = 0;
  const startTime = Date.now();
  const allLogs: any[] = [];

  // Monitor ALL console messages
  page.on("console", (msg) => {
    const text = msg.text();
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const type = msg.type();

    allLogs.push({ time: elapsed, type, text });

    // Log everything for debugging
    if (type === "log" || type === "info") {
      if (text.includes("Grid state saved to URL")) {
        saveCount++;
        console.log(
          `[${elapsed}s] 🔴 SAVE #${saveCount}: ${text.substring(0, 80)}...`,
        );
      } else if (text.includes("Grid state loaded from URL")) {
        loadCount++;
        console.log(
          `[${elapsed}s] 🔵 LOAD #${loadCount}: ${text.substring(0, 80)}...`,
        );
      } else if (
        text.includes("[gridStateUtils]") ||
        text.includes("gridState") ||
        text.includes("filter")
      ) {
        console.log(`[${elapsed}s] 📝 ${text.substring(0, 100)}...`);
      }
    }
  });

  // First, go to the page without state
  console.log("1️⃣  First visit (no state)...");
  await page.goto("http://localhost:5173/demo");
  await page.waitForTimeout(3000);

  console.log(`   After first visit: ${saveCount} saves, ${loadCount} loads\n`);

  // Now add a filter manually
  console.log("2️⃣  Applying a filter via UI...");
  try {
    // Try to click on a quick filter if available
    const quickFilter = page
      .locator('[data-component="quick-filter-trigger"]')
      .first();
    if (await quickFilter.isVisible({ timeout: 2000 })) {
      await quickFilter.click();
      await page.waitForTimeout(500);

      const filterOption = page
        .locator('[data-component="quick-filter-option"]')
        .first();
      if (await filterOption.isVisible()) {
        await filterOption.click();
        console.log("   Applied a quick filter");
      }
    }
  } catch (e) {
    console.log("   Could not apply filter via UI");
  }

  await page.waitForTimeout(3000);
  console.log(
    `   After applying filter: ${saveCount} saves, ${loadCount} loads\n`,
  );

  // Get the current URL to see if it has state
  const currentUrl = page.url();
  console.log(`3️⃣  Current URL: ${currentUrl.substring(0, 100)}...`);

  if (currentUrl.includes("gridState=")) {
    console.log("   ✅ URL contains gridState parameter\n");

    // Now reload the page to trigger state loading
    console.log("4️⃣  Reloading page to test state loading...");
    const beforeReload = { saves: saveCount, loads: loadCount };

    await page.reload();
    await page.waitForTimeout(5000);

    console.log(
      `   After reload: ${saveCount - beforeReload.saves} new saves, ${loadCount - beforeReload.loads} new loads\n`,
    );
  } else {
    console.log("   ❌ URL does NOT contain gridState parameter\n");
  }

  // Final monitoring
  console.log("5️⃣  Final monitoring for 10 seconds...");
  const monitorStart = { saves: saveCount, loads: loadCount };

  for (let i = 1; i <= 10; i++) {
    await page.waitForTimeout(1000);
    if (i % 2 === 0) {
      const newSaves = saveCount - monitorStart.saves;
      console.log(`   ${i}/10 seconds (${newSaves} new saves)`);
    }
  }

  console.log("\n📊 FINAL RESULTS:");
  console.log(`   Total saves: ${saveCount}`);
  console.log(`   Total loads: ${loadCount}`);
  console.log(`   Total logs captured: ${allLogs.length}`);

  if (saveCount > 50) {
    console.log("\n🚨 INFINITE LOOP DETECTED!");
  } else if (saveCount > 20) {
    console.log("\n⚠️  High number of saves detected");
  } else if (saveCount === 0) {
    console.log(
      "\n❓ No saves detected - grid state persistence may not be working",
    );
    console.log('\nShowing logs with "grid" or "state":');
    allLogs
      .filter(
        (log) =>
          log.text.toLowerCase().includes("grid") ||
          log.text.toLowerCase().includes("state"),
      )
      .slice(0, 10)
      .forEach((log) =>
        console.log(`   [${log.time}s] ${log.text.substring(0, 100)}...`),
      );
  } else {
    console.log("\n✅ Normal save count");
  }

  await page.screenshot({ path: "state-test-result.png", fullPage: true });
  console.log("\n📸 Screenshot saved to state-test-result.png");
});
