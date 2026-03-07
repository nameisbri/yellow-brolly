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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
    <Section background="black" className="py-12 md:py-16 lg:py-20">
      <div ref={sectionRef} className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="pmc-content max-w-3xl">
          <span className="inline-block px-2 py-1 text-xs sm:text-sm font-medium bg-dark-border text-light-gray mb-5 tracking-wider uppercase">
            {pmcSection.subhead}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-6">
            {pmcSection.headline}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray leading-relaxed border-l-4 border-yellow-primary pl-4">
            {pmcSection.description}
          </p>
        </div>
      </div>
    </Section>
  );
}
