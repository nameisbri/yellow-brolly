import { Link } from 'react-router-dom';
import { siteContent } from '../../data/content';
import { UmbrellaIcon, MarqueeText } from '../common';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-dark-border">
      {/* Marquee */}
      <div className="py-6 border-b border-dark-border overflow-hidden">
        <MarqueeText speed={40} className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display text-dark-border select-none tracking-wider">
          <span className="mx-6 text-yellow-primary">DIGITAL STRATEGY</span>
          <span className="mx-6">•</span>
          <span className="mx-6">TECHNOLOGY-FORWARD</span>
          <span className="mx-6">•</span>
          <span className="mx-6 text-yellow-primary">HUMAN-FIRST</span>
          <span className="mx-6">•</span>
          <span className="mx-6">SECURE BY DESIGN</span>
          <span className="mx-6">•</span>
          <span className="mx-6 text-yellow-primary">AI INTEGRATION</span>
          <span className="mx-6">•</span>
          <span className="mx-6">BRAND & CULTURE</span>
          <span className="mx-6">•</span>
          <span className="mx-6 text-yellow-primary">WORKFLOW AUTOMATION</span>
          <span className="mx-6">•</span>
          <span className="mx-6">CLARITY OVER COMPLEXITY</span>
          <span className="mx-6">•</span>
          <span className="mx-6 text-yellow-primary">CYBERSECURITY</span>
          <span className="mx-6">•</span>
          <span className="mx-6">PEOPLE-FIRST TECH</span>
          <span className="mx-6">•</span>
          <span className="mx-6 text-yellow-primary">STRATEGIC OUTCOMES</span>
          <span className="mx-6">•</span>
          <span className="mx-6">DIGITAL READINESS</span>
          <span className="mx-6">•</span>
          <span className="mx-6 text-yellow-primary">SCALE YOUR BUSINESS</span>
          <span className="mx-6">•</span>
        </MarqueeText>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <UmbrellaIcon size={40} className="text-yellow-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="font-display font-bold text-2xl text-white">
                {siteContent.brand.name}
              </span>
            </Link>
            <p className="text-gray max-w-md text-lg leading-relaxed">
              {siteContent.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 text-lg">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {siteContent.navigation.slice(0, 4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray hover:text-yellow-primary transition-colors duration-300 hover:translate-x-1 transform inline-block py-2 min-h-[48px] flex items-center"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 text-lg">More</h4>
            <nav className="flex flex-col gap-3">
              {siteContent.navigation.slice(4).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray hover:text-yellow-primary transition-colors duration-300 hover:translate-x-1 transform inline-block py-2 min-h-[48px] flex items-center"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-dark-border mt-12 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray/60 text-sm">
            © {currentYear} {siteContent.brand.name}. All rights reserved.
          </p>
          <div className="flex gap-6 sm:gap-8">
            {siteContent.footer.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray/60 hover:text-yellow-primary text-sm transition-colors duration-300 py-2 min-h-[48px] inline-flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
