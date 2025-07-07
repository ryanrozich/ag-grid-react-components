/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vitest Configuration Example
 *
 * This configuration provides a comprehensive setup for unit and integration testing
 * of TypeScript/React components with high coverage requirements.
 *
 * CUSTOMIZE: Adjust paths, coverage thresholds, and options for your project.
 */
export default defineConfig({
  plugins: [react()],

  test: {
    // Test environment
    environment: "jsdom", // For React components

    // Global setup
    globals: true,
    setupFiles: ["./tests/setup.ts"], // CUSTOMIZE: Your setup file

    // Test patterns
    include: [
      "src/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "tests/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "src/demo/**", // CUSTOMIZE: Exclude demo from coverage
    ],

    // Coverage configuration
    coverage: {
      enabled: true,
      reporter: ["text", "json", "html", "lcov"],
      provider: "v8",

      // Coverage thresholds - CUSTOMIZE these values
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },

      // Files to include in coverage
      include: ["src/**/*.{ts,tsx}"],

      // Files to exclude from coverage
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/**/types.ts",
        "src/**/index.ts", // Often just exports
        "src/demo/**", // Demo app
        "src/**/__tests__/**",
        "src/**/__mocks__/**",
      ],

      // Clean coverage between runs
      clean: true,

      // Report uncovered files
      all: true,
    },

    // Test timeout
    testTimeout: 10000, // 10 seconds
    hookTimeout: 10000, // 10 seconds

    // Reporter configuration
    reporters: ["default", "html"],
    outputFile: {
      html: "./test-results/index.html",
    },

    // Watch mode configuration
    watchExclude: ["**/node_modules/**", "**/dist/**"],

    // Parallel execution
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },

    // Retry flaky tests
    retry: 2, // CUSTOMIZE: Adjust based on test stability

    // Snapshot configuration
    snapshotFormat: {
      escapeString: false,
      printBasicPrototype: false,
    },

    // Mock configuration
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,

    // CSS handling
    css: {
      modules: {
        classNameStrategy: "non-scoped", // For headless components
      },
    },
  },

  // Path resolution
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@test-utils": path.resolve(__dirname, "./tests/utils"),
    },
  },

  // Build configuration (for test builds)
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },

  // Server configuration (for component testing)
  server: {
    deps: {
      inline: ["ag-grid-react"], // CUSTOMIZE: Your specific deps
    },
  },
});
