import React, { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import { RelativeDateFilter } from "../index";
import "./styles/showcase-dark.css";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

const TestFloatingFilterDisplay: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  
  // Simple test data
  const rowData = [
    { id: 1, name: "Test 1", date: new Date(2025, 5, 10) }, // June 10, 2025
    { id: 2, name: "Test 2", date: new Date(2025, 5, 8) },  // June 8, 2025
    { id: 3, name: "Test 3", date: new Date(2025, 5, 12) }, // June 12, 2025
  ];

  const columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      filter: RelativeDateFilter,
      floatingFilter: true,
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
      valueFormatter: (params) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleDateString();
      },
    },
  ];

  const defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  const applyAfterFilter = () => {
    if (gridApi) {
      gridApi.setFilterModel({
        date: {
          type: "after",
          mode: "relative",
          expressionFrom: "Today",
          fromInclusive: false,
        },
      });
    }
  };

  const applyAfterInclusiveFilter = () => {
    if (gridApi) {
      gridApi.setFilterModel({
        date: {
          type: "after",
          mode: "relative",
          expressionFrom: "Today",
          fromInclusive: true,
        },
      });
    }
  };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Test: Floating Filter Display Issue
        </h1>
        
        <div className="mb-4 p-4 bg-gray-900 rounded">
          <p className="mb-3">
            Testing if the floating filter correctly shows "After" filters with proper prefix.
          </p>
          <p className="text-sm text-gray-400">
            Open the browser console to see debug logs.
          </p>
        </div>

        <div className="mb-4 space-x-4">
          <button
            onClick={applyAfterFilter}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Apply "After Today" (exclusive)
          </button>
          
          <button
            onClick={applyAfterInclusiveFilter}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Apply "After Today" (inclusive)
          </button>
          
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Clear Filters
          </button>
        </div>

        <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded">
          <h3 className="font-semibold text-yellow-400 mb-2">Expected Results:</h3>
          <ul className="text-sm space-y-1">
            <li>• "After Today" (exclusive) should show: <code className="bg-gray-800 px-1 rounded">&gt; Today</code></li>
            <li>• "After Today" (inclusive) should show: <code className="bg-gray-800 px-1 rounded">≥ Today</code></li>
          </ul>
        </div>

        <div className="ag-theme-quartz-dark h-[400px]">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            animateRows={true}
          />
        </div>
      </div>
    </div>
  );
};

// Mount the component
const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TestFloatingFilterDisplay />
  </React.StrictMode>
);

export default TestFloatingFilterDisplay;