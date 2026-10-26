import Link from 'next/link';
import { getBlogs, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata({ title: 'Blog', description: 'Practical articles on custom software, web performance, technical SEO, AI automation and running digital projects well.', path: '/blog', settings });
}

const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default async function BlogPage() {
  const [settings, posts] = await Promise.all([getSettings(), getBlogs()]);
  return (
    <>
      <PageHero eyebrow="Blog" title="Practical notes on building software that works" text="Plain-language articles for founders and teams making technology decisions." crumbs={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((b) => (
            <Link key={b.slug} href={`/blog/${b.slug}`} className="card card-hover flex h-full flex-col p-6">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-2">{b.category}</span>
              <h2 className="mt-3 text-xl font-semibold leading-snug">{b.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{b.excerpt}</p>
              <p className="mt-5 text-xs text-faint"><time dateTime={b.publishedAt}>{fmt(b.publishedAt)}</time> · {b.readingMinutes} min read</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
