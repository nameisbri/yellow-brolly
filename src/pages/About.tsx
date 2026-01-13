import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../data/content';
import { Section, SectionHeader } from '../components/common';
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
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
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
        <div ref={storyRef} className="max-w-3xl mx-auto text-center">
          <SectionHeader headline={story.headline} eyebrow="Our Story" />
          <p className="text-lg text-gray leading-relaxed">
            {story.content}
          </p>
        </div>
      </Section>

      <ValuesGrid />

      <Section background="black">
        <div ref={pmcRef} className="max-w-3xl mx-auto text-center">
          <div className="bg-dark-elevated rounded-2xl p-10 md:p-14 border border-dark-border relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-primary/10 rounded-full blur-3xl" />

            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-5 relative">
              {pmcWay.headline}
            </h2>
            <p className="text-lg text-gray leading-relaxed relative">{pmcWay.description}</p>
          </div>
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
