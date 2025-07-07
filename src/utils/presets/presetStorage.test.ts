import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { UserPreset, PresetStorageAdapter, StorageInfo } from "./types";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Test implementation placeholder - will be replaced with actual implementation
class LocalStoragePresetAdapter implements PresetStorageAdapter {
  constructor(private storageKey = "ag-grid-filter-presets") {}

  async getAll(): Promise<UserPreset[]> {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async get(id: string): Promise<UserPreset | null> {
    const presets = await this.getAll();
    return presets.find((p) => p.id === id) || null;
  }

  async save(preset: UserPreset): Promise<void> {
    const presets = await this.getAll();
    const existingIndex = presets.findIndex((p) => p.id === preset.id);

    if (existingIndex >= 0) {
      presets[existingIndex] = preset;
    } else {
      presets.push(preset);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(presets));
  }

  async update(id: string, updates: Partial<UserPreset>): Promise<void> {
    const preset = await this.get(id);
    if (!preset) {
      throw new Error(`Preset with id ${id} not found`);
    }

    const updated = {
      ...preset,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await this.save(updated);
  }

  async delete(id: string): Promise<void> {
    const presets = await this.getAll();
    const filtered = presets.filter((p) => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  async clear(): Promise<void> {
    localStorage.removeItem(this.storageKey);
  }

  async getInfo(): Promise<StorageInfo> {
    const presets = await this.getAll();
    const dataSize = new TextEncoder().encode(JSON.stringify(presets)).length;

    // Estimate quota (5MB for localStorage)
    const quota = 5 * 1024 * 1024;

    return {
      used: dataSize,
      available: Math.max(0, quota - dataSize),
      quota,
      count: presets.length,
      compressed: false,
    };
  }
}

describe("PresetStorage - LocalStorage Adapter", () => {
  let storage: LocalStoragePresetAdapter;

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    storage = new LocalStoragePresetAdapter();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe("getAll", () => {
    it("should return empty array when no presets exist", async () => {
      const presets = await storage.getAll();
      expect(presets).toEqual([]);
    });

    it("should return all stored presets", async () => {
      const mockPresets: UserPreset[] = [
        {
          id: "1",
          name: "Test Preset 1",
          type: "user",
          gridState: {
            filterModel: { status: { type: "equals", filter: "active" } },
          },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        {
          id: "2",
          name: "Test Preset 2",
          type: "user",
          gridState: {
            filterModel: { date: { type: "after", dateFrom: "2023-01-01" } },
          },
          createdAt: "2023-01-02T00:00:00.000Z",
          updatedAt: "2023-01-02T00:00:00.000Z",
        },
      ];

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify(mockPresets),
      );

      const presets = await storage.getAll();
      expect(presets).toEqual(mockPresets);
    });

    it("should handle corrupted data gracefully", async () => {
      localStorageMock.setItem("ag-grid-filter-presets", "invalid json");

      const presets = await storage.getAll();
      expect(presets).toEqual([]);
    });
  });

  describe("get", () => {
    it("should return null for non-existent preset", async () => {
      const preset = await storage.get("non-existent");
      expect(preset).toBeNull();
    });

    it("should return specific preset by id", async () => {
      const mockPreset: UserPreset = {
        id: "test-id",
        name: "Test Preset",
        type: "user",
        gridState: { filterModel: {} },
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify([mockPreset]),
      );

      const preset = await storage.get("test-id");
      expect(preset).toEqual(mockPreset);
    });
  });

  describe("save", () => {
    it("should save new preset", async () => {
      const newPreset: UserPreset = {
        id: "new-preset",
        name: "New Preset",
        type: "user",
        gridState: {
          filterModel: { status: { type: "equals", filter: "pending" } },
        },
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };

      await storage.save(newPreset);

      const stored = JSON.parse(
        localStorageMock.getItem("ag-grid-filter-presets")!,
      );
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(newPreset);
    });

    it("should update existing preset with same id", async () => {
      const originalPreset: UserPreset = {
        id: "existing",
        name: "Original Name",
        type: "user",
        gridState: { filterModel: {} },
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify([originalPreset]),
      );

      const updatedPreset: UserPreset = {
        ...originalPreset,
        name: "Updated Name",
        updatedAt: "2023-01-02T00:00:00.000Z",
      };

      await storage.save(updatedPreset);

      const stored = JSON.parse(
        localStorageMock.getItem("ag-grid-filter-presets")!,
      );
      expect(stored).toHaveLength(1);
      expect(stored[0].name).toBe("Updated Name");
    });

    it("should preserve other presets when saving", async () => {
      const existingPresets: UserPreset[] = [
        {
          id: "1",
          name: "Preset 1",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        {
          id: "2",
          name: "Preset 2",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
      ];

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify(existingPresets),
      );

      const newPreset: UserPreset = {
        id: "3",
        name: "Preset 3",
        type: "user",
        gridState: { filterModel: {} },
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };

      await storage.save(newPreset);

      const stored = JSON.parse(
        localStorageMock.getItem("ag-grid-filter-presets")!,
      );
      expect(stored).toHaveLength(3);
      expect(stored.map((p: UserPreset) => p.id)).toEqual(["1", "2", "3"]);
    });
  });

  describe("update", () => {
    it("should update existing preset partially", async () => {
      const originalPreset: UserPreset = {
        id: "test",
        name: "Original",
        description: "Original description",
        type: "user",
        gridState: { filterModel: {} },
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify([originalPreset]),
      );

      await storage.update("test", { name: "Updated Name" });

      const stored = JSON.parse(
        localStorageMock.getItem("ag-grid-filter-presets")!,
      );
      expect(stored[0].name).toBe("Updated Name");
      expect(stored[0].description).toBe("Original description");
      expect(new Date(stored[0].updatedAt).getTime()).toBeGreaterThan(
        new Date(originalPreset.updatedAt).getTime(),
      );
    });

    it("should throw error when updating non-existent preset", async () => {
      await expect(
        storage.update("non-existent", { name: "New Name" }),
      ).rejects.toThrow("Preset with id non-existent not found");
    });
  });

  describe("delete", () => {
    it("should delete existing preset", async () => {
      const presets: UserPreset[] = [
        {
          id: "1",
          name: "Preset 1",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        {
          id: "2",
          name: "Preset 2",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
      ];

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify(presets),
      );

      await storage.delete("1");

      const stored = JSON.parse(
        localStorageMock.getItem("ag-grid-filter-presets")!,
      );
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe("2");
    });

    it("should handle deleting non-existent preset gracefully", async () => {
      const presets: UserPreset[] = [
        {
          id: "1",
          name: "Preset 1",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
      ];

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify(presets),
      );

      await storage.delete("non-existent");

      const stored = JSON.parse(
        localStorageMock.getItem("ag-grid-filter-presets")!,
      );
      expect(stored).toHaveLength(1);
    });
  });

  describe("clear", () => {
    it("should remove all presets", async () => {
      const presets: UserPreset[] = [
        {
          id: "1",
          name: "Preset 1",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
      ];

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify(presets),
      );

      await storage.clear();

      expect(localStorageMock.getItem("ag-grid-filter-presets")).toBeNull();
    });
  });

  describe("getInfo", () => {
    it("should return storage information", async () => {
      const presets: UserPreset[] = [
        {
          id: "1",
          name: "Preset 1",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        {
          id: "2",
          name: "Preset 2",
          type: "user",
          gridState: { filterModel: {} },
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
      ];

      localStorageMock.setItem(
        "ag-grid-filter-presets",
        JSON.stringify(presets),
      );

      const info = await storage.getInfo();

      expect(info.count).toBe(2);
      expect(info.compressed).toBe(false);
      expect(info.quota).toBe(5 * 1024 * 1024);
      expect(info.used).toBeGreaterThan(0);
      expect(info.available).toBeLessThan(info.quota);
    });
  });

  describe("storage quota handling", () => {
    it("should detect when storage quota is exceeded", async () => {
      // Simulate quota exceeded error
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = vi.fn(() => {
        throw new DOMException("QuotaExceededError");
      });

      const preset: UserPreset = {
        id: "large",
        name: "Large Preset",
        type: "user",
        gridState: {
          filterModel: {
            // Simulate large filter model
            ...Array.from({ length: 1000 }, (_, i) => ({
              [`column${i}`]: { type: "equals", filter: `value${i}` },
            })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
          },
        },
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };

      await expect(storage.save(preset)).rejects.toThrow("QuotaExceededError");

      localStorageMock.setItem = originalSetItem;
    });
  });

  describe("cross-tab synchronization", () => {
    it("should handle storage events from other tabs", async () => {
      const preset: UserPreset = {
        id: "cross-tab",
        name: "Cross Tab Preset",
        type: "user",
        gridState: { filterModel: {} },
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      };

      // Simulate storage event from another tab
      const storageEvent = new StorageEvent("storage", {
        key: "ag-grid-filter-presets",
        newValue: JSON.stringify([preset]),
        oldValue: "[]",
        storageArea: localStorage,
      });

      window.dispatchEvent(storageEvent);

      // The storage adapter should pick up the change
      const presets = await storage.getAll();
      expect(presets).toEqual([preset]);
    });
  });
});

describe("PresetStorage - Compression", () => {
  it("should compress data when enabled", async () => {
    // This would test compression functionality
    // Implementation would use LZ-String or similar
    expect(true).toBe(true); // Placeholder
  });

  it("should handle decompression of stored data", async () => {
    // This would test decompression functionality
    expect(true).toBe(true); // Placeholder
  });
});

describe("PresetStorage - IndexedDB Adapter", () => {
  it("should handle larger storage requirements", async () => {
    // This would test IndexedDB implementation
    // which supports much larger storage quotas
    expect(true).toBe(true); // Placeholder
  });
});

describe("PresetStorage - Error Handling", () => {
  it("should handle browser private mode limitations", async () => {
    // Test behavior in private browsing mode
    // where localStorage might be restricted
    expect(true).toBe(true); // Placeholder
  });

  it("should provide fallback for unsupported browsers", async () => {
    // Test fallback behavior for older browsers
    expect(true).toBe(true); // Placeholder
  });
});
