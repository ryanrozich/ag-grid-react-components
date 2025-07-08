import React from "react";
import { createPortal } from "react-dom";
import type { FilterPreset } from "../types";
import styles from "../FilterPresetManager.module.css";

interface ManagePresetsModalProps {
  presets: FilterPreset[];
  onPresetsChange: (presets: FilterPreset[]) => void;
  onClose: () => void;
}

export const ManagePresetsModal: React.FC<ManagePresetsModalProps> = ({
  presets,
  onPresetsChange,
  onClose,
}) => {
  const handleDelete = (id: string) => {
    if (confirm("Delete this view?")) {
      onPresetsChange(presets.filter((p) => p.id !== id));
    }
  };

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
                    <div className={styles.presetInfo}>
                      <span className={styles.presetName}>{preset.name}</span>
                      <span className={styles.presetDate}>
                        {new Date(preset.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.presetActions}>
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
