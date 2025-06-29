import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import {
  createDateFilter,
  createQuickFilterDropdown,
  createActiveFilters,
  setupGridStatePersistence,
} from "@agrc/core";
import { reactDatePickerAdapter } from "@agrc/adapters/react-datepicker";
import { createLZStringAdapter } from "@agrc/adapters/compression";
import { generateTasks, Task } from "../data/sampleData";
import "@agrc/styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Create all components with full features
const DateFilter = createDateFilter({
  datePickerAdapter: reactDatePickerAdapter,
});
const QuickFilterDropdown = createQuickFilterDropdown();
const ActiveFilters = createActiveFilters();

const FullFeaturedExample: React.FC = () => {
  const [rowData] = useState<Task[]>(generateTasks(100));
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [filterModel, setFilterModel] = useState({});
  const [urlState, setUrlState] = useState("");

  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", width: 70, sort: "asc" },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      filter: "agTextColumnFilter",
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      filter: DateFilter,
      floatingFilter: true,
      filterParams: {
        buttons: ["reset", "apply"],
        closeOnApply: true,
        defaultMode: "relative",
      },
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "status",
      headerName: "Status",
      filter: "agSetColumnFilter",
      filterParams: {
        values: ["Todo", "In Progress", "In Review", "Done", "Blocked"],
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      filter: "agSetColumnFilter",
      filterParams: {
        values: ["Low", "Medium", "High", "Critical"],
      },
    },
    { field: "assignee", headerName: "Assignee", filter: "agSetColumnFilter" },
    {
      field: "progress",
      headerName: "Progress",
      valueFormatter: (params) => `${params.value}%`,
      filter: "agNumberColumnFilter",
    },
    {
      field: "budget",
      headerName: "Budget",
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
      filter: "agNumberColumnFilter",
    },
  ];

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);

    // Set up compressed URL state persistence
    const cleanup = setupGridStatePersistence(params.api, {
      compressionAdapter: createLZStringAdapter(),
      useCompression: true,
      maxUrlLength: 2000,
      onStateLoad: (state) => {
        console.log("Grid state loaded:", state);
      },
      onStateSave: (state) => {
        console.log("Grid state saved:", state);
        setUrlState(window.location.search);
      },
    });

    // Update URL state display
    setUrlState(window.location.search);

    return cleanup;
  }, []);

  const onFilterChanged = useCallback(() => {
    if (gridApi) {
      setFilterModel(gridApi.getFilterModel());
    }
  }, [gridApi]);

  const quickFilterOptions = [
    {
      id: "all",
      label: "All Tasks",
      icon: "📋",
      description: "Show all tasks",
      filterModel: null,
    },
    {
      id: "overdue",
      label: "Overdue",
      icon: "🚨",
      description: "Tasks past their due date",
      filterModel: {
        type: "before",
        mode: "absolute",
        dateTo: new Date(),
      },
    },
    {
      id: "thisWeek",
      label: "This Week",
      icon: "📅",
      description: "Due this week",
      filterModel: {
        type: "inRange",
        mode: "relative",
        expressionFrom: "StartOfWeek",
        expressionTo: "EndOfWeek",
      },
    },
    {
      id: "highPriority",
      label: "High Priority",
      icon: "🔥",
      description: "Critical and high priority tasks",
      onSelect: (api: GridApi) => {
        api.setFilterModel({
          priority: {
            type: "set",
            values: ["High", "Critical"],
          },
        });
      },
    },
  ];

  return (
    <div className="example-section">
      <h2>Full Featured with Compression & Styles</h2>
      <div className="bundle-size">Bundle Size: ~85KB</div>

      <p>
        This example includes all features: React DatePicker, URL state
        persistence with compression, active filters display, and styled
        components. The URL automatically syncs with grid state.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Current URL State:</strong>
        <code
          style={{
            display: "block",
            padding: "0.5rem",
            background: "#f5f5f5",
            borderRadius: "4px",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
            wordBreak: "break-all",
          }}
        >
          {urlState || "(no state)"}
        </code>
      </div>

      <div className="controls">
        <QuickFilterDropdown
          api={gridApi}
          columnId="dueDate"
          options={quickFilterOptions}
          placeholder="Quick filters..."
          showDescriptions={true}
        />
      </div>

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
          paginationPageSizeSelector={[10, 20, 50, 100]}
          enableRangeSelection={true}
          animateRows={true}
        />
      </div>

      <div className="code-block">
        <pre>{`// Installation
npm install @agrc/core @agrc/adapters @agrc/styles

// Usage
import { 
  createDateFilter, 
  createQuickFilterDropdown, 
  createActiveFilters,
  setupGridStatePersistence 
} from '@agrc/core';
import { reactDatePickerAdapter } from '@agrc/adapters/react-datepicker';
import { createLZStringAdapter } from '@agrc/adapters/compression';
import '@agrc/styles';

// Set up URL state persistence with compression
setupGridStatePersistence(gridApi, {
  compressionAdapter: createLZStringAdapter(),
  useCompression: true,
  maxUrlLength: 2000,
});`}</pre>
      </div>
    </div>
  );
};

export default FullFeaturedExample;
