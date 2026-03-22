# Homepage Design Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Address all critique findings — reduce section count, eliminate AI-template patterns, add structural variety, fix bugs, and clean up global components (buttons, cards, layout) across ALL pages.

**Architecture:** Astro SSG with React islands. Global components (Button, Card, Section, Header, Footer) are shared across all pages. Homepage-specific Astro components (PMCWaySection, WhatSetsUsApart, ServicesPreview, WorkPreview) and React components (HeroSection, CTASection, SocialProof, ApproachPreview) render on the index page. Changes to Button.tsx, Card.tsx, Header.astro, and global.css affect the entire site.

**Tech Stack:** Astro, React, Tailwind CSS v4, GSAP, TypeScript

**Constraint:** Poppins remains the only font (client requirement). Typography improvements use weight/size contrast only.

---

## File Map

### Global files (affect ALL pages)
- Modify: `src/components/react/Button.tsx` — remove corner-bracket decoration
- Modify: `src/components/react/Card.tsx` — vary rounding
- Modify: `src/layouts/Base.astro` — remove noise texture overlay
- Modify: `src/styles/global.css` — remove noise CSS, refine typography weights
- Modify: `src/components/astro/Header.astro` — remove corner brackets from nav CTA, fix dropdown contrast
- Modify: `src/components/react/FloatingCTA.tsx` — update rounding

### Other page files (affected by global cleanup)
- Modify: `src/pages/brand-archetype.astro` — remove corner brackets + dot patterns
- Modify: `src/pages/case-studies.astro` — remove dot pattern
- Modify: `src/components/astro/PageHero.astro` — remove dot pattern

### Homepage-only files
- Modify: `src/pages/index.astro` — restructure sections, remove BigTextCTA + Brand Archetype callout
- Modify: `src/components/react/HeroSection.tsx` — remove Three.js, remove scroll indicator, fix highlightedWord, simplify CTAs
- Modify: `src/components/astro/ServicesPreview.astro` — redesign as editorial list (remove card grid + inline corner brackets)
- Modify: `src/components/astro/WorkPreview.astro` — redesign with featured + small layout
- Modify: `src/components/react/sections/ApproachPreview.tsx` — stagger cards, replace button with text link
- Modify: `src/components/react/sections/CTASection.tsx` — simplify, remove dot pattern overlay
- Modify: `src/components/react/sections/SocialProof.tsx` — minor rounding refinement

### New files
- Create: `src/components/astro/WhoWeAre.astro` — merged PMC Way + What Sets Us Apart

### Files to potentially delete (after verifying no other imports)
- `src/components/react/three/HeroBackground.tsx` — Three.js hero background
- `src/components/three/HeroBackground.tsx` — duplicate/old version
- `src/components/astro/PMCWaySection.astro` — replaced by WhoWeAre
- `src/components/astro/WhatSetsUsApart.astro` — replaced by WhoWeAre

---

### Task 1: Button — Remove Corner-Bracket Decoration (Global)

**Files:**
- Modify: `src/components/react/Button.tsx`
- Modify: `src/components/astro/Header.astro`
- Modify: `src/components/astro/ServicesPreview.astro`
- Modify: `src/pages/brand-archetype.astro`

This change affects every page that renders a Button.

- [ ] **Step 1: Remove the 4 corner-bracket spans from Button.tsx**

In `src/components/react/Button.tsx`, remove lines 131-135 (the 4 `<span>` elements with `border-l-2 border-t-2` etc.) from the `content` variable. Keep the fill-up hover animation spans and the magnetic effect — only remove the corner decorations.

Remove these lines from the `content` JSX:
```tsx
{/* Corner accents for corporate feel */}
<span className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
<span className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
<span className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
<span className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
```

- [ ] **Step 2: Remove corner-bracket spans from Header.astro nav CTA**

In `src/components/astro/Header.astro`, lines 110-113, remove the 4 identical `<span>` corner decorations from the "Let's Talk" navigation CTA button.

