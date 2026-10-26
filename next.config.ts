import type { NextConfig } from 'next';

/**
 * FORCE_NOINDEX=true is a kill switch: it adds a noindex header to every response
 * regardless of what the admin panel says. Useful for staging and preview deployments.
 */
const forceNoIndex = process.env.FORCE_NOINDEX === 'true';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    return [
      {
        source: '/:path*',
        headers: forceNoIndex ? [...security, { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' }] : security,
      },
    ];
  },
};

export default nextConfig;
