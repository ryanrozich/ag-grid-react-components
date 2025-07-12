import { test } from "@playwright/test";

test("check network and console errors", async ({ page }) => {
  const failedRequests: string[] = [];
  
  // Monitor failed network requests
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
  });
  
  // Monitor console
  page.on("console", (msg) => {
    console.log(`${msg.type()}: ${msg.text()}`);
  });
  
  page.on("pageerror", (error) => {
    console.log("Page error:", error.message);
  });

  // Monitor responses
  page.on("response", (response) => {
    if (response.status() >= 400) {
      console.log(`HTTP ${response.status()} - ${response.url()}`);
    }
  });

  // Navigate
  await page.goto("http://localhost:5174/demo", {
    waitUntil: "networkidle",
    timeout: 30000
  });
  
  // Wait for potential lazy loading
  await page.waitForTimeout(3000);
  
  if (failedRequests.length > 0) {
    console.log("Failed requests:", failedRequests);
  }
  
  // Check if React rendered
  const reactRoot = await page.evaluate(() => {
    const root = document.getElementById("root");
    return {
      hasChildren: root ? root.children.length > 0 : false,
      innerHTML: root ? root.innerHTML.substring(0, 200) : "no root"
    };
  });
  
  console.log("React root:", reactRoot);
});