# Astro Migration Design

**Date:** 2026-03-07
**Status:** Approved
**Goal:** Migrate from Vite+React SPA to Astro for SSR/SSG, fixing all critical SEO issues while preserving animations and interactivity.

## Context

The site scores 16/100 on SEO because it's a client-side SPA — crawlers see an empty HTML shell. Astro renders pages as static HTML at build time, with React "islands" only where interactivity is needed.

## Architecture

Astro pages (.astro) handle layout, routing, and SEO meta — all rendered as static HTML. React islands handle interactivity, loaded with Astro's client:* directives.

## Component Strategy

### Converted to Astro (.astro) — No JS shipped
- All page files (index, about, services, approach, etc.)
- Base layout (html head, SEO meta, body wrapper)
- Header (desktop nav links, logo)
- Footer (links, marquee via CSS keyframes)
- PageHero (CSS animation replaces SlideUpText)
- Simple sections: PMCWaySection, ValuesGrid, ProcessTransparency, WhatSetsUsApart
- Cards (CSS hover replaces GSAP hover)
- Section wrapper
- MarqueeText (CSS @keyframes replaces GSAP)

### Stays as React Islands — JS shipped only where needed
- Header MobileMenu (client:load) — state + GSAP menu animation
- HeroSection + HeroBackground/Three.js (client:load) — GSAP word animation + 3D
- ContactForm (client:load) — state + Web3Forms API
- FloatingCTA (client:load) — state + visibility logic
- FAQ Accordion (client:visible) — state for open/close
- ApproachTimeline (client:visible) — multi-element GSAP stagger
- ApproachPreview (client:visible) — progress bar + stagger
- ServicePillars (client:visible) — 3D rotation GSAP
- CaseStudiesGrid (client:visible) — staggered cards + metrics
- SocialProof (client:visible) — quote stagger
- BigTextCTA/ScrubText (client:visible) — GSAP scrub

### CSS Scroll Animations (replacing simple GSAP fade-ups)
- Use `animation-timeline: view()` with `@supports` fallback
- Applies to: Astro sections that previously had simple fadeUp/fadeIn ScrollTrigger

## Project Structure

```
src/
  components/
    astro/        # Astro components (Layout, Header, Footer, PageHero, Cards, etc.)
    react/        # React islands (interactive components)
      sections/   # Complex animated sections
    three/        # HeroBackground (unchanged)
  content/
    blog/         # Astro Content Collections (Markdown/MDX)
  layouts/
    Base.astro    # <html>, <head> with per-page SEO, <body>
    BlogPost.astro
  pages/
    index.astro
    about.astro
    services.astro
    approach.astro
    case-studies.astro
    contact.astro
    faq.astro
    why-yellowbrolly.astro
    blog/
      index.astro
      [...slug].astro
  data/
    content.ts    # Existing content data (unchanged)
  styles/
    global.css    # Existing Tailwind v4 + custom CSS
  hooks/          # useReducedMotion for React islands
```

## SEO Deliverables (built into migration)

1. Per-page title + meta description via Base.astro layout props
2. Canonical URLs auto-generated from Astro.url
3. Open Graph + Twitter Card meta tags in Base layout
4. JSON-LD: Organization + WebSite on homepage, BreadcrumbList on inner pages
5. public/robots.txt with sitemap reference
6. @astrojs/sitemap for auto-generated sitemap.xml
7. vercel.json with security headers
8. public/llms.txt for AI search readiness

## Technical Details

- Astro integrations: @astrojs/react, @astrojs/tailwind, @astrojs/sitemap, @astrojs/vercel
- Tailwind v4: Same @theme block and global.css carry over
- Environment vars: VITE_WEB3FORMS_KEY becomes PUBLIC_WEB3FORMS_KEY
- Output mode: static (pre-rendered at build time)
- Blog: Astro Content Collections with Markdown frontmatter

## What we are NOT doing
- Not rewriting Three.js hero
- Not changing visual design or content
- Not adding new pages beyond blog infrastructure
- Not rewriting complex GSAP animations in React islands

## Estimated JS Reduction
- Current: ~100% JS-rendered
- After: ~30-40% of components ship JS (islands only)
