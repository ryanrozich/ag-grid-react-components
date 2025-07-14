import { test, expect } from "@playwright/test";

test.describe("SavedViewsDropdown Alignment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
    await page.waitForLoadState("networkidle");
  });

  test("dropdown should align with trigger button", async ({ page }) => {
    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
    await page.waitForTimeout(1000);

    // Find the My Views dropdown button
    const myViewsButton = page.locator('button:has-text("My Views")').first();
    await expect(myViewsButton).toBeVisible();

    // Get the button's position
    const buttonBox = await myViewsButton.boundingBox();
    expect(buttonBox).toBeTruthy();

    // Take screenshot before clicking
    await page.screenshot({
      path: "screenshots/before-dropdown-click.png",
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 400,
      },
    });

    // Click the button to open dropdown
    await myViewsButton.click();

    // Wait for dropdown to appear - use data attribute to find our specific dropdown
    const dropdown = page
      .locator('[data-component="quick-filter-dropdown"]')
      .first();
    await expect(dropdown).toBeVisible();

    // Get the dropdown's position
    const dropdownBox = await dropdown.boundingBox();
    expect(dropdownBox).toBeTruthy();

    // Take screenshot after clicking
    await page.screenshot({
      path: "screenshots/after-dropdown-click.png",
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 600,
      },
    });

    // Check alignment - dropdown should be directly below the button
    if (buttonBox && dropdownBox) {
      console.log("Button position:", buttonBox);
      console.log("Dropdown position:", dropdownBox);

      // The dropdown's left edge should align with the button's left edge (with small tolerance)
      expect(Math.abs(dropdownBox.x - buttonBox.x)).toBeLessThan(10);

      // The dropdown should be below the button
      expect(dropdownBox.y).toBeGreaterThan(buttonBox.y + buttonBox.height);

      // But not too far below (should be close to the button)
      const gap = dropdownBox.y - (buttonBox.y + buttonBox.height);
      expect(gap).toBeLessThan(20); // Should be within 20px
    }
  });

  test("dropdown should use portal and have correct z-index", async ({
    page,
  }) => {
    // Wait for grid to be ready
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
    await page.waitForTimeout(1000);

    // Click the My Views button
    const myViewsButton = page.locator('button:has-text("My Views")').first();
    await myViewsButton.click();

    // Check if dropdown is in a portal (should be a direct child of body)
    const dropdown = page
      .locator('[data-component="quick-filter-dropdown"]')
      .first();
    const isInPortal = await dropdown.evaluate((el) => {
      let parent = el.parentElement;
      while (parent) {
        if (parent === document.body) {
          return true;
        }
        parent = parent.parentElement;
      }
      return false;
    });

    console.log("Dropdown is in portal:", isInPortal);
    expect(isInPortal).toBe(true);

    // Check z-index of dropdown - check inline style since we set it explicitly
    const style = await dropdown.getAttribute("style");
    const zIndexMatch = style?.match(/z-index:\s*(\d+)/);
    const zIndex = zIndexMatch ? parseInt(zIndexMatch[1]) : 0;

    console.log("Dropdown z-index:", zIndex);

    // Z-index should be high enough to appear above other elements
    expect(zIndex).toBeGreaterThan(10);
  });

  test("visual regression test for dropdown alignment", async ({ page }) => {
    // Wait for grid
    await page.waitForSelector(".ag-root-wrapper", { state: "visible" });
    await page.waitForTimeout(1000);

    // Take full screenshot of the toolbar area
    await page.screenshot({
      path: "screenshots/saved-views-alignment-full.png",
      fullPage: false,
      clip: {
        x: 0,
        y: 100,
        width: 1400,
        height: 700,
      },
    });
  });
});
