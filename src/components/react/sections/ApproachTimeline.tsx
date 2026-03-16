import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const stepImages = [
  '/images/brand/magnifying-glass.png',
  '/images/brand/creative-thinker.png',
  '/images/brand/trophy-winner.png',
];

const stepColors = [
  { bg: 'rgba(107, 158, 158, 0.12)', border: 'rgba(107, 158, 158, 0.3)', text: '#6B9E9E' },
  { bg: 'rgba(196, 149, 106, 0.12)', border: 'rgba(196, 149, 106, 0.3)', text: '#C4956A' },
  { bg: 'rgba(247, 179, 43, 0.12)', border: 'rgba(247, 179, 43, 0.3)', text: '#F7B32B' },
];

export default function ApproachTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { stages, closing } = siteContent.approach;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the connecting line drawing in
      gsap.fromTo(
        '.approach-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger the step blocks
      const steps = gsap.utils.toArray<HTMLElement>('.approach-step');
      steps.forEach((step, index) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.25,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Float the illustrations with a gentle parallax
      const illustrations = gsap.utils.toArray<HTMLElement>('.approach-illustration');
      illustrations.forEach((img) => {
        gsap.fromTo(
          img,
          { y: 30, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate the loop-back indicator
      gsap.fromTo(
        '.loop-indicator',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.loop-indicator',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Rotating loop icon
      gsap.to('.loop-spin', {
        rotation: 360,
        duration: 8,
        ease: 'none',
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="sand">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20 max-w-2xl">
          <span className="text-yellow-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">How We Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-[1.1]">
            Three steps.<br />One continuous cycle.
          </h2>
        </div>

        {/* Connecting line (desktop only) */}
        <div className="hidden lg:block relative">
          <div className="approach-line absolute top-[140px] left-[16%] right-[16%] h-[3px] origin-left" style={{ background: 'linear-gradient(90deg, #6B9E9E, #C4956A, #F7B32B)' }} />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
          {stages.map((stage, index) => (
            <div key={stage.name} className="approach-step relative">
              {/* Illustration floating above */}
              <div className="approach-illustration flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={stepImages[index]}
                    alt=""
                    className="w-28 h-28 md:w-36 md:h-36 object-contain"
                    loading="lazy"
                    aria-hidden="true"
                  />
                  {/* Step number overlaid */}
                  <div
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-display"
                    style={{ backgroundColor: stepColors[index].text, color: '#131110' }}
                  >
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className="rounded-2xl p-8 transition-all duration-500 h-full"
                style={{
                  backgroundColor: stepColors[index].bg,
                  borderLeft: `3px solid ${stepColors[index].border}`,
                }}
              >
                <h3
                  className="text-2xl md:text-3xl font-display font-bold mb-2"
                  style={{ color: stepColors[index].text }}
                >
                  {stage.name}
                </h3>
                <p className="text-text-secondary font-medium text-sm mb-4">
                  {stage.tagline}
                </p>
                <p className="text-text-muted leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Loop indicator */}
        <div className="loop-indicator mt-16 flex flex-col items-center gap-4">
          <div className="loop-spin">
            <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-yellow-primary">
              <path d="M36 8L42 14L36 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 24V18C6 11.37 11.37 6 18 6H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 40L6 34L12 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M42 24V30C42 36.63 36.63 42 30 42H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-text-secondary text-sm text-center max-w-xs">
            A continuous cycle. Each round builds on the last, compounding clarity and momentum.
          </p>
        </div>

        {/* Closing statement */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl lg:text-4xl text-text-primary font-display leading-[1.3]">
            {closing}
          </p>
        </div>
      </div>
    </Section>
  );
}
