import { siteContent } from '../data/content';
import { PageHero, BlogGrid } from '../components/sections';

export function Blog() {
  const { hero } = siteContent.blog;

  return (
    <>
      <PageHero
        headline={hero.headline}
        subhead={hero.subhead}
        eyebrow="Insights"
      />
      <BlogGrid />
    </>
  );
}
