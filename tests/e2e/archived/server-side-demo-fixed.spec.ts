import { test, expect } from "@playwright/test";

test.describe("Server-Side Demo Fixed", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/demo");
  });

  test("should switch to server-side tab without critical errors", async ({
    page,
  }) => {
    // Start monitoring console errors
    const criticalErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        // Ignore AG Grid license warnings
        if (
          !text.includes("AG Grid Enterprise License") &&
          !text.includes("License Key Not Found") &&
          !text.includes("***")
        ) {
          criticalErrors.push(text);
        }
      }
    });

    // Click on server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the server-side demo to load
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000); // Give time for any errors to surface

    // Check that no critical console errors occurred
    expect(criticalErrors).toHaveLength(0);
  });

  test("should render server-side demo components", async ({ page }) => {
    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Check that the banner is visible
    await expect(page.locator('text="Server-Side Row Model Demo"')).toBeVisible(
      { timeout: 10000 },
    );

    // Check that the API status is shown
    await expect(page.locator('text="API Status:"')).toBeVisible();

    // Check that stats are displayed
    await expect(page.locator('text="Total Tasks"')).toBeVisible();
    await expect(page.locator('text="Total Budget"')).toBeVisible();
  });

  test("should display the AG Grid with server-side data", async ({ page }) => {
    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the grid to be visible
    const grid = page.locator(".ag-root-wrapper");
    await expect(grid).toBeVisible({ timeout: 10000 });

    // Check that headers are visible
    await expect(page.locator(".ag-header-row")).toBeVisible();

    // Check for specific server-side headers
    await expect(
      page.locator('.ag-header-cell-text:has-text("Task ID")'),
    ).toBeVisible();
    await expect(
      page.locator('.ag-header-cell-text:has-text("Title")'),
    ).toBeVisible();

    // Wait for data rows to appear
    await page.waitForSelector(".ag-row", { timeout: 10000 });

    // Verify data is loaded
    const rows = await page.locator(".ag-row").count();
    expect(rows).toBeGreaterThan(0);
  });

  test("should not have incompatible status bar components", async ({
    page,
  }) => {
    // Monitor for specific AG Grid warnings
    let hasIncompatibleComponents = false;
    page.on("console", (msg) => {
      if (msg.type() === "warning") {
        const text = msg.text();
        if (
          text.includes("agTotalAndFilteredRowCountComponent") ||
          text.includes(
            "agTotalRowCountComponent should only be used with the client side",
          ) ||
          text.includes(
            "agFilteredRowCountComponent should only be used with the client side",
          )
        ) {
          hasIncompatibleComponents = true;
        }
      }
    });

    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for the grid to render
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Verify no incompatible components were used
    expect(hasIncompatibleComponents).toBe(false);
  });

  test("should handle search functionality in server-side mode", async ({
    page,
  }) => {
    // Switch to server-side tab
    await page.click('button:has-text("Server-Side Data")');

    // Wait for search input
    const searchInput = page.locator(
      'input[placeholder="Search all columns..."]',
    );
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Type a search term
    await searchInput.fill("bug");

    // Wait for debounce and check results
    await page.waitForTimeout(500);

    // Verify search is working by checking for results indicator
    await expect(page.locator('text="results"')).toBeVisible();
  });

  test("server-side data should be different from client-side", async ({
    page,
  }) => {
    // First check client-side headers
    await page.waitForSelector(".ag-header-cell-text");
    const clientHeaders = await page
      .locator(".ag-header-cell-text")
      .allTextContents();

    // Switch to server-side
    await page.click('button:has-text("Server-Side Data")');
    await page.waitForTimeout(1000);

    // Check server-side headers
    await page.waitForSelector(".ag-header-cell-text");
    const serverHeaders = await page
      .locator(".ag-header-cell-text")
      .allTextContents();

    // Headers should be different (Task ID vs ID, Title vs Task, etc.)
    expect(serverHeaders).toContain("Task ID");
    expect(serverHeaders).toContain("Title");
    expect(clientHeaders).not.toContain("Task ID");
    expect(clientHeaders).not.toContain("Title");
  });
});
