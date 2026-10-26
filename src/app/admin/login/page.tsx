import { redirect } from 'next/navigation';
import { adminConfigured, getSession } from '@/lib/cms/auth';
import { LoginForm } from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await getSession()) redirect('/admin');
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="card relative w-full max-w-md bg-surface p-8 shadow-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">Admin</p>
        <h1 className="mt-2 text-2xl font-bold">Sign in</h1>
        <p className="mt-1 text-sm text-muted">Manage website content, leads and settings.</p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-6 rounded-lg border border-[#ffcf66]/40 bg-[#ffcf66]/10 p-4 text-sm text-[#ffe3a3]">
            Admin is not set up yet. Add ADMIN_EMAIL, ADMIN_PASSWORD (or ADMIN_PASSWORD_HASH) and ADMIN_SESSION_SECRET to your environment variables, then restart.
          </p>
        )}
      </div>
    </div>
  );
}
