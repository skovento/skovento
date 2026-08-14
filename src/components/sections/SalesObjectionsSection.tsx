'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SalesObjectionsSectionProps {
  onOpenConsultationModal?: () => void;
  onOpenConsultation?: () => void;
}

export function SalesObjectionsSection({
  onOpenConsultationModal,
  onOpenConsultation,
}: SalesObjectionsSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const objections = [
    {
      question: '"I already have Instagram. Why do I need a website?"',
      answer:
        'Instagram is great for social discovery, but it is rented land. Algorithm changes can hide your posts overnight. A website serves as your permanent digital home — giving customers a clean product catalogue, size charts, location context, and Google Search rankings that run 24/7.',
    },
    {
      question: '"My business already gets customers through referrals. Why bother?"',
      answer:
        'That means you have a great service! However, when someone recommends your business to a friend, that friend will search your business name on Google before calling. A clean web presence confirms trust and prevents recommended clients from dropping off to competitors.',
    },
    {
      question: '"I don\'t know what technical features my business actually needs."',
      answer:
        'That is exactly why we start with a simple conversation and a free digital presence audit. You don\'t need to know technical terms — tell us your business goals, and we will recommend the exact digital solution.',
    },
    {
      question: '"I don\'t have a massive budget for custom software."',
      answer:
        'We don\'t lock you into expensive enterprise packages. We build modular, right-sized foundations starting with what matters most right now (e.g. a fast 5-page business site or digital catalog), and scale up as your revenue grows.',
    },
    {
      question: '"What if I need updates after the website launches?"',
      answer:
        'You own your website and credentials outright. We provide intuitive management options and offer flexible, non-binding care plans for ongoing hosting, security, and content updates whenever you need us.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA] border-t border-[#E3DCD3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Honest Answers to Real Concerns</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
            What Are You Worried About?
          </h2>
          <p className="text-base sm:text-lg text-[#424965]">
            Clear, honest answers to common business questions before starting a project.
          </p>
        </div>

        <div className="space-y-4">
          {objections.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 font-sans text-base sm:text-lg font-bold text-[#16203D] flex items-center justify-between gap-4 hover:text-[#8A2B88] transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8A2B88] shrink-0 transition-transform duration-300 ${
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
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-[#424965] leading-relaxed border-t border-[#E3DCD3]/50 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#8A2B88] shrink-0 mt-0.5" />
                        <div>{item.answer}</div>
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
