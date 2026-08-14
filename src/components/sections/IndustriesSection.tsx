'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Utensils, Sparkles, Compass, Building, 
  Briefcase, ArrowRight, Check 
} from 'lucide-react';
import { industriesData } from '@/data/industries';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Utensils,
  Sparkles,
  Compass,
  Building,
  Briefcase,
};

export function IndustriesSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            <span>Tailored Industry Solutions</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
            Built Around Your Business
          </h2>
          <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
            Instead of generic web templates, explore how we build tailored digital experiences for your exact industry.
          </p>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesData.map((ind, idx) => {
            const Icon = iconMap[ind.iconName] || Briefcase;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl space-y-6 flex flex-col justify-between hover:border-[#8A2B88]/40 transition-all shadow-sm group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#F3EFEA] border border-[#E3DCD3] rounded-2xl text-[#8A2B88]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-[#424965]/70 uppercase tracking-widest">
                      Industry Solution
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#16203D] font-sans group-hover:text-[#8A2B88] transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs font-bold text-[#C88770] mt-1">
                      {ind.tagline}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-xs text-[#424965]">
                    <div>
                      <strong className="text-[#16203D] block mb-0.5">Digital Bottleneck:</strong>
                      <span>{ind.problem}</span>
                    </div>

                    <div>
                      <strong className="text-[#16203D] block mb-0.5">Skovento Solution:</strong>
                      <span>{ind.solution}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E3DCD3] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#16203D]">
                    {ind.conceptProjectTitle}
                  </span>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="tap-target inline-flex items-center gap-1.5 text-xs font-extrabold text-[#8A2B88] hover:text-[#16203D] transition-colors"
                  >
                    See how this works
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
