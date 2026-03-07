import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageHero, CTASection } from '../components/sections';
import { Section, CheckIcon } from '../components/common';
import { siteContent } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function WhyYellowBrolly() {
  const { whyYellowBrolly } = siteContent;
  const compareRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const positioningItems = [
    whyYellowBrolly.positioning.vsTraditionalConsultancies,
    whyYellowBrolly.positioning.vsFreelanceDevelopers,
    whyYellowBrolly.positioning.vsDIYTools,
    whyYellowBrolly.positioning.vsAITechHype,
  ];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Positioning items stagger in
      if (compareRef.current) {
        gsap.fromTo(
          '.compare-heading',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: compareRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          '.compare-item',
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: compareRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Good fit / not good fit
      if (fitRef.current) {
        gsap.fromTo(
          '.fit-good',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fitRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          '.fit-not',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fitRef.current,
              start: 'top 75%',
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
        headline={whyYellowBrolly.hero.headline}
        subhead={whyYellowBrolly.hero.subhead}
        eyebrow="Why Choose Us"
      />

      {/* Positioning comparisons — editorial layout with large numbering */}
      <Section background="dark">
        <div ref={compareRef} className="max-w-5xl">
          <h2 className="compare-heading text-3xl md:text-5xl font-display font-bold text-white mb-16">
            How We Compare
          </h2>

          <div className="space-y-0">
            {positioningItems.map((item, index) => (
              <div
                key={item.title}
                className={`compare-item flex gap-6 md:gap-10 py-10 md:py-14 ${
                  index < positioningItems.length - 1 ? 'border-b border-dark-border' : ''
                }`}
              >
                {/* Decorative anchor */}
                <span className="text-5xl md:text-7xl font-display font-bold text-dark-border leading-none flex-shrink-0 w-10 md:w-16 select-none" aria-hidden="true">
                  vs
                </span>

                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-yellow-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray leading-relaxed max-w-2xl">
                    {item.advantage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Good fit / Not good fit — asymmetric emphasis */}
      <Section background="black">
        <div ref={fitRef} className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 max-w-5xl">
          {/* Good fit — larger, more prominent */}
          <div className="fit-good md:col-span-3">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
              {whyYellowBrolly.goodFit.headline}
            </h2>
            <ul className="space-y-5">
              {whyYellowBrolly.goodFit.criteria.map((criterion, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckIcon
                    size={22}
                    className="text-yellow-primary flex-shrink-0 mt-0.5"
                  />
                  <span className="text-light-gray text-base md:text-lg leading-relaxed">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not good fit — quieter, receded */}
          <div className="fit-not md:col-span-2 md:pt-2">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray mb-6">
              {whyYellowBrolly.notGoodFit.headline}
            </h2>
            <ul className="space-y-4">
              {whyYellowBrolly.notGoodFit.criteria.map((criterion, index) => (
                <li key={index} className="flex items-start gap-3 text-gray">
                  <span className="text-dark-border flex-shrink-0 mt-0.5 text-lg">×</span>
                  <span className="text-sm leading-relaxed">{criterion}</span>
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
