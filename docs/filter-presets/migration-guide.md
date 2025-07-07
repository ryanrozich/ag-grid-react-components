# Migration Guide

This guide helps you migrate to the filter preset system from various existing implementations.

## For Existing QuickFilterDropdown Users

If you're already using QuickFilterDropdown, enabling presets is straightforward:

### Legacy Version (v0.x)

```typescript
<QuickFilterDropdown
  columns={columnDefs}
  onFilterApplied={(filter) => {
    gridApi.setFilterModel(filter.filterModel);
  }}
/>
```

### Current Version (v1.0)

```typescript
<QuickFilterDropdown
  columns={columnDefs}
  onFilterApplied={(filter) => {
    gridApi.setFilterModel(filter.filterModel);
  }}
  enablePresets={{
    systemPresets: [
      {
        id: 'recent',
        name: 'Recent Activity',
        gridState: {
          filterModel: {
            date: { type: 'after', mode: 'relative', expressionFrom: 'Today-7d' }
          }
        }
      }
    ]
  }}
/>
```

**Key Points**:

- ✅ No breaking changes to existing functionality
- ✅ Presets are opt-in via `enablePresets` prop
- ✅ All existing props and callbacks continue to work
- ✅ Backward compatible with all versions

## For Custom Filter Implementations

If you have a custom filter UI, you can integrate the preset system:

### Step 1: Install the Package

```bash
npm install ag-grid-react-components@latest
```

### Step 2: Add Preset Hook

```typescript
import { useFilterPresets } from 'ag-grid-react-components';

function MyCustomFilters({ gridApi }) {
  // Your existing filter logic
  const [filters, setFilters] = useState({});

  // Add preset support
  const {
    presets,
    savePreset,
    loadPreset,
    activePreset
  } = useFilterPresets({
    gridApi,
    systemPresets: [
      // Your default presets
    ]
  });

  // Your existing filter UI
  return (
    <div>
      {/* Add preset selector */}
      <select
        value={activePreset?.id || ''}
        onChange={(e) => loadPreset(e.target.value)}
      >
        <option value="">Custom Filters</option>
        {presets.map(preset => (
          <option key={preset.id} value={preset.id}>
            {preset.name}
          </option>
        ))}
      </select>

      {/* Your existing filter controls */}
      <MyFilterControls
        filters={filters}
        onChange={setFilters}
      />

      {/* Add save preset button */}
      <button onClick={() => {
        savePreset({
          name: 'My Filters',
          gridState: { filterModel: filters }
        });
      }}>
        Save Current Filters
      </button>
    </div>
  );
}
```

### Step 3: Migration Checklist

- [ ] Install latest version of ag-grid-react-components
- [ ] Import `useFilterPresets` hook
- [ ] Add preset UI elements (selector, save button)
- [ ] Configure system presets if needed
- [ ] Test saving and loading presets
- [ ] Add error handling for storage issues
- [ ] Update documentation for users

## From URL-Based Filter Persistence

If you're currently using URL parameters for filter persistence:

### Before

```typescript
// Manual URL handling
function MyGrid() {
  useEffect(() => {
    // Load from URL
    const params = new URLSearchParams(location.search);
    const filters = params.get("filters");
    if (filters) {
      try {
        const decoded = JSON.parse(atob(filters));
        gridApi.setFilterModel(decoded);
      } catch (e) {
        console.error("Invalid filter URL");
      }
    }
  }, []);

  const saveToUrl = (filters) => {
    const encoded = btoa(JSON.stringify(filters));
    const url = new URL(location.href);
    url.searchParams.set("filters", encoded);
    history.pushState({}, "", url);
  };

  // ...
}
```

### Modern URL Handling

```typescript
// Using built-in URL sync
function MyGrid() {
  const { getShareableUrl, loadFromUrl } = useFilterPresets({
    gridApi,
    urlSync: true, // Enable automatic URL synchronization
    compression: true, // Use compression for shorter URLs
  });

  useEffect(() => {
    // Automatically loads from URL
    loadFromUrl();
  }, []);

  const shareFilters = () => {
    const url = getShareableUrl();
    navigator.clipboard.writeText(url);
    showNotification("Share link copied!");
  };

  // ...
}
```

