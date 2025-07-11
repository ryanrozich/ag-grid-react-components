import React, { useState, useCallback, useEffect, useMemo } from "react";
import type { FilterPresetManagerProps, FilterPreset } from "./types";
import { PresetSelector } from "./components/PresetSelector";
import { PresetMenu } from "./components/PresetMenu";
import { LocalStorageManager } from "./utils/storage";
import styles from "./FilterPresetManager.module.css";

/**
 * FilterPresetManager - A comprehensive filter preset management system for AG Grid
 *
 * @example
 * ```tsx
 * <FilterPresetManager
 *   api={gridApi}
 *   gridId="project-tasks"
 *   onPresetApplied={(preset) => console.log('Applied:', preset.name)}
 * />
 * ```
 */
export const FilterPresetManager: React.FC<FilterPresetManagerProps> = ({
  api,
  gridId,
  onPresetApplied,
  maxPresets = 50,
  allowedCategories,
  storagePrefix = "ag-grid-presets",
  className = "",
  enableMigration = true,
}) => {
  // Validate required props
  if (!gridId) {
    throw new Error(
      "FilterPresetManager: 'gridId' prop is required. " +
        "Please provide a unique, stable identifier for this grid instance. " +
        'Example: gridId="project-tasks"',
    );
  }

  if (!api) {
    throw new Error("FilterPresetManager: 'api' prop is required.");
  }

  // Initialize storage manager with custom prefix if provided
  const storage = useMemo(
    () => new LocalStorageManager(storagePrefix),
    [storagePrefix],
  );

  // Load presets from storage
  const [presets, setPresets] = useState<FilterPreset[]>(() => {
    return storage.getPresets(gridId);
  });

  // Handle migration on mount
  useEffect(() => {
    if (enableMigration && presets.length === 0) {
      // Try to migrate from old storage format
      const migrated = storage.migratePresets("ag-grid-filter-presets", gridId);
      if (migrated) {
        // Reload presets after migration
        setPresets(storage.getPresets(gridId));
      }
    }
  }, [enableMigration, gridId, storage, presets.length]);

  // Save presets to storage whenever they change
  const handlePresetsChange = useCallback(
    (newPresets: FilterPreset[]) => {
      storage.savePresets(gridId, newPresets);
      setPresets(newPresets);
    },
    [gridId, storage],
  );

  // Handle preset selection
  const handlePresetSelect = useCallback(
    (preset: FilterPreset) => {
      onPresetApplied?.(preset);
    },
    [onPresetApplied],
  );

  return (
    <div className={`${styles.container} ${className}`}>
      <PresetSelector
        api={api}
        presets={presets}
        onPresetSelect={handlePresetSelect}
        className={styles.selector}
      />
      <PresetMenu
        api={api}
        gridId={gridId}
        presets={presets}
        onPresetsChange={handlePresetsChange}
        maxPresets={maxPresets}
        allowedCategories={allowedCategories}
        className={styles.menu}
      />
    </div>
  );
};

// Re-export types for convenience
export type { FilterPreset, FilterPresetManagerProps } from "./types";
