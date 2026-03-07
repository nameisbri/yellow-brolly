import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, Card } from '../common';
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
                ? 'bg-yellow-primary text-black'
                : 'bg-dark-elevated text-gray border border-dark-border hover:border-dark-border/80 hover:text-white'
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
                <div className="absolute inset-0 bg-gradient-to-br from-dark-border/30 to-transparent" />
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-dark-border/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl text-light-gray">+</span>
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-dark-border/40 text-light-gray rounded-full mb-4 uppercase tracking-wider">
                {post.category}
              </span>

              <h3 className="text-xl font-display font-bold text-white mb-3 leading-tight">
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

    </Section>
  );
}
