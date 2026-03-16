# SEO Action Plan: Yellow Brolly Co

**Date:** 2026-03-07
**Current Score: 16/100 (Critical)**
**Target Score: 70+ (Good)**

---

## Phase 1: Immediate Blockers (Week 1-2)

These must be fixed first — without SSR, no other SEO work matters.

### 1. Implement Server-Side Rendering or Static Site Generation
- **Priority:** Critical | **Impact:** Extreme | **Effort:** High
- **Why:** Crawlers see 6 words on the entire site. All content, headings, links, and images are invisible.
- **Options (choose one):**
  - **Option A (Recommended): Migrate to Next.js** — best React SSR/SSG ecosystem, built-in `<Head>`, image optimization, sitemap generation, Vercel-native
  - **Option B: Migrate to Astro** — excellent for content-heavy sites, supports React components as islands
  - **Option C: Add vite-plugin-ssr or vite-ssg** — lowest migration effort, keeps current Vite setup
- **Acceptance criteria:** `curl https://yellow-brolly.vercel.app/` returns full HTML with headings, text content, and links

### 2. Add Per-Page Meta Tags
- **Priority:** Critical | **Impact:** High | **Effort:** Low (once SSR is in place)
- **Action:** Each route needs unique `<title>` and `<meta name="description">`
- **Targets:**

| Page | Title (max 60 chars) | Meta Description (max 155 chars) |
|------|------|------|
| / | Technology Consulting for Nonprofits & Agencies \| YellowBrollyCo | Technology consulting that fits your culture. We help nonprofits and agencies adopt AI, improve cybersecurity, and build tech stacks that work. |
| /about | About Us — Our Story & Team \| YellowBrollyCo | Meet the YellowBrolly team. 30+ years combined in brand strategy, cybersecurity, and nonprofit technology consulting. |
| /services | What We Do — Tech Strategy & Security \| YellowBrollyCo | Digital readiness, cybersecurity, AI integration, and brand-aligned tech stacks for nonprofits and agencies. |
| /approach | The YB Approach — From Messy to Manageable \| YellowBrollyCo | Our 4-stage process: Assess, Align, Activate, Amplify. We align tools to your strategy, culture, and people. |
| /contact | Contact Us — Book a Discovery Call \| YellowBrollyCo | Tell us about your tech and strategy goals. Average response time: 4 hours. |
| /faq | FAQ — Technology Consulting Questions \| YellowBrollyCo | Common questions about working with YellowBrolly: pricing, timelines, cybersecurity, AI adoption, and more. |
| /why-yellowbrolly | Why YellowBrolly — When to Hire Us \| YellowBrollyCo | Built for teams of 10-100. See how we compare to traditional consultancies, freelancers, and DIY tools. |
| /case-studies | Case Studies — Real Results \| YellowBrollyCo | Real results from nonprofits, agencies, and startups. 38% time savings, 100% security compliance, unified platforms. |
| /blog | Insights & Ideas \| YellowBrollyCo | Thoughts on technology, culture, and people-first strategy from the YellowBrolly team. |

### 3. Create robots.txt
- **Priority:** Critical | **Impact:** Medium | **Effort:** Low
- **Action:** Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yellow-brolly.vercel.app/sitemap.xml
```

### 4. Create sitemap.xml
- **Priority:** Critical | **Impact:** Medium | **Effort:** Low
- **Action:** Create `public/sitemap.xml` (or generate dynamically with SSR framework):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yellow-brolly.vercel.app/</loc><priority>1.0</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/about</loc><priority>0.8</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/services</loc><priority>0.9</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/approach</loc><priority>0.7</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/contact</loc><priority>0.8</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/case-studies</loc><priority>0.7</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/faq</loc><priority>0.6</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/why-yellowbrolly</loc><priority>0.7</priority></url>
  <url><loc>https://yellow-brolly.vercel.app/blog</loc><priority>0.5</priority></url>
</urlset>
```

### 5. Add Canonical URLs
- **Priority:** Critical | **Impact:** Medium | **Effort:** Low
- **Action:** Add `<link rel="canonical" href="https://yellow-brolly.vercel.app{path}">` to each page

---

## Phase 2: Quick Wins (Week 2-3)

### 6. Add Open Graph and Twitter Card Meta Tags
- **Priority:** High | **Impact:** High (social sharing/CTR) | **Effort:** Low
- **Action:** Add to each page:
```html
<meta property="og:title" content="{page title}">
<meta property="og:description" content="{page description}">
<meta property="og:image" content="https://yellow-brolly.vercel.app/og-image.jpg">
<meta property="og:url" content="https://yellow-brolly.vercel.app{path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Yellow Brolly Co">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{page title}">
<meta name="twitter:description" content="{page description}">
<meta name="twitter:image" content="https://yellow-brolly.vercel.app/og-image.jpg">
```
- **Also:** Create a branded OG image (1200x630px) for social previews

