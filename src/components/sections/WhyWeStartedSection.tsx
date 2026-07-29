'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyWeStartedSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#16203D] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Cinematic Ambient Dark Mesh Video/Canvas Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#16203D] via-[#251842] to-[#16203D] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8A2B88]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C88770]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E5C396] uppercase tracking-wider border border-white/10">
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>Our Story & Market Gap</span>
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
              Why We Started Skovento
            </h2>

            <p className="text-base text-white/80 leading-relaxed">
              We saw too many ambitious business owners waste thousands of dollars on beautiful websites that generated zero enquiries—or hire marketing freelancers who drove traffic to sites that were slow, broken, and un-optimized.
            </p>

            <p className="text-base text-white/80 leading-relaxed">
              Skovento was created to bridge this exact market gap. By bringing senior web engineering and result-driven growth marketing under one roof, we ensure your digital foundation is built for revenue, scalability, and long-term authority.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white/10 border border-white/10 rounded-2xl flex items-center gap-3.5 backdrop-blur-md">
                <div className="p-2.5 bg-[#C88770]/20 rounded-xl text-[#C88770] flex-shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white">Engineered for Outcomes</span>
              </div>
              <div className="p-4 bg-white/10 border border-white/10 rounded-2xl flex items-center gap-3.5 backdrop-blur-md">
                <div className="p-2.5 bg-[#8A2B88]/20 rounded-xl text-[#E5C396] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white">Built on Trust & Transparency</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-8 bg-white/10 backdrop-blur-xl border border-white/10 text-[#FAF8F5] rounded-3xl shadow-2xl space-y-6 relative overflow-hidden"
          >
            <Compass className="w-10 h-10 text-[#E5C396]" />

            <h3 className="text-2xl font-bold text-white font-sans leading-snug">
              "A website without a growth strategy is just an expensive digital brochure."
            </h3>

            <p className="text-xs text-white/75 leading-relaxed">
              At Skovento, we partner with you to turn your digital assets into a 24/7 lead generation engine.
            </p>

            <div className="pt-4 border-t border-white/10 text-xs font-bold text-[#E5C396] flex items-center justify-between">
              <span>★ Premium Growth Consultancy Standard</span>
              <span>100% Guaranteed</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
