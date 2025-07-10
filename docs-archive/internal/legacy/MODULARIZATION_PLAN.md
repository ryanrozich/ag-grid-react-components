# Modularization Plan for ag-grid-react-components

## Executive Summary

Based on the bundle composition analysis, the library can reduce its bundle size by 30-40% through strategic modularization. The primary opportunities are making `react-datepicker` injectable/removable and making `lz-string` optional.

## Quick Wins (Immediate Impact)

### 1. Remove react-datepicker Dependency

**Impact**: -100KB (-31% of bundle size)

````typescript
// Option A: Use native HTML5 date inputs by default
interface DateFilterParams {
  useNativeDatePicker?: boolean; // default: true
  datePickerComponent?: React.ComponentType<DatePickerProps>;
}

// Option B: Inject date picker component
<DateFilter
  datePickerComponent={CustomDatePicker}
  // or
  datePickerComponent={lazy(() => import('react-datepicker'))}
/>
```text

### 2. Make lz-string Optional

**Impact**: -15KB (-5% of bundle size)

```typescript
// Make compression configurable
setupGridStatePersistence(api, {
  compression: false, // disable compression
  // or provide custom compressor
  compressor: {
    compress: (str) => customCompress(str),
    decompress: (str) => customDecompress(str),
  },
});
````

## Implementation Roadmap

### Phase 1: Non-Breaking Changes (v1.3.0)

1. Add `useNativeDatePicker` option to DateFilter
2. Add `compression` option to gridStateUtils
3. Keep existing behavior as default

### Phase 2: Deprecation Warnings (v1.4.0)

1. Warn when react-datepicker is auto-imported
2. Recommend explicit imports
3. Document migration path

### Phase 3: Breaking Changes (v2.0.0)

1. Remove bundled react-datepicker
2. Make lz-string peer dependency
3. Provide migration guide

## Code Examples

### Before (Current)

````typescript
import { DateFilter } from "ag-grid-react-components";
// Automatically includes react-datepicker + lz-string
```text

### After (Modularized)

```typescript
// Option 1: Lightweight (native dates)
import { DateFilter } from 'ag-grid-react-components';

// Option 2: With react-datepicker
import { DateFilter } from 'ag-grid-react-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

<DateFilter datePickerComponent={DatePicker} />

// Option 3: Lazy load date picker
const DatePicker = lazy(() => import('react-datepicker'));
<DateFilter datePickerComponent={DatePicker} />
```text

## Bundle Size Comparison

| Configuration            | Size        | Reduction |
| ------------------------ | ----------- | --------- |
| Current (all included)   | 321KB       | -         |
| Without react-datepicker | 221KB       | -31%      |
| Without lz-string        | 306KB       | -5%       |
| Both removed             | 206KB       | -36%      |
| Minified + Gzipped       | 65KB → 42KB | -35%      |

## Migration Guide

### For react-datepicker Users

```typescript
// Before
import { DateFilter } from 'ag-grid-react-components';

// After
import { DateFilter } from 'ag-grid-react-components';
import DatePicker from 'react-datepicker';

// In your component
<DateFilter
  params={{
    datePickerComponent: DatePicker
  }}
/>
```text

### For Native Date Input Users

```typescript
// No changes needed - native inputs become default
import { DateFilter } from "ag-grid-react-components";
```text

### For Grid State Persistence

```typescript
// Disable compression for smaller bundle
setupGridStatePersistence(api, {
  compression: false,
});

// Or keep compression with explicit import
import LZString from "lz-string";
setupGridStatePersistence(api, {
  compressor: LZString,
});
````

## Benefits

1. **Smaller Bundle**: 36% reduction for users who don't need all features
2. **Better Tree Shaking**: Unused dependencies can be eliminated
3. **Flexibility**: Users can choose their preferred date picker
4. **Performance**: Faster initial load for most users
5. **Future Proof**: Easy to swap implementations

## Minimal Breaking Changes

The modularization plan prioritizes backward compatibility:

- Default behavior changes but APIs remain the same
- Clear migration path with deprecation warnings
- Feature detection for graceful degradation
- Comprehensive migration documentation
