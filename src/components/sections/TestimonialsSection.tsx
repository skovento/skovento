'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '@/data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Verified Client Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            What our clients say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl shadow-xl glass-card-elevated">
            <Quote className="w-12 h-12 text-[#8A2B88]/20 absolute top-6 right-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#C88770]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl sm:text-2xl font-semibold text-[#16203D] leading-relaxed italic font-sans">
                  "{current.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-[#E3DCD3]">
                  <div className="w-12 h-12 rounded-full bg-[#16203D] text-[#FAF8F5] font-extrabold text-sm flex items-center justify-center border border-[#8A2B88]">
                    {current.avatarInitials}
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#16203D]">
                      {current.author}
                    </div>
                    <div className="text-xs text-[#424965]">
                      {current.role}, <span className="font-semibold text-[#8A2B88]">{current.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 sm:absolute sm:bottom-8 sm:right-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-[#FAF8F5] border border-[#E3DCD3] text-[#16203D] hover:bg-[#8A2B88] hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-[#FAF8F5] border border-[#E3DCD3] text-[#16203D] hover:bg-[#8A2B88] hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
