import React from 'react';
import { getApprovedTestimonials } from '@/lib/testimonials';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildGraph } from '@/lib/schema';
import { ORG_ID } from '@/lib/schema';
import { StickyNote } from './StickyNote';

/**
 * Homepage testimonials — a corkboard of sticky notes.
 *
 * THE RULE: if there are no APPROVED reviews, this renders NOTHING. Not a
 * placeholder, not "reviews coming soon", not a sample quote. An empty section
 * heading with no content underneath is worse than no section at all, and
 * anything invented is worse still.
 *
 * This is a Server Component so the query runs on the server and the reviews
 * land in the initial HTML — which is what makes them visible to crawlers that
 * don't execute JavaScript.
 */
export async function TestimonialsSection() {
  const testimonials = await getApprovedTestimonials();

  // The whole point of this file.
  if (testimonials.length === 0) return null;

  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section className="relative overflow-hidden bg-[#F0EBE3] py-16 sm:py-24">
      {/*
        Review schema, generated only from real approved reviews. Never emitted
        when the list is empty — publishing an aggregateRating with no reviews
        behind it is exactly the kind of thing Google issues manual actions for.
      */}
      <JsonLd
        data={buildGraph({
          '@type': 'Organization',
          '@id': ORG_ID,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Number(averageRating.toFixed(1)),
            reviewCount: testimonials.length,
            bestRating: 5,
            worstRating: 1,
          },
          review: testimonials.map((t) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: t.authorName },
            datePublished: t.createdAt.toISOString().slice(0, 10),
            reviewRating: {
              '@type': 'Rating',
              ratingValue: t.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: t.quote,
          })),
        })}
      />

      {/* Corkboard texture — warm, slightly speckled */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(200,135,112,0.14), transparent 45%), radial-gradient(circle at 80% 70%, rgba(138,43,136,0.08), transparent 45%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="inline-block -rotate-1 rounded-md bg-[#16203D] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FAF8F5]">
            Straight from the desk
          </span>
          <h2 className="mt-6 font-sans text-3xl font-extrabold tracking-tight text-[#16203D] sm:text-5xl">
            What our clients actually said
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#424965]">
            {testimonials.length === 1
              ? 'One review so far. We publish them exactly as written.'
              : `${testimonials.length} reviews, published exactly as written. We don't edit them.`}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <StickyNote key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
