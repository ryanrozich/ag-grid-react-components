import React, { useState, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, GridApi } from "ag-grid-community";
import { AGGridTestHarness } from "../test-utils/AGGridTestHarness";
import { TEST_RECORDS, TestRecord } from "../../tests/fixtures/testData";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./TestDemo.css";
import { TEST_GRID_ID } from "./constants";

// Re-export the TestRecord type for use in tests
export type { TestRecord } from "../../tests/fixtures/testData";

interface GridRefs {
  api: GridApi | null;
}

export const TestDemo: React.FC = () => {
  const [rowData] = useState<TestRecord[]>(TEST_RECORDS.MEDIUM);
  const [gridRefs, setGridRefs] = useState<GridRefs>({ api: null });
  const [filterModel, setFilterModel] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [isPaginationEnabled, setIsPaginationEnabled] = useState(false);

  // Column definitions
  const columnDefs = useMemo<ColDef<TestRecord>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 80,
        filter: "agNumberColumnFilter",
      },
      {
        field: "date",
        headerName: "Date",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
            const cellDate = new Date(cellValue);
            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
              return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
            return 0;
          },
        },
        valueFormatter: (params) => {
          return params.value
            ? new Date(params.value).toLocaleDateString()
            : "";
        },
      },
      {
        field: "description",
        headerName: "Description",
        filter: "agTextColumnFilter",
        flex: 1,
      },
      {
        field: "category",
        headerName: "Category",
        filter: "agSetColumnFilter",
        width: 150,
      },
      {
        field: "status",
        headerName: "Status",
        filter: "agSetColumnFilter",
        width: 130,
      },
      {
        field: "priority",
        headerName: "Priority",
        filter: "agSetColumnFilter",
        width: 120,
      },
      {
        field: "completed",
        headerName: "Completed",
        filter: "agSetColumnFilter",
        width: 120,
        valueFormatter: (params) => (params.value ? "Yes" : "No"),
      },
    ],
    [],
  );

  // Handle grid ready event
  const onGridReady = useCallback((params: GridReadyEvent<TestRecord>) => {
    setGridRefs({ api: params.api });
    params.api.sizeColumnsToFit();
    // Grid ready
  }, []);

  // Handle filter changes
  const onFilterChanged = useCallback(() => {
    if (gridRefs.api) {
      setFilterModel(gridRefs.api.getFilterModel());
    }
  }, [gridRefs.api]);

  // Toggle pagination
  const togglePagination = useCallback(() => {
    if (gridRefs.api) {
      const newPaginationState = !isPaginationEnabled;
      // Just toggle the pagination state, the grid will handle the rest
      setIsPaginationEnabled(newPaginationState);
    }
  }, [gridRefs.api, isPaginationEnabled]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    if (gridRefs.api) {
      gridRefs.api.setFilterModel(null);
      setFilterModel(null);
    }
  }, [gridRefs.api]);

  // Get the current row count
  const rowCount = useMemo(() => {
    return gridRefs.api ? gridRefs.api.getDisplayedRowCount() : 0;
  }, [gridRefs.api]);

  return (
    <div className="test-demo-container">
      <h1>AG Grid Date Filter Test</h1>

      <div className="controls">
        <div className="filter-info">
          <h3>Current Filter:</h3>
          <pre className="filter-model">
            {filterModel
              ? JSON.stringify(filterModel, null, 2)
              : "No filter applied"}
          </pre>
          <button onClick={clearFilters} className="clear-button">
            Clear All Filters
          </button>
        </div>

        <div className="test-info">
          <h3>Test Data:</h3>
          <p>Total Rows: {rowData.length}</p>
          <p>
            Filtered Rows:{" "}
            {gridRefs.api ? gridRefs.api.getDisplayedRowCount() : "N/A"}
          </p>
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <button
            onClick={togglePagination}
            className={`toggle-button ${isPaginationEnabled ? "active" : ""}`}
          >
            {isPaginationEnabled ? "Disable" : "Enable"} Pagination
          </button>
          <button
            onClick={clearFilters}
            className="clear-button"
            disabled={!filterModel}
          >
            Clear All Filters
          </button>
        </div>
        <div className="filter-info">
          <h3>Current Filter:</h3>
          <pre className="filter-model">
            {filterModel
              ? JSON.stringify(filterModel, null, 2)
              : "No filter applied"}
          </pre>
        </div>
        <div className="test-info">
          <h3>Test Data:</h3>
          <p>Total Rows: {rowData.length}</p>
          <p>Filtered Rows: {rowCount}</p>
        </div>
      </div>

      <div
        className="ag-theme-quartz"
        style={{ height: "600px", width: "100%" }}
      >
        <AGGridTestHarness gridId={TEST_GRID_ID}>
          <AgGridReact<TestRecord>
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            onFilterChanged={onFilterChanged}
            pagination={isPaginationEnabled}
            paginationPageSize={20}
            rowSelection="multiple"
            animateRows={true}
            enableCellTextSelection={true}
            defaultColDef={{
              filter: true,
              sortable: true,
              resizable: true,
              floatingFilter: true,
              menuTabs: ["filterMenuTab", "generalMenuTab", "columnsMenuTab"],
            }}
            suppressMenuHide={true}
          />
        </AGGridTestHarness>
      </div>
    </div>
  );
};

export default TestDemo;
