'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';
import { Button } from '@/components/ui/Button';
import { caseStudiesData } from '@/data/case-studies';
import { ArrowLeft, ArrowUpRight, TrendingUp, Quote, CheckCircle2 } from 'lucide-react';

export default function SingleCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [modalOpen, setModalOpen] = useState(false);

  const study = caseStudiesData.find((c) => c.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex-grow pt-28">
        {/* Header Hero */}
        <section className="py-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#8A2B88] hover:text-[#16203D] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Case Studies</span>
            </Link>

            <div className="max-w-3xl space-y-4">
              <span className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] text-xs font-extrabold rounded-full uppercase tracking-wider">
                {study.category} Case Study
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
                {study.title}
              </h1>
              <p className="text-base text-[#424965] leading-relaxed">
                {study.summary}
              </p>
            </div>

            {/* Impact Metrics Banner */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-[#16203D] text-[#FAF8F5] rounded-3xl shadow-xl">
              {study.metrics.map((m, i) => (
                <div key={i} className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-4xl font-black text-[#E5C396] font-sans mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-white/80">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive Breakdown */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* The Challenge */}
            <div className="p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
                The Challenge
              </span>
              <h2 className="text-2xl font-bold text-[#16203D] font-sans">
                Legacy Bottlenecks & Growth Obstacles
              </h2>
              <p className="text-sm text-[#424965] leading-relaxed">
                {study.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C88770]">
                The Skovento Solution
              </span>
              <h2 className="text-2xl font-bold text-[#16203D] font-sans">
                Custom Engineering & High-Converting Marketing
              </h2>
              <p className="text-sm text-[#424965] leading-relaxed mb-6">
                {study.solution}
              </p>

              <div className="pt-4 border-t border-[#E3DCD3]">
                <span className="text-xs font-bold text-[#16203D] block mb-3">Tech & Tools Deployed:</span>
                <div className="flex flex-wrap gap-2">
                  {study.techStack.map((tech, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Quote */}
            <div className="p-8 bg-[#8A2B88]/10 border border-[#8A2B88]/30 rounded-3xl space-y-4 text-center">
              <Quote className="w-8 h-8 text-[#8A2B88] mx-auto" />
              <blockquote className="text-lg font-bold text-[#16203D] italic max-w-2xl mx-auto font-sans">
                "{study.quote.text}"
              </blockquote>
              <div className="text-xs font-semibold text-[#8A2B88]">
                — {study.quote.author}, <span className="text-[#424965]">{study.quote.role} at {study.client}</span>
              </div>
            </div>

            <div className="text-center pt-8">
              <Button size="lg" onClick={() => setModalOpen(true)} icon={<ArrowUpRight className="w-5 h-5" />}>
                Build Your Own Success Story
              </Button>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactBtn onOpenModal={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
