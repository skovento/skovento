'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FAQSection } from '@/components/sections/FAQSection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import {
  ArrowRight, ArrowUpRight, ShoppingBag, LayoutDashboard, Palette, Cpu
} from 'lucide-react';

// ─── 1. Hero Section ────────────────────────────────────────────────────────
function ServicesHero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#16203D] pt-28 sm:pt-32 pb-16 sm:pb-20 lg:pt-44 lg:pb-28 text-white" id="hero">
      {/* Grid Pattern Background & Glow */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px] opacity-70 pointer-events-none" />
      <div aria-hidden="true" className="absolute -top-40 -right-24 size-[30rem] sm:size-[42rem] rounded-full bg-gradient-to-br from-[#1E2E6B]/40 to-[#8A2B88]/30 blur-[100px] sm:blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        
        {/* Left Column Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-[#C88770] uppercase font-bold">Our Services</p>
          <h1 className="text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] font-extrabold text-white font-sans tracking-tight">
            Build. Grow. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2B88] via-[#C88770] to-white">Scale.</span>
          </h1>
          <p className="max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-white/70">
            We combine web development, software engineering and digital marketing to help businesses build stronger digital experiences, attract the right customers, and turn more traffic into real growth.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E2E6B] to-[#8A2B88] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_40px_rgba(30,46,107,0.5)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="#categories"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/5"
            >
              Explore Services
              <ArrowRight className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </motion.div>

        {/* Right Column Diagram (Exact Flow Animation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          aria-hidden="true"
          className="relative mx-auto w-full max-w-md"
        >
          <div className="space-y-0">
            <div>
              <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-white">BRAND</span>
                <span className="font-mono text-[0.6rem] tracking-[0.14em] text-white/50">identity</span>
              </div>
              <div className="flex h-6 sm:h-7 justify-center"><span className="w-px bg-gradient-to-b from-[#1E2E6B] to-[#8A2B88]" /></div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-white">CONTENT / MARKETING</span>
                <span className="font-mono text-[0.6rem] tracking-[0.14em] text-white/50">narrative</span>
              </div>
              <div className="flex h-6 sm:h-7 justify-center"><span className="w-px bg-gradient-to-b from-[#1E2E6B] to-[#8A2B88]" /></div>
            </div>

            <div className="relative rounded-2xl border border-[#1E2E6B]/60 bg-[#16203D]/90 p-4 sm:p-5 shadow-[0_0_60px_rgba(138,43,136,0.3)]">
              <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-[#1E2E6B] to-[#8A2B88]" />
              <p className="font-mono text-[0.6rem] tracking-[0.2em] text-[#C88770] font-bold">PLATFORM</p>
              <div className="mt-2.5 sm:mt-3 space-y-1 font-sans text-base sm:text-lg leading-tight text-white font-extrabold">
                <p>Website</p>
                <p>Web App</p>
                <p>eCommerce</p>
              </div>
              <div className="mt-3 sm:mt-4 flex gap-1 sm:gap-1.5 overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-5 sm:h-6 flex-1 rounded-sm bg-[#8A2B88] transition-opacity min-w-[4px]"
                    style={{ opacity: 0.15 + (i % 6) * 0.14 }}
                  />
                ))}
              </div>
            </div>

            <div className="flex h-6 sm:h-7 justify-center"><span className="w-px bg-gradient-to-b from-[#1E2E6B] to-[#8A2B88]" /></div>

            <div>
              <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-white">SEO / ADS / SOCIAL</span>
                <span className="font-mono text-[0.6rem] tracking-[0.14em] text-white/50">distribution</span>
              </div>
              <div className="flex h-6 sm:h-7 justify-center"><span className="w-px bg-gradient-to-b from-[#1E2E6B] to-[#8A2B88]" /></div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-white">TRAFFIC</span>
                <span className="font-mono text-[0.6rem] tracking-[0.14em] text-white/50">audience</span>
              </div>
              <div className="flex h-6 sm:h-7 justify-center"><span className="w-px bg-gradient-to-b from-[#1E2E6B] to-[#8A2B88]" /></div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="font-mono text-[0.7rem] tracking-[0.18em] text-white">CONVERSION / CRO</span>
                <span className="font-mono text-[0.6rem] tracking-[0.14em] text-white/50">revenue</span>
              </div>
              <div className="flex h-6 sm:h-7 justify-center"><span className="w-px bg-gradient-to-b from-[#1E2E6B] to-[#8A2B88]" /></div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#C88770]/40 bg-[#8A2B88]/20 px-4 py-3.5">
              <span className="font-sans text-lg sm:text-xl font-extrabold text-white">GROWTH</span>
              <span className="font-mono text-[0.6rem] tracking-[0.18em] text-[#C88770] font-bold">compounding</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


// ─── 2. The Big Picture Section ─────────────────────────────────────────────
function ServicesBigPicture() {
  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 lg:py-32" id="big-idea">
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-[#8A2B88] uppercase font-bold">The Big Picture</p>
          <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.04] font-extrabold text-[#16203D] font-sans">
            Your digital presence is a system.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#424965]">
            Your website, content, and marketing don&apos;t work in isolation. They influence each other. That&apos;s why we bring development and digital marketing together under one roof — so every piece supports your bigger goal.
          </p>
        </motion.div>

        {/* Radial Diagram Container matching reference HTML */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-lg flex items-center justify-center p-4 sm:p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl shadow-sm"
        >
          <svg className="absolute inset-0 size-full pointer-events-none" viewBox="0 0 100 100">
            <line className="text-[#16203D]/20" stroke="currentColor" strokeWidth="0.3" x1="50" y1="50" x2="50" y2="8" />
            <line className="text-[#16203D]/20" stroke="currentColor" strokeWidth="0.3" x1="50" y1="50" x2="88" y2="28" />
            <line className="text-[#16203D]/20" stroke="currentColor" strokeWidth="0.3" x1="50" y1="50" x2="88" y2="72" />
            <line className="text-[#16203D]/20" stroke="currentColor" strokeWidth="0.3" x1="50" y1="50" x2="50" y2="92" />
            <line className="text-[#16203D]/20" stroke="currentColor" strokeWidth="0.3" x1="50" y1="50" x2="12" y2="72" />
            <line className="text-[#16203D]/20" stroke="currentColor" strokeWidth="0.3" x1="50" y1="50" x2="12" y2="28" />
            <circle className="text-[#16203D]/15" cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeDasharray="2 3" strokeWidth="0.25" />
          </svg>

          {/* Center GROWTH CORE Bubble */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="flex size-20 sm:size-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#8A2B88] via-[#1E2E6B] to-[#16203D] text-center shadow-xl border-2 border-white/20">
              <span className="font-sans text-xs sm:text-lg font-extrabold text-white">GROWTH</span>
              <span className="font-mono text-[0.45rem] sm:text-[0.55rem] tracking-[0.2em] text-white/70">CORE</span>
            </div>
          </div>

          {/* Node Pills */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3DCD3] bg-white px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-[#16203D] shadow-md z-20" style={{ left: '50%', top: '8%' }}>Website</div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3DCD3] bg-white px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-[#16203D] shadow-md z-20" style={{ left: '88%', top: '28%' }}>Brand</div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3DCD3] bg-white px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-[#16203D] shadow-md z-20" style={{ left: '88%', top: '72%' }}>Content</div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3DCD3] bg-white px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-[#16203D] shadow-md z-20" style={{ left: '50%', top: '92%' }}>SEO</div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3DCD3] bg-white px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-[#16203D] shadow-md z-20" style={{ left: '12%', top: '72%' }}>Ads</div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E3DCD3] bg-white px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs font-bold text-[#16203D] shadow-md z-20" style={{ left: '12%', top: '28%' }}>Social</div>
        </motion.div>

      </div>
    </section>
  );
}


// ─── 3. Two Core Capabilities Section ──────────────────────────────────────
function ServicesTwoCapabilities() {
  const devServices = [
    { label: 'eCommerce Web Development', href: '/services/ecommerce-development' },
    { label: 'Web Application Development', href: '/services/web-app-development' },
    { label: 'Website Design & Redesign', href: '/services/website-development' },
    { label: 'Software Development', href: '/services/software-development' },
  ];

  const mktServices = [
    { label: 'Branding', href: '/services/branding' },
    { label: 'Content Marketing', href: '/services/content-marketing' },
    { label: 'Ecommerce Marketing', href: '/services/ecommerce-marketing' },
    { label: 'Performance Marketing', href: '/services/performance-marketing' },
    { label: 'Search Engine Optimization', href: '/services/seo' },
    { label: 'Social Media Marketing', href: '/services/social-media' },
    { label: 'SaaS Marketing', href: '/services/saas-marketing' },
    { label: 'Influencer Marketing', href: '/services/influencer-marketing' },
    { label: 'Content Writing', href: '/services/content-writing' },
    { label: 'CRO Services', href: '/services/cro' },
  ];

  return (
    <section className="relative bg-[#16203D] py-16 sm:py-24 lg:py-32 text-white" id="categories">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-[#C88770] uppercase font-bold">Two Core Capabilities</p>
          <h2 className="mt-5 text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.04] font-extrabold text-white font-sans">
            Development and digital marketing, engineered together.
          </h2>
        </motion.div>

        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-2">

          {/* 01 — Development Card */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden border border-white/10 bg-[#1A2447] p-6 sm:p-8 lg:p-12 transition-all duration-500 hover:-translate-y-1 hover:border-[#1E2E6B] flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-white/50">01 — Development</p>
              <h3 className="mt-4 sm:mt-6 max-w-sm text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.06] font-extrabold text-white">
                Digital products engineered around your business.
              </h3>
              <p className="mt-4 sm:mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-white/70">
                From high-performance websites to custom software and web applications, we build fast, scalable, secure digital products.
              </p>

              <ul className="mt-6 sm:mt-8 space-y-px border-t border-white/10">
                {devServices.map((s) => (
                  <li key={s.label} className="border-b border-white/10">
                    <Link
                      href={s.href}
                      className="flex items-center justify-between py-3 text-xs sm:text-sm text-white/70 hover:text-white transition-colors group-hover:translate-x-1"
                    >
                      {s.label}
                      <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 sm:mt-10">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#16203D] p-3.5 sm:p-4 font-mono text-[0.6rem] sm:text-[0.65rem] leading-relaxed text-[#C88770]">
                <p className="text-[#C88770]">{'// architecture'}</p>
                <p><span className="text-white font-bold">client</span> → edge → api → services</p>
                <p><span className="text-white font-bold">db</span> · queue · cache · integrations</p>
                <div className="mt-3 grid grid-cols-6 gap-1">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span key={i} className="h-3.5 sm:h-4 rounded-[3px] bg-[#8A2B88]/40" style={{ opacity: 0.25 + (i % 6) * 0.12 }} />
                  ))}
                </div>
              </div>

              <Link
                href="/services"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 font-sans text-sm sm:text-base text-white font-bold hover:text-[#C88770] transition-colors"
              >
                Explore Development <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.article>

          {/* 02 — Digital Marketing Card */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative overflow-hidden border border-white/10 bg-[#1A2447] p-6 sm:p-8 lg:p-12 transition-all duration-500 hover:-translate-y-1 hover:border-[#8A2B88] flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-white/50">02 — Digital Marketing</p>
              <h3 className="mt-4 sm:mt-6 max-w-sm text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.06] font-extrabold text-white">
                Turn attention into measurable growth.
              </h3>
              <p className="mt-4 sm:mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-white/70">
                We combine SEO, performance marketing, content, social media, and branding to create strategies that attract, engage and convert your ideal audience.
              </p>

              <ul className="mt-6 sm:mt-8 space-y-px border-t border-white/10">
                {mktServices.map((s) => (
                  <li key={s.label} className="border-b border-white/10">
                    <Link
                      href={s.href}
                      className="flex items-center justify-between py-3 text-xs sm:text-sm text-white/70 hover:text-white transition-colors group-hover:translate-x-1"
                    >
                      {s.label}
                      <ArrowRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 sm:mt-10">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#16203D] p-3.5 sm:p-4 font-mono text-[0.6rem] sm:text-[0.65rem] text-[#8A2B88]">
                <p>{'// audience → conversion'}</p>
                <div className="mt-4 flex h-20 sm:h-24 items-end gap-1.5 sm:gap-2">
                  {[32, 46, 40, 62, 55, 74, 68, 92].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#8A2B88]/30 to-[#1E2E6B]" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              <Link
                href="/services"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 font-sans text-sm sm:text-base text-white font-bold hover:text-[#8A2B88] transition-colors"
              >
                Explore Digital Marketing <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  );
}


// ─── 4. 01 — Development Deep-Dive ──────────────────────────────────────────
function ServicesDevDeepDive() {
  const devCards = [
    { num: '01', title: 'eCommerce Web Development', desc: 'Stores engineered for speed, usability and conversion.', href: '/services/ecommerce-development', icon: ShoppingBag },
    { num: '02', title: 'Web Application Development', desc: 'Custom products, customer portals and dashboards.', href: '/services/web-app-development', icon: LayoutDashboard },
    { num: '03', title: 'Website Design & Redesign', desc: 'Modern digital experiences designed around real users.', href: '/services/website-development', icon: Palette },
    { num: '04', title: 'Software Development', desc: 'Purpose-built software, integrations and business systems.', href: '/services/software-development', icon: Cpu },
  ];

  return (
    <section className="relative overflow-hidden bg-[#16203D] py-16 sm:py-24 lg:py-32 text-white" id="development">
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-20">

        {/* Section Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C88770] font-bold">01 — Development</p>
          <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.02] font-extrabold text-white font-sans">
            Digital products engineered around your business.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/70">
            From a high-performance business website to a complex web application or custom software platform, we design and develop digital products that are fast, scalable, secure, and built for real-world use.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {devCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex h-full flex-col border border-white/10 bg-[#1A2447] p-5 sm:p-7 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#1E2E6B] justify-between shadow-xl"
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-white/50">{card.num}</span>
                    <span className="flex size-9 sm:size-10 items-center justify-center rounded-lg border border-white/10 bg-[#1E2E6B]/40 text-[#C88770]">
                      <Icon className="size-4 sm:size-4.5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans text-lg sm:text-xl leading-tight font-extrabold text-white">{card.title}</h3>
                    <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-white/70">{card.desc}</p>
                  </div>
                </div>

                <Link
                  href={card.href}
                  className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm text-white font-bold hover:text-[#C88770] transition-colors"
                >
                  Explore <ArrowRight className="size-3.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}


// ─── 5. Website Design to Custom Software & Tech Arch ───────────────────────
function ServicesWebDesignAndArch() {
  const archLayers = [
    { level: 'L1', label: 'Interface', tech: 'React · Next.js · design systems' },
    { level: 'L2', label: 'Application', tech: 'APIs · business logic · auth' },
    { level: 'L3', label: 'Data', tech: 'databases · search · analytics' },
    { level: 'L4', label: 'Infrastructure', tech: 'hosting · CI/CD · monitoring' },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto grid max-w-[88rem] items-start gap-10 lg:gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6"
        >
          <h2 className="max-w-xl text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.04] font-extrabold text-[#16203D] font-sans">
            From website design to custom software development
          </h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#424965]">
            <p>
              Every business has different technical requirements. Some need a conversion-focused{' '}
              <Link className="font-extrabold text-[#16203D] underline decoration-[#8A2B88] underline-offset-4 hover:text-[#8A2B88] transition-colors" href="/services/website-development">
                website redesign
              </Link>
              . Others need an{' '}
              <Link className="font-extrabold text-[#16203D] underline decoration-[#8A2B88] underline-offset-4 hover:text-[#8A2B88] transition-colors" href="/services/ecommerce-development">
                eCommerce development
              </Link>{' '}
              platform, customer portal, internal dashboard, or fully{' '}
              <Link className="font-extrabold text-[#16203D] underline decoration-[#8A2B88] underline-offset-4 hover:text-[#8A2B88] transition-colors" href="/services/software-development">
                custom software development
              </Link>{' '}
              solution.
            </p>
            <p>
              Our{' '}
              <Link className="font-extrabold text-[#16203D] underline decoration-[#8A2B88] underline-offset-4 hover:text-[#8A2B88] transition-colors" href="/services/website-development">
                web development
              </Link>{' '}
              services — spanning website design and{' '}
              <Link className="font-extrabold text-[#16203D] underline decoration-[#8A2B88] underline-offset-4 hover:text-[#8A2B88] transition-colors" href="/services/web-app-development">
                web application development
              </Link>{' '}
              — are designed around your users, workflows, technology requirements, and long-term growth.
            </p>
          </div>
        </motion.div>

        {/* Technical Architecture Layer Container */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="rounded-2xl border border-[#E3DCD3] bg-[#F3EFEA] p-5 sm:p-8 shadow-sm">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
              Technical architecture
            </p>

            <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
              {archLayers.map((layer, idx) => (
                <li key={layer.level} className="relative rounded-xl border border-[#E3DCD3] bg-[#FAF8F5] px-4 sm:px-5 py-3.5 sm:py-4 shadow-xs">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-sans text-sm sm:text-base font-extrabold text-[#16203D]">{layer.label}</span>
                    <span className="font-mono text-[0.6rem] tracking-[0.14em] text-[#424965]/60 font-bold">{layer.level}</span>
                  </div>
                  <p className="mt-1 font-mono text-[0.62rem] sm:text-[0.68rem] text-[#424965]">{layer.tech}</p>
                  {idx < archLayers.length - 1 && (
                    <span aria-hidden="true" className="absolute left-8 -bottom-3 h-3 w-px bg-[#8A2B88]/40" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


// ─── 6. Build Something Worth Finding Pipeline Section ─────────────────────
function ServicesBuildWorthFinding() {
  const steps = ['CODE', 'WEBSITE', 'CONTENT', 'SEO', 'TRAFFIC', 'LEADS', 'CONVERSION', 'GROWTH'];

  return (
    <section aria-label="From build to growth" className="relative overflow-hidden bg-[#16203D] py-20 sm:py-28 lg:py-40 text-white">
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">

        <div className="max-w-2xl space-y-3 sm:space-y-4">
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] leading-[1] font-extrabold text-white font-sans">
            Build something worth finding.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/70">
            A great digital product needs an audience. That&apos;s where our digital marketing services come in.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-[1fr_auto_1fr]">
          
          {/* Left Code Mockup Box */}
          <div className="rounded-xl border border-white/10 bg-[#1A2447] p-5 sm:p-6 font-mono text-[0.65rem] sm:text-[0.7rem] leading-relaxed text-white/70 shadow-xl overflow-x-auto">
            <p className="text-[#C88770]">&lt;main&gt;</p>
            <p className="pl-4 text-white">&lt;Hero product={'{build}'} /&gt;</p>
            <p className="pl-4 text-white">&lt;Platform scale=&quot;auto&quot; /&gt;</p>
            <p className="pl-4 text-white">&lt;Conversion track /&gt;</p>
            <p className="text-[#C88770]">&lt;/main&gt;</p>
            <div className="mt-4 grid grid-cols-8 gap-1 min-w-[200px]">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="h-3 rounded-[2px] bg-[#1E2E6B]/60" />
              ))}
            </div>
          </div>

          {/* Center Stepper Pipeline */}
          <ol className="flex flex-wrap sm:flex-col items-center justify-center gap-2 sm:gap-0">
            {steps.map((step, idx) => (
              <li key={step} className="flex flex-col items-center">
                <span className={`rounded-full border px-3 sm:px-4 py-1 sm:py-1.5 font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.16em] sm:tracking-[0.2em] ${
                  step === 'GROWTH'
                    ? 'border-[#C88770] bg-[#C88770] text-white font-extrabold shadow-lg'
                    : 'border-white/15 text-white/70 bg-transparent'
                }`}>
                  {step}
                </span>
                {idx < steps.length - 1 && (
                  <span className="hidden sm:block w-px h-[16px] bg-gradient-to-b from-[#1E2E6B] to-[#8A2B88]" />
                )}
              </li>
            ))}
          </ol>

          {/* Right Graph Analytics Box */}
          <div className="rounded-xl border border-white/10 bg-[#1A2447] p-5 sm:p-6 shadow-xl space-y-4">
            <p className="font-mono text-[0.65rem] tracking-[0.16em] text-[#C88770] font-bold">
              SESSIONS → LEADS
            </p>
            <div className="flex h-28 sm:h-32 items-end gap-1 sm:gap-1.5 pt-2">
              {[8.4, 13.2, 10.8, 17.4, 15.6, 21, 19.2, 26.4, 23.4, 28.8].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#8A2B88]/40 to-[#1E2E6B] transition-all"
                  style={{ height: `${h * 3}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between font-mono text-[0.6rem] text-white/50 pt-2 border-t border-white/10">
              <span>organic</span>
              <span>paid</span>
              <span>social</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


// ─── 7. Digital Marketing Deep-Dive Section ─────────────────────────────────
function ServicesDigitalMarketingSection() {
  const pillars = [
    {
      num: 'Pillar 01',
      title: 'Build the Brand',
      sub: 'Create recognition. Build authority.',
      links: [
        { name: 'Branding', href: '/services/branding' },
        { name: 'Content Marketing', href: '/services/content-marketing' },
        { name: 'Content Writing', href: '/services/content-writing' },
        { name: 'Influencer Marketing', href: '/services/influencer-marketing' },
      ],
    },
    {
      num: 'Pillar 02',
      title: 'Get Discovered',
      sub: 'Reach the right audience.',
      links: [
        { name: 'Search Engine Optimization', href: '/services/seo' },
        { name: 'Social Media Marketing', href: '/services/social-media' },
      ],
    },
    {
      num: 'Pillar 03',
      title: 'Create Demand',
      sub: 'Turn attention into qualified traffic.',
      links: [
        { name: 'Performance Marketing', href: '/services/performance-marketing' },
        { name: 'Ecommerce Marketing', href: '/services/ecommerce-marketing' },
        { name: 'SaaS Marketing', href: '/services/saas-marketing' },
      ],
    },
    {
      num: 'Pillar 04',
      title: 'Convert & Scale',
      sub: 'Make more of your traffic count.',
      links: [
        { name: 'CRO Services', href: '/services/cro' },
      ],
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 lg:py-32" id="digital-marketing">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">

        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8A2B88] font-bold">02 — Digital Marketing</p>
          <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.02] font-extrabold text-[#16203D] font-sans">
            Turn attention into measurable growth.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#424965]">
            We combine SEO, performance marketing, content, social media, branding, and conversion optimization to create digital marketing strategies built around how your customers discover, evaluate, and choose your business.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-[#E3DCD3] bg-[#F3EFEA] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:border-[#8A2B88]/50 hover:shadow-xl transition-all"
            >
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-[#424965]/70 font-bold">{pillar.num}</span>
                <h3 className="mt-4 sm:mt-5 text-[clamp(1.35rem,2.6vw,2.125rem)] leading-tight font-extrabold text-[#16203D] font-sans">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 font-sans text-sm sm:text-base font-bold text-[#8A2B88]">{pillar.sub}</p>

                <ul className="mt-6 sm:mt-8 space-y-px border-t border-[#E3DCD3]">
                  {pillar.links.map((link) => (
                    <li key={link.name} className="border-b border-[#E3DCD3]">
                      <Link
                        href={link.href}
                        className="flex items-center justify-between py-3 text-xs sm:text-sm text-[#424965] hover:text-[#16203D] transition-colors font-semibold"
                      >
                        {link.name}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}


// ─── 8. The Growth Loop Circular Animation Section ──────────────────────────
function ServicesGrowthLoopSection() {
  const loopItems = [
    { label: 'BRAND', left: 50, top: 9 },
    { label: 'CONTENT', left: 78.9, top: 21 },
    { label: 'SEO / ADS', left: 91, top: 50 },
    { label: 'TRAFFIC', left: 78.9, top: 78.9 },
    { label: 'WEBSITE / ECOMMERCE', left: 50, top: 91 },
    { label: 'CRO', left: 21, top: 78.9 },
    { label: 'CONVERSION', left: 9, top: 50 },
    { label: 'GROWTH', left: 21, top: 21 },
  ];

  return (
    <section className="relative overflow-hidden bg-[#16203D] py-16 sm:py-24 lg:py-32 text-white">
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-[#C88770] font-bold">The Growth Loop</p>
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.02] font-extrabold text-white font-sans">
            Growth isn&apos;t a channel. It&apos;s a loop.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/70">
            SEO brings qualified visitors. Content builds trust. Your website gives them somewhere to act. Your marketing creates demand. CRO improves what happens next.
          </p>
        </motion.div>

        {/* Circular Loop Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-xl flex items-center justify-center overflow-hidden sm:overflow-visible"
        >
          <svg className="absolute inset-0 size-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="41" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="0.3" />
            <circle className="animate-pulse" cx="50" cy="50" fill="none" r="41" stroke="url(#loopGrad)" strokeDasharray="8 10" strokeLinecap="round" strokeWidth="0.55" />
            <defs>
              <linearGradient id="loopGrad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#1E2E6B" />
                <stop offset="100%" stopColor="#8A2B88" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center GROWTH LOOP Badge */}
          <div className="absolute top-1/2 left-1/2 flex size-24 sm:size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/20 bg-[#1A2447] shadow-[0_0_60px_rgba(138,43,136,0.4)]">
            <span className="font-sans text-sm sm:text-xl font-extrabold text-white">GROWTH</span>
            <span className="mt-0.5 sm:mt-1 font-mono text-[0.45rem] sm:text-[0.55rem] tracking-[0.2em] text-[#C88770] font-bold">↺ LOOP</span>
          </div>

          {/* 8 Outer Loop Nodes */}
          {loopItems.map((item) => (
            <div
              key={item.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[#16203D]/90 px-2 sm:px-3.5 py-1 sm:py-1.5 font-mono text-[0.48rem] sm:text-[0.6rem] tracking-[0.1em] sm:tracking-[0.14em] text-white shadow-md backdrop-blur-sm whitespace-nowrap font-bold"
              style={{ left: `${item.left}%`, top: `${item.top}%` }}
            >
              {item.label}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}


// ─── 9. Solutions by Business Problem Section ──────────────────────────────
function ServicesSolutionsByProblemSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const problems = [
    { label: '"I need a new website"', recommendation: 'A conversion-focused website built on a modern stack — strategy, design, development and launch handled by one team.', services: ['Website Design & Redesign', 'Web Development'], hrefs: ['/services/website-development', '/services/website-development'] },
    { label: '"My website looks outdated"', recommendation: 'A full website redesign focused on user experience, modern aesthetics, and technical performance — without losing your existing SEO.', services: ['Website Design & Redesign', 'Technical SEO'], hrefs: ['/services/website-development', '/services/seo'] },
    { label: '"I need more Google traffic"', recommendation: 'A technical and content SEO strategy built around your target keywords, audience intent, and competitive gaps.', services: ['Search Engine Optimization', 'Content Marketing'], hrefs: ['/services/seo', '/services/content-marketing'] },
    { label: '"I need more leads"', recommendation: 'A multi-channel lead generation system combining paid media, landing page optimization, and conversion rate improvement.', services: ['Performance Marketing', 'CRO Services'], hrefs: ['/services/performance-marketing', '/services/cro'] },
    { label: '"I want to sell online"', recommendation: 'A high-converting eCommerce store engineered for speed, usability, and sales — with the marketing stack to drive traffic from day one.', services: ['eCommerce Web Development', 'Ecommerce Marketing'], hrefs: ['/services/ecommerce-development', '/services/ecommerce-marketing'] },
    { label: '"I need custom software"', recommendation: 'A purpose-built software solution designed around your exact workflows, data structures, and business logic.', services: ['Software Development', 'Web Application Development'], hrefs: ['/services/software-development', '/services/web-app-development'] },
    { label: '"I want to grow my SaaS"', recommendation: 'A SaaS growth system combining product-led content, performance marketing, SEO, and conversion optimization.', services: ['SaaS Marketing', 'Web Application Development'], hrefs: ['/services/saas-marketing', '/services/web-app-development'] },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-14">

        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8A2B88] font-bold">Solutions by Business Problem</p>
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.02] font-extrabold text-[#16203D] font-sans">
            Start with the problem. Not the service.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
          
          {/* Left Problem List */}
          <ul className="border-t border-[#E3DCD3]">
            {problems.map((p, idx) => (
              <li key={idx} className="border-b border-[#E3DCD3]">
                <button
                  onClick={() => setActiveIdx(idx)}
                  className={`group flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left transition-colors ${
                    activeIdx === idx ? 'text-[#16203D] font-extrabold' : 'text-[#424965]'
                  }`}
                >
                  <span className="flex items-baseline gap-3 sm:gap-4">
                    <span className="font-mono text-[0.65rem] text-[#8A2B88] font-bold">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-sans text-[clamp(1rem,2vw,1.6rem)] leading-tight">{p.label}</span>
                  </span>
                  <ArrowRight className={`size-4 shrink-0 transition-transform ${activeIdx === idx ? 'text-[#8A2B88] translate-x-1' : 'opacity-40'}`} />
                </button>
              </li>
            ))}
          </ul>

          {/* Right Sticky Detail Box */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#E3DCD3] bg-[#16203D] p-6 sm:p-8 lg:p-10 text-white shadow-2xl space-y-6"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[#C88770] font-bold">Recommended combination</p>
                  <h3 className="mt-4 sm:mt-6 text-[clamp(1.35rem,2.8vw,2.125rem)] leading-tight font-extrabold text-white font-sans">
                    {problems[activeIdx].services.join(' & ')}
                  </h3>
                  <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-white/70">
                    {problems[activeIdx].recommendation}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2 pt-2">
                  {problems[activeIdx].services.map((s, si) => (
                    <li key={s}>
                      <Link
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-xs text-white hover:bg-white/10 transition-colors font-bold"
                        href={problems[activeIdx].hrefs[si]}
                      >
                        {s} <ArrowRight className="size-3" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 sm:pt-4">
                  <button
                    onClick={onOpenModal}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E2E6B] to-[#8A2B88] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
                  >
                    Discuss this <ArrowRight className="size-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}


// ─── 10. Our Process Section ────────────────────────────────────────────────
function ServicesProcessSection() {
  const steps = [
    { num: '01', title: 'Discover', desc: 'Business goals' },
    { num: '02', title: 'Build', desc: 'Design + Development' },
    { num: '03', title: 'Launch', desc: 'Development + Marketing' },
    { num: '04', title: 'Attract', desc: 'SEO + Ads + Content' },
    { num: '05', title: 'Convert', desc: 'CRO + UX' },
    { num: '06', title: 'Scale', desc: 'Data + Iteration' },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">

        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8A2B88] font-bold">Our Process</p>
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.02] font-extrabold text-[#16203D] font-sans">
            One team across the entire digital journey.
          </h2>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute top-3 right-0 left-0 hidden h-px bg-gradient-to-r from-[#1E2E6B]/50 via-[#8A2B88]/40 to-transparent lg:block" />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {steps.map((step, idx) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative p-5 sm:p-0 rounded-2xl bg-[#F3EFEA] sm:bg-transparent border border-[#E3DCD3] sm:border-0"
              >
                <span aria-hidden="true" className="mb-6 hidden size-[0.4rem] rounded-full bg-[#8A2B88] ring-4 ring-[#FAF8F5] lg:block" style={{ marginTop: '0.35rem' }} />
                <span className="font-mono text-xs tracking-[0.2em] text-[#424965]/70 font-bold">{step.num}</span>
                <h3 className="mt-2 sm:mt-3 font-sans text-lg sm:text-xl font-extrabold tracking-tight text-[#16203D]">{step.title}</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#424965] font-semibold">{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}


// ─── 11. Tech Stack Section ──────────────────────────────────────────────────
function ServicesTechStackSection() {
  const devStack = ['Next.js', 'React', 'Node.js', 'TypeScript', 'Shopify', 'WooCommerce', 'APIs & Integrations'];
  const mktStack = ['Google Search', 'Google Ads', 'Meta', 'LinkedIn', 'Analytics', 'Search Console', 'Email Platforms'];

  return (
    <section className="relative overflow-hidden bg-[#16203D] py-16 sm:py-24 lg:py-32 text-white">
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-14">

        <div className="max-w-3xl">
          <h2 className="text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.04] font-extrabold text-white font-sans">
            Built with modern technology. Powered by modern marketing.
          </h2>
        </div>

        <div className="grid gap-8 sm:gap-12 border-t border-white/10 pt-8 sm:pt-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#C88770] font-bold">Development</p>
            <ul className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-2.5">
              {devStack.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex rounded-full bg-white/5 border border-white/15 px-3.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.08em] text-white hover:bg-white/10 transition-colors">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#8A2B88] font-bold">Marketing</p>
            <ul className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-2.5">
              {mktStack.map((tool) => (
                <li key={tool}>
                  <span className="inline-flex rounded-full bg-white/5 border border-white/15 px-3.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[0.65rem] sm:text-[0.7rem] tracking-[0.08em] text-white hover:bg-white/10 transition-colors">
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}


// ─── 12. Industry Solutions List Section ─────────────────────────────────────
function ServicesIndustryListSection() {
  const industries = [
    { name: 'Fashion & Apparel', stack: 'eCommerce + Social + CRO', href: '/industries/fashion' },
    { name: 'Restaurants & Cafés', stack: 'Website + Local SEO + Content', href: '/industries/restaurants' },
    { name: 'Real Estate', stack: 'Website + Performance + Lead Generation', href: '/industries/real-estate' },
    { name: 'SaaS', stack: 'Web App + SaaS Marketing + SEO', href: '/industries' },
    { name: 'Professional Services', stack: 'Website + Branding + SEO', href: '/industries' },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 lg:py-32" id="industries">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-14">

        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8A2B88] font-bold">Industry Solutions</p>
          <h2 className="text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.02] font-extrabold text-[#16203D] font-sans">
            Solutions that adapt to your industry.
          </h2>
        </div>

        <ul className="border-t border-[#E3DCD3]">
          {industries.map((ind, idx) => (
            <motion.li
              key={ind.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="border-b border-[#E3DCD3]"
            >
              <Link
                href={ind.href}
                className="group flex flex-col gap-2 py-5 sm:py-6 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <span className="font-sans text-[clamp(1.1rem,2.4vw,1.75rem)] font-extrabold text-[#16203D] group-hover:translate-x-2 transition-transform duration-300">
                  {ind.name}
                </span>
                <span className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#424965]">
                  <span className="font-mono text-[0.68rem] sm:text-[0.72rem] tracking-[0.04em] font-semibold">{ind.stack}</span>
                  <span className="hidden items-center gap-2 text-[#16203D] font-bold sm:inline-flex">
                    Explore <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>

      </div>
    </section>
  );
}


// ─── 13. Ready to Build Final Section ─────────────────────────────────────────
function ServicesReadyToBuildSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#16203D] py-20 sm:py-28 lg:py-40 text-white" id="start">
      <div className="absolute top-1/2 left-1/2 size-[30rem] sm:size-[46rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#1E2E6B]/40 to-[#8A2B88]/30 blur-[100px] sm:blur-[140px] pointer-events-none rounded-full" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-6 sm:space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-6"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-[#C88770] font-bold">Ready to build?</p>
          <h2 className="text-[clamp(1.85rem,6vw,4.25rem)] leading-[1.05] font-extrabold text-white font-sans">
            One idea can become a complete{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2B88] via-[#C88770] to-white">
              digital system.
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] sm:text-xs tracking-[0.22em] text-white/70 uppercase sm:text-sm font-semibold">
            Website · Software · Marketing · Growth
          </p>
          <div className="pt-2 sm:pt-4">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1E2E6B] to-[#8A2B88] px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// ─── Main Services Page Root ────────────────────────────────────────────────
export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'consultation' | 'audit'>('consultation');

  const handleOpen = () => { setModalMode('consultation'); setIsModalOpen(true); };
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white pb-16 sm:pb-0 overflow-x-hidden">
      <Navbar onOpenModal={handleOpen} />

      <main className="flex-grow w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <ServicesHero onOpenModal={handleOpen} />

        {/* 2. The Big Picture */}
        <ServicesBigPicture />

        {/* 3. Two Core Capabilities */}
        <ServicesTwoCapabilities />

        {/* 4. 01 — Development Deep-Dive */}
        <ServicesDevDeepDive />

        {/* 5. From Website Design to Custom Software & Tech Arch */}
        <ServicesWebDesignAndArch />

        {/* 6. Build Something Worth Finding Pipeline */}
        <ServicesBuildWorthFinding />

        {/* 7. 02 — Digital Marketing Deep-Dive */}
        <ServicesDigitalMarketingSection />

        {/* 8. The Growth Loop Circular Animation */}
        <ServicesGrowthLoopSection />

        {/* 9. Solutions by Business Problem */}
        <ServicesSolutionsByProblemSection onOpenModal={handleOpen} />

        {/* 10. Our Process */}
        <ServicesProcessSection />

        {/* 11. Tech Stack */}
        <ServicesTechStackSection />

        {/* 12. Industry Solutions List */}
        <ServicesIndustryListSection />

        {/* 13. FAQ Section */}
        <FAQSection />

        {/* 14. Ready to Build Final CTA */}
        <ServicesReadyToBuildSection onOpenModal={handleOpen} />
      </main>

      <Footer />

      <MobileBottomBar
        onOpenAuditModal={handleOpen}
        onOpenConsultationModal={handleOpen}
      />

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        initialMode={modalMode}
      />

      <FloatingContactBtn />
    </div>
  );
}
