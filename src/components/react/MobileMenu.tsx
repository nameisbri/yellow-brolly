import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'The YB Approach', path: '/approach' },
  { label: 'What We Do', path: '/services' },
  { label: 'Why YellowBrolly', path: '/why-yellowbrolly' },
  { label: 'FAQ', path: '/faq' },
  { label: "Let's Talk", path: '/contact', isCta: true },
];

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
        className="lg:hidden relative w-12 h-12 flex items-center justify-center text-white hover:text-yellow-primary transition-colors duration-300 rounded-lg hover:bg-white/5"
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
        <div className="mobile-menu lg:hidden fixed left-0 right-0 top-20 md:top-24 bottom-0 bg-black backdrop-blur-xl z-50">
          <nav className="container mx-auto px-6 py-12 h-full flex flex-col">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`mobile-menu-item py-4 min-h-[48px] flex items-center text-2xl sm:text-3xl font-display font-bold transition-colors duration-300 ${
                    isActive(item.path) ? 'text-yellow-primary' : 'text-white hover:text-yellow-primary'
                  } ${item.isCta ? 'mt-8' : ''}`}
                >
                  {item.isCta ? (
                    <span className="inline-block px-8 py-4 bg-yellow-primary text-black rounded-full text-lg">{item.label}</span>
                  ) : item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
