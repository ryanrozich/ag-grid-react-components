# Animated GIF Creation Guide

This guide describes the animated GIFs needed to enhance the user journey narrative in our documentation.

## Overview Page GIFs

Each GIF should be:

- **Size**: 800x400px (or 16:9 ratio)
- **Duration**: 5-8 seconds, looping
- **Style**: Dark theme matching our docs
- **Format**: Optimized GIF or MP4 (with fallback)

### 1. Date Filter Journey (`date-filter-journey.gif`)

**Location**: After "It starts with dates" paragraph

**Scenario**:

- Left side: User clicking date pickers repeatedly
  - Show calendar popup
  - Click start date (Dec 1)
  - Click end date (Dec 31)
  - Close dialog
  - Next day, repeat entire process
- Right side: User types "last 30 days" once
  - Show text input
  - Type "last 30 days"
  - Filter applies instantly
  - Show date updating automatically next day

### 2. Active Filter Pills (`active-filter-pills.gif`)

**Location**: After "Then visibility becomes crucial" paragraph

**Scenario**:

- Split screen comparison
- Left: Traditional AG Grid
  - Show grid with 15+ columns
  - Tiny blue dots on 3 filtered columns
  - User scrolling horizontally, squinting
- Right: With Active Filter Pills
  - Same grid with clear filter pills at top
  - "Status: In Progress" pill
  - "Due Date: This Week" pill
  - User clicks X on pill to remove

### 3. Quick Filter Menus (`quick-filter-menus.gif`)

**Location**: After "Soon, patterns emerge" paragraph

**Scenario**:

- Show user applying complex filter manually:
  - Click Priority column → Select "High"
  - Click Status column → Select "Bug"
  - Click Assignee column → Select "My Team"
- Then show Quick Filter dropdown:
  - Click dropdown
  - Select "High Priority Bugs"
  - All filters apply instantly

### 4. Filter Presets (`filter-presets.gif`)

**Location**: After "Finally, collaboration kicks in" paragraph

**Scenario**:

- User 1:
  - Has complex filter setup
  - Clicks "Save Preset"
  - Names it "Q4 Critical Issues"
  - Clicks "Copy Link" button
- User 2:
  - Opens the shared link
  - Grid loads with exact same filters
  - Shows "Q4 Critical Issues" as active preset

## Homepage Hero GIF (`hero-showcase.gif`)

**Location**: Replace static screenshot in hero section
**Duration**: 10-12 seconds, smooth loop
**Size**: Full width of hero container

**Scenario** (cycling through all features):

1. Start with empty grid
2. User types "last 30 days" in date filter (2s)
3. Active filter pills appear (1s)
4. User selects "High Priority" from quick filter (2s)
5. More pills appear, grid updates (1s)
6. User saves as preset "My Daily View" (2s)
7. Clicks share, shows "Link copied!" (1s)
8. Fade transition back to start

## Technical Tips

### Creating with LICEcap or similar

- Use consistent 60fps capture
- Optimize with `gifsicle` or `gifski`
- Keep under 2MB per GIF
- Use subtle easing for cursor movements

### Alternative: MP4 with autoplay

```html
<video autoplay loop muted playsinline>
  <source src="date-filter-journey.mp4" type="video/mp4" />
  <img src="date-filter-journey-fallback.png" alt="Date filter demo" />
</video>
```

## File Locations

Place final GIFs in:

- `/public/docs/gifs/` - For documentation GIFs
- `/src/demo/assets/` - For homepage hero GIF

## Color Palette

Use these colors to match our dark theme:

- Background: `#111827` (gray-900)
- Container: `#1F2937` (gray-800)
- Borders: `#374151` (gray-700)
- Primary: `#6366F1` (indigo-500)
- Success: `#10B981` (green-500)
- Text: `#F3F4F6` (gray-100)
