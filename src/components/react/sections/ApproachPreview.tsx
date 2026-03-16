import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../Section';
import { Button } from '../Button';
import { ArrowRightIcon } from '../Icons';
import { siteContent } from '../../../data/content';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const stepImages = [
  '/images/brand/magnifying-glass.png',
  '/images/brand/creative-thinker.png',
  '/images/brand/trophy-winner.png',
];

const stepAccents = ['#6B9E9E', '#C4956A', '#F7B32B'];

export default function ApproachPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { approachPreview } = siteContent.home;

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>('.preview-stage');
      stages.forEach((stage, index) => {
        gsap.fromTo(
          stage,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            delay: index * 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Section background="warmer">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="text-yellow-primary text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">Our Approach</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1]">
            {approachPreview.headline}
          </h2>
        </div>
        <Button to="/approach" variant="outline" size="lg" className="flex-shrink-0">
          How we work
          <ArrowRightIcon size={16} className="ml-2" />
        </Button>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {approachPreview.stages.map((stage, index) => (
          <div
            key={stage.name}
            className="preview-stage group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-500"
            style={{
              backgroundColor: `color-mix(in srgb, ${stepAccents[index]} 8%, #262220)`,
            }}
          >
            {/* Illustration */}
            <img
              src={stepImages[index]}
              alt=""
              className="w-20 h-20 object-contain mb-5 group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              aria-hidden="true"
            />

            {/* Number */}
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: stepAccents[index] }}
            >
              Step {index + 1}
            </span>

            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
              {stage.name}
            </h3>
            <p className="text-gray text-sm leading-relaxed">{stage.description}</p>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[3px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: stepAccents[index] }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
