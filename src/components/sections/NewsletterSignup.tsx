import { useState } from 'react';
import { Button } from '../common';
import { siteContent } from '../../data/content';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card';
  showLeadMagnet?: boolean;
}

export function NewsletterSignup({
  variant = 'card',
  showLeadMagnet = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const { newsletter } = siteContent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 sm:py-3.5 bg-dark-elevated border border-dark-border rounded-lg text-white placeholder-gray focus:outline-none focus:border-yellow-primary transition-colors"
        />
        <Button type="submit" variant="primary" size="md">
          Subscribe
        </Button>
      </form>
    );
  }

  return (
    <div className="bg-dark-elevated rounded-2xl p-6 md:p-8 lg:p-10 border border-dark-border">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-4">
        {newsletter.headline}
      </h3>
      <p className="text-gray mb-6">{newsletter.description}</p>
      
      <ul className="space-y-2 mb-6 text-gray">
        {newsletter.benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-yellow-primary mt-1">•</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {showLeadMagnet && (
        <div className="mb-6 p-4 bg-yellow-dim rounded-lg border border-yellow-primary/20">
          <h4 className="font-semibold text-white mb-2">{newsletter.leadMagnet.title}</h4>
          <p className="text-sm text-gray">{newsletter.leadMagnet.description}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-3 sm:py-3.5 bg-black border border-dark-border rounded-lg text-white placeholder-gray focus:outline-none focus:border-yellow-primary transition-colors"
        />
        <Button type="submit" variant="primary" size="md">
          Subscribe
        </Button>
      </form>

      <p className="text-xs text-gray">{newsletter.frequency}</p>
    </div>
  );
}
