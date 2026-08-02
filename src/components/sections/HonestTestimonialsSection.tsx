'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, CheckCircle2 } from 'lucide-react';

interface HonestTestimonialsSectionProps {
  onOpenModal?: () => void;
}

export const HonestTestimonialsSection: React.FC<HonestTestimonialsSectionProps> = ({ onOpenModal }) => {
  const commitments = [
    "3 founding-client slots at 30% off, in exchange for a real, filmed case study",
    "Full refund if we miss the agreed delivery date",
    "Performance guaranteed in writing — Lighthouse 90+ or it's free",
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#16203D] text-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">

        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C396]">
            Client Trust & Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-sans">
            We&apos;re new. That&apos;s the whole offer.
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Skovento started in July 2026. We have no client logos or star ratings to show you yet —
            we&apos;d rather tell you that than invent some. Here&apos;s what we do instead.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
        >
          {commitments.map((c, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-[#E5C396] shrink-0" />
              <p className="text-sm text-white/85 leading-relaxed">{c}</p>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 min-h-12 px-6 py-3 bg-[#8A2B88] hover:bg-[#7a2578] text-white text-sm font-bold rounded-full transition-colors"
          >
            <Quote className="w-4 h-4" />
            Claim a founding slot
          </button>
          <span className="text-xs text-[#E5C396] font-semibold uppercase tracking-wider">
            2 of 3 slots remaining
          </span>
        </div>

      </div>
    </section>
  );
};
