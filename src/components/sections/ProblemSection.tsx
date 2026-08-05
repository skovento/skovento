'use client';

import React from 'react';
import { motion } from 'framer-motion';

const challenges = [
  {
    number: '01',
    text: 'You have a website but receive very few enquiries.',
  },
  {
    number: '02',
    text: 'You rely only on referrals for new customers.',
  },
  {
    number: '03',
    text: 'Your competitors appear first on Google.',
  },
  {
    number: '04',
    text: "Your business isn't visible online.",
  },
  {
    number: '05',
    text: "You don't know where to start with digital marketing.",
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 bg-[#FAF8F5] relative overflow-hidden">
      {/* Faint background rule */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, #E3DCD3 30%, #E3DCD3 70%, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Two-column editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-5 space-y-3">
            <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-[#8A2B88]">
              Critical Business Diagnosis
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#16203D] leading-[1.05] font-sans tracking-tight text-balance">
              Is your business facing these challenges?
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-base sm:text-lg text-[#424965] leading-relaxed max-w-xl">
              Most businesses don&apos;t have a marketing problem — they have a{' '}
              <strong className="font-semibold text-[#16203D]">
                digital foundation problem.
              </strong>{' '}
              Recognise any of these?
            </p>
          </div>
        </div>

        {/* Challenges — editorial numbered list */}
        <div className="space-y-px">
          {challenges.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className="group flex items-center gap-6 sm:gap-10 py-6 sm:py-7 border-b border-[#E3DCD3] hover:bg-[#F3EFEA]/60 px-4 -mx-4 rounded-xl transition-colors duration-200 cursor-default"
            >
              {/* Number */}
              <span
                className="text-[11px] font-mono font-extrabold text-[#C88770] w-8 shrink-0 tabular-nums group-hover:text-[#8A2B88] transition-colors"
                aria-hidden
              >
                {item.number}
              </span>

              {/* Text */}
              <p className="text-lg sm:text-xl font-semibold text-[#16203D] leading-snug">
                {item.text}
              </p>

              {/* Right arrow — reveals on hover */}
              <div className="ml-auto shrink-0 w-8 h-8 rounded-full border border-[#E3DCD3] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:border-[#8A2B88] group-hover:bg-[#8A2B88]/5 translate-x-2 group-hover:translate-x-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="#8A2B88" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 sm:p-10 bg-[#16203D] rounded-3xl"
        >
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#8A2B88] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#FAF8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" stroke="#FAF8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="#C88770" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-white leading-snug font-sans">
              Skovento fixes these root issues with a{' '}
              <span className="text-[#C88770]">
                unified dev + growth strategy.
              </span>
            </p>
            <p className="text-sm text-white/60 mt-1.5">
              Engineering and marketing under one roof — so nothing falls through the cracks.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
