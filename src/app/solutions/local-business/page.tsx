'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/site-config';
import { 
  Store, CheckCircle2, MessageSquare, PhoneCall, ArrowRight, 
  MapPin, Smartphone, ShieldCheck, Sparkles, XCircle 
} from 'lucide-react';

export default function LocalBusinessSolutionPage() {
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

  const whatsappPitchUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hi Skovento, I run a local business and want to know how you can help me get more local customer enquiries.'
  )}`;

  const bottlenecks = [
    { title: 'Sending Catalogues as Heavy PDFs on WhatsApp', text: 'Customers download slow files, get confused, and leave without placing an enquiry.' },
    { title: 'Incomplete or Unverified Google Maps Pin', text: 'Local buyers search for your service nearby but cannot find your address or opening hours.' },
    { title: 'Relying Only on Instagram DMs', text: 'You spend hours manually answering repetitive questions about price lists and availability.' },
    { title: 'Static Website That Doesn\'t Convert', text: 'You paid for a site years ago, but it brings 0 phone calls or store visits.' },
  ];

  const solutions = [
    { title: 'Fast Mobile Digital Presence', text: 'A clean, 1-second loading web experience showing your services, collections, and contact details.' },
    { title: '1-Tap WhatsApp & Call Buttons', text: 'Allows interested buyers to message or call you instantly with zero friction.' },
    { title: 'Google Local Search & Maps Setup', text: 'Ensures nearby customers searching on Google Maps locate your business easily.' },
    { title: 'Interactive Product & Service Showcase', text: 'No heavy PDFs. Beautiful mobile grid displaying your best offerings clearly.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-[#8A2B88] selection:text-white pb-16 sm:pb-0">
      <Navbar onOpenModal={handleOpenConsultation} onOpenAuditModal={handleOpenAuditModal} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
              <Store className="w-4 h-4 text-[#C88770]" />
              <span>Dedicated Solution for Local Businesses</span>
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
              Turn Local Searches Into Paying Customers
            </h1>

            <p className="text-base sm:text-lg text-[#424965] max-w-2xl mx-auto leading-relaxed">
              When customers search for your business, shop, or services, can they easily find your details and contact you in 1 tap? Here is how Skovento builds a practical digital presence for local business owners.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={whatsappPitchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>

              <Button variant="outline" onClick={handleOpenAuditModal}>
                Request Free Digital Audit
              </Button>
            </div>
          </div>

          {/* Common Bottlenecks */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16203D]">
                Is Your Business Losing Local Customers to These Bottlenecks?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bottlenecks.map((item, idx) => (
                <div key={idx} className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#424965] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Skovento Solution */}
          <div className="p-8 sm:p-12 bg-[#16203D] text-white rounded-3xl space-y-8 shadow-2xl">
            <div className="space-y-3 text-center sm:text-left">
              <span className="text-xs font-bold text-[#E5C396] uppercase tracking-wider">
                How Skovento Fixes This
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-sans">
                A Complete Digital Presence Package for Local Businesses
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {solutions.map((item, idx) => (
                <div key={idx} className="p-5 bg-white/10 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#E5C396] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-semibold text-white/80">
                Ready to upgrade your local business presence?
              </span>
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="px-6 py-3 rounded-xl bg-[#8A2B88] hover:bg-[#8A2B88]/80 text-white font-extrabold text-xs transition-all shadow-md"
              >
                Talk to Our 3-Member Team
              </button>
            </div>
          </div>

          {/* Honest Transparent Commitment */}
          <div className="p-8 bg-[#F3EFEA] border border-[#8A2B88]/30 rounded-3xl text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#8A2B88] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#C88770]" />
              <span>100% Transparent Promise</span>
            </div>
            <p className="text-sm font-semibold text-[#16203D] max-w-xl mx-auto leading-relaxed">
              We won&apos;t try to sell you a complex ₹1,00,000 app if a simple 3-page digital presence site is what your business needs. You talk directly with the people building your site.
            </p>
          </div>

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
