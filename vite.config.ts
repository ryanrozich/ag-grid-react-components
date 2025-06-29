import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "AGGridReactComponents",
      fileName: (format) => `ag-grid-react-components.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "ag-grid-community",
        "ag-grid-react",
        "date-fns",
        "ag-grid-enterprise",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "ag-grid-community": "agGrid",
          "ag-grid-react": "AgGridReact",
          "date-fns": "dateFns",
          "ag-grid-enterprise": "agGridEnterprise",
        },
        exports: "named",
      },
    },
    cssCodeSplit: false,
  },
  optimizeDeps: {
    include: ["ag-grid-enterprise", "ag-grid-community", "ag-grid-react"],
    force: true,
  },
  server: {
    port: parseInt(process.env.E2E_PORT || "5173", 10),
    strictPort: false, // Allow Vite to find another port if the default is taken
    hmr: true,
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    include: [
      "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "!**/node_modules/**",
      "!**/dist/**",
      "!**/e2e/**",
    ],
    exclude: ["**/e2e/**", "**/playwright.config.*"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/e2e/**",
        "**/test-utils/**",
        "**/*.d.ts",
        "**/vite.config.*",
        "**/playwright.config.*",
      ],
    },
    environmentOptions: {
      jsdom: {
        // Add any JSDOM-specific options here
      },
    },
    // Increase timeout for tests that might take longer
    testTimeout: 10000,
    // Show output for failing tests
    silent: false,
  },
});
