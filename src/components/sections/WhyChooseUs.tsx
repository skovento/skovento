'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Briefcase, MessageSquare, DollarSign, Handshake, Award, CheckCircle2 } from 'lucide-react';
import { Spatial3DCard } from '../ui/Spatial3DCard';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Growth First',
      description: 'We measure success by your business growth, customer inquiries, and revenue increase.',
      icon: <Target className="w-6 h-6 text-[#8A2B88]" />
    },
    {
      title: 'Business Focused',
      description: 'We align design and marketing strategies directly with your revenue and business goals.',
      icon: <Briefcase className="w-6 h-6 text-[#C88770]" />
    },
    {
      title: 'Transparent Communication',
      description: 'Clear timelines, direct updates, and honest reporting with no hidden fees or tech jargon.',
      icon: <MessageSquare className="w-6 h-6 text-[#1E2E6B]" />
    },
    {
      title: 'Affordable Solutions',
      description: 'Enterprise-grade quality and execution priced accessibly for startups and growing businesses.',
      icon: <DollarSign className="w-6 h-6 text-[#8A2B88]" />
    },
    {
      title: 'Long-Term Partnership',
      description: 'We don’t abandon you after launch. We remain your dedicated digital growth partner.',
      icon: <Handshake className="w-6 h-6 text-[#C88770]" />
    },
    {
      title: 'Result-Oriented Strategy',
      description: 'Every line of code and ad campaign is optimized to convert visitors into loyal clients.',
      icon: <Award className="w-6 h-6 text-[#1E2E6B]" />
    }
  ];

  return (
    <section className="py-14 sm:py-24 bg-[#F3EFEA]/80 backdrop-blur-md border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Why Partner With Skovento
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Built for Real Outcomes, Not Just Promises
          </h2>
          <p className="text-base text-[#424965]">
            Instead of claiming "we are the best", we focus entirely on what drives measurable impact for your business.
          </p>
        </div>

        {/* 6 3D Interactive Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Spatial3DCard depth={18} maxTilt={12} className="h-full">
                <div className="p-6 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl space-y-4 shadow-sm hover:border-[#8A2B88]/50 hover:shadow-xl transition-all group h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#F3EFEA] rounded-2xl border border-[#E3DCD3] group-hover:scale-110 transition-transform">
                        {pillar.icon}
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-[#8A2B88]" />
                    </div>

                    <h3 className="text-xl font-bold text-[#16203D] font-sans">
                      ✔ {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Spatial3DCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
