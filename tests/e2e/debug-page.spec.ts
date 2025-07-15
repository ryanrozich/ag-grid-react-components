import { test } from "@playwright/test";

test("Debug what is on the page", async ({ page }) => {
  console.log("Debugging page content...\n");

  await page.goto("http://localhost:5173/demo");
  await page.waitForTimeout(3000);

  // Get page title
  const title = await page.title();
  console.log(`Page title: ${title}`);

  // Check for various elements
  const checks = [
    { selector: ".ag-theme-quartz", name: "AG Grid with quartz theme" },
    { selector: ".ag-root", name: "AG Grid root" },
    { selector: ".ag-root-wrapper", name: "AG Grid root wrapper" },
    {
      selector: '[data-component="quick-filter-trigger"]',
      name: "Quick Filter trigger",
    },
    { selector: 'button:has-text("Demo")', name: "Demo button" },
    { selector: "h1, h2, h3", name: "Any headings" },
    { selector: "main", name: "Main element" },
    { selector: "div", name: "Any div" },
  ];

  console.log("\nElement checks:");
  for (const check of checks) {
    const count = await page.locator(check.selector).count();
    console.log(`  ${check.name}: ${count} found`);
  }

  // Get some text content
  const bodyText = await page.locator("body").innerText();
  console.log(
    `\nFirst 500 chars of body text:\n${bodyText.substring(0, 500)}...`,
  );

  // Check if we're on the right page
  const url = page.url();
  console.log(`\nCurrent URL: ${url}`);

  // Get all visible text
  const visibleElements = await page
    .locator("*:visible")
    .evaluateAll((elements) => {
      return elements.slice(0, 20).map((el) => ({
        tag: el.tagName,
        text: el.textContent?.substring(0, 50),
        className: el.className,
      }));
    });

  console.log("\nFirst 20 visible elements:");
  visibleElements.forEach((el) => {
    if (el.text?.trim()) {
      console.log(
        `  <${el.tag}${el.className ? ` class="${el.className}"` : ""}> ${el.text}...`,
      );
    }
  });

  // Take screenshot
  await page.screenshot({ path: "debug-page.png", fullPage: true });
  console.log("\nScreenshot saved to debug-page.png");
});
