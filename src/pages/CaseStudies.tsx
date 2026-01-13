import { siteContent } from '../data/content';
import { Section, SectionHeader } from '../components/common';
import { PageHero, CaseStudiesGrid, CTASection } from '../components/sections';

export function CaseStudies() {
  const { hero, cta } = siteContent.caseStudies;

  return (
    <>
      <PageHero
        headline={hero.headline}
        subhead="Real stories of transformation and impact."
        eyebrow="Case Studies"
      />

      <Section background="black">
        <SectionHeader
          headline="Featured Work"
          subhead="See how we've helped organizations navigate digital transformation."
          eyebrow="Our Impact"
        />
      </Section>

      <CaseStudiesGrid />

      <CTASection
        headline={cta}
        primaryCta={{ label: "Let's Talk About Your Goals", to: '/contact' }}
      />
    </>
  );
}
