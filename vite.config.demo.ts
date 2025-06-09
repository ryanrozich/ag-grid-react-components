import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite config specifically for building the demo as a standalone app
export default defineConfig({
  plugins: [react()],
  root: ".",
  // Use environment variable for base path, with fallback
  base: process.env.VITE_BASE_PATH || "/ag-grid-react-components/",
  build: {
    outDir: "dist-demo",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
