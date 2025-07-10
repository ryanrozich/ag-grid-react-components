# DateFilter Component API Documentation

The DateFilter component is a powerful custom filter for AG Grid that supports both absolute dates and relative date expressions with advanced features like open-ended ranges and configurable inclusivity.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Filter Parameters](#filter-parameters)
- [Filter Model](#filter-model)
- [Open-Ended Ranges](#open-ended-ranges)
- [Inclusive/Exclusive Filtering](#inclusiveexclusive-filtering)
- [Relative Date Expressions](#relative-date-expressions)
- [Examples](#examples)

## Basic Usage

```tsx
import { AgGridReact } from "ag-grid-react";
import { RelativeDateFilter } from "ag-grid-react-components";
import "ag-grid-react-components/dist/style.css";

const columnDefs = [
  {
    field: "dueDate",
    filter: RelativeDateFilter,
    floatingFilter: true, // Optional: shows current filter in column header
  },
];
```

## Filter Parameters

The DateFilter accepts the following parameters through `filterParams`:

| Parameter         | Type                               | Default                    | Description                                        |
| ----------------- | ---------------------------------- | -------------------------- | -------------------------------------------------- |
| `dateFormat`      | `string`                           | `"yyyy-MM-dd"`             | Date format for display (uses date-fns format)     |
| `dateParser`      | `(value: unknown) => Date \| null` | Built-in parser            | Custom function to parse cell values to dates      |
| `defaultMode`     | `"absolute" \| "relative"`         | `"absolute"`               | Default filter mode                                |
| `minDate`         | `Date`                             | -                          | Minimum selectable date in date picker             |
| `maxDate`         | `Date`                             | -                          | Maximum selectable date in date picker             |
| `afterInclusive`  | `boolean`                          | `false`                    | Whether 'after' filter includes the boundary date  |
| `beforeInclusive` | `boolean`                          | `false`                    | Whether 'before' filter includes the boundary date |
| `rangeInclusive`  | `{from?: boolean, to?: boolean}`   | `{from: false, to: false}` | Inclusivity for date ranges                        |
| `buttons`         | `string[]`                         | `["reset", "apply"]`       | Which buttons to show                              |
| `closeOnApply`    | `boolean`                          | `false`                    | Close filter popup after applying                  |

### Example with Parameters

````tsx
const columnDefs = [
  {
    field: "date",
    filter: RelativeDateFilter,
    filterParams: {
      dateFormat: "MM/dd/yyyy",
      defaultMode: "relative",
      afterInclusive: true,
      beforeInclusive: true,
      rangeInclusive: {
        from: true,
        to: true,
      },
      minDate: new Date("2020-01-01"),
      maxDate: new Date("2030-12-31"),
    },
  },
];
```text

## Filter Model

The DateFilter uses the following model structure:

```typescript
interface DateFilterModel {
  type: "equals" | "notEqual" | "after" | "before" | "inRange";
  mode: "absolute" | "relative";

  // For absolute mode
  dateFrom?: Date | string | null;
  dateTo?: Date | string | null;

  // For relative mode
  expressionFrom?: string | null;
  expressionTo?: string | null;

  // Inclusivity flags
  fromInclusive?: boolean;
  toInclusive?: boolean;
}
```text

## Open-Ended Ranges

DateFilter supports open-ended ranges where you can specify only a start or end date:

### Filter from a date onwards (no end date)

```tsx
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "absolute",
    dateFrom: new Date("2024-01-01"),
    dateTo: null, // Open-ended to future
  },
});
```text

### Filter up to a date (no start date)

```tsx
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "absolute",
    dateFrom: null, // Open-ended from past
    dateTo: new Date("2024-12-31"),
  },
});
```text

### With relative expressions

```tsx
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "relative",
    expressionFrom: "Today-30d",
    expressionTo: null, // All dates from 30 days ago onwards
  },
});
````

## Inclusive/Exclusive Filtering

Control whether date boundaries are included or excluded from the filter results:

### Default Behavior (Exclusive)

- `after`: > (greater than)
- `before`: < (less than)
- `inRange`: > start AND < end

### Inclusive Behavior

Configure through `filterParams`:

