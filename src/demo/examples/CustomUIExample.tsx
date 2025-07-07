import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import ActiveFilters from "../../components/ActiveFilters/ActiveFilters";
import { generateData } from "../data/generator";
import styles from "./Examples.module.css";
import "./CustomUI.css";

interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  gridState: {
    filters: Record<string, any>;
  };
  tags?: string[];
  favorite?: boolean;
}

interface CustomPresetSelectorProps {
  presets: FilterPreset[];
  onSelect: (preset: FilterPreset) => void;
  currentPresetId?: string;
}

interface CustomSaveDialogProps {
  onSave: (preset: Partial<FilterPreset>) => void;
  onCancel: () => void;
  defaultName?: string;
}

interface CustomPresetManagerProps {
  presets: FilterPreset[];
  onDelete: (presetId: string) => void;
  onSetDefault: (presetId: string) => void;
  onExport: () => void;
  onToggleFavorite: (presetId: string) => void;
}

// Custom Preset Selector Component
const CustomPresetSelector: React.FC<CustomPresetSelectorProps> = ({
  presets,
  onSelect,
  currentPresetId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredPresets = presets.filter(
    (preset) =>
      preset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      preset.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const currentPreset = presets.find((p) => p.id === currentPresetId);

  return (
    <div className="custom-preset-selector">
      <button
        className="preset-trigger"
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          borderColor: currentPreset?.color || "#007bff",
          backgroundColor: currentPreset
            ? `${currentPreset.color}20`
            : "transparent",
        }}
      >
        <span className="preset-icon">{currentPreset?.icon || "🔍"}</span>
        <span>{currentPreset?.name || "Select Preset"}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {showDropdown && (
        <div className="preset-dropdown">
          <div className="preset-search">
            <input
              type="text"
              placeholder="Search presets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div className="preset-list">
            {filteredPresets.map((preset) => (
              <div
                key={preset.id}
                className={`preset-item ${preset.id === currentPresetId ? "active" : ""}`}
                onClick={() => {
                  onSelect(preset);
                  setShowDropdown(false);
                }}
              >
                <span className="preset-icon" style={{ color: preset.color }}>
                  {preset.icon}
                </span>
                <div className="preset-details">
                  <div className="preset-name">{preset.name}</div>
                  {preset.description && (
                    <div className="preset-description">
                      {preset.description}
                    </div>
                  )}
                  {preset.tags && (
                    <div className="preset-tags">
                      {preset.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {preset.favorite && <span className="favorite-star">⭐</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Save Dialog Component
const CustomSaveDialog: React.FC<CustomSaveDialogProps> = ({
  onSave,
  onCancel,
  defaultName = "",
}) => {
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🔍");
  const [color, setColor] = useState("#007bff");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const icons = ["🔍", "📊", "📈", "💰", "🎯", "⚡", "🌟", "🔥", "💡", "🚀"];
  const colors = [
    "#007bff",
    "#28a745",
    "#dc3545",
    "#ffc107",
    "#17a2b8",
    "#6f42c1",
    "#e83e8c",
    "#fd7e14",
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSave = () => {
    onSave({
      name,
      description,
      icon,
      color,
      tags,
    });
  };

  return (
    <div className="custom-save-dialog-overlay">
      <div className="custom-save-dialog">
        <h3>Save Filter Preset</h3>

        <div className="form-group">
          <label>Preset Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter preset name..."
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this preset filters..."
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Icon</label>
            <div className="icon-picker">
              {icons.map((i) => (
                <button
                  key={i}
                  className={`icon-option ${icon === i ? "selected" : ""}`}
                  onClick={() => setIcon(i)}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-picker">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`color-option ${color === c ? "selected" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tag-input-container">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Add tags..."
            />
            <button onClick={handleAddTag}>Add</button>
          </div>
          <div className="tag-list">
            {tags.map((tag) => (
              <span key={tag} className="tag removable">
                {tag}
                <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="dialog-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Save Preset
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Preset Manager Component
const CustomPresetManager: React.FC<CustomPresetManagerProps> = ({
  presets,
  onDelete,
  onSetDefault,
  onExport,
  onToggleFavorite,
}) => {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "date" | "favorite">("name");

  const sortedPresets = [...presets].sort((a, b) => {
    if (sortBy === "favorite") {
      return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedPresets.length} presets?`)) {
      selectedPresets.forEach((id) => onDelete(id));
      setSelectedPresets([]);
    }
  };

  return (
    <div className="custom-preset-manager">
      <div className="manager-header">
        <h3>Manage Presets</h3>
        <div className="manager-actions">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="name">Sort by Name</option>
            <option value="favorite">Sort by Favorite</option>
          </select>
          <button onClick={onExport}>Export All</button>
          {selectedPresets.length > 0 && (
            <button onClick={handleBulkDelete} className="btn-danger">
              Delete Selected ({selectedPresets.length})
            </button>
          )}
        </div>
      </div>

      <div className="preset-grid">
        {sortedPresets.map((preset) => (
          <div
            key={preset.id}
            className={`preset-card ${selectedPresets.includes(preset.id) ? "selected" : ""}`}
          >
            <div className="card-header">
              <input
                type="checkbox"
                checked={selectedPresets.includes(preset.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPresets([...selectedPresets, preset.id]);
                  } else {
                    setSelectedPresets(
                      selectedPresets.filter((id) => id !== preset.id),
                    );
                  }
                }}
              />
              <span className="preset-icon" style={{ color: preset.color }}>
                {preset.icon}
              </span>
              <h4>{preset.name}</h4>
              <button
                className="favorite-btn"
                onClick={() => onToggleFavorite(preset.id)}
              >
                {preset.favorite ? "⭐" : "☆"}
              </button>
            </div>

            {preset.description && (
              <p className="card-description">{preset.description}</p>
            )}

            {preset.tags && preset.tags.length > 0 && (
              <div className="card-tags">
                {preset.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="card-actions">
              <button onClick={() => onSetDefault(preset.id)}>
                Set Default
              </button>
              <button
                onClick={() => onDelete(preset.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomUIExample: React.FC = () => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [rowData] = useState(() => generateData(50));
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [currentPresetId, setCurrentPresetId] = useState<string | null>(null);

  const [presets, setPresets] = useState<FilterPreset[]>([
    {
      id: "sales-q4",
      name: "Q4 Sales Analysis",
      description: "High-value sales in Q4",
      icon: "📊",
      color: "#28a745",
      tags: ["sales", "quarterly", "analysis"],
      favorite: true,
      gridState: {
        filters: {
          amount: { filterType: "number", type: "greaterThan", filter: 5000 },
          status: { filterType: "text", type: "equals", filter: "Completed" },
        },
      },
    },
    {
      id: "pending-tasks",
      name: "Pending Tasks",
      description: "All pending items requiring attention",
      icon: "⚡",
      color: "#ffc107",
      tags: ["tasks", "pending", "urgent"],
      gridState: {
        filters: {
          status: { filterType: "text", type: "equals", filter: "Pending" },
        },
      },
    },
    {
      id: "vip-customers",
      name: "VIP Customers",
      description: "Enterprise and high-value customers",
      icon: "🌟",
      color: "#6f42c1",
      tags: ["customers", "vip", "enterprise"],
      favorite: true,
      gridState: {
        filters: {
          category: {
            filterType: "text",
            type: "equals",
            filter: "Enterprise",
          },
        },
      },
    },
  ]);

  const columnDefs: ColDef[] = [
    { field: "id", headerName: "ID", width: 80, filter: "agTextColumnFilter" },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      filter: "agTextColumnFilter",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.value ? `$${params.value.toLocaleString()}` : "",
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

  const onGridReady = (params: any) => setGridApi(params.api);

  const handlePresetSelect = useCallback(
    (preset: FilterPreset) => {
      if (!gridApi) return;
      gridApi.setFilterModel(preset.gridState.filters);
      setCurrentPresetId(preset.id);
    },
    [gridApi],
  );

  const handleSavePreset = useCallback(
    (presetData: Partial<FilterPreset>) => {
      if (!gridApi) return;

      const newPreset: FilterPreset = {
        id: `custom-${Date.now()}`,
        name: presetData.name || "Untitled",
        description: presetData.description,
        icon: presetData.icon || "🔍",
        color: presetData.color || "#007bff",
        tags: presetData.tags || [],
        gridState: {
          filters: gridApi.getFilterModel(),
        },
      };

      setPresets([...presets, newPreset]);
      setCurrentPresetId(newPreset.id);
      setShowSaveDialog(false);
    },
    [gridApi, presets],
  );

  const handleDeletePreset = useCallback(
    (presetId: string) => {
      setPresets(presets.filter((p) => p.id !== presetId));
      if (currentPresetId === presetId) {
        setCurrentPresetId(null);
      }
    },
    [presets, currentPresetId],
  );

  const handleSetDefault = useCallback((presetId: string) => {
    console.log("Setting default preset:", presetId);
    // In real app, save to localStorage or backend
  }, []);

  const handleExport = useCallback(() => {
    const data = JSON.stringify(presets, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-presets.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [presets]);

  const handleToggleFavorite = useCallback(
    (presetId: string) => {
      setPresets(
        presets.map((p) =>
          p.id === presetId ? { ...p, favorite: !p.favorite } : p,
        ),
      );
    },
    [presets],
  );

  return (
    <div className={styles.exampleContainer}>
      <div className={styles.controlsSection}>
        <div className="custom-ui-controls">
          <CustomPresetSelector
            presets={presets}
            onSelect={handlePresetSelect}
            currentPresetId={currentPresetId}
          />

          <button
            className="custom-action-btn"
            onClick={() => setShowSaveDialog(true)}
          >
            💾 Save Current Filter
          </button>

          <button
            className="custom-action-btn"
            onClick={() => setShowManager(true)}
          >
            ⚙️ Manage Presets
          </button>
        </div>

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

      {showSaveDialog && (
        <CustomSaveDialog
          onSave={handleSavePreset}
          onCancel={() => setShowSaveDialog(false)}
          defaultName="My Custom Filter"
        />
      )}

      {showManager && (
        <div className="manager-overlay">
          <div className="manager-container">
            <button
              className="close-manager"
              onClick={() => setShowManager(false)}
            >
              ×
            </button>
            <CustomPresetManager
              presets={presets}
              onDelete={handleDeletePreset}
              onSetDefault={handleSetDefault}
              onExport={handleExport}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      )}

      <div className={styles.codeExample}>
        <h4>Custom UI Implementation</h4>
        <pre>{`// Custom preset selector
<QuickFilterDropdown
  enablePresets={{
    renderPresetSelector: ({ presets, onSelect, currentPresetId }) => (
      <CustomPresetSelector
        presets={presets}
        onSelect={onSelect}
        currentPresetId={currentPresetId}
      />
    ),
    renderSaveDialog: ({ onSave, onCancel }) => (
      <CustomSaveDialog
        onSave={onSave}
        onCancel={onCancel}
      />
    ),
    renderManager: ({ presets, onDelete, onSetDefault }) => (
      <CustomPresetManager
        presets={presets}
        onDelete={onDelete}
        onSetDefault={onSetDefault}
      />
    )
  }}
/>`}</pre>
      </div>

      <div className={styles.features}>
        <h4>Custom UI Features</h4>
        <ul>
          <li>✅ Rich preset selector with search and tags</li>
          <li>✅ Custom save dialog with icon and color picker</li>
          <li>✅ Advanced preset manager with bulk operations</li>
          <li>✅ Favorite presets functionality</li>
          <li>✅ Tag-based organization</li>
          <li>✅ Visual preset cards with custom styling</li>
          <li>✅ Animated interactions and transitions</li>
          <li>✅ Mobile-responsive custom components</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomUIExample;