- [ ] **Step 3: Remove corner-bracket spans from ServicesPreview.astro**

In `src/components/astro/ServicesPreview.astro`, lines 52-55, remove the 4 identical `<span>` corner decorations from the "Explore All Services" button.

- [ ] **Step 4: Remove corner-bracket spans from brand-archetype.astro**

In `src/pages/brand-archetype.astro`, lines 285-288, remove the 4 identical `<span>` corner decorations from the "Start the Quiz" CTA button.

- [ ] **Step 5: Verify visually**

Run: `npm run dev` (or `npx astro dev`)
Check: Homepage, Services page, any page with buttons. Buttons should still have fill-up hover animation but no corner bracket decorations.

- [ ] **Step 6: Commit**

```bash
git add src/components/react/Button.tsx src/components/astro/Header.astro src/components/astro/ServicesPreview.astro src/pages/brand-archetype.astro
git commit -m "refactor: remove corner-bracket button decorations across all pages"
```

---

### Task 2: Layout — Remove Noise Texture Overlay + Dot Patterns (Global)

**Files:**
- Modify: `src/layouts/Base.astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/react/sections/CTASection.tsx`
- Modify: `src/components/astro/PageHero.astro`
- Modify: `src/pages/brand-archetype.astro`
- Modify: `src/pages/case-studies.astro`

- [ ] **Step 1: Remove noise overlay div from Base.astro**

In `src/layouts/Base.astro`, remove the entire noise texture div (line 33):
```html
<div class="fixed inset-0 pointer-events-none z-40 opacity-[0.02]" style={`background-image: url("data:image/svg+xml,...")`} />
```

- [ ] **Step 2: Remove noise CSS from global.css**

In `src/styles/global.css`, remove the `.noise::before` rule block (lines 165-173) and the `.glow` rule (lines 146-148).

- [ ] **Step 3: Remove dot pattern from CTASection.tsx**

In `src/components/react/sections/CTASection.tsx`, remove the dot pattern overlay div (line 57):
```tsx
<div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '24px 24px' }} />
```

- [ ] **Step 4: Remove dot pattern from PageHero.astro**

In `src/components/astro/PageHero.astro`, remove the dot pattern div (line 13):
```html
<div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle at 1px 1px, #000 1px, transparent 0); background-size: 24px 24px;"></div>
```

Keep the umbrella watermark and diagonal accent line in PageHero — those are distinctive brand elements.

- [ ] **Step 5: Remove dot patterns from brand-archetype.astro**

In `src/pages/brand-archetype.astro`, remove the dot pattern divs at lines 12 and 246:
```html
<div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle at 1px 1px, #000 1px, transparent 0); background-size: 24px 24px;"></div>
```

- [ ] **Step 6: Remove dot pattern from case-studies.astro**

In `src/pages/case-studies.astro`, remove the dot pattern div at line 45:
```html
<div class="absolute inset-0 opacity-[0.04]" style="background-image: radial-gradient(circle at 1px 1px, #000 1px, transparent 0); background-size: 24px 24px;"></div>
```

- [ ] **Step 7: Commit**

```bash
git add src/layouts/Base.astro src/styles/global.css src/components/react/sections/CTASection.tsx src/components/astro/PageHero.astro src/pages/brand-archetype.astro src/pages/case-studies.astro
git commit -m "refactor: remove noise texture overlay and dot patterns site-wide"
```

---

### Task 3: Card + FloatingCTA — Vary Rounding (Global)

**Files:**
- Modify: `src/components/react/Card.tsx`
- Modify: `src/components/react/FloatingCTA.tsx`

- [ ] **Step 1: Change Card.tsx from rounded-2xl to rounded-xl**

In `src/components/react/Card.tsx` line 85, change `rounded-2xl` to `rounded-xl`:
```tsx
className={`bg-white rounded-xl p-8 border border-light-border transition-colors duration-500 ${className}`}
```

This affects all Card-based components across all pages (ServiceCard, TestimonialCard, CaseStudyCard).

