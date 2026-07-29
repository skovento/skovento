'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const OurSolutionSection: React.FC = () => {
  const solutions = [
    {
      title: 'Website Development',
      description: 'High-performing, custom engineered websites built to turn visitors into paying clients.',
      icon: <Code className="w-8 h-8 text-[#8A2B88]" />,
      link: '/services/website-development',
      features: [
        'Custom Design',
        'Fully Responsive & Mobile-First',
        'Ultra Fast Loading Speed',
        'SEO Ready Architecture',
        'Enterprise Grade Security',
        'Easy to Manage CMS'
      ]
    },
    {
      title: 'Digital Marketing',
      description: 'Targeted acquisition strategies to drive qualified buyer traffic and maximize ROI.',
      icon: <TrendingUp className="w-8 h-8 text-[#C88770]" />,
      link: '/services/search-engine-optimization',
      features: [
        'Search Engine Optimization (SEO)',
        'Google Ads (PPC Campaigns)',
        'Meta Ads (Facebook & Instagram)',
        'Targeted Lead Generation',
        'Content Strategy & Copywriting',
        'Transparent Performance Tracking'
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Unified Growth Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Our Solution
          </h2>
          <p className="text-base text-[#424965]">
            Everything your business needs to build a solid digital presence, attract buyers, and scale sustainably.
          </p>
        </div>

        {/* 2 Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-8 sm:p-10 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-6 shadow-sm hover:border-[#8A2B88]/40 transition-colors relative flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E3DCD3] shadow-sm">
                    {sol.icon}
                  </div>
                  <span className="text-xs font-bold text-[#8A2B88] uppercase tracking-wider bg-[#8A2B88]/10 px-3 py-1 rounded-full">
                    Core Capability
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#16203D] font-sans">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-[#424965] mt-2 leading-relaxed">
                    {sol.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {sol.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#8A2B88] flex-shrink-0" />
                      <span className="text-xs font-semibold text-[#16203D]">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#E3DCD3]">
                <Link
                  href={sol.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#8A2B88] hover:text-[#16203D] transition-colors group"
                >
                  <span>Explore {sol.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
