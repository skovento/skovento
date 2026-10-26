import { getLegal, getSettings } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { Markdown } from '@/components/ui/Markdown';

export async function generateMetadata() {
  const [settings, doc] = await Promise.all([getSettings(), getLegal('privacy')]);
  return pageMetadata({ title: doc.title, description: 'How we collect, use and protect the information you share with us.', path: '/privacy', settings });
}

export default async function PrivacyPage() {
  const doc = await getLegal('privacy');
  return (
    <>
      <PageHero title={doc.title} crumbs={[{ name: 'Home', href: '/' }, { name: doc.title }]} />
      <Section><Container className="max-w-3xl !px-0"><Markdown source={doc.body} /></Container></Section>
    </>
  );
}
