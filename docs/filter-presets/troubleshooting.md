# Troubleshooting Guide

This guide covers common issues you might encounter when working with filter presets and their solutions.

## Common Issues

### Storage Quota Exceeded

**Problem**: "QuotaExceededError" when trying to save presets.

**Symptoms**:

- Error message: "Failed to save preset: storage quota exceeded"
- New presets cannot be saved
- Existing presets may not update

**Solutions**:

1. **Check storage usage**:

```typescript
const { getStorageInfo } = usePresetStorage();

const info = await getStorageInfo();
console.log(`Using ${info.used} of ${info.quota} bytes`);
console.log(`${info.count} presets stored`);
```

2. **Clean up old presets**:

```typescript
// Delete presets older than 90 days
const { presets, deletePreset } = useFilterPresets({ gridApi });

const threeMonthsAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;

for (const preset of presets) {
  if (preset.type === "user" && new Date(preset.updatedAt).getTime() < threeMonthsAgo) {
    await deletePreset(preset.id);
  }
}
```

3. **Enable compression**:

```typescript
const storage = createPresetStorage({
  adapter: "localStorage",
  compression: true, // Reduces size by 60-80%
});
```

4. **Use IndexedDB for larger storage**:

```typescript
const storage = createPresetStorage({
  adapter: "indexedDB", // Much larger quota (50MB+)
  dbName: "FilterPresets",
});
```

### Presets Not Loading

**Problem**: Saved presets don't appear or load incorrectly.

**Common Causes**:

- Browser privacy mode
- Cross-origin issues
- Corrupted storage data
- Version mismatches

**Solutions**:

1. **Check browser mode**:

```typescript
function isPrivateMode(): boolean {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return false;
  } catch (e) {
    return true;
  }
}

if (isPrivateMode()) {
  console.warn("Private mode detected - presets may not persist");
}
```

2. **Validate storage data**:

```typescript
async function validateAndRepairStorage() {
  try {
    const raw = localStorage.getItem("ag-grid-filter-presets");
    if (!raw) return;

    const presets = JSON.parse(raw);
    const validPresets = [];

    for (const preset of presets) {
      const validation = validatePreset(preset);
      if (validation.isValid) {
        validPresets.push(validation.sanitized);
      } else {
        console.warn("Invalid preset found:", validation.errors);
      }
    }

    // Save back valid presets
    localStorage.setItem("ag-grid-filter-presets", JSON.stringify(validPresets));
  } catch (error) {
    console.error("Storage validation failed:", error);
    // Consider clearing corrupt data
    if (confirm("Preset data appears corrupted. Clear and start fresh?")) {
      localStorage.removeItem("ag-grid-filter-presets");
    }
  }
}
```

3. **Handle version mismatches**:

```typescript
const { presets, error } = useFilterPresets({
  gridApi,
  onError: (error) => {
    if (error.code === "VERSION_MISMATCH") {
      // Attempt migration
      return migratePresets(error.presets, error.fromVersion, CURRENT_VERSION);
    }
    throw error;
  },
});
```

### URL Sharing Not Working

**Problem**: Shareable URLs don't load the correct filters.

**Common Issues**:

- URL too long for some browsers/servers
- Special characters not properly encoded
- Hash fragments vs query parameters

**Solutions**:

1. **Use query parameters instead of hash**:

```typescript
// Bad - hash fragments aren't sent to server
const url = `${location.origin}#preset=${encodedData}`;

// Good - query parameters are more reliable
const url = `${location.origin}?p=${encodedData}`;
```

2. **Implement URL shortening**:

```typescript
async function createShortUrl(longUrl: string): Promise<string> {
  // For very long URLs, store the preset and use an ID
  if (longUrl.length > 2000) {
    const preset = parseShareableUrl(longUrl);
    const saved = await savePreset({
      ...preset,
      sharing: { enabled: true },
    });

    return `${location.origin}?preset=${saved.id}`;
  }

  return longUrl;
}
```

3. **Handle URL parsing errors gracefully**:

```typescript
function loadFromUrl() {
  try {
    const params = new URLSearchParams(location.search);
    const presetData = params.get("p");

    if (!presetData) return;

    const decoded = decodeShareableUrl(presetData);
    if (decoded) {
      gridApi.setFilterModel(decoded.filterModel);
    }
  } catch (error) {
    console.error("Failed to load from URL:", error);

    // Show user-friendly message
    showNotification({
      type: "error",
      message: "Unable to load shared filters. The link may be invalid or expired.",
    });
  }
}
```

### Import/Export Failures

**Problem**: Preset import fails or exports are corrupted.

**Common Causes**:

- Invalid JSON format
- Character encoding issues
- File size limitations

**Solutions**:

1. **Validate JSON before import**:

```typescript
async function importPresets(file: File) {
  try {
    const text = await file.text();

    // Try to parse JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON format. Please check the file.");
    }

    // Validate structure
    if (!Array.isArray(data)) {
      throw new Error("Expected an array of presets");
    }

    // Validate each preset
    const validPresets = [];
    for (const preset of data) {
      const validation = validatePreset(preset);
      if (validation.isValid) {
        validPresets.push(validation.sanitized);
      }
    }

    // Import valid presets
    return await importValidPresets(validPresets);
  } catch (error) {
    console.error("Import failed:", error);
    throw error;
  }
}
```

2. **Handle encoding issues**:

```typescript
function exportPresets(presets: Preset[]): Blob {
  // Ensure proper UTF-8 encoding
  const json = JSON.stringify(presets, null, 2);
  const blob = new Blob([json], {
    type: "application/json;charset=utf-8",
  });

  return blob;
}

