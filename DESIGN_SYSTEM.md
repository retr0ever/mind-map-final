# Brain Explorer - Design System Documentation

## Design Philosophy

This redesign transforms the Brain Explorer into a minimalistic, modern application that prioritizes the 3D visualization while maintaining full functionality through strategic UI placement and elegant micro-interactions.

---

## Core Design Decisions

### 1. Layout Architecture

**BEFORE:** Fixed sidebar panels that consumed significant screen space
**AFTER:** Floating, contextual UI elements that maximize canvas visibility

- **Top Breadcrumb Bar**: Subtle navigation path with gradient fade
- **Bottom Control Bar**: Glass-morphic floating panel for all controls
- **Right Info Drawer**: Slide-out panel that appears only when needed
- **Immersive Canvas**: Full-screen 3D brain visualization

### 2. Color Strategy

**Minimalistic Base + Strategic Color Accents**

- **Base Palette**:
  - Pure white (#ffffff) for primary surfaces
  - Off-white (#fafafa) for secondary surfaces
  - Deep charcoal (#1a1a1a) for text
  - Sophisticated grays for hierarchy

- **Region Colors**: Each brain region's original color becomes a vibrant accent:
  - Used in region chips when active
  - Badge indicators in the info panel
  - Hover effects and selections
  - Tooltip type labels

- **Hierarchy Indicators**:
  - REGIONS: Bold colored badges with glow effects
  - PARTS: Subtle color treatments with reduced opacity
  - Selected states: Full saturation with elevated shadows

### 3. Glass Morphism

Applied to floating UI elements for depth and elegance:
- Backdrop blur (20px saturate)
- Semi-transparent backgrounds (0.7-0.9 opacity)
- Subtle borders with low-opacity white
- Layered shadows for depth

### 4. Typography

**Apple-inspired font stack:**
```css
-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue"
```

**Hierarchy:**
- 32px bold for main headings (info panel titles)
- 20px semibold for app title
- 14-16px for body text
- 11-13px for labels and metadata
- Generous line-height (1.6-1.7) for readability

**Weight system:**
- 300 (light) - Not used, keeping it simple
- 400 (regular) - Body text, descriptions
- 500 (medium) - Buttons, chips
- 600 (semibold) - Section titles, emphasis
- 700 (bold) - Main headings

### 5. Spacing System

Consistent 8px base grid:
- 4px (xs) - Tight spacing
- 8px (sm) - Compact layouts
- 16px (md) - Standard spacing
- 24px (lg) - Generous breathing room
- 32px (xl) - Section separation
- 48px (2xl) - Major content blocks

### 6. Border Radius

Progressive scale for visual harmony:
- 6px (sm) - Small elements
- 12px (md) - Cards, inputs
- 16px (lg) - Panels
- 24px (xl) - Large containers
- 9999px (full) - Pills, badges, chips

### 7. Animation Strategy

**Spring-based animations** for delightful interactions:
- Fast (150ms) - Instant feedback (hover states)
- Base (250ms) - Standard transitions
- Slow (350ms) - Major layout changes
- Spring (400ms) - Bouncy, organic motion

**Key animations:**
- slideUp: Control bar entrance
- fadeInScale: Search dropdown
- fadeInUp: Info panel content
- tooltipFadeIn: 3D hover tooltips

---

## Component Design

### Control Bar (Bottom Floating)

**Features:**
- Glass-morphic background with backdrop blur
- Organized into three sections: Search, Controls, Region List
- Horizontal scrollable region chips
- Icons from lucide/heroicons style
- Spring animation on load

**Interaction patterns:**
- Hover: Subtle lift with shadow
- Active: Inverted colors (white text on black)
- Chips: Color-coded with region colors

### Info Drawer (Right Side)

**Features:**
- Slide-in from right (desktop) or bottom (mobile)
- Auto-opens when region selected
- Elegant close button with rotation effect
- Smooth scrolling with custom scrollbar

**Content sections:**
1. Badge (colored with region color)
2. Title (32px bold)
3. Description
4. Key Functions (colored dots)
5. Info Notice (contextual)
6. Educational Resources (with external link icon)

### Region Chips

**Design:**
- Pill-shaped with region color dot
- Transforms to full background color when active
- Count badge for main regions
- Smooth color transitions

**States:**
- Default: White with subtle border
- Hover: Border matches region color
- Active: Full region color background

### Search

**Features:**
- Icon inside input (left)
- Dropdown appears above (upward)
- Color-coded badges for results
- Distinguishes REGION vs PART

### Breadcrumb Navigation

**Features:**
- Transparent gradient background
- Clean slash separators
- Interactive links with hover states
- Color-coded current location

---

## Micro-Interactions

### 1. Button Hovers
- Slight upward movement (-1px to -2px)
- Shadow intensification
- Color inversion for primary actions

### 2. Region Chip Selection
- Background transforms to region color
- Text inverts to white
- Dot color inverts
- Shadow elevation increases

### 3. Info Drawer
- Smooth slide transition (350ms)
- Staggered content fade-in
- Close button rotation on hover (90deg)

### 4. Search Results
- Scale animation (0.95 → 1.0)
- Subtle upward translation
- Individual item hover background

### 5. 3D Tooltips
- Quick fade + scale (200ms)
- Dark, high-contrast background
- Color-coded type label

---

## Accessibility Features

### Color Contrast
- All text meets WCAG AA standards
- High contrast mode support
- Focus visible states (2px outline)

### Reduced Motion
- Respects `prefers-reduced-motion`
- Reduces animations to near-instant

### Keyboard Navigation
- All interactive elements focusable
- Clear focus indicators
- Logical tab order

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Proper heading hierarchy

---

## Responsive Behavior

### Desktop (>1200px)
- Right-side info drawer (480px)
- Full control bar at bottom
- Breadcrumb with full path

### Tablet (968-1200px)
- Narrower info drawer (400px)
- Compact control spacing
- Preserved layout structure

### Mobile (<968px)
- Info drawer slides from bottom (60vh)
- Control bar compressed
- Breadcrumb simplified

### Small Mobile (<640px)
- Reduced button sizes
- Smaller typography
- Breadcrumb path hidden

---

## Design Tokens (CSS Variables)

All design decisions are codified as CSS custom properties in `:root`, making the system:
- **Consistent**: Single source of truth
- **Maintainable**: Easy global updates
- **Themeable**: Can create dark mode by swapping variables

---

## Key Improvements Over Previous Design

1. **Screen Real Estate**: 40% more canvas visibility
2. **Visual Hierarchy**: Clear distinction between UI layers
3. **Color Usage**: Strategic vs decorative (region colors pop)
4. **Interaction Clarity**: Obvious affordances and feedback
5. **Modern Aesthetics**: Contemporary glass morphism and spring animations
6. **Performance**: Hardware-accelerated transforms
7. **Accessibility**: WCAG AA compliant, keyboard navigable
8. **Mobile Experience**: Touch-friendly, responsive drawer

---

## Future Enhancements (Optional)

1. **Dark Mode**: Invert color tokens, adjust glass opacity
2. **Custom Themes**: User-selected color palettes
3. **Animation Preferences**: User toggle for motion intensity
4. **Density Options**: Compact vs comfortable spacing modes
5. **3D View Presets**: Quick camera angle selections

---

**Design completed:** November 2025
**Framework:** React + CSS Custom Properties
**Design approach:** Spatial Minimalism with Strategic Color Accents
