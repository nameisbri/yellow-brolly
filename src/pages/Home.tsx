import { siteContent } from '../data/content';
import {
  HeroSection,
  ApproachPreview,
  ServicesPreview,
  SocialProof,
  CTASection,
  PMCWaySection,
  WhatSetsUsApart,
  BigTextCTA,
} from '../components/sections';

export function Home() {
  const { hero } = siteContent.home;

  return (
    <>
      <HeroSection
        headline={hero.headline}
        highlightedWord="Human-first"
        subhead={hero.subhead}
        ctaPrimary={{ label: hero.ctaPrimary, to: '/contact' }}
        ctaSecondary={{ label: hero.ctaSecondary, to: '/services' }}
        showBackground={true}
        eyebrow="Yellow Brolly Co"
      />
      <PMCWaySection />
      <WhatSetsUsApart />
      <BigTextCTA
        text="STRATEGY • PEOPLE • SECURITY • TECHNOLOGY • STRATEGY • PEOPLE • SECURITY • TECHNOLOGY •"
        ctaLabel="See How We Work"
        ctaTo="/approach"
      />
      <ApproachPreview />
      <ServicesPreview />
      <SocialProof />
      <CTASection
        headline="Ready to make digital make sense?"
        subhead="Let's talk about what your organization actually needs."
        primaryCta={{ label: 'Book a Discovery Call', to: '/contact' }}
        secondaryCta={{ label: 'Learn About Our Approach', to: '/approach' }}
      />
    </>
  );
}
