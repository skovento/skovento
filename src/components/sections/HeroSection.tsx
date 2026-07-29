'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Star, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#FAF8F5]">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1E2E6B]/10 via-[#8A2B88]/10 to-[#C88770]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Rating Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EFEA] border border-[#E3DCD3] shadow-sm text-xs font-semibold text-[#16203D]"
          >
            <div className="flex items-center text-[#C88770]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[#8A2B88] font-bold">4.9★ Rating</span>
            <span className="text-[#424965]/40">•</span>
            <span>Trusted by 50+ Growing Brands</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#16203D] tracking-tight leading-[1.1] font-sans"
          >
            Build. Launch. Grow.{' '}
            <span className="block text-gradient-brand">All under one roof.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#424965] max-w-2xl mx-auto leading-relaxed"
          >
            Skovento is a full-service digital partner combining custom web development and growth marketing — so your brand doesn’t just look good, it performs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" onClick={onOpenModal} icon={<ArrowUpRight className="w-5 h-5" />}>
              Get a Free Consultation
            </Button>
            
            <Link href="/work">
              <Button size="lg" variant="outline">
                View Our Work
              </Button>
            </Link>
          </motion.div>

          {/* Key Value Guarantee Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto"
          >
            <div className="p-3 rounded-2xl bg-[#F3EFEA]/60 border border-[#E3DCD3] flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#8A2B88] flex-shrink-0" />
              <div className="text-xs font-semibold text-[#16203D]">
                <div>100/100 Target</div>
                <div className="text-[#424965] font-normal text-[11px]">Speed Performance</div>
              </div>
            </div>
            
            <div className="p-3 rounded-2xl bg-[#F3EFEA]/60 border border-[#E3DCD3] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C88770] flex-shrink-0" />
              <div className="text-xs font-semibold text-[#16203D]">
                <div>SEO & CRO Built-In</div>
                <div className="text-[#424965] font-normal text-[11px]">From Day 1</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F3EFEA]/60 border border-[#E3DCD3] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#1E2E6B] flex-shrink-0" />
              <div className="text-xs font-semibold text-[#16203D]">
                <div>1 Unified Team</div>
                <div className="text-[#424965] font-normal text-[11px]">Zero Vendor Juggling</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F3EFEA]/60 border border-[#E3DCD3] flex items-center gap-3">
              <Star className="w-5 h-5 text-[#C88770] flex-shrink-0" />
              <div className="text-xs font-semibold text-[#16203D]">
                <div>24/7 SLA Support</div>
                <div className="text-[#424965] font-normal text-[11px]">Global Availability</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
