'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { homepageFaqs } from '@/data/faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, buildGraph } from '@/lib/schema';

export const FAQSection: React.FC = () => {
  // Single source of truth, shared with the FAQPage JSON-LD below. Google
  // requires the visible text and the markup to match exactly.
  const faqs = homepageFaqs;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14 sm:py-24 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      {/*
        FAQPage structured data. This is the single highest-value schema type
        for AI search: pages carrying it are roughly 3.2x more likely to appear
        in Google AI Overviews. Rendered from `homepageFaqs`, the same array the
        accordion below renders, so the markup can never drift from the visible
        text — which is a Google requirement, not a nicety.

        This component is a Client Component, but Next.js still renders it to
        HTML on the server for the initial response, so the block is present in
        the raw HTML that non-JS crawlers read.
      */}
      <JsonLd data={buildGraph(faqSchema(faqs))} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#424965]">
            Everything you need to know about partnering with Skovento.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#16203D] hover:text-[#8A2B88] transition-colors"
                >
                  <span className="text-base sm:text-lg font-sans">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8A2B88] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-[#424965] leading-relaxed border-t border-[#E3DCD3]/60 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
