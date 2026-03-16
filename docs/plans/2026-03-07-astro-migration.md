# Astro Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate Yellow Brolly Co from Vite+React SPA to Astro with React islands, fixing all critical SEO issues.

**Architecture:** Astro pages render static HTML for SEO. React "islands" with `client:load` or `client:visible` handle interactivity (GSAP animations, Three.js, forms, menus). Tailwind v4 carries over unchanged. Blog uses Astro Content Collections.

**Tech Stack:** Astro 5, React 19, Tailwind CSS v4, GSAP, Three.js, @astrojs/sitemap, @astrojs/vercel

**Design doc:** `docs/plans/2026-03-07-astro-migration-design.md`

---

## Task 1: Scaffold Astro Project

**Files:**
- Create: `astro.config.mjs`
- Create: `tsconfig.json` (replace existing)
- Modify: `package.json` (replace existing)
- Delete: `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`

**Step 1: Install Astro and integrations**

```bash
cd /Users/gabriela-personal/DEV/yellow-brolly-cd
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If prompted about overwriting files, accept overwrites for `tsconfig.json` and `package.json`.

**Step 2: Install all dependencies**

```bash
npm install astro @astrojs/react @astrojs/tailwind @astrojs/sitemap @astrojs/vercel react react-dom @react-three/drei @react-three/fiber three gsap @gsap/react @types/three @tailwindcss/vite tailwindcss
npm install -D @types/react @types/react-dom typescript
```

**Step 3: Create Astro config**

Create `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yellow-brolly.vercel.app',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('gsap')) return 'gsap-vendor';
          },
        },
      },
    },
  },
});
```

**Step 4: Update tsconfig.json**

Overwrite `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**Step 5: Delete old config files**

```bash
rm -f vite.config.ts tsconfig.app.json tsconfig.node.json eslint.config.js
```

**Step 6: Verify project structure compiles**

```bash
npx astro check
```

Expected: May warn about missing pages, but no config errors.

**Step 7: Commit**

```bash
git add -A && git commit -m "chore: scaffold Astro project with React, Tailwind, sitemap integrations"
```

---

## Task 2: Migrate Styles and Static Assets

**Files:**
- Move: `src/index.css` -> `src/styles/global.css`
- Create: `public/robots.txt`
- Create: `public/llms.txt`
- Create: `vercel.json`

**Step 1: Move and update global CSS**

```bash
mkdir -p src/styles
mv src/index.css src/styles/global.css
```

The CSS content stays exactly the same — Tailwind v4 `@theme` block works identically.

**Step 2: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yellow-brolly.vercel.app/sitemap-index.xml
```

**Step 3: Create llms.txt**

Create `public/llms.txt`:

```
# Yellow Brolly Co

> Technology-forward strategy. Human-first results.

Yellow Brolly Co is a technology consulting firm helping nonprofits, agencies, and mission-driven organizations adopt AI, cybersecurity, and digital tools that fit their culture.

## Services
- Digital readiness assessments and tech stack audits
- Brand and culture alignment for technology adoption
- Cybersecurity audits, policy development, and compliance
- AI integration and workflow automation

