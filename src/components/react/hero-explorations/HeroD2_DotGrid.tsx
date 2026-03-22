import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * D2: Dot grid with color pools
 * An orderly grid of dots where clusters are tinted in pillar accent colors,
 * creating colored "pools" that slowly pulse and shift.
 */
export default function HeroD2_DotGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Dots pop in with stagger
      gsap.fromTo('.hd2-dot',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: { amount: 1.2, from: 'center', grid: 'auto' }, ease: 'back.out(2)' }
      );

      // Text
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hd2-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.8)
        .fromTo('.hd2-word', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.04 }, 0.9)
        .fromTo('.hd2-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.3)
        .fromTo('.hd2-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5);

      // Color pools pulse
      gsap.utils.toArray<HTMLElement>('.hd2-pool').forEach((pool, i) => {
        gsap.to(pool, {
          opacity: 0.5,
          scale: 1.3,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.8,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  // Generate dot grid
  const cols = 25;
  const rows = 16;
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: c, y: r });
    }
  }

  // Color pools — positioned as radial gradients behind the dots
  const pools = [
    { color: 'rgba(107,158,158,0.35)', x: '20%', y: '30%', size: '200px' },
    { color: 'rgba(196,149,106,0.3)', x: '70%', y: '25%', size: '180px' },
    { color: 'rgba(122,158,122,0.3)', x: '45%', y: '70%', size: '220px' },
    { color: 'rgba(155,126,160,0.25)', x: '80%', y: '65%', size: '190px' },
    { color: 'rgba(242,189,78,0.2)', x: '15%', y: '75%', size: '160px' },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Color pools — blurred circles behind the dot grid */}
      {pools.map((pool, i) => (
        <div key={i} className="hd2-pool absolute rounded-full pointer-events-none will-change-transform"
          style={{
            left: pool.x, top: pool.y,
            width: pool.size, height: pool.size,
            backgroundColor: pool.color,
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ padding: '5%' }}>
        <div className="w-full h-full relative">
          {dots.map((dot, i) => (
            <div key={i} className="hd2-dot absolute rounded-full bg-black/[0.09] will-change-transform"
              style={{
                width: 5, height: 5,
                left: `${(dot.x / (cols - 1)) * 100}%`,
                top: `${(dot.y / (rows - 1)) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Umbrella watermark */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
          className="w-60 md:w-80 lg:w-[360px] object-contain opacity-[0.06]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl">
          <span className="hd2-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="hd2-word inline-block mr-[0.25em] last:mr-0 text-black/85">{word}</span>
            ))}
          </h1>
          <p className="hd2-sub text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hd2-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
