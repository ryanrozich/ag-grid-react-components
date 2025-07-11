import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import type { GridApi } from "ag-grid-community";
import type { FilterPreset } from "../FilterPresetManagerV2/types";
import { SavedFiltersDropdown } from "../SavedFiltersDropdown";
import styles from "./FilterPresetActions.module.css";

export interface FilterPresetActionsProps {
  api: GridApi;
  storageKey?: string;
  onPresetApplied?: (preset: FilterPreset) => void;
  className?: string;
}

export const FilterPresetActions: React.FC<FilterPresetActionsProps> = ({
  api,
  storageKey = "ag-grid-filter-presets",
  onPresetApplied,
  className = "",
}) => {
  const [presets, setPresets] = useState<FilterPreset[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [editingPreset, setEditingPreset] = useState<FilterPreset | null>(null);

  // Check if there are active filters
  const hasActiveFilters = useCallback(() => {
    const filterModel = api.getFilterModel();
    return filterModel && Object.keys(filterModel).length > 0;
  }, [api]);

  // Save presets to storage
  const savePresetsToStorage = useCallback(
    (updatedPresets: FilterPreset[]) => {
      localStorage.setItem(storageKey, JSON.stringify(updatedPresets));
      setPresets(updatedPresets);
    },
    [storageKey],
  );

  // Save new preset
  const handleSavePreset = useCallback(
    (name: string, category?: string) => {
      const newPreset: FilterPreset = {
        id: `preset-${Date.now()}`,
        name,
        category,
        filterModel: api.getFilterModel(),
        createdAt: new Date(),
        order: presets.length,
      };

      savePresetsToStorage([...presets, newPreset]);
      setShowSaveModal(false);
    },
    [api, presets, savePresetsToStorage],
  );

  // Update preset
  const handleUpdatePreset = useCallback(
    (updatedPreset: FilterPreset) => {
      const updated = presets.map((p) =>
        p.id === updatedPreset.id ? updatedPreset : p,
      );
      savePresetsToStorage(updated);
      setEditingPreset(null);
    },
    [presets, savePresetsToStorage],
  );

  // Delete preset
  const handleDeletePreset = useCallback(
    (presetId: string) => {
      savePresetsToStorage(presets.filter((p) => p.id !== presetId));
    },
    [presets, savePresetsToStorage],
  );

  // Reorder presets
  const handleReorderPresets = useCallback(
    (reorderedPresets: FilterPreset[]) => {
      const withUpdatedOrder = reorderedPresets.map((preset, index) => ({
        ...preset,
        order: index,
      }));
      savePresetsToStorage(withUpdatedOrder);
    },
    [savePresetsToStorage],
  );

  // Share/Export functionality
  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(presets, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `filter-presets-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowShareModal(false);
  }, [presets]);

  // Import functionality
  const handleImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (Array.isArray(imported)) {
            const merged = [...presets];
            imported.forEach((preset) => {
              if (!merged.find((p) => p.name === preset.name)) {
                merged.push({
                  ...preset,
                  id: `preset-${Date.now()}-${Math.random()}`,
                  createdAt: new Date(preset.createdAt),
                  order: merged.length,
                });
              }
            });
            savePresetsToStorage(merged);
            alert(`Imported ${imported.length} presets successfully!`);
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
    <div className={`${styles.container} ${className}`}>
      {/* Action buttons */}
      <div className={styles.actions}>
        {hasActiveFilters() && (
          <button
            className={styles.saveButton}
            onClick={() => setShowSaveModal(true)}
            title="Save current filters"
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

        <button
          className={styles.shareButton}
          onClick={() => setShowShareModal(true)}
          title="Share filters"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>

        {presets.length > 0 && (
          <>
            <button
              className={styles.manageButton}
              onClick={() => setShowManageModal(true)}
              title="Manage saved filters"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3M20.49 7.94l-4.24 4.24M7.75 7.75l4.24 4.24m4.24 4.24l4.24 4.24m-12.73 0l4.24-4.24" />
              </svg>
              Manage
            </button>

            <SavedFiltersDropdown
              api={api}
              presets={presets}
              onPresetSelect={onPresetApplied}
              placeholder="Apply Filter"
              className={styles.applyDropdown}
            />
          </>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal &&
        createPortal(
          <SaveModal
            onSave={handleSavePreset}
            onClose={() => setShowSaveModal(false)}
            existingCategories={[
              ...new Set(
                presets.map((p) => p.category).filter(Boolean) as string[],
              ),
            ]}
          />,
          document.body,
        )}

      {/* Manage Modal */}
      {showManageModal &&
        createPortal(
          <ManageModal
            presets={presets}
            onUpdate={handleUpdatePreset}
            onDelete={handleDeletePreset}
            onReorder={handleReorderPresets}
            onClose={() => setShowManageModal(false)}
            editingPreset={editingPreset}
            onEditPreset={setEditingPreset}
          />,
          document.body,
        )}

      {/* Share Modal */}
      {showShareModal &&
        createPortal(
          <ShareModal
            onExport={handleExport}
            onImport={handleImport}
            onClose={() => setShowShareModal(false)}
            presetsCount={presets.length}
          />,
          document.body,
        )}
    </div>
  );
};

// Save Modal Component
interface SaveModalProps {
  onSave: (name: string, category?: string) => void;
  onClose: () => void;
  existingCategories: string[];
}

const SaveModal: React.FC<SaveModalProps> = ({
  onSave,
  onClose,
  existingCategories,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [useNewCategory, setUseNewCategory] = useState(true);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), category.trim() || undefined);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Save Filter Preset</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label>Preset Name</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g., Q4 Sales Report"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            {existingCategories.length > 0 && (
              <div className={styles.categoryToggle}>
                <label>
                  <input
                    type="radio"
                    checked={!useNewCategory}
                    onChange={() => setUseNewCategory(false)}
                  />
                  Select existing
                </label>
                <label>
                  <input
                    type="radio"
                    checked={useNewCategory}
                    onChange={() => setUseNewCategory(true)}
                  />
                  Create new
                </label>
              </div>
            )}
            {useNewCategory ? (
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., Sales Reports"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            ) : (
              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Uncategorized</option>
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className={styles.modalActions}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.primaryButton}
              onClick={handleSave}
              disabled={!name.trim()}
            >
              Save Preset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Manage Modal Component
interface ManageModalProps {
  presets: FilterPreset[];
  onUpdate: (preset: FilterPreset) => void;
  onDelete: (id: string) => void;
  onReorder: (presets: FilterPreset[]) => void;
  onClose: () => void;
  editingPreset: FilterPreset | null;
  onEditPreset: (preset: FilterPreset | null) => void;
}

const ManageModal: React.FC<ManageModalProps> = ({
  presets,
  onUpdate,
  onDelete,
  onReorder,
  onClose,
  editingPreset,
  onEditPreset,
}) => {
  const [localPresets, setLocalPresets] = useState(presets);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));

    if (dragIndex !== dropIndex) {
      const newPresets = [...localPresets];
      const [removed] = newPresets.splice(dragIndex, 1);
      newPresets.splice(dropIndex, 0, removed);
      setLocalPresets(newPresets);
      onReorder(newPresets);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles.large}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>Manage Filter Presets</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          {localPresets.length === 0 ? (
            <p className={styles.emptyMessage}>No saved presets yet</p>
          ) : (
            <div className={styles.presetManageList}>
              {localPresets.map((preset, index) => (
                <div
                  key={preset.id}
                  className={styles.manageItem}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className={styles.dragHandle}>⋮⋮</div>
                  {editingPreset?.id === preset.id ? (
                    <EditPresetForm
                      preset={preset}
                      onSave={(updated) => {
                        onUpdate(updated);
                        onEditPreset(null);
                      }}
                      onCancel={() => onEditPreset(null)}
                    />
                  ) : (
                    <>
                      <div className={styles.presetDetails}>
                        <div className={styles.presetName}>{preset.name}</div>
                        {preset.category && (
                          <div className={styles.presetCategory}>
                            {preset.category}
                          </div>
                        )}
                      </div>
                      <div className={styles.manageActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => onEditPreset(preset)}
                          title="Edit"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => {
                            if (confirm(`Delete preset "${preset.name}"?`)) {
                              onDelete(preset.id);
                            }
                          }}
                          title="Delete"
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
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className={styles.manageFooter}>
            <p className={styles.hint}>Drag to reorder presets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Preset Form Component
interface EditPresetFormProps {
  preset: FilterPreset;
  onSave: (preset: FilterPreset) => void;
  onCancel: () => void;
}

const EditPresetForm: React.FC<EditPresetFormProps> = ({
  preset,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(preset.name);
  const [category, setCategory] = useState(preset.category || "");

  const handleSave = () => {
    onSave({
      ...preset,
      name: name.trim(),
      category: category.trim() || undefined,
    });
  };

  return (
    <div className={styles.editForm}>
      <input
        type="text"
        className={styles.editInput}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Preset name"
      />
      <input
        type="text"
        className={styles.editInput}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (optional)"
      />
      <div className={styles.editActions}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

// Share Modal Component
interface ShareModalProps {
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  presetsCount: number;
}

const ShareModal: React.FC<ShareModalProps> = ({
  onExport,
  onImport,
  onClose,
  presetsCount,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Share Filter Presets</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.shareSection}>
            <h4>Export Presets</h4>
            <p className={styles.shareDescription}>
              Export all {presetsCount} saved presets to share with your team.
            </p>
            <button className={styles.primaryButton} onClick={onExport}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Export to File
            </button>
          </div>

          <div className={styles.divider} />

          <div className={styles.shareSection}>
            <h4>Import Presets</h4>
            <p className={styles.shareDescription}>
              Import presets from a file shared by a team member.
            </p>
            <label className={styles.primaryButton}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Import from File
              <input
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={onImport}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
