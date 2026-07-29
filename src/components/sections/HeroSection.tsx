'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Laptop, Smartphone, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FAF8F5]">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1E2E6B]/10 via-[#8A2B88]/10 to-[#C88770]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E3DCD3] shadow-sm text-xs font-semibold text-[#8A2B88]"
            >
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>Premium Growth Consultancy</span>
              <span className="text-[#424965]/30">•</span>
              <span className="text-[#16203D]">Web Dev & Digital Marketing</span>
            </motion.div>

            {/* Bold Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#16203D] tracking-tight leading-[1.1] font-sans"
            >
              We Don't Just Build Websites.{' '}
              <span className="block text-gradient-brand mt-1">We Build Businesses That Grow.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#424965] leading-relaxed max-w-2xl"
            >
              Custom websites and result-driven digital marketing designed to help startups and businesses attract more customers, generate quality leads, and grow online.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Button size="lg" onClick={onOpenModal} icon={<ArrowUpRight className="w-5 h-5" />}>
                Get Free Consultation
              </Button>
              
              <Link href="/work">
                <Button size="lg" variant="outline" fullWidth>
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 pt-4 text-xs text-[#424965] font-semibold border-t border-[#E3DCD3]/60"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8A2B88]" />
                <span>Zero Pressure Strategy Session</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#C88770]" />
                <span>Custom Built for Conversions</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Modern Laptop + Mobile + Growth Graph Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-6 sm:p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl shadow-xl glass-card-elevated overflow-hidden">
              
              {/* Laptop Graphic Mockup */}
              <div className="bg-[#16203D] rounded-2xl p-4 text-white shadow-2xl relative overflow-hidden border border-[#16203D]/20">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-white/50 ml-2 font-mono">skovento.com/dashboard</span>
                  </div>
                  <Laptop className="w-4 h-4 text-[#C88770]" />
                </div>

                {/* Dashboard Screen Content */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-white/60">Monthly Qualified Leads</div>
                      <div className="text-xl font-extrabold text-white font-sans">+310% Growth</div>
                    </div>
                    <span className="px-2.5 py-1 bg-green-500/20 text-green-300 text-[10px] font-bold rounded-full border border-green-500/30">
                      Live Metric
                    </span>
                  </div>

                  {/* Simulated Growth Chart Bars */}
                  <div className="flex items-end justify-between h-24 pt-4 gap-1.5">
                    {[35, 45, 60, 55, 75, 90, 100].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          style={{ height: `${val}%` }}
                          className="w-full bg-gradient-to-t from-[#8A2B88] to-[#C88770] rounded-t-md transition-all duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Phone Mockup Overlay */}
              <div className="absolute -bottom-4 -right-2 w-36 sm:w-44 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl p-3 shadow-2xl z-20">
                <div className="flex items-center justify-between mb-2">
                  <Smartphone className="w-3.5 h-3.5 text-[#8A2B88]" />
                  <span className="text-[9px] font-bold text-[#16203D]">Mobile Ready</span>
                </div>
                <div className="space-y-1.5 text-[9px] text-[#424965]">
                  <div className="p-1.5 bg-[#F3EFEA] rounded-md font-semibold text-[#16203D]">⚡ 100/100 Core Speed</div>
                  <div className="p-1.5 bg-[#F3EFEA] rounded-md font-semibold text-[#8A2B88]">📈 Instant Lead Form</div>
                </div>
              </div>

              {/* Floating ROI Badge */}
              <div className="absolute top-4 -left-2 bg-[#FAF8F5] border border-[#C88770]/40 rounded-2xl p-3 shadow-xl z-20 flex items-center gap-2.5">
                <div className="p-2 bg-[#C88770]/10 rounded-xl text-[#C88770]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-[10px]">
                  <div className="font-extrabold text-[#16203D]">Revenue Focused</div>
                  <div className="text-[#8A2B88] font-semibold">Not Just Pretty Code</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
