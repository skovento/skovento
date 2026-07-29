'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';

export default function PrivacyPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#16203D]">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <section className="pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-[#16203D] font-sans">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#424965]/70 font-semibold">
          Last Updated: May 2026
        </p>

        <div className="space-y-6 text-sm text-[#424965] leading-relaxed">
          <p>
            At Skovento ("we", "our", or "us"), protecting your private information is our priority. This Privacy Policy applies to the Skovento website and governs data collection and usage.
          </p>

          <h2 className="text-xl font-bold text-[#16203D]">1. Collection of Personal Information</h2>
          <p>
            In order to better provide you with services requested on our Site (such as strategy consultations, project inquiries, and client onboarding), Skovento may collect personally identifiable information, such as your:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>First and Last Name</li>
            <li>E-mail Address</li>
            <li>Phone Number & WhatsApp ID</li>
            <li>Company / Business Name</li>
            <li>Project Specifications & Budget Ranges</li>
          </ul>

          <h2 className="text-xl font-bold text-[#16203D]">2. Use of your Personal Information</h2>
          <p>
            Skovento collects and uses your personal information to operate and deliver the services you have requested. We do not sell, rent, or lease our customer lists to third parties.
          </p>

          <h2 className="text-xl font-bold text-[#16203D]">3. Data Security & Confidentiality</h2>
          <p>
            Skovento secures your personal information from unauthorized access, use, or disclosure using SSL encryption, secure API protocols, and bank-grade data security standards.
          </p>

          <h2 className="text-xl font-bold text-[#16203D]">4. Contact Information</h2>
          <p>
            Skovento welcomes your questions or comments regarding this Statement of Privacy. If you believe that Skovento has not adhered to this Statement, please contact us at: <a href="mailto:hello@skovento.com" className="text-[#8A2B88] font-bold underline">hello@skovento.com</a>.
          </p>
        </div>
      </section>

      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
