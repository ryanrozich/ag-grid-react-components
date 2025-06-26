# Date Expressions Reference

This document provides comprehensive documentation for the relative date expressions supported by the AG Grid React Components date filter.

## Overview

The date filter supports both absolute dates (using a date picker) and relative date expressions that are resolved dynamically. Relative expressions are particularly useful for creating saved filters, bookmarks, or scheduled reports that always show current data.

## Supported Expressions

### Basic Expressions

| Expression     | Description                        | Example Result (if today is 2024-12-25) |
| -------------- | ---------------------------------- | --------------------------------------- |
| `Today`        | Start of the current day           | 2024-12-25 00:00:00                     |
| `StartOfWeek`  | Start of the current week (Monday) | 2024-12-23 00:00:00                     |
| `EndOfWeek`    | End of the current week (Sunday)   | 2024-12-29 23:59:59                     |
| `StartOfMonth` | First day of the current month     | 2024-12-01 00:00:00                     |
| `EndOfMonth`   | Last day of the current month      | 2024-12-31 23:59:59                     |
| `StartOfYear`  | First day of the current year      | 2024-01-01 00:00:00                     |
| `EndOfYear`    | Last day of the current year       | 2024-12-31 23:59:59                     |

### Arithmetic Expressions

You can perform date arithmetic using the pattern: `Today[+/-][number][unit]`

#### Supported Units

| Unit | Description | Example                         |
| ---- | ----------- | ------------------------------- |
| `d`  | Days        | `Today+7d` (7 days from today)  |
| `w`  | Weeks       | `Today-2w` (2 weeks ago)        |
| `m`  | Months      | `Today+1m` (1 month from today) |
| `y`  | Years       | `Today-1y` (1 year ago)         |

#### Examples

| Expression  | Description             | Result (if today is 2024-12-25) |
| ----------- | ----------------------- | ------------------------------- |
| `Today+1d`  | Tomorrow                | 2024-12-26 00:00:00             |
| `Today-1d`  | Yesterday               | 2024-12-24 00:00:00             |
| `Today+7d`  | One week from today     | 2025-01-01 00:00:00             |
| `Today-30d` | 30 days ago             | 2024-11-25 00:00:00             |
| `Today+1w`  | One week from today     | 2025-01-01 00:00:00             |
| `Today+1m`  | One month from today    | 2025-01-25 00:00:00             |
| `Today+3m`  | Three months from today | 2025-03-25 00:00:00             |
| `Today+1y`  | One year from today     | 2025-12-25 00:00:00             |
| `Today-2y`  | Two years ago           | 2022-12-25 00:00:00             |

## Usage in Filter Types

### Equals / Not Equals

```typescript
{
  type: "equals",
  mode: "relative",
  expressionFrom: "Today"
}
```

### After / Before

```typescript
{
  type: "after",
  mode: "relative",
  expressionFrom: "Today-7d"
}
```

### In Range

```typescript
{
  type: "inRange",
  mode: "relative",
  expressionFrom: "Today-7d",
  expressionTo: "Today"
}
```

## Common Use Cases

### 1. Show Recent Data

- **Last 7 days**: `expressionFrom: "Today-7d"`, `expressionTo: "Today"`
- **Last 30 days**: `expressionFrom: "Today-30d"`, `expressionTo: "Today"`
- **Last quarter**: `expressionFrom: "Today-3m"`, `expressionTo: "Today"`

### 2. Show Future Data

- **Next 7 days**: `expressionFrom: "Today"`, `expressionTo: "Today+7d"`
- **Next month**: `expressionFrom: "Today"`, `expressionTo: "Today+1m"`

### 3. Specific Time Periods

- **This week**: `expressionFrom: "StartOfWeek"`, `expressionTo: "EndOfWeek"`
- **This month**: `expressionFrom: "StartOfMonth"`, `expressionTo: "EndOfMonth"`
- **This year**: `expressionFrom: "StartOfYear"`, `expressionTo: "EndOfYear"`

### 4. Rolling Windows

