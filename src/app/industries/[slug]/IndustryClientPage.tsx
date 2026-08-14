'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';
import { type IndustryData } from '@/data/industries';
import { getCaseStudyBySlug } from '@/data/case-studies';
import { 
  CheckCircle2, XCircle, MessageSquare, ArrowRight, 
  Sparkles, ShieldCheck, ArrowLeft, Layers 
} from 'lucide-react';

export function IndustryClientPage({ industry }: { industry: IndustryData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'consultation' | 'audit'>('consultation');

  const conceptProject = getCaseStudyBySlug(industry.conceptProjectSlug);

  const handleOpenConsultation = () => {
    setModalMode('consultation');
    setIsModalOpen(true);
  };

  const handleOpenAuditModal = () => {
    setModalMode('audit');
    setIsModalOpen(true);
  };

  const whatsappPitchUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    industry.whatsappPitch
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white pb-16 sm:pb-0">
      <Navbar onOpenModal={handleOpenConsultation} onOpenAuditModal={handleOpenAuditModal} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb Back */}
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8A2B88] hover:text-[#16203D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Industries</span>
          </Link>

          {/* Hero Header */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>{industry.name} Solution</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
              {industry.title}
            </h1>

            <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
              {industry.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href={whatsappPitchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss {industry.name} Build on WhatsApp</span>
              </a>

              <Button variant="outline" onClick={handleOpenConsultation}>
                Book 3-Member Team Call
              </Button>
            </div>
          </div>

          {/* Problem vs Solution Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>Common Digital Bottleneck</span>
              </div>
              <p className="text-sm text-[#424965] leading-relaxed">
                {industry.problem}
              </p>
            </div>

            <div className="p-6 bg-[#16203D] text-white border border-[#16203D] rounded-3xl space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-[#E5C396] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>Skovento Solution</span>
              </div>
              <p className="text-sm text-white/90 leading-relaxed">
                {industry.solution}
              </p>
            </div>
          </div>

          {/* Key Features List */}
          <div className="p-8 bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-[#16203D] font-sans">
              Key Features We Build for {industry.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industry.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-[#F3EFEA] rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#8A2B88] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-[#16203D]">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Concept Project Showcase Link */}
          {conceptProject && (
            <div className="p-8 bg-gradient-to-br from-[#16203D] to-[#1E2E6B] text-white rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5C396] bg-white/10 px-3 py-1 rounded-full">
                  Concept Demonstration
                </span>
                <span className="text-xs text-white/70">
                  Tag: Concept Project (Skovento Build)
                </span>
              </div>

              <h3 className="text-2xl font-extrabold font-sans">
                {conceptProject.title} — {conceptProject.client}
              </h3>

              <p className="text-xs text-white/80 leading-relaxed">
                {conceptProject.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/work/${conceptProject.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E5C396] hover:text-white transition-colors"
                >
                  <span>Explore Concept Case Study Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Transparency Commitment */}
          <div className="p-6 bg-[#F3EFEA] border border-[#8A2B88]/30 rounded-2xl text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8A2B88]">
              <ShieldCheck className="w-4 h-4 text-[#C88770]" />
              <span>100% Transparent Advice</span>
            </div>
            <p className="text-xs text-[#424965] max-w-lg mx-auto">
              If your {industry.name.toLowerCase()} business doesn&apos;t need a full website, we will explicitly recommend simpler digital alternatives that save budget while delivering results.
            </p>
          </div>

        </div>
      </main>

      <Footer />

      <MobileBottomBar
        onOpenAuditModal={handleOpenAuditModal}
        onOpenConsultationModal={handleOpenConsultation}
      />

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
      />
    </div>
  );
}
