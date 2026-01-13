import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './useReducedMotion';

// Lazy load ScrollTrigger only when needed
let ScrollTrigger: any = null;
let isScrollTriggerLoaded = false;

export async function loadScrollTrigger() {
  if (isScrollTriggerLoaded) return;

  try {
    const module = await import('gsap/ScrollTrigger');
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerLoaded = true;
    return ScrollTrigger;
  } catch (error) {
    console.warn('Failed to load ScrollTrigger:', error);
    return null;
  }
}

export function useOptimizedGSAP() {
  const prefersReducedMotion = useReducedMotion();
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const isScrollTriggerNeeded = useRef(false);

  const setupAnimation = (
    animationFn: (ctx: ReturnType<typeof gsap.context>) => void,
    needsScrollTrigger = false
  ) => {
    const runAnimation = async () => {
      if (!ctxRef.current) {
        ctxRef.current = gsap.context(() => {}, animationFn);
      }

      // Load ScrollTrigger if needed for this animation
      if (needsScrollTrigger && !isScrollTriggerNeeded.current) {
        isScrollTriggerNeeded.current = true;
        await loadScrollTrigger();
      }
    };

    runAnimation();
  };

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, []);

  return {
    prefersReducedMotion,
    ctxRef,
    setupAnimation,
    loadScrollTrigger,
  };
}
