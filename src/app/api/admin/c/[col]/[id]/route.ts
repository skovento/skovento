import { revalidatePath } from 'next/cache';
import { guardApi } from '@/lib/cms/auth';
import { getCollection } from '@/lib/cms/schema';
import { cleanObject } from '@/lib/cms/sanitize';
import { deleteDoc, getDoc, saveDoc } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
type Ctx = { params: Promise<{ col: string; id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  const denied = await guardApi(request);
  if (denied) return denied;
  const { col, id } = await params;
  if (!getCollection(col)) return Response.json({ error: 'Not found' }, { status: 404 });
  const doc = await getDoc(col, id);
  return doc ? Response.json({ data: doc }) : Response.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(request: Request, { params }: Ctx) {
  const denied = await guardApi(request, { mutating: true });
  if (denied) return denied;
  const { col, id } = await params;
  const def = getCollection(col);
  if (!def) return Response.json({ error: 'Not found' }, { status: 404 });
  const current = await getDoc(col, id);
  if (!current) return Response.json({ error: 'Not found' }, { status: 404 });
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: 'Invalid body' }, { status: 400 });

  const errors: string[] = [];
  const data = cleanObject(def.fields, body, errors);
  if (errors.length) return Response.json({ error: errors[0], errors }, { status: 400 });

  // read-only fields (e.g. what a lead submitted) are preserved from the stored copy
  await saveDoc(col, { ...current, ...data, id });
  revalidatePath('/', 'layout');
  return Response.json({ ok: true });
}

export async function DELETE(request: Request, { params }: Ctx) {
  const denied = await guardApi(request, { mutating: true });
  if (denied) return denied;
  const { col, id } = await params;
  if (!getCollection(col)) return Response.json({ error: 'Not found' }, { status: 404 });
  await deleteDoc(col, id);
  revalidatePath('/', 'layout');
  return Response.json({ ok: true });
}
