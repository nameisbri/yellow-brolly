import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  end?: string;
  markers?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !ref.current) return;

    const {
      animation = 'fadeUp',
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
      end = 'bottom 15%',
    } = options;

    const element = ref.current;
    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {};

    switch (animation) {
      case 'fadeUp':
        fromVars = { opacity: 0, y: 40 };
        toVars = { opacity: 1, y: 0 };
        break;
      case 'fadeIn':
        fromVars = { opacity: 0 };
        toVars = { opacity: 1 };
        break;
      case 'slideLeft':
        fromVars = { opacity: 0, x: 60 };
        toVars = { opacity: 1, x: 0 };
        break;
      case 'slideRight':
        fromVars = { opacity: 0, x: -60 };
        toVars = { opacity: 1, x: 0 };
        break;
      case 'scale':
        fromVars = { opacity: 0, scale: 0.9 };
        toVars = { opacity: 1, scale: 1 };
        break;
    }

    gsap.set(element, fromVars);

    const tween = gsap.to(element, {
      ...toVars,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [options]);

  return ref;
}

export function useStaggerAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const {
      animation = 'fadeUp',
      duration = 0.6,
      delay = 0,
      stagger = 0.15,
      start = 'top 85%',
    } = options;

    const container = containerRef.current;
    const children = container.children;

    if (children.length === 0) return;

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {};

    switch (animation) {
      case 'fadeUp':
        fromVars = { opacity: 0, y: 30 };
        toVars = { opacity: 1, y: 0 };
        break;
      case 'fadeIn':
        fromVars = { opacity: 0 };
        toVars = { opacity: 1 };
        break;
      case 'slideLeft':
        fromVars = { opacity: 0, x: 40 };
        toVars = { opacity: 1, x: 0 };
        break;
      case 'slideRight':
        fromVars = { opacity: 0, x: -40 };
        toVars = { opacity: 1, x: 0 };
        break;
      case 'scale':
        fromVars = { opacity: 0, scale: 0.95 };
        toVars = { opacity: 1, scale: 1 };
        break;
    }

    gsap.set(children, fromVars);

    const tween = gsap.to(children, {
      ...toVars,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [options]);

  return containerRef;
}
