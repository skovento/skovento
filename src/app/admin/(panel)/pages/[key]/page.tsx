import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/cms/auth';
import { getRelOptions } from '@/lib/cms/admin-data';
import { getSingle } from '@/lib/cms/schema';
import { getSingleDoc } from '@/lib/cms/store';
import { EntityEditor } from '@/components/admin/EntityEditor';

export const dynamic = 'force-dynamic';

export default async function SingleEdit({ params }: { params: Promise<{ key: string }> }) {
  await requireAdmin();
  const { key } = await params;
  const def = getSingle(key);
  if (!def) notFound();
  const [doc, relOptions] = await Promise.all([getSingleDoc(key), getRelOptions()]);

  return (
    <div>
      <p className="mb-4 text-sm text-muted">{def.description}</p>
      <EntityEditor key={key} title={def.label} fields={def.fields} initial={doc} mode="single" endpoint={`/api/admin/single/${key}`} viewHref={def.publicPath} relOptions={relOptions} />
    </div>
  );
}
