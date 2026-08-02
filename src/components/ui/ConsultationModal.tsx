'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Send, Calendar, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from './Button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');

      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E2E6B', '#8A2B88', '#C88770']
      });
    }, 1000);
  };

  const handleReset = () => {
    setStep('form');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Website Development',
      details: ''
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
                  <span>Free 30-Min Strategy Call</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#16203D] mb-2 font-sans">
                  Let’s Build Something Great.
                </h3>
                <p className="text-sm text-[#424965] mb-6">
                  No pushy sales reps. Talk directly with senior engineers and growth strategists about your project.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                      Core Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
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

                  <div>
                    <label className="block text-xs font-semibold text-[#16203D] uppercase tracking-wider mb-1.5">
                      Project Details & Goals
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your timeline, business goals, or current bottlenecks..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" fullWidth disabled={isSubmitting} icon={<Send className="w-4 h-4" />}>
                      {isSubmitting ? 'Scheduling Your Call...' : 'Book Free Consultation'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#424965] pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#8A2B88]" />
                    <span>Strict 100% Privacy Guarantee • Response in &lt; 24h</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#8A2B88]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#8A2B88]">
                  <CheckCircle2 className="w-10 h-10 text-[#8A2B88]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#16203D] mb-2">
                  Strategy Session Reserved!
                </h3>
                <p className="text-[#424965] mb-6 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#16203D]">{formData.name}</span>. Our lead strategist will review your details and email you a direct meeting link within 24 business hours.
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
