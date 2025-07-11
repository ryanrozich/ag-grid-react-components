import React, { useState } from "react";
import { createPortal } from "react-dom";
import { CategorySelector } from "../../CategorySelector";
import type { FilterPreset } from "../types";
import type { GridApi } from "ag-grid-community";
import {
  exportPreset,
  downloadJson,
  generateExportFilename,
} from "../utils/export";
import styles from "../FilterPresetManager.module.css";

interface ManagePresetsModalProps {
  presets: FilterPreset[];
  onPresetsChange: (presets: FilterPreset[]) => void;
  onClose: () => void;
  allowedCategories?: string[];
  api: GridApi;
}

export const ManagePresetsModal: React.FC<ManagePresetsModalProps> = ({
  presets,
  onPresetsChange,
  onClose,
  allowedCategories,
  api,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleDelete = (id: string) => {
    if (confirm("Delete this view?")) {
      onPresetsChange(presets.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (preset: FilterPreset) => {
    setEditingId(preset.id);
    setEditName(preset.name);
    setEditCategory(preset.category || "");
  };

  const handleSaveEdit = () => {
    if (editingId && editName.trim()) {
      onPresetsChange(
        presets.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: editName.trim(),
                category: editCategory.trim() || undefined,
                updatedAt: new Date(),
              }
            : p,
        ),
      );
      setEditingId(null);
      setEditName("");
      setEditCategory("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditCategory("");
  };

  const handleExport = (preset: FilterPreset) => {
    const exportData = exportPreset(preset, api);
    const filename = generateExportFilename(preset.name);
    downloadJson(exportData, filename);
  };

  const existingCategories = Array.from(
    new Set(presets.map((p) => p.category).filter(Boolean) as string[]),
  );

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Manage Saved Views</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.manageContent}>
            {presets.length === 0 ? (
              <p className={styles.emptyMessage}>No saved views yet</p>
            ) : (
              <div className={styles.presetList}>
                {presets.map((preset) => (
                  <div key={preset.id} className={styles.presetItem}>
                    {editingId === preset.id ? (
                      // Edit mode
                      <div className={styles.editForm}>
                        <input
                          type="text"
                          className={styles.editInput}
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit();
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                          placeholder="View name..."
                          autoFocus
                        />
                        <CategorySelector
                          value={editCategory}
                          onChange={setEditCategory}
                          existingCategories={
                            allowedCategories || existingCategories
                          }
                          placeholder="Select or create category"
                          className="relative w-full"
                          inputWrapperClassName="relative flex items-center"
                          inputClassName="w-full px-3 py-2 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          dropdownIconClassName="absolute right-3 pointer-events-none text-xs text-gray-500 dark:text-gray-400"
                          dropdownClassName="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-80 overflow-y-auto z-50"
                          optionClassName="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                          createOptionClassName="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 font-medium text-blue-600 dark:text-blue-400"
                          createIconClassName="text-base"
                          noResultsClassName="px-3 py-2 text-gray-500 dark:text-gray-400 italic text-sm"
                          createFormClassName="p-3"
                          createInputClassName="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                          errorMessageClassName="text-red-500 dark:text-red-400 text-xs mb-2"
                          createActionsClassName="flex gap-2 justify-end"
                          createButtonClassName="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                          cancelButtonClassName="px-4 py-1.5 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-sm font-medium"
                          highlightedClassName="bg-gray-100 dark:bg-gray-700"
                        />
                        <div className={styles.editActions}>
                          <button
                            className={styles.saveButton}
                            onClick={handleSaveEdit}
                            disabled={!editName.trim()}
                          >
                            Save
                          </button>
                          <button
                            className={styles.cancelButton}
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View mode
                      <>
                        <div className={styles.presetInfo}>
                          <div>
                            <span className={styles.presetName}>
                              {preset.name}
                            </span>
                            {preset.category && (
                              <span className={styles.presetCategory}>
                                {preset.category}
                              </span>
                            )}
                          </div>
                          <span className={styles.presetDate}>
                            {new Date(preset.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={styles.presetActions}>
                          <button
                            className={styles.exportButton}
                            onClick={() => handleExport(preset)}
                            title="Export this view"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </button>
                          <button
                            className={styles.editButton}
                            onClick={() => handleEdit(preset)}
                            title="Edit this view"
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
                            onClick={() => handleDelete(preset.id)}
                            title="Delete this view"
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
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