## Pages
- [Home](https://yellow-brolly.vercel.app/)
- [About Us](https://yellow-brolly.vercel.app/about)
- [Services](https://yellow-brolly.vercel.app/services)
- [Our Approach](https://yellow-brolly.vercel.app/approach)
- [Case Studies](https://yellow-brolly.vercel.app/case-studies)
- [FAQ](https://yellow-brolly.vercel.app/faq)
- [Contact](https://yellow-brolly.vercel.app/contact)
- [Blog](https://yellow-brolly.vercel.app/blog)

## Contact
- Email: hello@yellowbrolly.co
- Calendly: https://calendly.com/yellowbrolly
```

**Step 4: Create vercel.json with security headers**

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

**Step 5: Commit**

```bash
git add -A && git commit -m "chore: migrate styles, add robots.txt, llms.txt, security headers"
```

---

## Task 3: Create Base Layout with SEO

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/components/astro/SEOHead.astro`

**Step 1: Create SEO head component**

Create `src/components/astro/SEOHead.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const {
  title,
  description,
  canonical = Astro.url.href,
  ogImage = '/og-image.jpg',
  type = 'website',
  jsonLd,
} = Astro.props;

const siteName = 'Yellow Brolly Co';
const siteUrl = 'https://yellow-brolly.vercel.app';
const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
---

<!-- Primary Meta -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content={description} />
<meta name="theme-color" content="#F7B32B" />
<link rel="canonical" href={canonical} />
<link rel="icon" type="image/svg+xml" href="/umbrella.svg" />
<title>{title}</title>

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={fullOgImage} />
<meta property="og:url" content={canonical} />
<meta property="og:type" content={type} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content="en_US" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={fullOgImage} />

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="https://fonts.cdnfonts.com/s/13277/coolvetica.woff" as="font" type="font/woff" crossorigin />
<link rel="preload" href="https://fonts.gstatic.com/s/montserrat/v26/JTUQjIg1_i6t8kCHKm459WRhyzbi.woff2" as="font" type="font/woff2" crossorigin />

<!-- JSON-LD -->
{jsonLd && (
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
)}
```

**Step 2: Create Base layout**

Create `src/layouts/Base.astro`:

```astro
---
import SEOHead from '../components/astro/SEOHead.astro';
import Header from '../components/astro/Header.astro';
import Footer from '../components/astro/Footer.astro';
import FloatingCTA from '../components/react/FloatingCTA.tsx';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const { title, description, ogImage, type, jsonLd } = Astro.props;
const currentPath = Astro.url.pathname;
---

<!doctype html>
<html lang="en">
  <head>
    <SEOHead
      title={title}
      description={description}
      ogImage={ogImage}
      type={type}
      jsonLd={jsonLd}
    />
  </head>
  <body>
    <div class="min-h-screen flex flex-col bg-black text-white relative">
      <!-- Noise texture overlay -->
      <div class="fixed inset-0 pointer-events-none z-40 opacity-[0.02]" style={`background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`} />

      <Header currentPath={currentPath} />
      <main class="flex-grow">
        <slot />
      </main>
      <Footer />
    </div>

    {currentPath !== '/contact' && currentPath !== '/contact/' && (
      <FloatingCTA client:load />
    )}
  </body>
</html>
```

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: create Base layout with SEO head, OG tags, JSON-LD support"
```

---

## Task 4: Create Astro Header and Footer

**Files:**
- Create: `src/components/astro/Header.astro`
- Create: `src/components/react/MobileMenu.tsx`
- Create: `src/components/astro/Footer.astro`
- Create: `src/components/astro/Icons.astro`

**Step 1: Create Icons as Astro component**

Create `src/components/astro/Icons.astro`:

```astro
---
interface Props {
  name: string;
  size?: number;
  class?: string;
}

const { name, size = 24, class: className = '' } = Astro.props;

const icons: Record<string, string> = {
  umbrella: '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />',
  menu: '<line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />',
  close: '<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />',
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />',
  check: '<polyline points="20 6 9 17 4 12" />',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />',
  tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />',
  culture: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />',
  security: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />',
  ai: '<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" /><path d="M7.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /><path d="M16.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />',
  clarity: '<circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />',
  people: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />',
  secure: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />',
  purpose: '<circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />',
  lightbulb: '<path d="M9 21h6" /><path d="M12 3a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 6l1.5 2h3l1.5-2c1.5-1.5 3-3.5 3-6a6 6 0 0 0-6-6z" /><path d="M12 9v3" />',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />',
  compass: '<circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />',
  target: '<circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />',
};

const svgContent = icons[name] || icons['tools'];
---

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  set:html={svgContent}
/>
```

**Step 2: Create Astro Header**

Create `src/components/astro/Header.astro`:

```astro
---
import MobileMenu from '../react/MobileMenu.tsx';

interface Props {
  currentPath: string;
}

const { currentPath } = Astro.props;

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'The YB Approach', path: '/approach' },
  { label: 'What We Do', path: '/services' },
  { label: 'Why YellowBrolly', path: '/why-yellowbrolly' },
  { label: 'FAQ', path: '/faq' },
];

const ctaItem = { label: "Let's Talk", path: '/contact' };

function isActive(path: string): boolean {
  if (path === '/') return currentPath === '/' || currentPath === '';
  return currentPath.startsWith(path);
}
---

<header
  id="main-header"
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent"
>
  <nav class="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
    <div class="flex items-center justify-between h-20 md:h-24">
      <a
        href="/"
        class="flex items-center gap-3 text-white hover:text-yellow-primary transition-colors duration-300 group"
      >
        <div class="relative">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-primary group-hover:scale-110 transition-transform duration-300">
            <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
          </svg>
          <div class="absolute inset-0 bg-yellow-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span class="font-display font-bold text-xl tracking-tight">Yellow Brolly Co</span>
      </a>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-10">
        {navigation.map((item) => (
          <a
            href={item.path}
            class={`relative font-medium text-sm tracking-wide transition-colors duration-300 ${
              isActive(item.path) ? 'text-yellow-primary' : 'text-gray hover:text-white'
            }`}
          >
            {item.label}
            <span
              class={`absolute -bottom-1 left-0 h-0.5 bg-yellow-primary transition-all duration-300 ${
                isActive(item.path) ? 'w-full' : 'w-0'
              }`}
            />
          </a>
        ))}
        <a
          href={ctaItem.path}
          class="relative inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black overflow-hidden group bg-yellow-primary text-black hover:bg-yellow-hover border-2 border-yellow-primary hover:border-yellow-hover px-5 py-2 text-xs"
        >
          <span class="relative z-10 flex items-center gap-2">{ctaItem.label}</span>
          <span class="absolute inset-0 bg-yellow-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
        </a>
      </div>

      <!-- Mobile menu toggle (React island) -->
      <MobileMenu client:load currentPath={currentPath} />
    </div>
  </nav>
</header>

<script>
  // Scroll detection for header background
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-black/90', 'backdrop-blur-xl', 'border-b', 'border-dark-border');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-black/90', 'backdrop-blur-xl', 'border-b', 'border-dark-border');
        header.classList.add('bg-transparent');
      }
    }, { passive: true });
  }
</script>
```

**Step 3: Create React MobileMenu island**

Create `src/components/react/MobileMenu.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'The YB Approach', path: '/approach' },
  { label: 'What We Do', path: '/services' },
  { label: 'Why YellowBrolly', path: '/why-yellowbrolly' },
  { label: 'FAQ', path: '/faq' },
  { label: "Let's Talk", path: '/contact', isCta: true },
];

