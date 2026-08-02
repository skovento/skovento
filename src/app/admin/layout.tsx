import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  // The admin area must never be indexed. middleware.ts redirects unauthorised
  // visitors, but a crawler that somehow reaches a URL shouldn't record it.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#08080C] text-white">
      {/* Ambient light sources. Pure CSS gradients — no images, no WebGL, no
          measurable cost — giving the glass surfaces something to refract. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 900px 600px at 8% -10%, rgba(138,43,136,0.22), transparent 58%), radial-gradient(ellipse 800px 600px at 92% 108%, rgba(30,46,107,0.3), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000, transparent)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
