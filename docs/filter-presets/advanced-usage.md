# Advanced Topics

This guide covers advanced topics for filter presets including performance optimization, custom storage strategies, security considerations, and enterprise use cases.

## Performance Optimization

### Compression Strategies

Filter presets can grow large with complex filter models. Use compression to reduce storage size and URL length:

````typescript
import { createPresetStorage } from "ag-grid-react-components";

// Enable LZ-String compression (reduces size by ~60-80%)
const storage = createPresetStorage({
  adapter: "localStorage",
  compression: true, // Uses LZ-String by default
});

// Custom compression with pako (gzip)
import pako from "pako";

const customStorage = createPresetStorage({
  adapter: "localStorage",
  compression: {
    compress: (data: string) => {
      const uint8Array = new TextEncoder().encode(data);
      const compressed = pako.deflate(uint8Array);
      return btoa(String.fromCharCode(...compressed));
    },
    decompress: (data: string) => {
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const decompressed = pako.inflate(bytes);
      return new TextDecoder().decode(decompressed);
    },
  },
});
```text

### Lazy Loading Presets

For applications with many presets, implement lazy loading:

```typescript
const { presets, loadMore, hasMore } = useFilterPresets({
  gridApi,
  pagination: {
    pageSize: 20,
    loadOnScroll: true
  }
});

