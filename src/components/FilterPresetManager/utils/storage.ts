import type { FilterPreset, PresetStorageManager } from "../types";

export class LocalStorageManager implements PresetStorageManager {
  private prefix: string;

  constructor(prefix: string = "ag-grid-presets") {
    this.prefix = prefix;
  }

  private getStorageKey(gridId: string): string {
    return `${this.prefix}:${gridId}`;
  }

  getPresets(gridId: string): FilterPreset[] {
    try {
      const key = this.getStorageKey(gridId);
      const stored = localStorage.getItem(key);
      if (!stored) return [];

      const presets = JSON.parse(stored) as Array<
        Omit<FilterPreset, "createdAt" | "updatedAt"> & {
          createdAt: string;
          updatedAt?: string;
        }
      >;
      // Ensure dates are properly deserialized
      return presets.map((preset) => ({
        ...preset,
        createdAt: new Date(preset.createdAt),
        updatedAt: preset.updatedAt ? new Date(preset.updatedAt) : undefined,
      }));
    } catch (error) {
      console.error(`Failed to load presets for grid "${gridId}":`, error);
      return [];
    }
  }

  savePresets(gridId: string, presets: FilterPreset[]): void {
    try {
      const key = this.getStorageKey(gridId);
      localStorage.setItem(key, JSON.stringify(presets));
    } catch (error) {
      console.error(`Failed to save presets for grid "${gridId}":`, error);
      throw new Error("Failed to save filter presets. Storage may be full.");
    }
  }

  migratePresets(oldKey: string, gridId: string): boolean {
    try {
      const oldData = localStorage.getItem(oldKey);
      if (!oldData) return false;

      const oldPresets = JSON.parse(oldData);
      const newKey = this.getStorageKey(gridId);

      // Check if new key already has data
      const existingData = localStorage.getItem(newKey);
      if (existingData) {
        console.warn(
          `Grid "${gridId}" already has presets. Skipping migration.`,
        );
        return false;
      }

      // Migrate the data
      this.savePresets(gridId, oldPresets);

      // Optionally remove old data
      // localStorage.removeItem(oldKey);

      console.log(
        `Successfully migrated ${oldPresets.length} presets to grid "${gridId}"`,
      );
      return true;
    } catch (error) {
      console.error("Failed to migrate presets:", error);
      return false;
    }
  }

  /**
   * Get all grid IDs that have saved presets
   */
  getAllGridIds(): string[] {
    const gridIds: string[] = [];
    const prefixWithColon = `${this.prefix}:`;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefixWithColon)) {
        const gridId = key.substring(prefixWithColon.length);
        gridIds.push(gridId);
      }
    }

    return gridIds;
  }

  /**
   * Clear all presets for a specific grid
   */
  clearPresets(gridId: string): void {
    const key = this.getStorageKey(gridId);
    localStorage.removeItem(key);
  }
}
