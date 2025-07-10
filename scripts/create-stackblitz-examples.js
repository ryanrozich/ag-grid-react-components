#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Creates StackBlitz example configurations that can be used
 * to generate live examples for each component
 */

const components = [
  {
    name: 'DateFilter',
    title: 'DateFilter - Natural Language Example',
    description: 'AG Grid with natural language date filtering',
    imports: ['DateFilter'],
  },
  {
    name: 'QuickFilterDropdown',
    title: 'QuickFilterDropdown - Custom Presets',
    description: 'Quick filter dropdown with custom filter presets',
    imports: ['QuickFilterDropdown', 'ActiveFilters'],
  },
  {
    name: 'ActiveFilters',
    title: 'ActiveFilters - Interactive Pills',
    description: 'Display active filters as removable pills',
    imports: ['ActiveFilters', 'DateFilter'],
  },
];

// Template for creating example apps
const createExampleApp = (component) => {
  // Component-specific configurations
  const configs = {
    DateFilter: {
      extraImports: '',
      columnDefs: `[
    { field: 'name', headerName: 'Name' },
    {
      field: 'date',
      headerName: 'Date',
      filter: DateFilter,
      filterParams: {
        naturalLanguageEnabled: true,
        dateFormat: 'yyyy-MM-dd'
      },
      floatingFilter: true
    },
    { field: 'status', headerName: 'Status' },
    { field: 'priority', headerName: 'Priority' },
  ]`,
      extraSetup: ''
    },
    QuickFilterDropdown: {
      extraImports: '',
      columnDefs: `[
    { field: 'name', headerName: 'Name', filter: true },
    { field: 'date', headerName: 'Date', filter: 'agDateColumnFilter' },
    { field: 'status', headerName: 'Status', filter: true },
    { field: 'priority', headerName: 'Priority', filter: true },
  ]`,
      extraSetup: `
  const filterPresets = [
    { id: 'high-priority', name: 'High Priority', filter: { priority: { values: ['High'] } } },
    { id: 'recent', name: 'Recent Tasks', filter: { date: { dateFrom: '2024-01-20' } } },
    { id: 'in-progress', name: 'In Progress', filter: { status: { values: ['In Progress'] } } },
  ];`
    },
    ActiveFilters: {
      extraImports: 'import { DateFilter } from "ag-grid-react-components";',
      columnDefs: `[
    { field: 'name', headerName: 'Name', filter: true },
    {
      field: 'date',
      headerName: 'Date',
      filter: DateFilter,
      filterParams: {
        naturalLanguageEnabled: true
      }
    },
    { field: 'status', headerName: 'Status', filter: true },
    { field: 'priority', headerName: 'Priority', filter: true },
  ]`,
      extraSetup: ''
    }
  };

  const config = configs[component.name] || configs.DateFilter;

  return `import React, { useState, useRef } from 'react';
import { ${component.imports.join(', ')} } from 'ag-grid-react-components';
import { AgGridReact } from 'ag-grid-react';
${config.extraImports}
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Example implementation for ${component.name}
function App() {
  const gridRef = useRef(null);
  const [rowData] = useState([
    { id: 1, name: 'Task 1', date: '2024-01-15', status: 'Open', priority: 'High' },
    { id: 2, name: 'Task 2', date: '2024-01-20', status: 'In Progress', priority: 'Medium' },
    { id: 3, name: 'Task 3', date: '2024-01-25', status: 'Done', priority: 'Low' },
    { id: 4, name: 'Task 4', date: '2024-01-30', status: 'Open', priority: 'High' },
    { id: 5, name: 'Task 5', date: '2024-02-05', status: 'In Progress', priority: 'Low' },
  ]);

  const [columnDefs] = useState(${config.columnDefs});
${config.extraSetup}

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', flex: '0 0 auto' }}>
        <h1>${component.title}</h1>
        <p>${component.description}</p>
        ${component.name === 'QuickFilterDropdown' ? `
        <div style={{ marginTop: '16px' }}>
          <QuickFilterDropdown
            api={gridRef.current?.api}
            filterPresets={filterPresets}
          />
        </div>` : ''}
        ${component.name === 'ActiveFilters' ? `
        <div style={{ marginTop: '16px' }}>
          <ActiveFilters api={gridRef.current?.api} />
        </div>` : ''}
      </div>
      <div className="ag-theme-quartz-dark" style={{ flex: 1, padding: '0 20px 20px' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          floatingFilter={true}
          onGridReady={(params) => {
            gridRef.current = params;
          }}
        />
      </div>
    </div>
  );
}

export default App;`;
};

