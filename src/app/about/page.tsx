'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { ShieldCheck, Target, Users, Zap, Globe, Sparkles, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const values = [
    {
      icon: <Target className="w-6 h-6 text-[#8A2B88]" />,
      title: 'Results First',
      desc: 'We don’t measure success by code lines or static designs — we measure it by your commercial revenue growth and conversion rates.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C88770]" />,
      title: 'Complete Transparency',
      desc: 'Clear sprint timelines, open Slack channels, transparent Notion boards, and zero hidden operational fees.'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#1E2E6B]" />,
      title: 'Dual-Discipline Synergy',
      desc: 'Software engineers and growth marketers working side-by-side from day zero to ensure zero disconnect between tech and revenue.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#8A2B88]" />,
      title: 'Continuous Evolution',
      desc: 'We stay at the absolute cutting edge of web frameworks, AI tools, search algorithms, and UI micro-interactions.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-grow pt-28">
        {/* About Hero */}
        <section className="py-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 inline-block">
              Our Story & Philosophy
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight mb-6">
              Engineering Perfection Meets <span className="text-gradient-brand">Marketing Growth.</span>
            </h1>
            <p className="text-lg text-[#424965] leading-relaxed">
              Skovento was founded to solve a massive industry problem: business owners were tired of hiring design agencies that couldn’t code, and dev shops that didn’t understand marketing.
            </p>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                  Why We Built Skovento
                </span>
                <h2 className="text-3xl font-extrabold text-[#16203D] font-sans">
                  One unified digital engine for high-performing brands.
                </h2>
                <p className="text-sm text-[#424965] leading-relaxed">
                  In traditional digital agencies, developers build websites in isolation. Then, marketing teams are hired months later to drive traffic to a site that wasn't optimized for SEO or conversions in the first place.
                </p>
                <p className="text-sm text-[#424965] leading-relaxed">
                  We built Skovento to bring engineering and marketing under one unified roof. Every line of code, every database schema, and every UI pixel is designed from day one to rank on Google and convert visitors into loyal customers.
                </p>
              </div>

              {/* Global Talent Advantage Card */}
              <div className="p-8 bg-[#16203D] text-[#FAF8F5] rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A2B88]/30 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-[#E5C396]">
                    <Globe className="w-4 h-4 text-[#C88770]" />
                    <span>The Global Specialized Talent Advantage</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-sans">
                    World-class talent. Unmatched velocity and value.
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed">
                    We recruit top 1% senior engineers and performance marketers globally. This allows us to provide 24/7 sprint velocity, specialized senior talent on demand, and premium execution at highly competitive rates for businesses across North America, Europe, and worldwide.
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#E5C396] font-bold">
                    <span>24/7 Project Velocity</span>
                    <span>•</span>
                    <span>100% US & Global Standard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-[#F3EFEA] border-y border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                What Drives Us
              </span>
              <h2 className="text-3xl font-extrabold text-[#16203D] font-sans">
                Our Mission & Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <div key={idx} className="p-6 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl shadow-sm">
                  <div className="p-3 bg-[#F3EFEA] rounded-2xl w-fit mb-4">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#16203D] mb-2 font-sans">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#424965] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTASection onOpenModal={() => setModalOpen(true)} />
      </main>

      <Footer />
      <FloatingContactBtn onOpenModal={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
