'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Utensils, GraduationCap, Building, Plane, Scissors, Rocket, Store, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';
import { Button } from '@/components/ui/Button';

export default function IndustriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const industries = [
    {
      id: 'healthcare',
      title: 'Healthcare & Medical Practice',
      icon: <Stethoscope className="w-6 h-6 text-[#8A2B88]" />,
      desc: 'Patient booking portals, HIPAA-compliant forms, and local SEO to attract qualified appointment requests.',
      highlights: ['Online Appointment Booking', 'Local Map Pack #1 Ranking', 'Patient Trust & Accreditation Design']
    },
    {
      id: 'restaurants',
      title: 'Restaurants & Hospitality',
      icon: <Utensils className="w-6 h-6 text-[#C88770]" />,
      desc: 'Dynamic digital menus, online reservation integrations, and Instagram/Google local foot-traffic ad campaigns.',
      highlights: ['Interactive Digital Menus', 'Direct Reservation Engine', 'Local Foodie Ad Funnels']
    },
    {
      id: 'education',
      title: 'Education & E-Learning',
      icon: <GraduationCap className="w-6 h-6 text-[#1E2E6B]" />,
      desc: 'Student admission lead funnels, course catalogs, and targeted student acquisition ads.',
      highlights: ['Student Inquiry Generation', 'Course Catalog Systems', 'PPC Admission Campaigns']
    },
    {
      id: 'real-estate',
      title: 'Real Estate & Property',
      icon: <Building className="w-6 h-6 text-[#8A2B88]" />,
      desc: 'Property showcase websites, IDX MLS integrations, and high-value buyer lead capture systems.',
      highlights: ['Property Virtual Showcase', 'High-Income Buyer Ads', 'Automated Lead Qualification']
    },
    {
      id: 'travel',
      title: 'Travel & Tourism',
      icon: <Plane className="w-6 h-6 text-[#C88770]" />,
      desc: 'Tour itinerary booking engines, destination showcases, and global traveler PPC marketing.',
      highlights: ['Custom Booking Workflows', 'Destination Landing Pages', 'International PPC Ads']
    },
    {
      id: 'fashion',
      title: 'Fashion & E-Commerce',
      icon: <Scissors className="w-6 h-6 text-[#1E2E6B]" />,
      desc: 'High-converting Shopify & custom Next.js storefronts, Meta ad scaling, and customer lifetime value optimization.',
      highlights: ['Sub-1-Second Store Speed', 'Meta & TikTok Shopping Ads', 'Abandoned Cart Recovery']
    },
    {
      id: 'startups',
      title: 'Tech Startups & SaaS',
      icon: <Rocket className="w-6 h-6 text-[#8A2B88]" />,
      desc: 'Conversion-focused SaaS product launch landing pages, demo booking funnels, and investor pitch deck web design.',
      highlights: ['Product Demo Funnels', 'Growth Analytics Tracking', 'Investor Ready Aesthetics']
    },
    {
      id: 'small-businesses',
      title: 'Small Businesses & Local Services',
      icon: <Store className="w-6 h-6 text-[#C88770]" />,
      desc: 'Affordable, high-converting digital foundations designed to generate daily customer calls and local inquiries.',
      highlights: ['Google Business Profile Boost', 'Fast Mobile Call Buttons', 'Affordable Growth Packages']
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#16203D]">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      {/* Hero Header */}
      <section className="pt-36 pb-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            Tailored Industry Solutions
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans">
            Industries We Scale
          </h1>
          <p className="text-base sm:text-lg text-[#424965] max-w-2xl mx-auto">
            Deep domain expertise tailored to the unique customer acquisition needs of your specific industry.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, idx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-8 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-6 flex flex-col justify-between hover:border-[#8A2B88]/40 transition-colors shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E3DCD3] shadow-sm">
                      {ind.icon}
                    </div>
                    <span className="text-xs font-bold text-[#8A2B88] uppercase tracking-wider bg-[#8A2B88]/10 px-3 py-1 rounded-full">
                      Tailored Strategy
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#16203D] font-sans">
                    {ind.title}
                  </h2>

                  <p className="text-sm text-[#424965] leading-relaxed">
                    {ind.desc}
                  </p>

                  <div className="space-y-2 pt-2">
                    {ind.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-[#16203D]">
                        <CheckCircle2 className="w-4 h-4 text-[#8A2B88] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E3DCD3]">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsModalOpen(true)}
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    Get {ind.title} Growth Plan
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
