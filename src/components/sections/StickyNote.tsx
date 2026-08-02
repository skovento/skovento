'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import type { PublicTestimonial } from '@/lib/testimonials';

/**
 * A single review, rendered as a sticky note pinned to a corkboard.
 *
 * Design notes:
 * - Rotation and colour are derived from the index, not random. Random values
 *   differ between the server render and the client hydration, which produces a
 *   React hydration mismatch — a real bug, not a cosmetic one.
 * - Each note gets a pushpin and a soft drop shadow that grows on hover, so it
 *   feels like it lifts off the board.
 * - Deliberately NOT glass. Glass over a flat corkboard is all repaint cost and
 *   no payoff, and body copy on translucency is the readability trap the design
 *   system exists to avoid. Paper here, glass on the chrome.
 */

const NOTE_COLOURS = [
  { bg: '#FFF8B8', ink: '#4A4632', pin: '#D14D41' }, // classic yellow
  { bg: '#D7F2E3', ink: '#2F4A3D', pin: '#2E7D5B' }, // mint
  { bg: '#FFE0E9', ink: '#54303C', pin: '#B8336A' }, // rose
  { bg: '#DCE8FF', ink: '#2E3B57', pin: '#3D5A9E' }, // sky
  { bg: '#FFE8CC', ink: '#54402C', pin: '#C87A3A' }, // peach
];

const ROTATIONS = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2];

export function StickyNote({
  testimonial: t,
  index,
}: {
  testimonial: PublicTestimonial;
  index: number;
}) {
  const colour = NOTE_COLOURS[index % NOTE_COLOURS.length];
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      // `once` stops the note re-animating every time it scrolls past, which
      // gets irritating fast on a long page.
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.06, ease: [0.2, 0, 0, 1] }}
      whileHover={{ rotate: 0, y: -6, transition: { duration: 0.22 } }}
      className="relative flex flex-col rounded-sm p-7 pt-9 shadow-[0_10px_28px_-10px_rgba(22,32,61,0.42)] transition-shadow hover:shadow-[0_20px_44px_-12px_rgba(22,32,61,0.5)]"
      style={{ backgroundColor: colour.bg }}
    >
      {/* Pushpin */}
      <span
        aria-hidden
        className="absolute left-1/2 top-[-11px] h-[22px] w-[22px] -translate-x-1/2 rounded-full shadow-md"
        style={{
          background: `radial-gradient(circle at 35% 30%, #ffffff88, ${colour.pin} 55%)`,
        }}
      />

      {/* Rating */}
      <div className="mb-4 flex items-center gap-0.5" aria-label={`${t.rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className="h-4 w-4"
            strokeWidth={2}
            style={{
              fill: n <= t.rating ? '#E0A32E' : 'transparent',
              color: n <= t.rating ? '#B8801F' : `${colour.ink}55`,
            }}
          />
        ))}
      </div>

      <blockquote
        className="flex-grow font-sans text-[15px] leading-relaxed"
        style={{ color: colour.ink }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {t.projectContext && (
        <p
          className="mt-4 text-[11px] font-semibold uppercase tracking-wider opacity-70"
          style={{ color: colour.ink }}
        >
          {t.projectContext}
        </p>
      )}

      <figcaption
        className="mt-5 border-t pt-4"
        style={{ borderColor: `${colour.ink}22` }}
      >
        <p className="font-sans text-sm font-extrabold" style={{ color: colour.ink }}>
          {t.authorName}
        </p>
        <p className="mt-0.5 text-xs opacity-75" style={{ color: colour.ink }}>
          {[t.authorRole, t.companyName].filter(Boolean).join(', ')}
        </p>
        {t.companyUrl && (
          <a
            href={t.companyUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold underline underline-offset-2 opacity-70 transition-opacity hover:opacity-100"
            style={{ color: colour.ink }}
          >
            Visit their site
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </figcaption>
    </motion.figure>
  );
}
