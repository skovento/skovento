'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesOverviewSection } from '@/components/sections/ServicesOverviewSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';

export function HomeContent() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Services Overview */}
        <ServicesOverviewSection />

        {/* Section 3: Selected Demonstrations */}
        <CaseStudiesSection />

        {/* Section 4: Why Skovento */}
        <WhyChooseUs />

        {/* Section 5: Process Overview */}
        <ProcessSection />

        {/* Section 6: Technologies */}
        <TechnologiesSection />

        {/* Section 7: FAQ */}
        <FAQSection />

        {/* Section 8: Final CTA */}
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
