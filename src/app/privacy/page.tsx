import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data protection terms for Skovento.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#16203D] selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 border-b border-[#E3DCD3] pb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#424965]/70 font-semibold">
              Last Updated: October 2026
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#424965] leading-relaxed">
            <p>
              At Skovento (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), protecting your private information is our priority. This Privacy Policy applies to the Skovento website and governs data collection and usage.
            </p>

            <h2 className="text-xl font-bold text-[#16203D]">1. Collection of Personal Information</h2>
            <p>
              In order to provide services and respond to inquiries (such as project discovery requests, consultation inquiries, and client onboarding), Skovento may collect personally identifiable information submitted via our forms, such as:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>First and Last Name</li>
              <li>Email Address</li>
              <li>Phone Number or WhatsApp Number</li>
              <li>Company / Business Name</li>
              <li>Project Description and Requirements</li>
            </ul>

            <h2 className="text-xl font-bold text-[#16203D]">2. Use of Personal Information</h2>
            <p>
              Skovento collects and uses your personal information to communicate with you regarding your project inquiry, deliver agreed digital services, and provide technical support. We do not sell, rent, or lease our inquiry lists or client data to third parties.
            </p>

            <h2 className="text-xl font-bold text-[#16203D]">3. Data Security &amp; Confidentiality</h2>
            <p>
              We secure your personal information through SSL encryption, secure API protocols, and restricted access. We treat all client business specifications and proprietary workflow details in strict confidence.
            </p>

            <h2 className="text-xl font-bold text-[#16203D]">4. Contact Information</h2>
            <p>
              If you have questions or comments regarding this Privacy Policy, please reach out to our studio at:{' '}
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
