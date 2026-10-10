'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, FileCheck, Code2, MessageSquareText } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PRINCIPLES = [
  {
    title: 'Business-first thinking',
    description:
      'We begin by understanding your operational workflows, customer habits, and commercial goals before writing code or proposing architecture.',
    icon: Target,
  },
  {
    title: 'Clear scope and expectations',
    description:
      'You receive an itemised project scope, explicit deliverable definitions, and realistic delivery phases. No vague promises or scope creep.',
    icon: FileCheck,
  },
  {
    title: 'Responsive and maintainable development',
    description:
      'Engineered with modern Next.js, React, and TypeScript. Interfaces are responsive across devices, fast to load, accessible, and structured for easy maintenance.',
    icon: Code2,
  },
  {
    title: 'Transparent delivery process',
    description:
      'Direct, jargon-free communication and documented milestones. If a simpler solution accomplishes your objective better, we will advise it honestly.',
    icon: MessageSquareText,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          eyebrow="Our Principles"
          title="Thoughtful development. Clear communication."
          subtitle="How we approach our work, manage projects, and collaborate with business owners."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-7 sm:p-8 rounded-2xl border border-[#E3DCD3] bg-white flex flex-col justify-between shadow-xs hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#16203D] font-sans leading-snug">
                    {principle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3DCD3]/60 mt-4 text-[11px] font-mono font-semibold text-[#4F46E5]">
                  0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
