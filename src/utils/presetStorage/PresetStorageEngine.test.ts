import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { PresetStorageEngine } from "./PresetStorageEngine";
import type {
  FilterPreset,
  StorageAdapter,
  PresetStorageOptions,
} from "./types";
import { logger } from "../logger";

vi.mock("../logger", () => ({
  logger: {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
  },
}));

class MockStorageAdapter implements StorageAdapter {
  private storage = new Map<string, string>();

  async getItem(key: string): Promise<string | null> {
    return this.storage.get(key) || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }

  async getAllKeys(): Promise<string[]> {
    return Array.from(this.storage.keys());
  }
}

describe("PresetStorageEngine", () => {
  let engine: PresetStorageEngine;
  let mockAdapter: MockStorageAdapter;
  let mockOnSyncUpdate: ReturnType<typeof vi.fn>;
  let mockOnStorageQuotaExceeded: ReturnType<typeof vi.fn>;

  const createMockPreset = (
    overrides: Partial<FilterPreset> = {},
  ): FilterPreset => ({
    id: "test-id",
    name: "Test Preset",
    gridState: {
      filters: { column1: { type: "equals", filter: "value" } },
      columns: [],
      sort: [],
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    ...overrides,
  });

  beforeEach(() => {
    mockAdapter = new MockStorageAdapter();
    mockOnSyncUpdate = vi.fn();
    mockOnStorageQuotaExceeded = vi.fn();

    const options: PresetStorageOptions = {
      adapter: mockAdapter,
      onSyncUpdate: mockOnSyncUpdate,
      onStorageQuotaExceeded: mockOnStorageQuotaExceeded,
    };

    engine = new PresetStorageEngine(options);
  });

  afterEach(() => {
    engine.destroy();
    vi.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with default options", () => {
      const defaultEngine = new PresetStorageEngine();
      expect(defaultEngine).toBeDefined();
      defaultEngine.destroy();
    });

    it("should accept custom options", () => {
      const customOptions: PresetStorageOptions = {
        storageKey: "custom-key",
        maxPresets: 100,
      };
      const customEngine = new PresetStorageEngine(customOptions);
      expect(customEngine).toBeDefined();
      customEngine.destroy();
    });
  });

  describe("getAllPresets", () => {
    it("should return empty array when no presets exist", async () => {
      const presets = await engine.getAllPresets();
      expect(presets).toEqual([]);
    });

    it("should return all stored presets", async () => {
      const preset1 = createMockPreset({ id: "1", name: "Preset 1" });
      const preset2 = createMockPreset({ id: "2", name: "Preset 2" });

      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [preset1, preset2],
        }),
      );

      const presets = await engine.getAllPresets();
      expect(presets).toHaveLength(2);
      expect(presets).toEqual([preset1, preset2]);
    });

    it("should handle corrupted storage data", async () => {
      await mockAdapter.setItem("ag-grid-filter-presets", "invalid json");

      const presets = await engine.getAllPresets();
      expect(presets).toEqual([]);
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to parse storage state",
        expect.any(Object),
      );
    });
  });

  describe("getPreset", () => {
    it("should return preset by id", async () => {
      const preset = createMockPreset({ id: "test-123" });
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [preset],
        }),
      );

      const result = await engine.getPreset("test-123");
      expect(result).toEqual(preset);
    });

    it("should return null for non-existent preset", async () => {
      const result = await engine.getPreset("non-existent");
      expect(result).toBeNull();
    });
  });

  describe("getDefaultPreset", () => {
    it("should return null when no default preset is set", async () => {
      const result = await engine.getDefaultPreset();
      expect(result).toBeNull();
    });

    it("should return the default preset", async () => {
      const preset = createMockPreset({ id: "default-123", isDefault: true });
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [preset],
          defaultPresetId: "default-123",
        }),
      );

      const result = await engine.getDefaultPreset();
      expect(result).toEqual(preset);
    });
  });

  describe("savePreset", () => {
    it("should save a new preset", async () => {
      const preset = await engine.savePreset({
        name: "New Preset",
        gridState: {
          filters: {},
          columns: [],
          sort: [],
        },
      });

      expect(preset).toMatchObject({
        name: "New Preset",
        isDefault: false,
        isSystem: false,
      });
      expect(preset.id).toBeDefined();
      expect(preset.createdAt).toBeDefined();
      expect(preset.updatedAt).toBeDefined();
      expect(logger.info).toHaveBeenCalledWith(
        "Preset saved",
        expect.any(Object),
      );
    });

    it("should validate required fields", async () => {
      await expect(engine.savePreset({})).rejects.toThrow("Validation failed");
      await expect(engine.savePreset({ name: "" })).rejects.toThrow(
        "Validation failed",
      );
      await expect(engine.savePreset({ name: "Test" })).rejects.toThrow(
        "Validation failed",
      );
    });

    it("should set preset as default", async () => {
      const preset = await engine.savePreset({
        name: "Default Preset",
        gridState: { filters: {}, columns: [], sort: [] },
        isDefault: true,
      });

      expect(preset.isDefault).toBe(true);

      const defaultPreset = await engine.getDefaultPreset();
      expect(defaultPreset?.id).toBe(preset.id);
    });

    it("should enforce max presets limit", async () => {
      const engineWithLimit = new PresetStorageEngine({
        adapter: mockAdapter,
        maxPresets: 2,
      });

      await engineWithLimit.savePreset({
        name: "Preset 1",
        gridState: { filters: {}, columns: [], sort: [] },
      });

      await engineWithLimit.savePreset({
        name: "Preset 2",
        gridState: { filters: {}, columns: [], sort: [] },
      });

      await expect(
        engineWithLimit.savePreset({
          name: "Preset 3",
          gridState: { filters: {}, columns: [], sort: [] },
        }),
      ).rejects.toThrow("Maximum number of presets (2) reached");

      engineWithLimit.destroy();
    });

    it("should handle storage quota exceeded", async () => {
      const quotaError = new DOMException("QuotaExceededError");
      Object.defineProperty(quotaError, "name", {
        value: "QuotaExceededError",
      });

      mockAdapter.setItem = vi.fn().mockRejectedValue(quotaError);

      await expect(
        engine.savePreset({
          name: "Test",
          gridState: { filters: {}, columns: [], sort: [] },
        }),
      ).rejects.toThrow();

      expect(mockOnStorageQuotaExceeded).toHaveBeenCalledWith(quotaError);
    });
  });

  describe("updatePreset", () => {
    beforeEach(async () => {
      const preset = createMockPreset({ id: "update-test" });
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [preset],
        }),
      );
    });

    it("should update existing preset", async () => {
      const updated = await engine.updatePreset("update-test", {
        name: "Updated Name",
        description: "Updated description",
      });

      expect(updated.name).toBe("Updated Name");
      expect(updated.description).toBe("Updated description");
      expect(updated.updatedAt).not.toBe("2024-01-01T00:00:00.000Z");
      expect(logger.info).toHaveBeenCalledWith(
        "Preset updated",
        expect.any(Object),
      );
    });

    it("should throw error for non-existent preset", async () => {
      await expect(
        engine.updatePreset("non-existent", { name: "Test" }),
      ).rejects.toThrow("Preset with id non-existent not found");
    });

    it("should prevent modification of system presets", async () => {
      const systemPreset = createMockPreset({ id: "system-1", isSystem: true });
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [systemPreset],
        }),
      );

      await expect(
        engine.updatePreset("system-1", { name: "Modified" }),
      ).rejects.toThrow("Cannot modify system presets");
    });

    it("should handle setting/unsetting default", async () => {
      const updated = await engine.updatePreset("update-test", {
        isDefault: true,
      });
      expect(updated.isDefault).toBe(true);

      const state = await engine.getDefaultPreset();
      expect(state?.id).toBe("update-test");

      const updated2 = await engine.updatePreset("update-test", {
        isDefault: false,
      });
      expect(updated2.isDefault).toBe(false);

      const state2 = await engine.getDefaultPreset();
      expect(state2).toBeNull();
    });
  });

  describe("deletePreset", () => {
    beforeEach(async () => {
      const preset1 = createMockPreset({ id: "delete-1" });
      const preset2 = createMockPreset({ id: "delete-2", isSystem: true });
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [preset1, preset2],
        }),
      );
    });

    it("should delete user preset", async () => {
      await engine.deletePreset("delete-1");

      const presets = await engine.getAllPresets();
      expect(presets).toHaveLength(1);
      expect(presets[0].id).toBe("delete-2");
      expect(logger.info).toHaveBeenCalledWith(
        "Preset deleted",
        expect.any(Object),
      );
    });

    it("should throw error for non-existent preset", async () => {
      await expect(engine.deletePreset("non-existent")).rejects.toThrow(
        "Preset with id non-existent not found",
      );
    });

    it("should prevent deletion of system presets", async () => {
      await expect(engine.deletePreset("delete-2")).rejects.toThrow(
        "Cannot delete system presets",
      );
    });

    it("should clear default preset if deleted", async () => {
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [createMockPreset({ id: "default-del", isDefault: true })],
          defaultPresetId: "default-del",
        }),
      );

      await engine.deletePreset("default-del");

      const defaultPreset = await engine.getDefaultPreset();
      expect(defaultPreset).toBeNull();
    });
  });

  describe("setDefaultPreset", () => {
    beforeEach(async () => {
      const preset1 = createMockPreset({ id: "preset-1" });
      const preset2 = createMockPreset({ id: "preset-2", isSystem: true });
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [preset1, preset2],
        }),
      );
    });

    it("should set default preset", async () => {
      await engine.setDefaultPreset("preset-1");

      const defaultPreset = await engine.getDefaultPreset();
      expect(defaultPreset?.id).toBe("preset-1");
      expect(logger.info).toHaveBeenCalledWith("Default preset updated", {
        id: "preset-1",
      });
    });

    it("should clear default preset with null", async () => {
      await engine.setDefaultPreset("preset-1");
      await engine.setDefaultPreset(null);

      const defaultPreset = await engine.getDefaultPreset();
      expect(defaultPreset).toBeNull();
    });

    it("should throw error for non-existent preset", async () => {
      await expect(engine.setDefaultPreset("non-existent")).rejects.toThrow(
        "Preset with id non-existent not found",
      );
    });

    it("should prevent setting system preset as default", async () => {
      await expect(engine.setDefaultPreset("preset-2")).rejects.toThrow(
        "Cannot set system preset as default",
      );
    });
  });

  describe("clearAllUserPresets", () => {
    it("should remove all user presets but keep system presets", async () => {
      const userPreset = createMockPreset({ id: "user-1" });
      const systemPreset = createMockPreset({ id: "system-1", isSystem: true });

      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [userPreset, systemPreset],
          defaultPresetId: "user-1",
        }),
      );

      await engine.clearAllUserPresets();

      const presets = await engine.getAllPresets();
      expect(presets).toHaveLength(1);
      expect(presets[0].id).toBe("system-1");

      const defaultPreset = await engine.getDefaultPreset();
      expect(defaultPreset).toBeNull();

      expect(logger.info).toHaveBeenCalledWith("All user presets cleared");
    });
  });

  describe("exportPresets", () => {
    beforeEach(async () => {
      const preset1 = createMockPreset({ id: "export-1" });
      const preset2 = createMockPreset({ id: "export-2" });
      const systemPreset = createMockPreset({ id: "system-1", isSystem: true });

      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [preset1, preset2, systemPreset],
        }),
      );
    });

    it("should export all user presets by default", async () => {
      const exported = await engine.exportPresets();
      const parsed = JSON.parse(exported);

      expect(parsed).toHaveLength(2);
      expect(parsed.map((p: FilterPreset) => p.id)).toEqual([
        "export-1",
        "export-2",
      ]);
    });

    it("should export specific presets by id", async () => {
      const exported = await engine.exportPresets(["export-2", "system-1"]);
      const parsed = JSON.parse(exported);

      expect(parsed).toHaveLength(2);
      expect(parsed.map((p: FilterPreset) => p.id)).toEqual([
        "export-2",
        "system-1",
      ]);
    });
  });

  describe("importPresets", () => {
    it("should import presets with merge", async () => {
      const existingPreset = createMockPreset({ id: "existing-1" });
      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [existingPreset],
        }),
      );

      const importData = JSON.stringify([
        createMockPreset({ id: "import-1", name: "Imported 1" }),
        createMockPreset({ id: "import-2", name: "Imported 2" }),
      ]);

      const imported = await engine.importPresets(importData, { merge: true });

      expect(imported).toHaveLength(2);
      expect(imported[0].name).toBe("Imported 1");
      expect(imported[1].name).toBe("Imported 2");

      const allPresets = await engine.getAllPresets();
      expect(allPresets).toHaveLength(3);

      expect(logger.info).toHaveBeenCalledWith(
        "Presets imported",
        expect.any(Object),
      );
    });

    it("should import presets without merge", async () => {
      const existingPreset = createMockPreset({ id: "existing-1" });
      const systemPreset = createMockPreset({ id: "system-1", isSystem: true });

      await mockAdapter.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          presets: [existingPreset, systemPreset],
        }),
      );

      const importData = JSON.stringify([
        createMockPreset({ id: "import-1", name: "Imported 1" }),
      ]);

      await engine.importPresets(importData, { merge: false });

      const allPresets = await engine.getAllPresets();
      expect(allPresets).toHaveLength(2);
      expect(allPresets.map((p) => p.id)).toEqual([
        "system-1",
        expect.any(String),
      ]);
    });

    it("should handle invalid import data", async () => {
      await expect(engine.importPresets("not json")).rejects.toThrow(
        "Failed to parse import data",
      );

      await expect(engine.importPresets("{}")).rejects.toThrow(
        "Invalid import data: expected array of presets",
      );
    });

    it("should skip invalid presets during import", async () => {
      const importData = JSON.stringify([
        {
          name: "Valid",
          gridState: { filters: {}, columns: [], sort: [] },
        },
        { name: "" }, // Invalid - empty name
        { gridState: {} }, // Invalid - no name
      ]);

      const imported = await engine.importPresets(importData);
      expect(imported).toHaveLength(1);
      expect(imported[0].name).toBe("Valid");
      expect(logger.warn).toHaveBeenCalledTimes(2);
    });

    it("should enforce max presets limit during import", async () => {
      const engineWithLimit = new PresetStorageEngine({
        adapter: mockAdapter,
        maxPresets: 2,
      });

      const importData = JSON.stringify([
        createMockPreset({ name: "Import 1" }),
        createMockPreset({ name: "Import 2" }),
        createMockPreset({ name: "Import 3" }),
      ]);

      await expect(engineWithLimit.importPresets(importData)).rejects.toThrow(
        "Import would exceed maximum preset limit (2)",
      );

      engineWithLimit.destroy();
    });
  });

  describe("cross-tab synchronization", () => {
    it("should handle storage events", async () => {
      const newState = {
        presets: [createMockPreset({ id: "sync-1" })],
      };

      const event = new StorageEvent("storage", {
        key: "ag-grid-filter-presets",
        newValue: JSON.stringify(newState),
      });

      window.dispatchEvent(event);

      expect(mockOnSyncUpdate).toHaveBeenCalledWith(newState.presets);
    });

    it("should ignore events with null newValue", () => {
      const event = new StorageEvent("storage", {
        key: "ag-grid-filter-presets",
        newValue: null,
      });

      window.dispatchEvent(event);

      expect(mockOnSyncUpdate).not.toHaveBeenCalled();
    });

    it("should ignore events with different key", () => {
      const event = new StorageEvent("storage", {
        key: "other-key",
        newValue: JSON.stringify({ presets: [] }),
      });

      window.dispatchEvent(event);

      expect(mockOnSyncUpdate).not.toHaveBeenCalled();
    });

    it("should handle parse errors in storage events", () => {
      const event = new StorageEvent("storage", {
        key: "ag-grid-filter-presets",
        newValue: "invalid json",
      });

      window.dispatchEvent(event);

      // parseStorageState logs error and returns empty presets array
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to parse storage state",
        expect.any(Object),
      );
      // onSyncUpdate is still called with empty presets array
      expect(mockOnSyncUpdate).toHaveBeenCalledWith([]);
    });
  });

  describe("destroy", () => {
    it("should remove event listeners", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      engine.destroy();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "storage",
        expect.any(Function),
      );
    });
  });
});
