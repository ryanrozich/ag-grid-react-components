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

const TestNoFloatingFilter: React.FC = () => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData] = useState(() => generateData(100));

  const columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      filter: "agNumberColumnFilter",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      filter: "agTextColumnFilter",
    },
    {
      field: "date",
      headerName: "Date (Auto Float)",
      width: 200,
      filter: RelativeDateFilter,
      floatingFilter: true,
      // NOTE: No floatingFilterComponent specified!
      // Should use getModelAsString() for automatic read-only floating filter
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
      },
      // Ensure filter appears in column menu
      menuTabs: ["filterMenuTab"],
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
      floatingFilter: true,
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
    menuTabs: ["generalMenuTab", "filterMenuTab", "columnsMenuTab"],
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
    console.log("Grid ready, testing automatic floating filter");
  }, []);

  const applyDateFilter = () => {
    if (gridApi) {
      gridApi.setFilterModel({
        date: {
          type: "inRange",
          mode: "relative",
          expressionFrom: "Today-7d",
          expressionTo: "Today",
          fromInclusive: true,
          toInclusive: true,
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Test: Automatic Floating Filter
        </h1>

        <div className="mb-4 p-4 bg-gray-900 rounded">
          <h2 className="text-lg font-semibold mb-2">Test Configuration:</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
            <li>
              Date column has{" "}
              <code className="bg-gray-800 px-1 rounded">
                floatingFilter: true
              </code>
            </li>
            <li>
              NO{" "}
              <code className="bg-gray-800 px-1 rounded">
                floatingFilterComponent
              </code>{" "}
              specified
            </li>
            <li>
              RelativeDateFilter implements{" "}
              <code className="bg-gray-800 px-1 rounded">
                getModelAsString()
              </code>
            </li>
          </ul>

          <div className="mt-4 p-3 bg-blue-900/30 border border-blue-600/30 rounded">
            <p className="text-sm">
              <strong>Expected:</strong> AG Grid should display a read-only
              floating filter showing the string representation of the active
              filter.
            </p>
          </div>
        </div>

        <div className="mb-4 space-x-4">
          <button
            onClick={applyDateFilter}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Apply Test Filter (Last 7 Days)
          </button>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            Clear All Filters
          </button>
        </div>

        <div className="ag-theme-quartz-dark h-[600px]">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            animateRows={true}
            suppressMenuHide={true}
            sideBar={{
              toolPanels: [
                {
                  id: "filters",
                  labelDefault: "Filters",
                  labelKey: "filters",
                  iconKey: "filter",
                  toolPanel: "agFiltersToolPanel",
                },
                {
                  id: "columns",
                  labelDefault: "Columns",
                  labelKey: "columns",
                  iconKey: "columns",
                  toolPanel: "agColumnsToolPanel",
                },
              ],
              defaultToolPanel: "filters",
              position: "right",
            }}
          />
        </div>

        <div className="mt-4 p-4 bg-gray-900 rounded">
          <h3 className="text-lg font-semibold mb-2">What to Check:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
            <li>
              Click "Apply Test Filter" - the floating filter should show the
              filter state
            </li>
            <li>Open the date column filter menu and change the filter</li>
            <li>The floating filter should update to show the new state</li>
            <li>
              Check the Filter Tool Panel - the date filter should work there
              too
            </li>
            <li>
              The floating filter text should match what getModelAsString()
              returns
            </li>
          </ol>
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
    <TestNoFloatingFilter />
  </React.StrictMode>,
);

export default TestNoFloatingFilter;
