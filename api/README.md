# AG Grid Demo API

This is a Cloudflare Worker that provides a server-side API for the AG Grid demo.

## Features

- Server-side data processing with pagination
- **Search across all columns** with real-time debouncing
- Filtering support (text, set, date filters)
- Sorting support (single and multi-column)
- Row grouping support (partial - in development)
- Statistics calculation with search support
- Real-time aggregations for grand totals
- Efficient data generation and processing

## Running Locally

To run the API alongside the demo app:

````bash
# Install dependencies
npm install

# Run both the demo app and API
npm run dev
```text

Or run them separately:

```bash
# Terminal 1: Run the demo app only
npm run frontend

# Terminal 2: Run the API worker only
npm run api
````

The API will be available at:

- Direct: `http://localhost:8787/api`
- Via Vite proxy: `http://localhost:5173/api`

## API Endpoints

### POST /api/tasks

Get paginated, filtered, and sorted task data for the grid.

Request body:

````json
{
  "startRow": 0,
  "endRow": 100,
  "filterModel": {},
  "sortModel": [],
  "searchText": "",
  "groupKeys": [],
  "rowGroupCols": []
}
```text

### POST /api/stats

Get statistics based on the current filter model and search text.

Request body:

```json
{
  "filterModel": {},
  "searchText": ""
}
````

Response includes aggregations for:

- totalTasks
- totalBudget
- totalSpent
- averageProgress
- statusBreakdown
- priorityBreakdown
- categoryBreakdown

### GET /api/health

Health check endpoint.

## Deployment

The API is automatically deployed to Cloudflare Workers:

- Production: `https://demo.rozich.net/ag-grid-react-components/api`
- PR Preview: `https://demo.rozich.net/ag-grid-react-components-pr-{number}/api`
