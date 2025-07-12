import { test, expect } from "@playwright/test";

test("debug SavedViewsManager", async ({ page }) => {
  console.log("Navigating to demo...");

  // Try different URLs
  const response = await page.goto("http://localhost:5173/demo", {
    waitUntil: "networkidle",
    timeout: 60000,
  });

  console.log("Response status:", response?.status());
  console.log("Page URL:", page.url());

  // Take screenshot
  await page.screenshot({
    path: "test-results/debug-navigation.png",
    fullPage: true,
  });

  // Check page title
  const title = await page.title();
  console.log("Page title:", title);

  // Check for any console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error("Console error:", msg.text());
    }
  });

  // Wait a bit and check for content
  await page.waitForTimeout(5000);

  // Check if there's any content
  const bodyText = await page.locator("body").textContent();
  console.log("Body text length:", bodyText?.length);
  console.log("First 200 chars:", bodyText?.substring(0, 200));

  // Try to find the grid
  const gridExists = await page.locator(".ag-root").count();
  console.log("AG Grid found:", gridExists > 0);

  // Try to find SavedViews button
  const savedViewsExists = await page
    .locator('button:has-text("Saved Views")')
    .count();
  console.log("SavedViews button found:", savedViewsExists > 0);

  // Take final screenshot
  await page.screenshot({
    path: "test-results/debug-final.png",
    fullPage: true,
  });
});
