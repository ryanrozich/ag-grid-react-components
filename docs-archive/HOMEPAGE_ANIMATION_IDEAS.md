# Homepage Animation Ideas

Beyond GIFs, here are some interactive ideas to make the homepage even more engaging:

## 1. Interactive Feature Tabs

Instead of a static hero image or single GIF, create an interactive showcase:

```jsx
<div className="feature-showcase">
  <div className="tabs">
    <button>Relative Dates</button>
    <button>Filter Pills</button>
    <button>Quick Filters</button>
    <button>Presets</button>
  </div>
  <div className="demo-area">{/* Live mini-demo for selected feature */}</div>
</div>
```

Users can click tabs to see each feature in action without leaving the homepage.

## 2. Scroll-Triggered Animations

As users scroll down the features section:

- Date filter: Calendar fades out, "last 30 days" types itself
- Filter pills: Pills animate in with a bounce
- Quick filters: Dropdown slides down, options highlight
- Presets: Save dialog scales in, share icon pulses

## 3. Before/After Slider

Interactive comparison slider:

- Left side: Traditional AG Grid filtering
- Right side: With our components
- User drags slider to reveal the transformation

## 4. Mini Playground

A simplified, interactive grid right on the homepage:

- Pre-loaded with sample data
- Let users try typing "last week"
- Show filter pills appearing
- "Wow" moment without leaving the page

## 5. Feature Carousel with Progress

Auto-advancing showcase that users can control:

- Progress bar shows which feature (1 of 4)
- Pause on hover
- Click dots to jump to specific feature
- Each feature gets 3-4 seconds

## 6. Code Preview with Live Result

Split view showing:

- Left: Code snippet updating in real-time
- Right: Live grid showing the result
- Highlights the simplicity of implementation

## Implementation Priority

1. **Start with GIFs** (quickest win)
2. **Add scroll animations** (CSS only, performant)
3. **Feature tabs** (moderate effort, high impact)
4. **Mini playground** (highest effort, biggest wow)

The goal: Show, don't just tell, how these components transform the daily experience of working with data grids.
