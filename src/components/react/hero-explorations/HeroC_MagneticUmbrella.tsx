import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../Button';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * Option C: Umbrella rain — tessellated pattern
 * A field of small YB umbrellas forms a living wallpaper pattern.
 * They sway gently, and near the cursor they scatter outward like
 * you're pushing through rain. Left-aligned editorial text.
 */
export default function HeroC_UmbrellaField() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Text entrance
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hc-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo('.hc-word', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.05 }, 0.15)
        .fromTo('.hc-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
        .fromTo('.hc-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, 0.8);
    }, sectionRef);

    // Canvas umbrella field
    const canvas = canvasRef.current;
    if (!canvas) return () => ctx.revert();

    const c = canvas.getContext('2d');
    if (!c) return () => ctx.revert();

    let mouseX = -1000, mouseY = -1000;
    let raf: number;

    const umbrellaImg = new Image();
    umbrellaImg.src = '/images/brand/Brolly_Icon_Black.png';

    interface Umbrella {
      baseX: number; baseY: number;
      x: number; y: number;
      size: number; rotation: number; baseRotation: number;
      swayOffset: number; swaySpeed: number;
      opacity: number;
    }

    let umbrellas: Umbrella[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      c.scale(dpr, dpr);
      buildGrid();
    };

    const buildGrid = () => {
      umbrellas = [];
      const cols = Math.ceil(canvas.offsetWidth / 80) + 1;
      const rows = Math.ceil(canvas.offsetHeight / 80) + 1;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const offsetX = row % 2 === 0 ? 0 : 40;
          umbrellas.push({
            baseX: col * 80 + offsetX,
            baseY: row * 80,
            x: col * 80 + offsetX,
            y: row * 80,
            size: 28 + Math.random() * 12,
            rotation: 0,
            baseRotation: (Math.random() - 0.5) * 0.3,
            swayOffset: Math.random() * Math.PI * 2,
            swaySpeed: 0.3 + Math.random() * 0.4,
            opacity: 0.06 + Math.random() * 0.04,
          });
        }
      }
    };

    const draw = (time: number) => {
      if (!c) return;
      c.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const u of umbrellas) {
        // Sway
        const sway = Math.sin(time * 0.001 * u.swaySpeed + u.swayOffset);
        u.rotation = u.baseRotation + sway * 0.15;

        // Mouse repulsion
        const dx = u.baseX - mouseX;
        const dy = u.baseY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pushRadius = 140;

        if (dist < pushRadius) {
          const force = (1 - dist / pushRadius) * 35;
          const angle = Math.atan2(dy, dx);
          u.x += (u.baseX + Math.cos(angle) * force - u.x) * 0.1;
          u.y += (u.baseY + Math.sin(angle) * force - u.y) * 0.1;
          u.rotation += (1 - dist / pushRadius) * 0.4;
        } else {
          u.x += (u.baseX - u.x) * 0.08;
          u.y += (u.baseY - u.y) * 0.08;
        }

        if (umbrellaImg.complete) {
          c.save();
          c.translate(u.x, u.y);
          c.rotate(u.rotation);
          c.globalAlpha = u.opacity;
          c.drawImage(umbrellaImg, -u.size / 2, -u.size / 2, u.size, u.size);
          c.restore();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    umbrellaImg.onload = () => {
      resize();
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  const words = 'When growth gets complex, we help you move forward.'.split(' ');

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-yellow-primary min-h-screen flex items-center cursor-default">
      {/* Canvas umbrella field */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <span className="hc-eyebrow inline-block text-black/50 text-sm font-semibold tracking-[0.3em] uppercase mb-8">
            Yellow Brolly Co
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-8">
            {words.map((word, i) => (
              <span key={i} className="hc-word inline-block mr-[0.25em] last:mr-0 text-black/90">{word}</span>
            ))}
          </h1>
          <p className="hc-sub text-lg md:text-xl text-black/60 max-w-xl mb-10 leading-relaxed">
            We help organizations strengthen leadership, modernize operations, and implement change that lasts.
          </p>
          <Button to="/contact" variant="dark" size="lg" className="hc-cta">
            Book a Discovery Call
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream to-transparent pointer-events-none z-20" />
    </section>
  );
}
