'use client';
import { useCallback, useEffect, useState } from 'react';

/**
 * Admin-only "app" helper: registers the admin service worker, offers "Install app" and "Enable alerts".
 * It lives inside the signed-in panel, so visitors of the public site never see any of this.
 */

interface InstallEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }
declare global { interface Window { __skInstall?: InstallEvent | null } }

const urlB64ToBytes = (b64: string) => {
  const pad = '='.repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
};

export function AdminApp() {
  const [ready, setReady] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [pushOk, setPushOk] = useState<boolean | null>(null); // server configured?
  const [perm, setPerm] = useState<NotificationPermission | 'unsupported'>('default');
  const [subscribed, setSubscribed] = useState(false);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [hidden, setHidden] = useState(false);

  const refreshSub = useCallback(async () => {
    try {
      const reg = await navigator.serviceWorker.getRegistration('/admin');
      setSubscribed(!!(await reg?.pushManager.getSubscription()));
    } catch { setSubscribed(false); }
  }, []);

  useEffect(() => {
    try { if (sessionStorage.getItem('sk_app_hidden')) setHidden(true); } catch {}
    const ua = navigator.userAgent;
    setIsIos(/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1));
    setStandalone(window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true);
    setCanInstall(!!window.__skInstall);
    const onReady = () => setCanInstall(true);
    const onInstalled = () => { setCanInstall(false); setStandalone(true); window.__skInstall = null; };
    window.addEventListener('sk-install-ready', onReady);
    window.addEventListener('appinstalled', onInstalled);

    setPerm('Notification' in window ? Notification.permission : 'unsupported');
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/admin/sw.js', { scope: '/admin' }).then(() => navigator.serviceWorker.ready).then(refreshSub).catch(() => {});
    }
    fetch('/api/admin/push').then((r) => (r.ok ? r.json() : null)).then((j) => setPushOk(!!j?.configured)).catch(() => setPushOk(false));
    setReady(true);
    return () => { window.removeEventListener('sk-install-ready', onReady); window.removeEventListener('appinstalled', onInstalled); };
  }, [refreshSub]);

  async function install() {
    const ev = window.__skInstall;
    if (!ev) return;
    await ev.prompt();
    await ev.userChoice.catch(() => null);
    window.__skInstall = null;
    setCanInstall(false);
  }

  async function enable() {
    setBusy(true); setMsg('');
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) throw new Error(isIos && !standalone ? 'On iPhone, first add this app to the Home Screen, then open it from there.' : 'This browser does not support push alerts.');
      const p = await Notification.requestPermission();
      setPerm(p);
      if (p !== 'granted') throw new Error('Notifications are blocked. Allow them in the browser / phone settings for this site.');
      const keyRes = await fetch('/api/admin/push');
      const { configured, publicKey } = await keyRes.json();
      if (!configured) throw new Error('Alerts are not set up on the server yet (VAPID keys missing).');
      const reg = await navigator.serviceWorker.ready;
      const sub = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToBytes(publicKey) }));
      const res = await fetch('/api/admin/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'subscribe', subscription: sub.toJSON() }) });
      if (!res.ok) throw new Error('Could not save this device. Try again.');
      setSubscribed(true); setMsg('Alerts are on for this device.');
    } catch (e) { setMsg((e as Error).message); }
    setBusy(false);
  }

  async function disable() {
    setBusy(true); setMsg('');
    try {
      const reg = await navigator.serviceWorker.getRegistration('/admin');
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        await fetch('/api/admin/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'unsubscribe', subscription: sub.toJSON() }) });
        await sub.unsubscribe();
      }
      setSubscribed(false); setMsg('Alerts are off for this device.');
    } catch { setMsg('Could not turn alerts off.'); }
    setBusy(false);
  }

  async function test() {
    setBusy(true); setMsg('');
    try {
      const r = await fetch('/api/admin/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'test' }) });
      const j = await r.json().catch(() => ({}));
      setMsg(j.ok ? 'Test sent — a notification should appear in a few seconds.' : (j.error ?? 'Nothing was delivered. Turn alerts off and on again on this device.'));
    } catch { setMsg('Network error.'); }
    setBusy(false);
  }

  if (!ready || hidden) return null;
  const showInstall = !standalone && (canInstall || isIos);
  const showAlerts = perm !== 'unsupported' || isIos;
  if (standalone && subscribed && !msg) return null; // everything is set up: stay out of the way

  return (
    <section aria-label="Admin app" className="card mb-6 flex flex-col gap-3 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-semibold">{standalone ? 'Admin app' : 'Use this admin like an app'}</p>
        <p className="mt-0.5 text-muted">
          {pushOk === false ? 'Alerts need VAPID keys on the server (see docs/ADMIN-MOBILE-PWA.md).' : subscribed ? 'New-enquiry alerts are on for this device.' : 'Get a notification on this device whenever a new enquiry arrives.'}
        </p>
        {isIos && !standalone && <p className="mt-1 text-muted">iPhone: tap Share → “Add to Home Screen”, then open the app from your Home Screen and enable alerts.</p>}
        {msg && <p className="mt-1 text-accent-2" role="status">{msg}</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        {showInstall && canInstall && <button type="button" onClick={install} className="btn btn-primary !min-h-10 !px-4 !py-2">Install app</button>}
        {showAlerts && pushOk && !subscribed && <button type="button" disabled={busy} onClick={enable} className="btn btn-ghost !min-h-10 !px-4 !py-2 disabled:opacity-60">Enable alerts</button>}
        {pushOk && subscribed && <button type="button" disabled={busy} onClick={test} className="btn btn-ghost !min-h-10 !px-4 !py-2 disabled:opacity-60">Send test</button>}
        {pushOk && subscribed && <button type="button" disabled={busy} onClick={disable} className="chip hover:text-fg">Turn off</button>}
        <button type="button" onClick={() => { setHidden(true); try { sessionStorage.setItem('sk_app_hidden', '1'); } catch {} }} className="chip hover:text-fg" aria-label="Hide for now">Hide</button>
      </div>
    </section>
  );
}
