import { test, expect } from "@playwright/test";

test.describe("Navigation between pages", () => {
  test("should navigate between Home, Demo, and Docs without errors", async ({
    page,
  }) => {
    // Start on the home page
    await page.goto("/");

    // Verify we're on the home page
    await expect(page.locator("h1").first()).toContainText(
      "AG Grid React Components",
    );

    // Navigate to Demo
    await page.click('a[href="/demo"]');
    await page.waitForLoadState("networkidle");

    // Verify the grid is loaded
    await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
    await expect(page.locator(".ag-header-row")).toBeVisible();

    // Navigate back to Home
    await page.click('a[href="/"]');
    await page.waitForLoadState("networkidle");

    // Verify we're back on home
    await expect(
      page.locator('text=AG Grid filters that understand "today"'),
    ).toBeVisible();

    // Navigate to Demo again
    await page.click('a[href="/demo"]');
    await page.waitForLoadState("networkidle");

    // Verify the grid loads without errors
    await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
    await expect(page.locator(".ag-header-row")).toBeVisible();

    // Check console for errors (excluding AG Grid license warnings)
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        // Ignore AG Grid Enterprise license warnings - they contain asterisks and license-related text
        if (
          !text.includes("AG Grid Enterprise") &&
          !text.includes("License Key Not Found") &&
          !text.includes("ag-grid.com") &&
          !text.includes("****") &&
          !text.includes("license")
        ) {
          consoleErrors.push(text);
        }
      }
    });

    // Navigate to docs and back
    await page.click('a[href="/docs"]');
    await page.waitForLoadState("networkidle");
    // Use a more specific selector since there are multiple "Documentation" texts on the page
    await expect(
      page
        .locator("h1")
        .filter({ hasText: "AG Grid React Components Documentation" }),
    ).toBeVisible();

    await page.click('a[href="/demo"]');
    await page.waitForLoadState("networkidle");

    // Final check for grid
    await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();

    // Verify no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test("should maintain grid state when staying on demo page", async ({
    page,
  }) => {
    await page.goto("/demo");
    await page.waitForLoadState("networkidle");

    // Apply a filter
    await page.click("text=Due Date");
    await page.waitForTimeout(500);

    // Verify filter UI appears (use first() to avoid strict mode violation)
    const filterDialog = page
      .locator(".ag-theme-quartz-dark .ag-filter")
      .first();
    await expect(filterDialog).toBeVisible();

    // Close filter
    await page.keyboard.press("Escape");

    // Grid should still be functional
    await expect(page.locator(".ag-header-row")).toBeVisible();
  });
});
