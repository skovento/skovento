'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const TECHNOLOGIES = [
  { name: 'React', category: 'Frontend', note: 'Component-driven interactive UI' },
  { name: 'Next.js', category: 'Framework', note: 'App Router & server-side rendering' },
  { name: 'TypeScript', category: 'Language', note: 'Type safety and maintainable code' },
  { name: 'Tailwind CSS', category: 'Styling', note: 'Utility-first responsive design system' },
  { name: 'Node.js', category: 'Runtime', note: 'Fast backend services & APIs' },
  { name: 'NestJS', category: 'Backend', note: 'Structured enterprise server architecture' },
  { name: 'PostgreSQL', category: 'Database', note: 'Reliable relational data storage' },
  { name: 'REST APIs', category: 'Integration', note: 'Seamless third-party connectivity' },
];

export function TechnologiesSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <SectionHeading
          eyebrow="Technology Foundation"
          title="Modern technology, chosen for the project."
          subtitle="We select tools based on performance, maintainability, and what your project genuinely needs — avoiding unnecessary frameworks or bloated dependencies."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {TECHNOLOGIES.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="p-5 rounded-xl border border-[#E3DCD3] bg-white shadow-2xs hover:border-[#4F46E5]/40 transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#16203D] font-sans">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono font-medium text-[#4F46E5] bg-indigo-50 px-1.5 py-0.5 rounded">
                  {tech.category}
                </span>
              </div>
              <p className="text-[11px] text-[#424965] leading-relaxed">
                {tech.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
