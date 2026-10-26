import Link from 'next/link';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import type { BlogPost, HomeContent, Industry, Project, ServiceCategory, Settings, TechGroup } from '@/types/content';
import { HeroVisual } from './HeroVisual';

export function Hero({ home, settings }: { home: HomeContent; settings: Settings }) {
  const h = home.hero;
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="chip mb-6"><span className="h-1.5 w-1.5 rounded-full bg-ok" />{h.eyebrow}</p>
          <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            {h.titleLead} <span className="text-gradient">{h.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{h.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={settings.cta.primaryHref} className="btn btn-primary">{settings.cta.primaryLabel}<Icon name="ArrowRight" size={18} /></Link>
            <Link href={settings.cta.secondaryHref} className="btn btn-ghost">{settings.cta.secondaryLabel}</Link>
          </div>
        </div>
        <HeroVisual lines={h.terminalLines} />
      </Container>
    </section>
  );
}

export function StatsBar({ stats }: { stats: HomeContent['stats'] }) {
  return (
    <section className="border-y border-line bg-surface/40">
      <Container className="grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

export function ServicesPreview({ categories }: { categories: ServiceCategory[] }) {
  return (
    <Section>
      <SectionHeading eyebrow="Services" title="Everything you need to plan, build and run your product" text="Seven service areas, one accountable team. Start with one or combine them." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <div className="card card-hover flex h-full flex-col p-6">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-base text-accent-2"><Icon name={c.icon} /></span>
              <h3 className="text-xl font-semibold"><Link href={`/services/${c.slug}`} className="hover:text-accent-2">{c.title}</Link></h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.summary}</p>
              <ul className="mt-4 flex-1 space-y-0.5 text-sm">
                {c.services.map((s) => (
                  <li key={s.slug}><Link href={`/services/${c.slug}/${s.slug}`} className="inline-flex min-h-8 items-center gap-1.5 py-1 text-muted hover:text-fg"><Icon name="ArrowRight" size={13} className="text-accent-2" />{s.title}</Link></li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function TechMarquee({ groups }: { groups: TechGroup[] }) {
  const items = groups.flatMap((g) => g.items);
  const row = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-line bg-surface/40 py-6" aria-label="Technologies we work with">
      <div className="marquee-track gap-3 pr-3" aria-hidden="true">
        {row.map((t, i) => <span key={`${t}-${i}`} className="chip mr-3 whitespace-nowrap !text-sm">{t}</span>)}
      </div>
    </section>
  );
}

export function Pillars({ pillars }: { pillars: HomeContent['pillars'] }) {
  return (
    <Section>
      <SectionHeading eyebrow="Why Skovento" title="Engineering discipline you can verify" align="center" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <div className="card h-full p-6">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent"><Icon name={p.icon} /></span>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Process({ steps }: { steps: HomeContent['process'] }) {
  return (
    <Section className="border-y border-line bg-surface/40">
      <SectionHeading eyebrow="How we work" title="A delivery process that keeps you in control" />
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.step}>
            <Reveal delay={i * 0.07} className="h-full">
              <div className="card relative h-full p-6">
                <span className="font-mono text-sm text-accent-2">{s.step}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function IndustriesPreview({ industries }: { industries: Industry[] }) {
  return (
    <Section>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Industries" title="Software shaped around your sector" />
        <Link href="/industries" className="btn btn-ghost mb-10 sm:mb-14">All industries<Icon name="ArrowRight" size={16} /></Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {industries.slice(0, 10).map((i) => (
          <Link key={i.slug} href={`/industries/${i.slug}`} className="card card-hover flex flex-col items-start gap-3 p-5">
            <Icon name={i.icon} className="text-accent-2" size={24} />
            <span className="text-sm font-semibold leading-snug">{i.title}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  return (
    <Section className="border-t border-line bg-surface/40">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Projects" title="Recent work and sample builds" />
        <Link href="/projects" className="btn btn-ghost mb-10 sm:mb-14">All projects<Icon name="ArrowRight" size={16} /></Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.slice(0, 3).map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="card card-hover flex h-full flex-col p-6">
            {p.isSample && <span className="chip mb-4 self-start">Sample project</span>}
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
            <p className="mt-5 flex flex-wrap gap-1.5">{p.techs.slice(0, 3).map((t) => <span key={t} className="chip">{t}</span>)}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <Section>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Insights" title="Practical notes on building software" />
        <Link href="/blog" className="btn btn-ghost mb-10 sm:mb-14">All articles<Icon name="ArrowRight" size={16} /></Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.slice(0, 3).map((b) => (
          <Link key={b.slug} href={`/blog/${b.slug}`} className="card card-hover flex h-full flex-col p-6">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-2">{b.category}</span>
            <h3 className="mt-3 text-lg font-semibold leading-snug">{b.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{b.excerpt}</p>
            <p className="mt-5 text-xs text-faint">{b.readingMinutes} min read</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
