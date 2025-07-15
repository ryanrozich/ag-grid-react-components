import { test, expect } from "@playwright/test";

test.describe("Server-Side Date Filter", () => {
  test("should filter data when selecting date filter on server-side demo", async ({
    page,
  }) => {
    // Capture console logs and network requests
    const consoleLogs: string[] = [];
    const apiCalls: { url: string; body: any }[] = [];

    page.on("console", (msg) => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    page.on("request", (request) => {
      if (request.url().includes("/api/tasks")) {
        apiCalls.push({
          url: request.url(),
          body: request.postData() ? JSON.parse(request.postData()!) : null,
        });
      }
    });

    // Navigate to the demo page
    await page.goto("http://localhost:5174/demo");

    // Wait for the grid to load
    await page.waitForSelector(".ag-root", { timeout: 30000 });

    // Click on Server-Side Data tab
    const serverSideTab = page
      .locator("button")
      .filter({ hasText: "Server-Side Data" });
    await serverSideTab.click();

    // Wait for server-side grid to load
    await page.waitForTimeout(2000);

    // Get initial task count
    const initialCount = await page
      .locator('span:has-text("results")')
      .textContent();
    console.log("Initial count:", initialCount);

    // Find and click the due date quick filter dropdown
    const dueDateDropdown = page
      .locator("button")
      .filter({ hasText: /All Time|Time period/ })
      .first();
    await expect(dueDateDropdown).toBeVisible({ timeout: 10000 });
    await dueDateDropdown.click();

    // Wait for dropdown to open
    await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
      state: "visible",
    });

    // Click on "Last 7 Days" option
    const last7DaysOption = page.locator(
      'button[role="option"]:has-text("Last 7 Days")',
    );
    await expect(last7DaysOption).toBeVisible();
    await last7DaysOption.click();

    // Wait for filter to be applied
    await page.waitForTimeout(3000);

    // Get new task count
    const newCount = await page
      .locator('span:has-text("results")')
      .textContent();
    console.log("New count:", newCount);

    // Check API calls
    console.log("\n=== API Calls Made ===");
    apiCalls.forEach((call, index) => {
      console.log(`Call ${index + 1}:`, call.url);
      console.log("Body:", JSON.stringify(call.body, null, 2));
    });

    // Check filter-related console logs
    console.log("\n=== Filter Console Logs ===");
    consoleLogs
      .filter(
        (log) =>
          log.includes("Filter") ||
          log.includes("Workaround") ||
          log.includes("AGGrid"),
      )
      .forEach((log) => console.log(log));

    // The filtered count should be different from initial count
    expect(newCount).not.toBe(initialCount);
    expect(newCount).toContain("1,983"); // Verify specific filtered count

    // Verify that the filter model was sent correctly in the API call
    const lastApiCall = apiCalls[apiCalls.length - 1];
    expect(lastApiCall.body.filterModel).toHaveProperty("dueDate");
    expect(lastApiCall.body.filterModel.dueDate).toMatchObject({
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-7d",
      expressionTo: "Today",
    });

    // Take a screenshot for debugging
    await page.screenshot({
      path: "test-results/server-side-date-filter.png",
      fullPage: true,
    });
  });
});
