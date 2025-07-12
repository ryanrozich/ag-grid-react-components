import { test } from "@playwright/test";

test("debug filter results", async ({ page }) => {
  const consoleLogs: string[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    if (text.includes("[AGGridFilterAdapter]")) {
      consoleLogs.push(text);
    }
  });

  await page.goto("http://localhost:5173/demo");
  await page.waitForSelector(".ag-root", { timeout: 30000 });

  // Apply a filter
  const dropdown = page
    .locator("button")
    .filter({ hasText: /All Time|Time period/ })
    .first();
  await dropdown.click();
  await page.locator('button[role="option"]:has-text("This Month")').click();

  // Wait for filter to process
  await page.waitForTimeout(2000);

  // Print filter results
  console.log("\n=== Filter Results ===");
  const filterResults = consoleLogs.filter(
    (log) => log.includes("Filter result:") || log.includes("Filter summary:"),
  );

  filterResults.forEach((log) => console.log(log));

  if (filterResults.length === 0) {
    console.log("No filter results found. All logs:");
    consoleLogs.forEach((log) => console.log(log));
  }
});
