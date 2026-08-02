import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

/**
 * ============================================================================
 * ADMIN AUTHENTICATION
 * ============================================================================
 *
 * A deliberately small, dependency-free session layer built on the
 * ADMIN_SECRET_KEY that already exists in .env.
 *
 * Design decisions and why:
 *
 * 1. The passkey is never stored in the cookie. The cookie holds a signed
 *    session token. If the cookie leaks, the passkey doesn't.
 *
 * 2. Comparisons use timingSafeEqual, not `===`. String equality short-circuits
 *    on the first differing byte, which leaks the key one character at a time
 *    to anyone who can measure response times. This is a real, practical attack
 *    on a login endpoint.
 *
 * 3. Sessions expire. The signature covers the expiry timestamp, so a token
 *    can't be extended by editing it.
 *
 * 4. HMAC-SHA256 over `expiry` with the secret as the key. No JWT library
 *    needed for a single-user admin panel, and no dependency to keep patched.
 *
 * If you later add multiple admin users with individual logins, replace this
 * with a real user table plus argon2/bcrypt password hashing. For one operator
 * with one passkey, this is the right size.
 * ============================================================================
 */

export const SESSION_COOKIE = 'skovento_admin_session';

/** 8 hours. Long enough for a working day, short enough to limit a stolen cookie. */
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET_KEY;
  if (!secret || secret.length < 12) {
    throw new Error(
      'ADMIN_SECRET_KEY is missing or too short. Set a value of at least 12 characters in .env — the admin panel will not start without it.'
    );
  }
  return secret;
}

/** Constant-time string comparison. Returns false rather than throwing on length mismatch. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  // timingSafeEqual throws if lengths differ, which would itself leak length.
  // Hash both to a fixed width first so the comparison is always same-length.
  const secret = getSecret();
  const hashA = createHmac('sha256', secret).update(bufA).digest();
  const hashB = createHmac('sha256', secret).update(bufB).digest();
  return timingSafeEqual(hashA, hashB);
}

/** Verify a submitted passkey against ADMIN_SECRET_KEY. */
export function verifyPasskey(submitted: string): boolean {
  if (!submitted) return false;
  return safeEqual(submitted, getSecret());
}

/** Create a signed session token valid for SESSION_DURATION_MS. */
export function createSessionToken(): string {
  const expiry = Date.now() + SESSION_DURATION_MS;
  // A random nonce means two sessions issued in the same millisecond differ,
  // so one token can't be confused for another.
  const nonce = randomBytes(12).toString('hex');
  const payload = `${expiry}.${nonce}`;
  const signature = createHmac('sha256', getSecret())
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

/** Validate a session token: correct signature AND not expired. */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [expiryRaw, nonce, signature] = parts;

  const expected = createHmac('sha256', getSecret())
    .update(`${expiryRaw}.${nonce}`)
    .digest('hex');

  // Signature check first — an expired-but-unsigned token should fail the same
  // way as a forged one.
  const sigBuf = Buffer.from(signature, 'hex');
  const expBuf = Buffer.from(expected, 'hex');
  if (sigBuf.length !== expBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expBuf)) return false;

  const expiry = Number(expiryRaw);
  if (!Number.isFinite(expiry)) return false;

  return Date.now() < expiry;
}

/** Cookie options. httpOnly means JavaScript — including any injected script — cannot read it. */
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_DURATION_MS / 1000,
};
