import LZString from "lz-string";

/**
 * Compresses a string using LZ compression and returns a URL-safe base64 string
 * @param data - The string to compress
 * @returns URL-safe compressed string
 */
export function compress(data: string): string {
  if (!data) return "";

  try {
    // Use LZString's compressToEncodedURIComponent for URL-safe output
    return LZString.compressToEncodedURIComponent(data);
  } catch (error) {
    console.error("[Compression] Failed to compress data:", error);
    throw new Error("Failed to compress data");
  }
}

/**
 * Decompresses a URL-safe base64 string back to the original string
 * @param compressed - The compressed string to decompress
 * @returns The original uncompressed string
 */
export function decompress(compressed: string): string {
  if (!compressed) return "";

  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(compressed);

    // LZString returns null for invalid data
    if (decompressed === null) {
      throw new Error("Invalid compressed data");
    }

    // Check for suspicious decompression results that indicate invalid input
    // LZString sometimes returns strings with null characters or only whitespace for invalid input
    if (compressed.length > 0) {
      // Check for null characters which indicate corruption
      if (decompressed.includes("\0")) {
        throw new Error("Invalid compressed data");
      }

      // If we got only whitespace from a non-whitespace input, it's likely invalid
      if (decompressed.trim() === "" && !/^\s+$/.test(compressed)) {
        throw new Error("Invalid compressed data");
      }
    }

    return decompressed;
  } catch (error) {
    console.error("[Compression] Failed to decompress data:", error);
    throw new Error("Failed to decompress data: Invalid or corrupted input");
  }
}

/**
 * Calculates the compression ratio as a percentage
 * @param original - Original string size
 * @param compressed - Compressed string size
 * @returns Compression ratio (0-100)
 */
export function getCompressionRatio(
  original: string,
  compressed: string,
): number {
  if (!original) return 0;
  return Math.round((1 - compressed.length / original.length) * 100);
}

/**
 * Checks if compression would be beneficial for the given data
 * @param data - The data to check
 * @returns Whether compression should be used
 */
export function shouldCompress(data: string): boolean {
  // Don't compress very small strings (overhead might make them larger)
  if (data.length < 100) return false;

  // Try compression and see if it's worth it
  const compressed = compress(data);
  return compressed.length < data.length * 0.9; // Only compress if we save at least 10%
}
