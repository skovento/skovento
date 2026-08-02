'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { whatsappLink, telLink } from '@/lib/contact';

export const FloatingContactBtn: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp - primary, real link */}
      <div className="relative flex items-center">
        <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-pulse-ring pointer-events-none" />
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat with us on WhatsApp"
          className="relative group flex items-center gap-2.5 min-h-12 px-4 py-3.5 bg-[#16203D] text-[#FAF8F5] rounded-full shadow-2xl border border-[#25D366]/40 hover:bg-[#128C7E] transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
          <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline-block">
            Chat on WhatsApp
          </span>
        </motion.a>
      </div>

      {/* Call - secondary, real tel: link */}
      <motion.a
        href={telLink()}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Call Skovento"
        className="flex items-center justify-center w-12 h-12 bg-[#FAF8F5] text-[#16203D] rounded-full shadow-xl border border-[#E3DCD3] hover:border-[#8A2B88]/50 hover:text-[#8A2B88] transition-all duration-300"
      >
        <PhoneCall className="w-5 h-5" />
      </motion.a>
    </div>
  );
};