````tsx
filterParams: {
  afterInclusive: true,    // 'after' becomes >= (greater than or equal)
  beforeInclusive: true,   // 'before' becomes <= (less than or equal)
  rangeInclusive: {
    from: true,  // Range start becomes >=
    to: true,    // Range end becomes <=
  },
}
```text

### Per-Filter Inclusivity

You can also set inclusivity per filter instance:

```tsx
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "absolute",
    dateFrom: new Date("2024-01-01"),
    dateTo: new Date("2024-12-31"),
    fromInclusive: true, // Include January 1st
    toInclusive: false, // Exclude December 31st
  },
});
````

## Relative Date Expressions

The DateFilter supports powerful relative date expressions:

### Basic Expressions

- `Today` - Current date at midnight
- `Now` - Current date and time
- `StartOfWeek` - Monday of current week
- `EndOfWeek` - Sunday of current week
- `StartOfMonth` - First day of current month
- `EndOfMonth` - Last day of current month
- `StartOfYear` - January 1st of current year
- `EndOfYear` - December 31st of current year

### Arithmetic Expressions

- `Today+7d` - 7 days from today
- `Today-30d` - 30 days ago
- `StartOfMonth+1M` - Start of next month
- `EndOfYear-1y` - End of last year

### Units

- `d` - days
- `w` - weeks
- `M` - months
- `y` - years
- `h` - hours (with Now)
- `m` - minutes (with Now)

## Examples

### Last 7 Days (Inclusive)

````tsx
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "relative",
    expressionFrom: "Today-7d",
    expressionTo: "Today",
    fromInclusive: true,
    toInclusive: true,
  },
});
```text

### Current Month

```tsx
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "relative",
    expressionFrom: "StartOfMonth",
    expressionTo: "EndOfMonth",
    fromInclusive: true,
    toInclusive: true,
  },
});
```text

### All Future Dates

```tsx
api.setFilterModel({
  dateColumn: {
    type: "after",
    mode: "relative",
    expressionFrom: "Today",
    fromInclusive: false, // Exclude today
  },
});
```text

### Dates Before 2024

```tsx
api.setFilterModel({
  dateColumn: {
    type: "before",
    mode: "absolute",
    dateFrom: new Date("2024-01-01"),
    toInclusive: false, // Exclude Jan 1, 2024
  },
});
```text

### Complex Date Range with Mixed Inclusivity

```tsx
// From January 1, 2024 (inclusive) to Today (exclusive)
api.setFilterModel({
  dateColumn: {
    type: "inRange",
    mode: "absolute",
    dateFrom: new Date("2024-01-01"),
    dateTo: new Date(), // Today
    fromInclusive: true,
    toInclusive: false,
  },
});
```text

## Integration with QuickFilterDropdown

The DateFilter works seamlessly with QuickFilterDropdown for predefined date ranges:

```tsx
const dateFilterPresets = [
  {
    id: "today",
    label: "Today",
    filterModel: {
      type: "equals",
      mode: "relative",
      expressionFrom: "Today",
    },
  },
  {
    id: "last7days",
    label: "Last 7 Days",
    filterModel: {
      type: "inRange",
      mode: "relative",
      expressionFrom: "Today-7d",
      expressionTo: "Today",
      fromInclusive: true,
      toInclusive: true,
    },
  },
  {
    id: "future",
    label: "Future Dates",
    filterModel: {
      type: "inRange",
      mode: "relative",
      expressionFrom: "Today",
      expressionTo: null, // Open-ended
      fromInclusive: false, // Exclude today
    },
  },
];

<QuickFilterDropdown api={gridApi} columnId="dueDate" options={dateFilterPresets} />;
```text

## TypeScript Support

The DateFilter is fully typed. Import the types for use in your code:

```tsx
import type { DateFilterModel, DateFilterParams } from "ag-grid-react-components";

const filterParams: DateFilterParams = {
  afterInclusive: true,
  rangeInclusive: { from: true, to: true },
};

const model: DateFilterModel = {
  type: "inRange",
  mode: "relative",
  expressionFrom: "Today-30d",
  expressionTo: "Today",
  fromInclusive: true,
  toInclusive: true,
};
````
