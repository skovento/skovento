'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function IndustriesIndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'consultation' | 'audit'>('consultation');

  const handleOpenConsultation = () => {
    setModalMode('consultation');
    setIsModalOpen(true);
  };

  const handleOpenAuditModal = () => {
    setModalMode('audit');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white pb-16 sm:pb-0">
      <Navbar onOpenModal={handleOpenConsultation} onOpenAuditModal={handleOpenAuditModal} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C88770]" />
              <span>Domain Specific Solutions</span>
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
              Industry-Specific Digital Solutions
            </h1>

            <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
              Every industry has different customer behaviors and digital bottlenecks. Explore how Skovento builds tailored web applications, digital presence, and growth engines for your sector.
            </p>
          </div>

          <IndustriesSection />

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
