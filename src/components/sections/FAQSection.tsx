'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { homepageFaqs } from '@/data/faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, buildGraph } from '@/lib/schema';

export const FAQSection: React.FC = () => {
  const faqs = homepageFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-32 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      {/*
        FAQPage structured data — same source array as the accordion below,
        so markup can never drift from the visible text.
      */}
      <JsonLd data={buildGraph(faqSchema(faqs))} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — two-column editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-5">
            <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-[#8A2B88] mb-3">
              Clear Answers
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#16203D] leading-[1.05] tracking-tight font-sans text-balance">
              Frequently asked questions.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
              Everything you need to know about partnering with Skovento — answered honestly.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-[#16203D] shadow-lg'
                    : 'bg-[#FAF8F5] border border-[#E3DCD3] hover:border-[#8A2B88]/30'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-7 py-5 text-left flex items-start justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-bold leading-snug font-sans transition-colors ${
                      isOpen ? 'text-white' : 'text-[#16203D]'
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#8A2B88] text-white'
                        : 'bg-[#F3EFEA] border border-[#E3DCD3] text-[#8A2B88]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-6 text-sm text-white/70 leading-relaxed border-t border-white/10 pt-4">
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
