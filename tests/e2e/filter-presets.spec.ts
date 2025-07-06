import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * E2E tests for filter preset functionality
 * Tests the complete user flow of saving, loading, and managing filter presets
 */

test.describe("Filter Presets - Save and Load Flow", () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;

    // Navigate to the demo page
    await page.goto("/");

    // Wait for the grid to be ready
    await page.waitForSelector(".ag-root", { timeout: 10000 });

    // Clear any existing presets from localStorage
    await page.evaluate(() => {
      localStorage.removeItem("ag-grid-filter-presets");
    });
  });

  test("should save current filters as a preset", async () => {
    // Apply some filters first
    await applyTestFilters(page);

    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Click save preset button
    await page.click('[data-testid="save-preset-button"]');

    // Fill in preset details
    await page.fill('[data-testid="preset-name-input"]', "My Test Preset");
    await page.fill(
      '[data-testid="preset-description-input"]',
      "Filters for testing",
    );

    // Add tags
    await page.fill('[data-testid="preset-tags-input"]', "test, e2e");

    // Save the preset
    await page.click('[data-testid="confirm-save-preset"]');

    // Verify success message
    await expect(
      page.locator('[data-testid="preset-saved-message"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="preset-saved-message"]'),
    ).toContainText("Preset saved successfully");

    // Verify preset appears in the list
    await expect(
      page.locator('[data-testid="preset-item-My Test Preset"]'),
    ).toBeVisible();
  });

  test("should load a saved preset", async () => {
    // First save a preset
    await createTestPreset(page, "Test Load Preset");

    // Clear current filters
    await page.click('[data-testid="clear-all-filters"]');

    // Verify filters are cleared
    await expect(page.locator(".ag-filter-active")).not.toBeVisible();

    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Click on the preset to load it
    await page.click('[data-testid="preset-item-Test Load Preset"]');

    // Verify filters are applied
    await expect(page.locator(".ag-filter-active")).toBeVisible();

    // Verify specific filter values
    await verifyFiltersApplied(page);
  });

  test("should show system presets alongside user presets", async () => {
    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Verify system presets are visible
    await expect(
      page.locator('[data-testid="preset-item-Recent Activity"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="preset-item-High Priority"]'),
    ).toBeVisible();

    // Verify system preset indicators
    await expect(
      page.locator(
        '[data-testid="preset-item-Recent Activity"] [data-testid="system-preset-badge"]',
      ),
    ).toBeVisible();

    // Create a user preset
    await createTestPreset(page, "My User Preset");

    // Verify both types are shown
    await page.click('[data-testid="preset-manager-button"]');
    await expect(
      page.locator('[data-testid="preset-item-Recent Activity"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="preset-item-My User Preset"]'),
    ).toBeVisible();

    // Verify user preset doesn't have system badge
    await expect(
      page.locator(
        '[data-testid="preset-item-My User Preset"] [data-testid="system-preset-badge"]',
      ),
    ).not.toBeVisible();
  });

  test("should update an existing preset", async () => {
    // Create initial preset
    await createTestPreset(page, "Original Preset");

    // Apply different filters
    await page.click('[data-testid="clear-all-filters"]');
    await applyDifferentFilters(page);

    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Click update button on the preset
    await page.click(
      '[data-testid="preset-item-Original Preset"] [data-testid="update-preset-button"]',
    );

    // Confirm update
    await page.click('[data-testid="confirm-update-preset"]');

    // Verify success message
    await expect(
      page.locator('[data-testid="preset-updated-message"]'),
    ).toBeVisible();

    // Load the preset and verify new filters are applied
    await page.click('[data-testid="clear-all-filters"]');
    await page.click('[data-testid="preset-manager-button"]');
    await page.click('[data-testid="preset-item-Original Preset"]');

    await verifyDifferentFiltersApplied(page);
  });

  test("should delete a user preset", async () => {
    // Create a preset
    await createTestPreset(page, "Preset to Delete");

    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Verify preset exists
    await expect(
      page.locator('[data-testid="preset-item-Preset to Delete"]'),
    ).toBeVisible();

    // Click delete button
    await page.click(
      '[data-testid="preset-item-Preset to Delete"] [data-testid="delete-preset-button"]',
    );

    // Confirm deletion
    await page.click('[data-testid="confirm-delete-preset"]');

    // Verify preset is removed
    await expect(
      page.locator('[data-testid="preset-item-Preset to Delete"]'),
    ).not.toBeVisible();

    // Verify success message
    await expect(
      page.locator('[data-testid="preset-deleted-message"]'),
    ).toBeVisible();
  });

  test("should not allow deleting system presets", async () => {
    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Verify delete button is not present for system presets
    await expect(
      page.locator(
        '[data-testid="preset-item-Recent Activity"] [data-testid="delete-preset-button"]',
      ),
    ).not.toBeVisible();
  });

  test("should enforce maximum user presets limit", async () => {
    // Create maximum number of presets (assuming limit is 10)
    for (let i = 1; i <= 10; i++) {
      await createTestPreset(page, `Preset ${i}`);
    }

    // Try to create one more
    await applyTestFilters(page);
    await page.click('[data-testid="preset-manager-button"]');

    // Save button should be disabled
    await expect(
      page.locator('[data-testid="save-preset-button"]'),
    ).toBeDisabled();

    // Verify limit message
    await expect(
      page.locator('[data-testid="preset-limit-message"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="preset-limit-message"]'),
    ).toContainText("Maximum number of presets reached");
  });

  test("should persist presets across page reloads", async () => {
    // Create a preset
    await createTestPreset(page, "Persistent Preset");

    // Reload the page
    await page.reload();

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root", { timeout: 10000 });

    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Verify preset still exists
    await expect(
      page.locator('[data-testid="preset-item-Persistent Preset"]'),
    ).toBeVisible();
  });

  test("should handle preset with complex filters", async () => {
    // Apply complex filters
    await applyComplexFilters(page);

    // Save as preset
    await page.click('[data-testid="preset-manager-button"]');
    await page.click('[data-testid="save-preset-button"]');
    await page.fill('[data-testid="preset-name-input"]', "Complex Filters");
    await page.click('[data-testid="confirm-save-preset"]');

    // Clear filters
    await page.click('[data-testid="clear-all-filters"]');

    // Load the preset
    await page.click('[data-testid="preset-manager-button"]');
    await page.click('[data-testid="preset-item-Complex Filters"]');

    // Verify all complex filters are restored
    await verifyComplexFiltersApplied(page);
  });

  test("should search/filter presets list", async () => {
    // Create multiple presets
    await createTestPreset(page, "Sales Report Q1");
    await createTestPreset(page, "Sales Report Q2");
    await createTestPreset(page, "Marketing Analysis");
    await createTestPreset(page, "Customer Feedback");

    // Open preset manager
    await page.click('[data-testid="preset-manager-button"]');

    // Search for "Sales"
    await page.fill('[data-testid="preset-search-input"]', "Sales");

    // Verify only sales presets are visible
    await expect(
      page.locator('[data-testid="preset-item-Sales Report Q1"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="preset-item-Sales Report Q2"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="preset-item-Marketing Analysis"]'),
    ).not.toBeVisible();
    await expect(
      page.locator('[data-testid="preset-item-Customer Feedback"]'),
    ).not.toBeVisible();
  });

  test("should load default preset on initialization", async () => {
    // Navigate to page with default preset parameter
    await page.goto("/?defaultPreset=recent");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root", { timeout: 10000 });

    // Verify filters from "Recent Activity" preset are applied
    await expect(page.locator(".ag-filter-active")).toBeVisible();

    // Verify specific filter for recent activity
    const dateFilterElement = await page.locator(
      '[col-id="date"] .ag-filter-active',
    );
    await expect(dateFilterElement).toBeVisible();
  });

  test("should show preset usage count", async () => {
    // Create a preset
    await createTestPreset(page, "Usage Test Preset");

    // Load it multiple times
    for (let i = 0; i < 3; i++) {
      await page.click('[data-testid="clear-all-filters"]');
      await page.click('[data-testid="preset-manager-button"]');
      await page.click('[data-testid="preset-item-Usage Test Preset"]');
      await page.waitForTimeout(500); // Small delay between loads
    }

    // Open preset manager and check usage count
    await page.click('[data-testid="preset-manager-button"]');
    const usageCount = await page.locator(
      '[data-testid="preset-item-Usage Test Preset"] [data-testid="usage-count"]',
    );
    await expect(usageCount).toContainText("Used 3 times");
  });
});

