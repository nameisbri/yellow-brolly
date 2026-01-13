import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, ServiceCard, getServiceIcon } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function ServicePillars() {
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { pillars } = siteContent.services;

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pillar-card');

      cards.forEach((card, index) => {
        const isEven = index % 2 === 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isEven ? -60 : 60,
            y: 40,
            rotateY: isEven ? 10 : -10
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            duration: 0.9,
            delay: index * 0.12,
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
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
        {pillars.map((pillar) => (
          <div key={pillar.title} className="pillar-card">
            <ServiceCard
              title={pillar.title}
              description={pillar.description}
              icon={getServiceIcon(pillar.icon)}
              outcome={pillar.outcome}
              whatWeDo={pillar.whatWeDo}
              whatYouGet={pillar.whatYouGet}
              timeline={pillar.timeline}
              investment={pillar.investment}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
