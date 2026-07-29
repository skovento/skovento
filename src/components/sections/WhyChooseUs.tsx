'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Rocket, Eye, Scaling } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Layers className="w-8 h-8 text-[#8A2B88]" />,
      num: '01',
      title: 'One team, two disciplines',
      desc: 'No more juggling separate web dev agencies and marketing freelancers who don’t talk to each other. We align software engineering with conversion strategy.'
    },
    {
      icon: <Rocket className="w-8 h-8 text-[#C88770]" />,
      num: '02',
      title: 'Built for growth, not just launch',
      desc: 'Every line of code and pixel we deliver is engineered with Core Web Vitals, technical SEO, and conversion rate optimization built-in from day zero.'
    },
    {
      icon: <Eye className="w-8 h-8 text-[#1E2E6B]" />,
      num: '03',
      title: 'Transparent process',
      desc: 'Clear sprint timelines, real-time Slack/Notion updates, fixed milestone pricing, and absolute zero hidden operational costs.'
    },
    {
      icon: <Scaling className="w-8 h-8 text-[#8A2B88]" />,
      num: '04',
      title: 'Flexible, scalable teams',
      desc: 'Whether you need a single landing page launch or an end-to-end multi-channel growth engine, our global senior team scales with your budget.'
    }
  ];

  return (
    <section className="py-24 bg-[#F3EFEA] border-y border-[#E3DCD3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            The Skovento Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Why businesses choose Skovento
          </h2>
          <p className="text-base text-[#424965]">
            We bridge the critical gap between technical perfection and commercial revenue generation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl relative overflow-hidden group hover:border-[#8A2B88]/40 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-[#F3EFEA] rounded-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-3xl font-black text-[#16203D]/15 font-sans">
                  {item.num}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#16203D] mb-3 font-sans group-hover:text-[#8A2B88] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#424965] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