// Helper functions

async function applyTestFilters(page: Page) {
  // Apply status filter
  await page.click('[col-id="status"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.fill('[data-testid="status-filter-input"]', "active");
  await page.click('[data-testid="apply-filter-button"]');

  // Apply date filter
  await page.click('[col-id="date"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="date-filter-type"]', "after");
  await page.fill('[data-testid="date-filter-input"]', "2023-01-01");
  await page.click('[data-testid="apply-filter-button"]');
}

async function applyDifferentFilters(page: Page) {
  // Apply different filters
  await page.click('[col-id="amount"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="amount-filter-type"]', "greaterThan");
  await page.fill('[data-testid="amount-filter-input"]', "1000");
  await page.click('[data-testid="apply-filter-button"]');
}

async function applyComplexFilters(page: Page) {
  // Apply multiple complex filters
  // Date range filter
  await page.click('[col-id="date"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="date-filter-type"]', "inRange");
  await page.fill('[data-testid="date-filter-from"]', "2023-01-01");
  await page.fill('[data-testid="date-filter-to"]', "2023-12-31");
  await page.click('[data-testid="apply-filter-button"]');

  // Text contains filter
  await page.click('[col-id="description"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="text-filter-type"]', "contains");
  await page.fill('[data-testid="text-filter-input"]', "important");
  await page.click('[data-testid="apply-filter-button"]');

  // Number range filter
  await page.click('[col-id="amount"] .ag-header-cell-menu-button');
  await page.click('[data-testid="filter-menu-item"]');
  await page.selectOption('[data-testid="amount-filter-type"]', "inRange");
  await page.fill('[data-testid="amount-filter-from"]', "100");
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
  // Verify status filter
  const statusFilter = await page.locator(
    '[col-id="status"] .ag-filter-active',
  );
  await expect(statusFilter).toBeVisible();

  // Verify date filter
  const dateFilter = await page.locator('[col-id="date"] .ag-filter-active');
  await expect(dateFilter).toBeVisible();
}

async function verifyDifferentFiltersApplied(page: Page) {
  // Verify amount filter
  const amountFilter = await page.locator(
    '[col-id="amount"] .ag-filter-active',
  );
  await expect(amountFilter).toBeVisible();
}

async function verifyComplexFiltersApplied(page: Page) {
  // Verify all complex filters are active
  await expect(page.locator('[col-id="date"] .ag-filter-active')).toBeVisible();
  await expect(
    page.locator('[col-id="description"] .ag-filter-active'),
  ).toBeVisible();
  await expect(
    page.locator('[col-id="amount"] .ag-filter-active'),
  ).toBeVisible();
}
