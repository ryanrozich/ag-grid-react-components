import React, { useState } from "react";
import { QuickFilterDropdown, ActiveFilters } from "ag-grid-react-components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Example implementation for QuickFilterDropdown
function App() {
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
  ]);

  const [columnDefs] = useState([
    { field: "name", headerName: "Name" },
    {
      field: "date",
      headerName: "Date",
      filter: true,
    },
    { field: "status", headerName: "Status" },
    { field: "priority", headerName: "Priority" },
  ]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px", flex: "0 0 auto" }}>
        <h1>QuickFilterDropdown - Custom Presets</h1>
        <p>Quick filter dropdown with custom filter presets</p>
      </div>
      <div
        className="ag-theme-quartz-dark"
        style={{ flex: 1, padding: "0 20px 20px" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          floatingFilter={true}
        />
      </div>
    </div>
  );
}

export default App;
