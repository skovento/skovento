'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/services';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, 
  ChevronDown, TrendingUp, HelpCircle, ArrowLeft 
} from 'lucide-react';

export default function IndividualServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-grow pt-28">
        {/* Service Hero */}
        <section className="py-20 bg-[#F3EFEA] border-b border-[#E3DCD3] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#8A2B88] hover:text-[#16203D] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All 12 Services</span>
            </Link>

            <div className="max-w-3xl space-y-6">
              <span className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] text-xs font-extrabold rounded-full uppercase tracking-wider">
                {service.badge}
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-lg text-[#424965] leading-relaxed">
                {service.detailedDescription}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button size="lg" onClick={() => setModalOpen(true)} icon={<ArrowRight className="w-5 h-5" />}>
                  Get a Custom Quote for {service.title}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                  What's Included
                </span>
                <h2 className="text-3xl font-extrabold text-[#16203D] mt-2 mb-6 font-sans">
                  Comprehensive deliverables engineered for performance
                </h2>
                <p className="text-sm text-[#424965] mb-8 leading-relaxed">
                  When you partner with Skovento for {service.title}, you get an end-to-end execution package designed to leave zero gaps in quality or security.
                </p>

                <div className="space-y-4">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#F3EFEA] border border-[#E3DCD3] rounded-2xl">
                      <CheckCircle2 className="w-5 h-5 text-[#C88770] flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-[#16203D]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Case Study Proof Card */}
              <div className="p-8 bg-[#16203D] text-[#FAF8F5] rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A2B88]/30 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-[#E5C396]">
                    <TrendingUp className="w-4 h-4 text-[#C88770]" />
                    <span>Proven Service Result</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-sans">
                    {service.proof.headline}
                  </h3>

                  <div className="text-5xl font-extrabold text-[#E5C396] font-sans">
                    {service.proof.stat}
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed">
                    {service.proof.desc}
                  </p>

                  <div className="pt-4 border-t border-white/10">
                    <Button variant="secondary" fullWidth onClick={() => setModalOpen(true)}>
                      Achieve Similar Results
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Execution Process */}
        <section className="py-20 bg-[#F3EFEA] border-y border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                Delivery Framework
              </span>
              <h2 className="text-3xl font-extrabold text-[#16203D] font-sans">
                How we deliver {service.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {service.process.map((p, idx) => (
                <div key={idx} className="p-6 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl relative">
                  <span className="text-xs font-extrabold text-[#8A2B88] uppercase tracking-widest block mb-2">
                    Step {p.step}
                  </span>
                  <h3 className="text-lg font-bold text-[#16203D] mb-2 font-sans">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#424965] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                Questions & Answers
              </span>
              <h2 className="text-3xl font-extrabold text-[#16203D] font-sans">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#E3DCD3] bg-[#F3EFEA] rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left font-bold text-[#16203D] flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm font-sans">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-[#8A2B88] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-[#424965] leading-relaxed border-t border-[#E3DCD3]/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingContactBtn onOpenModal={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
