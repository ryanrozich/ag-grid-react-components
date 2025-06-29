import type { CompressionAdapter } from "@agrc/core";

// Base64 compression using browser built-ins (no external dependencies)
export const base64CompressionAdapter: CompressionAdapter = {
  compress: (data: string): string => {
    try {
      // Encode URI component first to handle special characters
      const encoded = encodeURIComponent(data);
      // Convert to base64
      return btoa(encoded);
    } catch (error) {
      console.warn("Base64 compression failed:", error);
      return data;
    }
  },

  decompress: (data: string): string => {
    try {
      // Decode from base64
      const decoded = atob(data);
      // Decode URI component
      return decodeURIComponent(decoded);
    } catch (error) {
      console.warn("Base64 decompression failed:", error);
      return data;
    }
  },
};

// UTF-8 safe base64 (handles unicode properly)
export const utf8Base64CompressionAdapter: CompressionAdapter = {
  compress: (data: string): string => {
    try {
      // Convert string to UTF-8 bytes
      const bytes = new TextEncoder().encode(data);
      // Convert bytes to base64
      const binString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
      ).join("");
      return btoa(binString);
    } catch (error) {
      console.warn("UTF-8 base64 compression failed:", error);
      return data;
    }
  },

  decompress: (data: string): string => {
    try {
      // Decode base64 to binary string
      const binString = atob(data);
      // Convert binary string to bytes
      const bytes = Uint8Array.from(binString, (char) => char.codePointAt(0)!);
      // Decode UTF-8 bytes to string
      return new TextDecoder().decode(bytes);
    } catch (error) {
      console.warn("UTF-8 base64 decompression failed:", error);
      return data;
    }
  },
};
