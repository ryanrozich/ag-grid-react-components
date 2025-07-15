import { test } from "@playwright/test";

test("Click quick filter and monitor console", async ({ page }) => {
  console.log("Testing quick filter click...\n");

  let messageCount = 0;
  const gridMessages: string[] = [];

  // Capture ALL console messages
  page.on("console", (msg) => {
    const text = msg.text();
    const type = msg.type();

    if (type === "log" || type === "info") {
      messageCount++;

      // Look for any grid/state/filter related messages
      if (
        text.includes("grid") ||
        text.includes("Grid") ||
        text.includes("state") ||
        text.includes("State") ||
        text.includes("filter") ||
        text.includes("Filter") ||
        text.includes("URL") ||
        text.includes("saved") ||
        text.includes("loaded")
      ) {
        gridMessages.push(text);
        console.log(`📝 [${type}] ${text}`);
      }
    }
  });

  console.log("1. Navigate to demo page...");
  await page.goto("http://localhost:5173/demo");
  await page.waitForTimeout(3000);

  console.log(`   Initial messages: ${messageCount}\n`);

  // Take initial screenshot
  await page.screenshot({ path: "before-filter.png" });

  console.log("2. Looking for Quick Filter dropdown...");
  const quickFilterTriggers = await page
    .locator('[data-component="quick-filter-trigger"]')
    .all();
  console.log(`   Found ${quickFilterTriggers.length} quick filter triggers`);

  if (quickFilterTriggers.length > 0) {
    console.log("\n3. Clicking first Quick Filter dropdown...");
    await quickFilterTriggers[0].click();
    await page.waitForTimeout(1000);

    // Look for dropdown content
    const dropdownContent = page.locator(
      '[data-component="quick-filter-dropdown-content"]',
    );
    const isDropdownOpen = await dropdownContent.isVisible();
    console.log(`   Dropdown open: ${isDropdownOpen}`);

    if (isDropdownOpen) {
      // Find and click "Last 7 days"
      const last7Days = page
        .locator('[data-component="quick-filter-option"]')
        .filter({ hasText: "Last 7 days" });
      if (await last7Days.isVisible()) {
        console.log('\n4. Clicking "Last 7 days" option...');
        const beforeClick = gridMessages.length;

        await last7Days.click();
        await page.waitForTimeout(3000);

        const afterClick = gridMessages.length;
        console.log(`   Grid messages before click: ${beforeClick}`);
        console.log(`   Grid messages after click: ${afterClick}`);
        console.log(`   New messages: ${afterClick - beforeClick}`);
      }
    }
  }

  // Check URL
  const currentUrl = page.url();
  console.log(
    `\n5. Current URL: ${currentUrl.length > 150 ? currentUrl.substring(0, 150) + "..." : currentUrl}`,
  );
  console.log(`   Contains 'gridState': ${currentUrl.includes("gridState")}`);

  // Take after screenshot
  await page.screenshot({ path: "after-filter.png" });

  console.log(`\n6. Summary:`);
  console.log(`   Total console messages: ${messageCount}`);
  console.log(`   Grid-related messages: ${gridMessages.length}`);

  if (gridMessages.length === 0) {
    console.log("\n❌ No grid state messages detected!");
    console.log("This suggests grid state persistence is not working.");
  } else {
    console.log("\n✅ Grid messages found:");
    gridMessages.forEach((msg, i) => {
      console.log(
        `   ${i + 1}. ${msg.substring(0, 100)}${msg.length > 100 ? "..." : ""}`,
      );
    });
  }

  // Try to check if the functions exist
  const functionsExist = await page.evaluate(() => {
    const win = window as any;
    return {
      hasGridApi: !!win.agGridApi,
      hasSetupGridStatePersistence:
        typeof win.setupGridStatePersistence === "function",
      gridApiMethods: win.agGridApi
        ? Object.getOwnPropertyNames(win.agGridApi).slice(0, 10)
        : [],
    };
  });

  console.log("\n7. Function checks:");
  console.log(`   Grid API exists: ${functionsExist.hasGridApi}`);
  console.log(
    `   setupGridStatePersistence exists: ${functionsExist.hasSetupGridStatePersistence}`,
  );
  if (functionsExist.gridApiMethods.length > 0) {
    console.log(
      `   Grid API methods: ${functionsExist.gridApiMethods.join(", ")}...`,
    );
  }
});
