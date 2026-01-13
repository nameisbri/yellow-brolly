import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, CaseStudyCard } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function CaseStudiesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { studies } = siteContent.caseStudies;

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.case-study-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate the metrics badges
      const metrics = gsap.utils.toArray<HTMLElement>('.case-study-card .metrics-badge');
      metrics.forEach((badge, index) => {
        gsap.fromTo(
          badge,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            delay: 0.6 + index * 0.05,
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
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {studies.map((study) => (
          <div key={study.title} className="case-study-card">
            <CaseStudyCard
              title={study.title}
              clientType={study.clientType}
              challenge={study.challenge}
              solution={study.solution}
              outcome={study.outcome}
              metrics={study.metrics}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
