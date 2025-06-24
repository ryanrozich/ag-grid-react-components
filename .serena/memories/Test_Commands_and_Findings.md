# Test Commands and Key Findings

## Useful Test Commands

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test
npm run test:e2e -- --grep "should debug filter application"

# Run with Playwright UI
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed
```

### Development

```bash
# Start dev server
npm run dev

# Safe dev (runs checks first)
npm run dev:safe

# Pre-commit checks
npm run pre-commit
```

## Key Test Files Created

### 1. debug-quick-filter.spec.ts

Tests QuickFilterDropdown functionality and logs filter application process.

### 2. filter-instantiation.spec.ts

Tests filter lifecycle when set programmatically, checking if setModel is called.

### 3. simple-filter-test.spec.ts

Basic test to verify filter application with different scenarios.

### 4. minimal-filter-test.spec.ts

Captures all console logs to trace filter lifecycle events.

## Test Findings

### Grid Data

- All test data has dates in future (Aug/Sep 2025)
- "This Month" filter (June 2025) should filter out all rows
- "Today" filter should also filter out all rows

### Filter Model State

```javascript
// Model is set correctly in AG Grid:
{
  dueDate: {
    mode: "relative",
    type: "inRange",
    expressionFrom: "StartOfMonth",
    expressionTo: "EndOfMonth"
  }
}
```

### Component Logs Pattern

```
=== CALLING setFilterModel ===
[DateFilter] Component instantiated with props: {model: null}
[useFilterState] Initializing with model: null
[DateFilter] doesFilterPass called #1 currentModel: null isValid: false
[DateFilter] Returning true - no valid filter
```

## Port Configuration

- Vite runs on port 5173 (not 3000)
- Playwright config updated to use 5173
- Can override with E2E_PORT env variable

## Column Configuration

- Column field is "dueDate" (not "date")
- QuickFilterDropdown columnId fixed to match
- Floating filters enabled in demo
