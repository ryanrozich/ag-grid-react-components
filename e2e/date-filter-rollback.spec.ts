import { test, expect } from "@playwright/test";

test("Date filter works without infinite loop after rollback", async ({
  page,
}) => {
  const consoleLogs: string[] = [];

  // Capture console logs
  page.on("console", (msg) => {
    if (msg.type() === "log") {
      const text = msg.text();
      consoleLogs.push(text);
    }
  });

  // Navigate to the demo page
  await page.goto("/demo");

  // Wait for the grid to be ready
  await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });

  // Give it a moment to potentially start looping
  await page.waitForTimeout(2000);

  // Check that we don't have excessive "Grid state saved to URL" messages
  const saveToUrlLogs = consoleLogs.filter((log) =>
    log.includes("Grid state saved to URL"),
  );
  console.log(
    `Found ${saveToUrlLogs.length} "Grid state saved to URL" messages in first 2 seconds`,
  );

  // We should have at most a few saves, not hundreds
  expect(saveToUrlLogs.length).toBeLessThan(10);

  // Now test that the "Last 7 days" preset works
  consoleLogs.length = 0; // Clear logs

  // Click on Quick Filter dropdown
  await page.locator('[data-testid="quick-filter-dropdown-trigger"]').click();

  // Click on "Last 7 days" preset
  await page.locator('text="Last 7 days"').click();

  // Wait a moment for filter to apply
  await page.waitForTimeout(1000);

  // Check console logs again
  const newSaveToUrlLogs = consoleLogs.filter((log) =>
    log.includes("Grid state saved to URL"),
  );
  console.log(
    `Found ${newSaveToUrlLogs.length} "Grid state saved to URL" messages after clicking preset`,
  );

  // Should have some state saves but not an infinite loop
  expect(newSaveToUrlLogs.length).toBeGreaterThan(0);
  expect(newSaveToUrlLogs.length).toBeLessThan(10);

  // Verify the filter is actually applied
  const activeFilters = await page
    .locator('[data-component="active-filters"]')
    .isVisible();
  expect(activeFilters).toBe(true);

  // Check for the Due Date filter pill
  const dueDateFilter = await page
    .locator('[data-component="active-filters-item"]:has-text("Due Date")')
    .isVisible();
  expect(dueDateFilter).toBe(true);

  // Get the row count to verify filtering is working
  const rowCountElement = await page.locator(
    '.ag-status-bar .ag-status-name-value:has-text("of")',
  );
  const rowCountText = await rowCountElement.textContent();
  console.log(`Row count after filter: ${rowCountText}`);

  // The row count should show filtering (not all 1000 rows)
  expect(rowCountText).not.toContain("of 1,000");

  // Now click on the Due Date filter pill to open the filter UI
  await page
    .locator('[data-component="active-filters-item"]:has-text("Due Date")')
    .click();

  // Wait for the filter UI to appear
  await page.waitForSelector(".ag-menu", { timeout: 5000 });

  // Verify the DateFilter shows the current filter state
  const relativeInput = await page.locator(
    'input[placeholder*="e.g., -7d, today, last week"]',
  );
  const relativeValue = await relativeInput.inputValue();

  console.log(`DateFilter relative input value: "${relativeValue}"`);

  // The filter should show the relative date value
  expect(relativeValue).toBeTruthy();
  expect(["today-7d", "last 7 days", "-7d"]).toContain(
    relativeValue.toLowerCase(),
  );
});
