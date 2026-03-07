import { siteContent } from '../data/content';
import { PageHero, ServicePillars, CTASection } from '../components/sections';

export function Services() {
  const { hero, cta } = siteContent.services;

  return (
    <>
      <PageHero
        headline={hero.headline}
        subhead="What we do for teams trying to get technology right."
        eyebrow="What We Do"
      />

      <ServicePillars />

      <CTASection
        headline={cta}
        primaryCta={{ label: "Let's Build Together", to: '/contact' }}
      />
    </>
  );
}