### Benefits of Migration

- ✅ Automatic compression for shorter URLs
- ✅ Built-in error handling and validation
- ✅ Support for full grid state (not just filters)
- ✅ Browser back/forward navigation support
- ✅ Cross-browser compatibility

## From localStorage Filter Saving

If you have custom localStorage implementation:

### Legacy localStorage Implementation

```typescript
// Custom localStorage implementation
const STORAGE_KEY = "saved-filters";

function saveFilters(name: string, filters: any) {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  saved.push({
    id: Date.now().toString(),
    name,
    filters,
    date: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

function loadFilters() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function deleteFilter(id: string) {
  const saved = loadFilters().filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}
```

### Modern Preset System

```typescript
// Using preset system
const { presets, savePreset, deletePreset, userPresets } = useFilterPresets({
  gridApi,
  storage: {
    adapter: "localStorage",
    compression: true,
    maxPresets: 50,
  },
});

// Compatible API
async function saveFilters(name: string, filters: any) {
  await savePreset({
    name,
    gridState: { filterModel: filters },
  });
}

function loadFilters() {
  return userPresets; // Already loaded and validated
}

async function deleteFilter(id: string) {
  await deletePreset(id);
}
```

### Migration Script

```typescript
// One-time migration of existing saved filters
async function migrateExistingFilters() {
  const oldFilters = JSON.parse(localStorage.getItem("saved-filters") || "[]");

  if (oldFilters.length === 0) return;

  console.log(`Migrating ${oldFilters.length} saved filters...`);

  const { savePreset } = useFilterPresets({ gridApi });

  for (const old of oldFilters) {
    try {
      await savePreset({
        name: old.name,
        gridState: { filterModel: old.filters },
        createdAt: old.date || new Date().toISOString(),
        tags: ["migrated"],
      });
    } catch (error) {
      console.error(`Failed to migrate filter "${old.name}":`, error);
    }
  }

  // Backup old data
  localStorage.setItem("saved-filters.backup", JSON.stringify(oldFilters));

  // Remove old storage
  localStorage.removeItem("saved-filters");

  console.log("Migration completed!");
}
```

## From Server-Side Filter Storage

If you store filters on the server:

### Hybrid Approach (Recommended)

```typescript
// Combine local and server storage
class HybridPresetStorage implements PresetStorageAdapter {
  constructor(
    private apiClient: ApiClient,
    private localStorage: PresetStorageAdapter,
  ) {}

  async getAll(): Promise<UserPreset[]> {
    // Try local first for performance
    const local = await this.localStorage.getAll();

    // Sync with server in background
    this.syncWithServer();

    return local;
  }

  async save(preset: UserPreset): Promise<void> {
    // Save locally first
    await this.localStorage.save(preset);

    // Sync to server (don't block UI)
    this.apiClient.savePreset(preset).catch((error) => {
      console.error("Failed to sync preset to server:", error);
      // Mark for retry
      this.markForSync(preset.id);
    });
  }

  private async syncWithServer() {
    try {
      const serverPresets = await this.apiClient.getPresets();
      const localPresets = await this.localStorage.getAll();

      // Merge based on updatedAt timestamp
      const merged = this.mergePresets(serverPresets, localPresets);

      // Update local storage
      for (const preset of merged) {
        await this.localStorage.save(preset);
      }
    } catch (error) {
      console.error("Sync failed:", error);
    }
  }
}

// Usage
const storage = new HybridPresetStorage(apiClient, localStorage);

const { presets, savePreset } = useFilterPresets({
  gridApi,
  storage,
});
```

### Full Server Migration

```typescript
// Server-only storage adapter
class ServerStorage implements PresetStorageAdapter {
  constructor(private apiEndpoint: string) {}

  async getAll(): Promise<UserPreset[]> {
    const response = await fetch(`${this.apiEndpoint}/presets`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch presets");
    }

    return response.json();
  }

  async save(preset: UserPreset): Promise<void> {
    const response = await fetch(`${this.apiEndpoint}/presets`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preset),
    });

    if (!response.ok) {
      throw new Error("Failed to save preset");
    }
  }

  // Implement other methods...
}

// Usage
const { presets, savePreset } = useFilterPresets({
  gridApi,
  storage: new ServerStorage("/api"),
});
```

