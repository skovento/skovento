'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Briefcase, MessageSquare, DollarSign, Handshake, Award } from 'lucide-react';

const pillars = [
  {
    title: 'Growth First',
    description:
      'We measure success by your business growth, customer enquiries, and revenue increase — not by how pretty the site looks.',
    icon: <Target className="w-5 h-5" />,
    accent: '#8A2B88',
  },
  {
    title: 'Business Focused',
    description:
      'Design and marketing strategies are aligned directly with your revenue and business goals — not awards or vanity metrics.',
    icon: <Briefcase className="w-5 h-5" />,
    accent: '#C88770',
  },
  {
    title: 'Transparent Communication',
    description:
      'Clear timelines, direct weekly updates, and honest reporting. No hidden fees, no tech jargon used to obscure bad news.',
    icon: <MessageSquare className="w-5 h-5" />,
    accent: '#1E2E6B',
  },
  {
    title: 'Affordable Solutions',
    description:
      'Enterprise-grade quality and execution, priced accessibly for startups and growing businesses in India.',
    icon: <DollarSign className="w-5 h-5" />,
    accent: '#8A2B88',
  },
  {
    title: 'Long-Term Partnership',
    description:
      "We don't abandon you after launch. We remain your dedicated digital growth partner for the months and years after.",
    icon: <Handshake className="w-5 h-5" />,
    accent: '#C88770',
  },
  {
    title: 'Result-Oriented Strategy',
    description:
      'Every line of code and every ad campaign is engineered to convert visitors into loyal clients. Results, not reports.',
    icon: <Award className="w-5 h-5" />,
    accent: '#1E2E6B',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-5">
            <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-[#8A2B88] mb-3">
              Why Partner With Skovento
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#16203D] leading-[1.05] tracking-tight font-sans text-balance">
              Built for real outcomes,<br className="hidden sm:block" /> not just promises.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
              Instead of claiming &ldquo;we are the best&rdquo;, we focus entirely on what drives measurable impact for your business.
            </p>
          </div>
        </div>

        {/* Pillars — asymmetric bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="group relative p-7 sm:p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl hover:border-transparent transition-all duration-300 overflow-hidden"
              style={{
                ['--hover-accent' as string]: pillar.accent,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 90% 90% at 0% 0%, ${pillar.accent}14, transparent 60%)`,
                  boxShadow: `inset 0 0 0 1px ${pillar.accent}30`,
                }}
                aria-hidden
              />

              <div className="relative z-10 flex flex-col h-full gap-5">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: `${pillar.accent}18`, color: pillar.accent }}
                >
                  {pillar.icon}
                </div>

                <div className="space-y-2.5 flex-1">
                  <h3 className="text-lg font-bold text-[#16203D] font-sans leading-snug group-hover:text-[#16203D]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#424965] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-0.5 w-0 group-hover:w-12 transition-all duration-500 rounded-full"
                  style={{ backgroundColor: pillar.accent }}
                  aria-hidden
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
