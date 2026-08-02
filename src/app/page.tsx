import { HomeContent } from '@/components/HomeContent';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

/**
 * Homepage — a Server Component.
 *
 * It was previously `'use client'` in its entirety, which meant nothing on the
 * page could run a server-side query. TestimonialsSection needs to read the
 * database, so the interactive parts moved into <HomeContent /> and the
 * server-rendered section is passed down as a prop.
 */
export default function HomePage() {
  return <HomeContent testimonials={<TestimonialsSection />} />;
}
