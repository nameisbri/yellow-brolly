import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, SectionHeader } from '../Section';
import { Button } from '../Button';
import { ArrowRightIcon } from '../Icons';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ApproachPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { approachPreview } = siteContent.home;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each stage card
      const stages = gsap.utils.toArray<HTMLElement>('.process-stage');
      stages.forEach((stage, index) => {
        gsap.fromTo(
          stage,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate number badges with stagger
      gsap.fromTo(
        '.process-number',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          delay: 0.3,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate loop indicator
      gsap.fromTo(
        '.loop-indicator',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="warmer">
      <SectionHeader
        headline={approachPreview.headline}
        eyebrow="Our Approach"
      />

      <div ref={containerRef} className="relative mt-8">
        {/* Progress line (desktop) */}
        <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-dark-border">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-primary/20 via-yellow-primary/40 to-yellow-primary/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 relative">
          {approachPreview.stages.map((stage, index) => (
            <div
              key={stage.name}
              className="process-stage relative"
            >
              <div className="bg-dark-elevated border border-dark-border p-6 lg:p-8 h-full group hover:border-yellow-primary/40 transition-colors duration-500 relative rounded-xl">
                {/* Number badge */}
                <div className="process-number relative z-10 mb-6">
                  <div className="w-14 h-14 bg-black border border-dark-border flex items-center justify-center group-hover:border-yellow-primary transition-colors duration-300 rounded-full">
                    <span className="text-light-gray font-display text-2xl group-hover:text-yellow-primary transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl lg:text-2xl font-display text-white mb-3">
                  {stage.name}
                </h3>
                <p className="text-gray text-xs sm:text-sm lg:text-base leading-relaxed">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Loop indicator */}
        <div className="loop-indicator mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-yellow-primary/60 text-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M17 1L21 5L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 11V9C3 6.79 4.79 5 7 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 23L3 19L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 13V15C21 17.21 19.21 19 17 19H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>A continuous cycle</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 lg:mt-16 text-center">
          <Button to="/approach" variant="outline" size="lg">
            Explore Our Approach
            <ArrowRightIcon size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
