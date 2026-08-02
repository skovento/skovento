'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const packages = [
    {
      name: 'Launch Pad',
      badge: 'For Startups',
      price: 'Custom Project',
      desc: 'Ideal for early-stage companies needing a high-converting website and brand setup.',
      features: [
        'Custom Responsive Website (5-7 Pages)',
        'Core Web Vitals Speed Optimization',
        'Basic SEO Schema Setup',
        'Logo & Brand Style Guide',
        'Google Business & Analytics Setup',
        '30-Day Post-Launch SLA Warranty'
      ]
    },
    {
      name: 'Growth Engine',
      badge: 'Most Popular',
      popular: true,
      price: 'Growth Retainer',
      desc: 'Complete engineering + multi-channel digital marketing team driving monthly leads.',
      features: [
        'Everything in Launch Pad',
        'Custom E-commerce or SaaS Web App',
        'Monthly Technical & On-Page SEO',
        'Google Ads & Paid Search (PPC)',
        'Social Media Content & Paid Funnels',
        'Conversion Rate Optimization (CRO)',
        'Dedicated Slack & Weekly Sprint Calls'
      ]
    },
    {
      name: 'Enterprise Custom',
      badge: 'Scale & Authority',
      price: 'Tailored Scope',
      desc: 'Full-scale custom software development and global multi-channel acquisition.',
      features: [
        'Headless Next.js Web App Architecture',
        'Custom API & ERP System Integration',
        'Omnichannel Marketing & Email Flows',
        'Dedicated Senior Dev & Strategist Team',
        '24/7 Priority SLA Emergency Support',
        'Custom Security Audits & Compliance'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-grow pt-28">
        {/* Services Hero */}
        <section className="py-16 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E3DCD3] text-xs font-semibold text-[#8A2B88] mb-4">
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>Full-Stack Digital Solutions</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight mb-4">
              Complete Digital Capabilities. <span className="text-gradient-brand">Unified Execution.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#424965]">
              Explore our 12 specialized development and marketing disciplines engineered to turn your brand into a market leader.
            </p>
          </div>
        </section>

        {/* 12 Services Grid */}
        <ServicesGrid />

        {/* Package Tiers Comparison */}
        <section className="py-20 bg-[#F3EFEA] border-y border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                Engagement Models
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D] font-sans">
                Flexible packages built for your growth stage
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-3xl bg-[#FAF8F5] border transition-all duration-300 flex flex-col justify-between relative ${
                    pkg.popular
                      ? 'border-[#8A2B88] shadow-2xl scale-105'
                      : 'border-[#E3DCD3] shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#8A2B88] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-md">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    {!pkg.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A2B88] px-3 py-1 bg-[#F3EFEA] rounded-full w-fit">
                        {pkg.badge}
                      </span>
                    )}

                    <h3 className="text-2xl font-extrabold text-[#16203D] mt-3 mb-2 font-sans">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#424965] mb-6">
                      {pkg.desc}
                    </p>

                    <div className="text-lg font-bold text-[#8A2B88] mb-6 border-b border-[#E3DCD3] pb-4">
                      {pkg.price}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#424965]">
                          <CheckCircle2 className="w-4 h-4 text-[#C88770] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => setModalOpen(true)}
                  >
                    Request Proposal
                  </Button>
                </div>
              ))}
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
