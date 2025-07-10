import React, { useState, useRef } from "react";
import { QuickFilterDropdown } from "ag-grid-react-components";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Example implementation for QuickFilterDropdown
function App() {
  const gridRef = useRef(null);
  const [rowData] = useState([
    {
      id: 1,
      name: "Task 1",
      date: "2024-01-15",
      status: "Open",
      priority: "High",
    },
    {
      id: 2,
      name: "Task 2",
      date: "2024-01-20",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Task 3",
      date: "2024-01-25",
      status: "Done",
      priority: "Low",
    },
    {
      id: 4,
      name: "Task 4",
      date: "2024-01-30",
      status: "Open",
      priority: "High",
    },
    {
      id: 5,
      name: "Task 5",
      date: "2024-02-05",
      status: "In Progress",
      priority: "Low",
    },
  ]);

  const [columnDefs] = useState([
    { field: "name", headerName: "Name", filter: true },
    { field: "date", headerName: "Date", filter: "agDateColumnFilter" },
    { field: "status", headerName: "Status", filter: true },
    { field: "priority", headerName: "Priority", filter: true },
  ]);

  const filterPresets = [
    {
      id: "high-priority",
      name: "High Priority",
      filter: { priority: { values: ["High"] } },
    },
    {
      id: "recent",
      name: "Recent Tasks",
      filter: { date: { dateFrom: "2024-01-20" } },
    },
    {
      id: "in-progress",
      name: "In Progress",
      filter: { status: { values: ["In Progress"] } },
    },
  ];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px", flex: "0 0 auto" }}>
        <h1>QuickFilterDropdown - Custom Presets</h1>
        <p>Quick filter dropdown with custom filter presets</p>

        <div style={{ marginTop: "16px" }}>
          <QuickFilterDropdown
            api={gridRef.current?.api}
            filterPresets={filterPresets}
          />
        </div>
      </div>
      <div
        className="ag-theme-quartz-dark"
        style={{ flex: 1, padding: "0 20px 20px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          floatingFilter={true}
          onGridReady={(params) => {
            gridRef.current = params;
          }}
        />
      </div>
    </div>
  );
}

export default App;
