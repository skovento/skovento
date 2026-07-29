'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';

export default function TermsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#16203D]">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <section className="pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-[#16203D] font-sans">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#424965]/70 font-semibold">
          Last Updated: May 2026
        </p>

        <div className="space-y-6 text-sm text-[#424965] leading-relaxed">
          <p>
            Welcome to Skovento. By accessing or using our website and services, you agree to be bound by these Terms and Conditions.
          </p>

          <h2 className="text-xl font-bold text-[#16203D]">1. Services & Scope</h2>
          <p>
            Skovento provides custom web engineering, digital marketing, SEO, PPC management, and brand strategy services. All deliverables, timelines, and milestones are outlined in individual project proposals and client agreements.
          </p>

          <h2 className="text-xl font-bold text-[#16203D]">2. Intellectual Property</h2>
          <p>
            Upon full payment of project invoices, all custom web code, visual designs, assets, and content created specifically for your business become your exclusive property. Skovento retains rights to showcase non-confidential work in our portfolio.
          </p>

          <h2 className="text-xl font-bold text-[#16203D]">3. Client SLA & Warranty</h2>
          <p>
            Every custom website engineered by Skovento includes a 30-day post-launch bug warranty ensuring code execution, mobile responsiveness, and form intake functionality operate cleanly.
          </p>

          <h2 className="text-xl font-bold text-[#16203D]">4. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws without regard to conflict of law principles. Contact <a href="mailto:hello@skovento.com" className="text-[#8A2B88] font-bold underline">hello@skovento.com</a> for legal inquiries.
          </p>
        </div>
      </section>

      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
