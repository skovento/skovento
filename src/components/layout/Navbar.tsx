import { getServiceCategories } from '@/lib/content';
import type { Settings } from '@/types/content';
import { NavbarClient } from './NavbarClient';

export async function Navbar({ settings }: { settings: Settings }) {
  const cats = await getServiceCategories();
  return (
    <NavbarClient
      name={settings.siteName}
      nav={settings.nav}
      categories={cats.map((c) => ({ slug: c.slug, title: c.title, icon: c.icon, summary: c.summary }))}
      ctaLabel={settings.cta.primaryLabel}
      ctaHref={settings.cta.primaryHref}
    />
  );
}
