'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Clock, Star } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    { icon: <Building2 className="w-5 h-5 text-[#8A2B88]" />, value: '50+', label: 'Projects Delivered' },
    { icon: <Award className="w-5 h-5 text-[#C88770]" />, value: '10+', label: 'Industries Served' },
    { icon: <Clock className="w-5 h-5 text-[#1E2E6B]" />, value: '24/7', label: 'Support Availability' },
    { icon: <Star className="w-5 h-5 text-[#C88770]" />, value: '4.9★', label: 'Average Client Rating' }
  ];

  return (
    <section className="py-12 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trusted By Copy specified by user */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold tracking-wide uppercase text-[#8A2B88]">
            Helping ambitious startups and growing businesses build their digital presence.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E3DCD3] shadow-sm flex flex-col items-center justify-center group hover:border-[#8A2B88]/40 transition-colors"
            >
              <div className="p-2.5 rounded-full bg-[#F3EFEA] mb-2.5 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#16203D] font-sans">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-[#424965] mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
