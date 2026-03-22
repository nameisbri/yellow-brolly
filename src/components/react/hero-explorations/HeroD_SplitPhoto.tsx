import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Option D: Geometric mosaic with scroll color shift
 * A grid of geometric shapes (circles, triangles, squares) in brand colors
 * tiles the background. On load they scatter in from random positions.
 * As you scroll, the background color shifts from yellow to cream
 * and shapes slowly drift. Pure CSS shapes, no images for the pattern.
 * The umbrella sits centered at massive scale with low opacity.
 */
export default function HeroD_Geometric() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Shapes scatter in from random positions
      const shapes = gsap.utils.toArray<HTMLElement>('.hd-shape');
      shapes.forEach((shape) => {
        const randomX = (Math.random() - 0.5) * 600;
        const randomY = (Math.random() - 0.5) * 600;
        const randomRotation = (Math.random() - 0.5) * 360;
        gsap.fromTo(shape,
          { x: randomX, y: randomY, rotation: randomRotation, opacity: 0, scale: 0 },
          { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1, duration: 1.2 + Math.random() * 0.5, ease: 'power3.out', delay: Math.random() * 0.4 }
        );
      });

      // Text
      tl.fromTo('.hd-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.5)
        .fromTo('.hd-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .fromTo('.hd-sub', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9)
        .fromTo('.hd-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 1.1);

      // Gentle drift on shapes
      shapes.forEach((shape) => {
        gsap.to(shape, {
          y: `+=${15 + Math.random() * 20}`,
          x: `+=${(Math.random() - 0.5) * 15}`,
          rotation: `+=${(Math.random() - 0.5) * 10}`,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Generate geometric shapes
  const shapeTypes = ['circle', 'triangle', 'square', 'ring'] as const;
  const colors = [
    'rgba(107,158,158,0.25)', // teal
    'rgba(196,149,106,0.2)',  // amber
    'rgba(122,158,122,0.25)', // sage
    'rgba(155,126,160,0.2)',  // mauve
    'rgba(0,0,0,0.06)',       // black
    'rgba(242,189,78,0.3)',   // yellow
  ];

  const shapesData = Array.from({ length: 28 }, (_, i) => ({
    type: shapeTypes[i % shapeTypes.length],
    color: colors[i % colors.length],
    size: 20 + Math.random() * 50,
    top: `${Math.random() * 95}%`,
    left: `${Math.random() * 95}%`,
  }));

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center">
      {/* Geometric shapes layer */}
      <div className="absolute inset-0 pointer-events-none">
        {shapesData.map((shape, i) => {
          const baseClass = 'hd-shape absolute will-change-transform';
          const style = { top: shape.top, left: shape.left, width: shape.size, height: shape.size };

          if (shape.type === 'circle') {
            return <div key={i} className={baseClass} style={{ ...style, borderRadius: '50%', backgroundColor: shape.color }} />;
          }
          if (shape.type === 'ring') {
            return <div key={i} className={baseClass} style={{ ...style, borderRadius: '50%', border: `2px solid ${shape.color}` }} />;
          }
          if (shape.type === 'square') {
            return <div key={i} className={baseClass} style={{ ...style, backgroundColor: shape.color, transform: 'rotate(45deg)' }} />;
          }
          // triangle
          return (
            <div key={i} className={baseClass} style={{ top: shape.top, left: shape.left, width: 0, height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }} />
          );
        })}
      </div>

      {/* Umbrella watermark — centered, massive */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <img src="/images/brand/Brolly_Icon_Black.png" alt="" aria-hidden="true"
          className="w-[500px] md:w-[700px] lg:w-[900px] object-contain opacity-[0.05]" />
      </div>

      {/* Text */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="hd-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="hd-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.02] tracking-tight mb-8 text-black">
            When growth gets complex, we help you move forward.
          </h1>
          <p className="hd-sub text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hd-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