interface Props {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo('.mobile-menu', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
        gsap.fromTo('.mobile-menu-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.1 });
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/' || currentPath === '';
    return currentPath.startsWith(path);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden relative w-12 h-12 flex items-center justify-center text-white hover:text-yellow-primary transition-colors duration-300 rounded-lg hover:bg-white/5"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {isOpen ? (
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="mobile-menu lg:hidden fixed left-0 right-0 top-20 md:top-24 bottom-0 bg-black backdrop-blur-xl z-50">
          <nav className="container mx-auto px-6 py-12 h-full flex flex-col">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`mobile-menu-item py-4 min-h-[48px] flex items-center text-2xl sm:text-3xl font-display font-bold transition-colors duration-300 ${
                    isActive(item.path) ? 'text-yellow-primary' : 'text-white hover:text-yellow-primary'
                  } ${item.isCta ? 'mt-8' : ''}`}
                >
                  {item.isCta ? (
                    <span className="inline-block px-8 py-4 bg-yellow-primary text-black rounded-full text-lg">{item.label}</span>
                  ) : item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
```

**Step 4: Create Astro Footer**

Create `src/components/astro/Footer.astro`:

```astro
---
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'The YB Approach', path: '/approach' },
  { label: 'What We Do', path: '/services' },
];

const moreItems = [
  { label: 'Why YellowBrolly', path: '/why-yellowbrolly' },
  { label: 'FAQ', path: '/faq' },
  { label: "Let's Talk", path: '/contact' },
];

const footerLinks = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
];

