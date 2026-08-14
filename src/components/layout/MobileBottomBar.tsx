'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Search, PhoneCall } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

interface MobileBottomBarProps {
  onOpenAuditModal: () => void;
  onOpenConsultationModal: () => void;
}

export function MobileBottomBar({ onOpenAuditModal, onOpenConsultationModal }: MobileBottomBarProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hi Skovento team, I saw your website and would like to discuss a digital solution for my business.'
  )}`;

  return (
    <aside className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#16203D]/95 backdrop-blur-lg border-t border-[#8A2B88]/30 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-extrabold text-white">
        
        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target py-2 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex flex-col items-center justify-center gap-1 transition-all shadow-md"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>WhatsApp</span>
        </a>

        {/* Audit Request CTA */}
        <button
          type="button"
          onClick={onOpenAuditModal}
          className="tap-target py-2 px-1 rounded-xl bg-[#8A2B88] hover:bg-[#8A2B88]/80 text-white flex flex-col items-center justify-center gap-1 transition-all shadow-md"
        >
          <Search className="w-4 h-4 text-[#C88770]" />
          <span>Free Audit</span>
        </button>

        {/* Direct Conversation CTA */}
        <button
          type="button"
          onClick={onOpenConsultationModal}
          className="tap-target py-2 px-1 rounded-xl bg-[#FAF8F5] text-[#16203D] hover:bg-white flex flex-col items-center justify-center gap-1 transition-all shadow-md font-bold"
        >
          <PhoneCall className="w-4 h-4 text-[#8A2B88]" />
          <span>Talk to Us</span>
        </button>

      </div>
    </aside>
  );
}
