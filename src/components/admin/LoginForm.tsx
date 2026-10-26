'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: f.get('email'), password: f.get('password') }),
      });
      if (res.ok) {
        router.replace('/admin');
        router.refresh();
        return;
      }
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? 'Could not sign in');
    } catch {
      setError('Network error. Try again.');
    }
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" autoFocus className="ad-input" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="ad-input" />
      </div>
      {error && <p className="text-sm text-[#ff9b9b]" role="alert">{error}</p>}
      <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
