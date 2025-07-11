# Changelog

All notable changes to ag-grid-date-filter will be documented in this file.

## [0.1.0](<[https://github.com/ryanrozich/ag-grid-react-components/compare/v1.2.0...v0.1.](https://github.com/ryanrozich/ag-grid-react-components/compare/v1.2.0...v0.1.)0>) (2025-06-30)

### ⚠ BREAKING CHANGES

- **v2.0:** Complete architecture rewrite to modular packages

This is a major rewrite that introduces a modular, tree-shakeable architecture:

## New Package Structure

- @agrc/core (5KB) - Headless components with zero dependencies
- @agrc/adapters (2KB) - Optional date picker and compression adapters
- @agrc/styles (3KB) - Optional pre-built styles
- @agrc/compat (5KB) - v1 compatibility layer for seamless migration

## Bundle Size Improvements

- Minimal setup: 329KB → 25KB (92% reduction)
- With React DatePicker: 329KB → 65KB (80% reduction)
- Full featured: 329KB → 85KB (74% reduction)

## Key Changes

- Components are now created via factory functions
- Heavy dependencies (react-datepicker, lz-string) load dynamically
- Each component has its own entry point for tree-shaking
- Native HTML5 date inputs by default (zero dependencies)
- Adapter pattern for pluggable date pickers

## Migration

For zero-code migration from v1:
npm uninstall ag-grid-react-components
npm install @agrc/compat

Then all existing imports continue to work.

## Features Added

- Modular architecture with tree-shaking
- Dynamic imports for heavy dependencies
- Adapter pattern for extensibility
- Headless components (bring your own styles)
- Backward compatibility layer
- Comprehensive demo site updates
- Updated documentation for v2.0 architecture

Note: This commit includes POC files and demonstrations that have lint warnings.
These will be cleaned up during the actual implementation phase.

