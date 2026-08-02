import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ReviewDeskForm } from '@/components/testimonials/ReviewDeskForm';
import { absoluteUrl } from '@/lib/site-config';

/**
 * /share-your-experience — the page you send clients to after a project.
 *
 * `noindex` is deliberate. This is a private-ish page meant to be reached from
 * a link you send directly. Indexing it would invite strangers into the
 * moderation queue and would compete with your real pages in search.
 */
export const metadata: Metadata = {
  title: 'Share your experience',
  description:
    'Tell us how working with Skovento went. Your review helps other business owners decide whether we are the right fit.',
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl('/share-your-experience') },
};

export default function ShareYourExperiencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0EBE3] py-16 sm:py-24">
      {/* Desk surface: soft paper grain + warm light from the top-left,
          as if there's a window just off-frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 900px 600px at 12% -5%, rgba(255,244,225,0.9), transparent 60%), radial-gradient(ellipse 700px 500px at 95% 110%, rgba(138,43,136,0.07), transparent 65%)',
        }}
      />
      {/* Faint ruled-paper lines, like a notebook left open on the desk */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 31px, #16203D 31px, #16203D 32px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        {/* --- Desk clutter: a small tea-break scene ------------------------ */}
        <div className="mb-10 flex items-end justify-center gap-3 sm:gap-5">
          <TeaCup />
          <Biscuit />
          <PaperClip />
        </div>

        <header className="mb-12 text-center">
          <span className="inline-block -rotate-2 rounded-md bg-[#16203D] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FAF8F5] shadow-sm">
            Tea break, five minutes
          </span>

          <h1 className="mt-6 font-sans text-4xl font-extrabold leading-[1.1] tracking-tight text-[#16203D] sm:text-5xl">
            How did it actually go?
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#424965]">
            Grab a chai and tell us honestly. We publish reviews exactly as
            written — we don&apos;t edit them, and we don&apos;t write our own.
            If something wasn&apos;t great, we&apos;d genuinely rather hear it
            here than not at all.
          </p>
        </header>

        {/*
          Suspense boundary is required: ReviewDeskForm calls useSearchParams()
          to read the ?t= invite token. Without a boundary, Next opts the whole
          page out of static rendering and warns at build time.
        */}
        <Suspense
          fallback={
            <div className="mx-auto h-96 max-w-2xl rotate-[-0.9deg] animate-pulse rounded-lg bg-[#FFF8B8]/70 shadow-lg" />
          }
        >
          <ReviewDeskForm />
        </Suspense>

        {/* --- Honest footnote, styled as a torn note ---------------------- */}
        <div className="mx-auto mt-14 max-w-lg">
          <div
            className="rotate-[-1deg] rounded-sm bg-[#FFFDF7] p-5 shadow-[0_2px_10px_rgba(22,32,61,0.09)]"
            style={{
              clipPath:
                'polygon(0 0, 100% 0, 100% 93%, 92% 100%, 8% 96%, 0 100%)',
            }}
          >
            <p className="text-center text-[13px] leading-relaxed text-[#5C6178]">
              <strong className="text-[#16203D]">What happens next:</strong>{' '}
              nothing goes live automatically. We read every review, and it only
              appears on our site once you&apos;ve said we can publish it. Your
              email stays private — it&apos;s just so we know it&apos;s really you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------------------
   Small hand-drawn-ish desk props, built as inline SVG.
   Inline rather than imported images so they cost zero network requests and
   stay crisp at any resolution — a 4K-ready asset with a ~1KB payload.
--------------------------------------------------------------------------- */

function TeaCup() {
  return (
    <svg
      width="86"
      height="76"
      viewBox="0 0 86 76"
      fill="none"
      aria-hidden
      className="drop-shadow-sm"
    >
      {/* steam */}
      <g className="origin-center" opacity="0.5">
        <path
          d="M32 20c4-5-4-9 0-14M43 18c4-5-4-10 0-15M54 20c4-5-4-9 0-14"
          stroke="#8A2B88"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>
      {/* saucer */}
      <ellipse cx="43" cy="70" rx="34" ry="5.5" fill="#E0D6C8" />
      {/* cup */}
      <path
        d="M14 34h58v18c0 9.4-7.6 17-17 17H31c-9.4 0-17-7.6-17-17V34Z"
        fill="#FAF8F5"
        stroke="#16203D"
        strokeWidth="2.5"
      />
      {/* tea */}
      <path
        d="M18 38h50v13c0 7.2-5.8 13-13 13H31c-7.2 0-13-5.8-13-13V38Z"
        fill="#C88770"
        opacity="0.85"
      />
      {/* handle */}
      <path
        d="M72 40h4a9 9 0 0 1 0 18h-4"
        stroke="#16203D"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Biscuit() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden>
      <circle cx="23" cy="30" r="14" fill="#D9A468" stroke="#16203D" strokeWidth="2.2" />
      <circle cx="18" cy="26" r="1.8" fill="#8A5A2B" />
      <circle cx="27" cy="29" r="1.8" fill="#8A5A2B" />
      <circle cx="21" cy="35" r="1.8" fill="#8A5A2B" />
      <circle cx="29" cy="36" r="1.4" fill="#8A5A2B" />
    </svg>
  );
}

function PaperClip() {
  return (
    <svg width="30" height="52" viewBox="0 0 30 52" fill="none" aria-hidden>
      <path
        d="M20 14v22a7 7 0 0 1-14 0V12a5 5 0 0 1 10 0v22a3 3 0 0 1-6 0V16"
        stroke="#8A97B5"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