- [ ] **Step 2: Update FloatingCTA rounding**

In `src/components/react/FloatingCTA.tsx` line 50, change `rounded-2xl` to `rounded-xl`:
```tsx
className="group relative bg-dark-elevated backdrop-blur-xl border border-yellow-primary/30 rounded-xl p-4 ..."
```

- [ ] **Step 3: Commit**

```bash
git add src/components/react/Card.tsx src/components/react/FloatingCTA.tsx
git commit -m "refactor: vary rounding from rounded-2xl to rounded-xl on cards and floating CTA"
```

---

### Task 4: Header — Fix Dropdown Contrast on Scrolled State

**Files:**
- Modify: `src/components/astro/Header.astro`

- [ ] **Step 1: Change dropdown menu background for scrolled state**

The dropdown currently always uses `bg-dark-warm` (dark background). When the header is scrolled and has a cream background, this is jarring.

In `src/components/astro/Header.astro`, change the dropdown menu container (line 71) from dark to light styling:
```html
<div class="bg-white border border-light-border rounded-lg shadow-xl py-2 overflow-hidden">
```

Update the dropdown link styles (line 75-80) to work on light background:
```html
<a
  href={item.path}
  class={`block px-5 py-2.5 text-sm transition-colors duration-200 ${
    isActive(item.path)
      ? 'text-yellow-text bg-yellow-primary/10'
      : 'text-text-secondary hover:text-text-primary hover:bg-sand'
  }`}
>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/astro/Header.astro
git commit -m "fix: dropdown menu uses light bg to match scrolled header"
```

---

### Task 5: Hero — Replace Three.js with CSS, Fix Bugs, Simplify

**Files:**
- Modify: `src/components/react/HeroSection.tsx`
- Delete: `src/components/react/three/HeroBackground.tsx`
- Delete: `src/components/three/HeroBackground.tsx` (old duplicate)

- [ ] **Step 1: Remove Three.js import and scroll indicator from HeroSection.tsx**

In `src/components/react/HeroSection.tsx`:

1. Remove the lazy import (line 7):
   ```tsx
   const HeroBackground = lazy(() => import('./three/HeroBackground').then(m => ({ default: m.HeroBackground })));
   ```
   Also remove `lazy` from the React import on line 1.

2. Remove the `{showBackground && <HeroBackground />}` render (line 95).

3. Remove the scroll indicator block (lines 158-163):
   ```tsx
   {!compact && (
     <div className="absolute bottom-12 left-1/2 ...">...</div>
   )}
   ```

4. Replace with a CSS-only background. Add this directly inside the `<section>` before the container div:
   ```tsx
   {/* CSS-only background — subtle grain + radial warmth */}
   {showBackground && (
     <div className="absolute inset-0 z-0">
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.08),transparent)]" />
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(0,0,0,0.04),transparent)]" />
     </div>
   )}
   ```

- [ ] **Step 2: Fix highlightedWord matching**

The current logic splits on spaces and matches per-word, so "forward." won't match "forward" from highlightedWord="move forward".

Replace the word rendering logic (lines 109-121). Instead of per-word matching against the full `highlightedWord` string, match against individual words from the highlighted phrase, stripping punctuation:

```tsx
const highlightWords = highlightedWord
  ? highlightedWord.toLowerCase().split(' ')
  : [];

// Then in the map:
{words.map((word, index) => {
  const cleanWord = word.replace(/[.,!?;:]/g, '').toLowerCase();
  const isHighlighted = highlightWords.includes(cleanWord);
  return (
    <span
      key={index}
      className="hero-word inline-block mr-[0.25em] last:mr-0"
    >
      <span className={isHighlighted ? 'text-black' : 'text-black/80'}>
        {word}
      </span>
    </span>
  );
})}
```

Also remove the `style={{ perspective: '1000px' }}` from the h1 and `style={{ transform: 'preserve-3d' }}` from each word span — these were for Three.js depth effects that no longer apply.

