/**
 * Demo showcasing the Preset System with system and user presets
 */
import React, { useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { QuickFilterDropdown } from "../components/QuickFilterDropdown";
import { PresetManager } from "../utils/presetSystem";
import { resolveTemplateInGridState } from "../utils/presetSystem";
import { DEFAULT_SYSTEM_PRESETS } from "../utils/presetSystem";
import type { QuickFilterOption } from "../components/QuickFilterDropdown/types";
import type { FilterPreset } from "../utils/presetSystem/types";

// Create demo data
const createDemoData = () => {
  const statuses = [
    "active",
    "pending",
    "completed",
    "pending_review",
    "archived",
  ];
  const priorities = ["low", "medium", "high", "critical"];
  const assignees = ["john.doe", "jane.smith", "bob.johnson", "alice.williams"];

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    assignee: assignees[Math.floor(Math.random() * assignees.length)],
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date in last 90 days
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in last 30 days
    dueDate: new Date(
      Date.now() + (Math.random() - 0.5) * 60 * 24 * 60 * 60 * 1000,
    ), // Random date +/- 30 days
  }));
};

export const PresetSystemDemo: React.FC = () => {
  const gridApiRef = useRef<GridApi | null>(null);
  const [rowData] = useState(createDemoData());
  const [presetManager] = useState(() => new PresetManager());
  const [userPresets, setUserPresets] = useState<FilterPreset[]>([]);
  const [activePresetId, setActivePresetId] = useState<string | undefined>();

  // Column definitions
  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 120 },
    { field: "assignee", headerName: "Assignee", width: 150 },
    {
      field: "createdAt",
      headerName: "Created",
      valueFormatter: (params) => params.value?.toLocaleDateString(),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      valueFormatter: (params) => params.value?.toLocaleDateString(),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      valueFormatter: (params) => params.value?.toLocaleDateString(),
    },
  ];

  // Initialize preset manager with system presets
  React.useEffect(() => {
    // Register system presets
    presetManager.registerSystemPresets(DEFAULT_SYSTEM_PRESETS);

    // Subscribe to preset changes
    const unsubscribePresets = presetManager.onPresetsChange((presets) => {
      setUserPresets(presets.user);
    });

    const unsubscribeDefault = presetManager.onDefaultChange((preset) => {
      setActivePresetId(preset?.id);
    });

    // Load initial state
    const allPresets = presetManager.getAllPresets();
    setUserPresets(allPresets.user);
    setActivePresetId(allPresets.activeId);

    return () => {
      unsubscribePresets();
      unsubscribeDefault();
    };
  }, [presetManager]);

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      gridApiRef.current = params.api;

      // Apply default preset if set
      const defaultPreset = presetManager.getDefaultPreset();
      if (defaultPreset && gridApiRef.current) {
        const resolvedState = resolveTemplateInGridState(
          defaultPreset.gridState,
          {
            currentUser: "john.doe", // Simulate current user
          },
        );
        if (resolvedState.filters) {
          gridApiRef.current.setFilterModel(resolvedState.filters);
        }
      }
    },
    [presetManager],
  );

  // Convert presets to QuickFilterOptions
  const convertPresetsToOptions = useCallback((): QuickFilterOption[] => {
    const allPresets = presetManager.getAllPresets();

    // Add "All Items" option
    const options: QuickFilterOption[] = [
      {
        id: "all",
        label: "All Items",
        description: "Clear all filters",
        filterModel: null,
      },
    ];

    // Add user presets
    const userOptions = allPresets.user.map(
      (preset): QuickFilterOption => ({
        id: preset.id,
        label: preset.name,
        description: preset.description,
        filterModel: preset.gridState.filters || null,
        tags: (preset as any).tags,
      }),
    );

    return [...options, ...userOptions];
  }, [presetManager]);

  // Convert system presets to QuickFilterOptions
  const systemPresetOptions = useCallback((): QuickFilterOption[] => {
    const allPresets = presetManager.getAllPresets();
    return allPresets.system.map(
      (preset): QuickFilterOption => ({
        id: preset.id,
        label: preset.name,
        description: preset.description,
        filterModel: preset.gridState.filters || null,
        isSystemPreset: true,
      }),
    );
  }, [presetManager]);

  // Handle preset selection
  const handlePresetChange = useCallback(
    (option: QuickFilterOption | null) => {
      if (!gridApiRef.current) return;

      if (option) {
        // Apply the preset
        if (option.filterModel) {
          const resolvedFilters = resolveTemplateInGridState(
            { filters: option.filterModel },
            { currentUser: "john.doe" },
          ).filters;
          gridApiRef.current.setFilterModel(resolvedFilters || {});
        } else {
          gridApiRef.current.setFilterModel({});
        }

        // Set as active preset
        presetManager.setDefaultPreset(option.id);
      } else {
        // Clear filters
        gridApiRef.current.setFilterModel({});
        presetManager.clearDefault();
      }
    },
    [presetManager],
  );

  // Save current filters as a new preset
  const saveCurrentAsPreset = useCallback(() => {
    if (!gridApiRef.current) return;

    const name = prompt("Enter preset name:");
    if (!name) return;

    const currentFilters = gridApiRef.current.getFilterModel();
    const preset = presetManager.saveUserPreset({
      name,
      description: `Saved on ${new Date().toLocaleDateString()}`,
      gridState: { filters: currentFilters },
      tags: ["custom"],
    });

    // Set as default
    presetManager.setDefaultPreset(preset.id);
  }, [presetManager]);

  // Delete a user preset
  const deletePreset = useCallback(
    (presetId: string) => {
      if (confirm("Delete this preset?")) {
        presetManager.deleteUserPreset(presetId);
      }
    },
    [presetManager],
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Preset System Demo</h2>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <QuickFilterDropdown
          api={gridApiRef.current!}
          columnId="_all" // Special ID for grid-wide presets
          options={convertPresetsToOptions()}
          systemPresets={systemPresetOptions()}
          placeholder="Select preset..."
          onFilterChange={handlePresetChange}
          showDescriptions={true}
          enablePresetManagement={true}
          onPresetSave={(preset) => console.log("Save preset:", preset)}
          onPresetDelete={deletePreset}
        />

        <button
          onClick={saveCurrentAsPreset}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Current Filters
        </button>

        <div style={{ marginLeft: "auto", fontSize: "14px", color: "#6b7280" }}>
          Active:{" "}
          {activePresetId ? presetManager.getDefaultPreset()?.name : "None"}
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          onGridReady={onGridReady}
        />
      </div>

      {userPresets.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>User Presets</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {userPresets.map((preset) => (
              <li
                key={preset.id}
                style={{
                  padding: "8px",
                  marginBottom: "4px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{preset.name}</strong>
                  {preset.description && (
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      {preset.description}
                    </span>
                  )}
                  {preset.id === activePresetId && (
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#3b82f6",
                        fontSize: "12px",
                      }}
                    >
                      (Default)
                    </span>
                  )}
                </div>
                <button
                  onClick={() => deletePreset(preset.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
