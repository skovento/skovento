import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './auth';

/**
 * The actual security boundary for the admin area.
 *
 * middleware.ts only checks whether a cookie *exists* (the Edge runtime has no
 * node:crypto, so it can't verify a signature). Everything that reads or writes
 * admin data must call one of these two functions, which verify the HMAC and
 * the expiry properly on the Node runtime.
 *
 * Rule of thumb: if a file can return data a stranger shouldn't see, it calls
 * requireAdmin() or assertAdmin() as its first statement.
 */

/** Is the current request authenticated? Does not redirect. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** For Server Components / pages: redirects to login if not authenticated. */
export async function requireAdmin(nextPath = '/admin'): Promise<void> {
  if (!(await isAdmin())) {
    redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
  }
}

/**
 * For Route Handlers: returns a 401 Response if unauthenticated, or null if OK.
 *
 * Usage:
 *   const denied = await assertAdmin();
 *   if (denied) return denied;
 */
export async function assertAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401, headers: { 'Cache-Control': 'no-store' } }
  );
}
