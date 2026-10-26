import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllServices, getCaseStudies, getHome, getIndustries, getSettings } from '@/lib/content';
import { absoluteUrl, pageMetadata } from '@/lib/site';
import { breadcrumbs, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { FaqList } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';

type Props = { params: Promise<{ category: string; service: string }> };

export async function generateStaticParams() {
  return (await getAllServices()).map((s) => ({ category: s.categorySlug, service: s.slug }));
}

async function load(p: Props['params']) {
  const { category, service } = await p;
  const all = await getAllServices();
  return all.find((s) => s.slug === service && s.categorySlug === category);
}

export async function generateMetadata({ params }: Props) {
  const [settings, s] = await Promise.all([getSettings(), load(params)]);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.summary, path: `/services/${s.categorySlug}/${s.slug}`, settings });
}

export default async function ServicePage({ params }: Props) {
  const [settings, s, industries, caseStudies, home] = await Promise.all([getSettings(), load(params), getIndustries(), getCaseStudies(), getHome()]);
  if (!s) notFound();

  const path = `/services/${s.categorySlug}/${s.slug}`;
  const relatedIndustries = industries.filter((i) => i.relatedServices.includes(s.slug));
  const relatedCases = caseStudies.filter((c) => c.services.includes(s.slug));

  return (
    <>
      <PageHero
        eyebrow={s.categoryTitle}
        title={s.title}
        text={s.summary}
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: s.categoryTitle, href: `/services/${s.categorySlug}` }, { name: s.title }]}
      >
        <div className="mt-8"><Link href={settings.cta.primaryHref} className="btn btn-primary">Discuss this service<Icon name="ArrowRight" size={18} /></Link></div>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{s.description}</p>
            <h2 className="mt-10 text-2xl font-bold">What you get</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.deliverables.map((d) => (
                <li key={d} className="card flex gap-3 p-4 text-sm"><Icon name="Check" size={18} className="mt-0.5 shrink-0 text-ok" />{d}</li>
              ))}
            </ul>
          </div>
          <aside className="space-y-5">
            <div className="card p-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-faint">Technologies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">{s.techs.map((t) => <li key={t} className="chip !text-sm">{t}</li>)}</ul>
            </div>
            {relatedIndustries.length > 0 && (
              <div className="card p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-faint">Relevant industries</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {relatedIndustries.map((i) => (
                    <li key={i.slug}><Link href={`/industries/${i.slug}`} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Icon name={i.icon} size={16} className="text-accent-2" />{i.title}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <SectionHeading eyebrow="Process" title="How we deliver it" />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {home.process.map((p) => (
            <li key={p.step} className="card p-6">
              <span className="font-mono text-sm text-accent-2">{p.step}</span>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {relatedCases.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Case studies" title="Related examples" />
          <div className="grid gap-5 md:grid-cols-2">
            {relatedCases.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="card card-hover p-6">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.summary}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {s.faqs.length > 0 && (
        <Section className="pt-0 sm:pt-0">
          <SectionHeading eyebrow="FAQ" title={`${s.title}: common questions`} />
          <div className="max-w-3xl"><FaqList faqs={s.faqs} /></div>
        </Section>
      )}
      <CtaBand settings={settings} />
      <JsonLd data={breadcrumbs(settings, [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: s.categoryTitle, path: `/services/${s.categorySlug}` }, { name: s.title, path }])} />
      {s.faqs.length > 0 && <JsonLd data={faqSchema(s.faqs)} />}
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.summary, url: absoluteUrl(settings, path), provider: { '@id': absoluteUrl(settings, '/#organization') } }} />
    </>
  );
}
