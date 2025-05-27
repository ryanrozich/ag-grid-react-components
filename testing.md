# Testing Guide for AG Grid Date Filter

This document describes the available tests for the AG Grid Date Filter project, how to run them, and what is covered by unit, integration, and end-to-end (E2E) testing.

---

## 1. Running Tests

### Unit & Integration Tests (Vitest)

- **Command:**

  ```sh
  npm test
  # or
  npx vitest run
  ```

  Runs all Vitest-based unit and integration tests. Use `npx vitest --watch` for watch mode.

- **Coverage Report:**
  ```sh
  npx vitest run --coverage
  ```
  Generates a code coverage report for the tests.

### E2E Tests (Playwright)

- **Command:**

  ```sh
  npx playwright test
  # or
  npm run test:e2e
  ```

  Runs all browser-based end-to-end tests using Playwright.

- **UI Mode:**
  ```sh
  npx playwright test --ui
  ```
  Opens the Playwright test runner UI for debugging.

---

## 2. Test Types & Coverage

### Unit Testing

- Component rendering and props
- Utility functions (date parsing, filter logic)
- State management helpers
- Individual UI controls (e.g., FilterModeToggle, AbsoluteDateInputs)

### Integration Testing

- Component interactions (mode switching, filter type changes)
- AG Grid integration (filter model updates, grid refresh)
- Combined filter logic

### E2E Testing

- Real browser simulation of user flows
- Filtering by exact date, range, relative date
- Clearing filters, multi-column filtering
- Pagination and sorting with filters

---

## 3. What Can Be Tested

- **Unit:** All exported functions/components in `src/components` and `src/utils`.
- **Integration:** Filter behavior within AG Grid, interactions between filter controls.
- **E2E:** Full user journeys in the browser (see `tests/e2e` folder for scenarios).

---

## 4. Adding/Locating Tests

- Unit/integration tests: `src/components/*.test.tsx`, `src/utils/*.test.ts`
- E2E tests: `e2e/*.spec.ts`

---

## 5. Test Setup File

- Vitest uses `src/test/setup.ts` to configure the test environment. This file:
  - Registers custom DOM matchers (from `@testing-library/jest-dom`)
  - Ensures cleanup after each test
  - Mocks `window.matchMedia` for jsdom compatibility
  - Optionally mocks CSS imports if needed for component rendering
- Do not import this file anywhere except through the `setupFiles` option in `vitest.config.ts`.

## 6. Notes

- Ensure dependencies are installed: `npm install`
- Playwright may require a one-time browser install: `npx playwright install`
- For more details, see `README.md` or ask the maintainers.
