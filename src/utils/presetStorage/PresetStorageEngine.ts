import { logger } from "../logger";
import { LocalStorageAdapter } from "./LocalStorageAdapter";
import type {
  FilterPreset,
  PresetStorageOptions,
  PresetStorageState,
  PresetValidationError,
  StorageAdapter,
} from "./types";

export class PresetStorageEngine {
  private readonly storageKey: string;
  private readonly adapter: StorageAdapter;
  private readonly maxPresets: number;
  private readonly onStorageQuotaExceeded?: (error: DOMException) => void;
  private readonly onSyncUpdate?: (presets: FilterPreset[]) => void;
  private syncListener?: (event: StorageEvent) => void;

  constructor(options: PresetStorageOptions = {}) {
    this.storageKey = options.storageKey || "ag-grid-filter-presets";
    this.adapter = options.adapter || new LocalStorageAdapter();
    this.maxPresets = options.maxPresets || 50;
    this.onStorageQuotaExceeded = options.onStorageQuotaExceeded;
    this.onSyncUpdate = options.onSyncUpdate;

    this.initializeCrossTabSync();
  }

  private initializeCrossTabSync(): void {
    if (typeof window === "undefined") return;

    this.syncListener = (event: StorageEvent) => {
      if (event.key === this.storageKey && event.newValue !== null) {
        try {
          const state = this.parseStorageState(event.newValue);
          if (this.onSyncUpdate) {
            this.onSyncUpdate(state.presets);
          }
        } catch (error) {
          logger.error("Failed to sync storage update", { error });
        }
      }
    };

    window.addEventListener("storage", this.syncListener);
  }

  destroy(): void {
    if (this.syncListener && typeof window !== "undefined") {
      window.removeEventListener("storage", this.syncListener);
    }
  }

  private async getStorageState(): Promise<PresetStorageState> {
    try {
      const data = await this.adapter.getItem(this.storageKey);
      if (!data) {
        return { presets: [] };
      }
      return this.parseStorageState(data);
    } catch (error) {
      logger.error("Failed to get storage state", { error });
      return { presets: [] };
    }
  }

  private parseStorageState(data: string): PresetStorageState {
    try {
      const parsed = JSON.parse(data);
      if (!this.isValidStorageState(parsed)) {
        throw new Error("Invalid storage state structure");
      }
      return parsed;
    } catch (error) {
      logger.error("Failed to parse storage state", { error });
      return { presets: [] };
    }
  }

  private isValidStorageState(obj: unknown): obj is PresetStorageState {
    if (!obj || typeof obj !== "object") return false;
    const state = obj as Record<string, unknown>;
    return (
      Array.isArray(state.presets) &&
      (state.defaultPresetId === undefined ||
        typeof state.defaultPresetId === "string")
    );
  }