## Breaking Changes

### Version 0.x to 1.0

While we've maintained backward compatibility, some internal changes may affect advanced usage:

1. **Storage Format Changed**

   - Old format: `{ filters: [...], name: string }`
   - New format: `{ gridState: { filterModel: {...} }, name: string, ... }`
   - Migration is automatic

2. **Date Serialization**

   - Old: Dates stored as ISO strings
   - New: Dates stored with timezone information
   - Both formats are supported

3. **URL Parameter Names**
   - Old: `?filters=...`
   - New: `?p=...` (shorter, supports more data)
   - Old URLs continue to work

### Deprecations

The following features are deprecated and will be removed in v2.0:

```typescript
// Deprecated - use enablePresets instead
<QuickFilterDropdown
  savedFilters={filters} // ❌ Deprecated
  onSaveFilter={save}    // ❌ Deprecated
/>

// New way
<QuickFilterDropdown
  enablePresets={{
    systemPresets: filters,
    onPresetSaved: save
  }}
/>
```

## Testing Your Migration

### Unit Tests

```typescript
describe("Filter Preset Migration", () => {
  it("should load legacy filters", async () => {
    // Setup legacy data
    localStorage.setItem("saved-filters", JSON.stringify([{ id: "1", name: "Old Filter", filters: { status: "active" } }]));

    // Run migration
    await migrateExistingFilters();

    // Verify migrated
    const { presets } = renderHook(() => useFilterPresets({ gridApi })).result.current;

    expect(presets).toHaveLength(1);
    expect(presets[0].name).toBe("Old Filter");
    expect(presets[0].gridState.filterModel).toEqual({
      status: "active",
    });
  });
});
```

### E2E Tests

```typescript
test("legacy filters should be accessible after migration", async ({ page }) => {
  // Setup legacy filter in localStorage
  await page.evaluate(() => {
    localStorage.setItem("saved-filters", JSON.stringify([{ id: "1", name: "Legacy Filter", filters: { date: "recent" } }]));
  });

  // Navigate to app
  await page.goto("/");

  // Open preset dropdown
  await page.click('[data-testid="preset-dropdown"]');

  // Verify legacy filter appears
  await expect(page.locator("text=Legacy Filter")).toBeVisible();

  // Click to apply
  await page.click("text=Legacy Filter");

  // Verify filter applied
  await expect(page.locator(".ag-filter-active")).toBeVisible();
});
```

## Rollback Plan

If you need to rollback after migration:

```typescript
// 1. Restore backup data
function rollbackMigration() {
  const backup = localStorage.getItem("saved-filters.backup");
  if (backup) {
    localStorage.setItem("saved-filters", backup);
    localStorage.removeItem("ag-grid-filter-presets");
    location.reload();
  }
}

// 2. Feature flag for gradual rollout
const useNewPresets = localStorage.getItem("feature:new-presets") === "true";

if (useNewPresets) {
  // Use new preset system
} else {
  // Use legacy system
}

// 3. Version detection
const presetVersion = localStorage.getItem("preset-version");
if (!presetVersion || presetVersion < "1.0.0") {
  // Use compatibility mode
}
```

## Getting Help

- **Documentation**: See the [Getting Started Guide](./getting-started.md)
- **API Reference**: Check the [API documentation](./api-reference.md)
- **Issues**: Report problems on [GitHub](https://github.com/your-repo/issues)
- **Support**: Contact <support@example.com> for enterprise customers

## Migration Timeline

1. **Phase 1** (Current): Filter preset system available as opt-in
2. **Phase 2** (v1.5): Deprecation warnings for old APIs
3. **Phase 3** (v2.0): Remove deprecated APIs
4. **Phase 4** (v2.x): Performance optimizations and new features

Plan your migration accordingly to avoid breaking changes.
