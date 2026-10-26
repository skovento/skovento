import { NextResponse } from 'next/server';
import { adminConfigured, checkCredentials, createSessionToken, sessionCookie } from '@/lib/cms/auth';
import { clientKey, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: 'Admin is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD (or ADMIN_PASSWORD_HASH) and ADMIN_SESSION_SECRET.' }, { status: 503 });
  }
  const limit = rateLimit(clientKey(request, 'admin-login'), { limit: 8, windowMs: 15 * 60 * 1000 });
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a few minutes.' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } });
  }
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = typeof body?.email === 'string' ? body.email : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!email || !password || !checkCredentials(email, password)) {
    return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie(createSessionToken(email.trim().toLowerCase())));
  return res;
}
