'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { HeroSection } from '@/components/sections/HeroSection';
import { DigitalPresenceAuditSection } from '@/components/sections/DigitalPresenceAuditSection';
import { InteractiveNeedTool } from '@/components/sections/InteractiveNeedTool';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { HonestAdviseSection } from '@/components/sections/HonestAdviseSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { SalesObjectionsSection } from '@/components/sections/SalesObjectionsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';

export function HomeContent({ testimonials }: { testimonials?: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'consultation' | 'audit'>('consultation');

  const handleOpenConsultation = () => {
    setModalMode('consultation');
    setIsModalOpen(true);
  };

  const handleOpenAudit = () => {
    setModalMode('audit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white pb-16 sm:pb-0">
      <Navbar onOpenModal={handleOpenConsultation} onOpenAuditModal={handleOpenAudit} />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection onOpenModal={handleOpenConsultation} />

        {/* 2. Interactive Digital Presence Audit ("See What's Missing") */}
        <DigitalPresenceAuditSection onOpenAuditModal={handleOpenAudit} />

        {/* 3. Interactive Need Selector ("What are you trying to improve?") */}
        <InteractiveNeedTool onOpenConsultationModal={handleOpenConsultation} />

        {/* 4. Problem Diagnosis ("Your business is already online. But is it working for you?") */}
        <ProblemSection />

        {/* 5. Services Grid */}
        <ServicesGrid />

        {/* 6. Industry Showcase ("Built Around Your Business") */}
        <IndustriesSection />

        {/* 7. Selected Work & Concepts */}
        <CaseStudiesSection />

        {/* 8. Team Showcase ("Three disciplines. One digital team.") */}
        <TeamSection onOpenModal={handleOpenConsultation} />

        {/* 9. Trust Building ("Maybe you don't need a website... And that's okay.") */}
        <HonestAdviseSection onOpenModal={handleOpenConsultation} />

        {/* 10. Why Choose Us */}
        <WhyChooseUs />

        {/* 11. 5-Step Process */}
        <ProcessSection />

        {/* 12. Sales Objections Q&A ("What are you worried about?") */}
        <SalesObjectionsSection onOpenConsultationModal={handleOpenConsultation} />

        {/* 13. Testimonials (Renders if approved testimonials exist) */}
        {testimonials}

        {/* 14. FAQs */}
        <FAQSection />

        {/* 15. Final CTA */}
        <FinalCTASection onOpenModal={handleOpenConsultation} />
      </main>

      <Footer />

      {/* Mobile Sticky Bottom Bar */}
      <MobileBottomBar
        onOpenAuditModal={handleOpenAudit}
        onOpenConsultationModal={handleOpenConsultation}
      />

      {/* Shared Consultation & Audit Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialMode={modalMode}
      />

      <FloatingContactBtn />
    </div>
  );
}
