# AG Grid Custom Date Filter Component

## Project Overview

Create a visually attractive and feature-rich custom date filter for AG Grid that supports both absolute dates and relative date expressions like "Today+7d". The component should be production-ready, well-tested, and published to npm.

## Important Compatibility Requirements

- The component must work with AG Grid v33.3.0 (latest version), which includes breaking changes from previous major versions
- The implementation must follow AG Grid's current component interface patterns for React
- Review AG Grid's updated IFilterComp interface specification for v33.3.0, as the API has changed significantly from earlier versions
- Handle any deprecated methods or properties in the new AG Grid version
- The component should be tested against AG Grid v33.3.0 to ensure full compatibility

## Functional Requirements

- Support filtering with absolute dates via an intuitive date picker
- Support relative date expressions like "Today", "Today+7d", "Today-3m"
- Support all basic filter operations (equals, not equals, greater than, less than, range)
- Toggle between absolute date mode and relative expression mode
- Display resolved dates for relative expressions
- Support AG Grid's floating filter API for toolbar integration
- Serialize filter state to URL parameters for bookmarking
- Ensure compatibility with AG Grid's new filter API in v33.3.0

## Technical Requirements

- Implement AG Grid's IFilterComp interface according to v33.3.0 specifications
- Use React hooks for state management
- Written in TypeScript with complete type definitions
- Use date-fns for date manipulation
- Styling with Tailwind CSS
- Bundle size under 30KB
- Use Vite as the build tool
- Tests written with Vitest and React Testing Library

## Development Steps

1. **Set up project structure**

   - Initialize a new React project with Vite
   - Create a Git repository
   - Install dependencies (AG Grid v33.3.0, date-fns, react-datepicker)

2. **Research AG Grid v33.3.0 filter interface**

   - Review AG Grid's documentation for latest filter interface changes
   - Note any breaking changes from previous versions
   - Ensure understanding of current best practices for custom filter components

3. **Create utility functions for date manipulation**

   - Parser for relative date expressions
   - Validator for expression format
   - Resolver to convert expressions to actual dates

4. **Implement main filter component**

   - Create component that implements AG Grid's IFilterComp interface
   - Build UI with mode toggle and appropriate inputs
   - Handle all filter operations
   - Ensure compatibility with AG Grid's latest API

5. **Add floating filter support**

   - Create minimal component for toolbar display
   - Connect to main filter component
   - Follow AG Grid v33.3.0 floating filter patterns

6. **Create comprehensive tests**

   - Unit tests for utilities
   - Component tests for filter behavior
   - Integration tests with AG Grid v33.3.0

7. **Create demo application**

   - Build sample grid with the custom filter
   - Demonstrate all filter features
   - Show serialization to URL parameters

8. **Configure for npm packaging**
   - Set up Rollup for bundling
   - Configure package.json
   - Include proper peer dependencies for AG Grid v33.3.0

## Git Integration

Use Git for version control with regular commits at key milestones:

- After project setup
- After implementing core utilities
- After completing the main filter component
- After adding the floating filter
- After writing tests
- After creating the demo application
- After configuring for npm packaging

Use descriptive commit messages that explain what was accomplished.

## GitHub Integration

Use GitHub for:

1. Create a new public repository named "ag-grid-relative-date-filter"
2. Push your local repository to GitHub
3. Create a README.md with installation and usage instructions
4. Set up GitHub Actions for CI/CD
5. Configure GitHub Pages to host the demo

## Testing

Write comprehensive tests using Vitest and React Testing Library:

- Test date expression parsing with various inputs
- Test the filter component's UI interactions
- Test filter logic against sample data
- Test compatibility with AG Grid v33.3.0

## Implementation Notes

### Date Expression Format

- "Today" - Current date at midnight
- "Today+Nd" - N days after today
- "Today-Nd" - N days before today
- Also support weeks (w), months (m), years (y)

### Filter Operations

- equals - Cell value matches the target date
- notEqual - Cell value does not match the target date
- greaterThan - Cell value is after the target date
- lessThan - Cell value is before the target date
- inRange - Cell value is between two target dates

### Component UI Guidelines

- Clean, minimal design following AG Grid's aesthetic
- Clear visual indication of which mode is active
- Helpful placeholder text for relative expressions
- Display resolved dates below the input

## Optional Features

If time permits, consider adding these enhancements:

- Preset date ranges (Last 7 days, Last month, etc.)
- Custom date formatting options
- Localization support
- Theme compatibility (light/dark mode)

## Completion Criteria

The implementation is complete when:

1. All required features are implemented
2. Tests pass with good coverage
3. The demo application works as expected with AG Grid v33.3.0
4. The component is properly packaged for npm
5. Git repository contains well-structured commits
6. GitHub repository is set up with README and CI/CD
7. npm package is ready for publicationlar commits at key milestones:

- After project setup
- After implementing core utilities
- After completing the main filter component
- After adding the floating filter
- After writing tests
- After creating the demo application
- After configuring for npm packaging

Use descriptive commit messages that explain what was accomplished.

## GitHub Integration

Use GitHub CLI to:

1. Create a new public repository named "ag-grid-relative-date-filter"
2. Push your local repository to GitHub
3. Create a README.md with installation and usage instructions
4. Set up GitHub Actions for CI/CD
5. Configure GitHub Pages to host the demo

## Testing

Write comprehensive tests using Vitest and React Testing Library:

- Test date expression parsing with various inputs
- Test the filter component's UI interactions
- Test filter logic against sample data

## Implementation Notes

### Date Expression Format

- "Today" - Current date at midnight
- "Today+Nd" - N days after today
- "Today-Nd" - N days before today
- Also support weeks (w), months (m), years (y)

### Filter Operations

- equals - Cell value matches the target date
- notEqual - Cell value does not match the target date
- greaterThan - Cell value is after the target date
- lessThan - Cell value is before the target date
- inRange - Cell value is between two target dates

### Component UI Guidelines

- Clean, minimal design following AG Grid's aesthetic
- Clear visual indication of which mode is active
- Helpful placeholder text for relative expressions
- Display resolved dates below the input

## Optional Features

If time permits, consider adding these enhancements:

- Preset date ranges (Last 7 days, Last month, etc.)
- Custom date formatting options
- Localization support
- Theme compatibility (light/dark mode)

## Completion Criteria

The implementation is complete when:

1. All required features are implemented
2. Tests pass with good coverage
3. The demo application works as expected
4. The component is properly packaged for npm
5. Git repository contains well-structured commits
6. GitHub repository is set up with README and CI/CD
7. npm package is ready for publication
