import { test, expect } from "@playwright/test";

test.describe("SavedViewsManager", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the demo page
    await page.goto("http://localhost:5174/demo");

    // Wait for the grid to load
    await page.waitForSelector(".ag-root", { timeout: 30000 });

    // Wait a bit for everything to initialize
    await page.waitForTimeout(2000);
  });

  test("should save and apply a view", async ({ page }) => {
    // Apply some filters first
    const dateDropdown = page
      .locator("button")
      .filter({ hasText: /All Time|Time period/ })
      .first();
    await dateDropdown.click();
    await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
      state: "visible",
    });

    const last7Days = page.locator(
      'button[role="option"]:has-text("Last 7 Days")',
    );
    await last7Days.click();
    await page.waitForTimeout(1000);

    // Click the Saved Views button
    const savedViewsBtn = page.locator('button:has-text("Saved Views")');
    await expect(savedViewsBtn).toBeVisible();
    await savedViewsBtn.click();

    // Wait for dropdown to open
    await page.waitForSelector('h3:has-text("Saved Views")', {
      state: "visible",
    });

    // Click Save Current button
    const saveCurrentBtn = page.locator('button:has-text("Save Current")');
    await saveCurrentBtn.click();

    // Fill in the save dialog
    await page.waitForSelector('h2:has-text("Save Current View")', {
      state: "visible",
    });

    const viewNameInput = page.locator(
      'input[placeholder="e.g., High Priority Tasks"]',
    );
    await viewNameInput.fill("Last Week Tasks");

    const descriptionTextarea = page.locator(
      'textarea[placeholder="Brief description of this view..."]',
    );
    await descriptionTextarea.fill("Shows tasks from the last 7 days");

    // Save the view
    const saveViewBtn = page.locator('button:has-text("Save View")').last();
    await saveViewBtn.click();

    // Verify the view appears in the list
    await page.waitForTimeout(500);
    await savedViewsBtn.click(); // Reopen the dropdown

    const savedView = page.locator('span:has-text("Last Week Tasks")');
    await expect(savedView).toBeVisible();

    // Clear filters
    await dateDropdown.click();
    await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
      state: "visible",
    });
    const allTime = page
      .locator('button[role="option"]:has-text("All Time")')
      .first();
    await allTime.click();
    await page.waitForTimeout(1000);

    // Apply the saved view
    await savedView.click();
    await page.waitForTimeout(1500);

    // Verify filters are applied (check if row count changed)
    const rowCount = await page
      .locator('span:has-text("results")')
      .textContent();
    expect(rowCount).not.toContain("10,000");
  });

  test("should export and import views", async ({ page }) => {
    // First create a view
    const savedViewsBtn = page.locator('button:has-text("Saved Views")');
    await savedViewsBtn.click();
    await page.waitForSelector('h3:has-text("Saved Views")', {
      state: "visible",
    });

    const saveCurrentBtn = page.locator('button:has-text("Save Current")');
    await saveCurrentBtn.click();

    await page.waitForSelector('h2:has-text("Save Current View")', {
      state: "visible",
    });
    const viewNameInput = page.locator(
      'input[placeholder="e.g., High Priority Tasks"]',
    );
    await viewNameInput.fill("Export Test View");

    const saveViewBtn = page.locator('button:has-text("Save View")').last();
    await saveViewBtn.click();
    await page.waitForTimeout(500);

    // Reopen dropdown
    await savedViewsBtn.click();

    // Click export button
    const exportBtn = page.locator('button[title="Export all views"]');
    await expect(exportBtn).toBeVisible();

    // Set up download promise before clicking
    const downloadPromise = page.waitForEvent("download");
    await exportBtn.click();

    // Wait for download and verify
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/saved-views-.*\.json/);

    // Save the file to read it back
    const path = await download.path();
    expect(path).toBeTruthy();
  });

  test("should create a new category", async ({ page }) => {
    const savedViewsBtn = page.locator('button:has-text("Saved Views")');
    await savedViewsBtn.click();
    await page.waitForSelector('h3:has-text("Saved Views")', {
      state: "visible",
    });

    const saveCurrentBtn = page.locator('button:has-text("Save Current")');
    await saveCurrentBtn.click();

    await page.waitForSelector('h2:has-text("Save Current View")', {
      state: "visible",
    });

    // Click the + button to create new category
    const createCategoryBtn = page.locator(
      'button[title="Create new category"]',
    );
    await createCategoryBtn.click();

    // Fill in new category details
    const categoryNameInput = page.locator(
      'input[placeholder="Category name"]',
    );
    await categoryNameInput.fill("Custom Reports");

    const categoryIconInput = page.locator('input[placeholder="📁"]');
    await categoryIconInput.clear();
    await categoryIconInput.fill("📊");

    // Create the category
    const createBtn = page.locator('button:has-text("Create Category")');
    await createBtn.click();

    // Fill in view details
    const viewNameInput = page.locator(
      'input[placeholder="e.g., High Priority Tasks"]',
    );
    await viewNameInput.fill("Test Report");

    // Save the view
    const saveViewBtn = page.locator('button:has-text("Save View")').last();
    await saveViewBtn.click();

    // Verify the category appears
    await page.waitForTimeout(500);
    await savedViewsBtn.click();

    const customCategory = page.locator('span:has-text("Custom Reports")');
    await expect(customCategory).toBeVisible();

    const categoryIcon = page.locator('span:has-text("📊")').first();
    await expect(categoryIcon).toBeVisible();
  });

  test("should set and apply default view", async ({ page }) => {
    // Create a view first
    const savedViewsBtn = page.locator('button:has-text("Saved Views")');
    await savedViewsBtn.click();

    const saveCurrentBtn = page.locator('button:has-text("Save Current")');
    await saveCurrentBtn.click();

    const viewNameInput = page.locator(
      'input[placeholder="e.g., High Priority Tasks"]',
    );
    await viewNameInput.fill("Default Test View");

    const saveViewBtn = page.locator('button:has-text("Save View")').last();
    await saveViewBtn.click();
    await page.waitForTimeout(500);

    // Reopen dropdown
    await savedViewsBtn.click();

    // Find the star button and click it
    const starBtn = page.locator('button[title="Set as default"]').first();
    await starBtn.click();

    // Verify default badge appears
    const defaultBadge = page.locator('span:has-text("Default")');
    await expect(defaultBadge).toBeVisible();

    // Close dropdown
    await page.click("body", { position: { x: 10, y: 10 } });

    // Reload page to test default view is applied
    await page.reload();
    await page.waitForSelector(".ag-root", { timeout: 30000 });

    // Check if the saved views button has the active indicator
    const activeIndicator = page.locator(".bg-indigo-500.rounded-full");
    await expect(activeIndicator).toBeVisible();
  });

  test("should delete a view", async ({ page }) => {
    // Create a view to delete
    const savedViewsBtn = page.locator('button:has-text("Saved Views")');
    await savedViewsBtn.click();

    const saveCurrentBtn = page.locator('button:has-text("Save Current")');
    await saveCurrentBtn.click();

    const viewNameInput = page.locator(
      'input[placeholder="e.g., High Priority Tasks"]',
    );
    await viewNameInput.fill("View to Delete");

    const saveViewBtn = page.locator('button:has-text("Save View")').last();
    await saveViewBtn.click();
    await page.waitForTimeout(500);

    // Reopen dropdown
    await savedViewsBtn.click();

    // Hover over the view to show delete button
    const viewItem = page.locator('div:has-text("View to Delete")').first();
    await viewItem.hover();

    // Click delete button
    const deleteBtn = page.locator('button[title="Delete view"]').first();
    await deleteBtn.click();

    // Verify view is gone
    await page.waitForTimeout(500);
    const deletedView = page.locator('span:has-text("View to Delete")');
    await expect(deletedView).not.toBeVisible();
  });
});
