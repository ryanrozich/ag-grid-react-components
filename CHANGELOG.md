# Changelog

All notable changes to ag-grid-date-filter will be documented in this file.

## [Unreleased]

### ✨ Features

- Modular component architecture reducing main component from 971 to 291 lines
- Custom hooks for state management (useFilterState, useFilterValidation)
- Comprehensive TypeScript type safety (eliminated all 'any' types)
- Integration with Trunk.io for code quality checks
- Conventional commits support with commitizen

### 🐛 Bug Fixes

- Fixed filter type resetting to 'before' on relative filters
- Resolved XSS vulnerabilities in date expression parsing
- Fixed race conditions in filter state updates
- Corrected memory leaks from missing cleanup functions

### ♻️ Code Refactoring

- Decomposed monolithic RelativeDateFilter into 5 focused components
- Extracted validation logic into dedicated hook
- Centralized state management with 13+ state variables
- Improved prop interfaces and component boundaries

### 📚 Documentation

- Added comprehensive architectural documentation
- Created justfile for standardized commands
- Updated claude.md with expert best practices
- Added commit message guidelines

## [1.0.0] - 2025-05-27

### Initial Features

- Initial release with AG Grid v33 support
- Absolute and relative date filtering modes
- Date expression parser supporting patterns like "Today+7d"
- Filter state persistence via URL
- Floating filter support
- TypeScript support
