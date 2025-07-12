import { test, expect } from "@playwright/test";

test.describe("SavedViewsManager Headless Component E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Try both ports as the demo might be running on either
    const ports = [5174, 5173];
    let connected = false;

    for (const port of ports) {
      try {
        await page.goto(`http://localhost:${port}/demo`, {
          waitUntil: "domcontentloaded",
          timeout: 5000,
        });
        connected = true;
        break;
      } catch (e) {
        // Try next port
      }
    }

    if (!connected) {
      throw new Error("Could not connect to demo on ports 5173 or 5174");
    }

    // Wait for the page to load completely
    await page.waitForLoadState("networkidle");

    // Navigate to Server-Side Data tab where SavedViewsManager is used
    const serverSideTab = page.locator("button", {
      hasText: "Server-Side Data",
    });
    await serverSideTab.click();

    // Wait for the content to switch - wait for either the banner text or the saved views trigger
    await page.waitForSelector(
      '[data-saved-views-trigger], h3:has-text("Server-Side Row Model Demo")',
      {
        timeout: 15000,
      },
    );
  });

  test("SavedViewsManager trigger button renders correctly", async ({
    page,
  }) => {
    // Check that the trigger button exists
    const trigger = page.locator("[data-saved-views-trigger]");
    await expect(trigger).toBeVisible();

    // Check that it contains the icon and text
    await expect(trigger.locator("svg[data-icon]")).toBeVisible();
    await expect(trigger.locator("[data-label]")).toHaveText("Saved Views");

    // Check that indicator is not visible when no active view
    await expect(trigger.locator("[data-indicator]")).not.toBeVisible();
  });

  test("SavedViewsManager panel opens and closes correctly", async ({
    page,
  }) => {
    // Click the trigger to open the panel
    await page.click("[data-saved-views-trigger]");

    // Check that panel is visible
    const panel = page.locator("[data-saved-views-panel]");
    await expect(panel).toBeVisible();

    // Check panel structure
    await expect(panel.locator("[data-saved-views-title]")).toHaveText(
      "Saved Views",
    );
    await expect(panel.locator("[data-saved-views-close]")).toBeVisible();
    await expect(panel.locator("[data-saved-views-actions]")).toBeVisible();
    await expect(panel.locator("[data-saved-views-list]")).toBeVisible();

    // Check empty state
    await expect(panel.locator("[data-empty-message]")).toHaveText(
      "No saved views yet",
    );

    // Close the panel
    await page.click("[data-saved-views-close]");
    await expect(panel).not.toBeVisible();
  });

  test("Save view dialog opens and validates input", async ({ page }) => {
    // Open SavedViewsManager
    await page.click("[data-saved-views-trigger]");

    // Wait for panel to be visible
    await page.waitForSelector("[data-saved-views-panel]", {
      state: "visible",
    });

    // Click Save Current button
    await page.click('[data-action="save"]');

    // Wait for dialog to appear
    await page.waitForSelector("[data-save-view-dialog]", {
      state: "visible",
      timeout: 10000,
    });

    // Check that dialog is visible
    const dialog = page.locator("[data-save-view-dialog]");
    await expect(dialog).toBeVisible();

    // Check dialog structure
    await expect(dialog.locator("[data-dialog-title]")).toHaveText(
      "Save Current View",
    );
    await expect(dialog.locator("[data-field-input]")).toBeVisible();
    await expect(dialog.locator("[data-field-textarea]")).toBeVisible();

    // Check that save button is disabled when name is empty
    const saveButton = dialog.locator(
      '[data-action="save"][data-primary="true"]',
    );
    await expect(saveButton).toBeDisabled();

    // Type a view name
    await dialog.locator("[data-field-input]").fill("Test View");

    // Save button should now be enabled
    await expect(saveButton).toBeEnabled();

    // Close dialog
    await dialog.locator('[data-action="cancel"]').click();
    await expect(dialog).not.toBeVisible();
  });

  test("Can save and display a view", async ({ page }) => {
    // Wait for grid to be fully loaded
    await page.waitForSelector(".ag-header-cell", {
      state: "visible",
      timeout: 10000,
    });

    // Apply a filter using the quick filter dropdown instead
    const taskTypeFilter = page.locator('button:has-text("Task type")');
    if (await taskTypeFilter.isVisible()) {
      await taskTypeFilter.click();
      await page.waitForTimeout(500);
      // Select an option from the dropdown
      const bugOption = page.locator('text="Critical Bugs"').first();
      if (await bugOption.isVisible()) {
        await bugOption.click();
      }
    }

    // Open SavedViewsManager
    await page.click("[data-saved-views-trigger]");

    // Click Save Current
    await page.click('[data-action="save"]');

    // Fill in the form
    const dialog = page.locator("[data-save-view-dialog]");
    await dialog.locator("[data-field-input]").fill("Bug Filter View");
    await dialog
      .locator("[data-field-textarea]")
      .fill("Shows only bug-related tasks");

    // Save the view
    await dialog.locator('[data-action="save"][data-primary="true"]').click();

    // Dialog should close
    await expect(dialog).not.toBeVisible();

    // Check that the view appears in the list
    const viewItem = page
      .locator("[data-view-item]")
      .filter({ hasText: "Bug Filter View" });
    await expect(viewItem).toBeVisible();

    // View should not be active initially
    await expect(viewItem).not.toHaveAttribute("data-active", "true");
  });

  test("Can apply a saved view", async ({ page }) => {
    // First save a view
    await page.click("[data-saved-views-trigger]");
    await page.click('[data-action="save"]');

    const dialog = page.locator("[data-save-view-dialog]");
    await dialog.locator("[data-field-input]").fill("Test Tasks View");
    await dialog.locator('[data-action="save"][data-primary="true"]').click();

    // Reload to clear any state
    await page.reload();
    await page.waitForSelector(".ag-theme-custom", { timeout: 10000 });
    await page.click("text=Server-Side Data");
    await page.waitForSelector("[data-saved-views-trigger]", { timeout: 5000 });

    // Apply the saved view
    await page.click("[data-saved-views-trigger]");
    await page.click('[data-view-button]:has-text("Test Tasks View")');

    // Check that the view is now active
    const viewItem = page
      .locator("[data-view-item]")
      .filter({ hasText: "Test Tasks View" });
    await expect(viewItem).toHaveAttribute("data-active", "true");

    // Check that the indicator appears
    await expect(
      page.locator("[data-saved-views-trigger] [data-indicator]"),
    ).toBeVisible();
  });

  test("Can set a default view", async ({ page }) => {
    // Save a view first
    await page.click("[data-saved-views-trigger]");
    await page.click('[data-action="save"]');

    const dialog = page.locator("[data-save-view-dialog]");
    await dialog.locator("[data-field-input]").fill("Default View");
    await dialog.locator('[data-action="save"][data-primary="true"]').click();

    // Set as default
    await page.hover("[data-view-item]");
    await page.click('[data-action="set-default"]');

    // Check that the star indicator appears
    await expect(page.locator("[data-default-indicator]")).toBeVisible();
  });

  test("Can delete a saved view", async ({ page }) => {
    // Save a view first
    await page.click("[data-saved-views-trigger]");
    await page.click('[data-action="save"]');

    const dialog = page.locator("[data-save-view-dialog]");
    await dialog.locator("[data-field-input]").fill("View to Delete");
    await dialog.locator('[data-action="save"][data-primary="true"]').click();

    // Delete the view
    await page.hover("[data-view-item]");

    // Handle confirmation dialog
    page.on("dialog", (dialog) => dialog.accept());
    await page.click('[data-action="delete"]');

    // View should be removed
    await expect(page.locator("[data-view-item]")).not.toBeVisible();
    await expect(page.locator("[data-empty-message]")).toBeVisible();
  });

  test("Export and import functionality", async ({ page }) => {
    // Save a view
    await page.click("[data-saved-views-trigger]");
    await page.click('[data-action="save"]');

    const dialog = page.locator("[data-save-view-dialog]");
    await dialog.locator("[data-field-input]").fill("Export Test View");
    await dialog.locator('[data-action="save"][data-primary="true"]').click();

    // Test export button
    await page.click("[data-saved-views-trigger]");
    const exportButton = page.locator('[data-action="export"]');
    await expect(exportButton).toBeEnabled();

    // Set up download listener
    const downloadPromise = page.waitForEvent("download");
    await exportButton.click();
    const download = await downloadPromise;

    // Verify filename pattern
    expect(download.suggestedFilename()).toMatch(
      /saved-views-\d{4}-\d{2}-\d{2}\.json/,
    );

    // Test import button
    const importButton = page.locator('[data-action="import"]');
    await expect(importButton).toBeVisible();
  });

  test("CategorySelector in save dialog works", async ({ page }) => {
    // Open save dialog
    await page.click("[data-saved-views-trigger]");
    await page.click('[data-action="save"]');

    // Check that CategorySelector is present
    const categorySelector = page.locator("#view-category");
    await expect(categorySelector).toBeVisible();

    // Click to open dropdown
    await categorySelector.click();

    // Check that dropdown opens with create option
    const dropdown = page.locator("#category-dropdown");
    await expect(dropdown).toBeVisible();
    await expect(dropdown.locator("text=Create new category")).toBeVisible();

    // Create a new category
    await dropdown.locator("text=Create new category").click();

    // Fill in the create category form
    const createInput = page
      .locator("#category-dropdown input[type='text']")
      .last();
    await createInput.fill("Custom Category");
    await page.click('#category-dropdown button:has-text("Create")');

    // Verify category is selected
    await expect(categorySelector).toHaveValue("Custom Category");
  });

  test("No console errors during interactions", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Perform various interactions
    await page.click("[data-saved-views-trigger]");
    await page.waitForTimeout(500);

    // Only click save if panel is open
    const saveButton = page.locator('[data-action="save"]');
    if (await saveButton.isVisible()) {
      await saveButton.click();
      await page.waitForTimeout(500);

      // Only click cancel if dialog is open
      const cancelButton = page.locator('[data-action="cancel"]');
      if (await cancelButton.isVisible()) {
        await cancelButton.click();
        await page.waitForTimeout(500);
      }
    }

    // Close panel if it's open
    const closeButton = page.locator("[data-saved-views-close]");
    if (await closeButton.isVisible()) {
      await closeButton.click();
      await page.waitForTimeout(500);
    }

    // Check no console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test("Verifies headless structure with data attributes", async ({ page }) => {
    // Open panel
    await page.click("[data-saved-views-trigger]");

    // Verify all data attributes are present
    const dataAttributes = [
      "[data-saved-views-panel]",
      "[data-saved-views-title]",
      "[data-saved-views-close]",
      "[data-saved-views-actions]",
      "[data-saved-views-list]",
      "[data-empty-message]",
      "[data-empty-description]",
    ];

    for (const attr of dataAttributes) {
      await expect(page.locator(attr)).toBeVisible();
    }

    // Open save dialog
    await page.click('[data-action="save"]');

    // Wait for dialog to appear
    await page.waitForSelector("[data-save-view-dialog]", {
      state: "visible",
      timeout: 10000,
    });

    const dialogAttributes = [
      "[data-save-view-dialog]",
      "[data-dialog-overlay]",
      "[data-dialog-content]",
      "[data-dialog-header]",
      "[data-dialog-title]",
      "[data-dialog-body]",
      "[data-form-field]",
      "[data-field-label]",
      "[data-field-input]",
      "[data-field-textarea]",
      "[data-dialog-footer]",
    ];

    for (const attr of dialogAttributes) {
      const elements = await page.locator(attr).count();
      if (elements === 0) {
        console.log(`Missing attribute: ${attr}`);
      }
      expect(elements).toBeGreaterThan(0);
    }
  });
});
