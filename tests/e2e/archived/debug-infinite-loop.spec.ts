import { test, expect } from "@playwright/test";

test.describe("Debug Infinite Loop", () => {
  test("should not have infinite re-renders", async ({ page }) => {
    // Collect console errors
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to the demo page
    await page.goto("/demo");

    // Wait for the page to load
    await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });

    // Check if we're on client-side or server-side tab
    const clientTab = page.locator("text=Client-Side Data");
    const serverTab = page.locator("text=Server-Side Data");

    // Try client-side first
    if (await clientTab.isVisible()) {
      await clientTab.click();
      await page.waitForTimeout(2000);

      // Check for errors
      const clientErrors = consoleErrors.filter((err) =>
        err.includes("Maximum update depth exceeded"),
      );

      if (clientErrors.length > 0) {
        console.log("Found infinite loop in Client-Side tab");
        console.log("First few errors:", clientErrors.slice(0, 3));
      }
    }

    // Clear errors and try server-side
    consoleErrors.length = 0;

    if (await serverTab.isVisible()) {
      await serverTab.click();
      await page.waitForTimeout(2000);

      // Check for errors
      const serverErrors = consoleErrors.filter((err) =>
        err.includes("Maximum update depth exceeded"),
      );

      if (serverErrors.length > 0) {
        console.log("Found infinite loop in Server-Side tab");
        console.log("First few errors:", serverErrors.slice(0, 3));
      }
    }

    // Also check which components are mentioned in the stack trace
    const stackComponents = new Set<string>();
    consoleErrors.forEach((error) => {
      // Extract component names from the error
      const matches = error.match(/at (\w+) \(/g);
      if (matches) {
        matches.forEach((match) => {
          const component = match.replace("at ", "").replace(" (", "");
          stackComponents.add(component);
        });
      }
    });

    console.log("Components mentioned in errors:", Array.from(stackComponents));

    // Assert no infinite loop errors
    const infiniteLoopErrors = consoleErrors.filter((err) =>
      err.includes("Maximum update depth exceeded"),
    );

    expect(infiniteLoopErrors.length).toBe(0);
  });
});
