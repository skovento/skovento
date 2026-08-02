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
import { siteConfig } from '@/lib/site-config';

/**
 * Interactive shell for the homepage.
 *
 * Why this file exists: the page needs client state (the consultation modal),
 * but the testimonials section must be a Server Component so its database query
 * runs on the server and the reviews appear in the initial HTML where crawlers
 * can read them.
 *
 * A Client Component cannot import an async Server Component — but it CAN
 * render one passed in as a prop. So page.tsx stays a Server Component, renders
 * <TestimonialsSection /> there, and hands the result down as `testimonials`.
 */
export function HomeContent({ testimonials }: { testimonials: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white">
      <Navbar onOpenModal={handleOpenModal} />

      <main className="flex-grow">
        <HeroSection onOpenModal={handleOpenModal} />

        {/* Work moved up — nobody scrolled to screen 12 for this */}
        <CaseStudiesSection />

        <TrustBar />
        <ProblemSection />
        <WhyWeStartedSection />
        <MacroProductRevealSection />
        <OurSolutionSection />
        <WhyChooseUs />
        <ProcessSection />
        <ServicesGrid />

        {/* Gated behind siteConfig.publishPricing — currently off. */}
        {siteConfig.publishPricing && <PricingSection onOpenModal={handleOpenModal} />}

        <IndustriesSection />

        {/*
          Real client reviews. Server-rendered above and passed in.
          Renders NOTHING at all until at least one review has been approved —
          see components/sections/TestimonialsSection.tsx.
        */}
        {testimonials}

        {/*
          The founding-client offer. This is not a testimonials section — it's
          an honest statement that we're new plus a concrete offer, so it stays
          visible whether or not any reviews exist yet.
        */}
        <HonestTestimonialsSection onOpenModal={handleOpenModal} />

        <FAQSection />
        <FinalCTASection onOpenModal={handleOpenModal} />
      </main>

      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <FloatingContactBtn />
    </div>
  );
}
