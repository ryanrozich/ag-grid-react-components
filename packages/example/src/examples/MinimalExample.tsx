import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { createDateFilter, createQuickFilterDropdown } from "@agrc/core";
import { generateTasks, Task } from "../data/sampleData";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Create components with native HTML5 date inputs (no external dependencies)
const DateFilter = createDateFilter();
const QuickFilterDropdown = createQuickFilterDropdown();

const MinimalExample: React.FC = () => {
  const [rowData] = useState<Task[]>(generateTasks(50));
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 2 },
    {
      field: "dueDate",
      headerName: "Due Date",
      filter: DateFilter,
      floatingFilter: true,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    { field: "status", headerName: "Status" },
    { field: "priority", headerName: "Priority" },
    { field: "assignee", headerName: "Assignee" },
  ];

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  const quickFilterOptions = [
    {
      id: "all",
      label: "All Tasks",
      filterModel: null,
    },
    {
      id: "overdue",
      label: "Overdue",
      filterModel: {
        type: "before",
        mode: "absolute",
        dateTo: new Date(),
      },
    },
    {
      id: "thisWeek",
      label: "This Week",
      filterModel: {
        type: "inRange",
        mode: "relative",
        expressionFrom: "StartOfWeek",
        expressionTo: "EndOfWeek",
      },
    },
    {
      id: "nextMonth",
      label: "Next Month",
      filterModel: {
        type: "inRange",
        mode: "relative",
        expressionFrom: "StartOfMonth+1M",
        expressionTo: "EndOfMonth+1M",
      },
    },
  ];

  return (
    <div className="example-section">
      <h2>Minimal Setup - Native HTML5 Date Inputs</h2>
      <div className="bundle-size">Bundle Size: ~25KB</div>

      <p>
        This example uses the core components with native HTML5 date inputs. No
        external date picker libraries are loaded, resulting in the smallest
        possible bundle.
      </p>

      <div className="controls">
        <QuickFilterDropdown
          api={gridApi}
          columnId="dueDate"
          options={quickFilterOptions}
          placeholder="Quick filters..."
        />
      </div>

      <div className="grid-container ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50]}
        />
      </div>

      <div className="code-block">
        <pre>{`// Installation
npm install @agrc/core

// Usage
import { createDateFilter, createQuickFilterDropdown } from '@agrc/core';

// Create components with zero external dependencies
const DateFilter = createDateFilter();
const QuickFilterDropdown = createQuickFilterDropdown();

// Use in column definitions
const columnDefs = [
  {
    field: 'dueDate',
    filter: DateFilter,
    floatingFilter: true,
  }
];`}</pre>
      </div>
    </div>
  );
};

export default MinimalExample;
