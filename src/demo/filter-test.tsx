import React, { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridReadyEvent, GridApi } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DateFilter from "../components/DateFilter";
import { DATE_FILTER_PRESETS } from "../components/QuickFilterDropdown";

// Simple test data
const testData = [
  { id: 1, name: "Today Item", date: new Date() },
  {
    id: 2,
    name: "Yesterday Item",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    name: "Last Week Item",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 4,
    name: "Future Item",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
];

export const FilterTest: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [api, setApi] = useState<GridApi | null>(null);
  const [filterLog, setFilterLog] = useState<string[]>([]);

  const log = (message: string, data?: unknown) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}${data ? "\n" + JSON.stringify(data, null, 2) : ""}`;
    console.log(logEntry);
    setFilterLog((prev) => [...prev, logEntry]);
  };

  const onGridReady = (params: GridReadyEvent) => {
    setApi(params.api);
    log("Grid ready");
  };

  const applyPreset = (presetId: string) => {
    if (!api) return;

    const preset = DATE_FILTER_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const filterModel = preset.filterModel ? { date: preset.filterModel } : {};
    log(`Applying ${preset.label} filter:`, filterModel);
    api.setFilterModel(filterModel);

    // Check what was actually set
    setTimeout(() => {
      const currentModel = api.getFilterModel();
      log("Filter model after setting:", currentModel);
    }, 100);
  };

  const columnDefs = [
    { field: "id", width: 80 },
    { field: "name", flex: 1 },
    {
      field: "date",
      filter: "agDateColumnFilter",
      valueFormatter: (params) => {
        if (!params.value) return "";
        return params.value.toLocaleDateString();
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Date Filter Test</h1>

      <div style={{ marginBottom: "20px" }}>
        <h3>Test Filter Presets:</h3>
        {DATE_FILTER_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => applyPreset(preset.id)}
            style={{
              margin: "5px",
              padding: "8px 15px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {preset.icon} {preset.label}
          </button>
        ))}
      </div>

      <div
        style={{ height: "300px", marginBottom: "20px" }}
        className="ag-theme-quartz"
      >
        <AgGridReact
          ref={gridRef}
          rowData={testData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          components={{
            agDateColumnFilter: DateFilter,
          }}
        />
      </div>

      <div
        style={{ background: "#f0f0f0", padding: "15px", borderRadius: "5px" }}
      >
        <h3>Filter Log:</h3>
        <pre style={{ fontSize: "12px", maxHeight: "300px", overflow: "auto" }}>
          {filterLog.join("\n")}
        </pre>
      </div>
    </div>
  );
};

// Export as default for easy testing
export default FilterTest;
