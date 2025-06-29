# Architecture Decision: Single Package Approach

**Date**: December 2024  
**Status**: Accepted  
**Issue**: [#2](https://github.com/ryanrozich/ag-grid-react-components/issues/2)

## Context

The project was initially planned with a modular multi-package architecture:

- `@agrc/core` - Core components
- `@agrc/adapters` - Date picker and compression adapters
- `@agrc/styles` - Optional styles
- `@agrc/compat` - v1 compatibility layer

However, the `@agrc` npm scope is already taken, and we need to decide on the packaging strategy.

## Decision

We will use a **single npm package** (`ag-grid-react-components`) with a modular internal structure.

## Rationale

### 1. Bundle Size Goals Already Achieved

- Current approach: 25KB minimal bundle
- Tree-shaking works perfectly with proper ESM exports
- Dynamic imports load heavy dependencies only when used

### 2. Better Developer Experience

```bash
# Simple installation
npm install ag-grid-react-components

# vs. Complex multi-package
npm install @scope/core @scope/adapters @scope/styles
```

### 3. Simpler Maintenance

- One version number to manage
- One changelog
- One release process
- Easier debugging for users

### 4. No Real Downside

The single package approach provides:

- ✅ Tree-shaking (same as multi-package)
- ✅ Optional dependencies
- ✅ Dynamic imports
- ✅ Type safety
- ✅ Minimal bundle sizes

### 5. Flexibility Retained

The internal code structure remains modular, so we can:

- Split into multiple packages later if needed
- Maintain clean separation of concerns
- Keep components independently testable

## Implementation

1. Use single `ag-grid-react-components` package
2. Mark heavy dependencies as `optionalDependencies`
3. Use dynamic imports for optional features
4. Maintain modular file structure internally

## Consequences

### Positive

- Simpler for users to adopt
- Easier to maintain and release
- Lower barrier to entry
- Unified documentation

### Negative

- Can't version components independently (rarely needed)
- Single package might seem "larger" on npm (though actual bundle is the same)

### Neutral

- Community adapters would need to be separate packages anyway

## Example Usage

```typescript
// Tree-shaking ensures only used code is bundled
import { createDateFilter } from "ag-grid-react-components"; // 25KB

// Optional features loaded dynamically
import { reactDatePickerAdapter } from "ag-grid-react-components"; // +40KB only if used
import { setupGridStatePersistence } from "ag-grid-react-components"; // +15KB only if used
```

## Future Considerations

If we need to split packages in the future:

1. The modular code structure makes this straightforward
2. We can provide a compatibility layer
3. Major version bump would signal the change

## References

- [Bundlephobia](https://bundlephobia.com/) - for verifying bundle sizes
- [npm Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- Similar decisions: [Chakra UI](https://github.com/chakra-ui/chakra-ui), [Ant Design](https://github.com/ant-design/ant-design)
