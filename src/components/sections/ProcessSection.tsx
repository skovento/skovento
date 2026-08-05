'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  Layout,
  Code,
  ShieldCheck,
  Rocket,
  Megaphone,
  TrendingUp,
} from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Analysing your business goals, target buyers, and market competitors.',
    icon: <Search className="w-4 h-4" />,
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'Crafting custom site architecture and targeted lead generation funnels.',
    icon: <Compass className="w-4 h-4" />,
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Designing modern UI/UX interfaces that elevate brand authority.',
    icon: <Layout className="w-4 h-4" />,
  },
  {
    num: '04',
    title: 'Development',
    desc: 'Engineering clean Next.js code, built for speed and security.',
    icon: <Code className="w-4 h-4" />,
  },
  {
    num: '05',
    title: 'Testing',
    desc: 'Rigorous QA testing across all mobile screens and browser engines.',
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    num: '06',
    title: 'Launch',
    desc: 'Deploying your digital foundation on high-speed global CDN servers.',
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    num: '07',
    title: 'Marketing',
    desc: 'Executing Google Ads, Meta Campaigns, and SEO optimisation.',
    icon: <Megaphone className="w-4 h-4" />,
  },
  {
    num: '08',
    title: 'Growth',
    desc: 'Continuous CRO, performance tracking, and scaling.',
    icon: <TrendingUp className="w-4 h-4" />,
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-[#F3EFEA] border-y border-[#E3DCD3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-5">
            <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-[#8A2B88] mb-3">
              Predictable Execution Roadmap
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#16203D] leading-[1.05] tracking-tight font-sans text-balance">
              Our 8-step growth process.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
              A structured, transparent journey from initial concept to market leadership — with no ambiguity at any stage.
            </p>
          </div>
        </div>

        {/* Timeline — two columns of 4, connected by a central numbered row */}
        <div className="relative">

          {/* Desktop: numbered steps in a 4-column row, each with content beneath */}
          <div className="hidden lg:block">
            {/* Row 1 (steps 1-4) */}
            <div className="relative mb-12">
              {/* Connecting line */}
              <div className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-[#E3DCD3]" aria-hidden />

              <div className="grid grid-cols-4 gap-6">
                {steps.slice(0, 4).map((step, idx) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex flex-col gap-5 group"
                  >
                    {/* Step circle */}
                    <div className="flex items-center justify-center">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-[#FAF8F5] border-2 border-[#E3DCD3] flex items-center justify-center group-hover:border-[#8A2B88] group-hover:bg-[#8A2B88] transition-all duration-300">
                        <span className="text-xs font-mono font-extrabold text-[#8A2B88] group-hover:text-white transition-colors">
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-[#C88770]">{step.icon}</div>
                        <h3 className="text-sm font-bold text-[#16203D] font-sans group-hover:text-[#8A2B88] transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#424965] leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Row 2 (steps 5-8) */}
            <div className="relative">
              <div className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-[#E3DCD3]" aria-hidden />
              <div className="grid grid-cols-4 gap-6">
                {steps.slice(4).map((step, idx) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="flex flex-col gap-5 group"
                  >
                    <div className="flex items-center justify-center">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-[#FAF8F5] border-2 border-[#E3DCD3] flex items-center justify-center group-hover:border-[#8A2B88] group-hover:bg-[#8A2B88] transition-all duration-300">
                        <span className="text-xs font-mono font-extrabold text-[#8A2B88] group-hover:text-white transition-colors">
                          {step.num}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="text-[#C88770]">{step.icon}</div>
                        <h3 className="text-sm font-bold text-[#16203D] font-sans group-hover:text-[#8A2B88] transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#424965] leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical stacked list */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="flex gap-5 pb-8 relative"
              >
                {/* Vertical connector */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-[#E3DCD3]" aria-hidden />
                )}

                {/* Circle */}
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#FAF8F5] border-2 border-[#E3DCD3] flex items-center justify-center z-10">
                  <span className="text-xs font-mono font-extrabold text-[#8A2B88]">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1.5 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="text-[#C88770]">{step.icon}</div>
                    <h3 className="text-sm font-bold text-[#16203D] font-sans">{step.title}</h3>
                  </div>
                  <p className="text-xs text-[#424965] leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
