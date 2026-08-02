'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, ShoppingBag, Cpu, Palette, ShieldCheck, 
  Search, Target, Share2, FileText, Mail, Sparkles, TrendingUp,
  ArrowRight, CheckCircle2 
} from 'lucide-react';
import { servicesData, Service } from '@/data/services';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-[#1E2E6B]" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-[#8A2B88]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#C88770]" />,
  Palette: <Palette className="w-6 h-6 text-[#8A2B88]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#1E2E6B]" />,
  Search: <Search className="w-6 h-6 text-[#C88770]" />,
  Target: <Target className="w-6 h-6 text-[#8A2B88]" />,
  Share2: <Share2 className="w-6 h-6 text-[#1E2E6B]" />,
  FileText: <FileText className="w-6 h-6 text-[#C88770]" />,
  Mail: <Mail className="w-6 h-6 text-[#8A2B88]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#C88770]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#1E2E6B]" />
};

export const ServicesGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'development' | 'marketing'>('all');

  const filteredServices = activeTab === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeTab);

  return (
    <section className="py-14 sm:py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Comprehensive Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            Everything your brand needs to build, launch, and grow
          </h2>
          <p className="text-base sm:text-lg text-[#424965]">
            From your first line of code to your next thousand customers — we handle it all.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <div className="p-1.5 bg-[#F3EFEA] border border-[#E3DCD3] rounded-full inline-flex">
              {[
                { id: 'all', label: 'All 12 Services' },
                { id: 'development', label: 'Development Services' },
                { id: 'marketing', label: 'Marketing Services' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 relative ${
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

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative p-8 bg-[#F3EFEA] border border-[#E3DCD3] hover:border-[#8A2B88]/50 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl group-hover:scale-110 transition-transform">
                      {iconMap[service.icon]}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 bg-[#FAF8F5] border border-[#E3DCD3] text-[#8A2B88] rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-[#16203D] mb-3 group-hover:text-[#8A2B88] transition-colors font-sans">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#424965] leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Key Deliverables Bullet Preview */}
                  <div className="space-y-2 mb-8">
                    {service.deliverables.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#424965]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C88770] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Link CTA */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E3DCD3] text-xs font-bold text-[#16203D] group-hover:text-[#8A2B88] transition-colors"
                >
                  <span>Explore {service.title}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Section Footer Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#16203D] hover:text-[#8A2B88] transition-colors"
          >
            <span>See All 12 Services & Detailed Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