- [ ] **Step 3: Remove secondary CTA from hero usage in index.astro**

In `src/pages/index.astro`, remove the `ctaSecondary` prop from the HeroSection call (line 58):
```astro
<HeroSection client:load
  headline="When growth gets complex, we help you move forward."
  highlightedWord="move forward"
  subhead="YellowBrolly helps organizations strengthen leadership, modernize operations, and implement change that lasts."
  ctaPrimary={{ label: 'Book a Discovery Call', to: '/contact' }}
  showBackground={true}
  eyebrow="Yellow Brolly Co"
/>
```

Note: Keep the `ctaSecondary` prop support in HeroSection.tsx — other pages might use it. Only remove from the homepage invocation.

- [ ] **Step 4: Delete Three.js hero files**

First verify no other files import from these paths:
```bash
grep -r "three/HeroBackground" src/ --include="*.tsx" --include="*.ts" --include="*.astro"
```

If only HeroSection.tsx imported them (and we already removed that import), delete:
- `src/components/react/three/HeroBackground.tsx`
- `src/components/three/HeroBackground.tsx`

- [ ] **Step 5: Commit**

```bash
git add src/components/react/HeroSection.tsx src/pages/index.astro
git rm src/components/react/three/HeroBackground.tsx src/components/three/HeroBackground.tsx 2>/dev/null; true
git commit -m "refactor: replace Three.js hero with CSS background, fix highlightedWord matching, simplify CTAs"
```

---

### Task 6: Homepage — Merge PMC Way + What Sets Us Apart into WhoWeAre

**Files:**
- Create: `src/components/astro/WhoWeAre.astro`
- Modify: `src/pages/index.astro`
- Delete (after): `src/components/astro/PMCWaySection.astro`
- Delete (after): `src/components/astro/WhatSetsUsApart.astro`

- [ ] **Step 1: Create WhoWeAre.astro**

This merges both sections into one asymmetric 2-column layout. Left side: PMC headline + featured differentiator as pull-quote + remaining differentiators as a compact list. Right side: brand illustration at hero scale (the winged-pencil image used large, not as an afterthought).

```astro
---
import Section from './Section.astro';
import { siteContent } from '../../data/content';

const { pmcSection, whatSetsUsApart } = siteContent.home;
const [featured, ...rest] = whatSetsUsApart.differentiators;
---

<Section background="cream" noPadding class="py-14 md:py-20 lg:py-28">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
    <!-- Left: content — takes 7 cols -->
    <div class="lg:col-span-7">
      <h2 class="scroll-fade-up text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6 leading-[1.1]">
        {pmcSection.headline}
      </h2>

      <!-- PMC description as accented pull-quote -->
      <div class="scroll-fade-up border-l-4 border-yellow-primary pl-5 mb-12">
        <p class="text-lg md:text-xl text-text-muted leading-relaxed">
          {pmcSection.description}
        </p>
      </div>

      <!-- Featured differentiator — large -->
      <div class="scroll-fade-up mb-10">
        <h3 class="text-2xl md:text-3xl font-display font-bold text-text-primary mb-3">
          {featured.title}
        </h3>
        <p class="text-base md:text-lg text-text-muted leading-relaxed max-w-xl">
          {featured.description}
        </p>
      </div>

      <!-- Remaining differentiators — compact horizontal list -->
      <div class="scroll-fade-up grid grid-cols-1 sm:grid-cols-3 gap-6">
        {rest.map((item) => (
          <div>
            <h4 class="text-base font-bold text-text-primary mb-1.5">
              {item.title}
            </h4>
            <p class="text-sm text-text-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    <!-- Right: brand illustration at scale — takes 5 cols -->
    <div class="lg:col-span-5 scroll-fade-up hidden lg:flex items-start justify-center pt-8">
      <img
        src="/images/brand/winged-pencil.png"
        alt=""
        aria-hidden="true"
        class="w-full max-w-md object-contain"
        loading="lazy"
      />
    </div>
  </div>
</Section>
```

