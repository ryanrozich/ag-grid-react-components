import React, { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { 
  ColDef, 
  GridReadyEvent,
} from 'ag-grid-community';
// Import AG Grid Enterprise for additional features
import 'ag-grid-enterprise';
import { addDays, format } from 'date-fns';

import RelativeDateFilter from '../components/RelativeDateFilter';
import RelativeDateFloatingFilter from '../components/RelativeDateFloatingFilter';

// Import demo styles
import './styles.css';
import '../styles.css';

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
    
    // Resize columns to fit the available width - only if columns exist
    setTimeout(() => {
      if (params.columnApi.getAllDisplayedColumns().length > 0) {
        params.api.sizeColumnsToFit();
      }
    }, 100);
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
    <div className="container">
      <h1>AG Grid Date Filter Demo</h1>
      
      <div className="button-group">
        <button onClick={saveFilterState}>
          Save Filter to URL
        </button>
        <button onClick={loadFilterState}>
          Load Filter from URL
        </button>
      </div>
      
      <div className="ag-theme-alpine">
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
      
      <div className="instructions">
        <h2>Usage Instructions</h2>
        <ul>
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

export default App;