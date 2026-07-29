'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Lightbulb, ShieldCheck, Heart } from 'lucide-react';

export const WhyWeStartedSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F3EFEA] border-y border-[#E3DCD3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Text Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
              Our Story & Market Gap
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
              Why We Started Skovento
            </h2>

            <p className="text-base text-[#424965] leading-relaxed">
              We saw too many ambitious business owners waste thousands of dollars on beautiful websites that generated zero enquiries—or hire marketing freelancers who drove traffic to sites that were slow, broken, and un-optimized.
            </p>

            <p className="text-base text-[#424965] leading-relaxed">
              Skovento was created to bridge this exact market gap. By bringing senior web engineering and result-driven growth marketing under one roof, we ensure your digital foundation is built for revenue, scalability, and long-term authority.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-[#C88770]" />
                <span className="text-xs font-bold text-[#16203D]">Engineered for Outcomes</span>
              </div>
              <div className="p-4 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#8A2B88]" />
                <span className="text-xs font-bold text-[#16203D]">Built on Trust & Transparency</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 p-8 bg-[#16203D] text-[#FAF8F5] rounded-3xl shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#8A2B88]/30 rounded-full blur-3xl" />
            <Compass className="w-10 h-10 text-[#E5C396]" />

            <h3 className="text-2xl font-bold text-white font-sans">
              "A website without a growth strategy is just an expensive digital brochure."
            </h3>

            <p className="text-xs text-white/80 leading-relaxed">
              At Skovento, we partner with you to turn your digital assets into a 24/7 lead generation engine.
            </p>

            <div className="pt-4 border-t border-white/10 text-xs font-semibold text-[#E5C396]">
              ★ Premium Growth Consultancy Standard
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
