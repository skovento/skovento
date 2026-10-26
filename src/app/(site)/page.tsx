import { getBlogs, getHome, getIndustries, getProjects, getServiceCategories, getSettings, getTechGroups } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section, SectionHeading } from '@/components/ui/Section';
import { FaqList } from '@/components/ui/Faq';
import { CtaBand } from '@/components/ui/CtaBand';
import { BlogPreview, Hero, IndustriesPreview, Pillars, Process, ProjectsPreview, ServicesPreview, StatsBar, TechMarquee } from '@/components/sections/HomeSections';

export async function generateMetadata() {
  const settings = await getSettings();
  return pageMetadata({
    title: `${settings.siteName} — ${settings.tagline}`,
    description: settings.description,
    path: '/',
    settings,
  });
}

export default async function HomePage() {
  const [settings, home, categories, industries, projects, posts, tech] = await Promise.all([
    getSettings(), getHome(), getServiceCategories(), getIndustries(), getProjects(), getBlogs(), getTechGroups(),
  ]);
  return (
    <>
      <Hero home={home} settings={settings} />
      <StatsBar stats={home.stats} />
      <ServicesPreview categories={categories} />
      <TechMarquee groups={tech} />
      <Pillars pillars={home.pillars} />
      <Process steps={home.process} />
      <IndustriesPreview industries={industries} />
      <ProjectsPreview projects={projects} />
      <BlogPreview posts={posts} />
      <Section className="pt-0 sm:pt-0">
        <SectionHeading eyebrow="FAQ" title="Questions we hear often" />
        <div className="max-w-3xl"><FaqList faqs={home.faqs} /></div>
      </Section>
      <CtaBand settings={settings} />
      <JsonLd data={faqSchema(home.faqs)} />
    </>
  );
}
