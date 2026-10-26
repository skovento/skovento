import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getIndustries, getProjects, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { breadcrumbs } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [settings, list] = await Promise.all([getSettings(), getProjects()]);
  const p = list.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/projects/${p.slug}`, settings });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [settings, projects, industries, services] = await Promise.all([getSettings(), getProjects(), getIndustries(), getAllServices()]);
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const industry = industries.find((i) => i.slug === p.industry);
  const used = services.filter((s) => p.services.includes(s.slug));

  return (
    <>
      <PageHero eyebrow={industry?.title ?? 'Project'} title={p.title} text={p.summary} crumbs={[{ name: 'Home', href: '/' }, { name: 'Projects', href: '/projects' }, { name: p.title }]}>
        {p.isSample && <p className="chip mt-6">Sample project — illustrative, not a named client</p>}
      </PageHero>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">About this project</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{p.description}</p>
            <h2 className="mt-10 text-2xl font-bold">Highlights</h2>
            <ul className="mt-5 space-y-3">
              {p.highlights.map((h) => <li key={h} className="card flex gap-3 p-4 text-sm"><Icon name="Check" size={18} className="mt-0.5 shrink-0 text-ok" />{h}</li>)}
            </ul>
          </div>
          <aside className="space-y-5">
            <div className="card p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-faint">Technologies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{p.techs.map((t) => <li key={t} className="chip !text-sm">{t}</li>)}</ul>
            </div>
            {used.length > 0 && (
              <div className="card p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-faint">Services involved</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {used.map((s) => <li key={s.slug}><Link href={`/services/${s.categorySlug}/${s.slug}`} className="text-muted hover:text-fg">{s.title}</Link></li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>
      <CtaBand settings={settings} title="Want something similar?" />
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: p.title, path: `/projects/${p.slug}` }])} />
    </>
  );
}