const currentYear = new Date().getFullYear();

const marqueeText = 'DIGITAL STRATEGY • HUMAN-FIRST • CYBERSECURITY • BRAND & CULTURE • AI INTEGRATION • ';
---

<footer class="bg-dark border-t border-dark-border">
  <!-- CSS Marquee -->
  <div class="py-6 border-b border-dark-border overflow-hidden">
    <div class="marquee-track">
      <div class="marquee-content text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-dark-border select-none tracking-wider">
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16 lg:py-20">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
      <div class="lg:col-span-2">
        <a href="/" class="inline-flex items-center gap-3 mb-6 group">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-primary group-hover:scale-110 transition-transform duration-300">
            <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
          </svg>
          <span class="font-display font-bold text-2xl text-white">Yellow Brolly Co</span>
        </a>
        <p class="text-gray max-w-md text-lg leading-relaxed">
          Technology-forward strategy. Human-first results.
        </p>
      </div>

      <div>
        <h4 class="font-display font-bold text-white mb-6 text-lg">Navigate</h4>
        <nav class="flex flex-col gap-3">
          {navItems.map((item) => (
            <a href={item.path} class="text-gray hover:text-yellow-primary transition-colors duration-300 hover:translate-x-1 transform inline-block py-2 min-h-[48px] flex items-center">
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <h4 class="font-display font-bold text-white mb-6 text-lg">More</h4>
        <nav class="flex flex-col gap-3">
          {moreItems.map((item) => (
            <a href={item.path} class="text-gray hover:text-yellow-primary transition-colors duration-300 hover:translate-x-1 transform inline-block py-2 min-h-[48px] flex items-center">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>

    <div class="border-t border-dark-border mt-12 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-gray/60 text-sm">&copy; {currentYear} Yellow Brolly Co. All rights reserved.</p>
      <div class="flex gap-6 sm:gap-8">
        {footerLinks.map((link) => (
          <a href={link.path} class="text-gray/60 hover:text-yellow-primary text-sm transition-colors duration-300 py-2 min-h-[48px] inline-flex items-center">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
</footer>

<style>
  .marquee-track {
    overflow: hidden;
    width: 100%;
  }
  .marquee-content {
    display: inline-flex;
    white-space: nowrap;
    animation: marquee 30s linear infinite;
  }
  .marquee-content span {
    padding-right: 2rem;
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .marquee-content { animation: none; }
  }
</style>
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: create Astro Header, Footer, MobileMenu island, and SEO components"
```

---

## Task 5: Migrate React Islands (Adapt Existing Components)

**Files:**
- Create: `src/components/react/FloatingCTA.tsx` (adapted from existing)
- Create: `src/components/react/Button.tsx` (adapted — replace Link with `<a>`)
- Move: `src/components/react/ContactForm.tsx` (adapted)
- Move: `src/components/react/HeroSection.tsx` (adapted)
- Move: `src/components/three/HeroBackground.tsx` (unchanged)
- Move: `src/hooks/useReducedMotion.ts` (unchanged)
- Move: `src/components/react/TextAnimations.tsx` (unchanged)
- Create: `src/components/react/sections/` — move all animated section components

The key change for all React islands: **replace `react-router-dom` `Link` with plain `<a>` tags**, and replace `useLocation` with a `currentPath` prop where needed.

**Step 1: Create React Button (remove react-router-dom)**

Create `src/components/react/Button.tsx` — copy from `src/components/common/Button.tsx` but replace the `Link` import and usage:

- Remove: `import { Link } from 'react-router-dom';`
- Replace the `if (to)` block: change `<Link to={to}>` to `<a href={to}>`

Everything else stays identical (GSAP magnetic effect, variants, sizes).

**Step 2: Create React FloatingCTA (remove react-router-dom)**

Create `src/components/react/FloatingCTA.tsx` — adapt from `src/components/common/FloatingCTA.tsx`:

- Remove: `import { Link, useLocation } from 'react-router-dom';`
- Remove: `useLocation()` usage — the Base layout handles hide-on-contact logic
- Replace: `<Link to="/contact">` with `<a href="/contact">`

**Step 3: Create React ContactForm (adapt imports)**

Create `src/components/react/ContactForm.tsx` — adapt from existing:

- Remove: `import { Section, Button, ... } from '../common';` — import from `./Button` instead
- Replace: `import.meta.env.VITE_WEB3FORMS_KEY` with `import.meta.env.PUBLIC_WEB3FORMS_KEY`
- Inline the Section wrapper HTML (or pass as Astro slot from page)
- Keep all GSAP animations and form logic identical

**Step 4: Move animated section components to `src/components/react/sections/`**

Copy these files, updating imports to remove react-router-dom and use local Button:

- `ApproachTimeline.tsx` — no router deps, just update import paths
- `ApproachPreview.tsx` — update Button import path
- `ServicePillars.tsx` — no router deps, update import paths
- `CaseStudiesGrid.tsx` — no router deps, update import paths
- `SocialProof.tsx` — no router deps, update import paths
- `CTASection.tsx` (includes BigTextCTA) — update Button import, replace Link with `<a>`
- `HeroSection.tsx` — update Button import, replace Link with `<a>`
- `TeamSection.tsx` — no router deps, update import paths

**Step 5: Copy shared utilities unchanged**

```bash
mkdir -p src/components/react/sections
cp src/hooks/useReducedMotion.ts src/hooks/useReducedMotion.ts  # stays in place
cp src/components/common/TextAnimations.tsx src/components/react/TextAnimations.tsx
cp src/components/three/HeroBackground.tsx src/components/react/three/HeroBackground.tsx
cp src/components/common/Icons.tsx src/components/react/Icons.tsx
cp src/data/content.ts src/data/content.ts  # stays in place
```

**Step 6: Create FAQ Accordion island**

Create `src/components/react/FAQAccordion.tsx`:

```tsx
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  questions: FAQItem[];
}

export default function FAQAccordion({ questions }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {questions.map((item, index) => (
        <div key={index} className="border-b border-dark-border">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left flex items-center justify-between py-5 group transition-colors"
          >
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-primary transition-colors duration-300 pr-8">
              {item.question}
            </h3>
            <svg
              className={`flex-shrink-0 text-gray transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="text-gray leading-relaxed text-base pb-5">{item.answer}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Step 7: Verify React islands compile**

```bash
npx astro check
```

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: migrate React components to islands, remove react-router-dom dependency"
```

---

## Task 6: Create Astro Section Components

**Files:**
- Create: `src/components/astro/Section.astro`
- Create: `src/components/astro/PageHero.astro`
- Create: `src/components/astro/PMCWaySection.astro`
- Create: `src/components/astro/WhatSetsUsApart.astro`
- Create: `src/components/astro/ValuesGrid.astro`
- Create: `src/components/astro/ServicesPreview.astro`

These are sections that had simple GSAP fade-ups, now replaced with CSS scroll-driven animations.

**Step 1: Create Section.astro**

```astro
---
interface Props {
  background?: 'black' | 'dark' | 'elevated';
  id?: string;
  class?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const {
  background = 'black',
  id,
  class: className = '',
  fullWidth = false,
  noPadding = false,
} = Astro.props;

const bgStyles: Record<string, string> = {
  black: 'bg-black',
  dark: 'bg-dark',
  elevated: 'bg-dark-elevated',
};
---

<section id={id} class={`${noPadding ? '' : 'py-16 md:py-24 lg:py-32'} ${bgStyles[background]} ${className}`}>
  {fullWidth ? (
    <slot />
  ) : (
    <div class="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
      <slot />
    </div>
  )}
</section>
```

**Step 2: Create PageHero.astro**

```astro
---
interface Props {
  headline: string;
  subhead?: string;
  eyebrow?: string;
}

const { headline, subhead, eyebrow } = Astro.props;
---

<section class="relative pt-24 pb-16 md:pt-36 md:pb-20 lg:pt-48 lg:pb-32 bg-black overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-dark-elevated/50 to-black"></div>
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,221,0,0.08),transparent_50%)]"></div>

  <div class="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
    {eyebrow && (
      <span class="inline-block text-yellow-primary text-sm font-semibold tracking-[0.3em] uppercase mb-6">
        {eyebrow}
      </span>
    )}
    <h1 class="scroll-fade-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight max-w-4xl">
      {headline}
    </h1>
    {subhead && (
      <p class="scroll-fade-up mt-6 md:mt-8 text-base md:text-xl text-gray max-w-2xl leading-relaxed">
        {subhead}
      </p>
    )}
  </div>
</section>
```

**Step 3: Create remaining Astro sections**

Create `src/components/astro/PMCWaySection.astro`, `WhatSetsUsApart.astro`, `ValuesGrid.astro`, `ServicesPreview.astro` — converting the React versions to plain Astro HTML. Import content from `src/data/content.ts`. Add class `scroll-fade-up` to elements that should animate on scroll.

**Step 4: Add CSS scroll-driven animations to global.css**

Append to `src/styles/global.css`:

```css
/* Scroll-driven fade-up animation */
.scroll-fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fade-up-in 0.6s ease-out forwards;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

@keyframes fade-up-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fallback for browsers without scroll-driven animations */
@supports not (animation-timeline: view()) {
  .scroll-fade-up {
    opacity: 1;
    transform: none;
  }
}
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: create Astro section components with CSS scroll animations"
```

---

## Task 7: Create All Astro Pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/services.astro`
- Create: `src/pages/approach.astro`
- Create: `src/pages/case-studies.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/faq.astro`
- Create: `src/pages/why-yellowbrolly.astro`

**Step 1: Create homepage**

Create `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import HeroSection from '../components/react/HeroSection.tsx';
import PMCWaySection from '../components/astro/PMCWaySection.astro';
import WhatSetsUsApart from '../components/astro/WhatSetsUsApart.astro';
import BigTextCTA from '../components/react/sections/CTASection.tsx';
import ApproachPreview from '../components/react/sections/ApproachPreview.tsx';
import ServicesPreview from '../components/astro/ServicesPreview.astro';
import SocialProof from '../components/react/sections/SocialProof.tsx';
import CTASection from '../components/react/sections/CTASection.tsx';

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yellow Brolly Co",
    "url": "https://yellow-brolly.vercel.app",
    "logo": "https://yellow-brolly.vercel.app/umbrella.svg",
    "description": "Technology consulting that fits your culture. We help nonprofits and agencies adopt AI, improve cybersecurity, and build tech stacks that work.",
    "email": "hello@yellowbrolly.co",
    "founders": [
      { "@type": "Person", "name": "Aimee Slater" },
      { "@type": "Person", "name": "Abbey Ferreira" },
      { "@type": "Person", "name": "Jon Ferreira" }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/aimeelslater/",
      "https://www.linkedin.com/in/abbey-ferreira-92b1291b2/",
      "https://www.linkedin.com/in/kevinjburgess1/"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Yellow Brolly Co",
    "url": "https://yellow-brolly.vercel.app"
  }
];
---

<Base
  title="Technology Consulting for Nonprofits & Agencies | YellowBrollyCo"
  description="Technology consulting that fits your culture. We help nonprofits and agencies adopt AI, improve cybersecurity, and build tech stacks that actually work. Book a discovery call."
  jsonLd={jsonLd}
>
  <HeroSection client:load
    headline="Technology-forward strategy. Human-first results."
    highlightedWord="Human-first"
    subhead="We help teams adopt digital tools, AI, and cybersecurity practices without losing sight of their culture, brand, or what actually matters."
    ctaPrimary={{ label: 'Book a Discovery Call', to: '/contact' }}
    ctaSecondary={{ label: 'Explore What We Have to Offer', to: '/services' }}
    showBackground={true}
    eyebrow="Yellow Brolly Co"
  />
  <PMCWaySection />
  <WhatSetsUsApart />
  <ApproachPreview client:visible />
  <ServicesPreview />
  <SocialProof client:visible />
</Base>
```

**Step 2: Create all other pages**

Each page follows the same pattern: import `Base` layout, pass SEO props, compose Astro + React island sections. Use `client:visible` for animated sections, `client:load` for above-the-fold interactive components.

Create each page: `about.astro`, `services.astro`, `approach.astro`, `case-studies.astro`, `contact.astro`, `faq.astro`, `why-yellowbrolly.astro`.

Each page gets its own unique `title` and `description` from the ACTION-PLAN.md meta tag table.

**Step 3: Verify build**

```bash
npx astro build
```

Expected: All pages generate as static HTML files in `dist/`.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: create all Astro pages with per-page SEO meta"
```

---

## Task 8: Set Up Blog with Content Collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/why-people-first-tech-matters.md`
- Create: `src/content/blog/five-signs-tech-stack-needs-audit.md`
- Create: `src/content/blog/building-culture-of-digital-confidence.md`
- Create: `src/layouts/BlogPost.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`

**Step 1: Define content collection schema**

Create `src/content.config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    category: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
```

**Step 2: Create seed blog posts as Markdown**

Create `src/content/blog/why-people-first-tech-matters.md`:

```markdown
---
title: "Why People-First Tech Matters More Than Ever"
excerpt: "Automation is accelerating. The organizations doing well are the ones keeping humans in the loop."
date: "2024-01-15"
category: "Culture"
---

Automation is accelerating. The organizations doing well are the ones keeping humans in the loop.

Technology should serve people, not replace them...
```

Create similar files for the other two posts.

**Step 3: Create BlogPost layout**

Create `src/layouts/BlogPost.astro`:

```astro
---
import Base from './Base.astro';

interface Props {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const { title, excerpt, date, category } = Astro.props;
---

<Base title={`${title} | YellowBrollyCo`} description={excerpt}>
  <article class="pt-24 pb-16 md:pt-36 md:pb-20 lg:pt-48 lg:pb-32 bg-black">
    <div class="container mx-auto px-6 md:px-8 lg:px-12 max-w-3xl">
      <span class="inline-block text-yellow-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4">{category}</span>
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">{title}</h1>
      <time class="text-gray text-sm">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>

      <div class="mt-12 prose prose-invert prose-yellow max-w-none text-gray leading-relaxed [&_h2]:text-white [&_h2]:font-display [&_h2]:font-bold [&_h3]:text-white [&_h3]:font-display [&_a]:text-yellow-primary">
        <slot />
      </div>
    </div>
  </article>
</Base>
```

**Step 4: Create blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import PageHero from '../../components/astro/PageHero.astro';
import Section from '../../components/astro/Section.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog')).sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<Base title="Insights & Ideas | YellowBrollyCo" description="Thoughts on technology, culture, and people-first strategy from the YellowBrolly team.">
  <PageHero headline="Insights & Ideas" subhead="Thoughts on technology, culture, and people-first strategy." eyebrow="Blog" />

  <Section background="dark">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <a href={`/blog/${post.id}`} class="group block bg-dark-elevated border border-dark-border rounded-2xl overflow-hidden hover:border-yellow-primary/30 transition-all duration-300">
          <div class="p-6">
            <span class="text-yellow-primary text-xs font-semibold tracking-wider uppercase">{post.data.category}</span>
            <h2 class="text-lg font-bold text-white mt-2 mb-3 group-hover:text-yellow-primary transition-colors">{post.data.title}</h2>
            <p class="text-gray text-sm leading-relaxed">{post.data.excerpt}</p>
            <time class="block text-gray/60 text-xs mt-4">{new Date(post.data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </a>
      ))}
    </div>
  </Section>
</Base>
```

**Step 5: Create dynamic blog post page**

Create `src/pages/blog/[...slug].astro`:

```astro
---
import BlogPost from '../../layouts/BlogPost.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BlogPost title={post.data.title} excerpt={post.data.excerpt} date={post.data.date} category={post.data.category}>
  <Content />
</BlogPost>
```

**Step 6: Verify blog builds**

```bash
npx astro build
```

Expected: Blog listing and individual post pages generate in `dist/blog/`.

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: add blog with Astro Content Collections and Markdown posts"
```

---

## Task 9: Update Environment Variables and Clean Up

**Files:**
- Create: `.env.example` (update)
- Delete: Old SPA files no longer needed
- Modify: `src/main.tsx` -> delete
- Modify: `src/App.tsx` -> delete
- Modify: `index.html` -> delete (Astro generates its own)

**Step 1: Update .env.example**

```
PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

**Step 2: Delete old SPA entry points and routing**

```bash
rm -f src/main.tsx src/App.tsx index.html
rm -f src/pages/index.ts
rm -rf src/components/layout  # old Layout, Header, Footer
rm -rf src/components/common   # replaced by astro/ and react/ dirs
rm -rf src/components/sections # replaced by astro/ and react/sections/
rm -f src/animations/pageTransitions.ts  # no longer needed (Astro handles page loads)
rm -f src/hooks/useScrollAnimation.ts    # replaced by CSS scroll animations
rm -f src/hooks/useOptimizedGSAP.tsx     # no longer needed
```

**Step 3: Remove react-router-dom from package.json**

```bash
npm uninstall react-router-dom
```

**Step 4: Full build verification**

```bash
npx astro build
```

Expected: Clean build with all pages in `dist/`. No react-router-dom references.

**Step 5: Preview locally**

```bash
npx astro preview
```

Manually verify:
- All 9 pages load with content visible in View Source
- Mobile menu works
- Contact form submits
- GSAP animations play on scroll
- Three.js hero renders on homepage
- Blog listing and posts work
- Footer marquee scrolls

**Step 6: Verify SEO with curl**

```bash
curl -s https://localhost:4321/ | head -50
```

Expected: Full HTML with `<h1>`, `<meta>`, OG tags, JSON-LD, content text — not an empty shell.

**Step 7: Commit**

```bash
git add -A && git commit -m "chore: clean up old SPA files, remove react-router-dom"
```

---

## Task 10: Final SEO Verification

**Step 1: Run parse_html on built output**

```bash
python3 ~/.claude/skills/seo/scripts/parse_html.py dist/index.html --url https://yellow-brolly.vercel.app/ --json
```

Expected: `h1` populated, `word_count` >> 6, `links.internal` populated, `schema` populated.

**Step 2: Check all pages have unique titles**

```bash
for f in dist/*.html dist/**/*.html; do echo "$f: $(grep -oP '<title>\K[^<]+' "$f" 2>/dev/null)"; done
```

Expected: Each page has a unique title.

**Step 3: Verify sitemap was generated**

```bash
cat dist/sitemap-index.xml
```

Expected: XML sitemap with all page URLs.

**Step 4: Commit final state**

```bash
git add -A && git commit -m "Migrate to Astro: SSR/SSG, per-page SEO, React islands, blog content collections"
```

---

## Summary of Tasks

| # | Task | Key Files | Estimated Time |
|---|------|-----------|----------------|
| 1 | Scaffold Astro project | `astro.config.mjs`, `tsconfig.json`, `package.json` | 10 min |
| 2 | Migrate styles and static assets | `global.css`, `robots.txt`, `llms.txt`, `vercel.json` | 5 min |
| 3 | Create Base layout with SEO | `Base.astro`, `SEOHead.astro` | 10 min |
| 4 | Create Astro Header and Footer | `Header.astro`, `MobileMenu.tsx`, `Footer.astro` | 15 min |
| 5 | Migrate React islands | All interactive components adapted | 30 min |
| 6 | Create Astro section components | Static sections with CSS animations | 20 min |
| 7 | Create all Astro pages | 9 `.astro` page files | 20 min |
| 8 | Set up blog with Content Collections | Collection schema, layouts, 3 posts | 15 min |
| 9 | Clean up old SPA files | Delete old entry points, remove react-router-dom | 10 min |
| 10 | Final SEO verification | Validate HTML output, sitemap, meta | 5 min |
