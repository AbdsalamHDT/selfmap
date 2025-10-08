# SelfMap Growth Hub - Homepage

A high-end, interactive homepage for SelfMap Growth Hub featuring advanced CSS animations, JavaScript interactions, and accessibility-first design.

## Features

- **Transparent Glass Navigation**: Backdrop-filter blur navigation that adapts on scroll
- **Cinematic Hero Section**: Full-bleed background with particle animations and aurora effects
- **Orbit/Constellation Test Selector**: Interactive circular layout with hover callouts and keyboard support
- **Analytics Scrollytelling**: Animated radar chart that reveals on scroll
- **Pathline Timeline**: SVG path animation with staggered step reveals
- **Interactive Backgrounds**: Layered aurora, mesh gradients, and parallax effects
- **Accessibility**: Full keyboard navigation, screen reader support, and reduced motion respect
- **Performance Optimized**: Throttled animations, frame rate monitoring, and efficient rendering

## File Structure

```
├── index.html          # Main HTML markup
├── app.css            # Complete stylesheet with all animations
├── app.js             # JavaScript interactions and animations
└── assets/
    └── img/
        ├── hero-full-width.png
        ├── logo.png
        ├── parent-kid.png
        ├── steps/
        │   ├── step-1.png
        │   ├── step-2.png
        │   └── step-3.png
        └── tests/
            ├── ADHD.png
            ├── EQ.png
            ├── IQ.png
            ├── Kids.png
            ├── motivation.png
            ├── Personality.png
            ├── relationships.png
            └── Stress.png
```

## Customization Guide

### 1. Changing Orbit Positions

The orbit nodes are positioned dynamically via JavaScript. To modify positions:

**In `app.js`, find the `positionNodes()` function:**

```javascript
// To change the radius of the orbit
const radius = Math.min(centerX, centerY) * 0.75; // Change 0.75 to adjust size

// To change starting angle or distribution
const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2; // Start at top
```

**To add custom positioning for specific nodes:**

```javascript
// In the positionNodes function, add custom logic
if (index === 0) {
    // Custom position for first node
    x = centerX + 200;
    y = centerY - 100;
}
```

### 2. Adding a New Test Node

**Step 1: Add to HTML**
In `index.html`, add a new button inside the `#orbitNodes` container:

```html
<button class="orbit__node" data-test="newtest" role="button" tabindex="0">
    <span class="orbit__node-label">New Test</span>
    <div class="orbit__connection" aria-hidden="true"></div>
</button>
```

**Step 2: Add Test Data**
In `app.js`, add to the `TESTS_DATA` object:

```javascript
const TESTS_DATA = {
    // ... existing tests
    newtest: {
        title: 'New Test Name',
        description: 'Brief description',
        duration: '~X min',
        image: 'assets/img/tests/newtest.png'
    }
};
```

**Step 3: Add Image**
Place the test image in `assets/img/tests/newtest.png`

### 3. Adjusting Background Animation Speeds

**In `app.js`, modify the `CONFIG` object:**

```javascript
const CONFIG = {
    aurora: {
        duration: 12000, // Aurora sweep speed (higher = slower)
        particles: 60    // Number of hero particles
    },
    orbit: {
        rotation: 120000, // Orbital drift speed (higher = slower)
        stars: 200        // Number of background stars
    },
    grid: {
        speed: 20000     // Grid parallax speed (higher = slower)
    }
};
```

**In `app.css`, modify animation durations:**

```css
/* Hero aurora animation */
@keyframes auroraFloat {
    /* Change animation-duration in .hero__aurora */
}

/* Grid animations */
@keyframes gridFloat {
    /* Change animation-duration in .orbit__grid */
}
```

### 4. Color Palette Customization

**In `app.css`, modify CSS custom properties:**

```css
:root {
    /* Primary colors */
    --color-indigo-900: #1e1b4b;
    --color-purple-600: #9333ea;
    --color-teal-500: #14b8a6;
    --color-cyan-400: #22d3ee;
    
    /* Update gradients */
    --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
    --gradient-neon: linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%);
}
```

### 5. Performance Optimization

**Reducing Particle Counts for Lower-End Devices:**

```javascript
// In app.js CONFIG object
aurora: {
    particles: 30    // Reduce from 60 for better performance
},
orbit: {
    stars: 100       // Reduce from 200 for better performance
}
```

**The system automatically reduces particle counts if FPS drops below 30.**

### 6. Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: ARIA labels and proper semantic markup
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce`
- **Focus Management**: Visible focus indicators and proper focus flow
- **Color Contrast**: All text meets WCAG AA standards

### 7. Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Required Features**: 
  - CSS backdrop-filter
  - Canvas 2D
  - CSS Grid
  - ES6 JavaScript
  - IntersectionObserver API

### 8. Mobile Responsiveness

The design is fully responsive with:
- Adaptive orbit sizing on smaller screens
- Touch-friendly interactive elements (minimum 44px touch targets)
- Optimized animations for mobile performance
- Collapsible mobile navigation

### 9. Performance Monitoring

The system includes automatic performance monitoring:
- FPS tracking with automatic optimization
- Animation frame cleanup on page hide
- Memory-efficient particle systems
- Throttled scroll events

### 10. Navigation Routes

The orbit nodes link to test pages using this pattern:
- URL: `/test.html?id={testId}`
- Test IDs: `iq`, `adhd`, `eq`, `stress`, `relationships`, `motivation`, `personality`, `kids`

## Development Notes

1. **No External Dependencies**: Pure HTML, CSS, and vanilla JavaScript
2. **Production Ready**: Optimized for performance and accessibility
3. **Modular Code**: Each feature is self-contained and can be easily modified
4. **Cross-Browser**: Uses progressive enhancement for advanced features

## Deployment

1. Ensure all asset images are in the correct `assets/img/` directory
2. Test on multiple devices and browsers
3. Verify all animations respect reduced motion preferences
4. Run accessibility audits (lighthouse, axe, etc.)
5. Optimize images for web delivery

## License

© 2025 SelfMap Growth Hub. All rights reserved.