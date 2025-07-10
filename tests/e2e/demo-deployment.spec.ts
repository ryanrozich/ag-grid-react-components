import { test, expect } from "@playwright/test";

test.describe("Demo Deployment", () => {
  test.beforeEach(async ({ page }) => {
    // Get the demo URL from environment variable or use default
    // Use the same port as configured in playwright.config.ts
    const PORT = process.env.E2E_PORT
      ? parseInt(process.env.E2E_PORT, 10)
      : 5173;
    const demoUrl = process.env.DEMO_URL || `http://localhost:${PORT}`;
    // Navigate to the demo page - the router supports both '/' and '/demo'
    const demoDashboardUrl = demoUrl.endsWith("/")
      ? `${demoUrl}demo`
      : `${demoUrl}/demo`;
    await page.goto(demoDashboardUrl);
  });

  test("should load demo page successfully", async ({ page }) => {
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/AG Grid React Components/);

    // Check for main heading - be more specific to avoid multiple matches
    await expect(page.locator("h1.text-2xl.font-semibold")).toContainText(
      "Project Tasks",
    );
  });

  test("should load all assets correctly", async ({ page }) => {
    // Listen for any failed requests
    const failedRequests: string[] = [];

    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.failure()?.errorText}: ${request.url()}`);
    });

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check that no requests failed
    expect(failedRequests).toHaveLength(0);
  });

  test("should display stats cards", async ({ page }) => {
    // Check for stats cards - use more specific selectors
    await expect(
      page.locator("p").filter({ hasText: "Number of Tasks" }),
    ).toBeVisible();
    await expect(
      page.locator("p").filter({ hasText: "Total Budget" }),
    ).toBeVisible();
    await expect(
      page.locator("p").filter({ hasText: /^Progress$/ }),
    ).toBeVisible();
    await expect(
      page.locator("p").filter({ hasText: "Budget Remaining" }),
    ).toBeVisible();
  });

  test("should render AG Grid", async ({ page }) => {
    // Wait for AG Grid to be rendered
    await page.waitForSelector(".ag-root-wrapper");

    // Check that grid has rendered with data
    const gridRows = await page.locator(".ag-row").count();
    expect(gridRows).toBeGreaterThan(0);
  });

  test("should switch between client and server demos", async ({ page }) => {
    // Check for demo tabs - match actual button text
    const clientTab = page.locator("button:has-text('Client-Side Data')");
    const serverTab = page.locator("button:has-text('Server-Side Data')");

    await expect(clientTab).toBeVisible();
    await expect(serverTab).toBeVisible();

    // Switch to server-side demo
    await serverTab.click();

    // Check for server-side demo banner
    await expect(page.locator("text=Server-Side Row Model Demo")).toBeVisible();
  });

  test("should have working filters", async ({ page }) => {
    // Open filter menu for status column
    await page
      .locator(".ag-header-cell:has-text('Status') .ag-header-cell-menu-button")
      .click();

    // Check that filter menu appears
    await expect(page.locator(".ag-menu")).toBeVisible();
  });

  test("should load React DatePicker when opening date filter", async ({
    page,
  }) => {
    // Open filter for Due Date column
    await page
      .locator(
        ".ag-header-cell:has-text('Due Date') .ag-header-cell-menu-button",
      )
      .click();

    // Wait for filter to load
    await page.waitForSelector(".ag-filter");

    // Check that date filter is rendered
    await expect(page.locator(".ag-filter")).toBeVisible();
  });
});

// Deployment-specific tests
test.describe("Deployment Validation", () => {
  test("should have correct base path for assets", async ({ page }) => {
    const PORT = process.env.E2E_PORT
      ? parseInt(process.env.E2E_PORT, 10)
      : 5173;
    const demoUrl = process.env.DEMO_URL || `http://localhost:${PORT}`;

    // Extract base path from URL
    const url = new URL(demoUrl);
    const expectedBasePath = url.pathname.endsWith("/")
      ? url.pathname
      : url.pathname + "/";

    // Navigate to demo page
    const demoDashboardUrl = demoUrl.endsWith("/")
      ? `${demoUrl}demo`
      : `${demoUrl}/demo`;
    await page.goto(demoDashboardUrl);

    // Check that CSS and JS assets are loaded from correct path
    const cssLinks = await page.locator('link[rel="stylesheet"]').all();
    const scriptTags = await page.locator("script[src]").all();

    for (const link of cssLinks) {
      const href = await link.getAttribute("href");
      if (href && !href.startsWith("http")) {
        const escapedPath = expectedBasePath.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        expect(href).toMatch(new RegExp(`^${escapedPath}assets`));
      }
    }

    for (const script of scriptTags) {
      const src = await script.getAttribute("src");
      if (src && !src.startsWith("http")) {
        const escapedPath = expectedBasePath.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        expect(src).toMatch(new RegExp(`^${escapedPath}assets`));
      }
    }
  });
});
