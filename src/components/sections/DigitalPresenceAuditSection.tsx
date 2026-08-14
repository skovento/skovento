'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XCircle, CheckCircle2, ArrowRight, Smartphone, 
  Search, MessageSquare, BarChart3, ShieldCheck
} from 'lucide-react';

interface DigitalPresenceAuditSectionProps {
  onOpenAuditModal: () => void;
}

export function DigitalPresenceAuditSection({ onOpenAuditModal }: DigitalPresenceAuditSectionProps) {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E3DCD3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>Digital Presence Audit</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
            See What&apos;s Missing in Your Digital Footprint
          </h2>
          <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
            We don&apos;t start by pushing a web design package. We evaluate where your business currently has digital gaps and build exactly what bridges them.
          </p>

          {/* Toggle Control */}
          <div className="pt-4 flex justify-center">
            <div className="p-1.5 bg-[#F3EFEA] border border-[#E3DCD3] rounded-full inline-flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('before')}
                className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all duration-300 ${
                  activeTab === 'before'
                    ? 'bg-[#16203D] text-[#FAF8F5] shadow-md'
                    : 'text-[#424965] hover:text-[#16203D]'
                }`}
              >
                Fragmented Presence (Before)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('after')}
                className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all duration-300 ${
                  activeTab === 'after'
                    ? 'bg-[#8A2B88] text-[#FAF8F5] shadow-md'
                    : 'text-[#424965] hover:text-[#8A2B88]'
                }`}
              >
                Structured Digital Foundation (After)
              </button>
            </div>
          </div>
        </div>

        {/* Audit Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* BEFORE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              activeTab === 'before'
                ? 'bg-red-950/5 border-red-200 ring-2 ring-red-500/20'
                : 'bg-[#F3EFEA] border-[#E3DCD3] opacity-80'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E3DCD3] pb-4">
                <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Common Business Scenario
                </span>
                <span className="text-xs font-mono text-[#424965]/70">Unstructured</span>
              </div>

              <h3 className="text-2xl font-bold text-[#16203D] font-sans">
                Instagram + WhatsApp + Unverified Listing
              </h3>

              <ul className="space-y-3.5 text-xs text-[#424965]">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>No Central Catalogue:</strong> Customers must DM or message back-and-forth for basic pricing and availability.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Google Search Authority:</strong> Competitors show up first when nearby customers search on Google Maps.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Word of Mouth Drop-Off:</strong> Recommended clients search your business name and find no official site to verify trust.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>No Inquiry Tracking:</strong> Leads are scattered across Instagram messages, personal WhatsApp chats, and paper notes.</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-[#E3DCD3] mt-6 text-xs text-[#424965]/80 italic">
              &quot;We have customers, but new people find it difficult to explore our offerings or trust us online.&quot;
            </div>
          </motion.div>

          {/* AFTER CARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              activeTab === 'after'
                ? 'bg-[#16203D] text-[#FAF8F5] border-[#8A2B88] shadow-2xl ring-2 ring-[#8A2B88]/40'
                : 'bg-[#F3EFEA] border-[#E3DCD3] text-[#16203D] opacity-80'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-extrabold text-[#C88770] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Skovento Digital Solution
                </span>
                <span className="text-xs font-mono text-[#E5C396]">Engineered for Growth</span>
              </div>

              <h3 className="text-2xl font-bold font-sans text-white">
                Structured Web Foundation + Google SEO + Direct CTA
              </h3>

              <ul className="space-y-3.5 text-xs text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C88770] shrink-0 mt-0.5" />
                  <span><strong>Instant 24/7 Showcase:</strong> Products, services, and pricing clearly presented for desktop and mobile visitors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C88770] shrink-0 mt-0.5" />
                  <span><strong>Google Search & Maps Dominance:</strong> Optimized local Schema.org metadata so nearby buyers find you first.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C88770] shrink-0 mt-0.5" />
                  <span><strong>High-Trust Brand Presence:</strong> Clear team credentials, process, reviews, and professional UI build immediate credibility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C88770] shrink-0 mt-0.5" />
                  <span><strong>Direct Lead Conversion:</strong> 1-tap WhatsApp buttons and direct inquiry forms route leads straight to your phone.</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-white/10 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#E5C396] font-semibold">
                Ready to evaluate your business?
              </span>
              <button
                type="button"
                onClick={onOpenAuditModal}
                className="tap-target px-5 py-2.5 rounded-full bg-[#8A2B88] hover:bg-[#8A2B88]/80 text-white text-xs font-extrabold transition-all flex items-center gap-2 shadow-lg"
              >
                Request Free Digital Audit
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
