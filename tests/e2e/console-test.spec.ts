import { test } from "@playwright/test";

test("Can we see console messages?", async ({ page }) => {
  console.log("Testing console message capture...\n");

  let messageCount = 0;
  const messages: string[] = [];

  // Capture ALL console messages
  page.on("console", (msg) => {
    messageCount++;
    const text = msg.text();
    const type = msg.type();
    messages.push(`[${type}] ${text}`);

    // Log first 20 messages
    if (messageCount <= 20) {
      console.log(
        `Message #${messageCount} [${type}]: ${text.substring(0, 100)}${text.length > 100 ? "..." : ""}`,
      );
    }
  });

  // Also inject a script to test console
  await page.addInitScript(() => {
    console.log("TEST: This is a test message from injected script");

    // Override console.log to track calls
    const originalLog = console.log;
    let logCount = 0;
    console.log = function (...args) {
      logCount++;
      originalLog.apply(console, [`[LOG #${logCount}]`, ...args]);
    };
  });

  console.log("Navigating to http://localhost:5173/demo...\n");
  await page.goto("http://localhost:5173/demo");

  console.log("Waiting 5 seconds for console messages...\n");
  await page.waitForTimeout(5000);

  // Also try to execute script in the page context
  const pageConsoleTest = await page.evaluate(() => {
    console.log("TEST: Direct console.log from page.evaluate");

    // Check if grid API exists
    const hasGridApi = !!(window as any).agGridApi;
    console.log(`TEST: Grid API exists: ${hasGridApi}`);

    // Try to find console.log calls in the page
    const logs = [];
    const originalLog = console.log;
    console.log = function (...args) {
      logs.push(args.join(" "));
      originalLog.apply(console, args);
    };

    // Trigger a test
    console.log("TEST: Console override test");

    return {
      hasGridApi,
      capturedLogs: logs,
    };
  });

  console.log("\n=== RESULTS ===");
  console.log(`Total console messages captured: ${messageCount}`);
  console.log(`Page evaluation results:`, pageConsoleTest);

  if (messageCount === 0) {
    console.log("\n❌ NO console messages were captured!");
    console.log("This might be a Playwright configuration issue.");
  } else {
    console.log("\n✅ Console messages are being captured.");

    // Look for specific messages
    const gridSaves = messages.filter((m) => m.includes("Grid state saved"));
    const gridLoads = messages.filter((m) => m.includes("Grid state loaded"));

    console.log(`\nGrid state saves: ${gridSaves.length}`);
    console.log(`Grid state loads: ${gridLoads.length}`);

    if (gridSaves.length > 0) {
      console.log("\nFirst few save messages:");
      gridSaves.slice(0, 5).forEach((m) => console.log(`  ${m}`));
    }
  }

  // Try running in headed mode suggestion
  console.log("\n💡 To see the actual browser console:");
  console.log("   Run: npm run test:e2e -- console-test.spec.ts --headed");
  console.log("   Then open DevTools (F12) in the browser window");
});
