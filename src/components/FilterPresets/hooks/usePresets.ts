import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  FilterPreset,
  UsePresetsOptions,
  UsePresetsReturn,
  StorageInfo,
} from "../types";

function generateId(): string {
  return `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function usePresets({
  storage,
  systemPresets = [],
  onPresetChange,
  maxPresets = 50,
}: UsePresetsOptions = {}): UsePresetsReturn {
  const [userPresets, setUserPresets] = useState<FilterPreset[]>([]);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Combine system and user presets
  const presets = useMemo(() => {
    return [...systemPresets, ...userPresets];
  }, [systemPresets, userPresets]);

  // Load presets from storage
  useEffect(() => {
    if (!storage) return;

    const loadPresets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const loaded = await storage.load();
        setUserPresets(loaded);

        if (storage.getStorageInfo) {
          const info = await storage.getStorageInfo();
          setStorageInfo(info);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load presets"),
        );
        setUserPresets([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPresets();
  }, [storage]);

  // Save user presets to storage
  const saveToStorage = useCallback(
    async (presets: FilterPreset[]) => {
      if (!storage) return;

      await storage.save(presets);
      setUserPresets(presets);

      if (storage.getStorageInfo) {
        const info = await storage.getStorageInfo();
        setStorageInfo(info);
      }
    },
    [storage],
  );

  // Select a preset
  const selectPreset = useCallback(
    (presetId: string | null) => {
      if (presetId === null) {
        setActivePresetId(null);
        onPresetChange?.(null);
        return;
      }

      const preset = presets.find((p) => p.id === presetId);
      if (preset) {
        setActivePresetId(presetId);
        onPresetChange?.(preset);
      }
    },
    [presets, onPresetChange],
  );

  // Save a new preset
  const savePreset = useCallback(
    async (preset: Partial<FilterPreset>) => {
      if (userPresets.length >= maxPresets) {
        throw new Error(
          `Cannot save preset: maximum number of presets (${maxPresets}) reached`,
        );
      }

      const now = new Date();
      const newPreset: FilterPreset = {
        id: generateId(),
        name: preset.name || "Untitled Preset",
        description: preset.description,
        tags: preset.tags,
        filterModel: preset.filterModel || {},
        isDefault: preset.isDefault,
        createdAt: now,
        updatedAt: now,
      };

      let updatedPresets = [...userPresets];

      // If setting as default, clear other defaults
      if (newPreset.isDefault) {
        updatedPresets = updatedPresets.map((p) => ({
          ...p,
          isDefault: false,
        }));
      }

      updatedPresets.push(newPreset);
      await saveToStorage(updatedPresets);
    },
    [userPresets, maxPresets, saveToStorage],
  );

  // Update an existing preset
  const updatePreset = useCallback(
    async (id: string, updates: Partial<FilterPreset>) => {
      const preset = presets.find((p) => p.id === id);
      if (!preset) {
        throw new Error("Preset not found");
      }
      if (preset.isSystem) {
        throw new Error("Cannot update system presets");
      }

      let updatedPresets = userPresets.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updates,
            id: p.id, // Prevent ID changes
            isSystem: false, // Prevent making it system
            updatedAt: new Date(),
          };
        }
        return p;
      });

      // If setting as default, clear other defaults
      if (updates.isDefault) {
        updatedPresets = updatedPresets.map((p) => ({
          ...p,
          isDefault: p.id === id,
        }));
      }

      await saveToStorage(updatedPresets);
    },
    [presets, userPresets, saveToStorage],
  );

  // Delete presets
  const deletePresets = useCallback(
    async (ids: string[]) => {
      const idsToDelete = new Set(ids);

      // Filter out system presets from deletion
      const userPresetsToDelete = userPresets
        .filter((p) => idsToDelete.has(p.id))
        .map((p) => p.id);

      if (userPresetsToDelete.length === 0) return;

      const updatedPresets = userPresets.filter((p) => !idsToDelete.has(p.id));
      await saveToStorage(updatedPresets);

      // Clear active preset if it was deleted
      if (activePresetId && idsToDelete.has(activePresetId)) {
        selectPreset(null);
      }
    },
    [userPresets, activePresetId, selectPreset, saveToStorage],
  );

  // Set default preset
  const setDefaultPreset = useCallback(
    async (id: string | null) => {
      if (id === null) {
        // Clear all defaults
        const updatedPresets = userPresets.map((p) => ({
          ...p,
          isDefault: false,
        }));
        await saveToStorage(updatedPresets);
        return;
      }

      const preset = presets.find((p) => p.id === id);
      if (!preset) {
        throw new Error("Preset not found");
      }
      if (preset.isSystem) {
        throw new Error("Cannot set system preset as default");
      }

      const updatedPresets = userPresets.map((p) => ({
        ...p,
        isDefault: p.id === id,
        updatedAt: p.id === id ? new Date() : p.updatedAt,
      }));

      await saveToStorage(updatedPresets);
    },
    [presets, userPresets, saveToStorage],
  );

  // Export presets
  const exportPresets = useCallback(
    (ids?: string[]) => {
      const presetsToExport = ids
        ? userPresets.filter((p) => ids.includes(p.id))
        : userPresets;

      return JSON.stringify(
        {
          version: "1.0",
          exportedAt: new Date().toISOString(),
          presets: presetsToExport,
        },
        null,
        2,
      );
    },
    [userPresets],
  );

  // Import presets
  const importPresets = useCallback(
    async (data: string) => {
      try {
        const parsed = JSON.parse(data);

        if (!parsed.presets || !Array.isArray(parsed.presets)) {
          throw new Error("Invalid preset data format");
        }

        const importedPresets: FilterPreset[] = parsed.presets.map(
          (p: unknown) => {
            const preset = p as Record<string, unknown>;
            return {
              ...preset,
              id: generateId(), // Generate new IDs to avoid conflicts
              createdAt: new Date((preset.createdAt as string) || Date.now()),
              updatedAt: new Date((preset.updatedAt as string) || Date.now()),
              isDefault: false, // Don't import default status
            } as FilterPreset;
          },
        );

        const newTotal = userPresets.length + importedPresets.length;
        if (newTotal > maxPresets) {
          throw new Error(
            `Cannot import presets: would exceed maximum (${maxPresets})`,
          );
        }

        const updatedPresets = [...userPresets, ...importedPresets];
        await saveToStorage(updatedPresets);
      } catch (err) {
        if (err instanceof SyntaxError) {
          throw new Error("Invalid JSON format");
        }
        throw err;
      }
    },
    [userPresets, maxPresets, saveToStorage],
  );

  // Refresh storage info
  const refreshStorageInfo = useCallback(async () => {
    if (!storage?.getStorageInfo) return;

    const info = await storage.getStorageInfo();
    setStorageInfo(info);
  }, [storage]);

  return {
    presets,
    activePresetId,
    storageInfo,
    isLoading,
    error,
    selectPreset,
    addPreset: savePreset, // alias for compatibility
    savePreset,
    updatePreset,
    deletePresets,
    setDefaultPreset,
    exportPresets,
    importPresets,
    refreshStorageInfo,
  };
}
