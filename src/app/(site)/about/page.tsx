import { getAbout, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/ui/CtaBand';

export async function generateMetadata() {
  const [settings, about] = await Promise.all([getSettings(), getAbout()]);
  return pageMetadata({ title: 'About Us', description: about.intro, path: '/about', settings });
}

export default async function AboutPage() {
  const [settings, a] = await Promise.all([getSettings(), getAbout()]);
  return (
    <>
      <PageHero eyebrow="About us" title={a.headline} text={a.intro} crumbs={[{ name: 'Home', href: '/' }, { name: 'About' }]} />

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-6 sm:p-8"><p className="font-mono text-xs uppercase tracking-widest text-accent-2">Mission</p><p className="mt-3 text-lg leading-relaxed">{a.mission}</p></div>
          <div className="card p-6 sm:p-8"><p className="font-mono text-xs uppercase tracking-widest text-accent-2">Vision</p><p className="mt-3 text-lg leading-relaxed">{a.vision}</p></div>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow="Our story" title="Why we exist" />
            <p className="text-lg leading-relaxed text-muted">{a.story}</p>
          </div>
          <dl className="grid gap-4 self-start sm:grid-cols-2">
            {a.facts.map((f) => (
              <div key={f.label} className="card p-5"><dt className="font-mono text-xs uppercase tracking-widest text-faint">{f.label}</dt><dd className="mt-2 font-medium">{f.value}</dd></div>
            ))}
          </dl>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Values" title="How we work" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}><div className="card h-full p-6"><h3 className="font-semibold">{v.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p></div></Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading eyebrow="How we are different" title="What you can expect from us" />
        <div className="grid gap-5 md:grid-cols-3">
          {a.differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}><div className="card h-full p-6"><h3 className="font-semibold">{d.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p></div></Reveal>
          ))}
        </div>
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
