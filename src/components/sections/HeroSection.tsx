'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig, locationLabel } from '@/lib/site-config';
import { Hero3DScene } from './Hero3DScene';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative pt-24 pb-12 md:pt-40 md:pb-28 overflow-hidden bg-[#FAF8F5]">
      {/* Ambient Radial Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#16203D]/15 via-[#8A2B88]/15 to-[#C88770]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E3DCD3] shadow-sm text-xs font-extrabold text-[#8A2B88]"
            >
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>Websites</span>
              <span className="text-[#424965]/30">•</span>
              <span>Web Applications</span>
              <span className="text-[#424965]/30">•</span>
              <span>SEO</span>
              <span className="text-[#424965]/30">•</span>
              <span className="text-[#16203D]">Digital Growth</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#16203D] tracking-tight leading-[1.1] font-sans"
            >
              Build better. Launch smarter.{' '}
              <span className="block text-gradient-brand mt-1">Grow further.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#424965] leading-relaxed max-w-2xl"
            >
              Skovento helps startups, local businesses, and growing companies turn ideas and digital gaps into modern, fast, and scalable digital experiences that attract more customers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Button size="lg" onClick={onOpenModal} icon={<ArrowUpRight className="w-5 h-5" />}>
                Start a Conversation
              </Button>
              
              <Link href="/work">
                <Button size="lg" variant="outline" fullWidth>
                  Explore Our Work
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#424965] font-semibold border-t border-[#E3DCD3]/60"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8A2B88]" />
                <span>3-Member Dedicated Digital Team</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#C88770]" />
                <span>100% Transparent & Zero Fake Claims</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column — 3D Interactive WebGL Centerpiece */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <Hero3DScene />
          </div>

        </div>
      </div>
    </section>
  );
};
