import type { CompressionAdapter } from "@agrc/core";

// Dynamic import factory for LZ-String
export function createLZStringAdapter(): CompressionAdapter {
  let lzString: typeof import("lz-string") | null = null;

  return {
    async compress(data: string): Promise<string> {
      if (!lzString) {
        // Dynamic import - only loads when first used
        lzString = await import("lz-string");
      }
      return lzString.compressToEncodedURIComponent(data);
    },

    async decompress(data: string): Promise<string> {
      if (!lzString) {
        lzString = await import("lz-string");
      }
      return lzString.decompressFromEncodedURIComponent(data) || data;
    },
  };
}

// Synchronous version for environments that require it
export function createLZStringSyncAdapter(
  lzStringInstance: typeof import("lz-string"),
): CompressionAdapter {
  return {
    compress: (data: string) => {
      return lzStringInstance.compressToEncodedURIComponent(data);
    },

    decompress: (data: string) => {
      return lzStringInstance.decompressFromEncodedURIComponent(data) || data;
    },
  };
}
