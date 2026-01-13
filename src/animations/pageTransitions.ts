import { gsap } from 'gsap';

export const pageTransitions = {
  enter: (element: HTMLElement | null, onComplete?: () => void) => {
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1 });
      onComplete?.();
      return;
    }

    gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete,
      }
    );
  },

  exit: (element: HTMLElement | null, onComplete?: () => void) => {
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 0 });
      onComplete?.();
      return;
    }

    gsap.to(element, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete,
    });
  },
};

export const textReveal = (element: HTMLElement | null) => {
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(element, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    element,
    { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.8,
      ease: 'power3.out',
    }
  );
};

export const staggerReveal = (
  elements: HTMLElement[] | NodeListOf<Element>,
  stagger = 0.1
) => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(elements, { opacity: 1 });
    return;
  }

  gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: 'power2.out',
    }
  );
};
