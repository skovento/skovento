import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/cms/auth';
import { getRelOptions } from '@/lib/cms/admin-data';
import { getCollection } from '@/lib/cms/schema';
import { getDoc } from '@/lib/cms/store';
import { EntityEditor } from '@/components/admin/EntityEditor';

export const dynamic = 'force-dynamic';

export default async function ContentEdit({ params }: { params: Promise<{ col: string; id: string }> }) {
  await requireAdmin();
  const { col, id } = await params;
  const def = getCollection(col);
  if (!def) notFound();
  const isNew = id === 'new';
  if (isNew && def.noCreate) notFound();

  const doc = isNew ? null : await getDoc(col, id);
  if (!isNew && !doc) notFound();
  const relOptions = await getRelOptions();

  const initial: Record<string, unknown> = isNew
    ? col === 'blogs' ? { published: false, publishedAt: new Date().toISOString().slice(0, 10), readingMinutes: 5 }
      : col === 'projects' || col === 'case-studies' ? { isSample: true } : {}
    : (doc as Record<string, unknown>);

  const publicHref = !isNew && def.publicPath
    ? def.publicPath.replace(/\{(\w+)\}/g, (_, k) => String(k === 'id' ? id : initial[k] ?? ''))
    : undefined;

  return (
    <EntityEditor
      key={`${col}/${id}`}
      title={isNew ? `New ${def.singular}` : String(initial[def.titleField] || id)}
      fields={def.fields}
      initial={initial}
      mode={isNew ? 'new' : 'edit'}
      endpoint={isNew ? `/api/admin/c/${col}` : `/api/admin/c/${col}/${id}`}
      backHref={col === 'leads' ? '/admin/leads' : `/admin/content/${col}`}
      viewHref={publicHref}
      relOptions={relOptions}
    />
  );
}
