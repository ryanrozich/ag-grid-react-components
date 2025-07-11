# Category Selector Component

> **Status**: Planned feature (Issue #77)

The Category Selector component will provide category management functionality for filter presets.

## Planned Features

- Category creation and management
- Organize presets by category
- Category-based filtering
- Export/Import by category

## API (Proposed)

```typescript
interface CategorySelectorProps {
  presets: FilterPreset[];
  onCategorySelect: (category: string) => void;
  onCategoryCreate: (category: string) => void;
  onCategoryDelete: (category: string) => void;
}
```

## Usage (Proposed)

```typescript
import { CategorySelector } from '@ag-grid-community/react-components';

<CategorySelector
  presets={presets}
  onCategorySelect={handleCategorySelect}
/>
```

## Related Documentation

- [Filter Presets](./filter-presets.md)
- [Issue #77: Category Management](https://github.com/ryanrozich/ag-grid-react-components/issues/77)
