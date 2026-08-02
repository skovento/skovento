import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08080C] px-4">
      {/* Ambient depth: two soft light sources, no images, no WebGL.
          Costs nothing and does most of the work people credit to 3D. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 700px 500px at 20% 10%, rgba(138,43,136,0.28), transparent 60%), radial-gradient(ellipse 600px 460px at 85% 90%, rgba(30,46,107,0.35), transparent 62%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000, transparent)',
        }}
      />

      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