### 7. Add JSON-LD Structured Data
- **Priority:** High | **Impact:** High (rich results) | **Effort:** Medium
- **Action:** Add to homepage:
```json
[
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
]
```
- **Add BreadcrumbList** to inner pages
- **Do NOT** add FAQPage schema (restricted to government/healthcare since Aug 2023)

### 8. Add Security Headers via Vercel Config
- **Priority:** Medium | **Impact:** Medium (trust signals) | **Effort:** Low
- **Action:** Create or update `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com; font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com; img-src 'self' data:; connect-src 'self' https://api.web3forms.com" }
      ]
    }
  ]
}
```

### 9. Fix Placeholder Content
- **Priority:** Medium | **Impact:** Medium (trust/E-E-A-T) | **Effort:** Low
- **Action:**
  - Replace "$X,XXX" pricing with real ranges or remove
  - Either build out blog post pages or remove the blog section
  - Add /privacy and /terms pages (or remove footer links)

---

## Phase 3: Strategic Improvements (Week 3-6)

### 10. Optimize Images
- **Priority:** Medium | **Impact:** Medium (CWV/CLS) | **Effort:** Medium
- **Action:**
  - Convert team photos to WebP format
  - Add explicit `width` and `height` to all `<img>` tags
  - Create favicon.ico, apple-touch-icon (180x180), and web manifest
  - Add a branded OG share image

### 11. Create llms.txt for AI Search Readiness
- **Priority:** Low | **Impact:** Low-Medium (future-proofing) | **Effort:** Low
- **Action:** Create `public/llms.txt`:
```
# Yellow Brolly Co

> Technology-forward strategy. Human-first results.

Yellow Brolly Co is a technology consulting firm helping nonprofits, agencies, and mission-driven organizations adopt AI, cybersecurity, and digital tools that fit their culture.

## Pages

- [Home](https://yellow-brolly.vercel.app/)
- [About Us](https://yellow-brolly.vercel.app/about)
- [Services](https://yellow-brolly.vercel.app/services)
- [Our Approach](https://yellow-brolly.vercel.app/approach)
- [Case Studies](https://yellow-brolly.vercel.app/case-studies)
- [FAQ](https://yellow-brolly.vercel.app/faq)
- [Contact](https://yellow-brolly.vercel.app/contact)
```

### 12. Improve Internal Linking
- **Priority:** Medium | **Impact:** Medium | **Effort:** Low
- **Action:** Once SSR is in place, ensure:
  - Every page has 3-5+ contextual internal links
  - Blog posts link to related service pages
  - Service pages cross-link to case studies
  - FAQ answers link to relevant service/approach pages

### 13. Reduce Three.js Bundle Impact
- **Priority:** Low | **Impact:** Medium (mobile performance) | **Effort:** Medium
- **Options:**
  - Load Three.js hero only on desktop (use CSS gradient fallback on mobile)
  - Replace with a lighter WebGL library or CSS-only animation
  - Ensure Three.js chunk is deferred and doesn't block initial paint

---

## Phase 4: Maintenance (Ongoing)

### 14. Set Up Google Search Console
- **Priority:** High | **Impact:** Monitoring | **Effort:** Low
- Verify ownership, submit sitemap, monitor indexing

### 15. Monitor Core Web Vitals
- **Priority:** Medium | **Impact:** Monitoring | **Effort:** Low
- Set up CrUX monitoring once real traffic flows

### 16. Create Real Blog Content
- **Priority:** Medium | **Impact:** High (long-term organic) | **Effort:** High
- Publish 1-2 articles/month targeting service-related keywords
- Topics from existing expertise: tech stack audits, AI adoption, cybersecurity for nonprofits

---

## Expected Impact

| Phase | Estimated Score After |
|-------|----------------------|
| Current | 16 (Critical) |
| After Phase 1 (SSR + basics) | 45-55 (Needs Improvement) |
| After Phase 2 (Schema + OG + headers) | 65-75 (Good) |
| After Phase 3 (Images + AI + linking) | 75-85 (Good) |
| After Phase 4 (Content + monitoring) | 85+ (Excellent) |

---

## Summary

The single most impactful change is **migrating to SSR/SSG**. Everything else builds on that foundation. Without server-rendered HTML, the site is effectively invisible to search engines. Phase 1 alone would transform the score from Critical to Needs Improvement. Phases 2-3 would bring it into Good territory.
