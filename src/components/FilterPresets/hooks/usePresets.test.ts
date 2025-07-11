import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { usePresets } from "./usePresets";
import type { FilterPreset, PresetStorage } from "../types";

const mockSystemPresets: FilterPreset[] = [
  {
    id: "system-1",
    name: "Default View",
    filterModel: {},
    isSystem: true,
    isDefault: true,
  },
  {
    id: "system-2",
    name: "Recent Items",
    filterModel: {
      date: { type: "after", mode: "relative", expressionFrom: "Today-7d" },
    },
    isSystem: true,
  },
];

const mockUserPresets: FilterPreset[] = [
  {
    id: "user-1",
    name: "My Filter",
    description: "Custom filter",
    tags: ["custom"],
    filterModel: { status: { type: "equals", value: "active" } },
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
];

describe("usePresets", () => {
  let mockStorage: PresetStorage;
  let mockOnPresetChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockStorage = {
      load: vi.fn().mockResolvedValue(mockUserPresets),
      save: vi.fn().mockResolvedValue(undefined),
      getStorageInfo: vi
        .fn()
        .mockResolvedValue({ used: 50, total: 100, percentage: 50 }),
    };
    mockOnPresetChange = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should load presets from storage on mount", async () => {
      const { result } = renderHook(() =>
        usePresets({ storage: mockStorage, systemPresets: mockSystemPresets }),
      );

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockStorage.load).toHaveBeenCalled();
      expect(result.current.presets).toHaveLength(3); // 2 system + 1 user
      expect(result.current.error).toBeNull();
    });

    it("should combine system and user presets", async () => {
      const { result } = renderHook(() =>
        usePresets({ storage: mockStorage, systemPresets: mockSystemPresets }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const systemPresets = result.current.presets.filter((p) => p.isSystem);
      const userPresets = result.current.presets.filter((p) => !p.isSystem);

      expect(systemPresets).toHaveLength(2);
      expect(userPresets).toHaveLength(1);
    });

    it("should handle storage load errors", async () => {
      const error = new Error("Storage failed");
      mockStorage.load = vi.fn().mockRejectedValue(error);

      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe(error);
      expect(result.current.presets).toEqual([]);
    });

    it("should work without storage", () => {
      const { result } = renderHook(() =>
        usePresets({ systemPresets: mockSystemPresets }),
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.presets).toEqual(mockSystemPresets);
    });
  });

  describe("Preset Selection", () => {
    it("should select a preset", async () => {
      const { result } = renderHook(() =>
        usePresets({
          storage: mockStorage,
          systemPresets: mockSystemPresets,
          onPresetChange: mockOnPresetChange,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.selectPreset("user-1");
      });

      expect(result.current.activePresetId).toBe("user-1");
      expect(mockOnPresetChange).toHaveBeenCalledWith(mockUserPresets[0]);
    });

    it("should clear selection when null is passed", async () => {
      const { result } = renderHook(() =>
        usePresets({
          storage: mockStorage,
          onPresetChange: mockOnPresetChange,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.selectPreset("user-1");
      });

      act(() => {
        result.current.selectPreset(null);
      });

      expect(result.current.activePresetId).toBeNull();
      expect(mockOnPresetChange).toHaveBeenLastCalledWith(null);
    });

    it("should not select non-existent preset", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.selectPreset("non-existent");
      });

      expect(result.current.activePresetId).toBeNull();
    });
  });

  describe("Save Preset", () => {
    it("should save a new preset", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const newPreset = {
        name: "New Preset",
        description: "Test preset",
        filterModel: { test: { type: "equals", value: "test" } },
      };

      await act(async () => {
        await result.current.savePreset(newPreset);
      });

      expect(mockStorage.save).toHaveBeenCalled();
      const savedPresets = (mockStorage.save as any).mock.calls[0][0];
      expect(savedPresets).toHaveLength(2); // Original user preset + new one

      const saved = savedPresets.find(
        (p: FilterPreset) => p.name === "New Preset",
      );
      expect(saved).toBeDefined();
      expect(saved.id).toBeDefined();
      expect(saved.createdAt).toBeInstanceOf(Date);
      expect(saved.updatedAt).toBeInstanceOf(Date);
    });

    it("should set preset as default when isDefault is true", async () => {
      const { result } = renderHook(() =>
        usePresets({ storage: mockStorage, systemPresets: mockSystemPresets }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const newPreset = {
        name: "New Default",
        filterModel: {},
        isDefault: true,
      };

      await act(async () => {
        await result.current.savePreset(newPreset);
      });

      const savedPresets = (mockStorage.save as any).mock.calls[0][0];
      const newDefault = savedPresets.find(
        (p: FilterPreset) => p.name === "New Default",
      );
      const oldDefault = savedPresets.find(
        (p: FilterPreset) => p.id === "system-1",
      );

      expect(newDefault.isDefault).toBe(true);
      expect(oldDefault?.isDefault).toBeUndefined(); // System presets don't get modified
    });

    it("should handle save errors", async () => {
      const error = new Error("Save failed");
      mockStorage.save = vi.fn().mockRejectedValue(error);

      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        result.current.savePreset({ name: "Test", filterModel: {} }),
      ).rejects.toThrow("Save failed");
    });

    it("should respect maxPresets limit", async () => {
      const { result } = renderHook(() =>
        usePresets({ storage: mockStorage, maxPresets: 1 }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        result.current.savePreset({ name: "Over Limit", filterModel: {} }),
      ).rejects.toThrow(/maximum number of presets/i);
    });
  });

  describe("Update Preset", () => {
    it("should update an existing preset", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.updatePreset("user-1", {
          name: "Updated Name",
          description: "Updated description",
        });
      });

      expect(mockStorage.save).toHaveBeenCalled();
      const savedPresets = (mockStorage.save as any).mock.calls[0][0];
      const updated = savedPresets.find((p: FilterPreset) => p.id === "user-1");

      expect(updated.name).toBe("Updated Name");
      expect(updated.description).toBe("Updated description");
      expect(updated.updatedAt).toBeInstanceOf(Date);
      expect(updated.updatedAt.getTime()).toBeGreaterThan(
        new Date("2023-01-01").getTime(),
      );
    });

    it("should not update system presets", async () => {
      const { result } = renderHook(() =>
        usePresets({ storage: mockStorage, systemPresets: mockSystemPresets }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        result.current.updatePreset("system-1", { name: "Cannot Update" }),
      ).rejects.toThrow(/Cannot update system preset/i);
    });

    it("should not update non-existent preset", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        result.current.updatePreset("non-existent", { name: "Test" }),
      ).rejects.toThrow(/Preset not found/i);
    });
  });

  describe("Delete Presets", () => {
    it("should delete user presets", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.deletePresets(["user-1"]);
      });

      expect(mockStorage.save).toHaveBeenCalled();
      const savedPresets = (mockStorage.save as any).mock.calls[0][0];
      expect(savedPresets).toHaveLength(0);
    });

    it("should not delete system presets", async () => {
      const { result } = renderHook(() =>
        usePresets({ storage: mockStorage, systemPresets: mockSystemPresets }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.deletePresets(["system-1", "user-1"]);
      });

      expect(mockStorage.save).toHaveBeenCalled();
      const savedPresets = (mockStorage.save as any).mock.calls[0][0];
      expect(savedPresets).toHaveLength(0); // Only user preset deleted
    });

    it("should clear active preset if deleted", async () => {
      const { result } = renderHook(() =>
        usePresets({
          storage: mockStorage,
          onPresetChange: mockOnPresetChange,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.selectPreset("user-1");
      });

      await act(async () => {
        await result.current.deletePresets(["user-1"]);
      });

      expect(result.current.activePresetId).toBeNull();
      expect(mockOnPresetChange).toHaveBeenLastCalledWith(null);
    });
  });

  describe("Default Preset", () => {
    it("should set a preset as default", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setDefaultPreset("user-1");
      });

      expect(mockStorage.save).toHaveBeenCalled();
      const savedPresets = (mockStorage.save as any).mock.calls[0][0];
      const defaultPreset = savedPresets.find((p: FilterPreset) => p.isDefault);

      expect(defaultPreset?.id).toBe("user-1");
    });

    it("should clear default preset when null passed", async () => {
      const userPresetsWithDefault = [
        {
          ...mockUserPresets[0],
          isDefault: true,
        },
      ];
      mockStorage.load = vi.fn().mockResolvedValue(userPresetsWithDefault);

      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setDefaultPreset(null);
      });

      const savedPresets = (mockStorage.save as any).mock.calls[0][0];
      const defaultPreset = savedPresets.find((p: FilterPreset) => p.isDefault);

      expect(defaultPreset).toBeUndefined();
    });
  });

  describe("Export/Import", () => {
    it("should export all presets as JSON", async () => {
      const { result } = renderHook(() =>
        usePresets({ storage: mockStorage, systemPresets: mockSystemPresets }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const exported = result.current.exportPresets();
      const parsed = JSON.parse(exported);

      expect(parsed).toHaveProperty("version");
      expect(parsed).toHaveProperty("presets");
      expect(parsed.presets).toHaveLength(1); // Only user presets exported
    });

    it("should export specific presets", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Add another preset
      await act(async () => {
        await result.current.savePreset({ name: "Another", filterModel: {} });
      });

      const exported = result.current.exportPresets(["user-1"]);
      const parsed = JSON.parse(exported);

      expect(parsed.presets).toHaveLength(1);
      expect(parsed.presets[0].id).toBe("user-1");
    });

    it("should import presets from JSON", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const importData = JSON.stringify({
        version: "1.0",
        presets: [
          {
            id: "imported-1",
            name: "Imported Preset",
            filterModel: {},
            createdAt: "2023-06-01T00:00:00.000Z",
          },
        ],
      });

      await act(async () => {
        await result.current.importPresets(importData);
      });

      expect(mockStorage.save).toHaveBeenCalled();
      const savedPresets = (mockStorage.save as any).mock.calls[0][0];

      expect(savedPresets).toHaveLength(2); // Original + imported
      const imported = savedPresets.find(
        (p: FilterPreset) => p.name === "Imported Preset",
      );
      expect(imported).toBeDefined();
      expect(imported.id).not.toBe("imported-1"); // Should generate new ID
    });

    it("should handle invalid import data", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        result.current.importPresets("invalid json"),
      ).rejects.toThrow();

      await expect(result.current.importPresets("{}")).rejects.toThrow(
        /Invalid preset data/i,
      );
    });
  });

  describe("Storage Info", () => {
    it("should load storage info on mount", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.storageInfo).toEqual({
        used: 50,
        total: 100,
        percentage: 50,
      });
    });

    it("should refresh storage info", async () => {
      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      mockStorage.getStorageInfo = vi.fn().mockResolvedValue({
        used: 75,
        total: 100,
        percentage: 75,
      });

      await act(async () => {
        await result.current.refreshStorageInfo();
      });

      expect(result.current.storageInfo).toEqual({
        used: 75,
        total: 100,
        percentage: 75,
      });
    });

    it("should handle missing getStorageInfo method", async () => {
      mockStorage.getStorageInfo = undefined;

      const { result } = renderHook(() => usePresets({ storage: mockStorage }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.storageInfo).toBeNull();
    });
  });
});
