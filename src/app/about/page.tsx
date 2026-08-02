'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { ShieldCheck, Target, Eye, Compass, Heart, Globe, Sparkles, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const values = [
    {
      icon: <Target className="w-6 h-6 text-[#8A2B88]" />,
      title: 'Growth First',
      desc: 'We measure success by commercial revenue growth, customer inquiries, and conversion rates.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C88770]" />,
      title: 'Complete Transparency',
      desc: 'Clear timelines, direct updates, transparent communication, and zero hidden operational fees.'
    },
    {
      icon: <Compass className="w-6 h-6 text-[#1E2E6B]" />,
      title: 'Dual-Discipline Synergy',
      desc: 'Software engineers and growth marketers working side-by-side to ensure zero disconnect between tech and revenue.'
    },
    {
      icon: <Award className="w-6 h-6 text-[#8A2B88]" />,
      title: 'Continuous Evolution',
      desc: 'Staying at the absolute cutting edge of Next.js, AI automation, search algorithms, and CRO performance.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-grow pt-28">
        {/* About Hero & Mission Statement */}
        <section className="py-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 inline-block">
              About Skovento
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight mb-6">
              Engineering Perfection Meets <span className="text-gradient-brand">Marketing Growth.</span>
            </h1>
            <p className="text-lg text-[#424965] leading-relaxed">
              We Don't Just Build Websites. We Build Businesses That Grow.
            </p>
          </div>
        </section>

        {/* Section 1: Our Story */}
        <section id="our-story" className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                  01. Our Story
                </span>
                <h2 className="text-3xl font-extrabold text-[#16203D] font-sans">
                  Why We Started Skovento
                </h2>
                <p className="text-sm text-[#424965] leading-relaxed">
                  In traditional digital agencies, developers build websites in isolation. Then, marketing teams are hired months later to drive traffic to a site that wasn't optimized for SEO or conversions in the first place.
                </p>
                <p className="text-sm text-[#424965] leading-relaxed">
                  We built Skovento to bring senior web engineering and result-driven marketing under one unified roof. Every line of code, every database schema, and every UI pixel is designed from day one to rank on Google and convert visitors into loyal customers.
                </p>
              </div>

              {/* Story Highlight Card */}
              <div className="p-8 bg-[#16203D] text-[#FAF8F5] rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A2B88]/30 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-[#E5C396]">
                    <Globe className="w-4 h-4 text-[#C88770]" />
                    <span>Global Senior Talent Advantage</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white font-sans">
                    Bridging the market gap between dev & growth.
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed">
                    By combining senior engineering speed with conversion marketing strategy, we deliver enterprise-grade performance that helps ambitious startups and growing businesses win online.
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#E5C396] font-bold">
                    <span>24/7 Sprint Velocity</span>
                    <span>•</span>
                    <span>100% Outcome Driven</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 & 3: Mission & Vision */}
        <section id="mission-vision" className="py-20 bg-[#F3EFEA] border-y border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Mission Card */}
              <div className="p-8 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl space-y-4 shadow-sm">
                <div className="p-3 bg-[#F3EFEA] rounded-2xl w-fit">
                  <Target className="w-6 h-6 text-[#8A2B88]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                  02. Our Mission
                </span>
                <h3 className="text-2xl font-bold text-[#16203D] font-sans">
                  Empowering Businesses With Solid Digital Foundations
                </h3>
                <p className="text-sm text-[#424965] leading-relaxed">
                  Our mission is to help ambitious startups and growing businesses build their digital presence, generate qualified customer leads, and scale revenue through high-performing web code and targeted acquisition campaigns.
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-8 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl space-y-4 shadow-sm">
                <div className="p-3 bg-[#F3EFEA] rounded-2xl w-fit">
                  <Eye className="w-6 h-6 text-[#C88770]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C88770]">
                  03. Our Vision
                </span>
                <h3 className="text-2xl font-bold text-[#16203D] font-sans">
                  Becoming the World's Preferred Growth Partner
                </h3>
                <p className="text-sm text-[#424965] leading-relaxed">
                  Our vision is to become the premier growth consultancy for growing brands globally, renowned for zero-fluff transparency, high-velocity engineering, and measurable ROI impact.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Our Values */}
        <section id="our-values" className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                04. Our Values
              </span>
              <h2 className="text-3xl font-extrabold text-[#16203D] font-sans">
                What Guides Our Execution
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <div key={idx} className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl shadow-sm">
                  <div className="p-3 bg-[#FAF8F5] rounded-2xl w-fit mb-4">
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

        {/* Section 5: Why We Exist */}
        <section id="why-we-exist" className="py-20 bg-[#16203D] text-[#FAF8F5] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C396]">
              05. Why We Exist
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans">
              "Because Most Businesses Don't Have a Marketing Problem — They Have a Digital Foundation Problem."
            </h2>
            <p className="text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
              We exist to give business owners confidence, clarity, and predictable customer growth by fixing their underlying digital foundation.
            </p>
            <div className="pt-4">
              <Button size="lg" onClick={() => setModalOpen(true)}>
                Book Free Consultation
              </Button>
            </div>
          </div>
        </section>

        <FinalCTASection onOpenModal={() => setModalOpen(true)} />
      </main>

      <Footer />
      <FloatingContactBtn />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
