import Link from 'next/link';
import { getIndustries, getProjects, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { CtaBand } from '@/components/ui/CtaBand';
import { Photo } from '@/components/ui/Photo';

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata({ title: 'Projects', description: 'Selected projects and sample builds across web platforms, mobile apps, CRM, e-commerce and AI automation.', path: '/projects', settings });
}

export default async function ProjectsPage() {
  const [settings, projects, industries] = await Promise.all([getSettings(), getProjects(), getIndustries()]);
  const name = (slug: string) => industries.find((i) => i.slug === slug)?.title;
  const img = (p: { coverImage?: string; industry: string }) => p.coverImage || industries.find((i) => i.slug === p.industry)?.image;
  return (
    <>
      <PageHero eyebrow="Projects" title="Things we build" text="A selection of projects and sample builds showing the kind of products we deliver." crumbs={[{ name: 'Home', href: '/' }, { name: 'Projects' }]} />
      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="card card-hover flex h-full flex-col p-6">
              {img(p) && <Photo src={img(p)!} alt={p.coverAlt ?? p.title} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" rounded={false} className="-mx-6 -mt-6 mb-5 rounded-t-[15px]" />}
              <div className="mb-4 flex flex-wrap gap-2">
                {p.isSample && <span className="chip">Sample project</span>}
                {name(p.industry) && <span className="chip">{name(p.industry)}</span>}
              </div>
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <p className="mt-5 flex flex-wrap gap-1.5">{p.techs.map((t) => <span key={t} className="chip">{t}</span>)}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
