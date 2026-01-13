import { siteContent } from '../data/content';
import { PageHero, ApproachTimeline, BigTextCTA, ProcessTransparency, CTASection } from '../components/sections';

export function Approach() {
  const { hero, cta } = siteContent.approach;

  return (
    <>
      <PageHero
        headline={hero.headline}
        subhead={hero.subhead}
        eyebrow="Our Process"
      />
      <BigTextCTA
        text="ASSESS • ALIGN • ACTIVATE • AMPLIFY • ASSESS • ALIGN • ACTIVATE • AMPLIFY •"
        ctaLabel="Start the Conversation"
        ctaTo="/contact"
      />
      <ApproachTimeline />
      <ProcessTransparency />
      <CTASection
        headline={cta}
        primaryCta={{ label: 'Book a Discovery Call', to: '/contact' }}
        secondaryCta={{ label: 'Learn More About Our Services', to: '/services' }}
      />
    </>
  );
}
