import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for Skovento digital solutions studio.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#16203D] selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 border-b border-[#E3DCD3] pb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-[#424965]/70 font-semibold">
              Last Updated: October 2026
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#424965] leading-relaxed">
            <p>
              Welcome to Skovento. By accessing or using our website and services, you agree to be bound by these Terms and Conditions.
            </p>

            <h2 className="text-xl font-bold text-[#16203D]">1. Services &amp; Project Scope</h2>
            <p>
              Skovento provides bespoke business website development, e-commerce and booking solutions, custom web application engineering, and technical SEO foundations. All project deliverables, timelines, milestones, and investment schedules are documented in individual written proposals agreed upon before work commences.
            </p>

            <h2 className="text-xl font-bold text-[#16203D]">2. Intellectual Property &amp; Ownership</h2>
            <p>
              Upon receipt of full payment for agreed milestones, all custom web code, interface assets, and content developed specifically for your business become your exclusive property. Skovento retains the right to display non-confidential project architecture as concept demonstrations in our portfolio.
            </p>

            <h2 className="text-xl font-bold text-[#16203D]">3. Warranty &amp; Post-Launch Support</h2>
            <p>
              Every custom website or web application delivered by Skovento includes an agreed post-launch stabilization window to verify that forms, responsive layouts, and agreed features function as specified. Ongoing maintenance agreements are available for continued support.
            </p>

            <h2 className="text-xl font-bold text-[#16203D]">4. Governing Law &amp; Inquiries</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws. For questions regarding these terms, please contact us at:{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[#4F46E5] font-semibold underline">
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
