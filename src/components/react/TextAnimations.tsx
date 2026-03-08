import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Custom text splitting utility
function splitTextToChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';

  const chars: HTMLSpanElement[] = [];

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
}

function splitTextToWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  element.innerHTML = '';

  const words: HTMLSpanElement[] = [];

  text.split(' ').forEach((word, index, array) => {
    const wrapper = document.createElement('span');
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.style.verticalAlign = 'top';

    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';

    wrapper.appendChild(span);
    element.appendChild(wrapper);

    if (index < array.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }

    words.push(span);
  });

  return words;
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
}

// Character-by-character reveal animation
export function RevealText({
  children,
  className = '',
  delay = 0,
  duration = 1,
  y = 100,
  stagger = 0.02,
  once = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const originalText = useRef<string>('');

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;
    originalText.current = element.textContent || '';
    const chars = splitTextToChars(element);

    gsap.set(chars, { y, opacity: 0, rotateX: -90 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    tl.to(chars, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
    });

    return () => {
      tl.kill();
      if (containerRef.current) {
        containerRef.current.textContent = originalText.current;
      }
    };
  }, [delay, duration, y, stagger, once, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`${className}`} style={{ perspective: '1000px' }}>
      {children}
    </div>
  );
}

// Word-by-word slide up animation (BOLD EFFECT)
export function SlideUpText({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const originalText = useRef<string>('');

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;
    originalText.current = element.textContent || '';
    const words = splitTextToWords(element);

    gsap.set(words, { y: '120%', opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(words, {
      y: '0%',
      opacity: 1,
      duration: 1,
      stagger,
      delay,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
      if (containerRef.current) {
        containerRef.current.textContent = originalText.current;
      }
    };
  }, [delay, stagger, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Horizontal scroll text marquee
interface MarqueeTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

export function MarqueeText({
  children,
  className = '',
  speed = 50,
  direction = 'left',
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const content = container.querySelector('.marquee-content') as HTMLElement;
    if (!content) return;

    const contentWidth = content.offsetWidth;
    const duration = contentWidth / speed;

    gsap.set(content, { x: direction === 'left' ? 0 : -contentWidth / 2 });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(content, {
      x: direction === 'left' ? -contentWidth / 2 : 0,
      duration,
      ease: 'none',
    });

    return () => {
      tl.kill();
    };
  }, [speed, direction, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="marquee-content inline-flex whitespace-nowrap">
        {children}
        {children}
      </div>
    </div>
  );
}

// Scrub-based horizontal scroll text
interface ScrubTextProps {
  children: string;
  className?: string;
  direction?: 'left' | 'right';
}

export function ScrubText({
  children,
  className = '',
  direction = 'left',
}: ScrubTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;

    gsap.fromTo(
      element,
      { x: direction === 'left' ? '20%' : '-20%' },
      {
        x: direction === 'left' ? '-20%' : '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === element) t.kill();
      });
    };
  }, [direction, prefersReducedMotion]);

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </div>
  );
}

// Bold parallax text with stroke effect
interface StrokeTextProps {
  children: string;
  className?: string;
  filled?: boolean;
}

export function StrokeText({
  children,
  className = '',
  filled = false,
}: StrokeTextProps) {
  return (
    <span
      className={`${
        filled
          ? 'text-yellow-primary'
          : 'text-transparent [-webkit-text-stroke:2px_#FFDD00]'
      } ${className}`}
    >
      {children}
    </span>
  );
}

// Scale up text on scroll
interface ScaleTextProps {
  children: ReactNode;
  className?: string;
  startScale?: number;
}

export function ScaleText({
  children,
  className = '',
  startScale = 0.8,
}: ScaleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;

    gsap.fromTo(
      element,
      { scale: startScale, opacity: 0.3 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === element) t.kill();
      });
    };
  }, [startScale, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Blur reveal text
interface BlurRevealProps {
  children: ReactNode;
  className?: string;
}

export function BlurReveal({ children, className = '' }: BlurRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const element = containerRef.current;

    gsap.fromTo(
      element,
      { filter: 'blur(20px)', opacity: 0, y: 50 },
      {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === element) t.kill();
      });
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Counter animation
interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    if (prefersReducedMotion) {
      containerRef.current.textContent = `${prefix}${end}${suffix}`;
      return;
    }

    const element = containerRef.current;
    const counter = { value: 0 };

    gsap.to(counter, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === element) t.kill();
      });
    };
  }, [end, duration, suffix, prefix, prefersReducedMotion]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
