import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceCategories, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { breadcrumbs } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return (await getServiceCategories()).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const [settings, cats] = await Promise.all([getSettings(), getServiceCategories()]);
  const c = cats.find((x) => x.slug === category);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.summary, path: `/services/${c.slug}`, settings });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const [settings, cats] = await Promise.all([getSettings(), getServiceCategories()]);
  const c = cats.find((x) => x.slug === category);
  if (!c) notFound();

  return (
    <>
      <PageHero
        eyebrow="Service category"
        title={c.title}
        text={c.description}
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: c.title }]}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {c.services.map((s) => (
            <Link key={s.slug} href={`/services/${c.slug}/${s.slug}`} className="card card-hover flex h-full flex-col p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted">{s.summary}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted">
                {s.deliverables.slice(0, 3).map((d) => (
                  <li key={d} className="flex gap-2"><Icon name="Check" size={16} className="mt-0.5 shrink-0 text-ok" />{d}</li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">View service <Icon name="ArrowRight" size={14} /></span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: c.title, path: `/services/${c.slug}` }])} />
    </>
  );
}
