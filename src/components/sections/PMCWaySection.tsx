import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function PMCWaySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { pmcSection } = siteContent.home;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pmc-content',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="black" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,221,0,0.08),transparent_70%)]" />
      
      <div ref={sectionRef} className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="pmc-content bg-dark-elevated rounded-2xl p-10 md:p-14 border border-dark-border relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-yellow-primary text-black rounded-full mb-5">
                {pmcSection.subhead}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 relative">
                {pmcSection.headline}
              </h2>
              <p className="text-lg md:text-xl text-gray leading-relaxed relative">
                {pmcSection.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
