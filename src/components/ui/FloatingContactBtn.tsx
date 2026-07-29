'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Sparkles } from 'lucide-react';

interface FloatingContactBtnProps {
  onOpenModal: () => void;
}

export const FloatingContactBtn: React.FC<FloatingContactBtnProps> = ({ onOpenModal }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Pulsing ring aura */}
      <div className="absolute inset-0 rounded-full bg-[#C88770]/40 animate-pulse-ring pointer-events-none" />

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenModal}
        aria-label="Book Free Consultation"
        className="relative group flex items-center gap-2.5 px-4 py-3.5 bg-[#16203D] text-[#FAF8F5] rounded-full shadow-2xl border border-[#C88770]/30 hover:bg-[#8A2B88] transition-all duration-300"
      >
        <div className="relative flex items-center justify-center">
          <PhoneCall className="w-5 h-5 text-[#C88770] group-hover:text-white transition-colors" />
          <Sparkles className="w-3 h-3 text-[#E5C396] absolute -top-1 -right-1 animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline-block">
          Free Strategy Call
        </span>
      </motion.button>
    </div>
  );
};
