'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Compass, Code2, Rocket, LifeBuoy, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STAGES = [
  {
    step: '01',
    title: 'Understand',
    description:
      'We discuss your business model, customer requirements, existing tools, and specific project constraints.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Define',
    description:
      'We define the project scope, information architecture, deliverables, timeline milestones, and technology choices.',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Design & Build',
    description:
      'We craft responsive layouts and engineer the agreed features using clean, maintainable Next.js and React code.',
    icon: Code2,
  },
  {
    step: '04',
    title: 'Test & Launch',
    description:
      'We verify responsiveness across screen sizes, check forms and workflows, and configure the production deployment and domain.',
    icon: Rocket,
  },
  {
    step: '05',
    title: 'Support',
    description:
      'We provide post-launch support to resolve questions, ensure stability, and discuss ongoing maintenance options.',
    icon: LifeBuoy,
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Delivery Roadmap"
              title="A clear process from idea to launch."
              subtitle="Every project follows a structured, transparent process so you always know what is being built, why, and when."
              align="left"
            />
          </div>

          <div className="shrink-0">
            <Link
              href="/process"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16203D] hover:text-[#4F46E5] transition-colors"
            >
              <span>Read the detailed process</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                className="rounded-2xl border border-[#E3DCD3] bg-white p-6 flex flex-col justify-between shadow-2xs hover:border-[#4F46E5]/40 hover:shadow-xs transition-all duration-200 relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      STAGE {stage.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E3DCD3] flex items-center justify-center text-[#16203D]">
                      <Icon className="w-4 h-4 text-[#4F46E5]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#16203D] font-sans">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-[#424965] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3DCD3]/60 mt-4 text-[10px] uppercase font-bold text-[#424965]/70 tracking-wider">
                  Step {idx + 1} of 5
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
