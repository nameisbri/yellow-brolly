import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button, SlideUpText } from '../common';
import { lazy } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Lazy load Three.js background only when needed
const HeroBackground = lazy(() => import('../three/HeroBackground').then(m => ({ default: m.HeroBackground })));

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

export function HeroSection({
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
      // Eyebrow animation
      gsap.fromTo(
        '.hero-eyebrow',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      // Headline word-by-word animation - reduced complexity, no initial opacity
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

      // Subhead animation
      gsap.fromTo(
        '.hero-subhead',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );

      // CTA animation
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

      // Decorative elements
      gsap.fromTo(
        '.hero-decoration',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Split headline into words for animation
  const words = headline.split(' ');

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden ${compact ? 'min-h-[60vh] py-32 md:py-40' : 'min-h-screen py-32 md:py-40 lg:py-48'} flex items-center`}
    >
      {showBackground && <HeroBackground />}

      {/* Decorative corner elements */}
      <div className="hero-decoration absolute top-32 left-8 w-24 h-24 border border-yellow-primary/20 rounded-full hidden lg:block" />
      <div className="hero-decoration absolute bottom-32 right-8 w-16 h-16 bg-yellow-primary/10 rounded-full hidden lg:block" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className={`max-w-5xl ${centered ? 'mx-auto text-center' : ''}`}>
          {eyebrow && (
            <span className="hero-eyebrow inline-block text-yellow-primary text-sm font-semibold tracking-[0.3em] uppercase mb-8">
              {eyebrow}
            </span>
          )}

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8"
            style={{ perspective: '1000px' }}
          >
            {words.map((word, index) => (
              <span
                key={index}
                className="hero-word inline-block mr-[0.25em] last:mr-0"
                style={{ transform: 'preserve-3d' }}
              >
                {highlightedWord && word.toLowerCase().includes(highlightedWord.toLowerCase()) ? (
                  <span className="text-yellow-primary glow">{word}</span>
                ) : (
                  <span className="text-white">{word}</span>
                )}
              </span>
            ))}
          </h1>

          {subhead && (
            <p className="hero-subhead text-base md:text-lg lg:text-xl xl:text-2xl text-gray max-w-3xl mx-auto mb-12 leading-relaxed">
              {subhead}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {ctaPrimary && (
                <Button
                  to={ctaPrimary.to}
                  variant="primary"
                  size="lg"
                  className="hero-cta"
                >
                  {ctaPrimary.label}
                </Button>
              )}
              {ctaSecondary && (
                <Button
                  to={ctaSecondary.to}
                  variant="outline"
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

      {/* Scroll indicator */}
      {!compact && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-yellow-primary to-transparent" />
        </div>
      )}
    </section>
  );
}

// Alternative hero for inner pages
interface PageHeroProps {
  headline: string;
  subhead?: string;
  eyebrow?: string;
}

export function PageHero({ headline, subhead, eyebrow }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-elevated/50 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,221,0,0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        {eyebrow && (
          <span className="inline-block text-yellow-primary text-sm font-semibold tracking-[0.3em] uppercase mb-6">
            {eyebrow}
          </span>
        )}
        <SlideUpText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight max-w-4xl">
          {headline}
        </SlideUpText>
        {subhead && (
          <p className="mt-8 text-xl text-gray max-w-2xl leading-relaxed">
            {subhead}
          </p>
        )}
      </div>
    </section>
  );
}
