'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, Send, Check, Loader2 } from 'lucide-react';

/**
 * The review form, styled as a sticky note pinned to a desk.
 *
 * A few deliberate choices:
 *
 * - The whole card is tilted ~1 degree. Enough to read as "a real note someone
 *   put down", not enough to feel gimmicky or hurt readability.
 * - Inputs are underlines on paper rather than boxed fields, so the form reads
 *   as something you'd write on rather than a database entry screen. People
 *   write more honestly on paper than into a form.
 * - The rating is stars you click, not a dropdown. Faster, and it sets a tone.
 * - There is no "5 stars" default pre-selected... actually there is (4), but
 *   nudged low deliberately: a pre-filled 5 anchors people upward and makes the
 *   whole review set less believable.
 */

type Status = 'idle' | 'submitting' | 'done' | 'error';

export function ReviewDeskForm() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('t') ?? '';

  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    setFormError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      authorName: fd.get('authorName'),
      authorEmail: fd.get('authorEmail'),
      authorRole: fd.get('authorRole'),
      companyName: fd.get('companyName'),
      companyUrl: fd.get('companyUrl'),
      projectContext: fd.get('projectContext'),
      quote: fd.get('quote'),
      rating,
      consentToPublish: fd.get('consentToPublish') === 'on',
      inviteToken,
      website: fd.get('website'), // honeypot
    };

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrors(json.fields ?? {});
        setFormError(json.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      setFormError('We could not reach the server. Please check your connection.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="mx-auto max-w-lg rotate-[0.8deg] rounded-lg bg-[#FFF8B8] p-10 text-center shadow-[0_14px_36px_-12px_rgba(22,32,61,0.35)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#16203D]">
          <Check className="h-7 w-7 text-[#FFF8B8]" />
        </div>
        <h2 className="font-sans text-2xl font-extrabold text-[#16203D]">
          Thank you, genuinely.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#4A4632]">
          We&apos;ve got it. Nothing is public yet — we&apos;ll read it properly,
          and it&apos;ll only go on the site because you said we could.
        </p>
        <p className="mt-5 text-xs text-[#6B6650]">
          Now go finish your chai. ☕
        </p>
      </div>
    );
  }

  const activeRating = hoverRating ?? rating;

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-2xl">
      {/* Sticky note body */}
      <div className="relative rotate-[-0.9deg] rounded-lg bg-[#FFF8B8] p-7 shadow-[0_18px_44px_-14px_rgba(22,32,61,0.38)] sm:p-10">
        {/* Tape strip at the top, holding the note down */}
        <div
          aria-hidden
          className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-[-2deg] bg-[#E8E2CE]/80 shadow-sm"
          style={{ clipPath: 'polygon(4% 0, 96% 0, 100% 100%, 0 100%)' }}
        />

        {/* Rating */}
        <fieldset className="mb-8">
          <legend className="mb-3 block font-sans text-sm font-extrabold text-[#16203D]">
            Overall, how was it?
          </legend>
          <div className="flex items-center gap-1.5" onMouseLeave={() => setHoverRating(null)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                aria-label={`${n} out of 5 stars`}
                aria-pressed={rating === n}
                className="tap-target flex items-center justify-center rounded-md transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    n <= activeRating
                      ? 'fill-[#E0A32E] text-[#B8801F]'
                      : 'fill-transparent text-[#B9B292]'
                  }`}
                  strokeWidth={2}
                />
              </button>
            ))}
            <span className="ml-3 text-sm font-bold text-[#4A4632]">
              {rating}/5
            </span>
          </div>
        </fieldset>

        <PaperField
          label="Your name"
          name="authorName"
          required
          error={errors.authorName}
          placeholder="Priya Sharma"
        />

        <div className="grid gap-x-8 sm:grid-cols-2">
          <PaperField
            label="Your role"
            name="authorRole"
            error={errors.authorRole}
            placeholder="Founder"
          />
          <PaperField
            label="Business name"
            name="companyName"
            error={errors.companyName}
            placeholder="Your brand"
          />
        </div>

        <PaperField
          label="Website (optional, so readers can see you're real)"
          name="companyUrl"
          type="url"
          error={errors.companyUrl}
          placeholder="https://yourbrand.in"
        />

        <PaperField
          label="What did we build for you?"
          name="projectContext"
          error={errors.projectContext}
          placeholder="A new website and Google Ads setup"
        />

        {/* The main event */}
        <div className="mt-7">
          <label
            htmlFor="quote"
            className="mb-2 block font-sans text-sm font-extrabold text-[#16203D]"
          >
            In your own words
          </label>
          <p className="mb-3 text-xs leading-relaxed text-[#6B6650]">
            The useful ones are specific. What was the problem before, what
            changed, and what was it like working with us day to day?
          </p>
          <textarea
            id="quote"
            name="quote"
            required
            rows={6}
            minLength={40}
            placeholder="Before this, our website barely got any enquiries…"
            className="w-full resize-y rounded-md border-none bg-[#FFFDF0]/70 p-4 font-sans text-[15px] leading-[32px] text-[#16203D] shadow-inner outline-none placeholder:text-[#B9B292] focus:ring-2 focus:ring-[#8A2B88]/40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 31px, rgba(22,32,61,0.10) 31px, rgba(22,32,61,0.10) 32px)',
            }}
          />
          {errors.quote && <FieldError>{errors.quote}</FieldError>}
        </div>

        <PaperField
          label="Your email (kept private — never published)"
          name="authorEmail"
          type="email"
          required
          error={errors.authorEmail}
          placeholder="priya@yourbrand.in"
        />

        {/* Honeypot — hidden from humans, catnip for naive bots. */}
        <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
          <label htmlFor="website-hp">Leave this empty</label>
          <input id="website-hp" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Consent */}
        <div className="mt-8 rounded-md bg-[#16203D]/[0.05] p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consentToPublish"
              required
              className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#8A2B88]"
            />
            <span className="text-[13px] leading-relaxed text-[#4A4632]">
              Skovento can publish this review, with my name
              {' '}and business name, on their website and social media.
            </span>
          </label>
          {errors.consentToPublish && (
            <FieldError>{errors.consentToPublish}</FieldError>
          )}
        </div>

        {formError && (
          <p role="alert" className="mt-5 text-sm font-semibold text-[#A3341F]">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="tap-target mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#16203D] px-6 py-4 font-sans text-base font-bold text-[#FAF8F5] shadow-lg transition-all hover:bg-[#8A2B88] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send it over
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* --- Paper-style underlined field ---------------------------------------- */

function PaperField({
  label,
  name,
  type = 'text',
  required = false,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="mt-7">
      <label
        htmlFor={name}
        className="mb-1.5 block font-sans text-sm font-extrabold text-[#16203D]"
      >
        {label}
        {required && <span className="ml-1 text-[#8A2B88]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border-0 border-b-2 border-[#16203D]/25 bg-transparent px-0 pb-2 pt-1 font-sans text-[15px] text-[#16203D] outline-none transition-colors placeholder:text-[#B9B292] focus:border-[#8A2B88]"
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mt-1.5 text-xs font-semibold text-[#A3341F]">
      {children}
    </p>
  );
}
