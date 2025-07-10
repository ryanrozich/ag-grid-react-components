import { test, expect } from "@playwright/test";

test.describe("Server-Side Demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
  });

  test("should switch to server-side tab without errors", async ({ page }) => {
    // Start monitoring console errors
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Click on server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the server-side demo to load
    await page.waitForSelector('text="Server-Side Row Model Demo"', {
      timeout: 5000,
    });

    // Check that no console errors occurred
    expect(consoleErrors).toHaveLength(0);
  });

  test("should load server-side data correctly", async ({ page }) => {
    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the demo to load
    await page.waitForSelector('text="Server-Side Row Model Demo"');

    // Check that the API health check shows
    await expect(page.locator('text="API Status:"')).toBeVisible();

    // Check that the grid is rendered
    const grid = page.locator(".ag-root-wrapper");
    await expect(grid).toBeVisible();

    // Wait for data to load (look for task IDs)
    await page.waitForSelector('[col-id="taskId"]', { timeout: 10000 });

    // Verify that data rows are present
    const rows = page.locator(".ag-row");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test("should display correct column headers for server-side", async ({
    page,
  }) => {
    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the grid to load
    await page.waitForSelector(".ag-header-cell");

    // Check for server-side specific column headers
    await expect(
      page.locator('.ag-header-cell-text:has-text("Task ID")'),
    ).toBeVisible();
    await expect(
      page.locator('.ag-header-cell-text:has-text("Title")'),
    ).toBeVisible();
    await expect(
      page.locator('.ag-header-cell-text:has-text("Budget")'),
    ).toBeVisible();
    await expect(
      page.locator('.ag-header-cell-text:has-text("Spent")'),
    ).toBeVisible();
  });

  test("should not show agTotalAndFilteredRowCountComponent error", async ({
    page,
  }) => {
    // Monitor for specific AG Grid error
    let hasSpecificError = false;
    page.on("console", (msg) => {
      if (
        msg.type() === "error" &&
        msg.text().includes("agTotalAndFilteredRowCountComponent")
      ) {
        hasSpecificError = true;
      }
    });

    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the grid to render
    await page.waitForSelector(".ag-root-wrapper", { timeout: 5000 });

    // Give it a moment to ensure any errors would have fired
    await page.waitForTimeout(1000);

    // Check that the specific error did not occur
    expect(hasSpecificError).toBe(false);
  });

  test("should handle search functionality", async ({ page }) => {
    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the search input
    const searchInput = page.locator(
      'input[placeholder="Search all columns..."]',
    );
    await expect(searchInput).toBeVisible();

    // Type in search
    await searchInput.fill("bug");

    // Wait for the grid to update (debounced)
    await page.waitForTimeout(500);

    // Verify that results are filtered
    await expect(page.locator('text="results"')).toBeVisible();
  });

  test("should display server stats", async ({ page }) => {
    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for stats to load
    await page.waitForSelector('text="Total Tasks"');

    // Check that all stats are displayed
    await expect(page.locator('text="Total Tasks"')).toBeVisible();
    await expect(page.locator('text="Total Budget"')).toBeVisible();
    await expect(page.locator('text="Average Progress"')).toBeVisible();
    await expect(page.locator('text="Budget Remaining"')).toBeVisible();
  });
});
