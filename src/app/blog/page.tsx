'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ConsultationModal } from '@/components/ui/ConsultationModal';

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const posts = [
    {
      title: 'Why Most Business Websites Fail to Generate Leads (And How to Fix It)',
      excerpt: 'Discover the top 5 mistakes businesses make on their website architecture and how to restructure for 3x higher lead conversion.',
      category: 'Web Strategy',
      date: 'May 12, 2026',
      readTime: '5 min read'
    },
    {
      title: 'Google Ads vs SEO: Which Should Your Startup Invest In First?',
      excerpt: 'A comprehensive ROI breakdown comparing immediate paid search acquisition against long-term organic authority.',
      category: 'Digital Marketing',
      date: 'May 08, 2026',
      readTime: '7 min read'
    },
    {
      title: 'The 2026 Conversion Rate Optimization Blueprint for Local Businesses',
      excerpt: 'Simple design and content tweaks that convert casual web visitors into paying telephone calls and appointment bookings.',
      category: 'CRO',
      date: 'May 01, 2026',
      readTime: '6 min read'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#16203D]">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#C88770]" />
            <span>Growth Insights & SEO Guides</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans">
            Skovento Growth Journal
          </h1>
          <p className="text-base sm:text-lg text-[#424965] max-w-2xl mx-auto">
            Actionable strategies on custom web engineering, SEO performance, Google Ads scaling, and digital growth.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl space-y-4 flex flex-col justify-between hover:border-[#8A2B88]/40 transition-colors shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#8A2B88] uppercase tracking-wider">{post.category}</span>
                    <span className="text-[#424965]/60 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[#16203D] font-sans hover:text-[#8A2B88] transition-colors cursor-pointer">
                    {post.title}
                  </h2>

                  <p className="text-xs text-[#424965] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E3DCD3] flex items-center justify-between text-xs text-[#424965]">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#C88770]" />
                    {post.date}
                  </span>
                  <span className="font-bold text-[#8A2B88] flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
