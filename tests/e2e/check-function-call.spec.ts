import { test } from "@playwright/test";

test("Check if setupGridStatePersistence is called", async ({ page }) => {
  console.log("Checking function calls...\n");

  let setupCalled = false;

  // Capture console messages
  page.on("console", (msg) => {
    const text = msg.text();
    console.log(`[${msg.type()}] ${text}`);

    if (text.includes("[setupGridStatePersistence]")) {
      setupCalled = true;
      console.log("\n✅ setupGridStatePersistence WAS CALLED!\n");
    }
  });

  console.log("Navigating to demo page...");
  await page.goto("http://localhost:5173/demo");

  console.log("Waiting for initialization...");
  await page.waitForTimeout(5000);

  console.log(`\nsetupGridStatePersistence called: ${setupCalled}`);

  if (!setupCalled) {
    console.log("\n❌ setupGridStatePersistence was NOT called!");
    console.log("This explains why we see no grid state persistence messages.");
  }
});
