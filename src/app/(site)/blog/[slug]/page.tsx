import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogs, getSettings } from '@/lib/content';
import { absoluteUrl, pageMetadata } from '@/lib/site';
import { breadcrumbs } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { Markdown } from '@/components/ui/Markdown';
import { CtaBand } from '@/components/ui/CtaBand';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getBlogs()).map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [settings, posts] = await Promise.all([getSettings(), getBlogs()]);
  const b = posts.find((x) => x.slug === slug);
  if (!b) return {};
  return pageMetadata({ title: b.title, description: b.excerpt, path: `/blog/${b.slug}`, settings, type: 'article' });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [settings, posts] = await Promise.all([getSettings(), getBlogs()]);
  const b = posts.find((x) => x.slug === slug);
  if (!b) notFound();
  const more = posts.filter((x) => x.slug !== b.slug).slice(0, 2);

  return (
    <>
      <PageHero eyebrow={b.category} title={b.title} text={b.excerpt} crumbs={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: b.title }]}>
        <p className="mt-6 text-sm text-faint"><time dateTime={b.publishedAt}>{new Date(b.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</time> · {b.readingMinutes} min read</p>
      </PageHero>
      <Section>
        <Container className="max-w-3xl !px-0">
          <article><Markdown source={b.body} /></article>
          {b.tags.length > 0 && <ul className="mt-10 flex flex-wrap gap-2">{b.tags.map((t) => <li key={t} className="chip">#{t}</li>)}</ul>}
        </Container>
      </Section>
      {more.length > 0 && (
        <Section className="border-t border-line bg-surface/40">
          <h2 className="mb-6 text-2xl font-bold">Keep reading</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {more.map((m) => <Link key={m.slug} href={`/blog/${m.slug}`} className="card card-hover p-6"><h3 className="font-semibold">{m.title}</h3><p className="mt-2 text-sm text-muted">{m.excerpt}</p></Link>)}
          </div>
        </Section>
      )}
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: b.title, path: `/blog/${b.slug}` }])} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: b.title, description: b.excerpt, datePublished: b.publishedAt, mainEntityOfPage: absoluteUrl(settings, `/blog/${b.slug}`), publisher: { '@id': absoluteUrl(settings, '/#organization') } }} />
    </>
  );
}
