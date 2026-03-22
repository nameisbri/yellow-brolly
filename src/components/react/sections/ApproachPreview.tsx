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

const stepAccents = ['#6B9E9E', '#C4956A', '#F7B32B'];

export default function ApproachPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { approachPreview } = siteContent.home;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.preview-stage',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
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
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-[1.1]">
          {approachPreview.headline}
        </h2>
        <a href="/approach" className="text-yellow-text hover:text-yellow-hover transition-colors duration-300 font-medium text-sm inline-flex items-center gap-2 flex-shrink-0">
          How we work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
      </div>

      {/* People photo — editorial context */}
      <div className="mb-10 rounded-xl overflow-hidden">
        <img
          src="/images/photos/work-preview.jpg"
          alt="Woman presenting at a whiteboard while colleagues listen intently"
          className="w-full h-48 md:h-64 lg:h-72 object-cover object-[center_20%]"
          loading="lazy"
        />
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {approachPreview.stages.map((stage, index) => (
          <div
            key={stage.name}
            className="preview-stage group relative overflow-hidden rounded-xl p-6 lg:p-8 transition-all duration-500 min-h-[240px]"
            style={{
              backgroundColor: `color-mix(in srgb, ${stepAccents[index]} 8%, #FFFFFF)`,
              transform: `translateY(${index * 24}px)`,
            }}
          >
            {/* Illustration as large background element on the right */}
            <img
              src={stepImages[index]}
              alt=""
              className="absolute -right-4 -bottom-4 w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain opacity-[0.12] group-hover:opacity-[0.2] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none"
              loading="lazy"
              aria-hidden="true"
            />

            {/* Content - stays above the illustration */}
            <div className="relative z-10">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-3 text-yellow-text"
              >
                Step {index + 1}
              </span>

              <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-2">
                {stage.name}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed max-w-[85%]">{stage.description}</p>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: stepAccents[index] }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
