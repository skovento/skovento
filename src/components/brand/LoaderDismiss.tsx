'use client';
import { useEffect } from 'react';

const KEY = 'sk_seen';

/** Remembers that the intro was shown and lets people skip it (click, tap, key or the Skip button). */
export function LoaderDismiss() {
  useEffect(() => {
    const el = document.getElementById('sk-loader');
    if (!el) return;
    const remember = () => {
      try { localStorage.setItem(KEY, '1'); } catch { /* private mode: it will simply show again */ }
    };
    const skip = () => { el.classList.add('sk-skip'); remember(); };
    const done = window.setTimeout(remember, 2800);
    const onKey = () => skip();
    el.addEventListener('click', skip);
    window.addEventListener('keydown', onKey, { once: true });
    return () => {
      window.clearTimeout(done);
      el.removeEventListener('click', skip);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <button type="button" className="sk-skipbtn" onClick={(e) => { e.stopPropagation(); document.getElementById('sk-loader')?.classList.add('sk-skip'); try { localStorage.setItem(KEY, '1'); } catch { /* ignore */ } }}>
      Skip
    </button>
  );
}
