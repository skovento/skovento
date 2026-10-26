import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/cms/auth';
import { getCollection } from '@/lib/cms/schema';
import { listDocs } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export default async function ContentList({ params }: { params: Promise<{ col: string }> }) {
  await requireAdmin();
  const { col } = await params;
  const def = getCollection(col);
  if (!def) notFound();
  if (col === 'leads') redirect('/admin/leads');

  const items = await listDocs(col);
  const sort = def.sort;
  const sorted = [...items].sort((a, b) => {
    if (!sort) return 0;
    const av = (a as Record<string, unknown>)[sort.field], bv = (b as Record<string, unknown>)[sort.field];
    const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''));
    return sort.dir === 'asc' ? cmp : -cmp;
  });
  const colFields = (def.columns ?? []).map((c) => def.fields.find((f) => f.name === c)).filter(Boolean);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{def.label}</h1>
          <p className="mt-1 text-sm text-muted">{def.description}</p>
        </div>
        {!def.noCreate && <Link href={`/admin/content/${col}/new`} className="btn btn-primary !min-h-10 !text-sm">+ New {def.singular}</Link>}
      </div>

      <div className="card overflow-hidden">
        {sorted.length === 0 ? (
          <p className="p-8 text-center text-muted">Nothing here yet. Create the first {def.singular}.</p>
        ) : (
          <ul className="divide-y divide-line">
            {sorted.map((it) => {
              const r = it as Record<string, unknown>;
              return (
                <li key={it.id}>
                  <Link href={`/admin/content/${col}/${it.id}`} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-raised/60">
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{String(r[def.titleField] || it.id)}</span>
                      <span className="block truncate font-mono text-xs text-faint">{it.id}</span>
                    </span>
                    <span className="hidden shrink-0 items-center gap-2 sm:flex">
                      {colFields.map((f) => {
                        const v = r[f!.name];
                        if (v === undefined || v === '' || v === null) return null;
                        const label = typeof v === 'boolean' ? (v ? f!.label.split(' (')[0] : null) : String(v);
                        return label ? <span key={f!.name} className="ad-badge">{label}</span> : null;
                      })}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
