import React, { useCallback } from "react";
import { createPortal } from "react-dom";
import type { FilterPreset } from "../types";
import styles from "../FilterPresetManager.module.css";

interface ImportExportModalProps {
  gridId: string;
  presets: FilterPreset[];
  onPresetsChange: (presets: FilterPreset[]) => void;
  onClose: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  gridId,
  presets,
  onPresetsChange,
  onClose,
}) => {
  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(
      {
        gridId,
        presets,
        exportedAt: new Date().toISOString(),
        version: "1.0",
      },
      null,
      2,
    );
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `filter-views-${gridId}-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  }, [gridId, presets, onClose]);

  const handleImport = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);

          // Validate the import
          if (data.gridId && data.gridId !== gridId) {
            alert(
              `These presets are for grid "${data.gridId}" but you're importing to "${gridId}". ` +
                "The presets may not work correctly.",
            );
          }

          if (Array.isArray(data.presets)) {
            const merged = [...presets];
            data.presets.forEach((preset: FilterPreset) => {
              if (!merged.find((p) => p.name === preset.name)) {
                merged.push({
                  ...preset,
                  id: `${gridId}-${Date.now()}-${Math.random()}`,
                  createdAt: new Date(preset.createdAt),
                });
              }
            });
            onPresetsChange(merged);
            alert(`Imported ${data.presets.length} views successfully!`);
            onClose();
          }
        } catch (error) {
          console.error("Failed to import presets:", error);
          alert("Failed to import views. Please check the file format.");
        }
      };
      reader.readAsText(file);
    },
    [gridId, presets, onPresetsChange, onClose],
  );

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Import/Export Filter Views</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.manageContent}>
            <p className={styles.emptyMessage}>
              Export all {presets.length} saved views or import views from a
              file.
            </p>
            <div className={styles.importExport}>
              <button className={styles.secondaryButton} onClick={handleExport}>
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
                  onChange={handleImport}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
