import { siteContent } from '../data/content';
import { PageHero, ApproachTimeline, BigTextCTA } from '../components/sections';

export function Approach() {
  const { hero } = siteContent.approach;

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
    </>
  );
}
