import type { ViewDropdownLoader, SavedViewOption } from "./types";

export interface LocalStorageLoaderConfig {
  /** Storage key prefix */
  storageKey?: string;
}

/**
 * LocalStorage implementation of ViewDropdownLoader
 * Stores saved views in browser's localStorage
 */
export class LocalStorageLoader implements ViewDropdownLoader {
  private storageKey: string;
  private subscribers: Set<() => void> = new Set();

  constructor(config: LocalStorageLoaderConfig = {}) {
    this.storageKey = config.storageKey || "quickfilter-saved-views";
  }

  async loadOptions(): Promise<SavedViewOption[]> {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];

      const parsed = JSON.parse(data);
      return parsed.views || [];
    } catch (error) {
      console.error("Error loading saved views from localStorage:", error);
      return [];
    }
  }

  async saveOption(option: SavedViewOption): Promise<void> {
    const views = await this.loadOptions();

    // Check if updating existing view
    const existingIndex = views.findIndex((v) => v.id === option.id);

    const now = new Date().toISOString();
    const viewToSave = {
      ...option,
      metadata: {
        ...option.metadata,
        updatedAt: now,
        createdAt:
          existingIndex >= 0 ? views[existingIndex].metadata?.createdAt : now,
      },
    };

    if (existingIndex >= 0) {
      views[existingIndex] = viewToSave;
    } else {
      views.push(viewToSave);
    }

    this.saveToStorage({ views });
    this.notifySubscribers();
  }

  async deleteOption(id: string): Promise<void> {
    const views = await this.loadOptions();
    const filtered = views.filter((v) => v.id !== id);

    if (filtered.length !== views.length) {
      this.saveToStorage({ views: filtered });
      this.notifySubscribers();
    }
  }

  async updateOption(
    id: string,
    updates: Partial<SavedViewOption>,
  ): Promise<void> {
    const views = await this.loadOptions();
    const index = views.findIndex((v) => v.id === id);

    if (index >= 0) {
      views[index] = {
        ...views[index],
        ...updates,
        metadata: {
          ...views[index].metadata,
          ...updates.metadata,
          updatedAt: new Date().toISOString(),
        },
      };

      this.saveToStorage({ views });
      this.notifySubscribers();
    }
  }

  async getDefaultViewId(): Promise<string | null> {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return null;

      const parsed = JSON.parse(data);
      return parsed.defaultViewId || null;
    } catch (error) {
      console.error("Error getting default view ID:", error);
      return null;
    }
  }

  async setDefaultView(id: string): Promise<void> {
    const data = this.loadStorageData();

    // If empty string, remove default view
    if (id === "") {
      data.defaultViewId = null;

      // Update all views to not be default
      const views = data.views || [];
      views.forEach((view) => {
        if (view.metadata) {
          view.metadata.isDefault = false;
        } else {
          view.metadata = { isDefault: false };
        }
      });
    } else {
      data.defaultViewId = id;

      // Update the view's metadata
      const views = data.views || [];
      views.forEach((view) => {
        if (view.metadata) {
          view.metadata.isDefault = view.id === id;
        } else {
          view.metadata = { isDefault: view.id === id };
        }
      });
    }

    this.saveToStorage(data);
    this.notifySubscribers();
  }

  async exportViews(): Promise<string> {
    const data = this.loadStorageData();
    return JSON.stringify(data, null, 2);
  }

  async importViews(jsonData: string): Promise<void> {
    try {
      const imported = JSON.parse(jsonData);

      // Validate the imported data
      if (!imported.views || !Array.isArray(imported.views)) {
        throw new Error("Invalid import data: missing views array");
      }

      // Merge with existing views or replace based on config
      const existing = this.loadStorageData();
      const merged = {
        ...existing,
        ...imported,
        views: [...(existing.views || []), ...imported.views],
      };

      this.saveToStorage(merged);
      this.notifySubscribers();
    } catch (error) {
      console.error("Error importing views:", error);
      throw error;
    }
  }

  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  // Private helper methods
  private loadStorageData(): {
    views: SavedViewOption[];
    defaultViewId?: string;
  } {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : { views: [] };
    } catch (error) {
      console.error("Error loading storage data:", error);
      return { views: [] };
    }
  }

  private saveToStorage(data: {
    views: SavedViewOption[];
    defaultViewId?: string;
  }): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      throw error;
    }
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.error("Error in subscriber callback:", error);
      }
    });
  }
}
