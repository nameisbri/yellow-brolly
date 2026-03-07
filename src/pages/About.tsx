import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/content';
import { Section } from '../components/common';
import {
  PageHero,
  ValuesGrid,
  TeamSection,
  CTASection,
} from '../components/sections';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { hero, story, pmcWay, cta } = siteContent.about;
  const storyRef = useRef<HTMLDivElement>(null);
  const pmcRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (pmcRef.current) {
        gsap.fromTo(
          pmcRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pmcRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <PageHero
        headline={hero.headline}
        subhead={hero.mission}
        eyebrow="About Us"
      />

      <Section background="dark">
        <div ref={storyRef} className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            {story.headline}
          </h2>
          <p className="text-lg text-gray leading-relaxed">
            {story.content}
          </p>
        </div>
      </Section>

      <ValuesGrid />

      <Section background="black">
        <div ref={pmcRef} className="max-w-3xl">
          {pmcWay.subhead && (
            <span className="inline-block px-2 py-1 text-sm font-medium bg-dark-border text-light-gray mb-4 tracking-wider uppercase">
              {pmcWay.subhead}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-5">
            {pmcWay.headline}
          </h2>
          <p className="text-lg text-gray leading-relaxed border-l-4 border-yellow-primary pl-4">{pmcWay.description}</p>
        </div>
      </Section>

      <TeamSection />

      <CTASection
        headline={cta}
        primaryCta={{ label: "Let's Connect", to: '/contact' }}
      />
    </>
  );
}
