import { test, expect } from "@playwright/test";

test("fix CategorySelector dropdown issue", async ({ page }) => {
  // Navigate to demo
  await page.goto("http://localhost:5174/demo");
  await page.waitForLoadState("networkidle");

  // Go to Server-Side Data tab
  await page.click('button:has-text("Server-Side Data")');
  await page.waitForTimeout(2000);

  // Open SavedViewsManager
  await page.click("[data-saved-views-trigger]");
  await page.waitForTimeout(1000);

  // Click Save Current button
  await page.click('[data-action="save"]');
  await page.waitForTimeout(1000);

  // Check initial state
  const initialState = await page.evaluate(() => {
    const input = document.querySelector("#view-category") as HTMLInputElement;
    return {
      value: input?.value,
      ariaExpanded: input?.getAttribute("aria-expanded"),
      ariaControls: input?.getAttribute("aria-controls"),
      dropdownExists: !!document.querySelector("#category-dropdown")
    };
  });
  console.log("Initial state:", initialState);

  // Clear the input and type something
  const categoryInput = page.locator("#view-category");
  await categoryInput.clear();
  await page.waitForTimeout(500);
  
  // Check state after clearing
  const afterClearState = await page.evaluate(() => {
    const input = document.querySelector("#view-category") as HTMLInputElement;
    const dropdown = document.querySelector("#category-dropdown");
    return {
      value: input?.value,
      ariaExpanded: input?.getAttribute("aria-expanded"),
      dropdownExists: !!dropdown,
      dropdownVisible: dropdown ? window.getComputedStyle(dropdown).display !== 'none' : false
    };
  });
  console.log("After clear state:", afterClearState);

  // Type something to trigger the dropdown
  await categoryInput.type("Test", { delay: 100 });
  await page.waitForTimeout(500);
  
  // Check state after typing
  const afterTypeState = await page.evaluate(() => {
    const input = document.querySelector("#view-category") as HTMLInputElement;
    const dropdown = document.querySelector("#category-dropdown");
    const portalDropdown = document.querySelector("#category-selector-portal #category-dropdown");
    return {
      value: input?.value,
      ariaExpanded: input?.getAttribute("aria-expanded"),
      dropdownInDOM: !!dropdown,
      dropdownInPortal: !!portalDropdown,
      dropdownVisible: dropdown ? window.getComputedStyle(dropdown).display !== 'none' : false,
      portalDropdownVisible: portalDropdown ? window.getComputedStyle(portalDropdown).display !== 'none' : false
    };
  });
  console.log("After type state:", afterTypeState);

  // Try clicking the dropdown icon
  const dropdownIcon = page.locator('[data-testid="dropdown-icon"]');
  if (await dropdownIcon.isVisible()) {
    await dropdownIcon.click();
    await page.waitForTimeout(500);
    
    const afterIconClick = await page.evaluate(() => {
      const dropdown = document.querySelector("#category-dropdown");
      return {
        dropdownExists: !!dropdown,
        dropdownVisible: dropdown ? window.getComputedStyle(dropdown).display !== 'none' : false
      };
    });
    console.log("After icon click:", afterIconClick);
  }

  // Take a screenshot
  await page.screenshot({ path: 'fix-category-selector.png', fullPage: true });

  // Verify we can still save the view with a category
  const saveButton = page.locator('[data-action="save"][data-primary="true"]');
  const canSave = await saveButton.isEnabled();
  console.log("Can save after interactions:", canSave);
});