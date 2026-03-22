import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * D5: Structured umbrella wallpaper
 * CSS-rendered umbrella grid at varying scales and rotations forming
 * a structured textile/wallpaper pattern. Different from C's canvas —
 * this is a designed, repeating pattern that breathes.
 */
export default function HeroD5_UmbrellaWallpaper() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pattern tiles fade in with a wave from top-left
      gsap.fromTo('.hd5-tile',
        { opacity: 0, scale: 0.5, rotation: -20 },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 0.6,
          stagger: { amount: 1.5, from: 'start', grid: [8, 12], axis: 'x' },
          ease: 'power3.out',
        }
      );

      // Text
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hd5-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1)
        .fromTo('.hd5-word', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 }, 1.1)
        .fromTo('.hd5-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.5)
        .fromTo('.hd5-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.7);

      // Breathing — alternate tiles scale subtly
      gsap.utils.toArray<HTMLElement>('.hd5-tile').forEach((tile, i) => {
        gsap.to(tile, {
          scale: 1 + (i % 3 === 0 ? 0.08 : 0.04),
          rotation: (i % 2 === 0 ? 3 : -3),
          duration: 3 + (i % 5) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: (i % 7) * 0.3,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  // Generate wallpaper grid
  const cols = 12;
  const rows = 8;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isOffset = r % 2 === 1;
      // Alternate sizes for visual interest
      const sizeClass = (r + c) % 3 === 0 ? 'w-12 h-12' : (r + c) % 3 === 1 ? 'w-8 h-8' : 'w-10 h-10';
      const baseRotation = ((r + c) % 4 - 2) * 8;
      const opacity = 0.04 + ((r + c) % 5) * 0.015;
      tiles.push({ c, r, isOffset, sizeClass, baseRotation, opacity });
    }
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Wallpaper grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ padding: '2%' }}>
        <div className="w-full h-full relative">
          {tiles.map((tile, i) => {
            const xPct = ((tile.c + (tile.isOffset ? 0.5 : 0)) / cols) * 100;
            const yPct = (tile.r / rows) * 100;
            return (
              <div key={i} className="hd5-tile absolute will-change-transform"
                style={{
                  left: `${xPct}%`, top: `${yPct}%`,
                  transform: `rotate(${tile.baseRotation}deg)`,
                }}>
                <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
                  className={`${tile.sizeClass} object-contain`}
                  style={{ opacity: tile.opacity }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl">
          <span className="hd5-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="hd5-word inline-block mr-[0.25em] last:mr-0 text-black/85">{word}</span>
            ))}
          </h1>
          <p className="hd5-sub text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hd5-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