🤖 Generated with [Claude Code](<[https://claude.ai/cod](https://claude.ai/cod)e>)

Co-Authored-By: Claude <noreply@anthropic.com>

- None

Co-Authored-By: Claude <noreply@anthropic.com>
🤖 Generated with Claude Code

### 🐛 Bug Fixes

- resolve linting issues and improve type safety ([de57b10](<[https://github.com/ryanrozich/ag-grid-react-components/commit/de57b10015b0f79163cc20451c5dd09d214060e](https://github.com/ryanrozich/ag-grid-react-components/commit/de57b10015b0f79163cc20451c5dd09d214060e)d>))

### ✨ Features

- add CI/CD deployment and update messaging to focus on user problems ([7673ea8](<[https://github.com/ryanrozich/ag-grid-react-components/commit/7673ea876801225c20063e8a32b9f78619391cd](https://github.com/ryanrozich/ag-grid-react-components/commit/7673ea876801225c20063e8a32b9f78619391cd)a>))
- **v2.0:** implement modular architecture with 95% bundle size reduction ([7244c84](<[https://github.com/ryanrozich/ag-grid-react-components/commit/7244c8447c32168bac81d51b9bbd5babb508ccf](https://github.com/ryanrozich/ag-grid-react-components/commit/7244c8447c32168bac81d51b9bbd5babb508ccf)d>))

### ♻️ Code Refactoring

- commit to single package architecture ([b595f23](<[https://github.com/ryanrozich/ag-grid-react-components/commit/b595f23da92ff35887d9bcf4f955622a68d91b7](https://github.com/ryanrozich/ag-grid-react-components/commit/b595f23da92ff35887d9bcf4f955622a68d91b7)4>)), closes [#2](<[https://github.com/ryanrozich/ag-grid-react-components/issues/](https://github.com/ryanrozich/ag-grid-react-components/issues/)2>)
- prepare for v0.1.0 pre-release ([dcf900e](<[https://github.com/ryanrozich/ag-grid-react-components/commit/dcf900e717a3be773705533f0268381b65ff6cc](https://github.com/ryanrozich/ag-grid-react-components/commit/dcf900e717a3be773705533f0268381b65ff6cc)5>))

### 📚 Documentation

- add ActiveFilters component documentation ([2384f17](<[https://github.com/ryanrozich/ag-grid-react-components/commit/2384f1772196b22c79d50dd3088dc6820ce3dea](https://github.com/ryanrozich/ag-grid-react-components/commit/2384f1772196b22c79d50dd3088dc6820ce3dea)e>))
- reorganize documentation structure ([3c4c7fb](<[https://github.com/ryanrozich/ag-grid-react-components/commit/3c4c7fb79fe8c614c625d530349e113b57d03a5](https://github.com/ryanrozich/ag-grid-react-components/commit/3c4c7fb79fe8c614c625d530349e113b57d03a5)9>))

### ✅ Tests

- add e2e test for QuickFilterDropdown portal rendering ([18bfe5b](<[https://github.com/ryanrozich/ag-grid-react-components/commit/18bfe5b6af82772b74f6d1a70c5e20aed379746](https://github.com/ryanrozich/ag-grid-react-components/commit/18bfe5b6af82772b74f6d1a70c5e20aed379746)f>))
- add test to document grand total z-index bug ([#6](<[https://github.com/ryanrozich/ag-grid-react-components/issues/](https://github.com/ryanrozich/ag-grid-react-components/issues/)6>)) ([0f3a6b5](<[https://github.com/ryanrozich/ag-grid-react-components/commit/0f3a6b574e5e6950c91a68c7ed70ed44c85c3b9](https://github.com/ryanrozich/ag-grid-react-components/commit/0f3a6b574e5e6950c91a68c7ed70ed44c85c3b9)f>))

## [1.2.0](<[https://github.com/ryanrozich/ag-grid-react-components/compare/v1.1.0...v1.2.](https://github.com/ryanrozich/ag-grid-react-components/compare/v1.1.0...v1.2.)0>) (2025-06-24)

### Features

- **components:** add ActiveFilters component and redesign demo UI ([8884679](<[https://github.com/ryanrozich/ag-grid-react-components/commit/88846794e8a879c47d277068ffa3e371ace1212](https://github.com/ryanrozich/ag-grid-react-components/commit/88846794e8a879c47d277068ffa3e371ace1212)7>))

## [1.1.0](<[https://github.com/ryanrozich/ag-grid-react-components/compare/v1.1.0-ag-grid-bug-identified...v1.1.](https://github.com/ryanrozich/ag-grid-react-components/compare/v1.1.0-ag-grid-bug-identified...v1.1.)0>) (2025-06-24)

### Features (2)

- **utils:** add AG Grid v33 setFilterModel workaround and documentation ([73b3034](<[https://github.com/ryanrozich/ag-grid-react-components/commit/73b3034f7cfb277981680af82fab35bc168b591](https://github.com/ryanrozich/ag-grid-react-components/commit/73b3034f7cfb277981680af82fab35bc168b591)c>)), closes [ag-grid/ag-grid#2256](<[https://github.com/ag-grid/ag-grid/issues/225](https://github.com/ag-grid/ag-grid/issues/225)6>) [ag-grid/ag-grid#2709](<[https://github.com/ag-grid/ag-grid/issues/270](https://github.com/ag-grid/ag-grid/issues/270)9>) [ag-grid/ag-grid#4870](<[https://github.com/ag-grid/ag-grid/issues/487](https://github.com/ag-grid/ag-grid/issues/487)0>)

## [1.0.0] - 2025-06-08

### 🎉 Initial Release

This is the first official release of ag-grid-react-components, a collection of powerful, reusable React components for AG Grid.

### Features (3)

#### Components

- **RelativeDateFilter**: Custom date filter with dual mode support (absolute/relative)
  - Date picker for absolute date selection
  - Expression input for relative dates (e.g., "Today+7d", "StartOfMonth-1M")
  - All standard AG Grid filter operations (equals, not equals, before, after, in range)
  - Real-time validation with resolved date preview
- **QuickFilterDropdown**: Dropdown for applying preset filters
  - Pre-configured date range options
  - Customizable filter presets
  - Keyboard navigation support
  - Search functionality for large option lists

#### Utilities

- **Date Expression Parser**: Powerful expression parsing
  - Basic keywords: Today, Now, Tomorrow, Yesterday
  - Arithmetic operations: +7d, -3M, +1y
  - Period boundaries: StartOfMonth, EndOfYear, StartOfWeek
  - Chainable expressions: Today+1M-2d
- **Filter State Persistence**: URL-based state management
  - Automatic serialization/deserialization of filter models
  - Browser history integration (back/forward support)
  - Shareable filtered views via URL
  - Date object handling in filter models

### 🏗️ Architecture

- Modular component design (main filter reduced from 971 to 291 lines)
- Custom hooks for state management and validation
- TypeScript-first with comprehensive type definitions
- CSS modules for styling isolation
- Full AG Grid v33+ compatibility

### 📋 Requirements

- AG Grid Community or Enterprise v33.3.0+
- React 18 or later
- date-fns v4 or later
- TypeScript 5+

### 🧪 Testing

- Comprehensive unit tests with Vitest
- Integration tests with AG Grid
- E2E tests with Playwright
- 60%+ code coverage on core utilities

### 📚 Documentation (2)

- Complete README with usage examples
- API documentation for all exported functions
- Date expression syntax guide
- Development guidelines in CLAUDE.md
- Conventional commits setup
