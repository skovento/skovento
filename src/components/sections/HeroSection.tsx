'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig, locationLabel } from '@/lib/site-config';
import { GlassPrism } from '../ui/GlassPrism';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-[calc(100svh-72px)] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FAF8F5] flex items-center">
      {/* Ambient Radial Mesh Glow */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[900px] h-[900px] -translate-y-1/4 translate-x-1/4 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(138,43,136,0.09) 0%, rgba(200,135,112,0.07) 40%, transparent 70%)',
        }}
      />
      {/* Fine dot-grid texture overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #16203D 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">

            {/* Location pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E3DCD3] shadow-sm text-xs font-semibold text-[#8A2B88]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C88770]" />
              <span>3D &amp; Motion Web</span>
              <span className="text-[#424965]/30 font-light">|</span>
              <span className="text-[#16203D]">{locationLabel()}</span>
            </motion.div>

            {/* Headline — bigger, more editorial */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[clamp(2.6rem,6vw,5rem)] font-extrabold text-[#16203D] tracking-tight leading-[1.05] font-sans text-balance"
            >
              Websites that move
              <br />
              <span className="text-gradient-brand">like your brand should.</span>
            </motion.h1>

            {/* Divider line — editorial rhythm */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              className="h-px w-16 bg-[#C88770]"
            />

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-base sm:text-lg text-[#424965] leading-relaxed max-w-xl"
            >
              Skovento builds 3D scroll-animated websites on Next.js, GSAP and
              Three.js for D2C brands, cafes and clinics across{' '}
              {siteConfig.address.countryName} — server-rendered, and guaranteed
              to load in under {siteConfig.standards.lcpSeconds}s on 4G. First
              builds go live in {siteConfig.standards.fastestDeliveryDays}{' '}
              working days.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Button
                size="lg"
                onClick={onOpenModal}
                icon={<ArrowUpRight className="w-5 h-5" />}
              >
                Get Free Consultation
              </Button>
              <Link href="/work">
                <Button size="lg" variant="outline" fullWidth>
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            {/* Trust micro-bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-[#424965] font-semibold"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8A2B88] flex-shrink-0" />
                <span>Zero Pressure Strategy Session</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#C88770] flex-shrink-0" />
                <span>Custom Built for Conversions</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column — glass prism composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[520px]">
            {/* Ambient light pool */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(138,43,136,0.14), transparent 70%)',
              }}
            />

            <GlassPrism className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px]" />

            {/* Floating stat — top-left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="glass-card absolute top-8 -left-2 sm:left-4 rounded-2xl px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#C88770] flex-shrink-0" />
                <div className="text-[11px] leading-tight">
                  <div className="font-extrabold text-[#16203D]">
                    Under {siteConfig.standards.lcpSeconds}s on 4G
                  </div>
                  <div className="text-[#8A2B88] font-semibold">
                    Written into the contract
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating stat — bottom-right */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="glass-card absolute bottom-10 -right-2 sm:right-4 rounded-2xl px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8A2B88] flex-shrink-0" />
                <div className="text-[11px] leading-tight">
                  <div className="font-extrabold text-[#16203D]">
                    Live in {siteConfig.standards.fastestDeliveryDays} working
                    days
                  </div>
                  <div className="text-[#8A2B88] font-semibold">
                    Or you don&apos;t pay
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating mini-badge — absolute top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute top-4 right-4 lg:-right-4 px-3 py-1.5 rounded-full bg-[#16203D] text-white text-[10px] font-bold shadow-lg"
            >
              Next.js + GSAP + Three.js
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="hidden lg:flex items-center gap-3 mt-12 text-[#424965]/50"
          aria-hidden
        >
          <div className="w-6 h-10 border-2 border-[#E3DCD3] rounded-full flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2.5 rounded-full bg-[#C88770]"
            />
          </div>
          <span className="text-xs font-semibold tracking-wide uppercase">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};
