'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, ShieldCheck, Cpu, Sliders, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Spatial3DCard } from '../ui/Spatial3DCard';

export function WhyChooseUs() {
  const pillars = [
    {
      title: 'Business-First Thinking',
      description: 'We start with your business problem, sales bottlenecks, and target buyers — not just visual trends.',
      icon: Target,
    },
    {
      title: 'Small Team, Direct Communication',
      description: 'You work directly with our engineering, QA, and growth specialists — the people building, testing, and growing your platform.',
      icon: Users,
    },
    {
      title: 'Build + Quality + Growth',
      description: 'Development, QA testing, SEO, and digital growth are handled by the same unified 3-member team.',
      icon: ShieldCheck,
    },
    {
      title: 'Modern & Scalable Tech',
      description: 'Engineered on Next.js, React, TypeScript, and Tailwind CSS for sub-second mobile performance.',
      icon: Cpu,
    },
    {
      title: 'No Unnecessary Complexity',
      description: 'We recommend what your business actually needs right now — no selling bloated features you won\'t use.',
      icon: Sliders,
    },
    {
      title: '100% Transparent Approach',
      description: 'Clear scope, transparent pricing, non-binding retainers, and honest concept project labeling.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA]/80 backdrop-blur-md border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            <span>Why Skovento</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
            Built for Real Outcomes, Not Just Promises
          </h2>
          <p className="text-base sm:text-lg text-[#424965]">
            Instead of claiming &quot;we are the best&quot;, we focus entirely on what drives measurable impact for your business.
          </p>
        </div>

        {/* 6 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Spatial3DCard depth={18} maxTilt={12} className="h-full">
                  <div className="p-6 sm:p-8 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl space-y-4 shadow-sm hover:border-[#8A2B88]/50 hover:shadow-xl transition-all group h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-[#F3EFEA] rounded-2xl border border-[#E3DCD3] text-[#8A2B88] group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-[#8A2B88]" />
                      </div>

                      <h3 className="text-xl font-bold text-[#16203D] font-sans">
                        {pillar.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Spatial3DCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
