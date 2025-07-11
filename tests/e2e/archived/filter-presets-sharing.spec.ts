import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * E2E tests for filter preset sharing via URL
 * Tests the functionality of generating shareable URLs and loading presets from URLs
 */

test.describe("Filter Presets - URL Sharing", () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;

    // Navigate to the demo page
    await page.goto("/");

    // Wait for the grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
  });

  test("should generate shareable URL for current filters", async () => {
    // Apply some filters
    await applyTestFilters(page);

    // Open share dialog
    await page.click('[data-testid="share-filters-button"]');

    // Get the generated URL
    const shareUrlInput = page.locator('[data-testid="share-url-input"]');
    await expect(shareUrlInput).toBeVisible();

    const shareUrl = await shareUrlInput.inputValue();

    // Verify URL format
    expect(shareUrl).toContain(page.url().split("?")[0]); // Base URL
    expect(shareUrl).toContain("?p="); // Parameter

    // Verify copy button works
    await page.click('[data-testid="copy-share-url-button"]');

    // Check for success message
    await expect(
      page.locator('[data-testid="url-copied-message"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="url-copied-message"]'),
    ).toContainText("URL copied to clipboard");
  });

  test("should load filters from shareable URL", async () => {
    // First, create a shareable URL
    await applyTestFilters(page);
    await page.click('[data-testid="share-filters-button"]');
    const shareUrl = await page
      .locator('[data-testid="share-url-input"]')
      .inputValue();

    // Navigate to a clean state
    await page.goto("/");
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });

    // Verify no filters are active
    await expect(page.locator(".ag-filter-active")).not.toBeVisible();

    // Navigate to the shareable URL
    await page.goto(shareUrl);
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });

    // Verify filters are applied from URL
    await verifyFiltersApplied(page);
  });

  test("should generate shareable URL for saved preset", async () => {
    // Create a preset
    await createTestPreset(page, "Shareable Preset");

    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Click share button for the preset
    await page.click(
      '[data-testid="preset-item-Shareable Preset"] [data-testid="share-preset-button"]',
    );

    // Verify share dialog opens with preset URL
    const shareUrlInput = page.locator('[data-testid="share-url-input"]');
    await expect(shareUrlInput).toBeVisible();

    const shareUrl = await shareUrlInput.inputValue();
    expect(shareUrl).toContain("?p="); // Should contain preset data
  });

  test("should handle loading invalid URL gracefully", async () => {
    // Navigate to URL with invalid preset data
    await page.goto("/?p=invalid-data-xyz");

    // Wait for page to load
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });

    // Should show error message
    await expect(
      page.locator('[data-testid="invalid-url-message"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="invalid-url-message"]'),
    ).toContainText("Unable to load filters from URL");

    // Grid should still be functional
    await expect(page.locator(".ag-root-wrapper")).toBeVisible();
  });

  test("should update URL when filters change", async () => {
    // Enable URL sync
    await page.click('[data-testid="settings-button"]');
    await page.check('[data-testid="url-sync-checkbox"]');
    await page.click('[data-testid="close-settings"]');

    // Apply initial filter
    await applyStatusFilter(page, "active");

    // Check URL updated
    await page.waitForTimeout(500); // Wait for debounce
    let currentUrl = page.url();
    expect(currentUrl).toContain("?p=");

    const firstUrlParam = new URL(currentUrl).searchParams.get("p");

    // Apply another filter
    await applyDateFilter(page, "after", "2023-01-01");

    // Check URL updated again
    await page.waitForTimeout(500); // Wait for debounce
    currentUrl = page.url();
    const secondUrlParam = new URL(currentUrl).searchParams.get("p");

    // URLs should be different
    expect(secondUrlParam).not.toBe(firstUrlParam);
  });

  test("should support browser back/forward navigation", async () => {
    // Enable URL sync
    await page.click('[data-testid="settings-button"]');
    await page.check('[data-testid="url-sync-checkbox"]');
    await page.click('[data-testid="close-settings"]');

    // Apply first filter
    await applyStatusFilter(page, "active");
    await page.waitForTimeout(500);

    // Apply second filter
    await applyDateFilter(page, "after", "2023-01-01");
    await page.waitForTimeout(500);

    // Go back
    await page.goBack();
    await page.waitForTimeout(500);

    // Should only have status filter
    await expect(
      page.locator('[col-id="status"] .ag-filter-active'),
    ).toBeVisible();
    await expect(
      page.locator('[col-id="date"] .ag-filter-active'),
    ).not.toBeVisible();

    // Go forward
    await page.goForward();
    await page.waitForTimeout(500);

    // Should have both filters
    await expect(
      page.locator('[col-id="status"] .ag-filter-active'),
    ).toBeVisible();
    await expect(
      page.locator('[col-id="date"] .ag-filter-active'),
    ).toBeVisible();
  });

  test("should handle very long URLs with compression", async () => {
    // Apply many filters to create a long URL
    await applyManyFilters(page);

    // Generate shareable URL
    await page.click('[data-testid="share-filters-button"]');
    const shareUrl = await page
      .locator('[data-testid="share-url-input"]')
      .inputValue();

    // URL should be reasonably short due to compression
    expect(shareUrl.length).toBeLessThan(2000); // Most browsers support up to 2000 chars

    // Verify it still works
    await page.goto("/");
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
    await page.goto(shareUrl);
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });

    // Verify all filters are restored
    await verifyManyFiltersApplied(page);
  });

  test("should show QR code for mobile sharing", async () => {
    // Apply filters
    await applyTestFilters(page);

    // Open share dialog
    await page.click('[data-testid="share-filters-button"]');

    // Click QR code button
    await page.click('[data-testid="show-qr-code-button"]');

    // Verify QR code is displayed
    await expect(page.locator('[data-testid="share-qr-code"]')).toBeVisible();

    // Verify QR code contains the share URL
    const qrCodeImage = page.locator('[data-testid="share-qr-code"] img');
    await expect(qrCodeImage).toBeVisible();
    await expect(qrCodeImage).toHaveAttribute("alt", /QR Code for sharing/);
  });

  test("should handle cross-origin sharing restrictions", async () => {
    // This test simulates sharing to a different domain
    // In real scenario, this would be blocked by CORS

    // Apply filters
    await applyTestFilters(page);

    // Generate shareable URL
    await page.click('[data-testid="share-filters-button"]');
    const shareUrl = await page
      .locator('[data-testid="share-url-input"]')
      .inputValue();

    // Verify URL uses relative format for cross-origin compatibility
    const url = new URL(shareUrl);
    const presetData = url.searchParams.get("p");

    // Data should be self-contained in the URL parameter
    expect(presetData).toBeTruthy();
    expect(presetData!.length).toBeGreaterThan(0);
  });

  test("should provide shortened URL option", async () => {
    // Apply complex filters
    await applyComplexFilters(page);

    // Open share dialog
    await page.click('[data-testid="share-filters-button"]');

    // Original URL
    const originalUrl = await page
      .locator('[data-testid="share-url-input"]')
      .inputValue();

    // Click shorten URL button
    await page.click('[data-testid="shorten-url-button"]');

    // Wait for shortened URL
    await page.waitForSelector('[data-testid="shortened-url-input"]');
    const shortenedUrl = await page
      .locator('[data-testid="shortened-url-input"]')
      .inputValue();

    // Shortened URL should be shorter
    expect(shortenedUrl.length).toBeLessThan(originalUrl.length);

    // Should show both URLs
    await expect(page.locator('[data-testid="share-url-input"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="shortened-url-input"]'),
    ).toBeVisible();
  });

  test("should expire shared URLs after specified time", async () => {
    // Apply filters
    await applyTestFilters(page);

    // Open share dialog
    await page.click('[data-testid="share-filters-button"]');

    // Set expiration
    await page.selectOption('[data-testid="share-expiration-select"]', "1hour");

    // Generate URL
    await page.click('[data-testid="generate-expiring-url-button"]');

    const shareUrl = await page
      .locator('[data-testid="share-url-input"]')
      .inputValue();

    // URL should contain expiration parameter
    expect(shareUrl).toContain("exp=");

    // Verify expiration notice is shown
    await expect(
      page.locator('[data-testid="expiration-notice"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="expiration-notice"]'),
    ).toContainText("This link will expire in 1 hour");
  });
});

