import { siteContent } from '../data/content';
import {
  HeroSection,
  ApproachPreview,
  ServicesPreview,
  SocialProof,
  CTASection,
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
        eyebrow="YellowBrollyCo"
        lazyBackground={true}
      />
      <ApproachPreview />
      <ServicesPreview />
      <SocialProof />
      <CTASection
        headline="Ready to make digital make sense?"
        subhead="Let's discuss how we can help your organization thrive."
        primaryCta={{ label: 'Book a Discovery Call', to: '/contact' }}
        secondaryCta={{ label: 'Learn About Our Approach', to: '/approach' }}
      />
    </>
  );
}
