import React, { useCallback } from "react";
import { createPortal } from "react-dom";
import type { FilterPreset } from "../types";
import type { GridApi } from "ag-grid-community";
import {
  exportPresets,
  downloadJson,
  generateExportFilename,
  importPresets,
} from "../utils/export";
import styles from "../FilterPresetManager.module.css";

interface ImportExportModalProps {
  gridId: string;
  presets: FilterPreset[];
  onPresetsChange: (presets: FilterPreset[]) => void;
  onClose: () => void;
  api: GridApi;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  gridId,
  presets,
  onPresetsChange,
  onClose,
  api,
}) => {
  const handleExport = useCallback(() => {
    const exportData = exportPresets(presets, api);
    const filename = generateExportFilename();
    downloadJson(exportData, filename);
    onClose();
  }, [presets, api, onClose]);

  const handleImport = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const data = await importPresets(file);

        // Handle single preset or multiple presets
        const importedPresets =
          "presets" in data
            ? data.presets.map((ep) => ep.preset)
            : [data.preset];

        const merged = [...presets];
        let importCount = 0;

        importedPresets.forEach((preset: FilterPreset) => {
          // Check for duplicates by name
          if (!merged.find((p) => p.name === preset.name)) {
            merged.push({
              ...preset,
              id: `${gridId}-${Date.now()}-${Math.random()}`,
              // Dates are already converted by importPresets
            });
            importCount++;
          }
        });

        if (importCount > 0) {
          onPresetsChange(merged);
          alert(
            `Imported ${importCount} view${importCount > 1 ? "s" : ""} successfully!`,
          );
        } else {
          alert("All views already exist. No new views were imported.");
        }
        onClose();
      } catch (error) {
        console.error("Failed to import presets:", error);
        alert(
          (error as Error).message ||
            "Failed to import views. Please check the file format.",
        );
      }
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
