import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ApproachTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { stages, closing } = siteContent.approach;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the loop arrows
      gsap.fromTo(
        '.loop-arrow',
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          delay: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate each step card
      const steps = gsap.utils.toArray<HTMLElement>('.approach-step');
      steps.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate the loop-back arrow
      gsap.fromTo(
        '.loop-back',
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 1,
          delay: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate closing text
      gsap.fromTo(
        '.approach-closing',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.approach-closing',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const stepIcons = [
    // Magnifying glass for Assess
    <svg key="assess" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21L28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>,
    // Compass for Align
    <svg key="align" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
      <polygon points="16,6 19,14 16,16 13,14" fill="currentColor" opacity="0.6" />
      <polygon points="16,26 13,18 16,16 19,18" fill="currentColor" />
    </svg>,
    // Rocket for Activate
    <svg key="activate" viewBox="0 0 32 32" fill="none" className="w-8 h-8">
      <path d="M16 4C16 4 8 12 8 20L12 24L16 20L20 24L24 20C24 12 16 4 16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="14" r="2" fill="currentColor" />
    </svg>,
  ];

  return (
    <Section background="warm">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* 3-step horizontal layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 relative">
          {stages.map((stage, index) => (
            <div key={stage.name} className="approach-step relative flex flex-col items-center">
              {/* Arrow between steps (desktop) */}
              {index < stages.length - 1 && (
                <div className="loop-arrow hidden lg:flex absolute top-[52px] -right-3 z-10 text-yellow-primary">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              {/* Arrow between steps (mobile) */}
              {index < stages.length - 1 && (
                <div className="loop-arrow lg:hidden flex justify-center py-2 text-yellow-primary">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 rotate-90">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Step card */}
              <div className="bg-dark-elevated border border-dark-border rounded-2xl p-8 lg:p-10 w-full h-full flex flex-col items-center text-center hover:border-yellow-primary/40 transition-colors duration-500 group">
                {/* Step number + icon */}
                <div className="w-[104px] h-[104px] rounded-full bg-black border-2 border-dark-border flex items-center justify-center mb-6 group-hover:border-yellow-primary transition-colors duration-300 text-yellow-primary">
                  {stepIcons[index]}
                </div>

                <div className="inline-block px-3 py-1 rounded-full bg-yellow-primary/10 text-yellow-primary text-xs font-semibold uppercase tracking-wider mb-4">
                  Step {index + 1}
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                  {stage.name}
                </h3>
                <p className="text-yellow-primary/80 font-medium text-sm mb-4">
                  {stage.tagline}
                </p>
                <p className="text-gray leading-relaxed text-sm md:text-base">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Loop-back arrow: visual indicator that this is a continuous cycle */}
        <div className="loop-back mt-8 flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-dark-border bg-dark-elevated/50">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-yellow-primary">
              <path d="M17 1L21 5L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 11V9C3 6.79 4.79 5 7 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 23L3 19L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 13V15C21 17.21 19.21 19 17 19H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm text-light-gray">Continuous cycle of improvement</span>
          </div>
        </div>

        {/* Closing statement */}
        <div className="approach-closing mt-16 text-center max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-white font-display leading-relaxed">
            {closing}
          </p>
        </div>
      </div>
    </Section>
  );
}