// Helper functions

async function applyTestFilters(page: Page) {
  await applyStatusFilter(page, "active");
  await applyDateFilter(page, "after", "2023-01-01");
}

async function applyStatusFilter(page: Page, value: string) {
  await page.click('[col-id="status"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.fill('[data-testid="status-filter-input"]', value);
  await page.click('[data-testid="apply-filter-button"]');
}

async function applyDateFilter(page: Page, type: string, value: string) {
  await page.click('[col-id="date"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="date-filter-type"]', type);
  await page.fill('[data-testid="date-filter-input"]', value);
  await page.click('[data-testid="apply-filter-button"]');
}

async function applyManyFilters(page: Page) {
  // Apply filters to multiple columns
  const columns = ["status", "priority", "category", "assignee", "department"];

  for (const column of columns) {
    await page.click(`[col-id="${column}"] .ag-header-cell-menu-button`);
    await page.click('[data-testid="filter-menu-item"]');
    await page.fill(`[data-testid="${column}-filter-input"]`, `test-${column}`);
    await page.click('[data-testid="apply-filter-button"]');
  }
}

async function applyComplexFilters(page: Page) {
  // Apply date range
  await page.click('[col-id="date"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="date-filter-type"]', "inRange");
  await page.fill('[data-testid="date-filter-from"]', "2023-01-01");
  await page.fill('[data-testid="date-filter-to"]', "2023-12-31");
  await page.click('[data-testid="apply-filter-button"]');

  // Apply multiple text filters
  await applyStatusFilter(page, "active");

  // Apply number range
  await page.click('[col-id="amount"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="amount-filter-type"]', "inRange");
  await page.fill('[data-testid="amount-filter-from"]', "1000");
  await page.fill('[data-testid="amount-filter-to"]', "5000");
  await page.click('[data-testid="apply-filter-button"]');
}

async function createTestPreset(page: Page, name: string) {
  await applyTestFilters(page);
  await page.click('[data-testid="preset-manager-button"]');
  await page.click('[data-testid="save-preset-button"]');
  await page.fill('[data-testid="preset-name-input"]', name);
  await page.click('[data-testid="confirm-save-preset"]');
  await page.waitForSelector('[data-testid="preset-saved-message"]');
}

async function verifyFiltersApplied(page: Page) {
  await expect(
    page.locator('[col-id="status"] .ag-filter-active'),
  ).toBeVisible();
  await expect(page.locator('[col-id="date"] .ag-filter-active')).toBeVisible();
}

async function verifyManyFiltersApplied(page: Page) {
  const columns = ["status", "priority", "category", "assignee", "department"];

  for (const column of columns) {
    await expect(
      page.locator(`[col-id="${column}"] .ag-filter-active`),
    ).toBeVisible();
  }
}
