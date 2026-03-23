import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const stepImages = [
  '/images/brand/magnifying-glass.webp',
  '/images/brand/creative-thinker.webp',
  '/images/brand/trophy-winner.webp',
];

const stepAccents = ['#6B9E9E', '#C4956A', '#F2BD4E'];

export default function ApproachPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { approachPreview } = siteContent.home;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Draw the connecting line
      gsap.fromTo(
        '.approach-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger the steps in
      gsap.fromTo(
        '.approach-step',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Headline reveal
      gsap.fromTo(
        '.approach-headline',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="grain-overlay" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        {/* Header row */}
        <div className="approach-headline flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28 lg:mb-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.05] max-w-3xl">
            {approachPreview.headline}
          </h2>
          <a
            href="/approach"
            className="text-yellow-primary hover:text-yellow-hover transition-colors duration-300 font-medium text-sm inline-flex items-center gap-2 flex-shrink-0 group"
          >
            How we work
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Connecting line — spans the full width behind the steps */}
        <div className="hidden md:block absolute left-[8%] right-[8%] top-[58%] -translate-y-1/2 z-0">
          <div
            className="approach-line h-px origin-left"
            style={{
              background: 'linear-gradient(90deg, #6B9E9E, #C4956A, #F2BD4E)',
            }}
          />
        </div>

        {/* Three stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-12 relative z-10">
          {approachPreview.stages.map((stage, index) => (
            <div key={stage.name} className="approach-step group relative">
              {/* Illustration — inverted to white, ghosted behind content */}
              <img
                src={stepImages[index]}
                alt=""
                aria-hidden="true"
                className="absolute -right-2 -top-4 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-700 pointer-events-none select-none"
                style={{ filter: 'invert(1) brightness(2)' }}
                loading="lazy"
              />

              {/* Large numeral */}
              <div className="relative mb-6 md:mb-8">
                <span
                  className="block text-[7rem] md:text-[8rem] lg:text-[10rem] font-display font-bold leading-[0.8] tracking-tighter select-none"
                  style={{ color: stepAccents[index] }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                {/* Dot on the timeline */}
                <div
                  className="hidden md:block absolute -bottom-4 left-8 w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-black"
                  style={{
                    backgroundColor: stepAccents[index],
                    ringColor: stepAccents[index],
                  }}
                />
              </div>

              {/* Step name */}
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 relative">
                {stage.name}
              </h3>

              {/* Thin accent bar */}
              <div
                className="w-10 h-[2px] mb-4 transition-all duration-500 group-hover:w-16 relative"
                style={{ backgroundColor: stepAccents[index] }}
              />

              {/* Description */}
              <p className="text-gray text-base leading-relaxed max-w-xs relative">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
