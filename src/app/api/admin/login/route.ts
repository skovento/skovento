import { NextResponse } from 'next/server';
import {
  verifyPasskey,
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '@/lib/auth';
import { rateLimit, clientKey } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/login
 *
 * Rate limiting matters more here than on any public form: without it, this is
 * an unlimited offline-speed brute-force oracle for ADMIN_SECRET_KEY. Five
 * attempts per fifteen minutes turns a feasible attack into an infeasible one.
 */
export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, 'admin-login'), {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!limit.ok) {
    return NextResponse.json(
      {
        error: `Too many attempts. Try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minutes.`,
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    );
  }

  const body = await request.json().catch(() => null);
  const passkey = typeof body?.passkey === 'string' ? body.passkey : '';

  if (!verifyPasskey(passkey)) {
    // Deliberately vague. "Wrong password" vs "no such user" is a distinction
    // worth denying an attacker, and there's only one credential here anyway.
    return NextResponse.json({ error: 'Incorrect passkey.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return response;
}

/** DELETE /api/admin/login — sign out. */
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, '', { ...sessionCookieOptions, maxAge: 0 });
  return response;
}
