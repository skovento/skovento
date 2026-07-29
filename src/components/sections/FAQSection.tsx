'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: 'How much does a custom website cost?',
      a: 'Our website investments are tailored to your business scope and growth targets. Small business websites start with accessible packages, while enterprise web applications are custom quoted based on integrations and deliverables. We provide 100% transparent proposals before any work begins.'
    },
    {
      q: 'How long does a website project take to launch?',
      a: 'Most custom website projects are completed and launched within 2 to 4 weeks, depending on content readiness and custom feature requirements.'
    },
    {
      q: 'Do you redesign existing websites?',
      a: 'Yes! We perform complete digital redesigns—overhauling outdated visuals, improving mobile responsiveness, optimizing site speed, and restructuring content for higher conversion rates.'
    },
    {
      q: 'Will my new website rank on Google?',
      a: 'Absolutely. Every Skovento website is engineered from day one with technical SEO best practices, clean semantic markup, fast load times, and mobile optimization.'
    },
    {
      q: 'Do you provide ongoing maintenance and support?',
      a: 'Yes, we offer dedicated post-launch support and monthly growth packages covering security updates, content updates, backups, speed monitoring, and strategy calls.'
    },
    {
      q: 'Can you manage my Google Ads and Meta campaigns?',
      a: 'Yes! Our digital marketing team manages end-to-end PPC campaigns, keyword targeting, ad copywriting, conversion tracking, and ongoing ROI optimization on Google, Facebook, and Instagram.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#F3EFEA] border-y border-[#E3DCD3]">
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
                    {faq.q}
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
                        {faq.a}
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
