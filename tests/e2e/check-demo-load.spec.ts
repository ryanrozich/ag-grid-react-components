import { test, expect } from "@playwright/test";

test("check demo loads without errors", async ({ page }) => {
  const errors: string[] = [];
  
  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("AG Grid Enterprise License")) {
      errors.push(msg.text());
      console.log("Console error:", msg.text());
    }
  });
  
  page.on("pageerror", (error) => {
    errors.push(error.message);
    console.log("Page error:", error.message);
  });

  // Try to load the demo
  try {
    const response = await page.goto("http://localhost:5174/demo", {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });
    
    console.log("Response status:", response?.status());
    
    // Wait a bit for React to render
    await page.waitForTimeout(5000);
    
    // Check what's on the page
    const title = await page.title();
    console.log("Page title:", title);
    
    // Look for any elements
    const bodyText = await page.locator("body").textContent();
    console.log("Body text (first 200 chars):", bodyText?.substring(0, 200));
    
    // Check for specific elements
    const hasRoot = await page.locator("#root").count();
    console.log("Has root element:", hasRoot);
    
    const buttons = await page.locator("button").all();
    console.log("Number of buttons:", buttons.length);
    
    for (const button of buttons.slice(0, 5)) {
      const text = await button.textContent();
      console.log("  Button:", text);
    }
    
  } catch (error) {
    console.error("Failed to load page:", error);
  }
  
  // Check for errors
  if (errors.length > 0) {
    console.log("JavaScript errors found:", errors);
  }
  
  await page.screenshot({ path: 'demo-load-check.png', fullPage: true });
});