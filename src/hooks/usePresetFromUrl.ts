import { useState, useEffect, useCallback } from "react";
import { extractPresetFromUrl } from "../utils/presetSharing";
import type { FilterPreset } from "../utils/presetSharing/types";

export interface UsePresetFromUrlOptions {
  /** Function to load preset by ID (for reference mode) */
  loadPresetById?: (id: string) => Promise<FilterPreset>;
  /** Whether to auto-load presets when ID is found (default: true) */
  autoLoad?: boolean;
}

export interface UsePresetFromUrlResult {
  /** The preset data if embedded in URL */
  preset: FilterPreset | null;
  /** The preset ID if in reference mode */
  presetId: string | null;
  /** Loading state */
  loading: boolean;
  /** Error if any */
  error: string | null;
  /** Manually load preset (useful when autoLoad is false) */
  loadPreset: () => Promise<void>;
  /** Clear the current preset */
  clearPreset: () => void;
}

/**
 * Hook to extract and manage filter presets from URLs
 * @param options - Hook options
 * @returns Preset data and utilities
 */
export function usePresetFromUrl(
  options: UsePresetFromUrlOptions = {},
): UsePresetFromUrlResult {
  const { loadPresetById, autoLoad = true } = options;

  const [preset, setPreset] = useState<FilterPreset | null>(null);
  const [presetId, setPresetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse URL and extract preset data
  const parseUrl = useCallback(() => {
    try {
      const result = extractPresetFromUrl();

      if (result.error) {
        setError(result.error);
        setPreset(null);
        setPresetId(null);
        return;
      }

      setError(null);

      if (result.preset) {
        // Embedded preset
        setPreset(result.preset);
        setPresetId(null);
      } else if (result.presetId) {
        // Reference mode
        setPresetId(result.presetId);
        if (!loadPresetById) {
          // No loader provided, just store the ID
          setPreset(null);
        } else if (autoLoad) {
          // Auto-load the preset
          loadPresetData(result.presetId);
        }
      } else {
        // No preset in URL
        setPreset(null);
        setPresetId(null);
      }
    } catch (err) {
      console.error("[usePresetFromUrl] Failed to parse URL:", err);
      setError("Failed to parse preset from URL");
      setPreset(null);
      setPresetId(null);
    }
  }, [autoLoad, loadPresetById]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load preset data by ID
  const loadPresetData = useCallback(
    async (id: string) => {
      if (!loadPresetById) return;

      setLoading(true);
      setError(null);

      try {
        const loadedPreset = await loadPresetById(id);
        setPreset(loadedPreset);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(`Failed to load preset: ${message}`);
        setPreset(null);
      } finally {
        setLoading(false);
      }
    },
    [loadPresetById],
  );

  // Manual load function
  const loadPreset = useCallback(async () => {
    if (presetId && loadPresetById) {
      await loadPresetData(presetId);
    }
  }, [presetId, loadPresetById, loadPresetData]);

  // Clear preset
  const clearPreset = useCallback(() => {
    setPreset(null);
    setPresetId(null);
    setError(null);
  }, []);

  // Parse URL on mount and when it changes
  useEffect(() => {
    parseUrl();
  }, [parseUrl]);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      parseUrl();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [parseUrl]);

  return {
    preset,
    presetId,
    loading,
    error,
    loadPreset,
    clearPreset,
  };
}
