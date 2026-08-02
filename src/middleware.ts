import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/auth';

/**
 * Route guard for /admin.
 *
 * Middleware runs on the Edge runtime, which has no node:crypto, so we cannot
 * verify the HMAC signature here. This check is therefore a cheap *presence*
 * check only — it exists to redirect logged-out humans to the login page, not
 * to enforce security.
 *
 * Real enforcement happens server-side in requireAdmin() (src/lib/admin-guard.ts),
 * which every admin page and every /api/admin route calls before touching data.
 * Treating middleware as the security boundary is a common and serious mistake:
 * a forged cookie would sail straight through this file.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page itself must stay reachable.
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const hasSession = request.cookies.has(SESSION_COOKIE);
    if (!hasSession) {
      const loginUrl = new URL('/admin/login', request.url);
      // Remember where they were headed so login can send them back.
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
