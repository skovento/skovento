'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, MapPin, Code, TrendingUp } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Understand',
      desc: 'We understand your business model, target customers, growth goals, and existing digital bottlenecks.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Identify',
      desc: 'We analyze your digital presence to identify gaps, opportunities, and the right solution path.',
      icon: Compass,
    },
    {
      num: '03',
      title: 'Plan',
      desc: 'We define the exact solution scope, user journey, wireframes, and project execution roadmap.',
      icon: MapPin,
    },
    {
      num: '04',
      title: 'Build',
      desc: 'We engineer fast Next.js code, design clean mobile UI, and perform thorough QA testing.',
      icon: Code,
    },
    {
      num: '05',
      title: 'Grow',
      desc: 'We launch your foundation, optimize for Google search, track analytics, and refine conversion flow.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            <span>Predictable 5-Step Process</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
            How We Work
          </h2>
          <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
            A simple, transparent process focused on business outcomes — no jargon, no confusion.
          </p>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl relative flex flex-col justify-between hover:border-[#8A2B88]/50 hover:shadow-lg transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold text-[#8A2B88] bg-[#8A2B88]/10 px-3 py-1 rounded-full group-hover:bg-[#8A2B88] group-hover:text-white transition-colors">
                      STEP {step.num}
                    </span>
                    <div className="p-2.5 bg-[#FAF8F5] rounded-xl text-[#16203D] border border-[#E3DCD3] group-hover:text-[#8A2B88] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#16203D] font-sans">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#424965] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3DCD3] text-[10px] font-bold text-[#8A2B88]">
                  Stage {step.num} Milestone
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
