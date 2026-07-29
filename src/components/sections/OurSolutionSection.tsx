'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const OurSolutionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const card1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  const solutions = [
    {
      id: 'web-dev',
      title: 'Custom Website Development',
      badge: 'Core Digital Foundation',
      description: 'High-performing, custom engineered Next.js websites built to turn casual visitors into paying clients.',
      icon: <Code className="w-8 h-8 text-[#8A2B88]" />,
      link: '/services/website-development',
      bgGradient: 'from-[#16203D] via-[#1E2E6B] to-[#16203D]',
      isDark: true,
      features: [
        'Custom 100% Unique Design',
        'Fully Responsive & Mobile-First',
        'Sub-1-Second Page Speed',
        'SEO-Ready Architecture',
        'Bank-Grade Security',
        'Easy to Manage Content CMS'
      ]
    },
    {
      id: 'digital-marketing',
      title: 'Performance Digital Marketing',
      badge: 'Revenue Acquisition Engine',
      description: 'Targeted Google Ads, Meta Campaigns, and SEO strategies engineered to drive predictable, high-margin sales.',
      icon: <TrendingUp className="w-8 h-8 text-[#C88770]" />,
      link: '/services/search-engine-optimization',
      bgGradient: 'from-[#FAF8F5] via-[#F3EFEA] to-[#FAF8F5]',
      isDark: false,
      features: [
        'Search Engine Optimization (SEO)',
        'Google Ads (PPC Campaigns)',
        'Meta Ads (Facebook & Instagram)',
        'Targeted Buyer Lead Generation',
        'Conversion Copywriting',
        'Transparent ROI Tracking'
      ]
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 bg-[#FAF8F5] overflow-hidden">
      
      {/* Background Cinematic Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#8A2B88]/10 via-[#C88770]/10 to-[#16203D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider border border-[#8A2B88]/20">
            <Sparkles className="w-4 h-4 text-[#C88770]" />
            <span>Lenis Parallax Solution Stack</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Our Solution
          </h2>
          <p className="text-base text-[#424965]">
            Everything your business needs to build a solid digital foundation, attract buyers, and scale sustainably.
          </p>
        </div>

        {/* Lenis.dev Style Sticky Parallax Card Stack */}
        <div className="space-y-12">
          
          {/* Card 1: Web Dev (Sticky Stacked) */}
          <motion.div
            style={{ scale: card1Scale, opacity: card1Opacity }}
            className="sticky top-28 p-8 sm:p-12 bg-gradient-to-br from-[#16203D] via-[#1E2E6B] to-[#251842] text-[#FAF8F5] border border-white/10 rounded-3xl space-y-8 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                  {solutions[0].icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#E5C396] uppercase tracking-wider">
                    {solutions[0].badge}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-sans mt-0.5">
                    {solutions[0].title}
                  </h3>
                </div>
              </div>
              <Link
                href={solutions[0].link}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#8A2B88] text-white text-xs font-bold transition-all border border-white/10"
              >
                <span>Explore Web Dev</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-base text-white/80 max-w-3xl leading-relaxed">
              {solutions[0].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              {solutions[0].features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <CheckCircle className="w-4 h-4 text-[#E5C396] flex-shrink-0" />
                  <span className="text-xs font-semibold text-white">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Digital Marketing (Slides over Card 1) */}
          <motion.div
            className="p-8 sm:p-12 bg-[#F3EFEA] text-[#16203D] border border-[#E3DCD3] rounded-3xl space-y-8 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E3DCD3] shadow-sm">
                  {solutions[1].icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
                    {solutions[1].badge}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-[#16203D] font-sans mt-0.5">
                    {solutions[1].title}
                  </h3>
                </div>
              </div>
              <Link
                href={solutions[1].link}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16203D] hover:bg-[#8A2B88] text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Explore Marketing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-base text-[#424965] max-w-3xl leading-relaxed">
              {solutions[1].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#E3DCD3]">
              {solutions[1].features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E3DCD3]">
                  <CheckCircle className="w-4 h-4 text-[#8A2B88] flex-shrink-0" />
                  <span className="text-xs font-semibold text-[#16203D]">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
