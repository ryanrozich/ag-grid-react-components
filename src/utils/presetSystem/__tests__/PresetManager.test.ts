import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { PresetManager } from "../PresetManager";
import type { FilterPreset, SystemPreset, UserPreset } from "../types";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("PresetManager", () => {
  let manager: PresetManager;

  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    localStorageMock.removeItem.mockReset();
    manager = new PresetManager();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("System Preset Management", () => {
    const systemPresets: SystemPreset[] = [
      {
        id: "active-only",
        name: "Active Items",
        description: "Show only active records",
        gridState: {
          filters: {
            status: { filterType: "text", type: "equals", filter: "active" },
          },
        },
        isSystemPreset: true,
      },
      {
        id: "recent",
        name: "Recent Changes",
        description: "Items modified in the last 7 days",
        gridState: {
          filters: {
            updatedAt: {
              filterType: "date",
              type: "after",
              filter: "{{last7Days}}",
            },
          },
        },
        isSystemPreset: true,
      },
    ];

    it("should register system presets", () => {
      manager.registerSystemPresets(systemPresets);
      const allPresets = manager.getAllPresets();

      expect(allPresets.system).toHaveLength(2);
      expect(allPresets.system[0].id).toBe("active-only");
      expect(allPresets.system[1].id).toBe("recent");
    });

    it("should not allow modifying system presets", () => {
      manager.registerSystemPresets(systemPresets);

      // Attempt to update a system preset should throw
      expect(() => {
        manager.updateUserPreset("active-only", { name: "Modified" });
      }).toThrow("Cannot modify system preset");

      // Attempt to delete a system preset should throw
      expect(() => {
        manager.deleteUserPreset("active-only");
      }).toThrow("Cannot delete system preset");
    });

    it("should allow multiple registrations of system presets", () => {
      manager.registerSystemPresets(systemPresets);
      manager.registerSystemPresets([
        {
          id: "high-priority",
          name: "High Priority",
          description: "Show high priority items",
          gridState: {
            filters: {
              priority: { filterType: "text", type: "equals", filter: "high" },
            },
          },
          isSystemPreset: true,
        },
      ]);

      const allPresets = manager.getAllPresets();
      expect(allPresets.system).toHaveLength(3);
    });
  });

  describe("User Preset Management", () => {
    it("should save a new user preset", () => {
      const preset = manager.saveUserPreset({
        name: "My Filter",
        description: "Custom filter",
        gridState: {
          filters: {
            status: { filterType: "text", type: "equals", filter: "pending" },
          },
        },
      });

      expect(preset.id).toBeDefined();
      expect(preset.name).toBe("My Filter");
      expect(preset.isSystemPreset).toBe(false);
      expect(preset.tags).toEqual([]);
      expect(preset.createdAt).toBeDefined();
      expect(preset.updatedAt).toBeDefined();

      // Verify it was saved to localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "ag-grid-presets",
        expect.any(String),
      );
    });

    it("should update an existing user preset", async () => {
      const preset = manager.saveUserPreset({
        name: "Original Name",
        gridState: { filters: {} },
      });

      // Add a small delay to ensure different timestamp
      await new Promise((resolve) => setTimeout(resolve, 10));

      manager.updateUserPreset(preset.id, {
        name: "Updated Name",
        description: "New description",
      });

      const allPresets = manager.getAllPresets();
      const updated = allPresets.user.find((p) => p.id === preset.id);

      expect(updated?.name).toBe("Updated Name");
      expect(updated?.description).toBe("New description");
      expect((updated as UserPreset)?.updatedAt).not.toBe(
        (preset as UserPreset).updatedAt,
      );
    });

    it("should delete a user preset", () => {
      const preset = manager.saveUserPreset({
        name: "To Delete",
        gridState: { filters: {} },
      });

      manager.deleteUserPreset(preset.id);

      const allPresets = manager.getAllPresets();
      expect(allPresets.user).toHaveLength(0);
    });

    it("should load user presets from localStorage on initialization", () => {
      const savedPresets: FilterPreset[] = [
        {
          id: "saved-1",
          name: "Saved Preset 1",
          gridState: { filters: {} },
          isSystemPreset: false,
          tags: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedPresets));

      const newManager = new PresetManager();
      const allPresets = newManager.getAllPresets();

      expect(allPresets.user).toHaveLength(1);
      expect(allPresets.user[0].id).toBe("saved-1");
    });

    it("should support tags for organization", () => {
      const preset = manager.saveUserPreset({
        name: "Tagged Preset",
        gridState: { filters: {} },
        tags: ["report", "monthly"],
      });

      expect(preset.tags).toEqual(["report", "monthly"]);

      manager.updateUserPreset(preset.id, {
        tags: ["report", "weekly"],
      });

      const updated = manager
        .getAllPresets()
        .user.find((p) => p.id === preset.id);
      expect((updated as UserPreset)?.tags).toEqual(["report", "weekly"]);
    });
  });

  describe("Default Preset Management", () => {
    beforeEach(() => {
      // Register some presets
      manager.registerSystemPresets([
        {
          id: "system-1",
          name: "System Preset",
          gridState: { filters: {} },
          isSystemPreset: true,
        },
      ]);
      manager.saveUserPreset({
        name: "User Preset",
        gridState: { filters: {} },
      });
    });

    it("should set a preset as default", () => {
      const userPreset = manager.getAllPresets().user[0];
      manager.setDefaultPreset(userPreset.id);

      const defaultPreset = manager.getDefaultPreset();
      expect(defaultPreset?.id).toBe(userPreset.id);

      // Verify it was saved to localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "ag-grid-default-preset",
        userPreset.id,
      );
    });

    it("should allow system presets to be set as default", () => {
      manager.setDefaultPreset("system-1");

      const defaultPreset = manager.getDefaultPreset();
      expect(defaultPreset?.id).toBe("system-1");
      expect(defaultPreset?.isSystemPreset).toBe(true);
    });

    it("should clear default preset", () => {
      const userPreset = manager.getAllPresets().user[0];
      manager.setDefaultPreset(userPreset.id);
      manager.clearDefault();

      expect(manager.getDefaultPreset()).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "ag-grid-default-preset",
      );
    });

    it("should only allow one default preset at a time", () => {
      const presets = manager.getAllPresets();
      const userPreset = presets.user[0];

      manager.setDefaultPreset("system-1");
      manager.setDefaultPreset(userPreset.id);

      expect(manager.getDefaultPreset()?.id).toBe(userPreset.id);
    });

    it("should handle setting null as default", () => {
      const userPreset = manager.getAllPresets().user[0];
      manager.setDefaultPreset(userPreset.id);
      manager.setDefaultPreset(null);

      expect(manager.getDefaultPreset()).toBeNull();
    });

    it("should load default preset from localStorage on initialization", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "ag-grid-default-preset") return "system-1";
        return null;
      });

      const newManager = new PresetManager();
      newManager.registerSystemPresets([
        {
          id: "system-1",
          name: "System Preset",
          gridState: { filters: {} },
          isSystemPreset: true,
        },
      ]);

      const defaultPreset = newManager.getDefaultPreset();
      expect(defaultPreset?.id).toBe("system-1");
    });
  });

  describe("Utility Methods", () => {
    beforeEach(() => {
      manager.registerSystemPresets([
        {
          id: "system-1",
          name: "System Preset",
          gridState: {
            filters: {
              status: { filterType: "text", type: "equals", filter: "active" },
            },
          },
          isSystemPreset: true,
        },
      ]);
    });

    it("should duplicate a system preset as a user preset", () => {
      const duplicated = manager.duplicateAsUserPreset(
        "system-1",
        "My Custom Active",
      );

      expect(duplicated.id).not.toBe("system-1");
      expect(duplicated.name).toBe("My Custom Active");
      expect(duplicated.isSystemPreset).toBe(false);
      expect(duplicated.gridState).toEqual({
        filters: {
          status: { filterType: "text", type: "equals", filter: "active" },
        },
      });

      const allPresets = manager.getAllPresets();
      expect(allPresets.user).toHaveLength(1);
    });

    it("should return active preset ID with getAllPresets", () => {
      const userPreset = manager.saveUserPreset({
        name: "Active Preset",
        gridState: { filters: {} },
      });

      manager.setDefaultPreset(userPreset.id);

      const allPresets = manager.getAllPresets();
      expect(allPresets.activeId).toBe(userPreset.id);
    });

    it("should handle errors when duplicating non-existent preset", () => {
      expect(() => {
        manager.duplicateAsUserPreset("non-existent", "New Name");
      }).toThrow("Preset not found");
    });

    it("should validate preset data when saving", () => {
      expect(() => {
        manager.saveUserPreset({
          name: "", // Empty name should be invalid
          gridState: { filters: {} },
        });
      }).toThrow("Preset name is required");

      expect(() => {
        manager.saveUserPreset({
          name: "Valid Name",
          gridState: null as any, // Invalid grid state
        });
      }).toThrow("Grid state is required");
    });
  });

  describe("Event Handling", () => {
    it("should emit events when presets change", () => {
      const onPresetsChange = vi.fn();
      manager.onPresetsChange(onPresetsChange);

      // Save a preset
      manager.saveUserPreset({
        name: "Test Preset",
        gridState: { filters: {} },
      });

      expect(onPresetsChange).toHaveBeenCalledWith({
        system: [],
        user: expect.arrayContaining([
          expect.objectContaining({ name: "Test Preset" }),
        ]),
      });
    });

    it("should emit events when default changes", () => {
      const onDefaultChange = vi.fn();
      manager.onDefaultChange(onDefaultChange);

      const preset = manager.saveUserPreset({
        name: "Test Preset",
        gridState: { filters: {} },
      });

      manager.setDefaultPreset(preset.id);

      expect(onDefaultChange).toHaveBeenCalledWith(
        expect.objectContaining({ id: preset.id }),
      );
    });

    it("should handle unsubscribing from events", () => {
      const onPresetsChange = vi.fn();
      const unsubscribe = manager.onPresetsChange(onPresetsChange);

      unsubscribe();

      // Save a preset after unsubscribing
      manager.saveUserPreset({
        name: "Test Preset",
        gridState: { filters: {} },
      });

      expect(onPresetsChange).not.toHaveBeenCalled();
    });
  });
});
