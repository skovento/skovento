'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { caseStudiesData, type CaseStudy } from '@/data/case-studies';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';

export function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Websites' | 'Business Systems' | 'Product Concepts'>('All');

  const categories = ['All', 'Websites', 'Business Systems', 'Product Concepts'] as const;

  const filteredProjects =
    activeFilter === 'All'
      ? caseStudiesData
      : caseStudiesData.filter((item) => item.category === activeFilter);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading & Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Independent Demonstrations"
              title="See what your business could look like online."
              subtitle="Explore independently created concept projects that demonstrate our approach to design, development and solving common business challenges."
              align="left"
            />
          </div>

          <div className="shrink-0">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16203D] text-white text-xs font-semibold hover:bg-[#4F46E5] transition-colors shadow-2xs"
            >
              <span>Explore All Demonstrations</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#E3DCD3]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-[#16203D] text-white shadow-2xs'
                  : 'bg-[#F3EFEA] text-[#424965] hover:text-[#16203D] border border-[#E3DCD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group rounded-2xl border border-[#E3DCD3] bg-white overflow-hidden shadow-xs hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Preview / Thumbnail */}
                <div className={`h-48 bg-gradient-to-br ${project.imageColor} p-6 flex flex-col justify-between relative border-b border-[#E3DCD3]`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/30 backdrop-blur-md px-2.5 py-1 rounded">
                      {project.category}
                    </span>
                    <Badge variant="concept">
                      Concept Project
                    </Badge>
                  </div>

                  {/* Mock interface representation */}
                  <div className="p-3 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-xs">
                    <span className="text-xs font-bold text-[#16203D] block truncate">
                      {project.businessType}
                    </span>
                    <span className="text-[11px] text-[#424965] truncate block">
                      {project.techStack.join(' · ')}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#16203D] font-sans group-hover:text-[#4F46E5] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-1.5 text-xs text-[#424965] leading-relaxed">
                      <p className="font-medium text-[#16203D]">
                        Business Problem:
                      </p>
                      <p className="line-clamp-3">
                        {project.problem}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF8F5] border border-[#E3DCD3] text-[#424965]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore Link */}
                  <div className="pt-4 border-t border-[#E3DCD3]/70">
                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-[#16203D] group-hover:text-[#4F46E5] transition-colors"
                    >
                      <span>Explore Concept Details</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Transparent Note */}
        <div className="p-4 rounded-xl bg-[#F3EFEA] border border-[#E3DCD3] text-xs text-[#424965] flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#4F46E5] shrink-0" />
          <span>
            <strong>Transparent Practice:</strong> All projects shown are independent concepts created by Skovento to demonstrate architecture, layout, and UX standards without fabricating client relationships.
          </span>
        </div>
      </div>
    </section>
  );
}
