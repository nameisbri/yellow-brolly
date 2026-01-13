import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  magnetic?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  magnetic = true,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !buttonRef.current || !magnetic) return;

    const button = buttonRef.current;
    const boundingRect = { current: button.getBoundingClientRect() };

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent;
      const { clientX, clientY } = mouseEvent;
      const { left, top, width, height } = boundingRect.current;

      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      boundingRect.current = button.getBoundingClientRect();
      gsap.to(button, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, magnetic]);

  // Corporate innovation style - sharp corners with subtle chamfer
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black overflow-hidden group';

  const variantStyles = {
    primary:
      'bg-yellow-primary text-black hover:bg-yellow-hover border-2 border-yellow-primary hover:border-yellow-hover',
    secondary:
      'bg-transparent text-white border-2 border-dark-border hover:border-yellow-primary hover:text-yellow-primary',
    outline:
      'bg-transparent border-2 border-yellow-primary text-yellow-primary hover:bg-yellow-primary hover:text-black',
    ghost:
      'bg-transparent text-gray hover:text-yellow-primary border-2 border-transparent hover:border-yellow-primary/30',
  };

  const sizeStyles = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-sm',
  };

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-yellow-hover translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      )}
      {variant === 'outline' && (
        <span className="absolute inset-0 bg-yellow-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      )}
      {/* Corner accents for corporate feel */}
      <span className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  if (to) {
    return (
      <Link
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        to={to}
        className={combinedStyles}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={combinedStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {content}
    </button>
  );
}
