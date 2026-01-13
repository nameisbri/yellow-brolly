# YellowBrolly Website - AI Context

## Project Overview

A React website for YellowBrollyCo, a people-first technology consulting firm. Built with React 18, TypeScript, Vite, Tailwind CSS, GSAP, and Three.js.

## Architecture

### Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom theme
- **Animation**: GSAP with ScrollTrigger
- **3D Graphics**: Three.js with React Three Fiber
- **Routing**: React Router v6

### File Structure
```
src/
├── components/
│   ├── common/       # Reusable UI components (Button, Card, Section, Icons)
│   ├── layout/       # Layout components (Header, Footer, Layout)
│   ├── sections/     # Page section components
│   └── three/        # Three.js components (HeroBackground)
├── pages/            # Route page components
├── hooks/            # Custom React hooks
├── animations/       # GSAP animation utilities
└── data/             # Static content data
```

## Key Components

### Common Components
- `Button`: Primary/secondary/outline variants with hover animations
- `Card`: Service, Testimonial, and Case Study card variants
- `Section`: Page section wrapper with background options
- `Icons`: SVG icon components for services and UI

### Layout
- `Header`: Fixed navigation with mobile menu, scroll state handling
- `Footer`: Site footer with navigation and links
- `Layout`: Main layout wrapper with page transitions

### Three.js
- `HeroBackground`: Animated particle system and floating geometric shapes

### Sections
- `HeroSection`: Main hero with Three.js background
- `ApproachPreview/Timeline`: 4-stage framework visualization
- `ServicesPreview/Pillars`: Service cards grid
- `SocialProof`: Testimonial cards
- `CTASection`: Call-to-action sections
- `ValuesGrid`: Core values display
- `TeamSection`: Team member profiles
- `BlogGrid`: Blog post cards with category filtering
- `ContactForm`: Contact form with validation

## Custom Hooks

### `useScrollAnimation`
Provides scroll-triggered GSAP animations for elements.

```typescript
const ref = useScrollAnimation<HTMLDivElement>({
  animation: 'fadeUp', // fadeUp | fadeIn | slideLeft | slideRight | scale
  duration: 0.8,
  delay: 0,
});
```

### `useStaggerAnimation`
Animates children elements with stagger effect on scroll.

### `useReducedMotion`
Detects user's `prefers-reduced-motion` preference.

## Brand Theme

### Colors (Tailwind classes)
- `yellow-primary`: #F2B705 (CTAs, accents)
- `navy`: #1A2B4A (primary text)
- `warm-white`: #FEFCF8 (backgrounds)
- `soft-gray`: #E8E6E3 (borders)
- `medium-gray`: #6B7280 (secondary text)

### Typography
- Font: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Main landing page |
| `/about` | About | Company story, values, team |
| `/approach` | Approach | 4-stage framework |
| `/services` | Services | Service pillars |
| `/case-studies` | CaseStudies | Client success stories |
| `/blog` | Blog | Blog posts grid |
| `/contact` | Contact | Contact form + Calendly |

## Performance Optimizations

1. **Code Splitting**: Lazy-loaded routes with Suspense
2. **Chunk Splitting**: Vendor chunks for Three.js, GSAP, React
3. **Reduced Motion**: Respects `prefers-reduced-motion`
4. **Three.js Optimization**: Limited particle count, device pixel ratio

## Accessibility Features

- Semantic HTML structure
- Focus-visible styles
- Skip to content support
- Reduced motion support
- Alt text for images
- ARIA labels for interactive elements

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
