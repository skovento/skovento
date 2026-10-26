import Link from 'next/link';
import { getCaseStudies, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata({ title: 'Case Studies', description: 'How we approach real business problems: the challenge, the solution we built and what changed.', path: '/case-studies', settings });
}

export default async function CaseStudiesPage() {
  const [settings, cases] = await Promise.all([getSettings(), getCaseStudies()]);
  return (
    <>
      <PageHero eyebrow="Case studies" title="Problems solved, explained plainly" text="Each case study covers the challenge, what we built and what changed for the business." crumbs={[{ name: 'Home', href: '/' }, { name: 'Case Studies' }]} />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {cases.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card card-hover flex h-full flex-col p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {c.isSample && <span className="chip">Sample case study</span>}
                <span className="chip">{c.client}</span>
              </div>
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p className="mt-2 flex-1 text-muted">{c.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">Read case study <Icon name="ArrowRight" size={14} /></span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
