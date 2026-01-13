import { siteContent } from '../data/content';
import { Section, SectionHeader } from '../components/common';
import { PageHero, ServicePillars, CTASection } from '../components/sections';

export function Services() {
  const { hero, cta } = siteContent.services;

  return (
    <>
      <PageHero
        headline={hero.headline}
        eyebrow="What We Do"
      />

      <Section background="black">
        <SectionHeader
          headline="Our Service Pillars"
          subhead="We offer a comprehensive suite of services designed to help organizations thrive in the digital age."
          eyebrow="Services"
        />
      </Section>

      <ServicePillars />

      <CTASection
        headline={cta}
        primaryCta={{ label: "Let's Build Together", to: '/contact' }}
      />
    </>
  );
}
