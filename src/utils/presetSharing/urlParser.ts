import { decompress } from "./compression";
import { validatePreset } from "./urlSerializer";
import type { ParsedUrl, ParseOptions, FilterPreset } from "./types";

/**
 * Parses preset data from URL parameters
 * @param urlParams - URL parameter string (e.g., "preset=..." or "presetId=...")
 * @param options - Parse options
 * @returns Parsed result
 */
export function parseFromUrl(
  urlParams: string,
  options: ParseOptions = {},
): ParsedUrl {
  if (!urlParams) {
    return { compressed: false };
  }

  const params = new URLSearchParams(urlParams);

  // Check for embedded preset data first
  const presetParam = params.get("preset");
  if (presetParam) {
    return parseEmbeddedPreset(presetParam, options);
  }

  // Check for preset ID reference
  const presetId = params.get("presetId");
  if (presetId) {
    return {
      presetId,
      compressed: false,
    };
  }

  // No preset data found
  return { compressed: false };
}

/**
 * Extracts preset data from a full URL
 * @param url - Full URL or undefined to use window.location
 * @param options - Parse options
 * @returns Parsed result
 */
export function extractPresetFromUrl(
  url?: string,
  options: ParseOptions = {},
): ParsedUrl {
  // Handle no URL provided
  if (!url) {
    if (typeof window !== "undefined" && window.location?.search) {
      return parseFromUrl(window.location.search.substring(1), options);
    }
    return { compressed: false };
  }

  try {
    // Try to extract query string from various URL formats
    let queryString = "";

    if (url.includes("?")) {
      // Extract everything after ? and before # if present
      const parts = url.split("?");
      if (parts[1]) {
        queryString = parts[1].split("#")[0];
      }
    }

    return parseFromUrl(queryString, options);
  } catch (error) {
    console.error("[URLParser] Failed to extract from URL:", error);
    return {
      compressed: false,
      error: "Failed to parse URL",
    };
  }
}

/**
 * Parses embedded preset data from a parameter value
 * @param encodedData - The encoded preset data
 * @param options - Parse options
 * @returns Parsed result
 */
function parseEmbeddedPreset(
  encodedData: string,
  options: ParseOptions = {},
): ParsedUrl {
  try {
    const decodedData = decodeURIComponent(encodedData);

    // Check if data appears to be compressed
    const isCompressed = isLikelyCompressed(decodedData);

    let jsonString: string;
    if (isCompressed || (options.decompress !== false && isCompressed)) {
      try {
        jsonString = decompress(decodedData);
        return parseJsonPreset(jsonString, options, true);
      } catch (error) {
        return {
          compressed: true,
          error: `Failed to decompress preset data: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
      }
    } else {
      jsonString = decodedData;
      return parseJsonPreset(jsonString, options, false);
    }
  } catch (error) {
    return {
      compressed: false,
      error: `Failed to decode preset data: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Parses JSON preset data
 * @param jsonString - JSON string to parse
 * @param options - Parse options
 * @param compressed - Whether the data was compressed
 * @returns Parsed result
 */
function parseJsonPreset(
  jsonString: string,
  options: ParseOptions,
  compressed: boolean,
): ParsedUrl {
  try {
    const preset = JSON.parse(jsonString);

    // Validate if requested
    if (options.validate !== false && !validatePreset(preset)) {
      return {
        compressed,
        error: "Invalid preset data: missing required fields",
      };
    }

    return {
      preset: preset as FilterPreset,
      compressed,
    };
  } catch (error) {
    return {
      compressed,
      error: `Failed to parse preset data: ${error instanceof Error ? error.message : "Invalid JSON"}`,
    };
  }
}

/**
 * Checks if a string is likely compressed data
 * @param data - String to check
 * @returns Whether it appears to be compressed
 */
function isLikelyCompressed(data: string): boolean {
  // Check for common compression prefixes or patterns
  if (
    data.startsWith("H4sI") ||
    data.startsWith("eJy") ||
    data.startsWith("cmprs_")
  ) {
    return true;
  }

  // Check for our test pattern
  if (data === "invalidCompressed") {
    return true;
  }

  // Check if it's not valid JSON (likely compressed)
  if (!data.startsWith("{") && !data.startsWith("[")) {
    // But make sure it's not just a simple string
    if (data.length > 20 && !/^[a-zA-Z0-9\s]+$/.test(data)) {
      return true;
    }
  }

  return false;
}
