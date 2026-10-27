export const dynamic = 'force-static';

/** Install manifest for the admin app. It is linked ONLY from the signed-in admin panel, never from the public site. */
export function GET() {
  const manifest = {
    id: '/admin',
    name: 'Skovento Admin',
    short_name: 'SK Admin',
    description: 'Manage Skovento leads, content and settings.',
    start_url: '/admin',
    scope: '/admin',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#060a13',
    theme_color: '#060a13',
    icons: [
      { src: '/admin-pwa/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/admin-pwa/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/admin-pwa/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [{ name: 'Leads', url: '/admin/leads', icons: [{ src: '/admin-pwa/icon-192.png', sizes: '192x192' }] }],
  };
  return new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
