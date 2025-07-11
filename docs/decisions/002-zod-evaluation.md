# Zod Schema Evaluation for AG Grid React Components

## Overview

This document evaluates whether introducing [Zod](<[https://github.com/colinhacks/zo](https://github.com/colinhacks/zo)d>) for runtime validation would benefit the AG Grid React Components library.

## Current Validation Approach

The library currently uses:

- TypeScript interfaces for compile-time type safety
- Manual validation functions (e.g., `parseDateExpression`, `isValidDateExpression`)
- Custom error handling with descriptive messages

## Pros of Adding Zod

### 1. Runtime Type Safety

````typescript
import { z } from "zod";

const DateExpressionSchema = z.union([z.literal("Today"), z.literal("StartOfWeek"), z.literal("EndOfWeek"), z.literal("StartOfMonth"), z.literal("EndOfMonth"), z.literal("StartOfYear"), z.literal("EndOfYear"), z.string().regex(/^Today[+-]\d+[dwmy]$/)]);

// Runtime validation
const result = DateExpressionSchema.safeParse("Today+7d");
```text

### 2. Automatic TypeScript Type Generation

```typescript
// Derive types from schemas
type DateExpression = z.infer<typeof DateExpressionSchema>;
```text

### 3. Better Error Messages

```typescript
const FilterModelSchema = z.object({
  type: z.enum(["equals", "notEqual", "after", "before", "inRange"]),
  mode: z.enum(["absolute", "relative"]),
  dateFrom: z.date().nullable().optional(),
  expressionFrom: DateExpressionSchema.optional(),
});

// Detailed error reporting
const result = FilterModelSchema.safeParse(data);
if (!result.success) {
  console.log(result.error.format());
}
```text

### 4. Composable Validation

```typescript
const QuickFilterOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  filterModel: FilterModelSchema.nullable(),
});
```text

## Cons of Adding Zod

### 1. Additional Dependency

- Adds ~8KB gzipped to bundle size
- Another dependency to maintain
- Potential version conflicts with user's projects

### 2. Complexity for Simple Library

- Current validation needs are relatively simple
- Manual validation provides more control
- May be overkill for date expression parsing

### 3. Migration Effort

- Would need to refactor existing validation
- Maintain backward compatibility
- Update documentation and examples

### 4. Performance Considerations

- Runtime validation overhead
- Schema parsing on every validation
- May impact filter performance with large datasets

## Recommendation

**Do NOT add Zod to this library** for the following reasons:

1. **Bundle Size**: As a component library, keeping dependencies minimal is crucial. Adding 8KB for validation that's already handled is not justified.

2. **Scope**: The validation requirements are focused and well-defined. Custom validation functions provide exactly what's needed without overhead.

3. **Performance**: Date filters may be called frequently during grid operations. Custom validation is optimized for these specific use cases.

4. **Maintenance**: One less dependency means easier maintenance and fewer potential breaking changes.

## Alternative Approach: Optional Zod Integration

Instead of including Zod as a dependency, we can:

1. **Provide Zod Schema Examples** in documentation for users who want runtime validation:

```typescript
// Example schemas users can implement if they use Zod
export const dateExpressionSchema = z.union([z.literal("Today"), z.string().regex(/^Today[+-]\d+[dwmy]$/)]);

export const filterModelSchema = z.object({
  type: z.enum(["equals", "notEqual", "after", "before", "inRange"]),
  mode: z.enum(["absolute", "relative"]),
  dateFrom: z.date().nullable().optional(),
  expressionFrom: z.string().optional(),
});
```text

2. **Export Validation Constants** that users can use with their validation library of choice:

```typescript
export const DATE_EXPRESSION_REGEX = /^Today[+-]\d+[dwmy]$/;
export const FILTER_TYPES = ["equals", "notEqual", "after", "before", "inRange"] as const;
export const FILTER_MODES = ["absolute", "relative"] as const;
````

3. **Keep Current Approach** with improvements:

- Add JSDoc comments with examples
- Enhance TypeScript types with better generics
- Provide validation utilities for common cases

## Conclusion

The current validation approach is sufficient and appropriate for this library. Adding Zod would increase complexity and bundle size without providing significant benefits. Users who need runtime validation can implement their own Zod schemas using the provided TypeScript types as a guide.

## Future Considerations

If the library grows to include more complex validation needs (e.g., complex filter configurations, nested conditions, custom operators), we could revisit this decision. For now, keeping the library lean and focused is the better choice.
