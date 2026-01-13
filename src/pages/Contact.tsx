import { siteContent } from '../data/content';
import { PageHero, ContactForm } from '../components/sections';

export function Contact() {
  const { hero } = siteContent.contact;

  return (
    <>
      <PageHero
        headline={hero.headline}
        subhead={hero.subhead}
        eyebrow="Get in Touch"
      />
      <ContactForm />
    </>
  );
}
