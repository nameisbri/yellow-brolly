# SEO Audit Report: Yellow Brolly Co

**URL:** https://yellow-brolly.vercel.app/
**Date:** 2026-03-07
**Scope:** Single-page full audit (SPA source + live site)
**Overall Score: 16/100 — Critical**

---

## A) Audit Summary

Yellow Brolly Co is a React SPA (Vite + React Router + Tailwind) with **no server-side rendering**. This means search engine crawlers see a near-empty HTML shell (6 words of visible text) instead of the rich content defined in the source code. This single issue cascades into failures across every SEO category.

### Top 3 Issues (Blockers)
1. **No SSR/SSG** — Crawlers see an empty page; all content is client-rendered JavaScript
2. **No robots.txt or sitemap.xml** — Search engines have no crawl guidance
3. **No structured data, OG tags, or canonical URLs** — Zero rich result eligibility and no social sharing previews

### Top 3 Opportunities
1. **Implement SSR/SSG** (Next.js migration or Vite SSG plugin) — would immediately unlock all content for indexing
2. **Add JSON-LD schema** (Organization, WebSite, BreadcrumbList) — enables rich results
3. **Add per-page meta tags and OG/Twitter cards** — improves CTR from search and social

---

## B) Findings Table

### Technical SEO (Score: 5/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Critical | Confirmed | Site is a client-side SPA — crawlers see no content | `parse_html.py` returned: `word_count: 6`, `h1: []`, `links: { internal: [], external: [] }` | Migrate to SSR/SSG (Next.js, Astro, or vite-plugin-ssr) |
| Critical | Confirmed | No robots.txt | `robots_checker.py`: HTTP 404 | Create `public/robots.txt` with sitemap reference |
| Critical | Confirmed | No sitemap.xml | `curl -sI sitemap.xml`: HTTP 404 | Generate XML sitemap with all routes |
| Critical | Confirmed | No canonical URL on any page | `parse_html.py`: `canonical: null` | Add `<link rel="canonical">` per page |
| Warning | Confirmed | Same HTML title/meta for all routes | SPA serves identical `index.html` for every path | Implement per-route `<title>` and `<meta name="description">` via SSR or react-helmet |
| Pass | Confirmed | HTTPS enabled | `security_headers.py`: HTTPS: Yes | — |
| Pass | Confirmed | HSTS header present | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` | — |
| Pass | Confirmed | Clean URL structure, no redirect chains | `redirect_checker.py`: 0 hops, 144ms | — |
| Pass | Confirmed | `lang="en"` attribute on `<html>` | `index.html` line 2 | — |
| Pass | Confirmed | Viewport meta tag present | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | — |

**Score justification:** Score of 5 reflects HTTPS, HSTS, and clean URLs (+), heavily penalized by no SSR (Critical, -15), no robots.txt (Critical, -15), no sitemap (Critical, -15), and no canonical (Critical, -15). Penalty capped at -50.

### Content Quality (Score: 18/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Critical | Confirmed | Zero indexable content — crawlers see 6 words | `readability.py`: word_count=6, all from `<noscript>` or inline | SSR/SSG to render content server-side |
| Warning | Confirmed | Single meta description serves all pages | Only one `<meta name="description">` in `index.html` | Per-page meta descriptions via SSR |
| Warning | Confirmed | Placeholder pricing text "$X,XXX" on services and FAQ pages | `content.ts` lines 299, 317, 335, 544 | Replace with real pricing or remove |
| Warning | Confirmed | Blog posts are placeholder stubs with no actual content pages | `content.ts`: 3 posts with excerpts only, no routes for individual posts | Create real blog content or remove blog section |
| Warning | Likely | Missing pages linked in footer — Privacy Policy, Terms of Service | Footer links to `/privacy` and `/terms`; no routes defined in `App.tsx` | Add pages or remove dead links |
| Pass | Confirmed | Good meta description (157 chars) | `"Technology consulting that fits your culture..."` | — |
| Pass | Confirmed | Clear, unique brand messaging in source code | Content in `content.ts` is well-written, human-sounding | — |

**Score justification:** Score of 18 reflects strong source content and good meta description (+), penalized by zero indexable content (Critical, -15) and multiple placeholder/incomplete content issues (Warning x4, -20).

### On-Page SEO (Score: 15/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Critical | Confirmed | No H1 tags visible to crawlers | `parse_html.py`: `h1: []` | SSR to render heading hierarchy server-side |
| Critical | Confirmed | No internal links visible to crawlers | `internal_links.py`: "Total internal links: 0" | SSR to render navigation and content links |
| Warning | Confirmed | Title tag is good but identical across all routes | `<title>Technology Consulting for Nonprofits & Agencies \| YellowBrollyCo</title>` — same for /about, /services, etc. | Unique titles per page |
| Pass | Confirmed | Proper H1 usage in React components | `HeroSection.tsx` line 113: `<h1>` with headline | — |
| Pass | Confirmed | Semantic heading hierarchy in source | H1 > H2 > H3 structure across pages | — |

**Score justification:** Score of 15 reflects good semantic HTML in source code (+), penalized by no crawlable headings (Critical, -15) and no crawlable internal links (Critical, -15).

### Schema / Structured Data (Score: 0/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Critical | Confirmed | No JSON-LD structured data | `parse_html.py`: `schema: []` | Add Organization, WebSite, and BreadcrumbList schema |
| Warning | Confirmed | No Organization schema | No `@type: Organization` found | Add JSON-LD with name, URL, logo, founders, contact |
| Warning | Confirmed | No WebSite schema with SearchAction | — | Add WebSite schema |
| Warning | Confirmed | No BreadcrumbList schema | — | Add breadcrumbs for navigation hierarchy |
| Info | N/A | FAQ page should NOT use FAQPage schema | FAQPage restricted to government/healthcare (Aug 2023) | Use regular Q&A content with strong headings instead |

**Score justification:** Score of 0 — no structured data found. No positive signals, one Critical finding (-15).

### Performance / Core Web Vitals (Score: 65/100, Confidence: Low)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Info | Hypothesis | CWV data unavailable — PageSpeed API rate limited | `pagespeed.py` returned rate limit error | Retry later or use Chrome DevTools Lighthouse |
| Pass | Confirmed | Code splitting implemented | `vite.config.ts`: manual chunks for three-vendor, gsap-vendor, react-vendor | — |
| Pass | Confirmed | Lazy loading for routes and heavy components | `App.tsx`: all pages use `lazy()`, Three.js background lazy-loaded | — |
| Pass | Confirmed | Font preloading configured | `index.html`: preconnect + preload for Coolvetica and Montserrat | — |
| Pass | Confirmed | Modern build target | `vite.config.ts`: `target: 'es2020'` | — |
| Warning | Likely | Large Three.js dependency for hero background | Three.js + @react-three/fiber ~500KB+ | Consider replacing with CSS/canvas animation or loading only on desktop |
| Warning | Likely | Critical CSS in index.html is minimal | Only basic styles inlined; main CSS loaded via module | Inline more above-the-fold critical CSS |

**Score justification:** Score of 65 reflects strong code splitting, lazy loading, and preloading (+), penalized by large Three.js bundle (Warning, -5) and minimal critical CSS (Warning, -5). Confidence is Low — no actual CWV measurements available.

### Image Optimization (Score: 23/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Warning | Confirmed | Only 4 images total in public directory | `public/images/team/`: aimee.jpg, abbey.png, jon.png, kevin.png | Add OG images, favicon variants, and blog images |
| Warning | Confirmed | Images lack explicit width/height attributes | `TeamSection.tsx` line 98-103: `<img>` without width/height | Add dimensions to prevent CLS |
| Warning | Confirmed | No next-gen image formats (WebP/AVIF) | Team images are .jpg/.png | Convert to WebP with fallback |
| Warning | Confirmed | No favicon variants beyond SVG | `public/`: only `umbrella.svg` | Add favicon.ico, apple-touch-icon, manifest icons |
| Pass | Confirmed | Alt text present on team images | `TeamSection.tsx` line 100: `alt={member.name}` | — |
| Pass | Confirmed | Lazy loading on team images | `TeamSection.tsx` line 102: `loading="lazy"` | — |

**Score justification:** Score of 23 reflects good alt text and lazy loading (+), penalized by no next-gen formats (Warning, -5), no dimensions (Warning, -5), minimal image assets (Warning, -5), and no favicon variants (Warning, -5).

### AI Search Readiness / GEO (Score: 0/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Critical | Confirmed | No llms.txt | `llms_txt_checker.py`: HTTP 404 | Create `/llms.txt` with site description and key pages |
| Warning | Confirmed | No robots.txt directives for AI crawlers | All AI bots allowed by default (no robots.txt) | Create robots.txt with intentional AI crawler rules |
| Warning | Confirmed | Content invisible to AI crawlers | SPA renders nothing without JavaScript | SSR/SSG to make content accessible |
| Warning | Confirmed | No structured data for AI context | No JSON-LD | Add schema markup for entity understanding |

**Score justification:** Score of 0 — no AI search readiness signals found.

### Security Headers (Score: 45/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Warning | Confirmed | Missing Content-Security-Policy | `security_headers.py`: not found | Add CSP header in Vercel config |
| Warning | Confirmed | Missing X-Frame-Options | Not found | Add `X-Frame-Options: SAMEORIGIN` |
| Warning | Confirmed | Missing X-Content-Type-Options | Not found | Add `X-Content-Type-Options: nosniff` |
| Warning | Confirmed | Missing Referrer-Policy | Not found | Add `Referrer-Policy: strict-origin-when-cross-origin` |
| Warning | Confirmed | Missing Permissions-Policy | Not found | Add `Permissions-Policy: camera=(), microphone=(), geolocation=()` |
| Pass | Confirmed | HSTS present with preload | `max-age=63072000; includeSubDomains; preload` | — |
| Pass | Confirmed | HTTPS enforced | HTTPS active | — |

### Social Sharing (Score: 0/100)

| Severity | Confidence | Finding | Evidence | Fix |
|----------|-----------|---------|----------|-----|
| Critical | Confirmed | No Open Graph tags | `social_meta.py`: 0/7 OG tags found | Add og:title, og:description, og:image, og:url, og:type |
| Critical | Confirmed | No Twitter Card tags | `social_meta.py`: 0/6 Twitter tags found | Add twitter:card, twitter:title, twitter:description, twitter:image |

---

## C) Overall Score Breakdown

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 5 | 1.3 |
| Content Quality | 20% | 18 | 3.6 |
| On-Page SEO | 15% | 15 | 2.3 |
| Schema / Structured Data | 15% | 0 | 0.0 |
| Performance (CWV) | 10% | 65* | 6.5 |
| Image Optimization | 10% | 23 | 2.3 |
| AI Search Readiness (GEO) | 5% | 0 | 0.0 |
| **Overall** | **100%** | | **16.0** |

*Performance score confidence: Low (no CWV data)

**Rating: Critical (0-29)**

---

## D) Unknowns and Follow-ups

| Item | Status | How to Verify |
|------|--------|---------------|
| Core Web Vitals (LCP, INP, CLS) | Unknown — API rate limited | Run `pagespeed.py` later or use Chrome DevTools Lighthouse |
| Actual Google indexing status | Unknown | Check Google Search Console |
| Mobile rendering quality | Hypothesis | Run Playwright screenshot capture across breakpoints |
| Real-world crawl behavior | Unknown | Submit URL to Google Search Console URL Inspection tool |
| Font loading performance impact | Hypothesis | Measure with WebPageTest or Lighthouse |
| Three.js bundle size impact on mobile | Hypothesis | Profile with Chrome DevTools Performance tab |

---

## Environment Limitations

- PageSpeed Insights API was rate-limited during this audit. CWV scores are estimated from source code analysis only.
- `broken_links.py` script encountered a runtime error; broken link detection was not completed.
- Visual analysis (Playwright screenshots) was not available in this environment.
