import { requireAdmin } from '@/lib/cms/auth';
import { collections, singles } from '@/lib/cms/schema';
import { listDocs } from '@/lib/cms/store';
import { getSettings } from '@/lib/content';
import { AdminShell, type NavGroup } from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  const [leads, settings] = await Promise.all([listDocs('leads'), getSettings()]);
  const newLeads = leads.filter((l) => l.status === 'new').length;

  const groups: NavGroup[] = [
    { title: 'Overview', items: [{ label: 'Dashboard', href: '/admin' }, { label: 'Leads (CRM)', href: '/admin/leads', badge: newLeads }] },
    { title: 'Pages', items: singles.filter((s) => s.key !== 'settings').map((s) => ({ label: s.label, href: `/admin/pages/${s.key}` })) },
    { title: 'Content', items: collections.filter((c) => c.name !== 'leads').map((c) => ({ label: c.label, href: `/admin/content/${c.name}` })) },
    { title: 'Configuration', items: [{ label: 'Site Settings & SEO', href: '/admin/pages/settings' }] },
  ];

  return (
    <AdminShell groups={groups} email={session.email} siteName={settings.siteName}>
      {children}
    </AdminShell>
  );
}
