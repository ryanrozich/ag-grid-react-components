# AG Grid React Components - Example Project

This example project demonstrates the modular architecture and various usage patterns.

## Running the Example

```bash
# From the root of the monorepo
npm install
npm run build
cd packages/example
npm run dev
```

Then open <http://localhost:3000>

## Examples Included

### 1. Minimal Setup (25KB)

- Uses native HTML5 date inputs
- Zero external dependencies
- Smallest possible bundle size

### 2. With React DatePicker (65KB)

- Includes React DatePicker for rich date selection
- Lazy loaded to minimize impact
- Shows active filters display

### 3. Full Featured (85KB)

- All components with styles
- URL state persistence with compression
- Complete grid state management
- Quick filters with descriptions

## Key Features Demonstrated

- **Tree-shaking**: Only import what you need
- **Lazy Loading**: Date pickers load on demand
- **Compression**: URL state compressed by 50-90%
- **Modular Design**: Mix and match features
- **Type Safety**: Full TypeScript support

## Bundle Sizes

| Configuration   | Bundle Size |
| --------------- | ----------- |
| Minimal         | ~25KB       |
| With DatePicker | ~65KB       |
| Full Featured   | ~85KB       |
