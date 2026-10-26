import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getCaseStudies, getIndustries, getProjects, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { breadcrumbs } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';
import { Photo } from '@/components/ui/Photo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getIndustries()).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [settings, list] = await Promise.all([getSettings(), getIndustries()]);
  const i = list.find((x) => x.slug === slug);
  if (!i) return {};
  return pageMetadata({ title: `${i.title} Software & Digital Solutions`, description: i.summary, path: `/industries/${i.slug}`, settings, image: i.image });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const [settings, industries, services, projects, cases] = await Promise.all([getSettings(), getIndustries(), getAllServices(), getProjects(), getCaseStudies()]);
  const i = industries.find((x) => x.slug === slug);
  if (!i) notFound();

  const related = services.filter((s) => i.relatedServices.includes(s.slug));
  const relatedProjects = projects.filter((p) => p.industry === i.slug);
  const relatedCases = cases.filter((c) => c.industry === i.slug);

  return (
    <>
      <PageHero eyebrow="Industry" title={i.title} text={i.summary} crumbs={[{ name: 'Home', href: '/' }, { name: 'Industries', href: '/industries' }, { name: i.title }]} />
      {i.image && (
        <Section className="pb-0 pt-10 sm:pb-0 sm:pt-14">
          <Photo src={i.image} alt={i.imageAlt ?? i.title} sizes="(min-width: 1280px) 1216px, 100vw" priority ratio="21 / 9" />
        </Section>
      )}
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Common challenges</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {i.challenges.map((c) => <li key={c} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />{c}</li>)}
            </ul>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-semibold">How we help</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {i.solutions.map((c) => <li key={c} className="flex gap-3"><Icon name="Check" size={18} className="mt-0.5 shrink-0 text-ok" />{c}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-line bg-surface/40">
          <SectionHeading eyebrow="Services" title={`Services most relevant to ${i.title.toLowerCase()}`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.categorySlug}/${s.slug}`} className="card card-hover p-6">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.summary}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {(relatedProjects.length > 0 || relatedCases.length > 0) && (
        <Section>
          <SectionHeading eyebrow="Proof" title="Related work" />
          <div className="grid gap-4 md:grid-cols-2">
            {relatedProjects.map((p) => <Link key={p.slug} href={`/projects/${p.slug}`} className="card card-hover p-6"><span className="chip mb-3">Project</span><h3 className="font-semibold">{p.title}</h3><p className="mt-2 text-sm text-muted">{p.summary}</p></Link>)}
            {relatedCases.map((c) => <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card card-hover p-6"><span className="chip mb-3">Case study</span><h3 className="font-semibold">{c.title}</h3><p className="mt-2 text-sm text-muted">{c.summary}</p></Link>)}
          </div>
        </Section>
      )}
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }, { name: i.title, path: `/industries/${i.slug}` }])} />
    </>
  );
}
