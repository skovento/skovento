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

          {/* Right Column — refractive glass composition.
              Replaces the laptop-plus-phone mockup, which read as a 2018
              template and, worse, was a picture of a dashboard rather than a
              demonstration of anything. This object IS the product claim:
              if we can make glass bend light in a browser at 60fps on a
              phone, the "we build websites that move" line proves itself
              before anyone reads it. */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[420px]">

            {/* Ambient light pool behind the object */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(138,43,136,0.16), transparent 70%)'
              }}
            />

            <GlassPrism className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px]" />

            {/* Floating glass stat cards. Real, verifiable numbers only —
                these sit over a gradient, which is the one place refractive
                glass earns its repaint cost. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="glass-card absolute top-6 -left-1 sm:left-2 rounded-2xl px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#C88770]" />
                <div className="text-[11px] leading-tight">
                  <div className="font-extrabold text-[#16203D]">
                    Under {siteConfig.standards.lcpSeconds}s on 4G
                  </div>
                  <div className="text-[#8A2B88] font-semibold">Written into the contract</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card absolute bottom-8 -right-1 sm:right-2 rounded-2xl px-4 py-3 shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8A2B88]" />
                <div className="text-[11px] leading-tight">
                  <div className="font-extrabold text-[#16203D]">
                    Live in {siteConfig.standards.fastestDeliveryDays} working days
                  </div>
                  <div className="text-[#8A2B88] font-semibold">Or you don&apos;t pay</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
