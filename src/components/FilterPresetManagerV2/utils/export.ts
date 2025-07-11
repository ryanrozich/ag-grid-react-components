import type { FilterPreset } from "../types";
import type { GridApi, FilterModel } from "ag-grid-community";

export interface ExportedPreset {
  version: string;
  exportedAt: string;
  preset: FilterPreset;
  gridState: {
    filterModel: FilterModel;
    columnState: ReturnType<GridApi["getColumnState"]>;
    sortModel: null; // getSortModel not available in all AG Grid versions
  };
}

/**
 * Export a single preset to JSON
 */
export function exportPreset(
  preset: FilterPreset,
  api: GridApi,
): ExportedPreset {
  return {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    preset: {
      ...preset,
      // Ensure dates are serialized properly
      createdAt:
        preset.createdAt instanceof Date
          ? preset.createdAt
          : new Date(preset.createdAt),
      updatedAt:
        preset.updatedAt instanceof Date
          ? preset.updatedAt
          : preset.updatedAt
            ? new Date(preset.updatedAt)
            : undefined,
    },
    gridState: {
      filterModel: preset.filterModel,
      columnState: api.getColumnState(),
      sortModel: null, // getSortModel not available in all AG Grid versions
    },
  };
}

/**
 * Export multiple presets to JSON
 */
export function exportPresets(
  presets: FilterPreset[],
  api: GridApi,
): {
  version: string;
  exportedAt: string;
  presets: ExportedPreset[];
} {
  return {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    presets: presets.map((preset) => exportPreset(preset, api)),
  };
}

/**
 * Download JSON data as a file
 */
export function downloadJson(data: unknown, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate a filename for the export
 */
export function generateExportFilename(presetName?: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  const baseName = presetName
    ? `filter-preset-${presetName.toLowerCase().replace(/\s+/g, "-")}`
    : "filter-presets";
  return `${baseName}-${timestamp}.json`;
}

/**
 * Import presets from JSON file
 */
export function importPresets(
  file: File,
): Promise<ExportedPreset | { presets: ExportedPreset[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);

        // Validate the structure
        if (!data.version || !data.exportedAt) {
          throw new Error("Invalid preset file format");
        }

        // Convert date strings back to Date objects
        if (data.preset) {
          data.preset.createdAt = new Date(data.preset.createdAt);
          if (data.preset.updatedAt) {
            data.preset.updatedAt = new Date(data.preset.updatedAt);
          }
        } else if (data.presets) {
          data.presets.forEach((exportedPreset: ExportedPreset) => {
            exportedPreset.preset.createdAt = new Date(
              exportedPreset.preset.createdAt,
            );
            if (exportedPreset.preset.updatedAt) {
              exportedPreset.preset.updatedAt = new Date(
                exportedPreset.preset.updatedAt,
              );
            }
          });
        }

        resolve(data);
      } catch (error) {
        reject(
          new Error(`Failed to parse preset file: ${(error as Error).message}`),
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
}
