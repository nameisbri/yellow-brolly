import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const pillarAccentColors = [
  'var(--color-accent-teal)',
  'var(--color-accent-amber)',
  'var(--color-accent-sage)',
  'var(--color-accent-mauve)',
  'var(--color-yellow-primary)',
];

export default function ServicePillars() {
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { pillars } = siteContent.services;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pillar-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="dark">
      <div ref={gridRef} className="space-y-6">
        {pillars.map((pillar, index) => {
          const isExpanded = expandedIndex === index;
          const accentColor = pillarAccentColors[index % pillarAccentColors.length];

          return (
            <div
              key={pillar.title}
              className="pillar-card group"
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full text-left bg-dark-elevated border border-dark-border rounded-2xl p-6 md:p-8 hover:border-yellow-primary/30 transition-all duration-300 overflow-hidden relative"
                aria-expanded={isExpanded}
              >
                {/* Accent top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="inline-flex w-8 h-8 rounded-full items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 20%, transparent)`, color: accentColor }}
                      >
                        {index + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-yellow-primary/80 font-medium text-sm ml-11">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Expand/collapse indicator */}
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`w-6 h-6 text-gray transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isExpanded ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-11 space-y-6">
                    <p className="text-gray leading-relaxed">
                      {pillar.description}
                    </p>

                    {pillar.supports && pillar.supports.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-light-gray mb-3 uppercase tracking-wider">
                          We support clients with:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray">
                          {pillar.supports.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-yellow-primary mt-0.5 flex-shrink-0">
                                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                </svg>
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pillar.outcome && (
                      <div className="p-4 rounded-xl border border-yellow-primary/20 bg-yellow-primary/5">
                        <p className="text-sm font-medium text-white">
                          <span className="text-yellow-primary font-semibold mr-2">Outcome:</span>
                          {pillar.outcome}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
