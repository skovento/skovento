'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Layout, Code, ShieldCheck, Rocket, Megaphone, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { Button } from '@/components/ui/Button';

export default function ProcessPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = [
    {
      stage: '01',
      title: 'Discovery & Research',
      desc: 'We perform a deep audit of your current digital presence, target buyer personas, industry competitors, and revenue goals.',
      deliverables: ['Competitor Benchmark Report', 'Target Persona Mapping', 'Technical & SEO Site Audit'],
      icon: <Search className="w-6 h-6 text-[#8A2B88]" />
    },
    {
      stage: '02',
      title: 'Strategy & Architecture',
      desc: 'We design custom site wireframes, conversion funnels, keyword targeting roadmaps, and ad campaign structures.',
      deliverables: ['Custom Sitemap & Wireframes', 'Keyword Acquisition Plan', 'Conversion Funnel Blueprint'],
      icon: <Compass className="w-6 h-6 text-[#C88770]" />
    },
    {
      stage: '03',
      title: 'UI/UX Interface Design',
      desc: 'We design modern, mobile-first visual prototypes with luxury aesthetics, glassmorphism, and bold display typography.',
      deliverables: ['Interactive Figma Prototypes', 'Brand Style Guide', 'Responsive Mobile Layouts'],
      icon: <Layout className="w-6 h-6 text-[#1E2E6B]" />
    },
    {
      stage: '04',
      title: 'Custom Web Engineering',
      desc: 'We code your site using Next.js 15, TypeScript, and Tailwind CSS for 100/100 Core Web Vitals performance and bank-grade security.',
      deliverables: ['Clean Next.js Codebase', '100/100 Speed Optimization', 'Schema & Metadata Markup'],
      icon: <Code className="w-6 h-6 text-[#8A2B88]" />
    },
    {
      stage: '05',
      title: 'Testing & Quality Assurance',
      desc: 'Rigorous testing across 20+ mobile devices, tablet resolutions, desktop browsers, and lead form validation handlers.',
      deliverables: ['Cross-Browser QA Pass', 'Form Intake & API Testing', 'Accessibility (a11y) Audit'],
      icon: <ShieldCheck className="w-6 h-6 text-[#C88770]" />
    },
    {
      stage: '06',
      title: 'Global Launch & Deployment',
      desc: 'Deploying your site to Vercel/Cloudflare global CDN edge networks with SSL certificates and DNS optimization.',
      deliverables: ['Edge CDN Deployment', 'SSL Security Activation', 'Google Analytics & Tag Setup'],
      icon: <Rocket className="w-6 h-6 text-[#1E2E6B]" />
    },
    {
      stage: '07',
      title: 'Targeted Marketing Launch',
      desc: 'Launching Google Ads, Meta Ads campaigns, and local SEO citations to immediately drive qualified buyer traffic.',
      deliverables: ['PPC Search Campaigns', 'Meta Retargeting Pixel', 'Google Business Profile Sync'],
      icon: <Megaphone className="w-6 h-6 text-[#8A2B88]" />
    },
    {
      stage: '08',
      title: 'Continuous Growth & Scaling',
      desc: 'Ongoing monthly CRO heatmaps, keyword expansion, speed maintenance, and strategy calls to continuously increase ROI.',
      deliverables: ['Monthly ROI Reports', 'CRO A/B Testing', 'Continuous Tech Maintenance'],
      icon: <TrendingUp className="w-6 h-6 text-[#C88770]" />
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#16203D]">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Header */}
      <section className="pt-36 pb-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            Predictable Execution Blueprint
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans">
            Our 8-Stage Process
          </h1>
          <p className="text-base sm:text-lg text-[#424965] max-w-2xl mx-auto">
            From initial discovery to continuous growth scaling — a transparent, structured roadmap designed for maximum ROI.
          </p>
        </div>
      </section>

      {/* Process Stages List */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm hover:border-[#8A2B88]/40 transition-colors"
            >
              <div className="md:col-span-2 flex flex-col items-start gap-2">
                <span className="text-sm font-mono font-extrabold text-[#8A2B88] bg-[#8A2B88]/10 px-3.5 py-1.5 rounded-full">
                  STAGE {step.stage}
                </span>
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E3DCD3] mt-1">
                  {step.icon}
                </div>
              </div>

              <div className="md:col-span-6 space-y-2">
                <h2 className="text-2xl font-bold text-[#16203D] font-sans">
                  {step.title}
                </h2>
                <p className="text-sm text-[#424965] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="md:col-span-4 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E3DCD3] space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-[#8A2B88] tracking-wider block">
                  Key Deliverables:
                </span>
                <ul className="space-y-1 text-xs font-semibold text-[#16203D]">
                  {step.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-1.5">
                      <span className="text-[#8A2B88]">•</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* CTA Banner */}
          <div className="p-10 bg-[#16203D] text-[#FAF8F5] rounded-3xl text-center space-y-6 shadow-xl pt-12">
            <h2 className="text-3xl font-bold text-white font-sans">
              Ready to start Stage 01 Discovery for your business?
            </h2>
            <Button size="lg" onClick={() => setIsModalOpen(true)} icon={<ArrowUpRight className="w-5 h-5" />}>
              Book Free Strategy Call
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
