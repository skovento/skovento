import type { Metadata } from 'next';

// The admin area must never appear in search results, whatever the public site's indexing setting is.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true, noarchive: true, nosnippet: true, noimageindex: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
