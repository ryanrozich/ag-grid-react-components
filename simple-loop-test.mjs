import puppeteer from "puppeteer";

console.log("Opening browser to test for infinite loop...\n");

const browser = await puppeteer.launch({
  headless: false,
  devtools: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();

let saveCount = 0;
const startTime = Date.now();

// Monitor console
page.on("console", (msg) => {
  const text = msg.text();
  if (text.includes("Grid state saved to URL")) {
    saveCount++;
    const elapsed = Date.now() - startTime;
    console.log(
      `[${elapsed}ms] Save #${saveCount}: ${text.substring(0, 50)}...`,
    );
  }
});

console.log("Navigating to http://localhost:5173/");
await page.goto("http://localhost:5173/");

console.log("Waiting 2 seconds for page to load...");
await new Promise((resolve) => setTimeout(resolve, 2000));

console.log("Clicking Demo tab...");
try {
  await page.click('button:has-text("Demo")');
} catch (e) {
  console.log("Could not find Demo button, might already be on demo page");
}

console.log("\nMonitoring for 15 seconds...\n");

// Monitor for 15 seconds
for (let i = 1; i <= 15; i++) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  process.stdout.write(
    `\r${i}/15 seconds elapsed... (${saveCount} saves so far)`,
  );

  if (saveCount > 50) {
    console.log("\n\n🚨 INFINITE LOOP DETECTED! More than 50 saves!");
    break;
  }
}

console.log("\n\n=== RESULTS ===");
console.log(
  `Total saves in ${(Date.now() - startTime) / 1000} seconds: ${saveCount}`,
);

if (saveCount === 0) {
  console.log("❓ No saves detected - grid might not be loading");
} else if (saveCount < 5) {
  console.log("✅ Normal behavior - minimal saves");
} else if (saveCount < 20) {
  console.log("⚠️  Higher than expected saves");
} else {
  console.log("🚨 INFINITE LOOP - continuous saves detected!");
}

console.log("\nKeeping browser open. Press Ctrl+C to exit.");
// Keep running
await new Promise(() => {});
