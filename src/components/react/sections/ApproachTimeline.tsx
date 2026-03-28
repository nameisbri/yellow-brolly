import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const stepImages = [
  '/images/brand/magnifying-glass.webp',
  '/images/brand/creative-thinker.webp',
  '/images/brand/trophy-winner.webp',
];

const stepAccents = ['#6B9E9E', '#C4956A', '#F7B32B'];

interface ApproachTimelineProps {
  sectionHeading?: string;
  closingStatement?: string;
}

export default function ApproachTimeline({ sectionHeading, closingStatement }: ApproachTimelineProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { stages, closing } = siteContent.approach;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Each step animates independently as it enters viewport
      const steps = gsap.utils.toArray<HTMLElement>('.approach-step');
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Closing statement enters with weight
      gsap.fromTo(
        '.closing-statement',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.closing-statement',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="sand">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Section header — left-aligned, not centered */}
        <div className="mb-24 md:mb-32 max-w-2xl">
          <span className="text-yellow-text text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-[1.1]">
            {sectionHeading || 'Three steps. One continuous cycle.'}
          </h2>
        </div>

        {/* Steps — editorial alternating layout, no cards */}
        <div className="space-y-24 md:space-y-40">
          {stages.map((stage, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={stage.name}
                className="approach-step grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center"
              >
                {/* Text side */}
                <div className={`md:col-span-7 ${!isEven ? 'md:order-2' : ''}`}>
                  <span
                    className="text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] font-display font-extrabold leading-none block opacity-15 pointer-events-none select-none"
                    style={{ color: stepAccents[index] }}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary -mt-5 md:-mt-8 mb-3">
                    {stage.name}
                  </h3>
                  <p
                    className="text-sm font-semibold tracking-[0.15em] uppercase mb-5"
                    style={{ color: stepAccents[index] }}
                  >
                    {stage.tagline}
                  </p>
                  <p className="text-text-secondary leading-relaxed text-lg max-w-xl">
                    {stage.description}
                  </p>
                </div>

                {/* Illustration side */}
                <div
                  className={`md:col-span-5 ${!isEven ? 'md:order-1' : ''} flex ${
                    isEven ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  <img
                    src={stepImages[index]}
                    alt=""
                    className="w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain"
                    loading="lazy"
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing statement — the dominant visual moment */}
        <div className="closing-statement mt-32 md:mt-44 pt-12 md:pt-16">
          <div className="w-16 h-1 bg-yellow-primary mb-8" />
          <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-text-primary font-display font-bold leading-[1.15] max-w-4xl">
            {closingStatement || closing}
          </p>
        </div>
      </div>
    </Section>
  );
}
