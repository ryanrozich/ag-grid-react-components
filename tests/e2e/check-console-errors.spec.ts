import { test } from "@playwright/test";

test("check for console errors", async ({ page }) => {
  const errors: string[] = [];

  // Capture console messages
  page.on("console", (msg) => {
    console.log(`${msg.type()}: ${msg.text()}`);
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  // Capture page errors
  page.on("pageerror", (error) => {
    console.error("Page error:", error.message);
    errors.push(error.message);
  });

  // Navigate
  await page.goto("http://localhost:5173/demo", {
    waitUntil: "domcontentloaded",
  });

  // Wait for any async errors
  await page.waitForTimeout(3000);

  // Try clicking on demo if it's a link
  const demoLink = page.locator('a[href*="demo"], button:has-text("Demo")');
  if ((await demoLink.count()) > 0) {
    console.log("Found demo link, clicking...");
    await demoLink.first().click();
    await page.waitForTimeout(2000);
  }

  // Check current URL
  console.log("Current URL:", page.url());

  // Get page content
  const content = await page.content();
  console.log("Page HTML length:", content.length);

  // Check for React root
  const reactRoot = await page.locator("#root, .root, [data-root]").count();
  console.log("React root elements:", reactRoot);

  // List all errors
  if (errors.length > 0) {
    console.error("\n❌ Console errors found:");
    errors.forEach((error, i) => {
      console.error(`${i + 1}. ${error}`);
    });
  } else {
    console.log("\n✅ No console errors");
  }

  await page.screenshot({
    path: "test-results/console-check.png",
    fullPage: true,
  });
});
