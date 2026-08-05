'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { caseStudiesData } from '@/data/case-studies';
import { Spatial3DCard } from '../ui/Spatial3DCard';

export const CaseStudiesSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-24 bg-[#F3EFEA]/80 backdrop-blur-md border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
              Concept Builds
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] mt-2 font-sans">
              We&apos;re new — here&apos;s what we can build
            </h2>
            <p className="text-sm text-[#424965] mt-3 max-w-xl">
              Self-initiated concept projects, labeled honestly. No real clients yet — just real engineering.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 min-h-11 px-1 py-2 text-sm font-extrabold text-[#8A2B88] hover:text-[#16203D] transition-colors"
          >
            <span>View All Concept Builds</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudiesData.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Spatial3DCard depth={24} maxTilt={14} className="h-full">
                <div className="group bg-[#FAF8F5] border border-[#E3DCD3] hover:border-[#8A2B88]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-lg flex flex-col justify-between h-full">
                  {/* Visual Card Banner */}
                  <div className={`h-40 bg-gradient-to-br ${study.imageColor} p-6 flex flex-col justify-between relative`}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                        {study.category}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#16203D] bg-[#E5C396] px-3 py-1 rounded-full w-fit">
                        Concept
                      </span>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl w-fit shadow-md border border-white">
                      <span className="text-xs font-extrabold text-[#16203D] flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#8A2B88]" />
                        {study.highlightResult}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#8A2B88] mb-1">
                        {study.client}
                      </div>
                      <h3 className="text-lg font-bold text-[#16203D] mb-3 leading-snug font-sans group-hover:text-[#8A2B88] transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-xs text-[#424965] line-clamp-3 mb-6">
                        {study.summary}
                      </p>

                      {/* Metrics preview */}
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#E3DCD3]">
                        {study.metrics.slice(0, 2).map((m, i) => (
                          <div key={i} className="p-2 bg-[#F3EFEA] rounded-xl text-center">
                            <div className="text-base font-extrabold text-[#16203D] font-sans">
                              {m.value}
                            </div>
                            <div className="text-[10px] font-medium text-[#424965]">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link
                        href={`/work/${study.slug}`}
                        className="inline-flex items-center justify-between w-full text-xs font-bold text-[#16203D] group-hover:text-[#8A2B88] transition-colors"
                      >
                        <span>Read Full Case Study</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
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
