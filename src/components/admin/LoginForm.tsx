'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2, ArrowRight } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';

  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? 'Could not sign in.');
        setBusy(false);
        return;
      }

      // Only redirect to same-origin paths. Taking `next` straight from the
      // query string without this check is a textbook open-redirect: a crafted
      // link could bounce an authenticated admin to an attacker's page.
      const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/admin';
      router.push(safeNext);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setBusy(false);
    }
  }

  return (
    <div className="glass-panel relative z-10 w-full max-w-sm rounded-3xl p-8">
      <div className="mb-7 flex flex-col items-center text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
          <Lock className="h-6 w-6 text-[#C24FBE]" />
        </div>
        <h1 className="font-sans text-2xl font-extrabold text-white">Skovento Admin</h1>
        <p className="mt-2 text-sm text-white/55">Enter your passkey to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="passkey" className="sr-only">
            Admin passkey
          </label>
          <input
            id="passkey"
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
            autoFocus
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3.5 text-center font-mono text-lg tracking-[0.3em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#C24FBE]/60 focus:bg-white/[0.09]"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-[#E2725B]/30 bg-[#E2725B]/10 px-3 py-2.5 text-center text-sm text-[#FFB4A2]"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !passkey}
          className="tap-target flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8A2B88] to-[#C24FBE] px-5 py-3.5 font-sans text-sm font-bold text-white shadow-lg transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Checking…
            </>
          ) : (
            <>
              Sign in <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-white/35">
        Sessions expire after 8 hours. Five failed attempts locks sign-in for
        fifteen minutes.
      </p>
    </div>
  );
}
