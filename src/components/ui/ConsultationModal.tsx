'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send, Calendar, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './Button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'consultation' | 'audit';
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'consultation',
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialMode === 'audit' ? 'Free Digital Audit' : 'New Website',
    message: '',
    website: '', // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStep('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#16203D', '#8A2B88', '#C88770'],
        });
      }
    } catch (err) {
      console.error('[modal] submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'New Website',
      message: '',
      website: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#16203D]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#8A2B88]/20 to-[#C88770]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-[#424965] hover:text-[#16203D] hover:bg-[#EAE4DC] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 'form' ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8A2B88] uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-[#C88770]" />
                  <span>
                    {initialMode === 'audit' ? 'Request Free Digital Presence Audit' : 'Start a Conversation'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#16203D] mb-2 font-sans">
                  {initialMode === 'audit' ? 'See Where Your Business Can Improve' : 'Let’s Build Something Useful.'}
                </h3>
                <p className="text-sm text-[#424965] mb-6">
                  {initialMode === 'audit'
                    ? 'We evaluate your mobile site, Google presence, and customer flow. Zero technical jargon, 100% actionable advice.'
                    : 'Talk directly with our 3-member team. No pushy sales reps, no arbitrary estimates.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <div aria-hidden className="hidden">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="priya@yourbrand.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                        Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Brand / Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                        What are you looking for?
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                      >
                        <option>New Website</option>
                        <option>Website Redesign</option>
                        <option>Web Application</option>
                        <option>SEO & Local Visibility</option>
                        <option>Digital Marketing</option>
                        <option>Landing Page</option>
                        <option>Custom Software</option>
                        <option>Free Digital Audit</option>
                        <option>Not Sure — Need Advice</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                      Tell us about your business or requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your current challenges, Instagram page, website, or goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" fullWidth disabled={isSubmitting} icon={<Send className="w-4 h-4" />}>
                      {isSubmitting
                        ? 'Sending Request...'
                        : initialMode === 'audit'
                        ? 'Request Free Digital Audit'
                        : 'Start a Conversation'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#424965] pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#8A2B88]" />
                    <span>Strict 100% Privacy Guarantee • Direct Response in &lt; 24h</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#8A2B88]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#8A2B88]">
                  <CheckCircle2 className="w-10 h-10 text-[#8A2B88]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#16203D] mb-2">
                  Request Received!
                </h3>
                <p className="text-[#424965] mb-6 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#16203D]">{formData.name}</span>. Our team will review your details and reach out via email/WhatsApp within 24 hours.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Close Window
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

