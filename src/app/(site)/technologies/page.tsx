import { getSettings, getTechGroups } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/ui/CtaBand';

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata({
    title: 'Technologies',
    description: 'The frameworks, languages, platforms and tools we use to build fast, secure and maintainable software.',
    path: '/technologies',
    settings,
  });
}

export default async function TechnologiesPage() {
  const [settings, groups] = await Promise.all([getSettings(), getTechGroups()]);
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title="A modern, proven stack — chosen for your problem, not our habits"
        text="We pick tools for reliability, hiring availability and long-term maintainability. Here is what we work with every day."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Technologies' }]}
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((g, i) => (
            <Reveal key={g.group} delay={(i % 2) * 0.06}>
              <div className="card h-full p-6 sm:p-8">
                <h2 className="text-xl font-semibold">{g.group}</h2>
                <p className="mt-2 text-sm text-muted">{g.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((t) => <li key={t} className="chip !text-sm">{t}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand settings={settings} title="Not sure which stack fits?" text="We will recommend an approach based on your goals, budget and team — and explain the trade-offs plainly." />
    </>
  );
}
