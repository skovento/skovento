'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { caseStudiesData, type CaseStudy } from '@/data/case-studies';
import { Button } from '@/components/ui/Button';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Websites' | 'Business Systems' | 'Product Concepts'>('All');

  const categories = ['All', 'Websites', 'Business Systems', 'Product Concepts'] as const;

  const filteredStudies =
    activeFilter === 'All'
      ? caseStudiesData
      : caseStudiesData.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#16203D] selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* Work Hero */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3DCD3] text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
              <span>Independent Demonstrations &amp; Concepts</span>
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight">
              Working concept projects.
            </h1>

            <p className="text-base sm:text-lg text-[#424965] leading-relaxed max-w-2xl mx-auto">
              Explore independently created demonstrations that show how we approach real-world business challenges — from local service websites to industrial catalogues and management dashboards.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                    activeFilter === cat
                      ? 'bg-[#16203D] text-white shadow-2xs'
                      : 'bg-white text-[#424965] hover:text-[#16203D] border border-[#E3DCD3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredStudies.map((study, idx) => (
                  <motion.article
                    key={study.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group rounded-2xl border border-[#E3DCD3] bg-white overflow-hidden shadow-xs hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Visual Banner */}
                    <div className={`h-48 bg-gradient-to-br ${study.imageColor} p-6 flex flex-col justify-between border-b border-[#E3DCD3]`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                          {study.category}
                        </span>
                        <Badge variant="concept">
                          {study.projectType}
                        </Badge>
                      </div>

                      <div className="p-3 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-xs">
                        <span className="text-xs font-bold text-[#16203D] block truncate">
                          {study.businessType}
                        </span>
                        <span className="text-[11px] text-[#424965] truncate block">
                          {study.techStack.slice(0, 3).join(' · ')}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-xl font-bold text-[#16203D] font-sans group-hover:text-[#4F46E5] transition-colors leading-snug">
                          {study.title}
                        </h2>

                        <div className="space-y-1.5 text-xs text-[#424965] leading-relaxed">
                          <p className="font-semibold text-[#16203D]">
                            Business Problem:
                          </p>
                          <p className="line-clamp-3">
                            {study.problem}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {study.features.slice(0, 3).map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF8F5] border border-[#E3DCD3] text-[#424965]"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Detail Link */}
                      <div className="pt-4 border-t border-[#E3DCD3]/70">
                        <Link
                          href={`/work/${study.slug}`}
                          className="inline-flex items-center justify-between w-full text-xs font-bold text-[#16203D] group-hover:text-[#4F46E5] transition-colors"
                        >
                          <span>Explore Concept Specification</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Transparency Note */}
            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E3DCD3] text-xs text-[#424965] flex items-start sm:items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5 sm:mt-0" />
              <p className="leading-relaxed">
                <strong>Demonstration Policy:</strong> All projects shown on this page are independent demonstrations and concept designs engineered by Skovento. We do not invent customer testimonials, fake company registrations, or fabricated client results.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#F3EFEA] border-t border-[#E3DCD3]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D]">
              Have a similar digital challenge?
            </h2>
            <p className="text-base text-[#424965] max-w-xl mx-auto">
              We can build a tailored solution designed around your specific requirements and operational workflow.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                  Discuss Your Project
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
