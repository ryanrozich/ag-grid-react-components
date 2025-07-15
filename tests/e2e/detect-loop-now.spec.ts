import { test } from "@playwright/test";

test("Detect infinite loop RIGHT NOW", async ({ page }) => {
  console.log("🔍 Detecting infinite loop...\n");

  let saveCount = 0;
  const startTime = Date.now();
  const logs: any[] = [];

  // Monitor console
  page.on("console", (msg) => {
    const text = msg.text();
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    // Store all logs
    logs.push({ time: elapsed, text });

    if (text.includes("Grid state saved to URL")) {
      saveCount++;
      console.log(`[${elapsed}s] 🔴 SAVE #${saveCount}`);
    } else if (text.includes("[gridStateUtils]")) {
      console.log(`[${elapsed}s] 🔧 ${text}`);
    } else if (text.includes("Grid state loaded from URL")) {
      console.log(`[${elapsed}s] 🔵 LOAD: ${text.substring(0, 50)}...`);
    } else if (text.includes("Skipping setFilterModel")) {
      console.log(`[${elapsed}s] ⚠️  ${text}`);
    }
  });

  console.log("1️⃣  Navigating to http://localhost:5173/");
  await page.goto("http://localhost:5173/");

  console.log("2️⃣  Waiting for page to load...");
  await page.waitForTimeout(2000);

  console.log("3️⃣  Clicking Demo tab...");
  try {
    await page.click('button:has-text("Demo")');
  } catch (e) {
    console.log("   (Demo tab not found, might already be on demo page)");
  }

  console.log("4️⃣  Monitoring for 15 seconds...\n");

  // Monitor for 15 seconds
  for (let i = 1; i <= 15; i++) {
    await page.waitForTimeout(1000);

    if (i % 3 === 0) {
      console.log(`   ... ${i}/15 seconds (${saveCount} saves so far)`);
    }

    if (saveCount > 30) {
      console.log("\n🚨 INFINITE LOOP DETECTED! Breaking...");
      break;
    }
  }

  console.log("\n📊 FINAL ANALYSIS:");
  console.log(`   Total saves: ${saveCount}`);
  console.log(
    `   Time elapsed: ${((Date.now() - startTime) / 1000).toFixed(1)}s`,
  );
  console.log(
    `   Save rate: ${(saveCount / ((Date.now() - startTime) / 1000)).toFixed(1)} saves/second`,
  );

  if (saveCount === 0) {
    console.log("\n❓ No saves detected. Showing first 20 logs:");
    logs.slice(0, 20).forEach((log) => {
      console.log(`   [${log.time}s] ${log.text.substring(0, 100)}`);
    });
  } else if (saveCount < 5) {
    console.log("\n✅ Normal behavior - minimal saves");
  } else if (saveCount < 20) {
    console.log("\n⚠️  Higher than expected saves, but not infinite");
  } else {
    console.log("\n🚨 INFINITE LOOP CONFIRMED!");
    console.log("   The grid is continuously saving state to the URL.");
  }

  // Take screenshot
  await page.screenshot({ path: "loop-detection-result.png", fullPage: true });
  console.log("\n📸 Screenshot saved to loop-detection-result.png");
});
