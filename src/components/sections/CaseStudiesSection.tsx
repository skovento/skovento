'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { caseStudiesData, type CaseStudy } from '@/data/case-studies';
import { Spatial3DCard } from '../ui/Spatial3DCard';

export function CaseStudiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Websites', 'Local Business', 'E-commerce', 'SaaS'];

  const filteredStudies =
    activeCategory === 'All'
      ? caseStudiesData
      : caseStudiesData.filter(
          (s) => s.category === activeCategory || s.industry === activeCategory
        );

  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA]/80 backdrop-blur-md border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C88770]" />
              <span>Transparent Portfolio</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
              Selected Work &amp; Concepts
            </h2>
            <p className="text-base text-[#424965] leading-relaxed">
              Real-world digital experiences designed to demonstrate how we approach different business challenges. Every item below is an independently designed Concept Project.
            </p>
          </div>

          <Link
            href="/work"
            className="tap-target inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16203D] hover:bg-[#8A2B88] text-white text-xs font-extrabold transition-all shadow-md shrink-0"
          >
            <span>Explore All Concept Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#E3DCD3]">
          <span className="text-xs font-bold text-[#424965]/70 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#16203D] text-white shadow-md'
                  : 'bg-[#FAF8F5] text-[#424965] hover:text-[#16203D] border border-[#E3DCD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, idx) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Spatial3DCard depth={20} maxTilt={12} className="h-full">
                  <div className="group bg-[#FAF8F5] border border-[#E3DCD3] hover:border-[#8A2B88]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-lg flex flex-col justify-between h-full">
                    
                    {/* Banner */}
                    <div className={`h-40 bg-gradient-to-br ${study.imageColor} p-6 flex flex-col justify-between relative`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                          {study.category}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#16203D] bg-[#E5C396] px-3 py-1 rounded-full shadow-sm">
                          Concept Project
                        </span>
                      </div>

                      <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl w-fit shadow-md border border-white">
                        <span className="text-xs font-extrabold text-[#16203D] flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#8A2B88]" />
                          {study.highlightResult}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="text-xs font-extrabold text-[#8A2B88] mb-1">
                          {study.client}
                        </div>
                        <h3 className="text-lg font-bold text-[#16203D] mb-2 leading-snug font-sans group-hover:text-[#8A2B88] transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-xs text-[#424965] line-clamp-3 leading-relaxed">
                          {study.summary}
                        </p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-[#E3DCD3]">
                        <div className="grid grid-cols-2 gap-2 text-center">
                          {study.metrics.slice(0, 2).map((m, i) => (
                            <div key={i} className="p-2 bg-[#F3EFEA] rounded-xl">
                              <div className="text-sm font-extrabold text-[#16203D] font-sans">
                                {m.value}
                              </div>
                              <div className="text-[10px] font-medium text-[#424965]">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <Link
                          href={`/work/${study.slug}`}
                          className="tap-target inline-flex items-center justify-between w-full text-xs font-bold text-[#16203D] group-hover:text-[#8A2B88] transition-colors pt-2"
                        >
                          <span>Explore Concept Case Study</span>
                          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </Spatial3DCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
