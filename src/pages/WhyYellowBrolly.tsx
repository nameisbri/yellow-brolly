import { PageHero, CTASection } from '../components/sections';
import { Section, SectionHeader, Card, CheckIcon } from '../components/common';
import { siteContent } from '../data/content';

export function WhyYellowBrolly() {
  const { whyYellowBrolly } = siteContent;

  return (
    <>
      <PageHero
        headline={whyYellowBrolly.hero.headline}
        subhead={whyYellowBrolly.hero.subhead}
        eyebrow="Why Choose Us"
      />

      <Section background="dark">
        <SectionHeader
          headline="How We Compare"
          subhead="Understanding when to hire us—and when other options might be better."
          eyebrow="Positioning"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-3">
              {whyYellowBrolly.positioning.vsTraditionalConsultancies.title}
            </h3>
            <p className="text-gray leading-relaxed">
              {whyYellowBrolly.positioning.vsTraditionalConsultancies.advantage}
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-3">
              {whyYellowBrolly.positioning.vsFreelanceDevelopers.title}
            </h3>
            <p className="text-gray leading-relaxed">
              {whyYellowBrolly.positioning.vsFreelanceDevelopers.advantage}
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-3">
              {whyYellowBrolly.positioning.vsDIYTools.title}
            </h3>
            <p className="text-gray leading-relaxed">
              {whyYellowBrolly.positioning.vsDIYTools.advantage}
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-display font-bold text-white mb-3">
              {whyYellowBrolly.positioning.vsAITechHype.title}
            </h3>
            <p className="text-gray leading-relaxed">
              {whyYellowBrolly.positioning.vsAITechHype.advantage}
            </p>
          </Card>
        </div>
      </Section>

      <Section background="black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              {whyYellowBrolly.goodFit.headline}
            </h2>
            <ul className="space-y-3">
              {whyYellowBrolly.goodFit.criteria.map((criterion, index) => (
                <li key={index} className="flex items-start gap-3 text-gray">
                  <CheckIcon
                    size={20}
                    className="text-yellow-primary flex-shrink-0 mt-0.5"
                  />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              {whyYellowBrolly.notGoodFit.headline}
            </h2>
            <ul className="space-y-3">
              {whyYellowBrolly.notGoodFit.criteria.map((criterion, index) => (
                <li key={index} className="flex items-start gap-3 text-gray">
                  <span className="text-red-400 flex-shrink-0 mt-0.5">×</span>
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTASection
        headline="Ready to see if we're a good fit?"
        subhead="Let's have an honest conversation about your needs."
        primaryCta={{ label: 'Book a Discovery Call', to: '/contact' }}
        secondaryCta={{ label: 'Learn More About Our Approach', to: '/approach' }}
      />
    </>
  );
}
