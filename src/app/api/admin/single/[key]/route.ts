import { revalidatePath } from 'next/cache';
import { guardApi } from '@/lib/cms/auth';
import { getSingle } from '@/lib/cms/schema';
import { cleanObject } from '@/lib/cms/sanitize';
import { getSingleDoc, saveSingleDoc } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';
type Ctx = { params: Promise<{ key: string }> };

export async function GET(request: Request, { params }: Ctx) {
  const denied = await guardApi(request);
  if (denied) return denied;
  const { key } = await params;
  if (!getSingle(key)) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ data: await getSingleDoc(key) });
}

export async function PUT(request: Request, { params }: Ctx) {
  const denied = await guardApi(request, { mutating: true });
  if (denied) return denied;
  const { key } = await params;
  const def = getSingle(key);
  if (!def) return Response.json({ error: 'Not found' }, { status: 404 });
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: 'Invalid body' }, { status: 400 });

  const errors: string[] = [];
  const data = cleanObject(def.fields, body, errors);
  if (errors.length) return Response.json({ error: errors[0], errors }, { status: 400 });

  await saveSingleDoc(key, data);
  revalidatePath('/', 'layout');
  return Response.json({ ok: true, data });
}
