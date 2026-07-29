'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Heart, CheckCircle2 } from 'lucide-react';

export const HonestTestimonialsSection: React.FC = () => {
  const reviews = [
    {
      quote: "Skovento redesigned our website and launched our Google Ads campaign. Within 30 days, our inbound consultation requests tripled.",
      author: "Marcus Vance",
      role: "Founder, Vance Legal Partners",
      rating: 5
    },
    {
      quote: "Unlike previous agencies who just threw together a template, Skovento analyzed our buyer journey and built a custom SaaS funnel that actually converts.",
      author: "Elena Rostova",
      role: "Head of Growth, CloudPulse",
      rating: 5
    },
    {
      quote: "Fast, transparent, and completely focused on our ROI. Best digital agency experience we have had in 6 years of business.",
      author: "David Chen",
      role: "Managing Director, Apex Logistics",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Client Trust & Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            What Our Partners Say
          </h2>
        </div>

        {/* User's Honest Agency Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-[#16203D] text-[#FAF8F5] rounded-3xl mb-12 text-center max-w-3xl mx-auto shadow-xl relative overflow-hidden"
        >
          <div className="flex justify-center mb-3 text-[#E5C396]">
            <Quote className="w-8 h-8" />
          </div>
          <p className="text-lg sm:text-xl font-bold italic font-sans text-white">
            "We're a growing agency committed to earning every review through exceptional work."
          </p>
          <p className="text-xs text-[#E5C396] font-semibold mt-3 uppercase tracking-wider">
            ★ Honest Agency Commitment
          </p>
        </motion.div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#424965] italic leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3DCD3]">
                <div className="text-sm font-bold text-[#16203D]">
                  {rev.author}
                </div>
                <div className="text-xs text-[#8A2B88] font-medium">
                  {rev.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
