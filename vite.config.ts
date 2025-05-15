import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'AGGridDateFilter',
      fileName: (format) => `ag-grid-date-filter.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'ag-grid-community', 'ag-grid-react', 'date-fns'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'ag-grid-community': 'agGrid',
          'ag-grid-react': 'AgGridReact',
          'date-fns': 'dateFns',
        },
        exports: 'named',
      },
    },
    cssCodeSplit: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});