import { logger } from "../logger";
import type { StorageAdapter } from "./types";

export class LocalStorageAdapter implements StorageAdapter {
  private isAvailable(): boolean {
    try {
      const testKey = "__localStorage_test__";
      localStorage.setItem(testKey, "test");
      localStorage.removeItem(testKey);
      return true;
    } catch {
      logger.warn("LocalStorage is not available");
      return false;
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      return localStorage.getItem(key);
    } catch (error) {
      logger.error("Failed to get item from localStorage", { key, error });
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (!this.isAvailable()) {
      throw new Error("LocalStorage is not available");
    }

    try {
      localStorage.setItem(key, value);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        logger.error("LocalStorage quota exceeded", {
          key,
          valueLength: value.length,
        });
        throw error;
      }
      logger.error("Failed to set item in localStorage", { key, error });
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.error("Failed to remove item from localStorage", { key, error });
      throw error;
    }
  }

  async clear(): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      logger.error("Failed to clear localStorage", { error });
      throw error;
    }
  }

  async getAllKeys(): Promise<string[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== null) {
          keys.push(key);
        }
      }
      return keys;
    } catch (error) {
      logger.error("Failed to get all keys from localStorage", { error });
      return [];
    }
  }
}
