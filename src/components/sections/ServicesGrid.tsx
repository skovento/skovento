'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, ShoppingBag, Cpu, Palette, ShieldCheck, 
  Search, Target, Share2, FileText, Mail, Sparkles, TrendingUp,
  ArrowRight, CheckCircle2, ChevronLeft, ChevronRight
} from 'lucide-react';
import { servicesData } from '@/data/services';
import { Spatial3DCard } from '../ui/Spatial3DCard';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-7 h-7 text-[#8A2B88]" />,
  ShoppingBag: <ShoppingBag className="w-7 h-7 text-[#C88770]" />,
  Cpu: <Cpu className="w-7 h-7 text-[#1E2E6B]" />,
  Palette: <Palette className="w-7 h-7 text-[#8A2B88]" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-[#1E2E6B]" />,
  Search: <Search className="w-7 h-7 text-[#C88770]" />,
  Target: <Target className="w-7 h-7 text-[#8A2B88]" />,
  Share2: <Share2 className="w-7 h-7 text-[#1E2E6B]" />,
  FileText: <FileText className="w-7 h-7 text-[#C88770]" />,
  Mail: <Mail className="w-7 h-7 text-[#8A2B88]" />,
  Sparkles: <Sparkles className="w-7 h-7 text-[#C88770]" />,
  TrendingUp: <TrendingUp className="w-7 h-7 text-[#1E2E6B]" />
};

export const ServicesGrid: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'development' | 'marketing'>('all');

  const filteredServices = activeTab === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeTab);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinSection = sectionRef.current;
    const track = trackRef.current;
    if (!pinSection || !track) return;

    const ctx = gsap.context(() => {
      // Calculate exact distance required to scroll through all cards to the very end
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 60);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: pinSection,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 60, 1500)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, pinSection);

    return () => ctx.revert();
  }, [filteredServices]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#FAF8F5]/95 backdrop-blur-md overflow-hidden flex flex-col justify-between py-6 sm:py-10"
    >
      {/* 4K Ambient Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#8A2B88]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#C88770]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFEA] border border-[#E3DCD3] text-xs font-extrabold uppercase tracking-widest text-[#8A2B88]">
              <Sparkles className="w-3.5 h-3.5 text-[#C88770]" />
              <span>Full-Screen 3D Pinned Gallery</span>
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
              Everything your brand needs to build, launch, and grow
            </h2>
            <p className="text-xs sm:text-sm text-[#424965]">
              Scroll down vertically — cards scroll completely from left to right before continuing to the next section.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="p-1 bg-[#F3EFEA] border border-[#E3DCD3] rounded-full inline-flex self-start md:self-auto">
            {[
              { id: 'all', label: 'All 12 Services' },
              { id: 'development', label: 'Development' },
              { id: 'marketing', label: 'Marketing' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#16203D] text-[#FAF8F5] shadow-md'
                    : 'text-[#424965] hover:text-[#16203D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D 4K Horizontal Pinned Track */}
      <div className="relative w-full overflow-hidden my-auto py-4 z-10">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 sm:px-12 items-center w-max will-change-transform"
        >
          <AnimatePresence>
            {filteredServices.map((service, idx) => (
              <div
                key={service.id}
                className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[410px] h-[440px] sm:h-[480px]"
              >
                <Spatial3DCard depth={32} maxTilt={16} glowColor="rgba(138, 43, 136, 0.25)" className="h-full">
                  <div className="group relative p-6 sm:p-8 bg-gradient-to-br from-[#FAF8F5] via-[#F3EFEA] to-[#FAF8F5] border border-[#E3DCD3] hover:border-[#8A2B88]/70 rounded-3xl transition-all duration-300 shadow-2xl flex flex-col justify-between h-full backdrop-blur-xl">
                    
                    {/* 4K Glass Specular Glow */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#8A2B88]/20 via-[#C88770]/10 to-transparent rounded-tr-3xl pointer-events-none" />

                    <div>
                      {/* Top Header & Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 bg-white border border-[#E3DCD3] rounded-2xl shadow-sm group-hover:scale-110 group-hover:border-[#8A2B88] transition-all">
                          {iconMap[service.icon]}
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 bg-white/90 border border-[#E3DCD3] text-[#8A2B88] rounded-full shadow-sm">
                          {service.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#16203D] mb-2 group-hover:text-[#8A2B88] transition-colors font-sans leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#424965] leading-relaxed mb-5 line-clamp-3">
                        {service.shortDescription}
                      </p>

                      {/* Key Deliverables Bullet Preview */}
                      <div className="space-y-2 mb-5">
                        {service.deliverables.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs font-medium text-[#424965]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C88770] flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Link CTA */}
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E3DCD3] text-xs font-extrabold text-[#16203D] group-hover:text-[#8A2B88] transition-colors"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#8A2B88]" />
                    </Link>
                  </div>
                </Spatial3DCard>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation Link */}
      <div className="text-center relative z-10 pb-2">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#16203D] hover:text-[#8A2B88] transition-colors bg-[#F3EFEA] border border-[#E3DCD3] px-5 py-2.5 rounded-full hover:shadow-md"
        >
          <span>See All 12 Services & Detailed Packages</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
