'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, PhoneCall, Send, CheckCircle2, ShieldCheck, AlertCircle, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';
import { whatsappLink, telLink, PHONE_NUMBER_DISPLAY } from '@/lib/contact';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Business Website',
    budgetRange: '₹50,000 – ₹1,50,000',
    preferredContact: 'Email',
    message: '',
    website: '', // honeypot
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.fields) {
          setFieldErrors(data.fields);
        }
        setErrorMessage(data?.error || 'Something went wrong while submitting. Please try emailing us directly.');
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error('[contact error]', err);
      setErrorMessage('Network error. Please try again or reach out directly via email or WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#16203D] selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* Contact Hero */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3DCD3] text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              Project Enquiries
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight">
              Discuss Your Project
            </h1>

            <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
              Tell us what you need to build, improve, or automate. We will review your requirements and provide a practical, honest next step.
            </p>
          </div>
        </section>

        {/* Form & Direct Contact Details */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Direct Contact & Transparency */}
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 rounded-3xl border border-[#E3DCD3] bg-white space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[#16203D]">
                      Direct Studio Contact
                    </h2>
                    <p className="text-sm text-[#424965] leading-relaxed">
                      Prefer direct communication? You can reach us directly via email or WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] text-sm font-semibold text-[#16203D] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#E3DCD3] flex items-center justify-center text-[#4F46E5] shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#424965] block">Studio Email</span>
                        <span>{siteConfig.contact.email}</span>
                      </div>
                    </a>

                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] text-sm font-semibold text-[#16203D] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#E3DCD3] flex items-center justify-center text-emerald-600 shrink-0">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#424965] block">Direct WhatsApp</span>
                        <span>Chat on WhatsApp</span>
                      </div>
                    </a>

                    <a
                      href={telLink()}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] text-sm font-semibold text-[#16203D] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-[#E3DCD3] flex items-center justify-center text-[#4F46E5] shrink-0">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#424965] block">Phone Line</span>
                        <span>{PHONE_NUMBER_DISPLAY}</span>
                      </div>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-[#E3DCD3] flex items-center gap-2 text-xs text-[#424965]">
                    <Clock className="w-4 h-4 text-[#4F46E5] shrink-0" />
                    <span>Average reply time: within 1 business day.</span>
                  </div>
                </div>

                {/* Studio Confidentiality Box */}
                <div className="p-7 rounded-3xl border border-[#E3DCD3] bg-[#F3EFEA] space-y-3 text-xs text-[#424965]">
                  <div className="flex items-center gap-2 font-bold text-[#16203D]">
                    <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
                    <span>Privacy &amp; Data Confidentiality</span>
                  </div>
                  <p className="leading-relaxed">
                    We treat all project briefs and operational business information in strict confidence. Your information is never shared or sold.
                  </p>
                </div>
              </div>

              {/* Right Column: Intake Form */}
              <div className="lg:col-span-7 rounded-3xl border border-[#E3DCD3] bg-white p-8 sm:p-10 shadow-xs">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-[#16203D]">
                        Project Enquiry Form
                      </h2>
                      <p className="text-xs text-[#424965]">
                        Fields marked with an asterisk (*) are required.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Honeypot field (hidden from humans, catches automated spam bots) */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Leave this field blank</label>
                      <input
                        id="website"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="e.g. Rahul Mehta"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] ${
                            fieldErrors.name ? 'border-red-400' : 'border-[#E3DCD3]'
                          }`}
                        />
                        {fieldErrors.name && (
                          <span className="text-[11px] text-red-600 mt-1 block">{fieldErrors.name}</span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                          Business Name (Optional)
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder="e.g. Mehta Logistics"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E3DCD3] bg-[#FAF8F5] text-sm text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] ${
                            fieldErrors.email ? 'border-red-400' : 'border-[#E3DCD3]'
                          }`}
                        />
                        {fieldErrors.email && (
                          <span className="text-[11px] text-red-600 mt-1 block">{fieldErrors.email}</span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                          Phone or WhatsApp (Optional)
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E3DCD3] bg-[#FAF8F5] text-sm text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="service" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                          Project Type
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E3DCD3] bg-[#FAF8F5] text-sm text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        >
                          <option value="Business Website">Business Website</option>
                          <option value="E-commerce Store">E-commerce Store</option>
                          <option value="Booking & Reservation System">Booking &amp; Reservation System</option>
                          <option value="Custom Web Application">Custom Web Application / Portal</option>
                          <option value="Dashboard or Internal Tool">Dashboard or Internal Tool</option>
                          <option value="Technical SEO & Performance">Technical SEO &amp; Performance</option>
                          <option value="General Enquiry">General / Other Enquiry</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="budgetRange" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budgetRange"
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E3DCD3] bg-[#FAF8F5] text-sm text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                        >
                          <option value="Under ₹50,000">Under ₹50,000</option>
                          <option value="₹50,000 – ₹1,50,000">₹50,000 – ₹1,50,000</option>
                          <option value="₹1,50,000 – ₹3,00,000">₹1,50,000 – ₹3,00,000</option>
                          <option value="₹3,00,000+">₹3,00,000+</option>
                          <option value="Flexible / Need Guidance">Flexible / Need Guidance</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Email', 'WhatsApp', 'Phone Call'].map((method) => (
                          <label
                            key={method}
                            className={`flex items-center justify-center p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                              formData.preferredContact === method
                                ? 'bg-indigo-50 border-[#4F46E5] text-[#4F46E5]'
                                : 'bg-[#FAF8F5] border-[#E3DCD3] text-[#424965] hover:border-[#16203D]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="preferredContact"
                              value={method}
                              checked={formData.preferredContact === method}
                              onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                              className="sr-only"
                            />
                            <span>{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                        Project Description *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        placeholder="Tell us about your business, the current challenge, and what you would like to build or improve..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-sm text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] ${
                          fieldErrors.message ? 'border-red-400' : 'border-[#E3DCD3]'
                        }`}
                      />
                      {fieldErrors.message && (
                        <span className="text-[11px] text-red-600 mt-1 block">{fieldErrors.message}</span>
                      )}
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      disabled={isSubmitting}
                      icon={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Sending Enquiry...' : 'Submit Project Enquiry'}
                    </Button>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-[#16203D]">
                        Enquiry Received
                      </h3>
                      <p className="text-sm text-[#424965] max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, <strong>{formData.name}</strong>. We have received your project details and will review them before replying within 1 business day.
                      </p>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            company: '',
                            email: '',
                            phone: '',
                            service: 'Business Website',
                            budgetRange: '₹50,000 – ₹1,50,000',
                            preferredContact: 'Email',
                            message: '',
                            website: '',
                          });
                        }}
                      >
                        Send Another Note
                      </Button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
