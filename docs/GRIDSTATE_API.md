# Grid State Persistence API Reference

The Grid State Persistence utilities provide comprehensive state management for AG Grid, including URL synchronization with compression support.

## Installation

```bash
npm install ag-grid-react-components

# Optional: For compression support
npm install lz-string
```

## Basic Usage

```tsx
import { setupGridStatePersistence } from "ag-grid-react-components";

// In your onGridReady callback
const onGridReady = (params) => {
  // Setup automatic URL persistence
  const cleanup = setupGridStatePersistence(params.api);

  // Call cleanup when component unmounts
  return cleanup;
};
```

## API

### setupGridStatePersistence

Automatically synchronizes grid state with URL parameters.

```typescript
function setupGridStatePersistence(api: GridApi, options?: GridStateOptions): () => void;
```

#### Options

| Option               | Type                         | Default | Description                                              |
| -------------------- | ---------------------------- | ------- | -------------------------------------------------------- |
| `useCompression`     | `boolean`                    | `true`  | Use LZ-String compression for URL parameters             |
| `compressionAdapter` | `CompressionAdapter`         | -       | Custom compression implementation                        |
| `maxUrlLength`       | `number`                     | `2000`  | Maximum URL length before warning                        |
| `debounceMs`         | `number`                     | `500`   | Debounce delay for state updates                         |
| `includeFilters`     | `boolean`                    | `true`  | Include filter state                                     |
| `includeColumns`     | `boolean`                    | `true`  | Include column state (visibility, order, width, pinning) |
| `includeSort`        | `boolean`                    | `true`  | Include sort state                                       |
| `includeRowGrouping` | `boolean`                    | `true`  | Include row grouping state                               |
| `onStateLoad`        | `(state: GridState) => void` | -       | Callback when state is loaded                            |
| `onStateSave`        | `(state: GridState) => void` | -       | Callback when state is saved                             |
| `onError`            | `(error: Error) => void`     | -       | Error handler                                            |

### captureGridState

Manually capture current grid state.

```typescript
function captureGridState(api: GridApi, options?: Partial<GridStateOptions>): GridState;
```

### applyGridState

Manually apply a saved grid state.

```typescript
function applyGridState(api: GridApi, state: GridState, options?: Partial<GridStateOptions>): void;
```

### TypeScript Interfaces

```typescript
interface GridState {
  version: string;
  filters?: FilterModel;
  columns?: ColumnState[];
  sort?: SortModelItem[];
  rowGrouping?: {
    groupColumns: string[];
    rowGroupPanelShow: string;
  };
}

interface GridStateOptions {
  useCompression: boolean;
  compressionAdapter?: CompressionAdapter;
  maxUrlLength: number;
  debounceMs: number;
  includeFilters: boolean;
  includeColumns: boolean;
  includeSort: boolean;
  includeRowGrouping: boolean;
  onStateLoad?: (state: GridState) => void;
  onStateSave?: (state: GridState) => void;
  onError?: (error: Error) => void;
}

interface CompressionAdapter {
  compress: (data: string) => string;
  decompress: (data: string) => string;
}
```

## Examples

### Basic Setup with Compression

```tsx
const MyGrid = () => {
  useEffect(() => {
    if (!gridApi) return;

    const cleanup = setupGridStatePersistence(gridApi, {
      useCompression: true,
      onStateLoad: (state) => {
        console.log("Loaded state from URL:", state);
      },
    });

    return cleanup;
  }, [gridApi]);
};
```

### Selective State Persistence

```tsx
// Only persist filters and sorting
const cleanup = setupGridStatePersistence(gridApi, {
  includeFilters: true,
  includeColumns: false, // Don't save column changes
  includeSort: true,
  includeRowGrouping: false, // Don't save grouping
});
```

### Manual State Management

