# Changelog

All notable changes to ag-grid-react-components will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 💥 BREAKING CHANGES

- **Removed RelativeDateFloatingFilter component**: AG Grid now provides an automatic read-only floating filter when `floatingFilter: true` is set. The RelativeDateFilter's `getModelAsString()` method provides the display text.

  **Migration Guide:**

  ```typescript
  // Before:
  import {
    RelativeDateFilter,
    RelativeDateFloatingFilter,
  } from "ag-grid-react-components";

  columnDefs = [
    {
      filter: RelativeDateFilter,
      floatingFilter: true,
      floatingFilterComponent: RelativeDateFloatingFilter,
    },
  ];

  // After:
  import { RelativeDateFilter } from "ag-grid-react-components";

  columnDefs = [
    {
      filter: RelativeDateFilter,
      floatingFilter: true,
      // No floatingFilterComponent needed!
    },
  ];
  ```

### ✨ Added

- React Router integration for deep linking to documentation sections
- Anchor links for all documentation headings (Confluence-style, on the right)
- Automatic floating filter support via `getModelAsString()` implementation

### 🔧 Changed

- Simplified codebase by removing redundant floating filter component
- Updated all demos to use automatic floating filter
- Enhanced documentation with proper navigation and deep linking

## [1.0.0] - 2025-06-08

### 🎉 Initial Release

This is the first official release of ag-grid-react-components, a collection of powerful, reusable React components for AG Grid.

### ✨ Features

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

### 📚 Documentation

- Complete README with usage examples
- API documentation for all exported functions
- Date expression syntax guide
- Development guidelines in CLAUDE.md
- Conventional commits setup
