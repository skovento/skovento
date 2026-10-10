'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, CheckCircle2, Layers, ShieldCheck, Terminal, Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#FAF8F5]">
      {/* Subtle background ambient mesh */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#4F46E5]/10 via-[#6366F1]/5 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E3DCD3] shadow-2xs text-xs font-semibold tracking-wider text-[#4F46E5] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
              <span>Websites · Web Applications · Digital Systems</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#16203D] tracking-tight leading-[1.08] font-sans"
            >
              Your business deserves{' '}
              <span className="text-[#4F46E5]">better digital tools.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#424965] leading-relaxed max-w-2xl font-normal"
            >
              We design and develop modern websites and web applications that help businesses present their services, simplify customer enquiries and improve everyday workflows.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <Link href="/contact">
                <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                  Discuss a Project
                </Button>
              </Link>
              <Link href="/work">
                <Button size="lg" variant="outline">
                  Explore Demonstrations
                </Button>
              </Link>
            </motion.div>

            {/* Transparent Studio Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E3DCD3]/70 text-xs text-[#424965]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <span className="font-medium">Direct Engineering &amp; Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <span className="font-medium">Modern Next.js &amp; TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <span className="font-medium">Transparent Concept Labelling</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-fidelity Product Preview / Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="rounded-2xl border border-[#E3DCD3] bg-white shadow-xl overflow-hidden">
              {/* Browser Window Header */}
              <div className="bg-[#F3EFEA] border-b border-[#E3DCD3] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E3DCD3]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E3DCD3]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E3DCD3]" />
                </div>
                <div className="px-3 py-1 rounded-md bg-white border border-[#E3DCD3] text-[11px] font-mono text-[#424965]/70 flex items-center gap-1.5 shadow-2xs">
                  <span className="text-[#4F46E5]">https://</span>
                  <span>skovento.studio/solution-preview</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Mockup Canvas */}
              <div className="p-5 sm:p-6 space-y-4 bg-white">
                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3]/80 space-y-1">
                    <span className="text-[10px] font-semibold text-[#424965] uppercase tracking-wider block">Speed Benchmark</span>
                    <span className="text-base font-bold text-[#16203D]">Sub-Second</span>
                    <span className="text-[10px] text-emerald-600 font-medium block">✓ Verified Core Vitals</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3]/80 space-y-1">
                    <span className="text-[10px] font-semibold text-[#424965] uppercase tracking-wider block">Architecture</span>
                    <span className="text-base font-bold text-[#16203D]">App Router</span>
                    <span className="text-[10px] text-[#4F46E5] font-medium block">Next.js 16 + React 19</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3]/80 space-y-1">
                    <span className="text-[10px] font-semibold text-[#424965] uppercase tracking-wider block">Enquiry Routing</span>
                    <span className="text-base font-bold text-[#16203D]">Instant API</span>
                    <span className="text-[10px] text-emerald-600 font-medium block">Spam-Protected Flow</span>
                  </div>
                </div>

                {/* Workflow Simulation Card */}
                <div className="p-4 rounded-xl border border-[#E3DCD3] bg-[#FAF8F5] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E3DCD3]/60 pb-2">
                    <span className="text-xs font-bold text-[#16203D] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#4F46E5]" />
                      <span>Custom Business Workflow</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-[#4F46E5] border border-indigo-200">
                      Live Concept
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E3DCD3]/70">
                      <span className="text-[#16203D] font-medium">Customer Enquiry Ingestion</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">Processed</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E3DCD3]/70">
                      <span className="text-[#16203D] font-medium">Product Catalogue Sync</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E3DCD3]/70">
                      <span className="text-[#16203D] font-medium">Direct WhatsApp Routing</span>
                      <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px] font-semibold">Configured</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Spec Badge */}
                <div className="flex items-center justify-between text-[11px] text-[#424965] pt-1 px-1">
                  <span className="font-mono text-[#4F46E5]">No templates. Built custom.</span>
                  <Link href="/work" className="font-semibold text-[#16203D] hover:text-[#4F46E5] inline-flex items-center gap-1">
                    <span>View all concepts</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
