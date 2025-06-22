import { test, expect } from "@playwright/test";

test.describe("QuickFilterDropdown", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page that has QuickFilterDropdown
    await page.goto("/demo");

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper");
    await page.waitForTimeout(1000); // Give time for data to load

    // Click on Quick Filter tab to show the quick filter dropdowns
    await page.click('button:has-text("Quick Filter")');
    await page.waitForTimeout(500); // Wait for tab content to render

    // Wait for QuickFilterDropdown to be visible
    await page.waitForSelector('[data-testid="quick-filter-dropdown"]', {
      timeout: 10000,
    });
  });

  test("should display quick filter dropdown button", async ({ page }) => {
    // Get the first dropdown (Date Filters)
    const dropdown = await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first();
    await expect(dropdown).toBeVisible();

    // Check the trigger button (not the option buttons)
    const triggerButton = await dropdown.locator(
      'button[aria-haspopup="listbox"]',
    );
    await expect(triggerButton).toBeVisible();

    // The button might show "All Data" if that's the default selection
    const buttonText = await triggerButton.textContent();
    expect(buttonText?.length).toBeGreaterThan(0);
  });

  test("should open dropdown and show filter options", async ({ page }) => {
    // Click the first dropdown button (Date Filters)
    await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first()
      .locator("button")
      .click();

    // Wait for dropdown menu to appear
    await page.waitForSelector('[role="listbox"]');

    // Verify filter options are visible
    const options = await page.locator('[role="option"]').count();
    expect(options).toBeGreaterThan(0);

    // Check for specific options
    await expect(
      page.locator('[role="option"]:has-text("Today")'),
    ).toBeVisible();
    await expect(
      page.locator('[role="option"]:has-text("This Week")'),
    ).toBeVisible();
    await expect(
      page.locator('[role="option"]:has-text("Last 7 Days")'),
    ).toBeVisible();
  });

  test("should apply 'Today' filter to grid", async ({ page }) => {
    // Get initial row count
    const initialRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    console.log("Initial row count:", initialRows);
    expect(initialRows).toBeGreaterThan(0);

    // Check if dropdown is already open, if not open it
    const dropdownOpen = await page
      .locator('[role="listbox"]')
      .isVisible()
      .catch(() => false);
    if (!dropdownOpen) {
      await page
        .locator('[data-testid="quick-filter-dropdown"]')
        .first()
        .locator('button[aria-haspopup="listbox"]')
        .click();
    }

    // Select "All Dates" first to clear any filter
    await page.click('[role="option"]:has-text("All Dates")');

    // Wait for grid to update
    await page.waitForTimeout(1000);

    // Verify filter was applied by checking row count changed
    const filteredRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    console.log("Filtered row count:", filteredRows);

    // The filter should have changed the row count
    expect(filteredRows).not.toBe(initialRows);

    // Verify the column header shows filter indicator
    await expect(
      page.locator('[col-id="dueDate"] .ag-header-cell-filtered'),
    ).toBeVisible();

    // Verify dropdown shows selected option
    const buttonText = await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first()
      .locator("button")
      .textContent();
    expect(buttonText).toContain("Last 7 Days");
  });

  test("should apply 'This Week' date range filter", async ({ page }) => {
    // Open dropdown and select "This Week"
    await page.click('[data-testid="quick-filter-dropdown"] button');
    await page.click('[role="option"]:has-text("This Week")');

    // Wait for grid to update
    await page.waitForTimeout(500);

    // Get all date values from filtered rows
    const dates = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll(".ag-center-cols-container .ag-row"),
      );
      return rows.map((row) => {
        const dateCell = row.querySelector('[col-id="dueDate"]');
        return dateCell ? dateCell.textContent : "";
      });
    });

    // Verify all dates are within this week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - 6); // Last 7 days
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 1); // Include today

    dates.forEach((dateStr) => {
      if (dateStr) {
        const date = new Date(dateStr);
        expect(date >= startOfWeek).toBeTruthy();
        expect(date <= endOfWeek).toBeTruthy();
      }
    });
  });

  test("should clear filter when selecting 'All Dates'", async ({ page }) => {
    // First apply a filter
    await page.click('[data-testid="quick-filter-dropdown"] button');
    await page.click('[role="option"]:has-text("Today")');
    await page.waitForTimeout(500);

    // Get filtered row count
    const filteredRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();

    // Now select "All Dates"
    await page.click('[data-testid="quick-filter-dropdown"] button');
    await page.click('[role="option"]:has-text("All Dates")');
    await page.waitForTimeout(500);

    // Verify all rows are shown again
    const allRows = await page
      .locator(".ag-center-cols-container .ag-row")
      .count();
    expect(allRows).toBeGreaterThan(filteredRows);

    // Verify dropdown shows placeholder again
    const buttonText = await page
      .locator('[data-testid="quick-filter-dropdown"] button')
      .textContent();
    expect(buttonText).toContain("Quick date filters");
  });

  test("should persist selected filter when navigating grid", async ({
    page,
  }) => {
    // Apply a filter
    await page.click('[data-testid="quick-filter-dropdown"] button');
    await page.click('[role="option"]:has-text("Last 30 Days")');
    await page.waitForTimeout(500);

    // Enable pagination if available
    const paginationButton = page.locator(
      'button:has-text("Enable Pagination")',
    );
    if (await paginationButton.isVisible()) {
      await paginationButton.click();
    }

    // Navigate to next page
    const nextButton = page.locator('.ag-paging-button[aria-label="Next"]');
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(500);
    }

    // Verify filter is still applied
    const buttonText = await page
      .locator('[data-testid="quick-filter-dropdown"] button')
      .textContent();
    expect(buttonText).toContain("Last 30 Days");
  });

  test("should update grid filter model when quick filter is applied", async ({
    page,
  }) => {
    // Apply "This Month" filter
    await page.click('[data-testid="quick-filter-dropdown"] button');
    await page.click('[role="option"]:has-text("This Month")');
    await page.waitForTimeout(500);

    // Check that the filter model was applied by looking for filter indicator
    const filterIndicator = await page.locator(
      '[col-id="dueDate"] .ag-header-cell-filtered',
    );
    await expect(filterIndicator).toBeVisible();
  });

  test("should handle keyboard navigation in dropdown", async ({ page }) => {
    // Open first dropdown (Date Filters)
    await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first()
      .locator("button")
      .click();
    await page.waitForSelector('[role="listbox"]');

    // Navigate with arrow keys
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");

    // Check highlighted option
    const highlightedOption = await page.locator(
      '[role="option"][aria-selected="true"]',
    );
    await expect(highlightedOption).toBeVisible();

    // Select with Enter
    await page.keyboard.press("Enter");

    // Verify dropdown closed and filter applied
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
  });

  test("should search/filter options in dropdown", async ({ page }) => {
    // Open first dropdown (Date Filters)
    await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first()
      .locator("button")
      .click();
    await page.waitForSelector('[role="listbox"]');

    // Type in search if search input exists
    const searchInput = page.locator('[data-testid="quick-filter-search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill("month");

      // Verify filtered results
      const visibleOptions = await page
        .locator('[role="option"]:visible')
        .count();
      const monthOptions = await page
        .locator('[role="option"]:has-text("Month"):visible')
        .count();

      expect(monthOptions).toBeGreaterThan(0);
      expect(visibleOptions).toBeLessThanOrEqual(4); // Should show only month-related options
    }
  });

  test("should show option descriptions when enabled", async ({ page }) => {
    // Open first dropdown (Date Filters)
    await page
      .locator('[data-testid="quick-filter-dropdown"]')
      .first()
      .locator("button")
      .click();
    await page.waitForSelector('[role="listbox"]');

    // Check for descriptions
    const optionWithDescription = page.locator(
      '[role="option"]:has-text("Today")',
    );
    const description = await optionWithDescription
      .locator("text=/today.*date/i")
      .count();

    expect(description).toBeGreaterThan(0);
  });
});

test.describe("QuickFilterDropdown with Multiple Columns", () => {
  test("should work with multiple quick filter dropdowns", async ({ page }) => {
    // Navigate to a page with multiple dropdowns
    await page.goto("/demo");
    await page.waitForSelector(".ag-root-wrapper");

    // Check if there are multiple quick filter dropdowns
    const dropdowns = await page
      .locator('[data-testid^="quick-filter-"]')
      .count();

    if (dropdowns > 1) {
      // Apply filter to first dropdown
      await page.click('[data-testid^="quick-filter-"]:first-child button');
      await page.click('[role="option"]:has-text("Today")');
      await page.waitForTimeout(500);

      // Apply filter to second dropdown
      await page.click('[data-testid^="quick-filter-"]:nth-child(2) button');
      await page.click('[role="option"]:first-child');
      await page.waitForTimeout(500);

      // Verify both filters are applied
      const filterIndicators = await page
        .locator(".ag-header-cell-filtered")
        .count();
      expect(filterIndicators).toBeGreaterThanOrEqual(2);
    }
  });
});
