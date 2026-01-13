import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button, ArrowRightIcon, CalendarIcon, ScrubText } from '../common';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  headline?: string;
  subhead?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
}

export function CTASection({
  headline = "Ready to get started?",
  subhead = "Let's discuss how we can help your organization thrive.",
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
      className="relative py-32 md:py-40 bg-dark overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,221,0,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-primary/30 to-transparent" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="cta-content text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-tight">
            {headline}
          </h2>
          <p className="text-xl md:text-2xl text-gray max-w-2xl mx-auto mb-12 leading-relaxed">
            {subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button to={primaryCta.to} variant="primary" size="lg">
              <CalendarIcon size={20} className="mr-2" />
              {primaryCta.label}
            </Button>
            {secondaryCta && (
              <Button to={secondaryCta.to} variant="outline" size="lg">
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
        className="text-[8vw] md:text-[6vw] font-display text-dark-border whitespace-nowrap leading-none select-none tracking-wider"
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
