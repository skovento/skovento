'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, XCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const challenges = [
    'You have a website but receive very few enquiries.',
    'You rely only on referrals for new customers.',
    'Your competitors appear first on Google.',
    'Your business isn’t visible online.',
    'You don’t know where to start with digital marketing.'
  ];

  return (
    <section className="py-14 sm:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 border border-[#8A2B88]/20 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-[#C88770]" />
              <span>Critical Business Diagnosis</span>
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
              Is Your Business Facing These Challenges?
            </h2>
          </div>

          {/* 5 Challenges Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {challenges.map((challenge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl relative flex items-start gap-4 hover:border-[#8A2B88]/40 transition-colors shadow-sm"
              >
                <div className="p-2 bg-[#FAF8F5] rounded-xl text-red-500 border border-red-200 flex-shrink-0 mt-1">
                  <XCircle className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-[#16203D] leading-relaxed">
                  {challenge}
                </p>
              </motion.div>
            ))}

            {/* Accent Solution Callout Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="p-6 bg-[#16203D] text-[#FAF8F5] border border-[#16203D] rounded-3xl flex items-center gap-4 shadow-xl"
            >
              <div className="p-2.5 bg-[#8A2B88] rounded-xl text-white flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#E5C396]" />
              </div>
              <p className="text-xs font-bold leading-relaxed text-white">
                Skovento fixes these root issues with a unified dev + growth strategy.
              </p>
            </motion.div>
          </div>

          {/* Section Closing Banner specified by user */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 bg-[#F3EFEA] border border-[#8A2B88]/30 rounded-3xl text-center space-y-3 relative overflow-hidden"
          >
            <p className="text-lg sm:text-xl font-extrabold text-[#16203D] font-sans">
              You're not alone.{' '}
              <span className="text-[#8A2B88]">
                Most businesses don't have a marketing problem—they have a digital foundation problem.
              </span>
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
