'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, RefreshCw, TrendingUp, Cpu, HelpCircle, 
  ArrowRight, Check, Sparkles 
} from 'lucide-react';

interface InteractiveNeedToolProps {
  onOpenConsultation?: () => void;
  onOpenConsultationModal?: () => void;
}

export function InteractiveNeedTool({
  onOpenConsultation,
  onOpenConsultationModal,
}: InteractiveNeedToolProps) {
  const handleConsultation = onOpenConsultationModal || onOpenConsultation || (() => {});
  const [selectedOption, setSelectedOption] = useState<string>('new-site');

  const options = [
    {
      id: 'new-site',
      icon: Globe,
      title: 'I need a new business website',
      subtitle: 'Starting from scratch or launching a new venture.',
      recommendation: {
        heading: 'Recommended: Digital Presence Foundation Package',
        description:
          'A mobile-first custom website built with fast Next.js code, clear service pages, WhatsApp CTA integration, and Google Search Console setup.',
        features: [
          '5 to 10 Custom Designed Pages',
          'Mobile-First Touch UI & WhatsApp Integration',
          'Google Search & Maps Schema Setup',
          'Sub-1.5s Page Load Performance',
        ],
        ctaText: 'Explore Website Services',
        ctaHref: '/services',
      },
    },
    {
      id: 'redesign',
      icon: RefreshCw,
      title: 'I already have a website, but it needs improvement',
      subtitle: 'Slow loading, outdated design, or low mobile conversion.',
      recommendation: {
        heading: 'Recommended: Website Redesign & Core Web Vitals Overhaul',
        description:
          'We audit your existing URL structure and rebuild your platform on Next.js to improve loading speed, mobile UX, and conversion rates without losing search rankings.',
        features: [
          'SEO-Safe Content & URL Migration',
          'Core Web Vitals Speed Optimization',
          'Modernized UI/UX Design System',
          'Lead Form & Enquiry Streamlining',
        ],
        ctaText: 'See Redesign Approach',
        ctaHref: '/solutions/local-business',
      },
    },
    {
      id: 'more-leads',
      icon: TrendingUp,
      title: 'I need more enquiries & local customer visibility',
      subtitle: 'Getting traffic or followers but not enough phone calls or forms.',
      recommendation: {
        heading: 'Recommended: SEO & Performance Growth Engine',
        description:
          'A targeted strategy combining high-intent local landing pages, Google Business Profile optimization, and conversion-focused CTAs.',
        features: [
          'Local Business Keyword Optimization',
          'High-Intent Conversion Landing Pages',
          'Google Business & Maps Ranking Strategy',
          'Google Analytics 4 & Conversion Tracking',
        ],
        ctaText: 'Explore SEO & Growth',
        ctaHref: '/services',
      },
    },
    {
      id: 'custom-app',
      icon: Cpu,
      title: 'I need a custom web application or business software',
      subtitle: 'Require dashboards, admin panels, role-based workflows, or SaaS.',
      recommendation: {
        heading: 'Recommended: Custom Web Application & Software Development',
        description:
          'Bespoke software architecture engineered specifically around your internal operational workflows, database requirements, and user roles.',
        features: [
          'Custom React / Next.js Web App Architecture',
          'Role-Based Authentication & Access Control',
          'API Integration & Automation Pipelines',
          'Scalable Cloud Architecture',
        ],
        ctaText: 'View Software Solutions',
        ctaHref: '/services',
      },
    },
    {
      id: 'not-sure',
      icon: HelpCircle,
      title: 'I\'m not sure — I need expert advice',
      subtitle: 'Want an honest review of what digital solution fits best.',
      recommendation: {
        heading: 'Recommended: Free Digital Consultation & Audit',
        description:
          'Speak directly with our 3-member team. We review your current online footprint and recommend the most practical step — even if that means NOT building a full website.',
        features: [
          'Zero Jargon & No Pushy Sales Pitch',
          'Clear Digital Gap Analysis',
          'Tailored Project Estimate & Scope',
          'Direct Access to Developers & Marketers',
        ],
        ctaText: 'Start a Conversation',
        ctaHref: '#',
        isModalTrigger: true,
      },
    },
  ];

  const current = options.find((o) => o.id === selectedOption) || options[0];

  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA] border-t border-[#E3DCD3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Solution Finder</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
            What Are You Trying to Improve?
          </h2>
          <p className="text-base sm:text-lg text-[#424965]">
            Select your current business priority below to see our recommended approach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Selector List (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {options.map((option) => {
              const Icon = option.icon;
              const isSelected = option.id === selectedOption;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#16203D] text-[#FAF8F5] border-[#8A2B88] shadow-xl ring-2 ring-[#8A2B88]/30 scale-[1.01]'
                      : 'bg-[#FAF8F5] text-[#16203D] border-[#E3DCD3] hover:border-[#8A2B88]/40 shadow-sm'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected
                        ? 'bg-[#8A2B88] text-white'
                        : 'bg-[#F3EFEA] text-[#8A2B88]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-sans leading-snug">
                      {option.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        isSelected ? 'text-white/70' : 'text-[#424965]/80'
                      }`}
                    >
                      {option.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recommendation Box (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-10 bg-[#FAF8F5] border border-[#8A2B88]/30 rounded-3xl shadow-xl space-y-6 relative overflow-hidden"
              >
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-[#8A2B88] uppercase tracking-wider">
                    Skovento Solution Recommendation
                  </span>
                  <h3 className="text-2xl font-bold text-[#16203D] font-sans">
                    {current.recommendation.heading}
                  </h3>
                  <p className="text-sm text-[#424965] leading-relaxed">
                    {current.recommendation.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-[#16203D] uppercase tracking-wider">
                    Key Solution Deliverables:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.recommendation.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-[#16203D] font-medium">
                        <div className="p-1 rounded-full bg-[#8A2B88]/10 text-[#8A2B88]">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E3DCD3] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-[#424965]/80 italic">
                    Let&apos;s discuss how this applies to your business.
                  </span>
                  {current.recommendation.isModalTrigger ? (
                    <button
                      type="button"
                      onClick={handleConsultation}
                      className="tap-target px-6 py-3 rounded-xl bg-[#16203D] hover:bg-[#8A2B88] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
                    >
                      {current.recommendation.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={current.recommendation.ctaHref}
                      className="tap-target px-6 py-3 rounded-xl bg-[#16203D] hover:bg-[#8A2B88] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
                    >
                      {current.recommendation.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
