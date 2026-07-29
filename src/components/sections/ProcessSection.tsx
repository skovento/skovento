'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Code, TrendingUp } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'We analyze your business model, target audience, technical requirements, and competitor gaps through an in-depth discovery sprint.',
      icon: <Compass className="w-6 h-6 text-[#1E2E6B]" />
    },
    {
      num: '02',
      title: 'Strategize',
      desc: 'We map out the exact mix of web development, UI/UX design, and marketing funnels to hit your specific quarterly growth milestones.',
      icon: <Target className="w-6 h-6 text-[#8A2B88]" />
    },
    {
      num: '03',
      title: 'Build & Launch',
      desc: 'Our engineering and design teams craft, test, and launch your project with zero downtime, pixel-perfect responsiveness, and 100/100 speed metrics.',
      icon: <Code className="w-6 h-6 text-[#C88770]" />
    },
    {
      num: '04',
      title: 'Grow & Optimize',
      desc: 'Post-launch, we continuously track analytics, run A/B conversion tests, and refine campaigns to compound your lead volume and revenue.',
      icon: <TrendingUp className="w-6 h-6 text-[#8A2B88]" />
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Proven Execution Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            How we work
          </h2>
          <p className="text-base text-[#424965]">
            A predictable, 4-step workflow built for speed, transparency, and maximum ROI.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl relative flex flex-col justify-between group hover:border-[#8A2B88]/50 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-[#16203D] text-[#FAF8F5] text-xs font-extrabold rounded-full">
                    Step {step.num}
                  </span>
                  <div className="p-2 bg-[#FAF8F5] rounded-xl border border-[#E3DCD3]">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#16203D] mb-3 font-sans group-hover:text-[#8A2B88] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#424965] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#E3DCD3] z-10" />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