// For download
function downloadPresets(presets: Preset[]) {
  const blob = exportPresets(presets);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `filter-presets-${Date.now()}.json`;
  link.click();

  // Clean up
  URL.revokeObjectURL(url);
}
```

## Browser-Specific Issues

### Safari Private Browsing

Safari in private mode has very limited localStorage (0-1MB).

**Solution**:

```typescript
function getSafariPrivateStorage(): PresetStorageAdapter {
  // Use sessionStorage as fallback
  return {
    async getAll() {
      const data = sessionStorage.getItem("temp-presets");
      return data ? JSON.parse(data) : [];
    },

    async save(preset: UserPreset) {
      const presets = await this.getAll();
      presets.push(preset);
      sessionStorage.setItem("temp-presets", JSON.stringify(presets));
    },
    // ... other methods
  };
}

// Detect and use appropriate storage
const storage = isSafariPrivate() ? getSafariPrivateStorage() : createPresetStorage({ adapter: "localStorage" });
```

### Firefox Tracking Protection

Firefox's Enhanced Tracking Protection can block localStorage in some cases.

**Solution**:

```typescript
async function checkStorageAccess(): Promise<boolean> {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    const { quota = 0 } = await navigator.storage.estimate();
    return quota > 0;
  }

  // Fallback test
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Show warning if blocked
if (!(await checkStorageAccess())) {
  showWarning("Storage access appears to be blocked. " + "Please check your browser's tracking protection settings.");
}
```

### IE11 Compatibility

For legacy browser support:

```typescript
// Polyfill for Object.entries
if (!Object.entries) {
  Object.entries = function (obj: any) {
    return Object.keys(obj).map((key) => [key, obj[key]]);
  };
}

// Use ES5-compatible storage
class LegacyStorage implements PresetStorageAdapter {
  getAll(): Promise<UserPreset[]> {
    return new Promise(function (resolve) {
      try {
        var data = localStorage.getItem("presets");
        resolve(data ? JSON.parse(data) : []);
      } catch (e) {
        resolve([]);
      }
    });
  }

  // ... other methods using ES5 syntax
}
```

## Performance Issues

### Slow Preset Loading

**Problem**: Presets take too long to load or apply.

**Solutions**:

1. **Implement pagination**:

```typescript
const { presets, loadMore, hasMore } = useFilterPresets({
  gridApi,
  pagination: {
    pageSize: 20,
    loadOnScroll: true,
  },
});
```

2. **Use virtual scrolling for preset lists**:

```typescript
import { FixedSizeList } from 'react-window';

function PresetList({ presets, onSelect }) {
  return (
    <FixedSizeList
      height={400}
      itemCount={presets.length}
      itemSize={60}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <PresetItem
            preset={presets[index]}
            onSelect={onSelect}
          />
        </div>
      )}
    </FixedSizeList>
  );
}
```

3. **Defer complex operations**:

```typescript
// Use requestIdleCallback for non-critical updates
function savePresetDeferred(preset: UserPreset) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(
      () => {
        storage.save(preset);
      },
      { timeout: 2000 },
    );
  } else {
    // Fallback to setTimeout
    setTimeout(() => {
      storage.save(preset);
    }, 100);
  }
}
```

### Memory Leaks

**Problem**: Memory usage increases over time.

**Solutions**:

1. **Clean up event listeners**:

```typescript
useEffect(() => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === storageKey) {
      refreshPresets();
    }
  };

  window.addEventListener("storage", handleStorageChange);

  // Important: Clean up
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, [storageKey]);
```

2. **Limit cache size**:

```typescript
class CachedStorage implements PresetStorageAdapter {
  private cache = new Map<string, UserPreset>();
  private maxCacheSize = 100;

