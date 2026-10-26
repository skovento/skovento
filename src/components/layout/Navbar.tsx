import { getServiceCategories } from '@/lib/content';
import type { Settings } from '@/types/content';
import { Icon } from '@/components/ui/Icon';
import { NavbarClient } from './NavbarClient';

export async function Navbar({ settings }: { settings: Settings }) {
  const cats = await getServiceCategories();
  return (
    <NavbarClient
      name={settings.siteName}
      nav={settings.nav}
      categories={cats.map((c) => ({ slug: c.slug, title: c.title, summary: c.summary, iconNode: <Icon name={c.icon} size={18} /> }))}
      ctaLabel={settings.cta.primaryLabel}
      ctaHref={settings.cta.primaryHref}
    />
  );
}
