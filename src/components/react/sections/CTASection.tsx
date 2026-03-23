import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../Button';
import { ArrowRightIcon, CalendarIcon } from '../Icons';
import { ScrubText } from '../TextAnimations';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  headline?: string;
  subhead?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}

export default function CTASection({
  headline = "Ready to get started?",
  subhead = "Let's talk about what your organization actually needs.",
  primaryCta = { label: 'Book a Discovery Call', to: '/contact' },
  secondaryCta,
}: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
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
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 bg-yellow-primary overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="cta-content text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-black mb-4 sm:mb-6 leading-tight">
            {headline}
          </h2>
          {subhead && (
            <p className="text-lg md:text-xl lg:text-2xl text-black/75 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
              {subhead}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button to={primaryCta.to} variant="dark" size="lg">
              <CalendarIcon size={20} className="mr-2" />
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button to={secondaryCta.to} variant="dark-outline" size="lg">
                {secondaryCta.label}
                <ArrowRightIcon size={18} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Fullwidth text scroll CTA
interface BigTextCTAProps {
  text: string;
  ctaLabel: string;
  ctaTo: string;
}

export function BigTextCTA({ text, ctaLabel, ctaTo }: BigTextCTAProps) {
  return (
    <section className="py-20 md:py-28 bg-black overflow-hidden">
      <ScrubText
        direction="left"
        className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-display text-light-border whitespace-nowrap leading-none select-none tracking-wider"
      >
        {text}
      </ScrubText>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl mt-10 text-center">
        <Button to={ctaTo} variant="primary" size="lg">
          {ctaLabel}
          <ArrowRightIcon size={16} className="ml-2" />
        </Button>
      </div>
    </section>
  );
}
