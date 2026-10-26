import Link from 'next/link';
import { getServiceCategories, getSettings } from '@/lib/content';
import { breadcrumbs } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata({
    title: 'Services',
    description: 'Web engineering, mobile apps, AI automation, business software, design, cloud and technical SEO — organised by what you need to achieve.',
    path: '/services',
    settings,
  });
}

export default async function ServicesPage() {
  const [settings, categories] = await Promise.all([getSettings(), getServiceCategories()]);
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Services organised around what you need to achieve"
        text="Pick a category to explore the individual services inside it, or talk to us and we will assemble the right combination."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.slug}><a href={`#${c.slug}`} className="chip !text-sm hover:text-fg">{c.title}</a></li>
          ))}
        </ul>
      </PageHero>

      <Section className="space-y-16 sm:space-y-24">
        {categories.map((c) => (
          <div key={c.slug} id={c.slug} className="scroll-mt-28">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface text-accent-2"><Icon name={c.icon} size={22} /></span>
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">{c.title}</h2>
                  <p className="mt-2 max-w-2xl text-muted">{c.summary}</p>
                </div>
              </div>
              <Link href={`/services/${c.slug}`} className="btn btn-ghost shrink-0 self-start">Category overview<Icon name="ArrowRight" size={16} /></Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.services.map((s) => (
                <Link key={s.slug} href={`/services/${c.slug}/${s.slug}`} className="card card-hover flex h-full flex-col p-6">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">Learn more <Icon name="ArrowRight" size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Section>
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
    </>
  );
}
