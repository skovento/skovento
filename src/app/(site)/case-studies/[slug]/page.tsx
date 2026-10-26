import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getCaseStudies, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { breadcrumbs } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCaseStudies()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [settings, list] = await Promise.all([getSettings(), getCaseStudies()]);
  const c = list.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.summary, path: `/case-studies/${c.slug}`, settings });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const [settings, cases, services] = await Promise.all([getSettings(), getCaseStudies(), getAllServices()]);
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();
  const used = services.filter((s) => c.services.includes(s.slug));

  return (
    <>
      <PageHero eyebrow="Case study" title={c.title} text={c.summary} crumbs={[{ name: 'Home', href: '/' }, { name: 'Case Studies', href: '/case-studies' }, { name: c.title }]}>
        <p className="mt-6 flex flex-wrap gap-2">
          <span className="chip">{c.client}</span>
          {c.isSample && <span className="chip">Illustrative sample — no real client data</span>}
        </p>
      </PageHero>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <div><h2 className="text-2xl font-bold">The challenge</h2><p className="mt-4 text-lg leading-relaxed text-muted">{c.challenge}</p></div>
            <div><h2 className="text-2xl font-bold">What we built</h2><p className="mt-4 text-lg leading-relaxed text-muted">{c.solution}</p></div>
            <div>
              <h2 className="text-2xl font-bold">Outcomes</h2>
              <ul className="mt-5 space-y-3">
                {c.results.map((r) => <li key={r.label} className="card flex gap-3 p-4 text-sm"><Icon name="Check" size={18} className="mt-0.5 shrink-0 text-ok" />{r.metric && !c.isSample ? <span><strong className="text-fg">{r.metric}</strong> — {r.label}</span> : r.label}</li>)}
              </ul>
            </div>
          </div>
          <aside className="space-y-5">
            <div className="card p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-faint">Technologies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{c.techs.map((t) => <li key={t} className="chip !text-sm">{t}</li>)}</ul>
            </div>
            {used.length > 0 && (
              <div className="card p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-faint">Services involved</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {used.map((s) => <li key={s.slug}><Link href={`/services/${s.categorySlug}/${s.slug}`} className="inline-block py-1.5 text-muted hover:text-fg">{s.title}</Link></li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>
      <CtaBand settings={settings} title="Facing a similar problem?" />
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }, { name: c.title, path: `/case-studies/${c.slug}` }])} />
    </>
  );
}
