# YellowBrolly Website Implementation Plan

## Phase 1: Project Setup
1. Initialize Vite + React + TypeScript project
2. Configure Tailwind CSS with brand colors
3. Install dependencies: GSAP, Three.js, React Router v6
4. Set up file structure per specification

## Phase 2: Core Infrastructure
1. Create layout components (Header, Footer, Navigation)
2. Build common UI components (Button, Card, Section)
3. Set up React Router with all routes
4. Create GSAP animation utilities
5. Build Three.js background component

## Phase 3: Page Implementation
1. Home Page - Hero, Approach Preview, Services, Social Proof, CTA
2. About Us Page - Story, Values, Team
3. YB Approach Page - 4-stage framework with timeline
4. What We Do Page - 4 service pillars
5. Case Studies Page - Case study cards
6. Blog Page - Card layout with filtering
7. Contact Page - Form and Calendly integration

## Phase 4: Polish & Optimization
1. Page transitions
2. Scroll animations
3. Performance optimization
4. Accessibility audit
5. Documentation

## Brand Colors (Tailwind Config)
- Primary Yellow: #F2B705 (CTAs, accents)
- Navy: #1A2B4A (primary text)
- Warm White: #FEFCF8 (backgrounds)
- Soft Gray: #E8E6E3 (borders, muted elements)
- Medium Gray: #6B7280 (secondary text)

## Typography
- Font: Inter (Google Fonts)
- Headings: Bold/Semibold
- Body: Regular

## Animation Guidelines
- GSAP ScrollTrigger for section reveals
- Stagger: 0.1-0.2s between elements
- Duration: 0.6-1s for major animations
- Ease: "power2.out" for most animations
- Three.js: Subtle, performance-optimized
