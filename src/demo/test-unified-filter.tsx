import React, { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
import { RelativeDateFilter } from "../index";
import { generateData } from "./data/generator";
import "./styles/showcase-dark.css";

// Register AG Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

const TestUnifiedFilter: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData] = useState(() => generateData(100));
  const [showFloatingFilter, setShowFloatingFilter] = useState(true);

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
      headerName: "Date (With Floating Filter)",
      width: 200,
      filter: RelativeDateFilter,
      floatingFilter: showFloatingFilter,
      // Note: NOT specifying floatingFilterComponent
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
      valueFormatter: (params) => {
        if (!params.value) return "";
        return new Date(params.value).toLocaleDateString();
      },
    },
    {
      field: "value",
      headerName: "Amount",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => {
        if (params.value == null) return "";
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(params.value);
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

  const toggleFloatingFilter = () => {
    setShowFloatingFilter(!showFloatingFilter);
  };

  const clearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
    }
  };

  const applyTestFilter = () => {
    if (gridApi) {
      gridApi.setFilterModel({
        date: {
          type: "inRange",
          mode: "relative",
          expressionFrom: "Today-7d",
          expressionTo: "Today",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Test: Unified Filter Component
        </h1>

        <div className="mb-4 space-x-4">
          <button
            onClick={toggleFloatingFilter}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            {showFloatingFilter ? "Hide" : "Show"} Floating Filter
          </button>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Clear Filters
          </button>

          <button
            onClick={applyTestFilter}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Apply Test Filter (Last 7 Days)
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-900 rounded">
          <h2 className="text-lg font-semibold mb-2">Test Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
            <li>Click on the date column header to open the filter menu</li>
            <li>Try setting a filter using the column filter</li>
            <li>Open the Filter Tool Panel on the right side</li>
            <li>
              Check if the RelativeDateFilter appears and works in the tool
              panel
            </li>
            <li>Toggle floating filter on/off to see behavior</li>
            <li>
              Note: Currently using RelativeDateFilter without a separate
              floating filter component
            </li>
          </ol>
        </div>

        <div className="ag-theme-quartz-dark h-[600px]">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            animateRows={true}
            sideBar={{
              toolPanels: [
                {
                  id: "filters",
                  labelDefault: "Filters",
                  labelKey: "filters",
                  iconKey: "filter",
                  toolPanel: "agFiltersToolPanel",
                },
              ],
              defaultToolPanel: "filters",
              position: "right",
            }}
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
    <TestUnifiedFilter />
  </React.StrictMode>,
);

export default TestUnifiedFilter;
