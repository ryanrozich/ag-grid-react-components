import { test } from "@playwright/test";

test("check demo page structure", async ({ page }) => {
  await page.goto("http://localhost:5173/demo");

  // Wait for the grid to load
  await page.waitForSelector(".ag-root", { timeout: 30000 });

  // Take a screenshot
  await page.screenshot({
    path: "test-results/demo-page-check.png",
    fullPage: true,
  });

  // Log all visible buttons
  console.log("\n=== All visible buttons ===");
  const buttons = await page.locator("button").all();
  for (const button of buttons) {
    const text = await button.textContent();
    if (text) {
      console.log(`Button: "${text.trim()}"`);
    }
  }

  // Check for dropdowns
  const dropdowns = await page
    .locator('[data-component="quick-filter-dropdown-root"]')
    .all();
  console.log(`\nFound ${dropdowns.length} quick filter dropdowns`);

  // Check for grid
  const gridRows = await page.locator(".ag-row").count();
  console.log(`\nGrid has ${gridRows} rows`);

  // Check stats
  const statsText = await page.locator("body").textContent();
  if (statsText?.includes("NUMBER OF TASKS")) {
    const match = statsText.match(/NUMBER OF TASKS\s*([\d,]+)/);
    if (match) {
      console.log(`\nNUMBER OF TASKS: ${match[1]}`);
    }
  }
});
