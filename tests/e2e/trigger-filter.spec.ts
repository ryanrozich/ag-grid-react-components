import { test } from "@playwright/test";

test("Manually trigger filter to see if state saves", async ({ page }) => {
  console.log("Testing manual filter trigger...\n");

  let saveCount = 0;
  const allMessages: string[] = [];

  // Capture console messages
  page.on("console", (msg) => {
    const text = msg.text();
    allMessages.push(text);

    if (text.includes("Grid state saved to URL")) {
      saveCount++;
      console.log(`🔴 SAVE #${saveCount}: ${text}`);
    } else if (text.includes("Grid state loaded from URL")) {
      console.log(`🔵 LOAD: ${text}`);
    } else if (text.includes("[gridStateUtils]")) {
      console.log(`🔧 ${text}`);
    } else if (text.includes("Called setFilterModel")) {
      console.log(`📝 ${text}`);
    }
  });

  console.log("1. Navigate to demo page...");
  await page.goto("http://localhost:5173/demo");
  await page.waitForTimeout(3000);

  console.log(`   Saves after initial load: ${saveCount}\n`);

  // Check if grid exists
  const gridExists = await page.locator(".ag-theme-quartz").isVisible();
  console.log(`2. Grid exists: ${gridExists}`);

  if (!gridExists) {
    console.log("   ❌ Grid not found!");
    return;
  }

  // Try to manually trigger a filter change
  console.log("\n3. Trying to open column menu for Status column...");
  try {
    // Hover over Status column header
    const statusHeader = page
      .locator(".ag-header-cell")
      .filter({ hasText: "Status" })
      .first();
    if (await statusHeader.isVisible()) {
      await statusHeader.hover();
      console.log("   Hovered over Status header");

      // Click menu button
      const menuButton = statusHeader
        .locator(".ag-header-cell-menu-button")
        .first();
      if (await menuButton.isVisible()) {
        await menuButton.click();
        console.log("   Clicked menu button");
        await page.waitForTimeout(500);

        // Click Filter menu item
        const filterMenuItem = page
          .locator(".ag-menu-option")
          .filter({ hasText: "Filter" })
          .first();
        if (await filterMenuItem.isVisible()) {
          await filterMenuItem.click();
          console.log("   Clicked Filter menu item");
          await page.waitForTimeout(1000);

          // Try to select a filter value
          const filterOption = page.locator(".ag-set-filter-item").first();
          if (await filterOption.isVisible()) {
            await filterOption.click();
            console.log("   Selected a filter option");
            await page.waitForTimeout(2000);
          }
        }
      }
    }
  } catch (e) {
    console.log(`   Error: ${e.message}`);
  }

  console.log(`\n4. Saves after manual filter: ${saveCount}`);

  // Check the URL
  const currentUrl = page.url();
  console.log(
    `\n5. Current URL: ${currentUrl.length > 100 ? currentUrl.substring(0, 100) + "..." : currentUrl}`,
  );
  console.log(`   Contains gridState: ${currentUrl.includes("gridState")}`);

  // Try using Quick Filter Dropdown
  console.log("\n6. Trying Quick Filter Dropdown...");
  const quickFilter = page
    .locator('[data-component="quick-filter-trigger"]')
    .first();
  if (await quickFilter.isVisible()) {
    await quickFilter.click();
    console.log("   Clicked quick filter trigger");
    await page.waitForTimeout(500);

    const option = page
      .locator('[data-component="quick-filter-option"]')
      .filter({ hasText: "Last 7 days" })
      .first();
    if (await option.isVisible()) {
      await option.click();
      console.log('   Selected "Last 7 days"');
      await page.waitForTimeout(3000);
    }
  } else {
    console.log("   Quick filter not found");
  }

  console.log(`\n7. Final save count: ${saveCount}`);

  // Show any grid/state related messages
  console.log("\n8. Grid/State related messages:");
  const relevantMessages = allMessages
    .filter(
      (m) =>
        m.toLowerCase().includes("grid") ||
        m.toLowerCase().includes("state") ||
        m.toLowerCase().includes("filter"),
    )
    .slice(0, 20);

  relevantMessages.forEach((m) =>
    console.log(`   ${m.substring(0, 100)}${m.length > 100 ? "..." : ""}`),
  );

  if (saveCount === 0) {
    console.log("\n❌ No grid state saves detected!");
    console.log("Possible issues:");
    console.log("- Grid state persistence not initialized");
    console.log("- Console.log statements not executing");
    console.log("- Event listeners not attached");
  } else if (saveCount > 20) {
    console.log("\n🚨 Possible infinite loop detected!");
  }

  await page.screenshot({ path: "trigger-filter-result.png", fullPage: true });
});
