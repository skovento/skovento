'use client';
import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/ui/Icon';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function ContactForm({ serviceOptions, budgetOptions }: { serviceOptions: string[]; budgetOptions: string[] }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setFieldErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact-page', pagePath: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('done');
        form.reset();
        return;
      }
      setFieldErrors(json.fields ?? {});
      setMessage(json.error ?? 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setMessage('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="card flex flex-col items-center gap-3 p-10 text-center" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ok/15 text-ok"><Icon name="Check" size={24} /></span>
        <h2 className="text-2xl font-bold">Thanks — we have your enquiry</h2>
        <p className="text-muted">We will reply within one business day with next steps.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost mt-2">Send another</button>
      </div>
    );
  }

  const err = (k: string) => fieldErrors[k] && <p className="mt-1 text-xs text-[#ff8a8a]" role="alert">{fieldErrors[k]}</p>;

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name *</label>
          <input id="name" name="name" required minLength={2} autoComplete="name" className="field" placeholder="Your name" />
          {err('name')}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@company.com" />
          {err('email')}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" placeholder="+91" />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Company</label>
          <input id="company" name="company" autoComplete="organization" className="field" placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium">What do you need?</label>
          <select id="service" name="service" className="field" defaultValue="">
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budgetRange" className="mb-1.5 block text-sm font-medium">Budget range</label>
          <select id="budgetRange" name="budgetRange" className="field" defaultValue="">
            <option value="" disabled>Select a range</option>
            {budgetOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Project details</label>
        <textarea id="message" name="message" rows={5} maxLength={5000} className="field resize-y py-3" placeholder="What are you trying to build or fix?" />
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {status === 'error' && <p className="rounded-lg border border-[#ff8a8a]/40 bg-[#ff8a8a]/10 px-4 py-3 text-sm text-[#ffb3b3]" role="alert">{message}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}<Icon name="ArrowRight" size={18} />
      </button>
      <p className="text-xs text-faint">By submitting you agree to our privacy policy. We only use your details to respond to your enquiry.</p>
    </form>
  );
}
