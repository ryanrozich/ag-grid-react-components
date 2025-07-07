import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { LocalStorageAdapter } from "./LocalStorageAdapter";
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

describe("LocalStorageAdapter", () => {
  let adapter: LocalStorageAdapter;
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const storage: Record<string, string> = {};
    mockLocalStorage = {
      getItem: vi.fn((key: string) => storage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        storage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete storage[key];
      }),
      clear: vi.fn(() => {
        Object.keys(storage).forEach((key) => delete storage[key]);
      }),
      key: vi.fn((index: number) => {
        const keys = Object.keys(storage);
        return keys[index] || null;
      }),
      get length() {
        return Object.keys(storage).length;
      },
    };

    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    adapter = new LocalStorageAdapter();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("isAvailable", () => {
    it("should return true when localStorage is available", async () => {
      const result = await adapter.getItem("test");
      expect(result).toBeNull();
      expect(logger.warn).not.toHaveBeenCalled();
    });

    it("should handle localStorage not being available", async () => {
      mockLocalStorage.setItem = vi.fn(() => {
        throw new Error("localStorage not available");
      });

      const result = await adapter.getItem("test");
      expect(result).toBeNull();
      expect(logger.warn).toHaveBeenCalledWith("LocalStorage is not available");
    });
  });

  describe("getItem", () => {
    it("should get item from localStorage", async () => {
      mockLocalStorage.setItem("testKey", "testValue");
      const result = await adapter.getItem("testKey");
      expect(result).toBe("testValue");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("testKey");
    });

    it("should return null for non-existent item", async () => {
      const result = await adapter.getItem("nonExistent");
      expect(result).toBeNull();
    });

    it("should handle errors gracefully", async () => {
      mockLocalStorage.getItem = vi.fn(() => {
        throw new Error("Storage error");
      });

      const result = await adapter.getItem("testKey");
      expect(result).toBeNull();
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to get item from localStorage",
        expect.objectContaining({ key: "testKey" }),
      );
    });
  });

  describe("setItem", () => {
    it("should set item in localStorage", async () => {
      await adapter.setItem("testKey", "testValue");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "testKey",
        "testValue",
      );
    });

    it("should throw QuotaExceededError when storage is full", async () => {
      const quotaError = new DOMException("QuotaExceededError");
      Object.defineProperty(quotaError, "name", {
        value: "QuotaExceededError",
      });

      // First call for isAvailable check should succeed
      let callCount = 0;
      mockLocalStorage.setItem = vi.fn(() => {
        callCount++;
        if (callCount === 1) {
          // First call (isAvailable check) - succeed
          return;
        }
        // Second call (actual setItem) - fail with quota error
        throw quotaError;
      });

      await expect(adapter.setItem("testKey", "value")).rejects.toThrow();
      expect(logger.error).toHaveBeenCalledWith(
        "LocalStorage quota exceeded",
        expect.objectContaining({ key: "testKey", valueLength: 5 }),
      );
    });

    it("should throw other errors", async () => {
      const genericError = new Error("Storage error");

      // First call for isAvailable check should succeed
      let callCount = 0;
      mockLocalStorage.setItem = vi.fn(() => {
        callCount++;
        if (callCount === 1) {
          // First call (isAvailable check) - succeed
          return;
        }
        // Second call (actual setItem) - fail
        throw genericError;
      });

      await expect(adapter.setItem("testKey", "value")).rejects.toThrow(
        "Storage error",
      );
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to set item in localStorage",
        expect.objectContaining({ key: "testKey" }),
      );
    });
  });

  describe("removeItem", () => {
    it("should remove item from localStorage", async () => {
      mockLocalStorage.setItem("testKey", "testValue");
      await adapter.removeItem("testKey");
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("testKey");
    });

    it("should handle errors", async () => {
      const error = new Error("Remove error");

      // First call for isAvailable (setItem) should succeed
      mockLocalStorage.setItem = vi.fn();

      // removeItem in isAvailable check should succeed, but actual removeItem should fail
      let removeCallCount = 0;
      mockLocalStorage.removeItem = vi.fn(() => {
        removeCallCount++;
        if (removeCallCount === 1) {
          // First call (isAvailable check) - succeed
          return;
        }
        // Second call (actual removeItem) - fail
        throw error;
      });

      await expect(adapter.removeItem("testKey")).rejects.toThrow(
        "Remove error",
      );
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to remove item from localStorage",
        expect.objectContaining({ key: "testKey" }),
      );
    });
  });

  describe("clear", () => {
    it("should clear all items from localStorage", async () => {
      mockLocalStorage.setItem("key1", "value1");
      mockLocalStorage.setItem("key2", "value2");

      await adapter.clear();
      expect(mockLocalStorage.clear).toHaveBeenCalled();
    });

    it("should handle errors", async () => {
      const error = new Error("Clear error");
      mockLocalStorage.clear = vi.fn(() => {
        throw error;
      });

      await expect(adapter.clear()).rejects.toThrow(error);
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to clear localStorage",
        expect.objectContaining({ error }),
      );
    });
  });

  describe("getAllKeys", () => {
    it("should return all keys from localStorage", async () => {
      mockLocalStorage.setItem("key1", "value1");
      mockLocalStorage.setItem("key2", "value2");
      mockLocalStorage.setItem("key3", "value3");

      const keys = await adapter.getAllKeys();
      expect(keys).toEqual(["key1", "key2", "key3"]);
    });

    it("should return empty array when localStorage is empty", async () => {
      const keys = await adapter.getAllKeys();
      expect(keys).toEqual([]);
    });

    it("should handle errors and return empty array", async () => {
      Object.defineProperty(mockLocalStorage, "length", {
        get: () => {
          throw new Error("Length error");
        },
      });

      const keys = await adapter.getAllKeys();
      expect(keys).toEqual([]);
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to get all keys from localStorage",
        expect.any(Object),
      );
    });
  });
});
