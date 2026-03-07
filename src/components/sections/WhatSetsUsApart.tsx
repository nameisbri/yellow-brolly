import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function WhatSetsUsApart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { whatSetsUsApart } = siteContent.home;

  const [featured, ...rest] = whatSetsUsApart.differentiators;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Heading slides up
      gsap.fromTo(
        '.wsua-heading',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Featured item
      gsap.fromTo(
        '.wsua-featured',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Grid items stagger in
      gsap.fromTo(
        '.wsua-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="dark">
      <div ref={containerRef}>
        <h2 className="wsua-heading text-3xl md:text-4xl font-display font-bold text-white mb-10">
          What Sets Us Apart
        </h2>

        <div className="wsua-featured border-l-4 border-yellow-primary pl-6 mb-12">
          <h3 className="text-2xl font-display font-bold text-white mb-3">
            {featured.title}
          </h3>
          <p className="text-lg text-gray leading-relaxed">
            {featured.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rest.map((item) => (
            <div key={item.title} className="wsua-item">
              <h3 className="text-lg font-bold text-white mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-primary mr-2 align-middle" />
                {item.title}
              </h3>
              <p className="text-sm text-gray leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
