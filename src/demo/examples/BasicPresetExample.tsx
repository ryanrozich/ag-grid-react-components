import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import ActiveFilters from "../../components/ActiveFilters/ActiveFilters";
import { generateRowData } from "../data/generator";
import "../styles/demo.css";
import styles from "./Examples.module.css";

interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  gridState: {
    filters: Record<string, any>;
  };
  isDefault?: boolean;
  createdAt?: Date;
}

const BasicPresetExample: React.FC = () => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [rowData] = useState(() => generateRowData(100));
  const [currentPresetId, setCurrentPresetId] = useState<string | null>(null);

  // System-defined presets
  const systemPresets: FilterPreset[] = useMemo(
    () => [
      {
        id: "recent-orders",
        name: "Recent Orders",
        description: "Orders from the last 7 days",
        gridState: {
          filters: {
            date: {
              type: "after",
              mode: "relative",
              expressionFrom: "Today-7d",
              filterType: "date",
            },
          },
        },
      },
      {
        id: "high-value",
        name: "High Value Orders",
        description: "Orders over $10,000",
        gridState: {
          filters: {
            amount: {
              filterType: "number",
              type: "greaterThan",
              filter: 10000,
            },
          },
        },
      },
      {
        id: "pending-review",
        name: "Pending Review",
        description: "Orders requiring approval",
        gridState: {
          filters: {
            status: {
              filterType: "text",
              type: "equals",
              filter: "Pending",
            },
            amount: {
              filterType: "number",
              type: "greaterThan",
              filter: 5000,
            },
          },
        },
      },
      {
        id: "q4-2023",
        name: "Q4 2023",
        description: "Fourth quarter 2023 data",
        gridState: {
          filters: {
            date: {
              type: "inRange",
              mode: "absolute",
              dateFrom: new Date("2023-10-01"),
              dateTo: new Date("2023-12-31"),
              filterType: "date",
            },
          },
        },
      },
    ],
    [],
  );

  // User presets (would be loaded from localStorage in real app)
  const [userPresets, setUserPresets] = useState<FilterPreset[]>([
    {
      id: "my-filter-1",
      name: "My Custom Filter",
      description: "Completed orders from top customers",
      gridState: {
        filters: {
          status: {
            filterType: "text",
            type: "equals",
            filter: "Completed",
          },
          category: {
            filterType: "text",
            type: "equals",
            filter: "Enterprise",
          },
        },
      },
      createdAt: new Date("2024-01-15"),
    },
  ]);

  const columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "Order ID",
      width: 100,
      filter: "agTextColumnFilter",
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      filter: "agTextColumnFilter",
    },
    {
      field: "date",
      headerName: "Order Date",
      width: 150,
      filter: "agDateColumnFilter",
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => {
        return params.value ? `$${params.value.toLocaleString()}` : "";
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      filter: "agTextColumnFilter",
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
      filter: "agTextColumnFilter",
    },
  ];

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const handlePresetSelect = (preset: FilterPreset) => {
    if (!gridApi) return;

    // Apply the preset's filter state
    gridApi.setFilterModel(preset.gridState.filters);
    setCurrentPresetId(preset.id);
  };

  const handleSavePreset = () => {
    if (!gridApi) return;

    const currentFilters = gridApi.getFilterModel();
    const presetName = prompt("Enter preset name:");

    if (presetName) {
      const newPreset: FilterPreset = {
        id: `user-${Date.now()}`,
        name: presetName,
        gridState: {
          filters: currentFilters,
        },
        createdAt: new Date(),
      };

      setUserPresets([...userPresets, newPreset]);
      setCurrentPresetId(newPreset.id);
    }
  };

  const handleDeletePreset = (presetId: string) => {
    setUserPresets(userPresets.filter((p) => p.id !== presetId));
    if (currentPresetId === presetId) {
      setCurrentPresetId(null);
    }
  };

  const handleClearFilters = () => {
    if (gridApi) {
      gridApi.setFilterModel(null);
      setCurrentPresetId(null);
    }
  };

  const allPresets = [...systemPresets, ...userPresets];
  const currentPreset = allPresets.find((p) => p.id === currentPresetId);

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.controlsSection}>
        <div className={styles.presetControls}>
          <div className={styles.presetSelector}>
            <label>Select Preset:</label>
            <select
              value={currentPresetId || ""}
              onChange={(e) => {
                const preset = allPresets.find((p) => p.id === e.target.value);
                if (preset) handlePresetSelect(preset);
              }}
            >
              <option value="">-- Select a preset --</option>
              <optgroup label="System Presets">
                {systemPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="My Presets">
                {userPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className={styles.presetActions}>
            <button onClick={handleSavePreset} className={styles.saveButton}>
              💾 Save Current Filters
            </button>
            <button onClick={handleClearFilters} className={styles.clearButton}>
              ✖️ Clear All
            </button>
          </div>
        </div>

        {currentPreset && (
          <div className={styles.presetInfo}>
            <h4>{currentPreset.name}</h4>
            {currentPreset.description && <p>{currentPreset.description}</p>}
            {currentPreset.createdAt && (
              <span className={styles.presetDate}>
                Created:{" "}
                {new Date(currentPreset.createdAt).toLocaleDateString()}
              </span>
            )}
            {userPresets.includes(currentPreset) && (
              <button
                onClick={() => handleDeletePreset(currentPreset.id)}
                className={styles.deleteButton}
              >
                🗑️ Delete
              </button>
            )}
          </div>
        )}

        <div className={styles.activeFiltersContainer}>
          <ActiveFilters
            api={gridApi}
            filterColumns={columnDefs}
            dateFilterMode="both"
          />
        </div>
      </div>

      <div className={styles.gridSection}>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            animateRows={true}
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
          />
        </div>
      </div>

      <div className={styles.codeExample}>
        <h4>Implementation Example</h4>
        <pre>{`// Basic preset configuration
const systemPresets = [
  {
    id: 'recent-orders',
    name: 'Recent Orders',
    gridState: {
      filters: {
        date: {
          type: 'after',
          mode: 'relative',
          expressionFrom: 'Today-7d'
        }
      }
    }
  }
];

// Apply preset
const handlePresetSelect = (preset) => {
  gridApi.setFilterModel(preset.gridState.filters);
};

// Save current filters as preset
const handleSavePreset = () => {
  const filters = gridApi.getFilterModel();
  const newPreset = {
    id: generateId(),
    name: userProvidedName,
    gridState: { filters }
  };
  saveToStorage(newPreset);
};`}</pre>
      </div>

      <div className={styles.features}>
        <h4>Features Demonstrated</h4>
        <ul>
          <li>✅ System-defined presets for common filter scenarios</li>
          <li>✅ User-created presets saved to browser storage</li>
          <li>✅ Preset selection dropdown with grouping</li>
          <li>✅ Save current filter state as new preset</li>
          <li>✅ Delete user presets</li>
          <li>✅ Clear all filters</li>
          <li>✅ Visual feedback for active preset</li>
          <li>✅ Integration with ActiveFilters component</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicPresetExample;
