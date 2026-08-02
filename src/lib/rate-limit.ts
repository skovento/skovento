import { createHash } from 'node:crypto';

/**
 * Minimal in-memory rate limiter for public form endpoints.
 *
 * Honest about its limits: this is per-instance memory. On a serverless
 * platform, requests spread across instances and the effective limit becomes
 * looser than the number configured. It still stops the common case — a single
 * script hammering one endpoint — at zero cost and zero dependencies.
 *
 * If you start seeing coordinated spam, move this to Postgres (you already have
 * it) or Upstash Redis. Don't reach for that until the simple version proves
 * insufficient.
 */

type Bucket = { count: number; resetAt: number };

const globalForLimiter = globalThis as unknown as {
  skoventoRateLimit?: Map<string, Bucket>;
};

const buckets: Map<string, Bucket> =
  globalForLimiter.skoventoRateLimit ?? new Map();

if (process.env.NODE_ENV !== 'production') {
  globalForLimiter.skoventoRateLimit = buckets;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 10 * 60 * 1000 } = {}
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  if (bucket.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  return {
    ok: true,
    remaining: limit - bucket.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Derive a stable per-client key WITHOUT storing the raw IP address.
 *
 * An IP address is personal data under India's DPDP Act 2023 and the GDPR.
 * We only ever need to know "is this the same client as before", which a
 * salted hash answers just as well. The salt means the hashes can't be
 * reversed by brute-forcing the small IPv4 space.
 */
export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const realIp = request.headers.get('x-real-ip') ?? '';
  const ip = forwarded.split(',')[0].trim() || realIp || 'unknown';
  const salt = process.env.ADMIN_SECRET_KEY ?? 'skovento-fallback-salt';
  return `${scope}:${createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)}`;
}

/** Same hashing, exposed for storing a non-reversible client fingerprint. */
export function hashIp(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const realIp = request.headers.get('x-real-ip') ?? '';
  const ip = forwarded.split(',')[0].trim() || realIp;
  if (!ip) return null;
  const salt = process.env.ADMIN_SECRET_KEY ?? 'skovento-fallback-salt';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}
