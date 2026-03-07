import { siteContent } from '../data/content';
import { PageHero, CaseStudiesGrid, CTASection } from '../components/sections';

export function CaseStudies() {
  const { hero, cta } = siteContent.caseStudies;

  return (
    <>
      <PageHero
        headline={hero.headline}
        subhead="How it actually went."
        eyebrow="Case Studies"
      />

      <CaseStudiesGrid />

      <CTASection
        headline={cta}
        primaryCta={{ label: "Let's Talk About Your Goals", to: '/contact' }}
      />
    </>
  );
}
