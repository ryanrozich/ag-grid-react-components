// Proof of Concept: Optional Compression Utilities
// This demonstrates how compression can be made completely optional

import type {
  GridApi,
  FilterModel,
  ColumnState,
  SortModelItem,
} from "ag-grid-community";

// ============================================================================
// CORE TYPES (Would be in @ag-grid-react-components/core/types)
// ============================================================================

export interface GridState {
  filterModel?: FilterModel;
  columnState?: ColumnState[];
  sortModel?: SortModelItem[];
  rowGroupState?: any;
}

export interface CompressionAdapter {
  compress: (data: string) => Promise<string> | string;
  decompress: (data: string) => Promise<string> | string;
}

export interface GridStatePersistenceOptions {
  includeFilters?: boolean;
  includeColumns?: boolean;
  includeSort?: boolean;
  includeRowGrouping?: boolean;
  compressionAdapter?: CompressionAdapter;
  maxUrlLength?: number;
  onStateChange?: (state: GridState) => void;
}

// ============================================================================
// NO COMPRESSION ADAPTER (Default - 0KB)
// ============================================================================

export const noCompressionAdapter: CompressionAdapter = {
  compress: (data: string) => data,
  decompress: (data: string) => data,
};

// ============================================================================
// BASE64 COMPRESSION ADAPTER (Built-in - 0KB additional)
// ============================================================================

export const base64CompressionAdapter: CompressionAdapter = {
  compress: (data: string) => {
    try {
      // Use browser's built-in btoa
      return btoa(encodeURIComponent(data));
    } catch {
      return data;
    }
  },
  decompress: (data: string) => {
    try {
      // Use browser's built-in atob
      return decodeURIComponent(atob(data));
    } catch {
      return data;
    }
  },
};

// ============================================================================
// LZ-STRING ADAPTER FACTORY (Dynamic import - loads only when used)
// ============================================================================

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

// ============================================================================
// COMLINK COMPRESSION ADAPTER (Web Worker - 0KB main thread)
// ============================================================================

export function createWorkerCompressionAdapter(): CompressionAdapter {
  // Only load the worker if this adapter is used
  const worker = new Worker(
    new URL("./compression.worker.ts", import.meta.url),
    { type: "module" },
  );

  return {
    compress: async (data: string) => {
      return new Promise((resolve) => {
        const id = Math.random();
        worker.postMessage({ type: "compress", data, id });
        worker.addEventListener("message", function handler(e) {
          if (e.data.id === id) {
            worker.removeEventListener("message", handler);
            resolve(e.data.result);
          }
        });
      });
    },

    decompress: async (data: string) => {
      return new Promise((resolve) => {
        const id = Math.random();
        worker.postMessage({ type: "decompress", data, id });
        worker.addEventListener("message", function handler(e) {
          if (e.data.id === id) {
            worker.removeEventListener("message", handler);
            resolve(e.data.result);
          }
        });
      });
    },
  };
}

// ============================================================================
// CORE GRID STATE PERSISTENCE (No compression by default)
// ============================================================================

export function setupGridStatePersistence(
  api: GridApi,
  options: GridStatePersistenceOptions = {},
): () => void {
  const {
    compressionAdapter = noCompressionAdapter, // Default: no compression
    maxUrlLength = 2000,
    onStateChange,
    ...captureOptions
  } = options;

  const updateUrl = async (state: GridState) => {
    const stateJson = JSON.stringify(state);

    // Check if compression is needed
    if (stateJson.length > maxUrlLength / 2) {
      // Use compression adapter if provided
      const compressed = await compressionAdapter.compress(stateJson);

      // Update URL with compressed state
      const params = new URLSearchParams(window.location.search);
      params.set("gridState", compressed);
      params.set(
        "compressed",
        compressionAdapter !== noCompressionAdapter ? "1" : "0",
      );

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    } else {
      // No compression needed for small states
      const params = new URLSearchParams(window.location.search);
      params.set("gridState", stateJson);
      params.delete("compressed");

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }

    onStateChange?.(state);
  };

  // ... rest of implementation

  return () => {
    // Cleanup
  };
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: No compression (default - 0KB overhead)
setupGridStatePersistence(gridApi);

// Example 2: Built-in base64 compression (0KB overhead)
setupGridStatePersistence(gridApi, {
  compressionAdapter: base64CompressionAdapter,
});

// Example 3: LZ-String compression (loads ~15KB only when needed)
setupGridStatePersistence(gridApi, {
  compressionAdapter: createLZStringAdapter(),
});

// Example 4: Web Worker compression (0KB main thread impact)
setupGridStatePersistence(gridApi, {
  compressionAdapter: createWorkerCompressionAdapter(),
});

// Example 5: Custom compression adapter
const customAdapter: CompressionAdapter = {
  compress: async (data) => {
    // Use any compression library or API
    const response = await fetch("/api/compress", {
      method: "POST",
      body: data,
    });
    return response.text();
  },
  decompress: async (data) => {
    const response = await fetch("/api/decompress", {
      method: "POST",
      body: data,
    });
    return response.text();
  },
};

setupGridStatePersistence(gridApi, {
  compressionAdapter: customAdapter,
});

// ============================================================================
// TREE-SHAKEABLE UTILITY EXPORTS
// ============================================================================

// Each utility in its own file for optimal tree-shaking
export { captureGridState } from "./capture";
export { applyGridState } from "./apply";
export { serializeFilterModel } from "./serialize";
export { deserializeFilterModel } from "./deserialize";

// ============================================================================
// BUNDLE SIZE IMPACT
// ============================================================================

/*
Bundle Size Analysis:

Without compression:
- setupGridStatePersistence: ~3KB
- captureGridState: ~1KB
- applyGridState: ~1KB
- Total: ~5KB

With LZ-String (only when used):
- Dynamic import: +15KB
- Loaded on-demand
- Not included in initial bundle

Savings:
- Current: All utilities + lz-string always loaded (~100KB)
- New: Only what you use (5KB minimum)
- 95% reduction for users who don't need compression!
*/
