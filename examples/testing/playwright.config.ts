import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration Example
 *
 * This configuration provides E2E testing setup optimized for CI/CD environments
 * with support for multiple browsers and visual regression testing.
 *
 * CUSTOMIZE: Adjust browsers, timeouts, and options for your needs.
 */
export default defineConfig({
  // Test directory
  testDir: "./tests/e2e", // CUSTOMIZE: Your E2E test location

  // Test timeout
  timeout: 30000, // 30 seconds per test

  // Fail on console errors
  fullyParallel: true,

  // Retry configuration
  retries: process.env.CI ? 2 : 0, // Retry on CI only

  // Parallel workers
  workers: process.env.CI ? 1 : undefined, // Single worker on CI

  // Reporter configuration
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["json", { outputFile: "test-results.json" }],
    ["junit", { outputFile: "junit.xml" }],
    ["list"], // Console output
  ],

  // Global test configuration
  use: {
    // Base URL for tests
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:5173",

    // Artifact collection
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Action timeout
    actionTimeout: 10000, // 10 seconds

    // Navigation timeout
    navigationTimeout: 30000, // 30 seconds

    // Strict selectors
    strict: true,

    // Accept downloads
    acceptDownloads: true,

    // Locale
    locale: "en-US",

    // Timezone
    timezoneId: "America/New_York",

    // Color scheme
    colorScheme: "light", // CUSTOMIZE: 'light' | 'dark' | 'no-preference'

    // Extra HTTP headers
    extraHTTPHeaders: {
      "Accept-Language": "en-US",
    },
  },

  // Project configuration - CUSTOMIZE browser selection
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Chrome-specific options
        launchOptions: {
          args: ["--disable-web-security"], // For cross-origin testing
        },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        // Firefox-specific options
        launchOptions: {
          firefoxUserPrefs: {
            "media.navigator.streams.fake": true,
            "media.navigator.permission.disabled": true,
          },
        },
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        // Safari-specific options
      },
    },

    // Mobile testing - CUSTOMIZE if needed
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },

    {
      name: "mobile-safari",
      use: {
        ...devices["iPhone 12"],
      },
    },

    // Visual regression testing project
    {
      name: "visual",
      use: {
        ...devices["Desktop Chrome"],
        // Visual testing specific
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
        hasTouch: false,
        isMobile: false,
      },
      grep: /@visual/, // Only run tests tagged with @visual
    },
  ],

  // Global setup and teardown
  globalSetup: "./tests/e2e/global-setup.ts", // CUSTOMIZE: Your setup
  globalTeardown: "./tests/e2e/global-teardown.ts", // CUSTOMIZE: Your teardown

  // Output folder for test artifacts
  outputDir: "test-results/",

  // Dev server configuration
  webServer: {
    command: "npm run dev", // CUSTOMIZE: Your dev server command
    url: "http://localhost:5173",
    timeout: 120000, // 2 minutes
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },

  // Expect configuration
  expect: {
    // Timeout for expect assertions
    timeout: 5000,

    // Visual regression thresholds
    toHaveScreenshot: {
      // Threshold between 0-1 for pixel differences
      threshold: 0.2,

      // Maximum allowed pixel difference
      maxDiffPixels: 100,

      // Animation handling
      animations: "disabled",

      // Consistent screenshots
      caret: "hide",
    },
  },

  // Preserve test output
  preserveOutput: "always",

  // Update snapshots
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === "true" ? "all" : "missing",
});
