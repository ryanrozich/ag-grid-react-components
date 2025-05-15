import React, { useState, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { addDays, format } from 'date-fns';

import RelativeDateFilter from '../components/RelativeDateFilter';
import RelativeDateFloatingFilter from '../components/RelativeDateFloatingFilter';

import '../index.css';

// Generate sample data
const generateData = (count: number) => {
  const today = new Date();
  const data = [];
  
  for (let i = 0; i < count; i++) {
    const date = addDays(today, -30 + Math.floor(Math.random() * 60));
    
    data.push({
      id: i,
      name: `Item ${i + 1}`,
      date,
      dateString: format(date, 'yyyy-MM-dd'),
      value: Math.floor(Math.random() * 1000)
    });
  }
  
  return data;
};

const App: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  
  // Column definitions
  const columnDefs = useMemo<ColDef[]>(() => [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { 
      field: 'date', 
      headerName: 'Date (Object)',
      filter: RelativeDateFilter,
      floatingFilter: true,
      floatingFilterComponent: RelativeDateFloatingFilter,
      valueFormatter: (params) => params.value ? format(params.value, 'yyyy-MM-dd') : ''
    },
    { 
      field: 'dateString', 
      headerName: 'Date (String)', 
      filter: RelativeDateFilter,
      floatingFilter: true,
      floatingFilterComponent: RelativeDateFloatingFilter
    },
    { field: 'value', headerName: 'Value', width: 120 }
  ], []);
  
  // Default column definitions
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true
  }), []);
  
  // Handle grid ready event
  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    
    // Load initial data
    const data = generateData(100);
    setRowData(data);
    
    // Resize columns to fit the available width
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    });
  }, []);
  
  // Save filter state to URL
  const saveFilterState = useCallback(() => {
    if (!gridApi) return;
    
    const filterModel = gridApi.getFilterModel();
    const filterJson = JSON.stringify(filterModel);
    
    // Update URL with filter state
    const url = new URL(window.location.href);
    url.searchParams.set('filter', filterJson);
    window.history.pushState({}, '', url.toString());
    
    alert('Filter state saved to URL');
  }, [gridApi]);
  
  // Load filter state from URL
  const loadFilterState = useCallback(() => {
    if (!gridApi) return;
    
    const url = new URL(window.location.href);
    const filterJson = url.searchParams.get('filter');
    
    if (filterJson) {
      try {
        const filterModel = JSON.parse(filterJson);
        gridApi.setFilterModel(filterModel);
        alert('Filter state loaded from URL');
      } catch (error) {
        alert('Invalid filter state in URL');
      }
    } else {
      alert('No filter state found in URL');
    }
  }, [gridApi]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AG Grid Date Filter Demo</h1>
      
      <div className="mb-4 flex gap-3">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={saveFilterState}
        >
          Save Filter to URL
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={loadFilterState}
        >
          Load Filter from URL
        </button>
      </div>
      
      <div className="ag-theme-alpine w-full h-[600px]">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          animateRows={true}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
      
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Usage Instructions</h2>
        <ul className="list-disc ml-5 mt-2">
          <li>Toggle between Absolute and Relative date modes</li>
          <li>For absolute dates, use the date picker</li>
          <li>For relative dates, enter expressions like "Today", "Today+7d", "Today-3m"</li>
          <li>Supported units: d (days), w (weeks), m (months), y (years)</li>
          <li>Use the filter dropdown to select different filter types</li>
          <li>Click "Save Filter to URL" to bookmark your current filter state</li>
        </ul>
      </div>
    </div>
  );
};

// Render the application
const root = createRoot(document.getElementById('root')!);
root.render(<App />);