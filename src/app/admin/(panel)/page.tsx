import Link from 'next/link';
import { requireAdmin } from '@/lib/cms/auth';
import { collections } from '@/lib/cms/schema';
import { listDocs } from '@/lib/cms/store';
import { getSettings } from '@/lib/content';
import { isIndexable } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  await requireAdmin();
  const [settings, ...lists] = await Promise.all([getSettings(), ...collections.map((c) => listDocs(c.name))]);
  const counts = Object.fromEntries(collections.map((c, i) => [c.name, lists[i]]));
  const leads = (counts['leads'] ?? []) as Record<string, unknown>[];
  const recent = [...leads].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 5);
  const live = isIndexable(settings);
  const t = settings.tracking;
  const tracking = [['Tag Manager', t.gtmId], ['Analytics 4', t.ga4Id], ['Search Console', t.googleSiteVerification], ['Meta Pixel', t.metaPixelId], ['Clarity', t.clarityId]];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Everything on the website is edited from here.</p>
      </div>

      <div className={`rounded-2xl border p-5 ${live ? 'border-ok/40 bg-ok/10' : 'border-[#ffcf66]/40 bg-[#ffcf66]/10'}`}>
        <p className="font-semibold">{live ? 'Search engines can index this site' : 'Site is hidden from search engines'}</p>
        <p className="mt-1 text-sm text-muted">
          {live ? 'Indexing is ON. Pages, sitemap and robots.txt are visible to crawlers.' : 'Indexing is OFF: noindex + nofollow on every page, robots.txt blocks all crawlers, sitemap is empty.'}{' '}
          <Link href="/admin/pages/settings" className="text-accent underline">Change in Site Settings → SEO & indexing</Link>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['New leads', leads.filter((l) => l.status === 'new').length, '/admin/leads'],
          ['Total leads', leads.length, '/admin/leads'],
          ['Services', (counts['services'] ?? []).length, '/admin/content/services'],
          ['Blog posts', (counts['blogs'] ?? []).length, '/admin/content/blogs'],
        ].map(([label, n, href]) => (
          <Link key={String(label)} href={String(href)} className="card card-hover p-5">
            <p className="font-display text-3xl font-bold text-gradient">{String(n)}</p>
            <p className="mt-1 text-sm text-muted">{String(label)}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Latest enquiries</h2><Link href="/admin/leads" className="text-sm text-accent">View all</Link></div>
          {recent.length === 0 ? <p className="text-sm text-faint">No enquiries yet.</p> : (
            <ul className="divide-y divide-line">
              {recent.map((l) => (
                <li key={String(l.id)}>
                  <Link href={`/admin/content/leads/${l.id}`} className="flex items-center justify-between gap-3 py-3 hover:text-accent-2">
                    <span className="min-w-0"><span className="block truncate font-medium">{String(l.name)}</span><span className="block truncate text-xs text-faint">{String(l.service || l.email)}</span></span>
                    <span className="ad-badge shrink-0">{String(l.status).replace('_', ' ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card p-5">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Tracking status</h2><Link href="/admin/pages/settings" className="text-sm text-accent">Edit</Link></div>
          <ul className="space-y-2.5 text-sm">
            {tracking.map(([label, v]) => (
              <li key={label} className="flex items-center justify-between"><span className="text-muted">{label}</span><span className={v ? 'text-ok' : 'text-faint'}>{v ? 'Connected' : 'Not set'}</span></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
