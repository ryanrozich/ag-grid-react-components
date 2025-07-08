import React, { useState } from "react";
import { createPortal } from "react-dom";
import type { FilterPreset } from "../types";
import styles from "../FilterPresetManager.module.css";

interface ManagePresetsModalProps {
  presets: FilterPreset[];
  onPresetsChange: (presets: FilterPreset[]) => void;
  onClose: () => void;
  allowedCategories?: string[];
}

export const ManagePresetsModal: React.FC<ManagePresetsModalProps> = ({
  presets,
  onPresetsChange,
  onClose,
  allowedCategories,
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
                        <select
                          className={styles.editSelect}
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                        >
                          <option value="">No category</option>
                          {(allowedCategories || existingCategories).map(
                            (cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ),
                          )}
                        </select>
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
