'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Spatial3DCard } from '../ui/Spatial3DCard';

interface FinalCTASectionProps {
  onOpenModal: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenModal }) => {
  return (
    <section className="py-14 sm:py-24 bg-[#FAF8F5]/90 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Spatial3DCard depth={30} maxTilt={10} glowColor="rgba(200, 135, 112, 0.25)">
            <div className="p-10 sm:p-16 bg-gradient-to-br from-[#16203D] via-[#1E2E6B] to-[#55246D] text-[#FAF8F5] rounded-3xl text-center space-y-8 relative overflow-hidden shadow-2xl">
              {/* Subtle Ambient Orbs */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#8A2B88]/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#C88770]/30 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E5C396] uppercase tracking-wider border border-white/10">
                  <Sparkles className="w-4 h-4 text-[#C88770]" />
                  <span>Start Your Digital Upgrade</span>
                </span>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight leading-tight">
                  You know your business.<br />
                  <span className="text-[#C88770]">We know how to turn ideas into digital experiences.</span>
                </h2>

                <p className="text-base sm:text-xl text-white/90 leading-relaxed font-bold">
                  Let&apos;s build something useful.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={onOpenModal}
                  icon={<ArrowUpRight className="w-5 h-5" />}
                >
                  Start a Conversation
                </Button>
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-white/70 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E5C396]" />
                  <span>3-Member Focused Team</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-[#C88770]" />
                  <span>Direct WhatsApp &amp; Email Access</span>
                </div>
              </div>
            </div>
          </Spatial3DCard>
        </motion.div>

      </div>
    </section>
  );
};
