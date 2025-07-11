import type {
  FilterPreset,
  PresetSystem,
  PresetSystemEvents,
  PresetSystemOptions,
  SystemPreset,
  UserPreset,
} from "./types";
import { createLogger } from "../logger";

const logger = createLogger("PresetManager");

/**
 * Manages system and user presets for AG Grid filters
 */
export class PresetManager implements PresetSystem {
  private systemPresets: Map<string, SystemPreset> = new Map();
  private userPresets: Map<string, UserPreset> = new Map();
  private defaultPresetId: string | null = null;
  private storageKey: string;
  private defaultKey: string;
  private maxUserPresets: number;

  // Event listeners
  private presetsChangeListeners: Set<PresetSystemEvents["onPresetsChange"]> =
    new Set();
  private defaultChangeListeners: Set<PresetSystemEvents["onDefaultChange"]> =
    new Set();

  constructor(options: PresetSystemOptions = {}) {
    this.storageKey = options.storageKey || "ag-grid-presets";
    this.defaultKey = options.defaultKey || "ag-grid-default-preset";
    this.maxUserPresets = options.maxUserPresets || 50;

    // Load saved data from localStorage
    this.loadFromStorage();
  }

  /**
   * Register system presets defined by the application
   */
  registerSystemPresets(presets: SystemPreset[]): void {
    for (const preset of presets) {
      if (!preset.isSystemPreset) {
        logger.warn(
          `Preset ${preset.id} is not marked as system preset, marking it as system preset`,
        );
      }
      this.systemPresets.set(preset.id, {
        ...preset,
        isSystemPreset: true,
      });
    }

    this.notifyPresetsChange();
    logger.info(`Registered ${presets.length} system presets`);
  }

  /**
   * Save a new user preset or update existing one
   */
  saveUserPreset(preset: Partial<FilterPreset>): UserPreset {
    // Validate input
    if (!preset.name || preset.name.trim() === "") {
      throw new Error("Preset name is required");
    }
    if (!preset.gridState) {
      throw new Error("Grid state is required");
    }

    // Check max presets limit
    if (
      this.userPresets.size >= this.maxUserPresets &&
      !preset.id // Only check limit for new presets
    ) {
      throw new Error(
        `Maximum number of user presets (${this.maxUserPresets}) reached`,
      );
    }

    const now = new Date().toISOString();
    const id = preset.id || this.generateId();

    const userPreset: UserPreset = {
      id,
      name: preset.name,
      description: preset.description,
      gridState: preset.gridState,
      isSystemPreset: false,
      tags: (preset as UserPreset).tags || [],
      createdAt: (preset as UserPreset).createdAt || now,
      updatedAt: now,
    };

    this.userPresets.set(id, userPreset);
    this.saveToStorage();
    this.notifyPresetsChange();

    logger.info(`Saved user preset: ${id}`);
    return userPreset;
  }

  /**
   * Update an existing user preset
   */
  updateUserPreset(id: string, updates: Partial<FilterPreset>): void {
    // Check if it's a system preset
    if (this.systemPresets.has(id)) {
      throw new Error("Cannot modify system preset");
    }

    const preset = this.userPresets.get(id);
    if (!preset) {
      throw new Error(`Preset ${id} not found`);
    }

    // Validate updates
    if (updates.name !== undefined && updates.name.trim() === "") {
      throw new Error("Preset name cannot be empty");
    }

    const updatedPreset: UserPreset = {
      ...preset,
      ...updates,
      id: preset.id, // Ensure ID cannot be changed
      isSystemPreset: false, // Ensure type cannot be changed
      updatedAt: new Date().toISOString(),
    };

    this.userPresets.set(id, updatedPreset);
    this.saveToStorage();
    this.notifyPresetsChange();

    logger.info(`Updated user preset: ${id}`);
  }

  /**
   * Delete a user preset
   */
  deleteUserPreset(id: string): void {
    // Check if it's a system preset
    if (this.systemPresets.has(id)) {
      throw new Error("Cannot delete system preset");
    }

    if (!this.userPresets.has(id)) {
      throw new Error(`Preset ${id} not found`);
    }

    this.userPresets.delete(id);

    // Clear default if this was the default preset
    if (this.defaultPresetId === id) {
      this.clearDefault();
    }

    this.saveToStorage();
    this.notifyPresetsChange();

    logger.info(`Deleted user preset: ${id}`);
  }

