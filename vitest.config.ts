import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom",
    exclude: ["node_modules", "dist", ".trunk", "**/.trunk/**", "tests/e2e/**"],
  },
});
