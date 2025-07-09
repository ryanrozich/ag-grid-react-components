import { compress, shouldCompress, getCompressionRatio } from "./compression";
import type { FilterPreset, ShareOptions, SerializedUrl } from "./types";

/**
 * Serializes a filter preset to a URL parameter string
 * @param preset - The preset to serialize
 * @param options - Serialization options
 * @returns Serialized URL result
 */
export function serializeToUrl(
  preset: FilterPreset,
  options: ShareOptions,
): SerializedUrl {
  if (options.mode === "reference") {
    // Reference mode: just include the preset ID
    const url = `presetId=${encodeURIComponent(preset.id)}`;
    return {
      url,
      compressed: false,
      originalSize: url.length,
      finalSize: url.length,
    };
  }

  // Embedded mode: include full preset data
  // Strip internal fields that start with _ or temp
  const cleanPreset = stripInternalFields(
    preset as unknown as Record<string, unknown>,
  );

  const jsonString = JSON.stringify(cleanPreset);
  const originalSize = jsonString.length;

  // Determine if we should compress
  const shouldUseCompression =
    options.compress !== false &&
    (options.compress === true || shouldCompress(jsonString));

  let encodedData: string;
  let compressed = false;

  if (shouldUseCompression) {
    try {
      encodedData = compress(jsonString);
      compressed = true;
    } catch (error) {
      console.warn(
        "[URLSerializer] Compression failed, falling back to uncompressed:",
        error,
      );
      encodedData = encodeURIComponent(jsonString);
    }
  } else {
    encodedData = encodeURIComponent(jsonString);
  }

  const url = `preset=${encodedData}`;
  const finalSize = url.length;

  const result: SerializedUrl = {
    url,
    compressed,
    originalSize,
    finalSize,
  };

  if (compressed) {
    result.compressionRatio = getCompressionRatio(jsonString, encodedData);
  }

  return result;
}

/**
 * Creates a complete shareable URL with the preset data
 * @param preset - The preset to share
 * @param options - Share options including base URL
 * @returns Complete shareable URL
 */
export function createShareableUrl(
  preset: FilterPreset,
  options: ShareOptions,
): SerializedUrl {
  const serialized = serializeToUrl(preset, options);

  // Get base URL
  let baseUrl = options.baseUrl;
  if (!baseUrl && typeof window !== "undefined") {
    baseUrl = window.location.origin + window.location.pathname;
  }

  if (!baseUrl) {
    // If no base URL and no window, just return the parameters
    return serialized;
  }

  // Parse the base URL to handle existing parameters and hash
  const urlParts = baseUrl.split("#");
  const hashPart = urlParts[1] || "";
  const mainUrl = urlParts[0];

  // Check if URL already has parameters
  const separator = mainUrl.includes("?") ? "&" : "?";

  // Construct full URL
  const fullUrl = `${mainUrl}${separator}${serialized.url}${hashPart ? "#" + hashPart : ""}`;

  // Warn if URL is too long
  if (fullUrl.length > 2000) {
    console.warn(
      `[URLSerializer] Generated URL exceeds 2000 characters (${fullUrl.length}). ` +
        "Some browsers may have issues with very long URLs.",
    );
  }

  return {
    ...serialized,
    url: fullUrl,
  };
}

/**
 * Strips internal fields from a preset to reduce size
 * @param preset - The preset to clean
 * @returns Cleaned preset
 */
function stripInternalFields(preset: Record<string, unknown>): FilterPreset {
  const cleaned = { ...preset };

  // Remove any fields that start with _ or temp
  Object.keys(cleaned).forEach((key) => {
    if (key.startsWith("_") || key.startsWith("temp")) {
      delete cleaned[key];
    }
  });

  return cleaned as unknown as FilterPreset;
}

/**
 * Validates that a preset has required fields
 * @param preset - The preset to validate
 * @returns Whether the preset is valid
 */
export function validatePreset(preset: unknown): preset is FilterPreset {
  const obj = preset as Record<string, unknown>;
  return (
    preset !== null &&
    typeof preset === "object" &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    obj.gridState !== null &&
    typeof obj.gridState === "object" &&
    typeof obj.createdAt === "string"
  );
}
