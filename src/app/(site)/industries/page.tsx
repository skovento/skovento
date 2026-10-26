import Link from 'next/link';
import { getIndustries, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { CtaBand } from '@/components/ui/CtaBand';
import { Photo } from '@/components/ui/Photo';

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata({
    title: 'Industries',
    description: 'Software and digital solutions for healthcare, retail, education, real estate, logistics, hospitality, manufacturing, professional services and startups.',
    path: '/industries',
    settings,
  });
}

export default async function IndustriesPage() {
  const [settings, industries] = await Promise.all([getSettings(), getIndustries()]);
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="We adapt the solution to your sector"
        text="Every industry has its own workflows, regulations and customers. These are the sectors we build for."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Industries' }]}
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="card card-hover flex h-full flex-col p-6">
              {i.image && <Photo src={i.image} alt={i.imageAlt ?? i.title} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" rounded={false} className="-mx-6 -mt-6 mb-5 rounded-t-[15px]" />}
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-base text-accent-2"><Icon name={i.icon} /></span>
              <h2 className="text-xl font-semibold">{i.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{i.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">Explore <Icon name="ArrowRight" size={14} /></span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand settings={settings} title="Your industry not listed?" text="We regularly work with sectors beyond this list. Tell us about your business and we will tell you honestly whether we are the right fit." />
    </>
  );
}
