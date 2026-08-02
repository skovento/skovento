'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Utensils, GraduationCap, Building, Landmark, Scale, Plane, Sparkles, Scissors, Factory, Rocket, Store } from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const industries = [
    { title: 'Healthcare & Medical', icon: <Stethoscope className="w-5 h-5 text-[#8A2B88]" /> },
    { title: 'Restaurants & Hospitality', icon: <Utensils className="w-5 h-5 text-[#C88770]" /> },
    { title: 'Education & E-Learning', icon: <GraduationCap className="w-5 h-5 text-[#1E2E6B]" /> },
    { title: 'Real Estate & Property', icon: <Building className="w-5 h-5 text-[#8A2B88]" /> },
    { title: 'Finance & FinTech', icon: <Landmark className="w-5 h-5 text-[#C88770]" /> },
    { title: 'Law Firms & Legal', icon: <Scale className="w-5 h-5 text-[#1E2E6B]" /> },
    { title: 'Travel & Tourism', icon: <Plane className="w-5 h-5 text-[#8A2B88]" /> },
    { title: 'Fashion & Apparel', icon: <Scissors className="w-5 h-5 text-[#C88770]" /> },
    { title: 'Beauty & Wellness', icon: <Sparkles className="w-5 h-5 text-[#1E2E6B]" /> },
    { title: 'Manufacturing & B2B', icon: <Factory className="w-5 h-5 text-[#8A2B88]" /> },
    { title: 'Tech Startups & SaaS', icon: <Rocket className="w-5 h-5 text-[#C88770]" /> },
    { title: 'Small Businesses & Local', icon: <Store className="w-5 h-5 text-[#1E2E6B]" /> }
  ];

  return (
    <section className="py-14 sm:py-24 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Tailored Industry Solutions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Industries We Serve
          </h2>
          <p className="text-base text-[#424965]">
            Deep domain expertise tailored to the unique customer acquisition needs of your industry.
          </p>
        </div>

        {/* 12 Industries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl flex items-center gap-3.5 hover:border-[#8A2B88]/40 transition-colors shadow-sm"
            >
              <div className="p-2.5 bg-[#F3EFEA] rounded-xl flex-shrink-0">
                {ind.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#16203D]">
                {ind.title}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
