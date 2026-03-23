import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTransparency() {
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
          stagger: 0.12,
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
      <div ref={sectionRef} className="max-w-5xl">
        <span className="transparency-item text-yellow-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
          Practicalities
        </span>
        <h2 className="transparency-item text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-16 md:mb-20">
          {processTransparency.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-14">
          {processTransparency.details.map((detail, index) => (
            <div key={index} className="transparency-item">
              <h3 className="text-xl font-bold text-white mb-3">
                {detail.title}
              </h3>
              <p className="text-gray leading-relaxed">
                {detail.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