```tsx
// Save to localStorage
const saveToLocalStorage = () => {
  const state = captureGridState(gridApi);
  localStorage.setItem("myGridState", JSON.stringify(state));
};

// Load from localStorage
const loadFromLocalStorage = () => {
  const saved = localStorage.getItem("myGridState");
  if (saved) {
    const state = JSON.parse(saved);
    applyGridState(gridApi, state);
  }
};
```

### Server-Side Persistence

```tsx
// Save to server
const saveToServer = async () => {
  const state = captureGridState(gridApi);

  const response = await fetch("/api/grid-state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: currentUser.id,
      gridId: "myGrid",
      state,
    }),
  });

  const { id } = await response.json();

  // Update URL with state ID
  const url = new URL(window.location);
  url.searchParams.set("stateId", id);
  window.history.replaceState({}, "", url);
};

// Load from server
const loadFromServer = async (stateId: string) => {
  const response = await fetch(`/api/grid-state/${stateId}`);
  const { state } = await response.json();

  applyGridState(gridApi, state);
};
```

### Custom Compression Adapter

```tsx
// Using pako for gzip compression
import pako from "pako";

const gzipAdapter: CompressionAdapter = {
  compress: (data: string) => {
    const compressed = pako.deflate(data);
    return btoa(String.fromCharCode(...compressed));
  },
  decompress: (data: string) => {
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return pako.inflate(bytes, { to: "string" });
  },
};

setupGridStatePersistence(gridApi, {
  compressionAdapter: gzipAdapter,
});
```

### Handling Large States

```tsx
const setupHybridPersistence = (gridApi: GridApi) => {
  return setupGridStatePersistence(gridApi, {
    maxUrlLength: 500, // Keep URLs short

    onStateSave: async (state) => {
      const stateString = JSON.stringify(state);

      if (stateString.length > 500) {
        // Too large for URL, save to server
        const response = await fetch("/api/grid-state", {
          method: "POST",
          body: JSON.stringify(state),
        });
        const { id } = await response.json();

        // Put ID in URL instead of full state
        const url = new URL(window.location);
        url.searchParams.set("stateId", id);
        url.searchParams.delete("gridState");
        window.history.replaceState({}, "", url);
      }
    },

    onStateLoad: async (state) => {
      const url = new URL(window.location);
      const stateId = url.searchParams.get("stateId");

      if (stateId) {
        // Load from server
        const response = await fetch(`/api/grid-state/${stateId}`);
        return await response.json();
      }

      return state;
    },
  });
};
```

## Compression Statistics

LZ-String compression effectiveness:

| Content Type         | Original Size | Compressed | Reduction |
| -------------------- | ------------- | ---------- | --------- |
| Simple filters       | 312 chars     | 88 chars   | 72%       |
| 10 columns           | 1,245 chars   | 156 chars  | 87%       |
| Complex state        | 2,890 chars   | 342 chars  | 88%       |
| 50 columns + filters | 8,234 chars   | 876 chars  | 89%       |

## URL Length Considerations

Browser URL length limits:

- **Chrome/Firefox**: ~2,000 characters (safe)
- **Safari**: ~80,000 characters
- **Edge**: ~2,000 characters
- **Server default**: Usually 8,192 characters

Best practices:

1. Enable compression (default)
2. Use selective persistence
3. Implement server-side storage for large states
4. Monitor URL length with `maxUrlLength` option

## Migration Guide

From `setupFilterStatePersistence` (v1):

```tsx
// Old (filters only)
setupFilterStatePersistence(gridApi);

// New (with migration)
setupGridStatePersistence(gridApi, {
  includeFilters: true,
  includeColumns: false,
  includeSort: false,
  includeRowGrouping: false,
});
```

## Performance

- State updates are debounced (default 500ms)
- Compression is performed in a web worker when available
- State application is batched for efficiency
- React renders are minimized

## Browser Support

- All modern browsers with ES2015+ support
- Compression requires TextEncoder/TextDecoder
- IE11 not supported
