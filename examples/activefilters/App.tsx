import React, { useState, useRef } from "react";
import { ActiveFilters, DateFilter } from "ag-grid-react-components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Example implementation for ActiveFilters
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
    {
      field: "date",
      headerName: "Date",
      filter: DateFilter,
      filterParams: {
        naturalLanguageEnabled: true,
      },
    },
    { field: "status", headerName: "Status", filter: true },
    { field: "priority", headerName: "Priority", filter: true },
  ]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px", flex: "0 0 auto" }}>
        <h1>ActiveFilters - Interactive Pills</h1>
        <p>Display active filters as removable pills</p>

        <div style={{ marginTop: "16px" }}>
          <ActiveFilters api={gridRef.current?.api} />
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
