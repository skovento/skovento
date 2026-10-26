import Link from 'next/link';
import { Container } from '@/components/ui/Section';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center pt-24">
      <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative text-center">
        <p className="font-mono text-sm text-accent-2">404</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The link may be broken or the page may have moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </Container>
    </section>
  );
}