- **Rolling 90 days**: `expressionFrom: "Today-90d"`, `expressionTo: "Today"`
- **Year to date**: `expressionFrom: "StartOfYear"`, `expressionTo: "Today"`

## Implementation Details

### Source Code

The date expression parser is implemented in [`src/utils/dateExpressionParser.ts`](../src/utils/dateExpressionParser.ts).

### Key Functions

```typescript
// Parse and validate an expression
parseDateExpression(expression: string): DateExpression

// Check if an expression is valid
isValidDateExpression(expression: string): boolean

// Resolve an expression to a Date object
resolveDateExpression(expression: string): Date | null
```

### Security Features

1. **Input Sanitization**: All expressions are sanitized to prevent injection attacks
2. **Length Limits**: Maximum expression length of 50 characters
3. **Value Limits**: Maximum offset value of 10,000 units
4. **Character Restrictions**: Only alphanumeric characters, +, -, and spaces allowed

### Date Resolution

- All dates are resolved at the start of day (00:00:00) in the user's local timezone
- Week starts on Monday (ISO 8601 standard)
- Month and year calculations handle edge cases (e.g., Feb 30 → Feb 28/29)

## TypeScript Types

```typescript
export type DateUnit = "d" | "w" | "m" | "y";

export interface DateExpression {
  isValid: boolean;
  resolvedDate: Date | null;
  error?: string;
}

export interface DateFilterModel {
  type: "equals" | "notEqual" | "after" | "before" | "inRange";
  mode: "absolute" | "relative";
  dateFrom?: Date | null;
  dateTo?: Date | null;
  expressionFrom?: string;
  expressionTo?: string;
}
```

## Validation Rules

1. **Case Insensitive**: `Today`, `TODAY`, `today` are all valid
2. **No Spaces in Arithmetic**: `Today+7d` ✓, `Today + 7 d` ✗
3. **Positive Numbers Only**: `Today+0d` ✗, `Today-0d` ✗
4. **Special Characters**: Only alphanumeric, +, -, and spaces allowed

## Error Messages

| Error                                     | Cause                                   |
| ----------------------------------------- | --------------------------------------- |
| "Expression cannot be empty"              | Empty or whitespace-only input          |
| "Expression contains invalid characters"  | Special characters detected             |
| "Expression too long (max 50 characters)" | Input exceeds length limit              |
| "Invalid format. Use..."                  | Pattern doesn't match expected format   |
| "Invalid number in expression"            | Non-numeric value where number expected |
| "Number too large (max 10000)"            | Offset value exceeds limit              |
| "Number cannot be zero"                   | Zero offset not allowed                 |

## Integration with Quick Filters

The QuickFilterDropdown component provides pre-configured options using these expressions:

```typescript
export const DATE_FILTER_PRESETS: QuickFilterOption[] = [
  {
    id: "all",
    label: "All Time",
    filterModel: null, // Clears filter
  },
  {
    id: "today",
    label: "Today",
    filterModel: {
      mode: "relative",
      type: "equals",
      expressionFrom: "Today",
    },
  },
  {
    id: "last-7-days",
    label: "Last 7 Days",
    filterModel: {
      mode: "relative",
      type: "inRange",
      expressionFrom: "Today-7d",
      expressionTo: "Today",
    },
  },
  // ... more presets
];
```

## Browser Compatibility

The date expressions use the [date-fns](https://date-fns.org/) library for date manipulation, which supports all modern browsers and IE 11+.

## Testing

Comprehensive tests for date expressions are located in:

- [`src/utils/dateExpressionParser.test.ts`](../src/utils/dateExpressionParser.test.ts)
- [`src/components/DateFilter/hooks/useFilterValidation.test.ts`](../src/components/DateFilter/hooks/useFilterValidation.test.ts)

## See Also

- [Main README](../README.md) - General usage and installation
- [Date Filter Component](../src/components/DateFilter/README.md) - Component-specific documentation
- [Demo Application](https://demo.rozich.net/ag-grid-react-components/) - Live examples
