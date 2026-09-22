'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  LayoutDashboard,
  Palette,
  Cpu,
  ChevronDown
} from 'lucide-react';

// ─── 1. Hero Section ────────────────────────────────────────────────────────
function ServicesHero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#0A0E17] pt-32 sm:pt-40 pb-20 sm:pb-28 text-white" id="hero">
      {/* Fine Grid Pattern Background & Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] opacity-80 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] sm:size-[50rem] rounded-full bg-gradient-to-br from-[#4F46E5]/20 via-[#7C3AED]/20 to-[#EC4899]/10 blur-[130px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-[#60A5FA] uppercase font-bold">
            OUR SERVICES
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[0.98] font-extrabold font-sans tracking-tight text-white">
            Build. Grow.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6]">
              Scale.
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base sm:text-xl leading-relaxed text-slate-300 font-normal">
            We combine web development, software engineering and digital marketing to help businesses build stronger digital experiences, attract the right customers, and turn more traffic into real growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] px-8 py-4 text-sm font-bold text-white shadow-[0_0_35px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="#big-picture"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all duration-300"
            >
              Explore Services
              <ArrowRight className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. The Big Picture Section ─────────────────────────────────────────────
function ServicesBigPicture() {
  const nodes = [
    { label: 'Website', left: '50%', top: '16%' },
    { label: 'Brand', left: '79.4%', top: '33%' },
    { label: 'Content', left: '79.4%', top: '67%' },
    { label: 'SEO', left: '50%', top: '84%' },
    { label: 'Ads', left: '20.6%', top: '67%' },
    { label: 'Social', left: '20.6%', top: '33%' },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-20 sm:py-28 border-b border-slate-200/80 overflow-hidden" id="big-picture">
      {/* Light subtle grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
      />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <p className="font-mono text-xs tracking-[0.22em] text-[#6366F1] uppercase font-bold">
            THE BIG PICTURE
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.04] font-extrabold text-[#0F172A] font-sans tracking-tight">
            Your digital presence is a system.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
            Your website, content, and marketing don&apos;t work in isolation. They influence each other. That&apos;s why we bring development and digital marketing together under one roof — so every piece supports your bigger goal.
          </p>
        </motion.div>

        {/* Radial Nodes Diagram matching Screenshot 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-md lg:max-w-lg flex items-center justify-center p-4 sm:p-8 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-sm overflow-visible"
        >
          {/* Subtle Grid & Orbit Lines */}
          <svg className="absolute inset-0 size-full pointer-events-none" viewBox="0 0 100 100">
            {/* Grid lines */}
            <line stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 2" x1="0" y1="50" x2="100" y2="50" />
            <line stroke="#E2E8F0" strokeWidth="0.3" strokeDasharray="1 2" x1="50" y1="0" x2="50" y2="100" />
            {/* Radial Lines to 6 nodes */}
            <line stroke="#CBD5E1" strokeWidth="0.4" strokeDasharray="2 2" x1="50" y1="50" x2="50" y2="16" />
            <line stroke="#CBD5E1" strokeWidth="0.4" strokeDasharray="2 2" x1="50" y1="50" x2="79.4" y2="33" />
            <line stroke="#CBD5E1" strokeWidth="0.4" strokeDasharray="2 2" x1="50" y1="50" x2="79.4" y2="67" />
            <line stroke="#CBD5E1" strokeWidth="0.4" strokeDasharray="2 2" x1="50" y1="50" x2="50" y2="84" />
            <line stroke="#CBD5E1" strokeWidth="0.4" strokeDasharray="2 2" x1="50" y1="50" x2="20.6" y2="67" />
            <line stroke="#CBD5E1" strokeWidth="0.4" strokeDasharray="2 2" x1="50" y1="50" x2="20.6" y2="33" />
            {/* Outer dotted circle */}
            <circle cx="50" cy="50" r="34" fill="none" stroke="#CBD5E1" strokeWidth="0.4" strokeDasharray="2 3" />
          </svg>

          {/* Central GROWTH / CORE Glowing Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="flex size-24 sm:size-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] via-[#7C3AED] to-[#4F46E5] text-center shadow-xl shadow-indigo-500/20 border-2 border-white/40">
              <span className="font-sans text-sm sm:text-lg font-extrabold text-white tracking-wider">GROWTH</span>
              <span className="font-mono text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] text-indigo-200 uppercase font-semibold">CORE</span>
            </div>
          </div>

          {/* Connected Outer Node Pills */}
          {nodes.map((node) => (
            <div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-sm z-20 whitespace-nowrap"
              style={{ left: node.left, top: node.top }}
            >
              {node.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 3. 01 — Development Deep-Dive Section ──────────────────────────────────
function ServicesDevDeepDive() {
  const devCards = [
    {
      num: '01',
      title: 'eCommerce Web Development',
      desc: 'Stores engineered for speed, usability and conversion.',
      href: '/services/ecommerce-development',
      icon: ShoppingBag,
    },
    {
      num: '02',
      title: 'Web Application Development',
      desc: 'Custom products, customer portals and dashboards.',
      href: '/services/web-app-development',
      icon: LayoutDashboard,
    },
    {
      num: '03',
      title: 'Website Design & Redesign',
      desc: 'Modern digital experiences designed around real users.',
      href: '/services/website-development',
      icon: Palette,
    },
    {
      num: '04',
      title: 'Software Development',
      desc: 'Purpose-built software, integrations and business systems.',
      href: '/services/software-development',
      icon: Cpu,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A0E17] py-20 sm:py-28 text-white" id="development">
      {/* Grid line backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none"
      />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#60A5FA] font-bold">
            01 — DEVELOPMENT
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02] font-extrabold text-white font-sans tracking-tight">
            Digital products engineered around your business.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-300">
            From a high-performance business website to a complex web application or custom software platform, we design and develop digital products that are fast, scalable, secure, and built for real-world use.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {devCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-[#111827]/90 p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#6366F1]/50 hover:bg-[#131B2E]"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-slate-400 font-semibold">
                      {card.num}
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-indigo-500/10 text-indigo-400">
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xl leading-tight font-extrabold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 text-sm text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
                  >
                    Explore <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Technical Architecture & Web Design Section ─────────────────────────
function ServicesWebDesignAndArch() {
  const archLayers = [
    { level: 'L1', label: 'Interface', tech: 'React · Next.js · design systems' },
    { level: 'L2', label: 'Application', tech: 'APIs · business logic · auth' },
    { level: 'L3', label: 'Data', tech: 'databases · search · analytics' },
    { level: 'L4', label: 'Infrastructure', tech: 'hosting · CI/CD · monitoring' },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-20 sm:py-28 border-b border-slate-200/80">
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.04] font-extrabold text-[#0F172A] font-sans tracking-tight">
            From website design to custom software development
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
            <p>
              Every business has different technical requirements. Some need a conversion-focused{' '}
              <strong className="text-[#0F172A] font-extrabold">website redesign</strong>. Others need an{' '}
              <strong className="text-[#0F172A] font-extrabold">eCommerce development</strong> platform, customer portal, internal dashboard, or fully{' '}
              <strong className="text-[#0F172A] font-extrabold">custom software development</strong> solution.
            </p>
            <p>
              Our <strong className="text-[#0F172A] font-extrabold">web development</strong> services — spanning website design and{' '}
              <strong className="text-[#0F172A] font-extrabold">web application development</strong> — are designed around your users, workflows, technology requirements, and long-term growth.
            </p>
          </div>
        </motion.div>

        {/* Technical Architecture Layer Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6366F1]">
              TECHNICAL ARCHITECTURE
            </p>

            <ul className="mt-6 space-y-3">
              {archLayers.map((layer) => (
                <li key={layer.level} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 shadow-2xs">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-sans text-base sm:text-lg font-extrabold text-[#0F172A]">
                      {layer.label}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {layer.level}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {layer.tech}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 5. 02 — Digital Marketing Section & 4 Pillars Grid ──────────────────────
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
    <section className="relative bg-[#FAF8F5] py-20 sm:py-28 border-b border-slate-200/80" id="digital-marketing">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6366F1] font-bold">
            02 — DIGITAL MARKETING
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02] font-extrabold text-[#0F172A] font-sans tracking-tight">
            Turn attention into measurable growth.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600">
            We combine SEO, performance marketing, content, social media, branding, and conversion optimization to create digital marketing strategies built around how your customers discover, evaluate, and choose your business.
          </p>
        </div>

        {/* 4 Pillars Grid Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-400">
                  {pillar.num}
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-sans tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base font-semibold text-[#3B82F6]">
                  {pillar.sub}
                </p>

                <ul className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
                  {pillar.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between py-3.5 text-sm sm:text-base text-slate-700 hover:text-[#0F172A] font-medium transition-colors"
                      >
                        {link.name}
                        <ArrowRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-1" />
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

// ─── 6. The Growth Loop Section ─────────────────────────────────────────────
function ServicesGrowthLoopSection() {
  // 8 nodes at 45° intervals on a circle (r=42, center=50,50 in a 100×100 space).
  // left/top are % of the INNER square (same coordinate space as the SVG viewBox).
  // Formula: left = 50 + 42*cos(θ), top = 50 + 42*sin(θ)  (θ from -90° → 225°)
  const loopItems = [
    { label: 'BRAND',               left: '50%',    top: '8%'    }, // θ = -90°
    { label: 'CONTENT',             left: '79.7%',  top: '20.3%' }, // θ = -45°
    { label: 'SEO / ADS',           left: '92%',    top: '50%'   }, // θ =   0°
    { label: 'TRAFFIC',             left: '79.7%',  top: '79.7%' }, // θ =  45°
    { label: 'WEBSITE / ECOMMERCE', left: '50%',    top: '92%'   }, // θ =  90°
    { label: 'CRO',                 left: '20.3%',  top: '79.7%' }, // θ = 135°
    { label: 'CONVERSION',          left: '8%',     top: '50%'   }, // θ = 180°
    { label: 'GROWTH',              left: '20.3%',  top: '20.3%' }, // θ = 225°
  ];

  return (
    <section className="relative bg-[#0A0E17] py-20 sm:py-28 text-white" id="growth-loop">
      {/* Grid lines overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none"
      />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#60A5FA] font-bold">
            THE GROWTH LOOP
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02] font-extrabold text-white font-sans tracking-tight">
            Growth isn&apos;t a channel. It&apos;s a loop.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-300">
            SEO brings qualified visitors. Content builds trust. Your website gives them somewhere to act. Your marketing creates demand. CRO improves what happens next.
          </p>
        </motion.div>

        {/* ── Orbit Diagram ────────────────────────────────────────────── */}
        {/*
          Outer motion.div: constrains the max size.
          Inner padded div: reserves space so pills centered on the ring
            edges are never clipped (padding ≈ half pill height).
          Innermost aspect-square div: the coordinate space (matches SVG 0→100).
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-[380px] sm:max-w-md lg:max-w-xl"
        >
          {/* Padding absorbs pill overflow */}
          <div className="relative p-9 sm:p-12">
            {/* 1:1 square that maps to SVG viewBox 0 0 100 100 */}
            <div className="relative aspect-square w-full">

              {/* SVG orbit rings */}
              <svg
                className="absolute inset-0 size-full pointer-events-none"
                viewBox="0 0 100 100"
              >
                <defs>
                  <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#6366F1" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="arcGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%"   stopColor="#818CF8" />
                    <stop offset="50%"  stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#F472B6" />
                  </linearGradient>
                </defs>

                {/* Inner glow fill */}
                <circle cx="50" cy="50" r="42" fill="url(#glowGrad)" />

                {/* Ghost ring */}
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="white" strokeOpacity="0.12" strokeWidth="0.5"
                />

                {/* Animated gradient dash arc */}
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="0.8"
                  strokeDasharray="14 20"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '50px 50px',
                    animation: 'spin 40s linear infinite',
                  }}
                />
              </svg>

              {/* Central GROWTH / LOOP badge — sized relative to inner square */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                              flex size-[32%] flex-col items-center justify-center
                              rounded-full bg-[#0D1117]
                              border border-indigo-500/30
                              shadow-[0_0_60px_rgba(99,102,241,0.3)]">
                <span className="font-sans text-[clamp(0.6rem,2.5vw,1.1rem)] font-extrabold text-white tracking-wider leading-none">
                  GROWTH
                </span>
                <span className="mt-1 font-mono text-[clamp(0.35rem,1vw,0.6rem)] tracking-[0.2em] text-indigo-400 font-bold uppercase">
                  ↺ LOOP
                </span>
              </div>

              {/* 8 orbit node pills — centered on the r=42 circle */}
              {loopItems.map((item) => (
                <div
                  key={item.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2
                             rounded-full
                             border border-slate-600/60
                             bg-[#0D1117]
                             px-2.5 sm:px-3.5 py-1 sm:py-1.5
                             font-mono text-[clamp(0.45rem,1.2vw,0.65rem)]
                             tracking-[0.1em] sm:tracking-[0.15em]
                             text-slate-200 whitespace-nowrap font-bold
                             shadow-md z-20"
                  style={{ left: item.left, top: item.top }}
                >
                  {item.label}
                </div>
              ))}

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 7. Solutions by Business Problem Section ───────────────────────────────
function ServicesSolutionsByProblemSection({ onOpenModal }: { onOpenModal: () => void }) {
  const [activeIdx, setActiveIdx] = useState(6); // Defaulting to SaaS problem like in screenshot 4

  const problems = [
    {
      label: '"I need a new website"',
      recommendationTitle: 'Website Design & Redesign + Web Development',
      recommendation: 'A conversion-focused website built on a modern stack — strategy, design, development and launch handled by one team.',
      services: ['Website Design & Redesign', 'Web Development'],
      hrefs: ['/services/website-development', '/services/website-development'],
    },
    {
      label: '"My website looks outdated"',
      recommendationTitle: 'Website Redesign + Technical SEO',
      recommendation: 'A full website redesign focused on user experience, modern aesthetics, and technical performance — without losing your existing SEO.',
      services: ['Website Design & Redesign', 'Search Engine Optimization'],
      hrefs: ['/services/website-development', '/services/seo'],
    },
    {
      label: '"I need more Google traffic"',
      recommendationTitle: 'Search Engine Optimization + Content Marketing',
      recommendation: 'A technical and content SEO strategy built around your target keywords, audience intent, and competitive gaps.',
      services: ['Search Engine Optimization', 'Content Marketing'],
      hrefs: ['/services/seo', '/services/content-marketing'],
    },
    {
      label: '"I need more leads"',
      recommendationTitle: 'Performance Marketing + CRO Services',
      recommendation: 'A multi-channel lead generation system combining paid media, landing page optimization, and conversion rate improvement.',
      services: ['Performance Marketing', 'CRO Services'],
      hrefs: ['/services/performance-marketing', '/services/cro'],
    },
    {
      label: '"I want to sell online"',
      recommendationTitle: 'eCommerce Web Development + Ecommerce Marketing',
      recommendation: 'A high-converting eCommerce store engineered for speed, usability, and sales — with the marketing stack to drive traffic from day one.',
      services: ['eCommerce Web Development', 'Ecommerce Marketing'],
      hrefs: ['/services/ecommerce-development', '/services/ecommerce-marketing'],
    },
    {
      label: '"I need custom software"',
      recommendationTitle: 'Software Development + Web Application Development',
      recommendation: 'A purpose-built software solution designed around your exact workflows, data structures, and business logic.',
      services: ['Software Development', 'Web Application Development'],
      hrefs: ['/services/software-development', '/services/web-app-development'],
    },
    {
      label: '"I want to grow my SaaS"',
      recommendationTitle: 'SaaS Marketing + SEO + Performance Marketing',
      recommendation: 'Positioning, demand generation and a funnel measured on trials, activation and pipeline — not clicks.',
      services: ['SaaS Marketing', 'Search Engine Optimization'],
      hrefs: ['/services/saas-marketing', '/services/seo'],
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-20 sm:py-28 border-b border-slate-200/80">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6366F1] font-bold">
            SOLUTIONS BY BUSINESS PROBLEM
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02] font-extrabold text-[#0F172A] font-sans tracking-tight">
            Start with the problem. Not the service.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
          {/* Left Vertical Interactive Problem List */}
          <ul className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {problems.map((p, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setActiveIdx(idx)}
                  className={`group flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left transition-colors ${
                    activeIdx === idx ? 'text-[#0F172A] font-extrabold' : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-lg sm:text-xl leading-tight">
                      {p.label}
                    </span>
                  </span>
                  <ArrowRight
                    className={`size-4 shrink-0 transition-transform ${
                      activeIdx === idx ? 'text-[#6366F1] translate-x-1' : 'opacity-30'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Right Floating Dark Card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/10 bg-[#0F172A] p-7 sm:p-9 text-white shadow-2xl space-y-6"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#60A5FA] font-bold">
                    RECOMMENDED COMBINATION
                  </p>
                  <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white font-sans leading-tight">
                    {problems[activeIdx].recommendationTitle}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                    {problems[activeIdx].recommendation}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {problems[activeIdx].services.map((s, si) => (
                    <Link
                      key={s}
                      href={problems[activeIdx].hrefs[si]}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 px-4 py-2 text-xs font-bold text-white transition-colors"
                    >
                      {s} <ArrowRight className="size-3" />
                    </Link>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenModal}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] px-7 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
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

// ─── 8. Our Process Section ─────────────────────────────────────────────────
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
    <section className="relative bg-[#FAF8F5] py-20 sm:py-28 border-b border-slate-200/80">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-16">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6366F1] font-bold">
            OUR PROCESS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02] font-extrabold text-[#0F172A] font-sans tracking-tight">
            One team across the entire digital journey.
          </h2>
        </div>

        <div className="relative">
          {/* Timeline connecting top line */}
          <div
            aria-hidden="true"
            className="absolute top-2 left-0 right-0 hidden h-[1.5px] bg-slate-300 lg:block"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, idx) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="relative flex flex-col items-start"
              >
                {/* Blue dot on timeline */}
                <span
                  aria-hidden="true"
                  className="mb-4 hidden size-3 rounded-full bg-[#3B82F6] ring-4 ring-[#FAF8F5] lg:block"
                />

                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-slate-400">
                  {step.num}
                </span>
                <h3 className="mt-2 font-sans text-xl font-extrabold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 font-medium">
                  {step.desc}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── 9. Tech & Marketing Stack Section ──────────────────────────────────────
function ServicesTechStackSection() {
  const devStack = [
    'Next.js',
    'React',
    'Node.js',
    'TypeScript',
    'Shopify',
    'WooCommerce',
    'APIs & Integrations',
  ];
  const mktStack = [
    'Google Search',
    'Google Ads',
    'Meta',
    'LinkedIn',
    'Analytics',
    'Search Console',
    'Email Platforms',
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A0E17] py-20 sm:py-28 text-white">
      {/* Grid lines overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] opacity-70 pointer-events-none"
      />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12">
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.04] font-extrabold text-white font-sans tracking-tight">
            Built with modern technology. Powered by modern marketing.
          </h2>
        </div>

        <div className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#60A5FA] font-bold">
              DEVELOPMENT
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {devStack.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex rounded-full bg-white/5 border border-white/15 px-4 py-2 font-mono text-xs text-slate-200 font-medium">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C084FC] font-bold">
              MARKETING
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {mktStack.map((tool) => (
                <li key={tool}>
                  <span className="inline-flex rounded-full bg-white/5 border border-white/15 px-4 py-2 font-mono text-xs text-slate-200 font-medium">
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

// ─── 10. Industry Solutions Section ─────────────────────────────────────────
function ServicesIndustryListSection() {
  const industries = [
    { name: 'Fashion & Apparel', stack: 'eCommerce + Social + CRO', href: '/industries/fashion' },
    { name: 'Restaurants & Cafés', stack: 'Website + Local SEO + Content', href: '/industries/restaurants' },
    { name: 'Real Estate', stack: 'Website + Performance + Lead Generation', href: '/industries/real-estate' },
    { name: 'SaaS', stack: 'Web App + SaaS Marketing + SEO', href: '/industries' },
    { name: 'Professional Services', stack: 'Website + Branding + SEO', href: '/industries' },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-20 sm:py-28 border-b border-slate-200/80" id="industries">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6366F1] font-bold">
            INDUSTRY SOLUTIONS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02] font-extrabold text-[#0F172A] font-sans tracking-tight">
            Solutions that adapt to your industry.
          </h2>
        </div>

        <ul className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {industries.map((ind, idx) => (
            <motion.li
              key={ind.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
            >
              <Link
                href={ind.href}
                className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6 transition-colors"
              >
                <span className="font-sans text-xl sm:text-2xl font-extrabold text-[#0F172A] group-hover:translate-x-1.5 transition-transform duration-200">
                  {ind.name}
                </span>

                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <span className="font-mono text-xs font-semibold tracking-wide">
                    {ind.stack}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[#0F172A] font-bold group-hover:text-[#6366F1]">
                    Explore <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── 11. Frequently Asked Questions (FAQ) Section ───────────────────────────
function ServicesFAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What digital services does Skovento offer?',
      a: 'We offer custom web development, web application engineering, custom software development, eCommerce solutions, search engine optimization (SEO), performance marketing, content strategy, social media marketing, branding, and conversion rate optimization (CRO).',
    },
    {
      q: 'Do you provide both web development and digital marketing?',
      a: 'Yes. We bridge the gap between engineering perfection and marketing performance. By handling both development and digital marketing under one roof, we ensure your platform is built to perform and engineered to convert.',
    },
    {
      q: 'Can I hire Skovento for only one service?',
      a: 'Absolutely. Whether you need a standalone website redesign, custom software development, or a focused SEO & performance marketing campaign, we tailor our engagement to your specific requirements.',
    },
    {
      q: 'Can you redesign an existing website?',
      a: 'Yes. We perform a complete digital presence audit, rebuild your site on modern technology, improve user experience and speed, and protect your existing search engine rankings throughout the migration.',
    },
    {
      q: 'Do you provide eCommerce development and marketing?',
      a: 'Yes. We build high-speed Shopify, WooCommerce, and custom headless eCommerce stores engineered for seamless checkout, and we pair them with targeted shopping ads and conversion optimization.',
    },
    {
      q: 'Do you offer SEO with website development?',
      a: 'Every website we build includes technical SEO foundations — clean semantic HTML, structured schema.org markup, fast page load speeds, mobile responsiveness, and XML sitemaps. Dedicated ongoing SEO retainers are also available.',
    },
    {
      q: 'Can you develop custom software for my business?',
      a: 'Yes. We design and build custom web applications, internal tools, customer portals, dashboards, and API integrations engineered around your unique business workflows.',
    },
    {
      q: 'Do you work with SaaS companies?',
      a: 'Yes. We work with SaaS startups and growth companies to build high-converting marketing sites, web product interfaces, and product-led growth strategies that turn visitors into active users.',
    },
    {
      q: 'Can you manage ongoing digital marketing after development?',
      a: 'Yes. We offer ongoing digital marketing retainers covering SEO, paid search & social ads, content creation, and continuous conversion rate optimization to scale your business post-launch.',
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-20 sm:py-28 border-b border-slate-200/80">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
          {/* Left Title */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6366F1] font-bold">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] font-sans tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right Accordion List */}
          <ul className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <li key={idx}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-base sm:text-lg font-bold text-[#0F172A] hover:text-[#6366F1] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#6366F1]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── 12. Ready to Build Final CTA Section ───────────────────────────────────
function ServicesReadyToBuildSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#0A0E17] py-24 sm:py-36 text-white" id="start">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[36rem] sm:size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#6366F1]/30 via-[#7C3AED]/30 to-[#EC4899]/20 blur-[140px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#60A5FA] font-bold">
            READY TO BUILD?
          </p>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-sans tracking-tight leading-[1.04]">
            One idea can become a complete{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6]">
              digital system.
            </span>
          </h2>

          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-300 uppercase font-semibold">
            WEBSITE · SOFTWARE · MARKETING · GROWTH
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] px-9 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Start a Conversation
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Services Page Root Component ──────────────────────────────────────
export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0F172A] flex flex-col font-sans selection:bg-[#6366F1] selection:text-white pb-16 sm:pb-0 overflow-x-hidden">
      <Navbar onOpenModal={handleOpen} />

      <main className="flex-grow w-full overflow-x-hidden">
        {/* 1. Hero Section */}
        <ServicesHero onOpenModal={handleOpen} />

        {/* 2. The Big Picture */}
        <ServicesBigPicture />

        {/* 3. 01 — Development */}
        <ServicesDevDeepDive />

        {/* 4. Technical Architecture & Web Design */}
        <ServicesWebDesignAndArch />

        {/* 5. 02 — Digital Marketing & 4 Pillars */}
        <ServicesDigitalMarketingSection />

        {/* 6. The Growth Loop */}
        <ServicesGrowthLoopSection />

        {/* 7. Solutions by Business Problem */}
        <ServicesSolutionsByProblemSection onOpenModal={handleOpen} />

        {/* 8. Our Process */}
        <ServicesProcessSection />

        {/* 9. Tech & Marketing Stack */}
        <ServicesTechStackSection />

        {/* 10. Industry Solutions */}
        <ServicesIndustryListSection />

        {/* 11. Frequently Asked Questions (FAQ) */}
        <ServicesFAQSection />

        {/* 12. Ready to Build Final CTA */}
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
        initialMode="consultation"
      />

      <FloatingContactBtn />
    </div>
  );
}
