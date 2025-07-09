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
  return `import React, { useState } from 'react';
import { ${component.imports.join(', ')} } from 'ag-grid-react-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// Example implementation for ${component.name}
function App() {
  const [rowData] = useState([
    { id: 1, name: 'Task 1', date: '2024-01-15', status: 'Open', priority: 'High' },
    { id: 2, name: 'Task 2', date: '2024-01-20', status: 'In Progress', priority: 'Medium' },
    { id: 3, name: 'Task 3', date: '2024-01-25', status: 'Done', priority: 'Low' },
  ]);

  const [columnDefs] = useState([
    { field: 'name', headerName: 'Name' },
    { 
      field: 'date', 
      headerName: 'Date',
      filter: ${component.name === 'DateFilter' ? 'DateFilter' : 'true'},
    },
    { field: 'status', headerName: 'Status' },
    { field: 'priority', headerName: 'Priority' },
  ]);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', flex: '0 0 auto' }}>
        <h1>${component.title}</h1>
        <p>${component.description}</p>
      </div>
      <div className="ag-theme-quartz-dark" style={{ flex: 1, padding: '0 20px 20px' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          floatingFilter={true}
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
      stackblitzUrl: `https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main/examples/${comp.name.toLowerCase()}`,
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
    
    // Create a simple index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${component.title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
    
    writeFileSync(join(componentDir, 'index.html'), indexHtml);
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