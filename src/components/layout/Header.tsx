import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { siteContent } from '../../data/content';
import { Button, MenuIcon, CloseIcon, UmbrellaIcon } from '../common';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (!prefersReducedMotion) {
        gsap.fromTo(
          '.mobile-menu',
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        );
        gsap.fromTo(
          '.mobile-menu-item',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.1 }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, prefersReducedMotion]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? 'bg-black/90 backdrop-blur-xl border-b border-dark-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link
              to="/"
              className="flex items-center gap-3 text-white hover:text-yellow-primary transition-colors duration-300 group"
            >
              <div className="relative">
                <UmbrellaIcon size={36} className="text-yellow-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-yellow-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                {siteContent.brand.name}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              {siteContent.navigation.map((item) =>
                item.isCta ? (
                  <Button key={item.path} to={item.path} variant="primary" size="sm">
                    {item.label}
                  </Button>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative font-medium text-sm tracking-wide transition-colors duration-300 ${
                      isActive(item.path)
                        ? 'text-yellow-primary'
                        : 'text-gray hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-primary transition-all duration-300 ${
                        isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                )
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center text-white hover:text-yellow-primary transition-colors duration-300 rounded-lg hover:bg-white/5"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="mobile-menu lg:hidden fixed left-0 right-0 top-20 md:top-24 bottom-0 bg-black backdrop-blur-xl z-50">
          <nav className="container mx-auto px-6 py-12 h-full flex flex-col">
            <div className="flex flex-col gap-2">
              {siteContent.navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-menu-item py-4 text-3xl font-display font-bold transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-yellow-primary'
                      : 'text-white hover:text-yellow-primary'
                  } ${item.isCta ? 'mt-8' : ''}`}
                >
                  {item.isCta ? (
                    <span className="inline-block px-8 py-4 bg-yellow-primary text-black rounded-full text-lg">
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
