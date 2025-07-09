import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom",
    exclude: [
      "node_modules",
      "dist",
      ".trunk",
      "**/.trunk/**",
      "tests/e2e/**",
      "src/tests/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "tests/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/__tests__/**",
        "vitest.setup.ts",
        "src/demo/**",
        "src/test-utils/**",
      ],
    },
  },
});
