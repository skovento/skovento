'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Layout, Code, ShieldCheck, Rocket, Megaphone, TrendingUp } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Analyzing your business goals, target buyers, and market competitors.', icon: <Search className="w-5 h-5" /> },
    { num: '02', title: 'Strategy', desc: 'Crafting custom site architecture and targeted lead generation funnels.', icon: <Compass className="w-5 h-5" /> },
    { num: '03', title: 'Design', desc: 'Designing modern UI/UX interfaces that elevate brand authority.', icon: <Layout className="w-5 h-5" /> },
    { num: '04', title: 'Development', desc: 'Engineering clean Next.js code for 100/100 speed and security.', icon: <Code className="w-5 h-5" /> },
    { num: '05', title: 'Testing', desc: 'Rigorous QA testing across all mobile screens and browser engines.', icon: <ShieldCheck className="w-5 h-5" /> },
    { num: '06', title: 'Launch', desc: 'Deploying your digital foundation on high-speed global CDN servers.', icon: <Rocket className="w-5 h-5" /> },
    { num: '07', title: 'Marketing', desc: 'Executing Google Ads, Meta Campaigns, and SEO optimization.', icon: <Megaphone className="w-5 h-5" /> },
    { num: '08', title: 'Growth', desc: 'Continuous CRO optimization, performance tracking, and scaling.', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Predictable Execution Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Our 8-Step Growth Process
          </h2>
          <p className="text-base text-[#424965]">
            A structured, transparent journey from initial concept to market leadership.
          </p>
        </div>

        {/* 8-Step Animated Grid Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl relative flex flex-col justify-between hover:border-[#8A2B88]/50 hover:shadow-xl transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#8A2B88] bg-[#8A2B88]/10 px-3 py-1 rounded-full group-hover:bg-[#8A2B88] group-hover:text-white transition-colors">
                    STAGE {step.num}
                  </span>
                  <div className="p-2.5 bg-[#FAF8F5] rounded-xl text-[#16203D] border border-[#E3DCD3] group-hover:text-[#8A2B88] group-hover:scale-110 transition-all">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#16203D] font-sans">
                  {step.title}
                </h3>

                <p className="text-xs text-[#424965] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-[10px] font-bold text-[#8A2B88]">
                <span>Progress Milestone</span>
                <span className="w-2 h-2 rounded-full bg-[#8A2B88] animate-ping" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
