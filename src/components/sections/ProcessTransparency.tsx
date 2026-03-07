import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ProcessTransparency() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { processTransparency } = siteContent.approach;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.transparency-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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

  if (!processTransparency) return null;

  return (
    <Section background="dark">
      <div ref={sectionRef}>
        <h2 className="transparency-item text-3xl md:text-4xl font-display font-bold text-white mb-10">
          {processTransparency.headline}
        </h2>

        <div className="max-w-3xl">
          {processTransparency.details.map((detail, index) => (
            <div
              key={index}
              className={`transparency-item ${
                index < processTransparency.details.length - 1
                  ? 'border-b border-dark-border pb-6 mb-6'
                  : ''
              }`}
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {detail.title}
              </h3>
              <p className="text-gray leading-relaxed">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
