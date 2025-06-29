import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        "date-filter/index": resolve(__dirname, "src/date-filter/index.ts"),
        "quick-filter/index": resolve(__dirname, "src/quick-filter/index.ts"),
        "active-filters/index": resolve(
          __dirname,
          "src/active-filters/index.ts",
        ),
        "utils/index": resolve(__dirname, "src/utils/index.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        const ext = format === "es" ? "js" : "cjs";
        return `${entryName}.${ext}`;
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "ag-grid-community",
        "ag-grid-react",
        "date-fns",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "ag-grid-community": "agGrid",
          "ag-grid-react": "AgGridReact",
          "date-fns": "dateFns",
        },
      },
    },
    sourcemap: true,
    minify: false, // Keep code readable for debugging
  },
});
