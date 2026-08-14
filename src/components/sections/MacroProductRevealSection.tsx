'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, TrendingUp } from 'lucide-react';
import { CinematicTechCanvas } from '../ui/CinematicTechCanvas';

export const MacroProductRevealSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-[#050811] text-white overflow-hidden">
      {/* Ambient Tech Canvas Background */}
      <div className="absolute inset-0">
        <CinematicTechCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/90 via-transparent to-[#050811]/90 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 max-w-2xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#E5C396] bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#8A2B88]" />
            What We Actually Build
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sans tracking-tight leading-snug">
            Engineered from shadow.{' '}
            <span className="block text-gradient-brand mt-0.5">Built for measurable results.</span>
          </h2>
        </motion.div>

        {/* Capability Cards */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-[#16203D]/50 backdrop-blur-xl p-5 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-[11px] font-mono text-white/50 ml-1">skovento.com</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2.5 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#8A2B88]/20 rounded-xl text-[#E5C396] shrink-0">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                  Performance-First Web Engineering
                </h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Clean semantic code, subsetted self-hosted fonts, and a strict page-weight budget on every build — built for Core Web Vitals, not just a pretty demo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2.5 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#C88770]/20 rounded-xl text-[#C88770] shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                  Growth Marketing That&apos;s Measured
                </h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Google Ads, Meta retargeting, and local SEO campaigns — reported against real numbers, not vanity metrics.
              </p>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
