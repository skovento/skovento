import 'server-only';
import crypto from 'node:crypto';
import { deleteDoc, listDocs, saveDoc } from '@/lib/cms/store';

/**
 * Web Push for the admin's own devices (phone / laptop).
 *
 * Messages are sent WITHOUT a payload (only a VAPID-signed "wake up"). The service worker then asks
 * /api/admin/push/latest (which needs the admin cookie) what to show, so no lead data ever travels
 * through the push service and no extra npm package is needed.
 *
 *   VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY   create with `npm run vapid:generate`
 *   VAPID_SUBJECT                          mailto:you@example.com
 */

const COL = 'push-subscriptions';

export interface PushSub { id: string; endpoint: string; keys: { p256dh: string; auth: string }; userAgent: string; createdAt: string; [k: string]: unknown }

export const vapidPublicKey = () => process.env.VAPID_PUBLIC_KEY?.trim() || '';
export const pushConfigured = () => !!vapidPublicKey() && !!process.env.VAPID_PRIVATE_KEY?.trim();

const b64u = (b: Buffer) => b.toString('base64url');

function signingKey() {
  const pub = Buffer.from(vapidPublicKey(), 'base64url');
  if (pub.length !== 65 || pub[0] !== 4) throw new Error('VAPID_PUBLIC_KEY is not a valid P-256 public key');
  return crypto.createPrivateKey({
    key: { kty: 'EC', crv: 'P-256', x: b64u(pub.subarray(1, 33)), y: b64u(pub.subarray(33, 65)), d: process.env.VAPID_PRIVATE_KEY!.trim() },
    format: 'jwk',
  });
}

function vapidHeader(endpoint: string) {
  const aud = new URL(endpoint).origin;
  const raw = (process.env.VAPID_SUBJECT || process.env.NOTIFICATION_EMAIL || '').trim().replace(/^mailto:/, '');
  const subject = raw.startsWith('https://') ? raw : `mailto:${raw || 'admin@example.com'}`;
  const head = b64u(Buffer.from(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const body = b64u(Buffer.from(JSON.stringify({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: subject })));
  const sig = crypto.sign('sha256', Buffer.from(`${head}.${body}`), { key: signingKey(), dsaEncoding: 'ieee-p1363' });
  return `vapid t=${head}.${body}.${b64u(sig)}, k=${vapidPublicKey()}`;
}

export const subId = (endpoint: string) => crypto.createHash('sha256').update(endpoint).digest('hex').slice(0, 24);

/** Push services are always https and never local; refuse anything else so this cannot be used to call internal hosts. */
export function validEndpoint(endpoint: unknown): endpoint is string {
  if (typeof endpoint !== 'string' || endpoint.length > 1000) return false;
  try {
    const u = new URL(endpoint);
    return u.protocol === 'https:' && !/^(localhost|127\.|10\.|192\.168\.|169\.254\.|\[)/i.test(u.hostname) && u.hostname.includes('.');
  } catch { return false; }
}

export async function saveSubscription(sub: { endpoint: string; keys: { p256dh: string; auth: string } }, userAgent: string) {
  await saveDoc(COL, { id: subId(sub.endpoint), endpoint: sub.endpoint, keys: sub.keys, userAgent: userAgent.slice(0, 200), createdAt: new Date().toISOString() });
}
export const removeSubscription = (endpoint: string) => deleteDoc(COL, subId(endpoint));

export async function sendToAll(): Promise<{ sent: number; removed: number; failed: number }> {
  const res = { sent: 0, removed: 0, failed: 0 };
  if (!pushConfigured()) return res;
  const subs = await listDocs<PushSub>(COL);
  await Promise.all(subs.map(async (s) => {
    try {
      const r = await fetch(s.endpoint, { method: 'POST', headers: { Authorization: vapidHeader(s.endpoint), TTL: '86400', Urgency: 'high' }, signal: AbortSignal.timeout(8000) });
      if (r.ok) res.sent++;
      else if (r.status === 404 || r.status === 410) { await deleteDoc(COL, s.id); res.removed++; }
      else { res.failed++; console.error('[push] service answered', r.status); }
    } catch (e) { res.failed++; console.error('[push] failed:', (e as Error).message); }
  }));
  return res;
}
