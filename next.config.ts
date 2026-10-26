import type { NextConfig } from 'next';

/**
 * FORCE_NOINDEX=true is a kill switch: it adds a noindex header to every response
 * regardless of what the admin panel says. Useful for staging and preview deployments.
 */
const forceNoIndex = process.env.FORCE_NOINDEX === 'true';
const isProd = process.env.NODE_ENV === 'production';

const security = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // Script/style sources are not restricted (tag managers and Next inline scripts need them);
  // these directives still close off clickjacking, <base> hijacking, plugins and form hijacking.
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'" },
  ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: { qualities: [60], formats: ['image/avif', 'image/webp'], minimumCacheTTL: 60 * 60 * 24 * 30, deviceSizes: [360, 640, 828, 1080, 1280, 1600], imageSizes: [96, 256, 384] },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: forceNoIndex ? [...security, { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' }] : security,
      },
      // Admin pages and APIs must never be cached or indexed
      {
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
      // Brand assets rarely change: let browsers/CDN cache them
      { source: '/brand/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] },
    ];
  },
};

export default nextConfig;
