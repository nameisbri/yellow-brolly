# YellowBrollyCo Website

A modern, technology-forward consulting firm website built with Astro, React islands, and TypeScript.

## Tech Stack

- **Framework**: Astro 5.18
- **Interactive Components**: React 19 (Astro islands)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4.1
- **Animations**: GSAP 3.14 with ScrollTrigger
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei
- **Blog**: Astro Content Collections with Markdown
- **SEO**: Per-page meta, JSON-LD structured data, sitemap
- **Forms**: Web3Forms API
- **Deployment**: Vercel (static output)
- **Fonts**: Coolvetica, Montserrat

## Project Structure

```
src/
├── components/
│   ├── astro/                # Astro components (Header, Footer, SEOHead, sections)
│   └── react/                # React interactive components
│       ├── sections/         # Page sections (Timeline, Services, CaseStudies, etc.)
│       └── three/            # 3D graphics (HeroBackground with particles, grid, glow)
├── content/
│   └── blog/                 # Markdown blog posts
├── content.config.ts         # Blog collection schema
├── data/
│   └── content.ts            # Centralized site content and copy
├── hooks/
│   └── useReducedMotion.ts   # Accessibility hook for prefers-reduced-motion
├── layouts/
│   ├── Base.astro            # Main site layout
│   └── BlogPost.astro        # Blog post layout
├── pages/                    # Astro file-based routing
│   ├── index.astro
│   ├── about.astro
│   ├── approach.astro
│   ├── services.astro
│   ├── case-studies.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── contact.astro
│   ├── faq.astro
│   └── why-yellowbrolly.astro
└── styles/
    └── global.css            # Tailwind imports and custom theme
```

## Pages

- **Home**: Hero with 3D particle background, values, approach preview, services preview, social proof
- **About**: Mission, story, values grid, team section, PMC (People Matter Culture) framework
- **Approach**: 4-stage methodology timeline (Assess > Align > Activate > Amplify)
- **Services**: 4 service pillars — Deploy Tools, Brand & Culture, Security, AI
- **Case Studies**: Client success stories with metrics
- **Blog**: Markdown-powered articles with category filtering
- **Contact**: Contact form (Web3Forms) with Calendly integration
- **FAQ**: Accordion-style frequently asked questions
- **Why YellowBrolly**: Positioning and differentiators

## Key Features

### Design
- Dark theme with brand yellow (#F7B32B) accent
- Animated hero section with interactive 3D particle background
- GSAP scroll animations with CSS scroll-driven animation fallbacks
- Fully responsive design
- Accessibility-first with reduced motion support

### Architecture
- Astro static site with React islands for interactive components
- Content Collections for type-safe blog management
- Per-page SEO with JSON-LD structured data (Organization, WebSite schemas)
- Automatic sitemap generation
- Code splitting for Three.js and GSAP vendor bundles

### Components
- **Floating CTA**: Persistent call-to-action widget
- **Text Animations**: Slide-up reveals, character-by-character animations
- **3D Hero Background**: Three.js particles, grid, and mouse-following glow
- **FAQ Accordion**: Expandable question/answer sections
- **Mobile Menu**: Responsive navigation

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

# Run Astro checks
npm run check
```

### Environment Variables

Copy `.env.example` and set the required values:

```
PUBLIC_WEB3FORMS_KEY=your_key_here
```

## Brand

YellowBrollyCo is a technology consulting firm focused on "Technology-forward strategy. Human-first results." — helping nonprofits, creative agencies, and mission-driven organizations (10-100 people) with:

- Digital strategy and readiness assessments
- Brand and culture transformation
- Cybersecurity and digital hygiene
- AI integration and workflow automation
- Technology consulting and implementation
