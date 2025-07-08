import React, { useState, useCallback, useMemo } from "react";
import type { GridApi, FilterModel } from "ag-grid-community";
import styles from "./FilterPresetManager.module.css";

export interface FilterPreset {
  id: string;
  name: string;
  category?: string;
  filterModel: FilterModel;
  createdAt: Date;
  order?: number;
}

export interface FilterPresetManagerProps {
  api: GridApi;
  storageKey?: string;
  onPresetApplied?: (preset: FilterPreset) => void;
  className?: string;
}

export const FilterPresetManager: React.FC<FilterPresetManagerProps> = ({
  api,
  storageKey = "ag-grid-filter-presets",
  onPresetApplied,
  className = "",
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"save" | "manage">("save");
  const [presetName, setPresetName] = useState("");
  const [presets, setPresets] = useState<FilterPreset[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save presets to localStorage whenever they change
  const savePresetsToStorage = useCallback(
    (updatedPresets: FilterPreset[]) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(updatedPresets));
        setPresets(updatedPresets);
      } catch (error) {
        console.error("Failed to save presets:", error);
      }
    },
    [storageKey],
  );

  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    const filterModel = api.getFilterModel();
    return filterModel && Object.keys(filterModel).length > 0;
  }, [api]);

  // Save current filters as preset
  const handleSavePreset = useCallback(() => {
    if (!presetName.trim()) return;

    const newPreset: FilterPreset = {
      id: `preset-${Date.now()}`,
      name: presetName.trim(),
      filterModel: api.getFilterModel(),
      createdAt: new Date(),
    };

    savePresetsToStorage([...presets, newPreset]);
    setPresetName("");
    setShowModal(false);
  }, [api, presetName, presets, savePresetsToStorage]);

  // Apply a preset
  const handleApplyPreset = useCallback(
    (preset: FilterPreset) => {
      api.setFilterModel(preset.filterModel);
      onPresetApplied?.(preset);
      setShowModal(false);
    },
    [api, onPresetApplied],
  );

  // Delete a preset
  const handleDeletePreset = useCallback(
    (presetId: string) => {
      savePresetsToStorage(presets.filter((p) => p.id !== presetId));
    },
    [presets, savePresetsToStorage],
  );

  // Export presets to file
  const handleExportPresets = useCallback(() => {
    const dataStr = JSON.stringify(presets, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `filter-presets-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [presets]);

  // Import presets from file
  const handleImportPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (Array.isArray(imported)) {
            // Merge with existing presets, avoiding duplicates
            const merged = [...presets];
            imported.forEach((preset) => {
              if (!merged.find((p) => p.name === preset.name)) {
                merged.push({
                  ...preset,
                  id: `preset-${Date.now()}-${Math.random()}`,
                  createdAt: new Date(preset.createdAt),
                });
              }
            });
            savePresetsToStorage(merged);
          }
        } catch (error) {
          console.error("Failed to import presets:", error);
          alert("Failed to import presets. Please check the file format.");
        }
      };
      reader.readAsText(file);
    },
    [presets, savePresetsToStorage],
  );

  return (
    <>
      {/* Action buttons */}
      <div className={`${styles.actions} ${className}`}>
        {hasActiveFilters && (
          <button
            className={styles.saveButton}
            onClick={() => {
              setModalMode("save");
              setShowModal(true);
            }}
            aria-label="Save current filters"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save
          </button>
        )}

        {presets.length > 0 && (
          <button
            className={styles.manageButton}
            onClick={() => {
              setModalMode("manage");
              setShowModal(true);
            }}
            aria-label="Manage saved filters"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
            Saved Filters ({presets.length})
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>
                {modalMode === "save"
                  ? "Save Current Filters"
                  : "Manage Saved Filters"}
              </h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              {modalMode === "save" ? (
                <div className={styles.saveForm}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter preset name..."
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSavePreset()}
                    autoFocus
                  />
                  <button
                    className={styles.primaryButton}
                    onClick={handleSavePreset}
                    disabled={!presetName.trim()}
                  >
                    Save Preset
                  </button>
                </div>
              ) : (
                <div className={styles.manageContent}>
                  <div className={styles.presetList}>
                    {presets.length === 0 ? (
                      <p className={styles.emptyMessage}>
                        No saved filters yet
                      </p>
                    ) : (
                      presets.map((preset) => (
                        <div key={preset.id} className={styles.presetItem}>
                          <div className={styles.presetInfo}>
                            <span className={styles.presetName}>
                              {preset.name}
                            </span>
                            <span className={styles.presetDate}>
                              {new Date(preset.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className={styles.presetActions}>
                            <button
                              className={styles.applyButton}
                              onClick={() => handleApplyPreset(preset)}
                              title="Apply this preset"
                            >
                              Apply
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={() => handleDeletePreset(preset.id)}
                              title="Delete this preset"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className={styles.importExport}>
                    <button
                      className={styles.secondaryButton}
                      onClick={handleExportPresets}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      Export All
                    </button>
                    <label className={styles.secondaryButton}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      Import
                      <input
                        type="file"
                        accept=".json"
                        style={{ display: "none" }}
                        onChange={handleImportPresets}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
