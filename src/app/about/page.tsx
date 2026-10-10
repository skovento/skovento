'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Target, FileText, Cpu, Smartphone, MessageSquareText, ShieldCheck, 
  ArrowUpRight, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

const CORE_PRINCIPLES = [
  {
    title: 'Business-first development',
    description:
      'We focus on the commercial reality of your business — how you acquire customers, manage enquiries, and operate day-to-day. The website or application is engineered to support those goals directly.',
    icon: Target,
  },
  {
    title: 'Clear project scope',
    description:
      'Every project begins with transparent definitions of deliverables, milestones, assumptions, and exclusions. We believe clarity upfront prevents frustration later.',
    icon: FileText,
  },
  {
    title: 'Practical technology choices',
    description:
      'We select modern, stable, proven tools — Next.js, React, TypeScript, Tailwind CSS, Node.js, and PostgreSQL — rather than chasing fleeting trends or adding unnecessary complexity.',
    icon: Cpu,
  },
  {
    title: 'Responsive user experiences',
    description:
      'We test every interface across actual mobile, tablet, and desktop dimensions. Fast loading times, legible typography, and accessible tap targets are non-negotiable standards.',
    icon: Smartphone,
  },
  {
    title: 'Transparent communication',
    description:
      'You communicate directly with the people building your solution. We communicate progress clearly, discuss trade-offs honestly, and never hide behind jargon.',
    icon: MessageSquareText,
  },
  {
    title: 'Reliable delivery processes',
    description:
      'From discovery and scope definition to testing and launch, our 7-stage delivery process keeps projects organised, predictable, and focused on quality.',
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* About Hero */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3DCD3] text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              Studio Overview
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
              About Skovento
            </h1>

            <p className="text-lg sm:text-2xl text-[#16203D] font-medium leading-relaxed max-w-3xl mx-auto">
              &ldquo;Skovento is an independent digital solutions brand focused on building modern websites, web applications and digital tools for businesses.&rdquo;
            </p>

            <p className="text-base text-[#424965] max-w-2xl mx-auto leading-relaxed">
              We work with small and medium-sized businesses, local services, manufacturers, and growing startups who need thoughtful, well-engineered digital solutions without agency fluff.
            </p>
          </div>
        </section>

        {/* Brand Focus & Who We Serve */}
        <section className="py-20 border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider">
                  Our Purpose
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D] font-sans tracking-tight">
                  Clear thinking before code.
                </h2>
                <div className="space-y-4 text-base text-[#424965] leading-relaxed">
                  <p>
                    Many businesses find themselves stuck between two extremes: generic website builders that lack flexibility, or traditional agencies that charge excessive fees while outsourcing the actual engineering.
                  </p>
                  <p>
                    Skovento was established to provide an honest, technical alternative. We design and develop digital solutions built specifically around what your business needs to communicate, sell, or simplify.
                  </p>
                  <p>
                    We do not claim to be a large corporation, and we do not invent client numbers or testimonials. We let our work, our code quality, and our transparent process speak for itself.
                  </p>
                </div>
              </div>

              {/* Boxed Principles Highlight */}
              <div className="p-8 sm:p-10 rounded-3xl border border-[#E3DCD3] bg-[#F3EFEA] space-y-6 shadow-2xs">
                <h3 className="text-xl font-bold text-[#16203D]">
                  What we prioritize on every project:
                </h3>
                <ul className="space-y-3.5 text-sm text-[#424965]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Clarity over complexity:</strong> We recommend only the tools and features that genuinely benefit your operations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Speed and performance:</strong> Clean Next.js architecture with fast load times and reliable uptime.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Transparent pricing &amp; scope:</strong> Detailed proposals with agreed milestones before any work begins.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Long-term maintainability:</strong> Clean, documented, standard codebases that you own 100%.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Principles Grid */}
        <section className="py-20 sm:py-28 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <SectionHeading
              eyebrow="Our Execution Philosophy"
              title="How we work and build."
              subtitle="The six foundational principles that govern our design decisions, engineering standards, and communication."
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CORE_PRINCIPLES.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="p-8 rounded-2xl border border-[#E3DCD3] bg-white shadow-2xs hover:border-[#4F46E5]/40 transition-colors space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] flex items-center justify-center text-[#4F46E5]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-[#16203D] font-sans">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-[#424965] leading-relaxed">
                        {principle.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E3DCD3]/60 text-[11px] font-mono font-semibold text-[#4F46E5]">
                      Principle 0{idx + 1}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="py-20 bg-[#F3EFEA] border-t border-[#E3DCD3]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D]">
              Looking for a dependable digital partner?
            </h2>
            <p className="text-base text-[#424965] max-w-xl mx-auto">
              Let&apos;s discuss what your business needs to build or improve. We&apos;ll provide a straightforward perspective and practical recommendation.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                  Discuss Your Project
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
