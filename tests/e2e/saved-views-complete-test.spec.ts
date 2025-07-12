import { test, expect } from "@playwright/test";

test("complete saved views test with console monitoring", async ({ page }) => {
  // Monitor console for errors
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
      console.log("Console error:", msg.text());
    }
  });

  page.on("pageerror", (error) => {
    console.log("Page error:", error.message);
  });

  // Navigate to demo
  await page.goto("http://localhost:5174/demo");
  await page.waitForLoadState("networkidle");

  // Click Server-Side Data tab
  await page.click('button:has-text("Server-Side Data")');
  await page.waitForTimeout(2000);

  // Click saved views trigger
  await page.click("[data-saved-views-trigger]");
  await page.waitForTimeout(1000);

  // Verify panel is open
  const panel = page.locator("[data-saved-views-panel]");
  await expect(panel).toBeVisible();

  // Click save button and wait
  console.log("Clicking save button...");
  await page.click('[data-action="save"]');

  // Wait for potential dialog with various selectors
  const dialogSelectors = [
    "[data-save-view-dialog]",
    "[role='dialog']",
    "#saved-views-dialog-portal",
    ".save-view-dialog",
  ];

  let dialogFound = false;
  for (const selector of dialogSelectors) {
    const count = await page.locator(selector).count();
    if (count > 0) {
      console.log(`Found dialog with selector: ${selector}`);
      dialogFound = true;
      break;
    }
  }

  // Check if dialog content is in DOM but maybe hidden
  const dialogInDOM = await page.locator("[data-save-view-dialog]").count();
  console.log(`Dialog elements in DOM: ${dialogInDOM}`);

  // Check portal root
  const portalRoot = await page.evaluate(() => {
    return document.getElementById("saved-views-dialog-portal");
  });
  console.log(`Portal root exists: ${portalRoot !== null}`);

  // Check React DevTools for component state if available
  const savedViewsState = await page.evaluate(() => {
    // This is a simplified check, actual implementation would need React DevTools
    return window.React ? "React found" : "React not found";
  });
  console.log(`React check: ${savedViewsState}`);

  // Report findings
  console.log(`Dialog found: ${dialogFound}`);
  console.log(`Console errors: ${consoleErrors.length}`);
  consoleErrors.forEach((err) => console.log(`  - ${err}`));

  // Take screenshot
  await page.screenshot({
    path: "saved-views-complete-test.png",
    fullPage: true,
  });
});
