import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { createDateFilter, createActiveFilters } from "@agrc/core";
import { reactDatePickerAdapter } from "@agrc/adapters/react-datepicker";
import { generateTasks, Task } from "../data/sampleData";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Create components with React DatePicker (lazy loaded)
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
const ActiveFilters = createActiveFilters();

const WithDatePickerExample: React.FC = () => {
  const [rowData] = useState<Task[]>(generateTasks(50));
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [filterModel, setFilterModel] = useState({});

  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 2 },
    {
      field: "dueDate",
      headerName: "Due Date",
      filter: DateFilter,
      floatingFilter: true,
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
        // Enable inclusive filtering
        afterInclusive: true,
        beforeInclusive: true,
        rangeInclusive: { from: true, to: true },
      },
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    { field: "status", headerName: "Status", filter: true },
    { field: "priority", headerName: "Priority", filter: true },
    { field: "assignee", headerName: "Assignee", filter: true },
    {
      field: "progress",
      headerName: "Progress",
      valueFormatter: (params) => `${params.value}%`,
    },
  ];

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  const onFilterChanged = useCallback(() => {
    if (gridApi) {
      setFilterModel(gridApi.getFilterModel());
    }
  }, [gridApi]);

  return (
    <div className="example-section">
      <h2>With React DatePicker</h2>
      <div className="bundle-size">Bundle Size: ~65KB</div>

      <p>
        This example includes React DatePicker for a richer date selection
        experience. The date picker is lazy loaded, so it only adds to the
        bundle when actually used.
      </p>

      <div className="active-filters">
        {gridApi && <ActiveFilters api={gridApi} filterModel={filterModel} />}
      </div>

      <div className="grid-container ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50]}
        />
      </div>

      <div className="code-block">
        <pre>{`// Installation
npm install @agrc/core @agrc/adapters

// Usage
import { createDateFilter, createActiveFilters } from '@agrc/core';
import { reactDatePickerAdapter } from '@agrc/adapters/react-datepicker';

// Create components with React DatePicker
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
const ActiveFilters = createActiveFilters();

// Configure inclusive filtering
filterParams: {
  afterInclusive: true,      // >= instead of >
  beforeInclusive: true,     // <= instead of <
  rangeInclusive: {
    from: true,  // Include start date
    to: true,    // Include end date
  },
}`}</pre>
      </div>
    </div>
  );
};

export default WithDatePickerExample;
