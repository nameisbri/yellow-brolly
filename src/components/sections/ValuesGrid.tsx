import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, SectionHeader, Card, getServiceIcon } from '../common';
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
      const cards = gsap.utils.toArray<HTMLElement>('.value-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate icons with a bounce
      const icons = gsap.utils.toArray<HTMLElement>('.value-icon');
      icons.forEach((icon, index) => {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -45 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: 0.3 + index * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
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
      <SectionHeader
        headline="Our Core Values"
        subhead="The principles that guide everything we do."
        eyebrow="What We Believe"
      />

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
        {values.map((value) => (
          <div key={value.title} className="value-card">
            <Card className="text-center group h-full">
              <div className="value-icon mx-auto mb-5 w-16 h-16 rounded-2xl bg-yellow-dim flex items-center justify-center text-yellow-primary group-hover:bg-yellow-primary group-hover:text-black transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                {getServiceIcon(value.icon)}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-yellow-primary transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray leading-relaxed">{value.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
