export const dynamic = 'force-static';

/**
 * Service worker for the ADMIN app only (scope /admin). Internet-based on purpose: it does not cache pages
 * or work offline. It only receives push messages and opens the admin when a notification is tapped.
 */
const SW = `
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let d = { title: 'Skovento admin', body: 'You have an update. Open the admin to see it.', url: '/admin/leads', count: 0 };
    try {
      const r = await fetch('/api/admin/push/latest', { credentials: 'same-origin', cache: 'no-store' });
      if (r.ok) d = Object.assign(d, await r.json());
    } catch (e) {}
    try { if (d.count && self.navigator.setAppBadge) await self.navigator.setAppBadge(d.count); } catch (e) {}
    await self.registration.showNotification(d.title, {
      body: d.body, icon: '/admin-pwa/icon-192.png', tag: 'skovento-lead', renotify: true, data: { url: d.url },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  let url = (event.notification.data && event.notification.data.url) || '/admin';
  if (typeof url !== 'string' || url.indexOf('/admin') !== 0) url = '/admin';
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if (c.url.indexOf(self.location.origin + '/admin') === 0 && 'focus' in c) { await c.focus(); if ('navigate' in c) { try { await c.navigate(url); } catch (e) {} } return; }
    }
    await self.clients.openWindow(url);
  })());
});
`;

export function GET() {
  return new Response(SW, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Service-Worker-Allowed': '/admin',
      'Cache-Control': 'no-cache',
    },
  });
}