- [ ] **Step 2: Update index.astro to use WhoWeAre**

In `src/pages/index.astro`:
1. Replace imports of `PMCWaySection` and `WhatSetsUsApart` with `WhoWeAre`:
   ```astro
   import WhoWeAre from '../components/astro/WhoWeAre.astro';
   ```
2. Replace `<PMCWaySection />` and `<WhatSetsUsApart />` with `<WhoWeAre />`

- [ ] **Step 3: Verify no other pages import the old components**

```bash
grep -r "PMCWaySection\|WhatSetsUsApart" src/ --include="*.astro" --include="*.tsx"
```

If only index.astro used them, delete:
- `src/components/astro/PMCWaySection.astro`
- `src/components/astro/WhatSetsUsApart.astro`

- [ ] **Step 4: Commit**

```bash
git add src/components/astro/WhoWeAre.astro src/pages/index.astro
git rm src/components/astro/PMCWaySection.astro src/components/astro/WhatSetsUsApart.astro
git commit -m "refactor: merge PMC Way + What Sets Us Apart into single WhoWeAre section"
```

---

### Task 7: Homepage — Remove BigTextCTA + Brand Archetype Callout

> **Ordering note:** This task and Task 6 both modify `index.astro`. Execute Task 6 first, then this task. Match content by text, not line numbers — line numbers shift after Task 6's edits.

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Remove BigTextCTA and Brand Archetype callout from index.astro**

In `src/pages/index.astro`:
1. Remove the `BigTextCTA` import (line 11): `import { BigTextCTA } from '../components/react/sections/CTASection.tsx';`
2. Remove the Brand Archetype callout section (lines 66-82, the entire `<section class="py-10 md:py-14 bg-cream">` block)
3. Remove the `BigTextCTA` component usage (lines 84-88)

Do NOT delete the `BigTextCTA` export from CTASection.tsx — it may be used elsewhere or useful later. Only remove from homepage.

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "refactor: remove BigTextCTA marquee and Brand Archetype callout from homepage"
```

---

### Task 8: Homepage — Redesign ServicesPreview as Editorial List

**Files:**
- Modify: `src/components/astro/ServicesPreview.astro`

- [ ] **Step 1: Rewrite ServicesPreview as editorial list layout**

Replace the entire component with a list layout: each service as a horizontal row with number + title + description, separated by dividers. No cards. No icons. No rounded-2xl. Uses a text link instead of a styled button.

```astro
---
import Section from './Section.astro';
import { siteContent } from '../../data/content';

const { servicesPreview } = siteContent.home;

const pillarAccentColors: Record<string, string> = {
  strategy: 'var(--color-accent-teal)',
  digital: 'var(--color-accent-amber)',
  brand: 'var(--color-accent-sage)',
  funding: 'var(--color-accent-mauve)',
  implementation: 'var(--color-yellow-primary)',
};
---

<Section background="cream" noPadding class="py-12 md:py-16 lg:py-24">
  <div class="scroll-fade-up mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-[1.1]">What We Do</h2>
    <a href="/services" class="text-yellow-text hover:text-yellow-hover transition-colors duration-300 font-medium text-sm inline-flex items-center gap-2 flex-shrink-0">
      Explore all services
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
    </a>
  </div>

  <div class="divide-y divide-light-border border-t border-light-border">
    {servicesPreview.map((service, index) => (
      <a href="/services" class="scroll-fade-up group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 hover:bg-sand/50 -mx-6 px-6 md:-mx-8 md:px-8 transition-colors duration-300 no-underline">
        <div class="md:col-span-1 flex items-baseline">
          <span
            class="text-sm font-bold tabular-nums"
            style={`color: ${pillarAccentColors[service.icon] || 'var(--color-yellow-primary)'}`}
          >
            0{index + 1}
          </span>
        </div>
        <div class="md:col-span-4">
          <h3 class="text-lg md:text-xl font-bold text-text-primary group-hover:text-yellow-text transition-colors duration-300 leading-tight">
            {service.title}
          </h3>
        </div>
        <div class="md:col-span-6">
          <p class="text-text-muted text-sm md:text-base leading-relaxed">{service.description}</p>
        </div>
        <div class="md:col-span-1 flex items-center justify-end">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-text-muted group-hover:text-yellow-text group-hover:translate-x-1 transition-all duration-300"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </div>
      </a>
    ))}
  </div>
