'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { homepageFaqs } from '@/data/faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema, buildGraph } from '@/lib/schema';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FAQSection() {
  const faqs = homepageFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5]">
      {/* FAQPage JSON-LD for Search Engines */}
      <JsonLd data={buildGraph(faqSchema(faqs))} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <SectionHeading
          eyebrow="Answers & Questions"
          title="Frequently Asked Questions"
          subtitle="Honest, straightforward information about our process, capabilities, and project expectations."
          align="center"
        />

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E3DCD3] rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-[#16203D] hover:text-[#4F46E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                >
                  <span className="text-base sm:text-lg font-sans pr-2">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#4F46E5] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm text-[#424965] leading-relaxed border-t border-[#E3DCD3]/70 pt-4">
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
}
