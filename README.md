# AG Grid Relative Date Filter

A powerful custom date filter component for AG Grid (v33.3.0+) that supports both absolute dates and relative date expressions.

## Features

- 🗓️ **Dual Mode Support**:
  - **Absolute Mode**: Select dates using a standard date picker
  - **Relative Mode**: Enter expressions like "Today+7d" or "Today-3m"

- 🔍 **Comprehensive Filter Operations**:
  - Equals
  - Not Equals
  - Greater Than
  - Less Than
  - In Range

- 📊 **AG Grid Integration**:
  - Compatible with AG Grid v33.3.0+
  - Supports floating filters
  - Full filter model serialization

- 📱 **UI Features**:
  - Clean, responsive design with Tailwind CSS
  - Real-time validation of expressions
  - Shows resolved dates for relative expressions
  - Easy mode toggling

## Installation

```bash
npm install ag-grid-relative-date-filter
```

## Requirements

- AG Grid Community v33.3.0 or later
- React 18 or later
- date-fns v4 or later

## Usage

```tsx
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { 
  RelativeDateFilter, 
  RelativeDateFloatingFilter 
} from 'ag-grid-relative-date-filter';
import 'ag-grid-relative-date-filter/dist/style.css';

// Define your column definitions
const columnDefs = [
  // ...other columns
  { 
    field: 'date', 
    headerName: 'Date', 
    filter: RelativeDateFilter,
    floatingFilter: true,
    floatingFilterComponent: RelativeDateFloatingFilter
  }
];

// In your component
return (
  <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      // ...other props
    />
  </div>
);
```

## Relative Date Expression Format

The filter supports the following relative date expression formats:

- `Today` - Current date at midnight
- `Today+Nd` - N days after today
- `Today-Nd` - N days before today

Where:
- `d` = days
- `w` = weeks
- `m` = months
- `y` = years

Examples:
- `Today+7d` - 7 days from today
- `Today-2w` - 2 weeks ago
- `Today+1m` - 1 month from today
- `Today-1y` - 1 year ago

## Advanced Configuration

The filter component accepts the following configuration options:

```tsx
{
  // Date parsing function for custom date formats
  dateParser: (value: any) => Date | null,
  
  // Default filter mode
  defaultMode: 'absolute' | 'relative',
  
  // Custom date format for display (date-fns format)
  dateFormat: 'yyyy-MM-dd',
  
  // Min/max date constraints for date picker
  minDate: new Date(),
  maxDate: new Date()
}
```

## Filter Model Serialization

The filter state can be serialized and stored in URL parameters for bookmarking:

```tsx
// Get the current filter model
const filterModel = gridApi.getFilterModel();
const filterJson = JSON.stringify(filterModel);

// Store in URL
const url = new URL(window.location.href);
url.searchParams.set('filter', filterJson);
window.history.pushState({}, '', url.toString());

// Later, to restore the filter state:
const url = new URL(window.location.href);
const filterJson = url.searchParams.get('filter');
if (filterJson) {
  const filterModel = JSON.parse(filterJson);
  gridApi.setFilterModel(filterModel);
}
```

## Utilities

The package also exports utility functions for working with date expressions:

```tsx
import { 
  parseDateExpression, 
  isValidDateExpression, 
  resolveDateExpression 
} from 'ag-grid-relative-date-filter';

// Parse an expression
const result = parseDateExpression('Today+7d');
// { isValid: true, resolvedDate: Date }

// Check if expression is valid
const isValid = isValidDateExpression('Today+7d');
// true

// Resolve an expression to a Date
const date = resolveDateExpression('Today+7d');
// Date object
```

## License

MIT

## Development

To run the project in development mode:

```bash
npm install
npm run dev
```

To build the package for production:

```bash
npm run build
```

To run tests:

```bash
npm test
```