</Section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/astro/ServicesPreview.astro
git commit -m "redesign: ServicesPreview as editorial list layout, remove card grid"
```

---

### Task 9: Homepage — Redesign WorkPreview with Featured Layout

**Files:**
- Modify: `src/components/astro/WorkPreview.astro`

- [ ] **Step 1: Rewrite WorkPreview with 1 featured + 2 small**

Replace the 3-identical-card grid with a layout where the first case study is large (spanning more columns/height) and the remaining two are stacked smaller beside it. Mix rounded corners — featured gets `rounded-xl`, small ones get `rounded-lg`.

```astro
---
import Section from './Section.astro';

const projects = [
  {
    title: 'Nonprofit Tech Stack Transformation',
    tag: 'Nonprofit',
    metric: '38%',
    metricLabel: 'time savings',
    image: '/images/photos/nonprofit-casestudy.jpg',
    imageAlt: 'Community workshop with diverse group seated in a semicircle',
    description: 'Full digital readiness assessment, tool consolidation, and staff training for a 45-person organization.',
  },
  {
    title: 'Creative Agency Security Overhaul',
    tag: 'Agency',
    metric: '100%',
    metricLabel: 'security compliance',
    image: '/images/photos/creativeagency-casestudy.jpg',
    imageAlt: 'Creative team reviewing work on a large mood wall in a studio',
    description: 'Unified file systems, security protocols, and streamlined client onboarding for a remote team.',
  },
  {
    title: 'Startup Ops & Scale',
    tag: 'Startup',
    metric: '50%',
    metricLabel: 'less operational noise',
    image: '/images/photos/startup-casestudy.jpg',
    imageAlt: 'Busy startup office with team members collaborating across desks',
    description: 'Workflow mapping, ownership clarity, and security foundations for a fast-growing team.',
  },
];

const [featured, ...rest] = projects;
---

<Section background="sand-dark" noPadding class="py-14 md:py-20 lg:py-28">
  <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
    <div>
      <h2 class="scroll-fade-up text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-[1.1]">
        Real results for real organizations
      </h2>
    </div>
    <a href="/case-studies" class="text-yellow-text hover:text-yellow-hover transition-colors duration-300 font-medium text-sm inline-flex items-center gap-2 flex-shrink-0">
      View all case studies
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
    </a>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Featured case study — large -->
    <a href="/case-studies" class="scroll-fade-up group block rounded-xl overflow-hidden bg-white transition-all duration-500 hover:-translate-y-1 lg:row-span-2">
      <div class="aspect-[16/10] lg:aspect-[4/3] overflow-hidden relative">
        <img
          src={featured.image}
          alt={featured.imageAlt}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div class="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
          <span class="text-yellow-primary font-display font-bold text-2xl">{featured.metric}</span>
          <span class="text-white/70 text-sm ml-2">{featured.metricLabel}</span>
        </div>
      </div>
      <div class="p-6 lg:p-8">
        <span class="inline-block px-2.5 py-0.5 text-xs font-medium bg-yellow-primary/10 text-yellow-text rounded-full mb-3">{featured.tag}</span>
        <h3 class="text-xl lg:text-2xl font-bold text-text-primary mb-3 group-hover:text-yellow-text transition-colors duration-300">{featured.title}</h3>
        <p class="text-text-muted leading-relaxed">{featured.description}</p>
      </div>
    </a>

    <!-- Smaller case studies stacked -->
    {rest.map((project) => (
      <a href="/case-studies" class="scroll-fade-up group block rounded-lg overflow-hidden bg-white transition-all duration-500 hover:-translate-y-1">
        <div class="grid grid-cols-1 sm:grid-cols-2">
          <div class="aspect-[16/10] sm:aspect-auto overflow-hidden relative">
            <img
              src={project.image}
              alt={project.imageAlt}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <div class="p-5 sm:p-6 flex flex-col justify-center">
            <span class="inline-block px-2.5 py-0.5 text-xs font-medium bg-yellow-primary/10 text-yellow-text rounded-full mb-2 self-start">{project.tag}</span>
            <h3 class="text-lg font-bold text-text-primary mb-2 group-hover:text-yellow-text transition-colors duration-300">{project.title}</h3>
            <p class="text-sm text-text-muted leading-relaxed mb-3">{project.description}</p>
            <div>
              <span class="text-yellow-primary font-display font-bold text-xl">{project.metric}</span>
              <span class="text-text-muted text-xs ml-1.5">{project.metricLabel}</span>
            </div>
          </div>
        </div>
      </a>
    ))}
  </div>
