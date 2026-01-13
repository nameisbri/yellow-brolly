# YellowBrollyCo Website

A modern, technology-forward consulting firm website built with React, TypeScript, and Vite.

## Tech Stack

- **Frontend**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Animations**: GSAP 3.14.2 with ScrollTrigger
- **3D Graphics**: Three.js with @react-three/fiber
- **Routing**: React Router DOM 7.12.0
- **Fonts**: Coolvetica, Montserrat

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Button, Card, Icons, TextAnimations, FloatingCTA)
│   ├── layout/          # Layout components (Header, Footer, Layout)
│   ├── sections/         # Page sections (Hero, Timeline, Services, Case Studies, etc.)
│   └── three/            # 3D graphics (HeroBackground with particles, grid, glow effects)
├── data/
│   └── content.ts         # Centralized site content and copy
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Approach.tsx
│   ├── Services.tsx
│   ├── CaseStudies.tsx
│   ├── Blog.tsx
│   └── Contact.tsx
├── hooks/
│   ├── useReducedMotion.ts     # Accessibility hook for prefers-reduced-motion
│   └── useScrollAnimation.ts     # GSAP scroll animation hooks
└── animations/
    └── pageTransitions.ts        # GSAP page transition utilities
```

## Pages

- **Home**: Hero with 3D background, Approach preview, Services preview, Social proof, CTA
- **About**: Mission, story, values grid, team section, CTA
- **Approach**: 4-stage methodology timeline (Assess → Align → Activate → Amplify)
- **Services**: 4 service pillars with detailed cards
- **Case Studies**: Client success stories with metrics
- **Blog**: Article grid with category filtering
- **Contact**: Contact form with Calendly integration

## Key Features

### 🎨 Design
- Dark theme with brand yellow (#F7B32B) accent
- Animated hero section with interactive 3D background
- Floating particles, grid, and mouse-following glow effects
- Smooth GSAP scroll animations throughout
- Fully responsive design
- Accessibility-first with reduced motion support

### ✨ Components
- **Floating CTA**: Persistent call-to-action widget on all pages
- **Marquee**: Scrolling text with comprehensive service keywords
- **Text Animations**: Slide-up reveals, character-by-character animations
- **Buttons**: Primary/outline variants with hover effects
- **Forms**: Contact form with validation and external calendar integration

### 🚀 Performance
- Code splitting and lazy loading
- Optimized 3D rendering
- Smooth page transitions
- Production-ready build configuration

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Brand

YellowBrollyCo is a technology consulting firm focused on "Technology-forward strategy. Human-first results."

The company helps organizations by:
- Digital strategy and readiness
- Brand and culture transformation
- Cybersecurity and digital hygiene
- AI integration and workflow automation
- Technology consulting and implementation

Built with care to be fast, accessible, and visually stunning.
