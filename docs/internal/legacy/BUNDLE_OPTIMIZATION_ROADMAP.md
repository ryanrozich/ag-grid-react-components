# Bundle Size Optimization Roadmap

## Current Assessment: C+ (Needs Work)

### Current Metrics

- **ES Module**: 329KB (66KB gzipped) - TOO LARGE
- **UMD**: 227KB (54KB gzipped) - ACCEPTABLE
- **Target**: <100KB (25KB gzipped) for a focused component library

### Completed ✅

1. Moved demo-only dependencies to devDependencies
   - react-router-dom
   - react-syntax-highlighter
   - All @types/\* packages

### High Priority Optimizations

#### 1. Make react-datepicker Optional (Impact: -40KB gzipped)

````typescript
// Current: Direct import
import DatePicker from "react-datepicker";

// Optimized: Dynamic import with interface
interface DatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
  // ... other props
}

const DatePickerComponent = lazy(() =>
  import("react-datepicker").then((mod) => ({
    default: mod.default as React.FC<DatePickerProps>,
  })),
);

// Or better: Make it a peer dependency and inject
interface DateFilterProps {
  datePickerComponent?: React.ComponentType<DatePickerProps>;
}
```text

#### 2. Optimize lz-string Import (Impact: -5KB gzipped)

```typescript
// Current: Always imported
import LZString from "lz-string";

// Optimized: Dynamic import for compression feature
const compress = async (data: string): Promise<string> => {
  const LZString = await import("lz-string");
  return LZString.default.compressToEncodedURIComponent(data);
};
```text

#### 3. Remove CSS Bundle Duplication

- Currently including react-datepicker CSS in bundle
- Should be imported by consumer or made optional

#### 4. Tree-Shaking Improvements

```typescript
// Create separate entry points
export { DateFilter } from "./components/DateFilter";
export { QuickFilterDropdown } from "./components/QuickFilterDropdown";
export { ActiveFilters } from "./components/ActiveFilters";
// Utils as separate chunk
export * as gridUtils from "./utils/gridStateUtils";
```text

### Medium Priority

#### 5. Replace Heavy Dependencies

- Consider native date input with lightweight enhancement
- Or use headless UI pattern where styling is consumer's responsibility

#### 6. Build Output Optimization

```json
// vite.config.ts adjustments
{
  "build": {
    "rollupOptions": {
      "output": {
        "manualChunks": {
          "date-utils": ["date-fns"],
          "compression": ["lz-string"]
        }
      }
    }
  }
}
````

### Bundle Size Targets by Component

| Component           | Current | Target | Strategy                           |
| ------------------- | ------- | ------ | ---------------------------------- |
| DateFilter          | ~150KB  | 30KB   | Remove datepicker, use composition |
| QuickFilterDropdown | ~50KB   | 15KB   | Already optimized                  |
| ActiveFilters       | ~30KB   | 10KB   | Remove unnecessary AG Grid imports |
| Utils               | ~100KB  | 20KB   | Dynamic imports, tree-shaking      |

### Implementation Priority

1. **Week 1**: Dynamic imports for lz-string
2. **Week 2**: Make react-datepicker pluggable
3. **Week 3**: Optimize build configuration
4. **Week 4**: Consider lighter alternatives

### Expected Results

- Initial: 329KB → 200KB (40% reduction)
- With all optimizations: <100KB (70% reduction)
- Gzipped: 66KB → 25KB

### Breaking Change Considerations

- Making datepicker optional = major version bump
- Worth it for 40KB savings
- Provide migration guide and examples

### Code Quality Impact

- Better separation of concerns
- More flexible architecture
- Follows "bring your own X" pattern common in modern libraries
