'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface HonestAdviseSectionProps {
  onOpenConsultation?: () => void;
  onOpenModal?: () => void;
}

export function HonestAdviseSection({
  onOpenConsultation,
  onOpenModal,
}: HonestAdviseSectionProps) {
  const handleOpen = onOpenModal || onOpenConsultation || (() => {});
  return (
    <section className="py-20 sm:py-28 bg-[#16203D] text-[#FAF8F5] relative overflow-hidden">
      {/* Background Subtle Mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 900px 600px at 10% 10%, rgba(138,43,136,0.5), transparent 60%), radial-gradient(ellipse 700px 500px at 90% 90%, rgba(200,135,112,0.4), transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C396]/10 text-xs font-extrabold text-[#E5C396] uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4" />
          <span>Our Honest Guarantee</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight max-w-3xl mx-auto leading-tight">
          Maybe You Don&apos;t Need a Website. <span className="text-[#C88770]">And That&apos;s Okay.</span>
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          We don&apos;t believe every business requires a massive multi-page website immediately. Sometimes an optimized Google Business Profile, a direct WhatsApp catalog, a single landing page, or simple local SEO will generate 5x higher ROI for your current stage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left max-w-4xl mx-auto">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#C88770] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Right-Sized Solutions</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              We recommend only what drives immediate value for your business budget and target audience.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#C88770] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Pushy Upsells</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              No locked contracts, hidden maintenance fees, or selling complex software you will never use.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#C88770] font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Developer Access</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              You speak directly with the people building and marketing your digital presence.
            </p>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="button"
            onClick={handleOpen}
            className="tap-target inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#8A2B88] hover:bg-[#8A2B88]/80 text-white font-sans text-sm font-extrabold shadow-2xl transition-all"
          >
            Get an Honest Digital Recommendation
          </button>
        </div>

      </div>
    </section>
  );
}