  async get(id: string): Promise<UserPreset | null> {
    // Implement LRU cache
    if (this.cache.has(id)) {
      const preset = this.cache.get(id)!;
      // Move to end (most recently used)
      this.cache.delete(id);
      this.cache.set(id, preset);
      return preset;
    }

    const preset = await this.storage.get(id);
    if (preset) {
      this.addToCache(id, preset);
    }

    return preset;
  }

  private addToCache(id: string, preset: UserPreset) {
    if (this.cache.size >= this.maxCacheSize) {
      // Remove least recently used
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(id, preset);
  }
}
```

## Migration Failures

**Problem**: Presets from older versions don't work.

**Solutions**:

1. **Implement robust migration**:

```typescript
async function migratePresets() {
  const stored = localStorage.getItem("ag-grid-filter-presets");
  if (!stored) return;

  try {
    const data = JSON.parse(stored);
    const version = data.version || "1.0.0";

    if (version < CURRENT_VERSION) {
      console.log(`Migrating presets from ${version} to ${CURRENT_VERSION}`);

      const migrated = await runMigrations(data.presets, version);

      localStorage.setItem(
        "ag-grid-filter-presets",
        JSON.stringify({
          version: CURRENT_VERSION,
          presets: migrated,
        }),
      );

      console.log("Migration completed successfully");
    }
  } catch (error) {
    console.error("Migration failed:", error);

    // Backup old data
    localStorage.setItem("ag-grid-filter-presets.backup", stored);

    // Show user notification
    showNotification({
      type: "warning",
      message: "Some saved filters may need to be recreated due to updates.",
      action: {
        label: "Restore Backup",
        onClick: restoreBackup,
      },
    });
  }
}
```

2. **Provide rollback option**:

```typescript
function restoreBackup() {
  const backup = localStorage.getItem("ag-grid-filter-presets.backup");
  if (backup) {
    localStorage.setItem("ag-grid-filter-presets", backup);
    location.reload();
  }
}
```

## Security Issues

### XSS in Preset Names

**Problem**: Malicious code in preset names executed when rendered.

**Solution**:

```typescript
// Always sanitize user input
import DOMPurify from 'isomorphic-dompurify';

function sanitizePresetName(name: string): string {
  return DOMPurify.sanitize(name, {
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: []
  });
}

// Safe rendering
function PresetItem({ preset }) {
  return <div>{preset.name}</div>; // React escapes by default
}

// If using innerHTML, always sanitize
function PresetDescription({ html }) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'br'],
    ALLOWED_ATTR: []
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

## Debugging Tips

### Enable Debug Logging

```typescript
// Add to your app initialization
if (process.env.NODE_ENV === "development") {
  window.DEBUG_PRESETS = true;
}

// In your preset code
function debugLog(...args: any[]) {
  if (window.DEBUG_PRESETS) {
    console.log("[Presets]", ...args);
  }
}

// Use throughout your code
debugLog("Saving preset:", preset);
debugLog("Storage info:", await getStorageInfo());
```

### Storage Inspector

```typescript
// Utility to inspect storage
window.inspectPresetStorage = async function () {
  const storage = createPresetStorage({ adapter: "localStorage" });
  const presets = await storage.getAll();
  const info = await storage.getInfo();

  console.group("Preset Storage Inspector");
  console.log("Storage Info:", info);
  console.log("Preset Count:", presets.length);
  console.table(
    presets.map((p) => ({
      id: p.id,
      name: p.name,
      created: new Date(p.createdAt).toLocaleDateString(),
      size: JSON.stringify(p).length,
    })),
  );
  console.groupEnd();
};
```

### Performance Profiling

```typescript
// Profile preset operations
async function profilePresetOperations() {
  const operations = [
    { name: "Load All Presets", fn: () => storage.getAll() },
    { name: "Save Preset", fn: () => storage.save(testPreset) },
    { name: "Apply Preset", fn: () => gridApi.setFilterModel(testModel) },
    { name: "Generate URL", fn: () => createShareableUrl(testPreset) },
  ];

  for (const op of operations) {
    const start = performance.now();
    await op.fn();
    const duration = performance.now() - start;
    console.log(`${op.name}: ${duration.toFixed(2)}ms`);
  }
}
```

## Getting Help

If you encounter issues not covered here:

1. **Check browser console** for error messages
2. **Enable debug logging** (see above)
3. **Test in incognito/private mode** to rule out extensions
4. **Try a different browser** to identify browser-specific issues
5. **Check the [GitHub issues](https://github.com/your-repo/issues)**
6. **File a bug report** with:
   - Browser version
   - Error messages
   - Steps to reproduce
   - Debug logs
