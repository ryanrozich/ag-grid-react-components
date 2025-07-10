import React, { useState, useRef } from "react";
import { DateFilter } from "ag-grid-react-components";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Example implementation for DateFilter
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
    { field: "name", headerName: "Name" },
    {
      field: "date",
      headerName: "Date",
      filter: DateFilter,
      filterParams: {
        naturalLanguageEnabled: true,
        dateFormat: "yyyy-MM-dd",
      },
      floatingFilter: true,
    },
    { field: "status", headerName: "Status" },
    { field: "priority", headerName: "Priority" },
  ]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px", flex: "0 0 auto" }}>
        <h1>DateFilter - Natural Language Example</h1>
        <p>AG Grid with natural language date filtering</p>
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