  private async saveStorageState(state: PresetStorageState): Promise<void> {
    try {
      const data = JSON.stringify(state);
      await this.adapter.setItem(this.storageKey, data);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        if (this.onStorageQuotaExceeded) {
          this.onStorageQuotaExceeded(error);
        }
      }
      throw error;
    }
  }

  private validatePreset(
    preset: Partial<FilterPreset>,
  ): PresetValidationError[] {
    const errors: PresetValidationError[] = [];

    if (!preset.name || preset.name.trim().length === 0) {
      errors.push({ field: "name", message: "Preset name is required" });
    }

    if (!preset.gridState) {
      errors.push({ field: "gridState", message: "Grid state is required" });
    }

    if (preset.isSystem && preset.isDefault) {
      errors.push({
        field: "isSystem",
        message: "System presets cannot be set as default",
      });
    }

    return errors;
  }

  private generateId(): string {
    return `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async getAllPresets(): Promise<FilterPreset[]> {
    const state = await this.getStorageState();
    return state.presets;
  }

  async getPreset(id: string): Promise<FilterPreset | null> {
    const presets = await this.getAllPresets();
    return presets.find((p) => p.id === id) || null;
  }

  async getDefaultPreset(): Promise<FilterPreset | null> {
    const state = await this.getStorageState();
    if (!state.defaultPresetId) return null;
    return state.presets.find((p) => p.id === state.defaultPresetId) || null;
  }

  async savePreset(preset: Partial<FilterPreset>): Promise<FilterPreset> {
    const errors = this.validatePreset(preset);
    if (errors.length > 0) {
      throw new Error(
        `Validation failed: ${errors.map((e) => e.message).join(", ")}`,
      );
    }

    const state = await this.getStorageState();

    if (state.presets.length >= this.maxPresets) {
      throw new Error(`Maximum number of presets (${this.maxPresets}) reached`);
    }

    const now = new Date().toISOString();
    const newPreset: FilterPreset = {
      id: preset.id || this.generateId(),
      name: preset.name!.trim(),
      description: preset.description?.trim(),
      gridState: preset.gridState!,
      isDefault: preset.isDefault || false,
      isSystem: preset.isSystem || false,
      createdAt: preset.createdAt || now,
      updatedAt: now,
      tags: preset.tags || [],
      metadata: preset.metadata || {},
    };

    if (newPreset.isDefault) {
      state.presets.forEach((p) => {
        p.isDefault = false;
      });
      state.defaultPresetId = newPreset.id;
    }

    state.presets.push(newPreset);
    await this.saveStorageState(state);

    logger.info("Preset saved", { id: newPreset.id, name: newPreset.name });
    return newPreset;
  }

  async updatePreset(
    id: string,
    updates: Partial<FilterPreset>,
  ): Promise<FilterPreset> {
    const state = await this.getStorageState();
    const index = state.presets.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error(`Preset with id ${id} not found`);
    }

    const existingPreset = state.presets[index];

    if (existingPreset.isSystem && !updates.isSystem) {
      throw new Error("Cannot modify system presets");
    }

    const updatedPreset = {
      ...existingPreset,
      ...updates,
      id: existingPreset.id,
      createdAt: existingPreset.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const errors = this.validatePreset(updatedPreset);
    if (errors.length > 0) {
      throw new Error(
        `Validation failed: ${errors.map((e) => e.message).join(", ")}`,
      );
    }

    if (updatedPreset.isDefault && !existingPreset.isDefault) {
      state.presets.forEach((p) => {
        p.isDefault = false;
      });
      state.defaultPresetId = updatedPreset.id;
    } else if (!updatedPreset.isDefault && existingPreset.isDefault) {
      state.defaultPresetId = undefined;
    }

    state.presets[index] = updatedPreset;
    await this.saveStorageState(state);

    logger.info("Preset updated", {
      id: updatedPreset.id,
      name: updatedPreset.name,
    });
    return updatedPreset;
  }

  async deletePreset(id: string): Promise<void> {
    const state = await this.getStorageState();
    const preset = state.presets.find((p) => p.id === id);

    if (!preset) {
      throw new Error(`Preset with id ${id} not found`);
    }

    if (preset.isSystem) {
      throw new Error("Cannot delete system presets");
    }

    state.presets = state.presets.filter((p) => p.id !== id);

    if (state.defaultPresetId === id) {
      state.defaultPresetId = undefined;
    }

    await this.saveStorageState(state);
    logger.info("Preset deleted", { id, name: preset.name });
  }

  async setDefaultPreset(id: string | null): Promise<void> {
    const state = await this.getStorageState();

    if (id === null) {
      state.presets.forEach((p) => {
        p.isDefault = false;
      });
      state.defaultPresetId = undefined;
    } else {
      const preset = state.presets.find((p) => p.id === id);
      if (!preset) {
        throw new Error(`Preset with id ${id} not found`);
      }
      if (preset.isSystem) {
        throw new Error("Cannot set system preset as default");
      }

      state.presets.forEach((p) => {
        p.isDefault = false;
      });
      preset.isDefault = true;
      state.defaultPresetId = id;
    }

    await this.saveStorageState(state);
    logger.info("Default preset updated", { id });
  }

  async clearAllUserPresets(): Promise<void> {
    const state = await this.getStorageState();
    state.presets = state.presets.filter((p) => p.isSystem);
    state.defaultPresetId = undefined;
    await this.saveStorageState(state);
    logger.info("All user presets cleared");
  }

  async exportPresets(ids?: string[]): Promise<string> {
    const allPresets = await this.getAllPresets();
    const presetsToExport = ids
      ? allPresets.filter((p) => ids.includes(p.id))
      : allPresets.filter((p) => !p.isSystem);

    return JSON.stringify(presetsToExport, null, 2);
  }

  async importPresets(
    jsonData: string,
    options: { merge?: boolean } = {},
  ): Promise<FilterPreset[]> {
    let presetsToImport: FilterPreset[];

    try {
      presetsToImport = JSON.parse(jsonData);
      if (!Array.isArray(presetsToImport)) {
        throw new Error("Invalid import data: expected array of presets");
      }
    } catch (error) {
      throw new Error(
        `Failed to parse import data: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }

    const state = await this.getStorageState();
    const importedPresets: FilterPreset[] = [];

    for (const preset of presetsToImport) {
      const errors = this.validatePreset(preset);
      if (errors.length > 0) {
        logger.warn("Skipping invalid preset during import", {
          preset,
          errors,
        });
        continue;
      }

      const newId = this.generateId();
      const importedPreset: FilterPreset = {
        ...preset,
        id: newId,
        isDefault: false,
        isSystem: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      importedPresets.push(importedPreset);
    }

    if (!options.merge) {
      state.presets = state.presets.filter((p) => p.isSystem);
      state.defaultPresetId = undefined;
    }

    if (state.presets.length + importedPresets.length > this.maxPresets) {
      throw new Error(
        `Import would exceed maximum preset limit (${this.maxPresets})`,
      );
    }

    state.presets.push(...importedPresets);
    await this.saveStorageState(state);

    logger.info("Presets imported", {
      count: importedPresets.length,
      merge: options.merge,
    });
    return importedPresets;
  }
}
