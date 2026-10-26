import { revalidatePath } from 'next/cache';
import { guardApi } from '@/lib/cms/auth';
import { getCollection } from '@/lib/cms/schema';
import { cleanObject, slugify } from '@/lib/cms/sanitize';
import { listDocs, saveDoc } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
type Ctx = { params: Promise<{ col: string }> };

export async function GET(request: Request, { params }: Ctx) {
  const denied = await guardApi(request);
  if (denied) return denied;
  const { col } = await params;
  if (!getCollection(col)) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ data: await listDocs(col) });
}

/** Create a new item. The id (URL slug) is generated from the title unless one is given. */
export async function POST(request: Request, { params }: Ctx) {
  const denied = await guardApi(request, { mutating: true });
  if (denied) return denied;
  const { col } = await params;
  const def = getCollection(col);
  if (!def || def.noCreate) return Response.json({ error: 'Not found' }, { status: 404 });
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: 'Invalid body' }, { status: 400 });

  const errors: string[] = [];
  const data = cleanObject(def.fields, body, errors);
  if (errors.length) return Response.json({ error: errors[0], errors }, { status: 400 });

  const existing = new Set((await listDocs(col)).map((d) => d.id));
  const base = slugify(String(body.id || data[def.slugFrom ?? def.titleField] || '')) || 'item';
  let id = base, n = 2;
  while (existing.has(id)) id = `${base}-${n++}`;

  await saveDoc(col, { id, ...data });
  revalidatePath('/', 'layout');
  return Response.json({ ok: true, id });
}
