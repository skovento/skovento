import 'server-only';
import crypto from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Admin authentication — no external service.
 *
 * Environment variables:
 *   ADMIN_EMAIL            login email
 *   ADMIN_PASSWORD_HASH    scrypt hash ("salt:hash", create with `npm run admin:hash -- "password"`)  — preferred
 *   ADMIN_PASSWORD         plain password (fine for local development only)
 *   ADMIN_SESSION_SECRET   long random string used to sign the session cookie
 */

const COOKIE = 'sk_admin';
const MAX_AGE = 60 * 60 * 24 * 7;

const secret = () => {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 24) throw new Error('ADMIN_SESSION_SECRET is missing or too short (min 24 chars).');
  return s;
};

const sign = (payload: string) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
const safeEqual = (a: string, b: string) => {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && crypto.timingSafeEqual(A, B);
};

export function adminConfigured(): boolean {
  return !!process.env.ADMIN_EMAIL && !!(process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD) && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 24;
}

export function checkCredentials(email: string, password: string): boolean {
  const okEmail = safeEqual(email.trim().toLowerCase(), (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase());
  let okPass = false;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    const [salt, key] = hash.split(':');
    if (salt && key) {
      const derived = crypto.scryptSync(password, salt, 64).toString('hex');
      okPass = safeEqual(derived, key);
    }
  } else if (process.env.ADMIN_PASSWORD) {
    okPass = safeEqual(password, process.env.ADMIN_PASSWORD);
  }
  return okEmail && okPass;
}

export function createSessionToken(email: string): string {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined): { email: string } | null {
  if (!token || !adminConfigured()) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { email: string; exp: number };
    return data.exp > Date.now() ? { email: data.email } : null;
  } catch {
    return null;
  }
}

export const sessionCookie = (token: string) => ({
  name: COOKIE, value: token, httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: MAX_AGE,
});
export const clearedCookie = () => ({ name: COOKIE, value: '', httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });

export async function getSession() {
  return verifyToken((await cookies()).get(COOKIE)?.value);
}

/** Use at the top of every admin page. Redirects to the login screen when signed out. */
export async function requireAdmin() {
  const s = await getSession();
  if (!s) redirect('/admin/login');
  return s;
}

/** Use in admin API routes. Returns a response to send back when the request must be rejected. */
export async function guardApi(request: Request, opts: { mutating?: boolean } = {}): Promise<Response | null> {
  if (!(await getSession())) return Response.json({ error: 'Not signed in' }, { status: 401 });
  if (opts.mutating) {
    // CSRF defence: the browser must say the request comes from this same site
    const origin = request.headers.get('origin');
    const host = (await headers()).get('host');
    if (!origin || !host || new URL(origin).host !== host) return Response.json({ error: 'Bad origin' }, { status: 403 });
  }
  return null;
}
