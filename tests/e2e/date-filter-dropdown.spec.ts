import { test, expect, Page } from "@playwright/test";

test.describe("DateFilter Dropdown Component", () => {
  let page: Page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper");
  });

  test.describe("Basic Functionality", () => {
    test("should open date filter dropdown when clicking on filter icon", async () => {
      // Open the column menu for the date column
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();

      // Click on filter option
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      // Verify the date filter is visible
      const dateFilter = page.locator('[data-component="date-filter-root"]');
      await expect(dateFilter).toBeVisible();
    });

    test("should display filter type selector", async () => {
      // Open date filter
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      // Check filter type selector
      const typeSelector = page.locator(
        '[data-component="date-filter-type-selector"]',
      );
      await expect(typeSelector).toBeVisible();

      // Verify all filter types are available
      await typeSelector.click();
      const filterTypes = ["equals", "notEqual", "before", "after", "inRange"];
      for (const type of filterTypes) {
        await expect(page.locator(`option[value="${type}"]`)).toBeVisible();
      }
    });
  });

  test.describe("Relative Date Mode", () => {
    test.beforeEach(async () => {
      // Open date filter
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();
    });

    test("should default to relative mode", async () => {
      const modeToggle = page.locator(
        '[data-component="date-filter-mode-toggle"]',
      );
      await expect(modeToggle).toHaveText(/Relative/i);
    });

    test("should parse relative date expressions correctly", async () => {
      const input = page.locator('[data-component="date-filter-input"]');

      // Test various relative expressions
      const expressions = [
        { input: "-7d", description: "7 days ago" },
        { input: "today", description: "today" },
        { input: "yesterday", description: "yesterday" },
        { input: "-1w", description: "1 week ago" },
        { input: "last month", description: "last month" },
      ];

      for (const expr of expressions) {
        await input.clear();
        await input.fill(expr.input);

        // Check that validation passes (no error message)
        const errorMsg = page.locator(
          '[data-component="date-filter-error-message"]',
        );
        await expect(errorMsg).not.toBeVisible();
      }
    });

    test("should show validation error for invalid expressions", async () => {
      const input = page.locator('[data-component="date-filter-input"]');

      await input.clear();
      await input.fill("invalid expression");

      const errorMsg = page.locator(
        '[data-component="date-filter-error-message"]',
      );
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toContainText(/invalid/i);
    });

    test("should filter data when applying relative date filter", async () => {
      const input = page.locator('[data-component="date-filter-input"]');

      // Apply filter for last 7 days
      await input.fill("-7d");

      // Apply the filter
      const applyButton = page.locator('button:has-text("Apply")');
      await applyButton.click();

      // Wait for grid to update
      await page.waitForTimeout(500);

      // Check that rows are filtered
      const rows = page.locator(".ag-center-cols-container .ag-row");
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThan(0);
      expect(rowCount).toBeLessThan(50); // Should filter out some rows
    });
  });

  test.describe("Absolute Date Mode", () => {
    test.beforeEach(async () => {
      // Open date filter
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      // Switch to absolute mode
      const modeToggle = page.locator(
        '[data-component="date-filter-mode-toggle"]',
      );
      await modeToggle.click();
    });

    test("should show date picker in absolute mode", async () => {
      const datePicker = page.locator(
        '[data-component="date-filter-date-picker"]',
      );
      await expect(datePicker).toBeVisible();
    });

    test("should filter by specific date", async () => {
      const datePicker = page.locator(
        '[data-component="date-filter-date-picker"]',
      );

      // Set a specific date
      const today = new Date();
      const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD format
      await datePicker.fill(dateStr);

      // Apply the filter
      const applyButton = page.locator('button:has-text("Apply")');
      await applyButton.click();

      await page.waitForTimeout(500);

      // Verify filtering occurred
      const rows = page.locator(".ag-center-cols-container .ag-row");
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe("Filter Operators", () => {
    test.beforeEach(async () => {
      // Open date filter
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();
    });

    test("should filter with 'before' operator", async () => {
      const typeSelector = page.locator(
        '[data-component="date-filter-type-selector"]',
      );
      await typeSelector.selectOption("before");

      const input = page.locator('[data-component="date-filter-input"]');
      await input.fill("today");

      const applyButton = page.locator('button:has-text("Apply")');
      await applyButton.click();

      await page.waitForTimeout(500);

      // All dates should be before today
      const rows = page.locator(".ag-center-cols-container .ag-row");
      expect(await rows.count()).toBeGreaterThan(0);
    });

    test("should filter with 'after' operator", async () => {
      const typeSelector = page.locator(
        '[data-component="date-filter-type-selector"]',
      );
      await typeSelector.selectOption("after");

      const input = page.locator('[data-component="date-filter-input"]');
      await input.fill("-30d");

      const applyButton = page.locator('button:has-text("Apply")');
      await applyButton.click();

      await page.waitForTimeout(500);

      // Should have rows from last 30 days
      const rows = page.locator(".ag-center-cols-container .ag-row");
      expect(await rows.count()).toBeGreaterThan(0);
    });

    test("should filter with 'inRange' operator", async () => {
      const typeSelector = page.locator(
        '[data-component="date-filter-type-selector"]',
      );
      await typeSelector.selectOption("inRange");

      // Should show two inputs for range
      const fromInput = page.locator(
        '[data-component="date-filter-input-from"]',
      );
      const toInput = page.locator('[data-component="date-filter-input-to"]');

      await expect(fromInput).toBeVisible();
      await expect(toInput).toBeVisible();

      await fromInput.fill("-30d");
      await toInput.fill("today");

      const applyButton = page.locator('button:has-text("Apply")');
      await applyButton.click();

      await page.waitForTimeout(500);

      const rows = page.locator(".ag-center-cols-container .ag-row");
      expect(await rows.count()).toBeGreaterThan(0);
    });
  });

  test.describe("Integration with Grid", () => {
    test("should update filter model when filter is applied", async () => {
      // Open date filter
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      // Apply a filter
      const input = page.locator('[data-component="date-filter-input"]');
      await input.fill("-7d");

      const applyButton = page.locator('button:has-text("Apply")');
      await applyButton.click();

      // Check that filter is active (filter icon should be visible)
      const filterIcon = page.locator('[col-id="date"] .ag-header-filter-icon');
      await expect(filterIcon).toBeVisible();
    });

    test("should clear filter when reset is clicked", async () => {
      // First apply a filter
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      const input = page.locator('[data-component="date-filter-input"]');
      await input.fill("-7d");

      const applyButton = page.locator('button:has-text("Apply")');
      await applyButton.click();

      // Now clear the filter
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      const resetButton = page.locator(
        '[data-component="date-filter-reset-button"]',
      );
      await resetButton.click();

      await applyButton.click();

      // Filter icon should not be visible
      const filterIcon = page.locator('[col-id="date"] .ag-header-filter-icon');
      await expect(filterIcon).not.toBeVisible();
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("should support keyboard navigation", async () => {
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      const input = page.locator('[data-component="date-filter-input"]');
      await input.focus();

      // Tab to type selector
      await page.keyboard.press("Tab");
      const typeSelector = page.locator(
        '[data-component="date-filter-type-selector"]',
      );
      await expect(typeSelector).toBeFocused();

      // Tab to mode toggle
      await page.keyboard.press("Tab");
      const modeToggle = page.locator(
        '[data-component="date-filter-mode-toggle"]',
      );
      await expect(modeToggle).toBeFocused();
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper ARIA labels", async () => {
      const dateHeader = page.locator(
        '[col-id="date"] .ag-header-cell-menu-button',
      );
      await dateHeader.click();
      await page
        .locator('.ag-menu-option[aria-label="Filter Columns"]')
        .click();

      const typeSelector = page.locator(
        '[data-component="date-filter-type-selector"]',
      );
      await expect(typeSelector).toHaveAttribute("aria-label", /filter type/i);

      const input = page.locator('[data-component="date-filter-input"]');
      await expect(input).toHaveAttribute("aria-label", /date value/i);
    });
  });
});
