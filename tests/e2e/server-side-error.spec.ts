import { test, expect } from "@playwright/test";

test("captures console errors when switching to server-side tab", async ({
  page,
}) => {
  // Collect all console messages
  const consoleMessages: { type: string; text: string }[] = [];

  page.on("console", (msg) => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
    });
  });

  // Navigate to demo page
  await page.goto("/demo");

  // Wait for initial page load
  await page.waitForLoadState("networkidle");

  // Click on the server-side tab
  await page.click('button:has-text("Server-Side Data")');

  // Wait a bit for any errors to appear
  await page.waitForTimeout(2000);

  // Check for console errors (excluding AG Grid license warnings)
  const errors = consoleMessages.filter(
    (msg) =>
      msg.type === "error" &&
      !msg.text.includes("AG Grid Enterprise License") &&
      !msg.text.includes("License Key Not Found") &&
      !msg.text.includes("***"),
  );

  console.log("Actual errors found:", errors.length);
  errors.forEach((error, index) => {
    console.log(`Error ${index + 1}:`, error.text);
  });

  // Also check warnings
  const warnings = consoleMessages.filter((msg) => msg.type === "warning");
  console.log("\nWarnings found:", warnings.length);
  warnings.forEach((warning, index) => {
    console.log(`Warning ${index + 1}:`, warning.text);
  });

  // Take a screenshot for debugging
  await page.screenshot({ path: "server-side-error.png", fullPage: true });

  // This test is expected to fail so we can see the errors
  expect(errors).toHaveLength(0);
});
