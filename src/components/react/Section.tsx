import { BlurReveal } from './TextAnimations';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'black' | 'dark' | 'elevated';
  id?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export function Section({
  children,
  className = '',
  background = 'black',
  id,
  fullWidth = false,
  noPadding = false,
}: SectionProps) {
  const bgStyles = {
    black: 'bg-black',
    dark: 'bg-dark',
    elevated: 'bg-dark-elevated',
  };

  return (
    <section
      id={id}
      className={`${noPadding ? '' : 'py-16 md:py-24 lg:py-32'} ${bgStyles[background]} ${className}`}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          {children}
        </div>
      )}
    </section>
  );
}

interface SectionHeaderProps {
  headline: string;
  subhead?: string;
  centered?: boolean;
  className?: string;
  eyebrow?: string;
  animate?: boolean;
}

export function SectionHeader({
  headline,
  subhead,
  centered = true,
  className = '',
  eyebrow,
  animate = true,
}: SectionHeaderProps) {
  const content = (
    <div className={`mb-16 md:mb-20 ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-yellow-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
        {headline}
      </h2>
      {subhead && (
        <p className="text-lg md:text-xl text-gray max-w-3xl leading-relaxed mx-auto">
          {subhead}
        </p>
      )}
    </div>
  );

  if (animate) {
    return (
      <BlurReveal>
        {content}
      </BlurReveal>
    );
  }

  return content;
}

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`py-12 ${className}`}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <hr className="border-dark-border" />
      </div>
    </div>
  );
}