// Create a manifest file for all examples
const createManifest = () => {
  const manifest = {
    examples: components.map(comp => ({
      id: comp.name.toLowerCase(),
      name: comp.name,
      title: comp.title,
      description: comp.description,
      stackblitzUrl: `https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/[BRANCH]/examples/${comp.name.toLowerCase()}`,
      files: {
        'App.tsx': `examples/${comp.name.toLowerCase()}/App.tsx`,
        'package.json': 'examples/shared/package.json',
      }
    }))
  };

  return manifest;
};

// Generate example files
const generateExamples = () => {
  const examplesDir = join(__dirname, '../examples');
  mkdirSync(examplesDir, { recursive: true });

  // Create shared package.json
  const sharedDir = join(examplesDir, 'shared');
  mkdirSync(sharedDir, { recursive: true });

  const packageJson = {
    name: 'ag-grid-react-components-examples',
    version: '1.0.0',
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'ag-grid-react': '^33.0.0',
      'ag-grid-community': '^33.0.0',
      'ag-grid-react-components': 'latest',
      'date-fns': '^4.0.0'
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.2.0',
      'typescript': '^5.3.0',
      'vite': '^5.0.0'
    }
  };

  writeFileSync(
    join(sharedDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Create example files for each component
  components.forEach(component => {
    const componentDir = join(examplesDir, component.name.toLowerCase());
    mkdirSync(componentDir, { recursive: true });

    const appContent = createExampleApp(component);
    writeFileSync(join(componentDir, 'App.tsx'), appContent);

    // Create main.tsx entry point
    const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
    writeFileSync(join(componentDir, 'main.tsx'), mainTsx);

    // Create index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${component.title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>`;

    writeFileSync(join(componentDir, 'index.html'), indexHtml);

    // Create vite.config.ts
    const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`;

    writeFileSync(join(componentDir, 'vite.config.ts'), viteConfig);

    // Create tsconfig.json
    const tsConfig = {
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true
      },
      include: ["**/*.ts", "**/*.tsx"],
      references: [{ path: "./tsconfig.node.json" }]
    };

    writeFileSync(join(componentDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));

    // Create tsconfig.node.json
    const tsConfigNode = {
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: "ESNext",
        moduleResolution: "bundler",
        allowSyntheticDefaultImports: true
      },
      include: ["vite.config.ts"]
    };

    writeFileSync(join(componentDir, 'tsconfig.node.json'), JSON.stringify(tsConfigNode, null, 2));

    // Copy package.json to each example
    const examplePackageJson = JSON.parse(readFileSync(join(sharedDir, 'package.json'), 'utf8'));
    examplePackageJson.name = `${component.name.toLowerCase()}-example`;
    writeFileSync(join(componentDir, 'package.json'), JSON.stringify(examplePackageJson, null, 2));
  });

  // Create manifest
  const manifest = createManifest();
  writeFileSync(
    join(examplesDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('✅ Examples generated successfully!');
  console.log('\nYou can now:');
  console.log('1. Commit these examples to your repo');
  console.log('2. Use StackBlitz GitHub import URLs');
  console.log('3. Or use the StackBlitz API to create projects dynamically\n');
};

// Run the generator
generateExamples();