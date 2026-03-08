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
      // Animate the progress line
      gsap.fromTo(
        '.progress-line-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

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

      // Animate connecting dots
      gsap.fromTo(
        '.connecting-dot',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.3,
          stagger: 0.1,
          delay: 0.8,
          ease: 'expo.out',
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
    <Section background="dark">
      <SectionHeader
        headline={approachPreview.headline}
        eyebrow="Our Process"
      />

      <div ref={containerRef} className="relative mt-8">
        {/* Progress line background */}
        <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-dark-border">
          <div className="progress-line-fill absolute inset-0 bg-gradient-to-r from-dark-border via-yellow-primary/40 to-dark-border origin-left" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative">
          {approachPreview.stages.map((stage, index) => (
            <div
              key={stage.name}
              className="process-stage relative"
            >
              {/* Card container */}
              <div className="bg-dark-elevated border border-dark-border p-6 lg:p-8 h-full group hover:border-dark-border/80 transition-colors duration-500 relative">
                {/* Number badge */}
                <div className="process-number relative z-10 mb-6">
                  <div className="w-14 h-14 bg-black border border-dark-border flex items-center justify-center group-hover:border-yellow-primary transition-colors duration-300">
                    <span className="text-light-gray font-display text-2xl group-hover:text-yellow-primary transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Connecting dot for desktop */}
                  {index < approachPreview.stages.length - 1 && (
                    <div className="connecting-dot hidden lg:block absolute top-1/2 -right-[calc(50%+1rem)] w-2 h-2 bg-dark-border rounded-full -translate-y-1/2" />
                  )}
                </div>

                <h3 className="text-lg md:text-xl lg:text-2xl font-display text-white mb-3">
                  {stage.name}
                </h3>
                <p className="text-gray text-xs sm:text-sm lg:text-base leading-relaxed">{stage.description}</p>
              </div>
            </div>
          ))}
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
