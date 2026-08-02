'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Laptop, Smartphone, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig, locationLabel } from '@/lib/site-config';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  // 3D Tilt Physics for Hero Visual Container
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E3DCD3] shadow-sm text-xs font-semibold text-[#8A2B88]"
            >
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>3D &amp; Motion Web</span>
              <span className="text-[#424965]/30">•</span>
              <span className="text-[#16203D]">{locationLabel()}</span>
            </motion.div>

            {/*
              H1 rewritten for AEO/GEO.

              The previous headline — "We Don't Just Build Websites. We Build
              Businesses That Grow." — is what every agency says, contains no
              entity and no fact, and is therefore unquotable: an AI engine has
              nothing to extract from it.

              This version names the differentiator (3D, motion) and is followed
              immediately by a subheading dense with named entities (Next.js,
              GSAP, Three.js) and hard numbers (2.5s, 4G, 7 days). Statistics
              and entity density are the two highest-impact factors in whether
              a page gets cited by generative engines.
            */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#16203D] tracking-tight leading-[1.1] font-sans"
            >
              Websites that move{' '}
              <span className="block text-gradient-brand mt-1">like your brand should.</span>
            </motion.h1>

            {/* Subheading — entity-dense and statistic-led by design */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#424965] leading-relaxed max-w-2xl"
            >
              Skovento builds 3D scroll-animated websites on Next.js, GSAP and Three.js
              for D2C brands, cafes and clinics across {siteConfig.address.countryName} —
              server-rendered, and guaranteed to load in under{' '}
              {siteConfig.standards.lcpSeconds} seconds on 4G. First builds go live in{' '}
              {siteConfig.standards.fastestDeliveryDays} working days.
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

            {/* Trust Badges */}
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

          {/* Right Column: 3D Interactive Perspective Laptop + Mobile + Live Growth Metric */}
          <div className="lg:col-span-5 relative perspective-[1200px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-6 sm:p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            >
              
              {/* Laptop Graphic Mockup */}
              <div className="bg-[#16203D] rounded-2xl p-5 text-white shadow-2xl relative overflow-hidden border border-[#16203D]/20 transform translate-z-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-white/60 ml-2 font-mono">skovento.com/analytics</span>
                  </div>
                  <Laptop className="w-4 h-4 text-[#C88770]" />
                </div>

                {/* Dashboard Live Screen Content */}
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Monthly Lead Funnel</div>
                      <div className="text-2xl font-extrabold text-white font-sans mt-0.5">Concept Preview</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30 animate-pulse">
                      Illustrative
                    </span>
                  </div>

                  {/* 3D Animated Growth Bars */}
                  <div className="flex items-end justify-between h-28 pt-4 gap-2">
                    {[40, 55, 70, 62, 85, 94, 100].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          style={{ height: `${val}%` }}
                          className="w-full bg-gradient-to-t from-[#8A2B88] via-[#B83DA4] to-[#C88770] rounded-t-md transition-all duration-700 hover:brightness-125"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Mobile Phone Mockup Overlay (3D Z-Elevation) */}
              <div className="absolute -bottom-2 -right-2 w-40 sm:w-48 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl p-3.5 shadow-2xl z-20 transform translate-z-12 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-2">
                  <Smartphone className="w-4 h-4 text-[#8A2B88]" />
                  <span className="text-[9px] font-extrabold text-[#16203D] uppercase tracking-wider">Mobile Ready</span>
                </div>
                <div className="space-y-1.5 text-[9px] text-[#424965]">
                  <div className="p-1.5 bg-[#F3EFEA] rounded-md font-bold text-[#16203D] flex items-center justify-between">
                    <span>⚡ Core Speed</span>
                    <span className="text-emerald-600 font-mono">Optimized</span>
                  </div>
                  <div className="p-1.5 bg-[#F3EFEA] rounded-md font-bold text-[#8A2B88] flex items-center justify-between">
                    <span>📈 Lead Funnel</span>
                    <span className="text-[#8A2B88] font-mono">Active</span>
                  </div>
                </div>
              </div>

              {/* Floating ROI Badge (3D Z-Elevation) */}
              <div className="absolute top-4 -left-2 bg-[#FAF8F5] border border-[#C88770]/40 rounded-2xl p-3 shadow-xl z-20 flex items-center gap-3 transform translate-z-10 hover:scale-105 transition-transform">
                <div className="p-2.5 bg-[#C88770]/15 rounded-xl text-[#C88770]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-[10px]">
                  <div className="font-extrabold text-[#16203D]">Revenue Focused</div>
                  <div className="text-[#8A2B88] font-semibold">Not Just Pretty Code</div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
