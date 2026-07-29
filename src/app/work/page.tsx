'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { caseStudiesData } from '@/data/case-studies';
import { ArrowUpRight, TrendingUp, Sparkles, Filter } from 'lucide-react';

export default function WorkPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'E-commerce', 'SaaS', 'Healthcare'];

  const filteredStudies = activeFilter === 'All'
    ? caseStudiesData
    : caseStudiesData.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-grow pt-28">
        {/* Work Hero */}
        <section className="py-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 inline-block">
              Proven Case Studies & Portfolio
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight mb-4">
              Real Impact. <span className="text-gradient-brand">Verifiable ROI.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#424965]">
              Explore how we've helped ambitious brands transform their digital presence and scale revenue across e-commerce, SaaS, and health sectors.
            </p>

            {/* Filter Pills */}
            <div className="flex items-center justify-center gap-2 pt-8">
              <div className="p-1.5 bg-[#FAF8F5] border border-[#E3DCD3] rounded-full inline-flex">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                      activeFilter === cat
                        ? 'bg-[#16203D] text-white shadow-md'
                        : 'text-[#424965] hover:text-[#16203D]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Showcase */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredStudies.map((study) => (
                <div
                  key={study.id}
                  className="group bg-[#F3EFEA] border border-[#E3DCD3] hover:border-[#8A2B88]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
                >
                  <div className={`h-44 bg-gradient-to-br ${study.imageColor} p-6 flex flex-col justify-between`}>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                      {study.category}
                    </span>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl w-fit shadow-md border border-white">
                      <span className="text-xs font-extrabold text-[#16203D] flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-[#8A2B88]" />
                        {study.highlightResult}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#8A2B88] mb-1 block">
                        {study.client}
                      </span>
                      <h3 className="text-xl font-bold text-[#16203D] mb-3 leading-snug font-sans group-hover:text-[#8A2B88] transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-xs text-[#424965] mb-6 leading-relaxed">
                        {study.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {study.techStack.map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 bg-[#FAF8F5] border border-[#E3DCD3] text-[#16203D] rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E3DCD3] text-xs font-bold text-[#16203D] group-hover:text-[#8A2B88] transition-colors"
                    >
                      <span>Explore Case Study Details</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTASection onOpenModal={() => setModalOpen(true)} />
      </main>

      <Footer />
      <FloatingContactBtn onOpenModal={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