// Or manual pagination
function PresetList() {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const visiblePresets = useMemo(
    () => presets.slice(page * pageSize, (page + 1) * pageSize),
    [presets, page, pageSize]
  );

  return (
    <>
      {visiblePresets.map(preset => (
        <PresetItem key={preset.id} preset={preset} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(presets.length / pageSize)}
        onPageChange={setPage}
      />
    </>
  );
}
```text

### Debouncing Auto-Save

Prevent excessive saves when users are actively filtering:

```typescript
const { savePreset } = useFilterPresets({
  gridApi,
  autoSave: true,
  autoSaveDelay: 2000, // Wait 2 seconds after last change
});

// Or implement custom debouncing
const debouncedSave = useMemo(
  () =>
    debounce((filterModel) => {
      savePreset({
        name: "Auto-saved filters",
        filterModel,
        isAutoSave: true,
      });
    }, 2000),
  [savePreset],
);

// In your filter change handler
onFilterChanged: (params) => {
  if (autoSaveEnabled) {
    debouncedSave(params.api.getFilterModel());
  }
};
```text

### Optimizing URL Length

For shareable URLs, optimize the encoded data:

```typescript
// Use short property names
const optimizedModel = {
  f: {
    // filters
    d: { t: "after", m: "rel", e: "Today-7d" }, // date filter
    s: { t: "eq", v: "active" }, // status filter
  },
  s: [{ c: "date", d: "asc" }], // sort
  c: ["date", "status", "amount"], // visible columns
};

// Use base64url encoding (no padding, URL-safe)
function encodeShareableUrl(gridState: GridState): string {
  const minified = minifyGridState(gridState);
  const json = JSON.stringify(minified);
  const compressed = LZString.compressToBase64(json);
  const urlSafe = compressed.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return `${window.location.origin}?p=${urlSafe}`;
}
```text

## Storage Strategies

### IndexedDB for Large Datasets

When localStorage isn't enough (5-10MB limit), use IndexedDB:

```typescript
const storage = createPresetStorage({
  adapter: "indexedDB",
  dbName: "MyAppFilters",
  storeName: "presets",
  maxSize: 50 * 1024 * 1024, // 50MB limit
});

// Custom IndexedDB implementation
class IndexedDBStorage implements PresetStorageAdapter {
  private db: IDBDatabase;

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("FilterPresets", 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("presets")) {
          const store = db.createObjectStore("presets", { keyPath: "id" });
          store.createIndex("createdAt", "createdAt");
          store.createIndex("name", "name");
          store.createIndex("tags", "tags", { multiEntry: true });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async getAll(): Promise<UserPreset[]> {
    const transaction = this.db.transaction(["presets"], "readonly");
    const store = transaction.objectStore("presets");
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Implement other methods...
}
```text

### Hybrid Storage Strategy

Combine multiple storage mechanisms for optimal performance:

```typescript
class HybridStorage implements PresetStorageAdapter {
  private memoryCache = new Map<string, UserPreset>();
  private localStorage = new LocalStorageAdapter();
  private indexedDB = new IndexedDBAdapter();

  async get(id: string): Promise<UserPreset | null> {
    // Check memory first
    if (this.memoryCache.has(id)) {
      return this.memoryCache.get(id)!;
    }

    // Check localStorage for recent presets
    const recent = await this.localStorage.get(id);
    if (recent) {
      this.memoryCache.set(id, recent);
      return recent;
    }

    // Fall back to IndexedDB for older presets
    const preset = await this.indexedDB.get(id);
    if (preset) {
      this.memoryCache.set(id, preset);
    }

    return preset;
  }

  async save(preset: UserPreset): Promise<void> {
    // Save to memory
    this.memoryCache.set(preset.id, preset);

    // Save recent presets to localStorage
    const recentPresets = await this.getRecentPresets();
    if (recentPresets.length < 10) {
      await this.localStorage.save(preset);
    }

    // Always save to IndexedDB
    await this.indexedDB.save(preset);
  }
}
```text

### Cloud Storage Integration

For enterprise applications, integrate with cloud storage:

```typescript
class CloudStorage implements PresetStorageAdapter {
  constructor(
    private apiEndpoint: string,
    private authToken: string,
  ) {}

  async getAll(): Promise<UserPreset[]> {
    const response = await fetch(`${this.apiEndpoint}/presets`, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch presets: ${response.statusText}`);
    }

    return response.json();
  }

  async save(preset: UserPreset): Promise<void> {
    const response = await fetch(`${this.apiEndpoint}/presets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preset),
    });

    if (!response.ok) {
      throw new Error(`Failed to save preset: ${response.statusText}`);
    }
  }

  // Implement sync with local storage
  async syncWithLocal(localStorage: PresetStorageAdapter) {
    const cloudPresets = await this.getAll();
    const localPresets = await localStorage.getAll();

    // Merge based on updatedAt timestamp
    const merged = this.mergePresets(cloudPresets, localPresets);

    // Update both storages
    await Promise.all([this.updateAll(merged.forCloud), localStorage.updateAll(merged.forLocal)]);
  }
}
```text

## Security Considerations

### Input Sanitization

Always sanitize preset data before saving or applying:

```typescript
import DOMPurify from "isomorphic-dompurify";

function sanitizePreset(preset: unknown): UserPreset {
  if (typeof preset !== "object" || !preset) {
    throw new InvalidPresetError("Invalid preset format");
  }

  const raw = preset as any;

  return {
    id: sanitizeId(raw.id),
    name: DOMPurify.sanitize(raw.name, { ALLOWED_TAGS: [] }),
    description: raw.description ? DOMPurify.sanitize(raw.description, { ALLOWED_TAGS: [] }) : undefined,
    gridState: sanitizeGridState(raw.gridState),
    createdAt: sanitizeDate(raw.createdAt),
    updatedAt: sanitizeDate(raw.updatedAt),
    type: "user",
    tags: raw.tags?.map((tag: string) => DOMPurify.sanitize(tag, { ALLOWED_TAGS: [] })),
  };
}

function sanitizeGridState(gridState: unknown): Partial<GridState> {
  // Validate against a schema
  const schema = z.object({
    filterModel: z.record(z.unknown()).optional(),
    sortModel: z
      .array(
        z.object({
          colId: z.string(),
          sort: z.enum(["asc", "desc"]),
        }),
      )
      .optional(),
    columnState: z.array(z.unknown()).optional(),
  });

  return schema.parse(gridState);
}
```text

### XSS Prevention

Prevent XSS attacks when rendering preset names:

```typescript
// Bad - vulnerable to XSS
function PresetItem({ preset }) {
  return <div dangerouslySetInnerHTML={{ __html: preset.name }} />;
}

// Good - safe rendering
function PresetItem({ preset }) {
  return <div>{preset.name}</div>;
}

// If HTML is needed, sanitize first
function PresetItem({ preset }) {
  const sanitizedHtml = DOMPurify.sanitize(preset.description || '', {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br']
  });

  return (
    <div>
      <h3>{preset.name}</h3>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}
```text

### URL Injection Protection

Validate and sanitize URLs when parsing shareable links:

```typescript
function parseShareableUrl(url: string): ShareableUrlData | null {
  try {
    const urlObj = new URL(url);

    // Validate origin
    if (urlObj.origin !== window.location.origin) {
      throw new Error("Invalid origin");
    }

    // Extract and validate preset data
    const presetData = urlObj.searchParams.get("p");
    if (!presetData) {
      return null;
    }

    // Decode and decompress
    const decoded = decodePresetData(presetData);

    // Validate structure
    return validatePresetData(decoded);
  } catch (error) {
    console.error("Invalid shareable URL:", error);
    return null;
  }
}

// Prevent open redirects
function createShareableUrl(preset: Preset): string {
  const data = encodePresetData(preset);
  const url = new URL(window.location.href);
  url.searchParams.set("p", data);

  // Remove any potential redirect params
  url.searchParams.delete("redirect");
  url.searchParams.delete("return_to");

  return url.toString();
}
```text

### Encryption for Sensitive Data

For sensitive filter configurations, add encryption:

```typescript
import { encrypt, decrypt } from "crypto-js/aes";

class EncryptedStorage implements PresetStorageAdapter {
  constructor(
    private baseStorage: PresetStorageAdapter,
    private encryptionKey: string,
  ) {}

  async save(preset: UserPreset): Promise<void> {
    const sensitive = {
      gridState: preset.gridState,
      description: preset.description,
    };

    const encrypted = {
      ...preset,
      gridState: encrypt(JSON.stringify(sensitive.gridState), this.encryptionKey).toString(),
      description: sensitive.description ? encrypt(sensitive.description, this.encryptionKey).toString() : undefined,
    };

    await this.baseStorage.save(encrypted as any);
  }

  async get(id: string): Promise<UserPreset | null> {
    const encrypted = await this.baseStorage.get(id);
    if (!encrypted) return null;

    return {
      ...encrypted,
      gridState: JSON.parse(decrypt(encrypted.gridState as any, this.encryptionKey).toString()),
      description: encrypted.description ? decrypt(encrypted.description as any, this.encryptionKey).toString() : undefined,
    };
  }
}
```text

## Preset Versioning

Handle breaking changes in filter models:

```typescript
interface VersionedPreset extends UserPreset {
  version: string;
  schemaVersion: number;
}

class PresetMigrationService {
  private migrations: Map<string, MigrationFunction> = new Map([
    ["1.0.0->2.0.0", this.migrateV1toV2],
    ["2.0.0->3.0.0", this.migrateV2toV3],
  ]);

  async migratePreset(preset: VersionedPreset, targetVersion: string): Promise<VersionedPreset> {
    let current = preset;
    const path = this.getMigrationPath(preset.version, targetVersion);

    for (const step of path) {
      const migration = this.migrations.get(step);
      if (!migration) {
        throw new Error(`No migration found for ${step}`);
      }
      current = await migration(current);
    }

    return current;
  }

  private migrateV1toV2(preset: VersionedPreset): VersionedPreset {
    // Example: Rename filter properties
    const migrated = {
      ...preset,
      version: "2.0.0",
      gridState: {
        ...preset.gridState,
        filterModel: this.migrateFilterModelV1toV2(preset.gridState.filterModel),
      },
    };

    return migrated;
  }

  private migrateFilterModelV1toV2(filterModel?: any): any {
    if (!filterModel) return filterModel;

    const migrated: any = {};

    for (const [column, filter] of Object.entries(filterModel)) {
      // V1 used 'dateFrom', V2 uses 'startDate'
      if (filter && typeof filter === "object") {
        migrated[column] = {
          ...filter,
          startDate: (filter as any).dateFrom,
          endDate: (filter as any).dateTo,
        };
        delete migrated[column].dateFrom;
        delete migrated[column].dateTo;
      }
    }

    return migrated;
  }
}
```text

## Migration Strategies

### From Legacy Filter Systems

Migrate from older filter storage systems:

```typescript
async function migrateLegacyFilters() {
  // Check for legacy storage
  const legacyFilters = localStorage.getItem("app-saved-filters");
  if (!legacyFilters) return;

  try {
    const parsed = JSON.parse(legacyFilters);
    const { savePreset } = useFilterPresets({ gridApi });

    // Convert each legacy filter
    for (const legacy of parsed) {
      await savePreset({
        name: legacy.filterName || "Imported Filter",
        description: `Imported from legacy system on ${new Date().toLocaleDateString()}`,
        gridState: {
          filterModel: convertLegacyFilterModel(legacy.filters),
          sortModel: legacy.sorting,
          columnState: legacy.columns,
        },
        tags: ["imported", "legacy"],
      });
    }

    // Clean up legacy storage
    localStorage.removeItem("app-saved-filters");

    console.log(`Successfully migrated ${parsed.length} filters`);
  } catch (error) {
    console.error("Failed to migrate legacy filters:", error);
  }
}

function convertLegacyFilterModel(legacyFilters: any): any {
  // Map legacy filter structure to AG Grid filter model
  const filterModel: any = {};

  for (const filter of legacyFilters) {
    filterModel[filter.field] = {
      type: mapLegacyFilterType(filter.operator),
      filter: filter.value,
      filterTo: filter.valueTo,
    };
  }

  return filterModel;
}
```text

### Gradual Migration Strategy

For large applications, implement gradual migration:

```typescript
class GradualMigrationService {
  private migrationFlags = {
    useNewPresetSystem: false,
    migrateOnAccess: true,
    dualWrite: true,
  };

  async getPreset(id: string): Promise<Preset | null> {
    if (this.migrationFlags.useNewPresetSystem) {
      return this.newStorage.get(id);
    }

    // Try legacy first
    const legacy = await this.legacyStorage.get(id);
    if (!legacy) return null;

    // Migrate on access if enabled
    if (this.migrationFlags.migrateOnAccess) {
      const migrated = this.migrateLegacyPreset(legacy);
      await this.newStorage.save(migrated);
    }

    return legacy;
  }

  async savePreset(preset: Preset): Promise<void> {
    if (this.migrationFlags.dualWrite) {
      // Write to both systems during transition
      await Promise.all([this.newStorage.save(preset), this.legacyStorage.save(this.convertToLegacy(preset))]);
    } else if (this.migrationFlags.useNewPresetSystem) {
      await this.newStorage.save(preset);
    } else {
      await this.legacyStorage.save(this.convertToLegacy(preset));
    }
  }

  async completeMigration() {
    // Migrate all remaining presets
    const legacyPresets = await this.legacyStorage.getAll();

    for (const legacy of legacyPresets) {
      const migrated = this.migrateLegacyPreset(legacy);
      await this.newStorage.save(migrated);
    }

    // Update flags
    this.migrationFlags = {
      useNewPresetSystem: true,
      migrateOnAccess: false,
      dualWrite: false,
    };

    // Clean up legacy storage
    await this.legacyStorage.clear();
  }
}
```text

## Performance Benchmarks

Monitor and optimize preset operations:

```typescript
class PresetPerformanceMonitor {
  private metrics: Map<string, PerformanceMetric[]> = new Map();

  async measure<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();

    try {
      const result = await fn();
      const duration = performance.now() - start;

      this.recordMetric(operation, {
        duration,
        timestamp: Date.now(),
        success: true,
      });

      return result;
    } catch (error) {
      const duration = performance.now() - start;

      this.recordMetric(operation, {
        duration,
        timestamp: Date.now(),
        success: false,
        error: error.message,
      });

      throw error;
    }
  }

  getReport(): PerformanceReport {
    const report: PerformanceReport = {};

    for (const [operation, metrics] of this.metrics) {
      const durations = metrics.map((m) => m.duration);

      report[operation] = {
        count: metrics.length,
        avgDuration: durations.reduce((a, b) => a + b, 0) / durations.length,
        minDuration: Math.min(...durations),
        maxDuration: Math.max(...durations),
        p95Duration: this.percentile(durations, 0.95),
        errorRate: metrics.filter((m) => !m.success).length / metrics.length,
      };
    }

    return report;
  }

  private percentile(values: number[], p: number): number {
    const sorted = values.slice().sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * p) - 1;
    return sorted[index];
  }
}

// Usage
const monitor = new PresetPerformanceMonitor();

const { savePreset } = useFilterPresets({
  gridApi,
  storage: {
    save: async (preset) => {
      return monitor.measure("preset.save", async () => {
        await storage.save(preset);
      });
    },
    get: async (id) => {
      return monitor.measure("preset.get", async () => {
        return storage.get(id);
      });
    },
  },
});

// Get performance report
setInterval(() => {
  const report = monitor.getReport();
  console.log("Preset Performance:", report);

  // Send to analytics
  analytics.track("preset_performance", report);
}, 60000); // Every minute
````

## Best Practices Summary

1. **Always sanitize user input** before saving or applying presets
2. **Use compression** for large filter models and URL sharing
3. **Implement proper error handling** with user-friendly messages
4. **Version your preset schema** to handle future changes
5. **Monitor performance** and optimize based on usage patterns
6. **Consider privacy regulations** when storing user data
7. **Implement gradual migration** for legacy systems
8. **Use appropriate storage** based on data size and requirements
9. **Validate preset data** both client and server-side
10. **Provide clear feedback** during long operations
