'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FinalCTASection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-[#E3DCD3] bg-[#F3EFEA] p-10 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-xs"
        >
          {/* Subtle ambient blur */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-[#4F46E5]/10 via-[#6366F1]/5 to-transparent rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3DCD3] text-xs font-semibold tracking-wider text-[#4F46E5] uppercase">
              Get In Touch
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold text-[#16203D] font-sans tracking-tight leading-tight">
              Have a business idea or digital challenge?
            </h2>

            <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
              Tell us what you need to build, improve or simplify. We&apos;ll discuss the requirements and recommend a practical next step.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                Discuss Your Project
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" icon={<Mail className="w-4 h-4" />}>
                Send an Enquiry
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
