'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#424965]">
      {/* Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection onOpenModal={handleOpenModal} />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. Services Overview */}
        <ServicesGrid />

        {/* 4. Why Choose Skovento */}
        <WhyChooseUs />

        {/* 5. Our Process */}
        <ProcessSection />

        {/* 6. Featured Work / Case Studies */}
        <CaseStudiesSection />

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. Impact Stats */}
        <StatsSection />

        {/* 9. Final CTA */}
        <FinalCTASection onOpenModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call Widget (Inspired by Manhar Creatives) */}
      <FloatingContactBtn onOpenModal={handleOpenModal} />

      {/* Interactive Consultation Booking Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}
