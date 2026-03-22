import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from './Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroSectionProps {
  headline: string;
  highlightedWord?: string;
  subhead?: string;
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
  showBackground?: boolean;
  centered?: boolean;
  compact?: boolean;
  eyebrow?: string;
}

export default function HeroSection({
  headline,
  highlightedWord,
  subhead,
  ctaPrimary,
  ctaSecondary,
  showBackground = true,
  centered = true,
  compact = false,
  eyebrow,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-eyebrow',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.hero-word',
        { y: 30, opacity: 0.8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          delay: 0.1,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        '.hero-subhead',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        '.hero-decoration',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = headline.split(' ');
  const highlightWords = highlightedWord
    ? highlightedWord.toLowerCase().split(' ')
    : [];

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden bg-yellow-primary ${compact ? 'min-h-[60vh] py-24 md:py-32 lg:py-40' : 'min-h-screen py-24 md:py-32 lg:py-40 xl:py-48'} flex items-center`}
    >
      {showBackground && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(0,0,0,0.04),transparent)]" />
        </div>
      )}

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className={`max-w-5xl ${centered ? 'mx-auto text-center' : ''}`}>
          {eyebrow && (
            <span className="hero-eyebrow inline-block text-black/60 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
              {eyebrow}
            </span>
          )}

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8"
          >
            {words.map((word, index) => {
              const cleanWord = word.replace(/[.,!?;:]/g, '').toLowerCase();
              const isHighlighted = highlightWords.includes(cleanWord);
              return (
                <span
                  key={index}
                  className="hero-word inline-block mr-[0.25em] last:mr-0"
                >
                  <span className={isHighlighted ? 'text-black' : 'text-black/80'}>
                    {word}
                  </span>
                </span>
              );
            })}
          </h1>

          {subhead && (
            <p className="hero-subhead text-base md:text-lg lg:text-xl xl:text-2xl text-black/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              {subhead}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {ctaPrimary && (
                <Button
                  to={ctaPrimary.to}
                  variant="dark"
                  size="lg"
                  className="hero-cta"
                >
                  {ctaPrimary.label}
                </Button>
              )}
              {ctaSecondary && (
                <Button
                  to={ctaSecondary.to}
                  variant="dark-outline"
                  size="lg"
                  className="hero-cta"
                >
                  {ctaSecondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom fade into cream */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
