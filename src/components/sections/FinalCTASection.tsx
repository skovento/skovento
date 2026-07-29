'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface FinalCTASectionProps {
  onOpenModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenModal }) => {
  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-10 sm:p-16 bg-[#16203D] rounded-3xl text-[#FAF8F5] overflow-hidden shadow-2xl border border-[#8A2B88]/30"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8A2B88]/40 via-[#C88770]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 text-xs font-semibold text-[#E5C396]">
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>Let’s Talk Growth</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight font-sans">
              Ready to build something that <span className="text-gradient-brand underline decoration-[#C88770]">actually grows?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAF8F5]/80 max-w-xl leading-relaxed">
              Let's talk about your project — no pressure, just a real conversation with senior engineers about what's possible for your business.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={onOpenModal}
                icon={<ArrowUpRight className="w-5 h-5" />}
              >
                Book a Free Strategy Call
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-[#FAF8F5]/60 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C88770]" />
                <span>Zero Pressure Consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#8A2B88]" />
                <span>24-Hour SLA Response</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
