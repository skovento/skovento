'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, FileCheck, Layout, Code2, CheckCircle2, Rocket, LifeBuoy, 
  ArrowUpRight, ShieldCheck, Clock 
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

const STAGES = [
  {
    stage: '01',
    title: 'Discovery',
    subtitle: 'Understand the business, audience, requirements and constraints.',
    description:
      'We begin with an in-depth consultation to understand your commercial model, your target audience, existing technical systems, and any operational constraints. This ensures we build what your business genuinely needs.',
    deliverables: [
      'Discovery discussion notes & technical requirements summary',
      'Audience profile and primary user goals',
      'Identification of required integrations and dependencies',
    ],
    icon: Search,
  },
  {
    stage: '02',
    title: 'Scope and Planning',
    subtitle: 'Define deliverables, exclusions, timeline, budget and milestones.',
    description:
      'Before writing any code or designing layouts, we define an unambiguous, itemised project scope. You receive clear milestone definitions, explicit exclusions, and fixed pricing so expectations are completely aligned.',
    deliverables: [
      'Written project specification & deliverable breakdown',
      'Clear project exclusions and assumptions',
      'Milestone schedule and review intervals',
    ],
    icon: FileCheck,
  },
  {
    stage: '03',
    title: 'Design',
    subtitle: 'Plan the page structure, interface and user experience.',
    description:
      'We plan the information architecture, user journeys, and screen layouts. The focus is on clarity, readable typography, responsive layouts, and frictionless conversion actions for your visitors.',
    deliverables: [
      'Sitemap and content hierarchy mapping',
      'Key interface layouts and interaction flows',
      'Design tokens (typography scale, colour hierarchy, spacing)',
    ],
    icon: Layout,
  },
  {
    stage: '04',
    title: 'Development',
    subtitle: 'Build the agreed functionality and integrate required services.',
    description:
      'We engineer the solution using modern, reliable technologies — React, Next.js, TypeScript, and Tailwind CSS. We build semantic components, connect forms and APIs, and structure database schemas.',
    deliverables: [
      'Clean, modular, version-controlled codebase',
      'API connections, form handlers, and notification routing',
      'Accessible, semantic HTML architecture',
    ],
    icon: Code2,
  },
  {
    stage: '05',
    title: 'Testing',
    subtitle: 'Test responsive behaviour, functionality, accessibility basics and performance.',
    description:
      'Rigorous verification across mobile viewports (360px, 390px), tablets (768px), and desktop screens. We verify all form submissions, test edge cases, check keyboard navigation, and validate page speed metrics.',
    deliverables: [
      'Cross-viewport responsive testing checklist',
      'Form validation and error state testing',
      'Core Web Vitals and speed validation pass',
    ],
    icon: CheckCircle2,
  },
  {
    stage: '06',
    title: 'Launch',
    subtitle: 'Configure the production deployment, domain, SSL and agreed integrations.',
    description:
      'We configure production edge hosting, map your custom domain, establish SSL certificates, verify DNS records, and test agreed third-party integrations in the live environment.',
    deliverables: [
      'Production deployment on edge CDN infrastructure',
      'Automated SSL security certificate activation',
      'Robots.txt, Sitemap.xml, and Search Console setup',
    ],
    icon: Rocket,
  },
  {
    stage: '07',
    title: 'Support',
    subtitle: 'Explain the support period, exclusions and maintenance options.',
    description:
      'Every project includes a defined post-launch stabilization period to address questions or minor adjustments. We explain ongoing maintenance options, hosting parameters, and how to request future enhancements.',
    deliverables: [
      'Post-launch stabilization support window',
      'Project handover documentation and asset delivery',
      'Optional website care and maintenance agreements',
    ],
    icon: LifeBuoy,
  },
];

export function ProcessPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* Process Hero */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3DCD3] text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              Project Methodology
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
              A clear delivery process from discovery to launch.
            </h1>

            <p className="text-base sm:text-xl text-[#424965] leading-relaxed max-w-2xl mx-auto">
              We follow a structured 7-stage delivery process designed to provide total clarity on what is being created, when it will be delivered, and how it will perform.
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#E3DCD3] text-xs text-[#424965] inline-flex items-center gap-2 max-w-lg mx-auto text-left shadow-2xs">
              <Clock className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <span>
                <strong>Realistic Scheduling:</strong> Delivery timelines depend on scope and functional requirements. We establish realistic project milestones during planning rather than quoting arbitrary turnaround times.
              </span>
            </div>
          </div>
        </section>

        {/* 7 Stages Deep Dive */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {STAGES.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.stage}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="p-7 sm:p-9 rounded-2xl border border-[#E3DCD3] bg-white shadow-2xs hover:border-[#4F46E5]/40 transition-colors space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3DCD3]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] flex items-center justify-center text-[#4F46E5]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-[#4F46E5] uppercase tracking-wider block">
                          Stage {step.stage}
                        </span>
                        <h2 className="text-2xl font-bold text-[#16203D] font-sans">
                          {step.title}
                        </h2>
                      </div>
                    </div>

                    <span className="text-xs text-[#424965] font-medium bg-[#F3EFEA] border border-[#E3DCD3] px-3 py-1 rounded-full w-fit">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#424965] leading-relaxed">
                    {step.description}
                  </p>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#16203D] block">
                      Stage Deliverables &amp; Outcomes:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#424965]">
                      {step.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#4F46E5] font-bold">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom Call to Action */}
            <div className="p-10 rounded-3xl border border-[#E3DCD3] bg-[#F3EFEA] text-center space-y-6 mt-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#16203D]">
                Ready to begin Stage 01 Discovery?
              </h3>
              <p className="text-sm text-[#424965] max-w-lg mx-auto leading-relaxed">
                We will discuss your requirements, answer technical questions, and determine whether we are the right team for your project.
              </p>
              <div className="pt-2">
                <Link href="/contact">
                  <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                    Discuss a Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProcessPage;
