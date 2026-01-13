import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UmbrellaIcon, CloseIcon } from './Icons';

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const location = useLocation();

  // Don't show on contact page
  const shouldShow = location.pathname !== '/contact';

  // Auto-hide after 8 seconds on first view
  useEffect(() => {
    if (!shouldShow || hasShown) return;

    setHasShown(true);
    const timer = setTimeout(() => {
      setIsMinimized(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [shouldShow, hasShown]);

  if (!shouldShow || !isVisible) return null;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-40 bg-yellow-primary text-black p-3 rounded-full shadow-lg shadow-yellow-primary/50 hover:scale-110 active:scale-95 transition-all duration-300 group"
        aria-label="Open contact"
      >
        <UmbrellaIcon size={24} className="group-hover:rotate-12 transition-transform duration-300" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 animate-float-in">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-3 -right-3 w-8 h-8 bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-dark hover:text-yellow-primary transition-all duration-300 hover:scale-110"
          aria-label="Close CTA"
        >
          <CloseIcon size={14} />
        </button>

        {/* Main CTA card */}
        <Link
          to="/contact"
          className="group relative bg-dark-elevated backdrop-blur-xl border border-yellow-primary/30 rounded-2xl p-4 shadow-2xl shadow-yellow-primary/20 hover:shadow-yellow-primary/40 hover:scale-105 transition-all duration-300 flex items-center gap-4 max-w-xs"
        >
          {/* Umbrella icon with glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-primary/30 blur-xl rounded-full" />
            <UmbrellaIcon size={32} className="text-yellow-primary relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
          </div>

          {/* Text content */}
          <div className="flex flex-col">
            <span className="text-yellow-primary text-sm font-semibold tracking-wider uppercase mb-1">Let's Talk</span>
            <span className="text-white text-sm leading-tight">Book a discovery call</span>
          </div>

          {/* Arrow indicator */}
          <div className="w-8 h-8 bg-yellow-primary rounded-full flex items-center justify-center text-black ml-2 group-hover:translate-x-1 transition-transform duration-300">
            <span className="text-lg">→</span>
          </div>
        </Link>

        {/* Minimize button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute -top-3 -left-3 w-8 h-8 bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-dark hover:text-yellow-primary transition-all duration-300 hover:scale-110"
          aria-label="Minimize CTA"
        >
          <span className="text-xs">−</span>
        </button>
      </div>
    </div>
  );
}
