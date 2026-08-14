'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { Button } from '@/components/ui/Button';
import { Search, ShieldCheck, CheckCircle2, Send, Sparkles, Smartphone, Eye, MapPin, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuditPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'consultation' | 'audit'>('audit');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    websiteOrSocial: '',
    notes: '',
  });

  const handleOpenConsultation = () => {
    setModalMode('consultation');
    setIsModalOpen(true);
  };

  const handleOpenAuditModal = () => {
    setModalMode('audit');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.businessName,
          service: 'Free Digital Audit Page Request',
          message: `Website/Social: ${formData.websiteOrSocial} | Notes: ${formData.notes}`,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#16203D', '#8A2B88', '#C88770'],
        });
      }
    } catch (err) {
      console.error('[audit-page] submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white pb-16 sm:pb-0">
      <Navbar onOpenModal={handleOpenConsultation} onOpenAuditModal={handleOpenAuditModal} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>100% Free &amp; Zero Pushy Sales Pitch</span>
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
              Get a Free Digital Presence Audit for Your Business
            </h1>
            
            <p className="text-base sm:text-lg text-[#424965] max-w-2xl mx-auto leading-relaxed">
              We analyze your mobile layout, Google Search visibility, customer conversion path, and page speed. You get a clear, 1-page report with actionable suggestions.
            </p>
          </div>

          {/* Audit Checkpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#F3EFEA] border border-[#E3DCD3] rounded-2xl space-y-2">
              <Smartphone className="w-6 h-6 text-[#8A2B88]" />
              <h3 className="text-sm font-bold">Mobile Experience</h3>
              <p className="text-xs text-[#424965]">Checks tap targets, font legibility, and loading speed on mobile devices.</p>
            </div>
            
            <div className="p-5 bg-[#F3EFEA] border border-[#E3DCD3] rounded-2xl space-y-2">
              <Eye className="w-6 h-6 text-[#C88770]" />
              <h3 className="text-sm font-bold">Customer Journey</h3>
              <p className="text-xs text-[#424965]">Evaluates whether a new visitor can find your products, pricing, and contact in 5 seconds.</p>
            </div>

            <div className="p-5 bg-[#F3EFEA] border border-[#E3DCD3] rounded-2xl space-y-2">
              <MapPin className="w-6 h-6 text-[#8A2B88]" />
              <h3 className="text-sm font-bold">Local Search</h3>
              <p className="text-xs text-[#424965]">Checks Google Maps presence, business hours accuracy, and search indexing.</p>
            </div>

            <div className="p-5 bg-[#F3EFEA] border border-[#E3DCD3] rounded-2xl space-y-2">
              <Zap className="w-6 h-6 text-[#C88770]" />
              <h3 className="text-sm font-bold">Speed &amp; Tech</h3>
              <p className="text-xs text-[#424965]">Measures actual 4G loading speeds and core web vitals performance.</p>
            </div>
          </div>

          {/* Request Form */}
          <div className="p-8 sm:p-12 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl shadow-xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#8A2B88]/10 rounded-full flex items-center justify-center mx-auto text-[#8A2B88]">
                  <CheckCircle2 className="w-10 h-10 text-[#8A2B88]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#16203D]">
                  Audit Request Submitted!
                </h3>
                <p className="text-sm text-[#424965] max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#16203D]">{formData.name}</span>. Our team will review your business presence and send your custom audit report within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Mehta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                      WhatsApp / Phone Number *
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
                    <label className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@brand.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Traders"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                    Current Website URL or Instagram Link *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. www.mybusiness.com or instagram.com/mybusiness"
                    value={formData.websiteOrSocial}
                    onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#16203D] uppercase tracking-wider mb-2">
                    Any specific problem you want us to look into? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We get clicks on Instagram but nobody messages us..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-xl text-[#16203D] placeholder-[#424965]/50 focus:outline-none focus:ring-2 focus:ring-[#8A2B88]"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" fullWidth disabled={loading} icon={<Send className="w-4 h-4" />}>
                    {loading ? 'Submitting Audit Request...' : 'Send Free Audit Request'}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#424965] pt-2">
                  <ShieldCheck className="w-4 h-4 text-[#8A2B88]" />
                  <span>100% Free • No sales spam • Direct response within 24h</span>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
      
      <MobileBottomBar
        onOpenAuditModal={handleOpenAuditModal}
        onOpenConsultationModal={handleOpenConsultation}
      />

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
      />
    </div>
  );
}
