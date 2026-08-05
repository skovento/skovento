'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { Button } from '../ui/Button';

interface FinalCTASectionProps {
  onOpenModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenModal }) => {
  return (
    <section className="py-20 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-[#16203D]"
        >
          {/* Ambient orbs */}
          <div
            aria-hidden
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(138,43,136,0.55), transparent 65%)',
              filter: 'blur(48px)',
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(200,135,112,0.40), transparent 65%)',
              filter: 'blur(48px)',
            }}
          />

          {/* Fine dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 lg:px-24 lg:py-24">
            {/* Two-column layout on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

              {/* Left: headline block */}
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[10px] font-bold text-[#E5C396] uppercase tracking-widest border border-white/10">
                  Zero-Risk Growth Consultation
                </span>

                <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white font-sans leading-[1.05] tracking-tight text-balance">
                  Ready to grow your business?
                </h2>

                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-lg">
                  Let&apos;s discuss your goals and build a strategy that actually works — with a performance guarantee written into the contract.
                </p>

                {/* Trust micro-bar */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-white/55 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#E5C396] flex-shrink-0" />
                    <span>No Obligation Proposal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4 text-[#C88770] flex-shrink-0" />
                    <span>24-Hour SLA Response</span>
                  </div>
                </div>
              </div>

              {/* Right: CTA + stat pair */}
              <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-5">
                <Button
                  size="lg"
                  onClick={onOpenModal}
                  icon={<ArrowUpRight className="w-5 h-5" />}
                  className="w-full sm:w-auto lg:w-full"
                >
                  Book Free Consultation
                </Button>

                {/* Inline social proof */}
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8A2B88]/30 flex items-center justify-center text-[#E5C396] text-xs font-bold shrink-0">
                      7d
                    </div>
                    <div className="text-xs text-white/70 leading-snug">
                      First builds go live in{' '}
                      <strong className="text-white font-semibold">7 working days</strong>
                      {' '}— or you don&apos;t pay.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
