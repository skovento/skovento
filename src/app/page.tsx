'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { WhyWeStartedSection } from '@/components/sections/WhyWeStartedSection';
import { MacroProductRevealSection } from '@/components/sections/MacroProductRevealSection';
import { OurSolutionSection } from '@/components/sections/OurSolutionSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { PricingSection } from '@/components/sections/PricingSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { HonestTestimonialsSection } from '@/components/sections/HonestTestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { FloatingContactBtn } from '@/components/ui/FloatingContactBtn';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white">
      {/* Floating Off-White Header */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Page Layout - Chronological Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <HeroSection onOpenModal={handleOpenModal} />

        {/* Section 2: Portfolio & Sample Work (moved up — nobody scrolled to screen 12 for this) */}
        <CaseStudiesSection />

        {/* Section 3: Trusted By */}
        <TrustBar />

        {/* Section 4: The Problem */}
        <ProblemSection />

        {/* Section 5: Why We Started */}
        <WhyWeStartedSection />

        {/* Cinematic Macro Product Reveal (Dark Tech Scroll Reveal) */}
        <MacroProductRevealSection />

        {/* Section 6: Our Solution */}
        <OurSolutionSection />

        {/* Section 7: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 8: Our Process */}
        <ProcessSection />

        {/* Section 9: Services in Detail */}
        <ServicesGrid />

        {/* Section 10: Pricing */}
        <PricingSection onOpenModal={handleOpenModal} />

        {/* Section 11: Industries We Serve */}
        <IndustriesSection />

        {/* Section 12: Testimonials */}
        <HonestTestimonialsSection onOpenModal={handleOpenModal} />

        {/* Section 13: FAQ */}
        <FAQSection />

        {/* Section 14: Free Consultation CTA */}
        <FinalCTASection onOpenModal={handleOpenModal} />
      </main>

      {/* Section 14 & 15: Footer & Global Modals */}
      <Footer />

      {/* Consultation Booking Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Floating Action Call Widget */}
      <FloatingContactBtn />
    </div>
  );
}
