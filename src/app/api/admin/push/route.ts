import { NextResponse } from 'next/server';
import { guardApi } from '@/lib/cms/auth';
import { pushConfigured, removeSubscription, saveSubscription, sendToAll, validEndpoint, vapidPublicKey } from '@/lib/push';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET: is push set up on the server + the public key the browser needs to subscribe. */
export async function GET(request: Request) {
  const denied = await guardApi(request);
  if (denied) return denied;
  return NextResponse.json({ configured: pushConfigured(), publicKey: pushConfigured() ? vapidPublicKey() : '' });
}

/** POST { action: 'subscribe' | 'unsubscribe' | 'test', subscription? } */
export async function POST(request: Request) {
  const denied = await guardApi(request, { mutating: true });
  if (denied) return denied;
  if (Number(request.headers.get('content-length') ?? 0) > 5_000) return NextResponse.json({ error: 'Too large' }, { status: 413 });
  if (!pushConfigured()) return NextResponse.json({ error: 'Push is not set up on the server (VAPID keys missing).' }, { status: 503 });

  const body = (await request.json().catch(() => null)) as { action?: string; subscription?: { endpoint?: unknown; keys?: { p256dh?: unknown; auth?: unknown } } } | null;
  const action = body?.action;

  if (action === 'test') {
    const r = await sendToAll();
    return NextResponse.json({ ok: r.sent > 0, ...r });
  }

  const sub = body?.subscription;
  if (!sub || !validEndpoint(sub.endpoint)) return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });

  if (action === 'unsubscribe') {
    await removeSubscription(sub.endpoint);
    return NextResponse.json({ ok: true });
  }
  if (action === 'subscribe') {
    const { p256dh, auth } = sub.keys ?? {};
    if (typeof p256dh !== 'string' || typeof auth !== 'string' || p256dh.length > 200 || auth.length > 100) return NextResponse.json({ error: 'Invalid keys' }, { status: 400 });
    await saveSubscription({ endpoint: sub.endpoint, keys: { p256dh, auth } }, request.headers.get('user-agent') ?? '');
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
