import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, Card, Button } from '../common';
import { siteContent } from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { posts, categories } = siteContent.blog;

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.blog-card');

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, activeCategory]);

  return (
    <Section background="black">
      {/* Category filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-yellow-primary text-black shadow-[0_0_20px_rgba(255,221,0,0.3)]'
                : 'bg-dark-elevated text-gray border border-dark-border hover:border-yellow-primary/50 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <Card className="group cursor-pointer h-full">
              {/* Image placeholder */}
              <div className="aspect-video bg-dark rounded-xl mb-5 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-primary/20 to-transparent" />
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-dim flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl text-yellow-primary">+</span>
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-yellow-dim text-yellow-primary rounded-full mb-4 uppercase tracking-wider">
                {post.category}
              </span>

              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-yellow-primary transition-colors duration-300 leading-tight">
                {post.title}
              </h3>
              <p className="text-gray text-sm mb-5 leading-relaxed">{post.excerpt}</p>
              <p className="text-xs text-gray/60 font-medium">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </Card>
          </div>
        ))}
      </div>

      {/* Newsletter signup */}
      <div className="mt-16 text-center">
        <div className="bg-dark-elevated rounded-2xl p-10 max-w-xl mx-auto border border-dark-border relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-primary/10 rounded-full blur-3xl" />

          <h3 className="text-2xl font-display font-bold text-white mb-3 relative">
            Stay in the Loop
          </h3>
          <p className="text-gray mb-6 relative">
            Get insights on tech, culture, and strategy delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full bg-dark border border-dark-border text-white placeholder-gray/50 focus:border-yellow-primary focus:outline-none focus:ring-2 focus:ring-yellow-primary/20 transition-all"
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