</Section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/astro/WorkPreview.astro
git commit -m "redesign: WorkPreview with featured + stacked small layout"
```

---

### Task 10: Homepage — ApproachPreview: Stagger Cards + Text Link

**Files:**
- Modify: `src/components/react/sections/ApproachPreview.tsx`

- [ ] **Step 1: Replace Button with text link, add visual stagger**

In `src/components/react/sections/ApproachPreview.tsx`:

1. Remove the `Button` and `ArrowRightIcon` imports (lines 5-6).
2. Replace the `<Button>` in the header area (line 59) with a plain text link:
   ```tsx
   <a href="/approach" className="text-yellow-text hover:text-yellow-hover transition-colors duration-300 font-medium text-sm inline-flex items-center gap-2 flex-shrink-0">
     How we work
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
   </a>
   ```

3. Add vertical offset to create visual stagger on the card grid. Change the grid container and cards:
   ```tsx
   <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
     {approachPreview.stages.map((stage, index) => (
       <div
         key={stage.name}
         className="preview-stage group relative overflow-hidden rounded-xl p-6 lg:p-8 transition-all duration-500 min-h-[240px]"
         style={{
           backgroundColor: `color-mix(in srgb, ${stepAccents[index]} 8%, #FFFFFF)`,
           transform: `translateY(${index * 24}px)`,
         }}
       >
   ```

4. Change `rounded-2xl` to `rounded-xl` on the card className (line 69).

- [ ] **Step 2: Remove unused eyebrow from section header**

Remove the "Our Approach" eyebrow span (line 54):
```tsx
<span className="text-yellow-text text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">Our Approach</span>
```

Keep just the h2 heading.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/sections/ApproachPreview.tsx
git commit -m "refactor: ApproachPreview uses text link, staggered cards, remove eyebrow"
```

---

### Task 11: Homepage — Simplify Bottom CTA

**Files:**
- Modify: `src/components/react/sections/CTASection.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Remove secondary CTA from bottom CTASection usage**

In `src/pages/index.astro`, simplify the bottom CTASection invocation to remove the secondary CTA:
```astro
<CTASection client:visible
  headline="Let's build the clarity and momentum your organization needs."
  primaryCta={{ label: 'Book a Discovery Call', to: '/contact' }}
/>
```

Remove the `secondaryCta` prop and shorten the headline.

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "refactor: simplify bottom CTA to single primary action"
```

---

### Task 12: Homepage — Vary Section Padding + Remove Eyebrows

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Review assembled page and remove eyebrow from WorkPreview**

In `src/components/astro/WorkPreview.astro`, the "Our Work" eyebrow was already removed in the Task 9 rewrite. Verify this.

- [ ] **Step 2: Adjust section padding by passing custom classes**

In the WhoWeAre component (Task 6), section padding is already set to `py-14 md:py-20 lg:py-28`.
In the ServicesPreview rewrite (Task 8), padding is `py-14 md:py-20 lg:py-28`.
In the WorkPreview rewrite (Task 9), padding is `py-14 md:py-20 lg:py-28`.

For visual variety, vary these in the components:
- WhoWeAre: `py-14 md:py-20 lg:py-28` (generous — breathing room)
- ServicesPreview: `py-12 md:py-16 lg:py-24` (tighter — list format doesn't need as much)
- WorkPreview: `py-14 md:py-20 lg:py-28` (generous — visual content)
- SocialProof: keep default `py-16 md:py-24 lg:py-32`
- ApproachPreview: uses Section default

- [ ] **Step 3: Commit**

```bash
git add src/components/astro/ServicesPreview.astro
git commit -m "refactor: vary section padding for visual rhythm"
```

---

### Task 13: Typography — Weight Variation in Global CSS

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Set body text to Poppins 300 (light) for more contrast with bold headings**

In `src/styles/global.css`, add a `font-weight` to the `body` rule:
```css
body {
  font-family: var(--font-body);
  font-weight: 300;
  font-size: 17px;
  ...
}
```

This creates more contrast between body text (300 light) and headings (700-800 bold/extrabold), making the type hierarchy more dramatic using only Poppins.

- [ ] **Step 2: Tighten heading letter-spacing for display sizes**

In `src/styles/global.css`, update h1 tracking to be tighter at display sizes:
```css
h1 {
  font-weight: var(--font-weight-extrabold);
  letter-spacing: -0.04em;
  line-height: 1.05;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "refactor: typography weight variation — light body vs extrabold headings"
```

---

### Task 14: SocialProof + Index Assembly — Final Rounding Cleanup

**Files:**
- Modify: `src/components/react/sections/SocialProof.tsx`
- Modify: `src/pages/index.astro` (final assembly verification)

- [ ] **Step 1: Update rounding in SocialProof**

In `src/components/react/sections/SocialProof.tsx`:
- Line 135: Change `rounded-2xl` to `rounded-xl` on the stat card
- Line 148: Change `rounded-2xl` to `rounded-lg` on secondary quote cards (different radius for variety)

- [ ] **Step 2: Verify final index.astro assembly**

The final `src/pages/index.astro` should have this structure (7 sections):
```astro
<Base ...>
  <HeroSection client:load ... />     <!-- 1. Hero -->
  <WhoWeAre />                        <!-- 2. Who We Are (merged) -->
  <ApproachPreview client:visible />   <!-- 3. Approach -->
  <ServicesPreview />                  <!-- 4. Services (editorial list) -->
  <WorkPreview />                      <!-- 5. Work (featured layout) -->
  <SocialProof client:visible />       <!-- 6. Social Proof -->
  <CTASection client:visible ... />    <!-- 7. Bottom CTA -->
</Base>
```

Verify the imports match this structure. Remove any lingering unused imports.

- [ ] **Step 3: Commit**

```bash
git add src/components/react/sections/SocialProof.tsx src/pages/index.astro
git commit -m "refactor: final rounding cleanup and index.astro assembly verification"
```

---

## Verification

After all tasks are complete:

1. Run `npm run dev` and visually verify:
   - Homepage loads with 7 sections (not 10)
   - No Three.js loading — hero is CSS-only
   - Buttons have fill-up hover but no corner brackets
   - Cards use varied rounding (xl and lg, not uniform 2xl)
   - ServicesPreview is a list, not a card grid
   - WorkPreview has 1 featured + 2 small
   - Only one "Book a Discovery Call" CTA in hero and bottom
   - No noise texture overlay on body
   - No scroll indicator in hero
   - Header dropdown uses light background when scrolled
   - Typography shows clear weight contrast (light body vs bold heads)

2. Check other pages briefly:
   - `/services` — buttons should have no corner brackets
   - `/about` — Card-based components should use rounded-xl
   - `/case-studies` — no dot pattern overlay
   - `/contact` — buttons clean

3. Run `npm run build` to ensure no broken imports from deleted files.
