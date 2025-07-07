import { validatePreset } from "./urlSerializer";
import type {
  FilterPreset,
  PresetExportFormat,
  ImportMode,
  ImportResult,
  ValidationResult,
} from "./types";

/**
 * Exports filter presets to the standard format
 * @param presets - Presets to export
 * @returns Export format object
 */
export function exportPresets(presets: FilterPreset[]): PresetExportFormat {
  return {
    version: "1.0.0",
    exportDate: new Date().toISOString(),
    source: "ag-grid-react-components",
    presets: presets,
  };
}

/**
 * Imports filter presets with the specified mode
 * @param data - Import data
 * @param existingPresets - Current presets
 * @param mode - Import mode (replace, merge, add)
 * @returns Import result
 */
export function importPresets(
  data: PresetExportFormat,
  existingPresets: FilterPreset[],
  mode: ImportMode,
): ImportResult {
  const result: ImportResult = {
    imported: [],
    skipped: [],
    errors: [],
  };

  // Validate the import data structure first
  const validation = validateImportData(data);
  if (!validation.isValid) {
    return {
      ...result,
      errors: validation.errors.map((error) => ({
        preset: {},
        error,
      })),
    };
  }

  const timestamp = new Date().toISOString();

  // Process each preset
  for (let i = 0; i < data.presets.length; i++) {
    const preset = data.presets[i];

    // Validate individual preset
    if (!validatePreset(preset)) {
      result.errors.push({
        preset,
        error: `Invalid preset at index ${i}: missing required fields`,
      });
      continue;
    }

    try {
      switch (mode) {
        case "replace":
          // In replace mode, import all presets as-is
          result.imported.push({
            ...preset,
            updatedAt: timestamp,
          });
          break;

        case "merge": {
          // In merge mode, skip if ID already exists
          if (existingPresets.some((p) => p.id === preset.id)) {
            result.skipped.push(preset);
          } else {
            // Check for name conflicts
            let importedPreset = { ...preset, updatedAt: timestamp };
            if (existingPresets.some((p) => p.name === preset.name)) {
              importedPreset.name = `${preset.name} (imported)`;
            }
            result.imported.push(importedPreset);
          }
          break;
        }

        case "add": {
          // In add mode, generate new IDs and handle name conflicts
          const newId = generatePresetId();
          let name = preset.name;

          // Handle name conflicts
          let counter = 1;
          while (
            existingPresets.some((p) => p.name === name) ||
            result.imported.some((p) => p.name === name)
          ) {
            name = `${preset.name} (${counter})`;
            counter++;
          }

          result.imported.push({
            ...preset,
            id: newId,
            name,
            updatedAt: timestamp,
          });
          break;
        }
      }
    } catch (error) {
      result.errors.push({
        preset,
        error: `Failed to import preset: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }

  return result;
}

/**
 * Validates import data structure
 * @param data - Data to validate
 * @returns Validation result
 */
export function validateImportData(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return {
      isValid: false,
      errors: ["Import data must be an object"],
    };
  }

  const obj = data as Record<string, unknown>;

  // Check required fields
  if (!obj.version || typeof obj.version !== "string") {
    errors.push("Missing required field: version");
  }

  if (!obj.exportDate || typeof obj.exportDate !== "string") {
    errors.push("Missing required field: exportDate");
  }

  if (!obj.source || typeof obj.source !== "string") {
    errors.push("Missing required field: source");
  }

  if (!obj.presets) {
    errors.push("Missing required field: presets");
  } else if (!Array.isArray(obj.presets)) {
    errors.push("Presets must be an array");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generates a filename for export
 * @param presetCount - Number of presets being exported
 * @returns Filename string
 */
export function generateExportFilename(presetCount?: number): string {
  const now = new Date();
  const dateStr = now.toISOString().substring(0, 19).replace(/[T:]/g, "-");

  let filename = `filter-presets-${dateStr}.json`;

  if (presetCount !== undefined) {
    const plural = presetCount === 1 ? "preset" : "presets";
    filename = `filter-presets-${dateStr}-${presetCount}-${plural}.json`;
  }

  return filename;
}

/**
 * Creates a downloadable blob from export data
 * @param data - Export data
 * @returns Blob for download
 */
export function createExportBlob(data: PresetExportFormat): Blob {
  const jsonString = JSON.stringify(data, null, 2);
  return new Blob([jsonString], { type: "application/json" });
}

/**
 * Reads and parses a JSON file
 * @param file - File to read
 * @returns Parsed data or error
 */
export async function readImportFile(
  file: File,
): Promise<{ data?: unknown; error?: string }> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    return { data };
  } catch (error) {
    return {
      error: `Failed to read file: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Generates a unique preset ID
 * @returns New preset ID
 */
function generatePresetId(): string {
  return `preset-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