  /**
   * Set a preset as the default
   */
  setDefaultPreset(id: string | null): void {
    if (id === null) {
      this.clearDefault();
      return;
    }

    // Verify preset exists
    if (!this.systemPresets.has(id) && !this.userPresets.has(id)) {
      throw new Error(`Preset ${id} not found`);
    }

    this.defaultPresetId = id;
    localStorage.setItem(this.defaultKey, id);

    const preset = this.getPresetById(id);
    this.notifyDefaultChange(preset);

    logger.info(`Set default preset: ${id}`);
  }

  /**
   * Get the current default preset
   */
  getDefaultPreset(): FilterPreset | null {
    if (!this.defaultPresetId) {
      return null;
    }

    return this.getPresetById(this.defaultPresetId);
  }

  /**
   * Clear the default preset
   */
  clearDefault(): void {
    this.defaultPresetId = null;
    localStorage.removeItem(this.defaultKey);
    this.notifyDefaultChange(null);

    logger.info("Cleared default preset");
  }

  /**
   * Get all presets organized by type
   */
  getAllPresets(): {
    system: FilterPreset[];
    user: FilterPreset[];
    activeId?: string;
  } {
    return {
      system: Array.from(this.systemPresets.values()),
      user: Array.from(this.userPresets.values()),
      activeId: this.defaultPresetId || undefined,
    };
  }

  /**
   * Duplicate a system preset as a user preset
   */
  duplicateAsUserPreset(systemPresetId: string, newName: string): UserPreset {
    const preset = this.getPresetById(systemPresetId);
    if (!preset) {
      throw new Error("Preset not found");
    }

    return this.saveUserPreset({
      name: newName,
      description: preset.description,
      gridState: JSON.parse(JSON.stringify(preset.gridState)), // Deep clone
      tags: [],
    });
  }

  /**
   * Subscribe to preset changes
   */
  onPresetsChange(callback: PresetSystemEvents["onPresetsChange"]): () => void {
    this.presetsChangeListeners.add(callback);
    return () => {
      this.presetsChangeListeners.delete(callback);
    };
  }

  /**
   * Subscribe to default preset changes
   */
  onDefaultChange(callback: PresetSystemEvents["onDefaultChange"]): () => void {
    this.defaultChangeListeners.add(callback);
    return () => {
      this.defaultChangeListeners.delete(callback);
    };
  }

  /**
   * Get a preset by ID from either system or user presets
   */
  private getPresetById(id: string): FilterPreset | null {
    return this.systemPresets.get(id) || this.userPresets.get(id) || null;
  }

  /**
   * Generate a unique ID for user presets
   */
  private generateId(): string {
    return `user-preset-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  }

  /**
   * Load user presets and default from localStorage
   */
  private loadFromStorage(): void {
    try {
      // Load user presets
      const savedPresets = localStorage.getItem(this.storageKey);
      if (savedPresets) {
        const presets = JSON.parse(savedPresets) as UserPreset[];
        for (const preset of presets) {
          this.userPresets.set(preset.id, preset);
        }
        logger.info(`Loaded ${presets.length} user presets from storage`);
      }

      // Load default preset ID
      const defaultId = localStorage.getItem(this.defaultKey);
      if (defaultId) {
        this.defaultPresetId = defaultId;
        logger.info(`Loaded default preset: ${defaultId}`);
      }
    } catch (error) {
      logger.error("Failed to load from localStorage:", error);
    }
  }

  /**
   * Save user presets to localStorage
   */
  private saveToStorage(): void {
    try {
      const presets = Array.from(this.userPresets.values());
      localStorage.setItem(this.storageKey, JSON.stringify(presets));
      logger.debug(`Saved ${presets.length} user presets to storage`);
    } catch (error) {
      logger.error("Failed to save to localStorage:", error);
    }
  }

  /**
   * Notify listeners of preset changes
   */
  private notifyPresetsChange(): void {
    const presets = this.getAllPresets();
    this.presetsChangeListeners.forEach((listener) => {
      try {
        listener({
          system: presets.system,
          user: presets.user,
        });
      } catch (error) {
        logger.error("Error in preset change listener:", error);
      }
    });
  }

  /**
   * Notify listeners of default preset changes
   */
  private notifyDefaultChange(preset: FilterPreset | null): void {
    this.defaultChangeListeners.forEach((listener) => {
      try {
        listener(preset);
      } catch (error) {
        logger.error("Error in default change listener:", error);
      }
    });
  }
}
