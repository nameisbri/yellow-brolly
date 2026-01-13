import { useEffect, useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCTA } from '../common';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Use useLayoutEffect to scroll before paint
  useLayoutEffect(() => {
    // Force immediate scroll to top without smooth behavior
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  useEffect(() => {
    // Refresh ScrollTrigger after navigation and scroll
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const main = mainRef.current;
    if (!main) return;

    gsap.fromTo(
      main,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, [location.pathname, prefersReducedMotion]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      {/* Subtle noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <Header />
      <main ref={mainRef} className="flex-grow">
        {children}
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
}
