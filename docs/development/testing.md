# Testing Guide

This project follows Test-Driven Development (TDD) practices and maintains high test coverage.

## Test Types

### Unit Tests

Tests for individual functions and utilities.

```bash
npm run test:unit
```

### Component Tests

Tests for React components using React Testing Library.

```bash
npm run test:unit
```

### Integration Tests

Tests that verify components work correctly with AG Grid.

Uses `AGGridTestHarness` for testing AG Grid integrations.

### E2E Tests

End-to-end tests using Playwright for UI testing.

```bash
npm run test:e2e
```

## Writing Tests

### TDD Workflow

1. Write a failing test first
2. Write minimal code to make it pass
3. Refactor while keeping tests green

### Test Structure

```typescript
import { describe, it, expect } from "vitest";

describe("Component/Function", () => {
  it("should do something specific", () => {
    // Arrange
    const input = "test";

    // Act
    const result = myFunction(input);

    // Assert
    expect(result).toBe("expected");
  });
});
```

### Testing Components

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Testing with AG Grid

```typescript
import { AGGridTestHarness } from '@/test-utils';

const harness = new AGGridTestHarness({
  columnDefs: [...],
  rowData: [...]
});

// Test filter behavior
await harness.setFilterModel({...});
expect(harness.getDisplayedRowCount()).toBe(5);
```

## Coverage Requirements

- New code should have >80% coverage
- Run coverage report: `npm run test:coverage`

## E2E Testing

All UI bugs must have an E2E test to prevent regression:

```typescript
import { test, expect } from "@playwright/test";

test("should handle date filter correctly", async ({ page }) => {
  await page.goto("/");
  await page.click('button:has-text("Filters")');
  // ... test interactions
});
```

## Best Practices

1. Test behavior, not implementation
2. Use descriptive test names
3. Keep tests isolated and independent
4. Mock external dependencies
5. Test edge cases and error conditions

## Running Tests

- `npm run test` - Run all tests
- `npm run test:watch` - TDD mode
- `npm run test:coverage` - Coverage report
- `npm run test:e2e` - E2E tests only
- `npm run pre-push` - All tests (run before pushing)
