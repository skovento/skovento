'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ShieldCheck, TrendingUp, Users } from 'lucide-react';

interface TeamSectionProps {
  onOpenModal?: () => void;
}

export function TeamSection({ onOpenModal }: TeamSectionProps) {
  const disciplines = [
    {
      role: 'Web Development & Architecture',
      title: 'Full-Stack Engineering',
      focus: 'Performance & Frontend Architecture',
      icon: Code2,
      skills: ['Next.js / React', 'TypeScript', 'API Integration', 'Sub-Second Speed', 'Scalable Code'],
      description:
        'Engineers modern, high-performance web platforms, custom web applications, and fast responsive user interfaces.',
      badgeColor: 'bg-[#8A2B88]/10 text-[#8A2B88]',
    },
    {
      role: 'Quality Assurance & Client Coordination',
      title: 'QA & Project Scoping',
      focus: 'Quality Assurance & Client Support',
      icon: ShieldCheck,
      skills: ['Quality Assurance', 'Requirement Analysis', 'Client Communication', 'Project Coordination', 'User Testing'],
      description:
        'Ensures zero bugs, seamless user flows, clear requirement scoping, and prompt transparent communication throughout project lifecycles.',
      badgeColor: 'bg-[#C88770]/10 text-[#C88770]',
    },
    {
      role: 'SEO & Digital Growth Strategy',
      title: 'Search & Growth Optimization',
      focus: 'Search Visibility & Growth Strategy',
      icon: TrendingUp,
      skills: ['Technical SEO', 'Google Business Local SEO', 'Search Console', 'Content Strategy', 'Analytics & Conversion'],
      description:
        'Optimizes sites for search engines, sets up structured local Schema.org data, and turns digital traffic into real customer enquiries.',
      badgeColor: 'bg-[#16203D]/10 text-[#16203D]',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16203D]/10 text-xs font-bold text-[#16203D] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Our Core Disciplines</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
            Three Disciplines. One Focused Digital Team.
          </h2>
          <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
            You don&apos;t deal with account managers who pass messages down a chain. You work directly with the developers, QA specialists, and marketers building and growing your platform.
          </p>
        </div>

        {/* Disciplines Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {disciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-6 flex flex-col justify-between hover:border-[#8A2B88]/40 transition-all shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${item.badgeColor}`}>
                      {item.focus}
                    </span>
                    <div className="p-2.5 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl text-[#16203D]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-[#16203D] font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-[#8A2B88]">
                      {item.role}
                    </p>
                  </div>

                  <p className="text-xs text-[#424965] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-[11px] font-extrabold text-[#16203D] uppercase tracking-wider mb-2">
                      Core Specialization:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E3DCD3] rounded-md text-[11px] font-medium text-[#424965]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E3DCD3] text-[11px] text-[#424965]/70 font-mono">
                  Direct Partner Access — No Account Layer
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
