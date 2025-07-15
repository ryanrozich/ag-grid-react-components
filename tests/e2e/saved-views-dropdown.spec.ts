import { test, expect } from "@playwright/test";

test.describe("SavedViewsDropdown Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
  });

  test("should load demo page without crashing", async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check that the page title is present
    await expect(page.locator("h1").first()).toBeVisible();

    // Check that AG Grid is loaded
    await expect(page.locator(".ag-root-wrapper")).toBeVisible();
  });

  test("should display SavedViewsDropdown in client-side demo", async ({
    page,
  }) => {
    // Click on Client-Side Data tab
    await page.getByRole("tab", { name: "Client-Side Data" }).click();

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });

    // Check that the SavedViewsDropdown is present
    const savedViewsDropdown = page
      .locator('button[placeholder="My Views"]')
      .first();
    await expect(savedViewsDropdown).toBeVisible();

    // Check that it has the correct text
    await expect(savedViewsDropdown).toContainText("My Views");
  });

  test("should display SavedViewsDropdown in server-side demo", async ({
    page,
  }) => {
    // Click on Server-Side Data tab
    await page.getByRole("tab", { name: "Server-Side Data" }).click();

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });

    // Check that the SavedViewsDropdown is present
    const savedViewsDropdown = page
      .locator('button[placeholder="My Views"]')
      .first();
    await expect(savedViewsDropdown).toBeVisible();

    // Check that it has the correct text
    await expect(savedViewsDropdown).toContainText("My Views");
  });

  test("should open SavedViewsDropdown menu when clicked", async ({ page }) => {
    // Click on Client-Side Data tab
    await page.getByRole("tab", { name: "Client-Side Data" }).click();

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });

    // Click on the SavedViewsDropdown
    const savedViewsDropdown = page
      .locator('button[placeholder="My Views"]')
      .first();
    await savedViewsDropdown.click();

    // Check that the dropdown menu is visible
    await expect(page.locator('[role="listbox"]').first()).toBeVisible();

    // Check that "Clear filters" option is present
    await expect(
      page.locator('[role="option"]').filter({ hasText: "Clear filters" }),
    ).toBeVisible();
  });

  test("should show three-dots menu for view management", async ({ page }) => {
    // Click on Client-Side Data tab
    await page.getByRole("tab", { name: "Client-Side Data" }).click();

    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });

    // Find the three-dots menu button
    const viewManagementMenuButton = page.locator(
      '[data-testid="view-management-menu-trigger"]',
    );
    await expect(viewManagementMenuButton).toBeVisible();

    // Click the three-dots menu
    await viewManagementMenuButton.click();

    // Check that the menu is open
    await expect(
      page.locator('[data-testid="view-management-menu"]'),
    ).toBeVisible();

    // Check menu options are present
    await expect(
      page.locator('button:has-text("Save current view...")'),
    ).toBeVisible();
    await expect(
      page.locator('button:has-text("Manage saved views...")'),
    ).toBeVisible();
    await expect(
      page.locator('button:has-text("Import views...")'),
    ).toBeVisible();
    await expect(
      page.locator('button:has-text("Export all views...")'),
    ).toBeVisible();
  });

  test("should handle console errors", async ({ page }) => {
    // Set up console error listener
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to the demo
    await page.goto("/demo");
    await page.waitForLoadState("networkidle");

    // Click through the tabs to ensure no errors
    await page.getByRole("tab", { name: "Client-Side Data" }).click();
    await page.waitForTimeout(1000);

    await page.getByRole("tab", { name: "Server-Side Data" }).click();
    await page.waitForTimeout(1000);

    // Check that there are no console errors
    const relevantErrors = consoleErrors.filter(
      (error) =>
        !error.includes("Download the React DevTools") &&
        !error.includes("AG Grid Enterprise License"),
    );

    expect(relevantErrors).toHaveLength(0);
  });
});
