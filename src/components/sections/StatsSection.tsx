'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const StatsSection: React.FC = () => {
  const impactMetrics = [
    { value: '50+', label: 'Projects Delivered', desc: 'Across USA, Europe & Global Markets' },
    { value: '3x', label: 'Average Traffic Growth', desc: 'Achieved within 6 months post-launch' },
    { value: '98%', label: 'Client Satisfaction', desc: 'Based on verified milestone reviews' },
    { value: '10+', label: 'Industries Served', desc: 'E-commerce, SaaS, Healthcare & B2B' }
  ];

  return (
    <section className="py-20 bg-[#16203D] text-[#FAF8F5] relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#8A2B88]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#C88770]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C88770]">
            Quantifiable Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 font-sans">
            Impact numbers that drive growth
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {impactMetrics.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#FAF8F5]/5 border border-[#FAF8F5]/10 text-center flex flex-col justify-between hover:border-[#C88770]/40 transition-colors"
            >
              <div>
                <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FAF8F5] via-[#E5C396] to-[#C88770] font-sans mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  {stat.label}
                </div>
              </div>
              <div className="text-xs text-[#FAF8F5]/60 mt-3 pt-3 border-t border-white/10">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
