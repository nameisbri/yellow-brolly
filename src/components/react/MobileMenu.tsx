import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const aboutGroup = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Approach', path: '/approach' },
];

const standaloneItems = [
  { label: 'Services', path: '/services' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Find Your Archetype', path: '/brand-archetype' },
];

const ctaItem = { label: "Let's Talk", path: '/contact' };

interface Props {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo('.mobile-menu', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
        gsap.fromTo('.mobile-menu-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.1 });
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/' || currentPath === '';
    return currentPath.startsWith(path);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden relative w-12 h-12 flex items-center justify-center text-[color:var(--nav-text,#5C5247)] hover:text-[color:var(--nav-text-hover,#2A2118)] transition-colors duration-300 rounded-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {isOpen ? (
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="mobile-menu lg:hidden fixed left-0 right-0 top-20 md:top-24 bottom-0 bg-white backdrop-blur-xl z-50">
          <nav className="container mx-auto px-6 py-12 h-full flex flex-col">
            <div className="flex flex-col gap-1">
              {/* About group */}
              <p className="mobile-menu-item text-gray/50 text-xs uppercase tracking-widest font-semibold mt-2 mb-1 px-1">About</p>
              {aboutGroup.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`mobile-menu-item py-3 min-h-[48px] flex items-center text-2xl sm:text-3xl font-display font-bold transition-colors duration-300 ${
                    isActive(item.path) ? 'text-yellow-text' : 'text-text-primary hover:text-yellow-text'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Divider */}
              <div className="mobile-menu-item border-t border-light-border my-4" />

              {/* Standalone items */}
              {standaloneItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`mobile-menu-item py-3 min-h-[48px] flex items-center text-2xl sm:text-3xl font-display font-bold transition-colors duration-300 ${
                    isActive(item.path) ? 'text-yellow-text' : 'text-text-primary hover:text-yellow-text'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* CTA */}
              <a
                href={ctaItem.path}
                className="mobile-menu-item mt-8 py-3 min-h-[48px] flex items-center"
              >
                <span className="inline-block px-8 py-4 bg-yellow-primary text-black rounded-full text-lg font-display font-bold hover:bg-yellow-hover transition-colors duration-300">
                  {ctaItem.label}
                </span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
