import type { ViewDropdownLoader, SavedViewOption } from "./types";

export interface PresetLoaderConfig {
  /** Array of preset view options */
  presets: SavedViewOption[];
  /** Whether presets can be modified (default: false) */
  allowModification?: boolean;
}

/**
 * Preset loader for built-in/developer-defined views
 * These are typically read-only views shipped with the application
 */
export class PresetLoader implements ViewDropdownLoader {
  private presets: SavedViewOption[];
  private allowModification: boolean;

  constructor(config: PresetLoaderConfig) {
    this.presets = config.presets.map((preset) => ({
      ...preset,
      metadata: {
        ...preset.metadata,
        isPreset: true,
      },
    }));
    this.allowModification = config.allowModification ?? false;
  }

  async loadOptions(): Promise<SavedViewOption[]> {
    // Return a copy to prevent external modification
    return [...this.presets];
  }

  async saveOption(option: SavedViewOption): Promise<void> {
    if (!this.allowModification) {
      throw new Error("Cannot save to preset loader - presets are read-only");
    }

    const existingIndex = this.presets.findIndex((p) => p.id === option.id);
    if (existingIndex >= 0) {
      this.presets[existingIndex] = option;
    } else {
      this.presets.push(option);
    }
  }

  async deleteOption(id: string): Promise<void> {
    if (!this.allowModification) {
      throw new Error(
        "Cannot delete from preset loader - presets are read-only",
      );
    }

    this.presets = this.presets.filter((p) => p.id !== id);
  }

  async updateOption(
    id: string,
    updates: Partial<SavedViewOption>,
  ): Promise<void> {
    if (!this.allowModification) {
      throw new Error("Cannot update preset loader - presets are read-only");
    }

    const index = this.presets.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.presets[index] = {
        ...this.presets[index],
        ...updates,
      };
    }
  }

  // Preset loaders typically don't support these operations
  async getDefaultViewId(): Promise<string | null> {
    const defaultPreset = this.presets.find((p) => p.metadata?.isDefault);
    return defaultPreset?.id || null;
  }

  async setDefaultView(_id: string): Promise<void> {
    if (!this.allowModification) {
      throw new Error(
        "Cannot set default in preset loader - presets are read-only",
      );
    }
  }

  async exportViews(): Promise<string> {
    return JSON.stringify({ presets: this.presets }, null, 2);
  }

  async importViews(_data: string): Promise<void> {
    throw new Error(
      "Cannot import into preset loader - use constructor to define presets",
    );
  }
}
