import { test, expect } from "@playwright/test";

test.describe("Relative Date Expressions", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000); // Give time for data to load

    // Open date filter - need to find the correct column
    await page.hover('[col-id="dueDate"] .ag-header-cell-label');
    await page.click('[col-id="dueDate"] .ag-header-cell-menu-button');
    await page.waitForSelector(".ag-filter-wrapper");
  });

  test("should switch to relative date mode", async ({ page }) => {
    // Click relative mode toggle
    const relativeToggle = page.locator('button:has-text("Relative")');
    await relativeToggle.click();

    // Verify relative input is visible
    const relativeInput = page.locator('[data-testid="relative-input"]');
    await expect(relativeInput).toBeVisible();

    // Check for expression input
    const expressionInput = page.locator('input[placeholder*="Today"]');
    await expect(expressionInput).toBeVisible();
  });

  test("should filter using 'Today' expression", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Enter "Today" expression
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.fill("Today");

    // Apply filter
    await page.click('button:has-text("Apply")');
    await page.waitForTimeout(500);

    // Verify filter is applied
    const filterIndicator = page.locator(
      '[col-id="date"] .ag-header-cell-filtered',
    );
    await expect(filterIndicator).toBeVisible();

    // Check filtered rows contain today's date
    const today = new Date().toLocaleDateString();
    const firstRowDate = await page
      .locator('.ag-center-cols-container .ag-row:first-child [col-id="date"]')
      .textContent();
    expect(firstRowDate).toContain(today.split("/")[1]); // Check day part
  });

  test("should show autocomplete suggestions", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Focus on expression input
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.click();

    // Verify autocomplete dropdown appears
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 });

    // Check for suggestions
    await expect(
      page.locator('[role="option"]:has-text("Today")'),
    ).toBeVisible();
    await expect(
      page.locator('[role="option"]:has-text("Yesterday")'),
    ).toBeVisible();
    await expect(
      page.locator('[role="option"]:has-text("Tomorrow")'),
    ).toBeVisible();
    await expect(
      page.locator('[role="option"]:has-text("Start of week")'),
    ).toBeVisible();
  });

  test("should filter suggestions based on input", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Type "week" in expression input
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.fill("week");

    // Wait for filtered suggestions
    await page.waitForTimeout(300);

    // Verify only week-related suggestions are shown
    const suggestions = await page.locator('[role="option"]:visible').count();
    const weekSuggestions = await page
      .locator('[role="option"]:visible:has-text("week")')
      .count();

    expect(weekSuggestions).toBeGreaterThan(0);
    expect(suggestions).toBeLessThan(10); // Should be filtered
  });

  test("should select suggestion with keyboard", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Focus expression input
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.click();

    // Wait for suggestions
    await page.waitForSelector('[role="listbox"]');

    // Navigate with arrow keys
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");

    // Select with Tab
    await page.keyboard.press("Tab");

    // Verify input was populated
    const value = await expressionInput.inputValue();
    expect(value).toBeTruthy();
    expect(value).not.toBe("");
  });

  test("should validate date expressions", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Enter invalid expression
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.fill("InvalidExpression");

    // Tab out to trigger validation
    await page.keyboard.press("Tab");
    await page.waitForTimeout(300);

    // Check for error message
    const errorMessage = page.locator(
      '.error-message:has-text("Invalid expression")',
    );
    await expect(errorMessage).toBeVisible();
  });

  test("should show resolved date for valid expressions", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Enter valid expression
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.fill("Today+7d");

    // Wait for resolution
    await page.waitForTimeout(300);

    // Check for resolved date display
    const resolvedDate = page.locator("text=/Resolves to:/");
    await expect(resolvedDate).toBeVisible();
  });

  test("should handle date range with relative expressions", async ({
    page,
  }) => {
    // Select "inRange" filter type
    const filterTypeSelect = page.locator("select").first();
    await filterTypeSelect.selectOption({ label: "In range" });

    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Enter from expression
    const fromInput = page.locator('input[placeholder*="Today"]').first();
    await fromInput.fill("Today-7d");

    // Enter to expression
    const toInput = page.locator('input[placeholder*="Today"]').nth(1);
    await toInput.fill("Today");

    // Apply filter
    await page.click('button:has-text("Apply")');
    await page.waitForTimeout(500);

    // Verify filter is applied
    const filterIndicator = page.locator(
      '[col-id="date"] .ag-header-cell-filtered',
    );
    await expect(filterIndicator).toBeVisible();
  });

  test("should handle special date expressions", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Test StartOfWeek
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.click();

    // Select StartOfWeek from autocomplete
    await page.click('[role="option"]:has-text("Start of week")');

    // Verify it was accepted
    const value = await expressionInput.inputValue();
    expect(value).toBe("StartOfWeek");

    // Check no error is shown
    const errorMessage = page.locator(".error-message");
    await expect(errorMessage).not.toBeVisible();

    // Apply filter
    await page.click('button:has-text("Apply")');
    await page.waitForTimeout(500);

    // Verify filter was applied successfully
    const filterIndicator = page.locator(
      '[col-id="date"] .ag-header-cell-filtered',
    );
    await expect(filterIndicator).toBeVisible();
  });

  test("should handle complex expressions", async ({ page }) => {
    // Switch to relative mode
    await page.click('button:has-text("Relative")');

    // Enter complex expression
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.fill("Today-1m");

    // Verify resolved date shows one month ago
    await page.waitForTimeout(300);
    const resolvedDate = page.locator("text=/Resolves to:/");
    await expect(resolvedDate).toBeVisible();

    // Apply filter
    await page.click('button:has-text("Apply")');
    await page.waitForTimeout(500);

    // Verify rows are filtered
    const rowCount = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test("should clear relative expression", async ({ page }) => {
    // Switch to relative mode and enter expression
    await page.click('button:has-text("Relative")');
    const expressionInput = page.locator('input[placeholder*="Today"]').first();
    await expressionInput.fill("Today+30d");

    // Apply filter
    await page.click('button:has-text("Apply")');
    await page.waitForTimeout(500);

    // Clear filter
    await page.hover('[col-id="date"] .ag-header-cell-label');
    await page.click('[col-id="date"] .ag-header-cell-menu-button');
    await page.click('button:has-text("Reset")');

    // Verify filter is cleared
    const filterIndicator = page.locator(
      '[col-id="date"] .ag-header-cell-filtered',
    );
    await expect(filterIndicator).not.toBeVisible();
  });
});
