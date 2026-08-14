'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How fast can we start our project?',
      a: 'Typical onboarding takes 3-5 business days after proposal alignment and initial discovery brief.'
    },
    {
      q: 'Do you offer ongoing retainer packages?',
      a: 'Yes, we provide combined web maintenance and multi-channel growth retainers to ensure continuous performance.'
    },
    {
      q: 'How do you handle communication during the project?',
      a: 'We set up a dedicated Slack channel, host weekly video sprint calls, and share transparent Notion dashboards.'
    },
    {
      q: 'What is your average response time?',
      a: 'We maintain a strict 24-hour business SLA guarantee for all inquiries and active client requests.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-grow pt-28">
        {/* Contact Hero */}
        <section className="py-16 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 inline-block">
              Let's Build Together
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight mb-4">
              Start Your Project <span className="text-gradient-brand">Conversation.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#424965]">
              Have a project in mind or need expert advice? Reach out and let’s discuss how we can help your brand grow.
            </p>
          </div>
        </section>

        {/* Main Intake Form & Info Grid */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Contact Method Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-6">
                  <h3 className="text-2xl font-bold text-[#16203D] font-sans">
                    Get in Touch
                  </h3>
                  <p className="text-sm text-[#424965]">
                    Fill out the lead intake form or contact our team directly via email or phone.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-sm text-[#16203D] font-semibold">
                      <div className="p-2.5 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#8A2B88]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-[#424965]">Email Inquiry</div>
                        <span>hello@skovento.com</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#16203D] font-semibold">
                      <div className="p-2.5 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#C88770]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-[#424965]">Response Time SLA</div>
                        <span>Under 24 Business Hours</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#16203D] font-semibold">
                      <div className="p-2.5 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#1E2E6B]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-[#424965]">Global Client Hubs</div>
                        <span>India & Worldwide</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Guarantee Box */}
                <div className="p-6 bg-[#16203D] text-[#FAF8F5] rounded-3xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E5C396]">
                    <ShieldCheck className="w-4 h-4 text-[#C88770]" />
                    <span>100% Confidentiality Assured</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    We sign standard Non-Disclosure Agreements (NDAs) upon request before discussing custom software architecture or proprietary business data.
                  </p>
                </div>
              </div>

              {/* Right Intake Form */}
              <div className="lg:col-span-7 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl p-8 sm:p-10 shadow-sm">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#16203D] font-sans">
                      Project Intake Form
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/40 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="priya@yourbrand.in"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/40 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/40 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                          Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                        >
                          <option>Website Development</option>
                          <option>E-commerce Store</option>
                          <option>Web Application / SaaS</option>
                          <option>UI/UX Design</option>
                          <option>SEO & Organic Growth</option>
                          <option>PPC Google Ads</option>
                          <option>Social Media Marketing</option>
                          <option>Branding & Graphic Design</option>
                          <option>Full Digital Growth Engine</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                        Project Overview & Target Goals *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your project goals, current challenges, and desired timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/40 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                      />
                    </div>

                    <Button type="submit" fullWidth disabled={isSubmitting} icon={<Send className="w-4 h-4" />}>
                      {isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-[#8A2B88]/10 rounded-full flex items-center justify-center mx-auto text-[#8A2B88]">
                      <CheckCircle2 className="w-10 h-10 text-[#8A2B88]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#16203D]">
                      Message Received!
                    </h3>
                    <p className="text-sm text-[#424965] max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-[#16203D]">{formData.name}</span>. Our strategy team will review your project brief and reply within 24 business hours.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Pre-Sales FAQ */}
        <section className="py-20 bg-[#F3EFEA] border-t border-[#E3DCD3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                Pre-Sales FAQ
              </span>
              <h2 className="text-3xl font-extrabold text-[#16203D] font-sans">
                Common Questions Before Hiring Us
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="border border-[#E3DCD3] bg-[#FAF8F5] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-5 text-left font-bold text-[#16203D] flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-sans">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#8A2B88] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-xs text-[#424965] leading-relaxed border-t border-[#E3DCD3]/60 pt-3">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingContactBtn />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
