import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, getServiceIcon } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ValuesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { values } = siteContent.about;

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="dark">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12">
        Our Core Values
      </h2>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {values.map((value) => (
          <div key={value.title}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-dark-border/40 flex items-center justify-center text-light-gray">
                {getServiceIcon(value.icon)}
              </div>
              <h3 className="text-lg font-bold text-white">
                {value.title}
              </h3>
            </div>
            <p className="text-gray leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
