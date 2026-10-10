'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Globe, ShoppingCart, LayoutDashboard, Check, Plus, 
  ArrowUpRight, ArrowRight, ShieldCheck, Zap, Layers 
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col font-sans selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* Page Header */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3DCD3] text-xs font-semibold tracking-wider text-[#4F46E5] uppercase">
              Digital Studio Services
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
              Purpose-built digital solutions for modern businesses.
            </h1>

            <p className="text-base sm:text-xl text-[#424965] leading-relaxed max-w-2xl mx-auto">
              We design and engineer business websites, commerce and booking systems, and custom web applications. Each project is tailored around your actual operational workflow and growth goals.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                  Discuss Your Project
                </Button>
              </Link>
              <Link href="/work">
                <Button size="lg" variant="outline">
                  Explore Demonstrations
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Category 1: Business Websites */}
        <section id="business-websites" className="py-20 sm:py-28 border-b border-[#E3DCD3] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                SERVICE 01
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D] font-sans tracking-tight">
                Business Websites
              </h2>
              <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
                Professional websites that help businesses present their services, communicate their value proposition clearly, and generate qualified customer enquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standard Deliverables */}
              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-white space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E3DCD3]">
                  <h3 className="text-lg font-bold text-[#16203D] flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#4F46E5]" />
                    <span>Included in Every Build</span>
                  </h3>
                  <span className="text-xs font-mono text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded font-semibold">
                    Standard Scope
                  </span>
                </div>

                <ul className="space-y-3.5 text-sm text-[#424965]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Structured service pages:</strong> Clean hierarchy highlighting offerings, pricing indications, and proof points.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Contact &amp; enquiry forms:</strong> Validated forms with spam protection routed directly to your team inbox.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>WhatsApp &amp; telephone routing:</strong> One-tap buttons configured with pre-filled messages for instant mobile enquiries.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Mobile-first responsive design:</strong> Tested across phone, tablet, and desktop viewports with fluid typography.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Technical SEO foundations:</strong> Semantic HTML, meta tags, Open Graph images, and Schema.org structured data.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Production deployment:</strong> Cloudflare or Vercel edge deployment with automated SSL and DNS configuration.</span>
                  </li>
                </ul>
              </div>

              {/* Optional & Custom Additions */}
              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-[#F3EFEA] space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E3DCD3]">
                    <h3 className="text-lg font-bold text-[#16203D] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#16203D]" />
                      <span>Optional Custom Features</span>
                    </h3>
                    <span className="text-xs font-mono text-[#424965] bg-white px-2 py-0.5 rounded font-semibold border border-[#E3DCD3]">
                      Available as Scoped
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-sm text-[#424965]">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Analytics &amp; Tag Manager setup:</strong> Conversion events and privacy-compliant tracking configurations.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Content management system (CMS):</strong> Structured editor allowing non-technical team members to publish updates.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Multi-language localization:</strong> Route-based translations and locale switching for international visitors.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Interactive calculation tools:</strong> Custom cost estimation widgets or service selectors.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E3DCD3]">
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:underline">
                    <span>Discuss a Business Website project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category 2: E-commerce & Booking */}
        <section id="ecommerce-booking" className="py-20 sm:py-28 bg-[#F3EFEA] border-b border-[#E3DCD3] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                SERVICE 02
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D] font-sans tracking-tight">
                E-commerce &amp; Booking Systems
              </h2>
              <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
                Product catalogues, online stores, booking experiences and customer-facing transaction workflows designed around your business rules.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standard Deliverables */}
              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-white space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E3DCD3]">
                  <h3 className="text-lg font-bold text-[#16203D] flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#4F46E5]" />
                    <span>Included in Every Build</span>
                  </h3>
                  <span className="text-xs font-mono text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded font-semibold">
                    Standard Scope
                  </span>
                </div>

                <ul className="space-y-3.5 text-sm text-[#424965]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Structured product catalogue:</strong> Categorised collections, variant options, and search filtering.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Detailed product presentation:</strong> High-resolution galleries, specifications, stock status, and enquiry actions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Cart &amp; checkout flow:</strong> Streamlined order placement with clear tax and shipping displays.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Payment integration:</strong> Secure processing via verified gateways (Stripe, Razorpay, or custom merchant APIs).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Booking &amp; reservation workflows:</strong> Calendar slot selection, deposit handling, and customer confirmation emails.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Order &amp; booking management:</strong> Clean dashboard view to review customer records, order status, and cancellations.</span>
                  </li>
                </ul>
              </div>

              {/* Optional & Custom Additions */}
              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-[#FAF8F5] space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E3DCD3]">
                    <h3 className="text-lg font-bold text-[#16203D] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#16203D]" />
                      <span>Optional Custom Features</span>
                    </h3>
                    <span className="text-xs font-mono text-[#424965] bg-white px-2 py-0.5 rounded font-semibold border border-[#E3DCD3]">
                      Available as Scoped
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-sm text-[#424965]">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>ERP &amp; inventory synchronization:</strong> Automated sync with warehouse stock systems or Google Sheets.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Custom shipping rule calculator:</strong> Distance-based or weight-based carrier shipping API hooks.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Automated SMS &amp; WhatsApp alerts:</strong> Direct order confirmation and dispatch notifications to buyers.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Wholesale / B2B tiered pricing:</strong> Custom price lists for bulk buyers with gated logins.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E3DCD3]">
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:underline">
                    <span>Discuss an E-commerce or Booking project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category 3: Web Applications & Business Systems */}
        <section id="web-applications" className="py-20 sm:py-28 border-b border-[#E3DCD3] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                SERVICE 03
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D] font-sans tracking-tight">
                Web Applications &amp; Business Systems
              </h2>
              <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
                Custom dashboards, internal portals, customer management systems, and specialized web software tailored to your company&apos;s real-world processes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standard Deliverables */}
              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-white space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E3DCD3]">
                  <h3 className="text-lg font-bold text-[#16203D] flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#4F46E5]" />
                    <span>Included in Every Build</span>
                  </h3>
                  <span className="text-xs font-mono text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded font-semibold">
                    Standard Scope
                  </span>
                </div>

                <ul className="space-y-3.5 text-sm text-[#424965]">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Secure authentication:</strong> Session tokens, password encryption, and multi-factor verification options.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Role-based permissions:</strong> Granular access control for administrators, staff, and external clients.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Admin dashboards &amp; UI:</strong> Clean tables, search filters, and detail views built for daily operational speed.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>Customer &amp; record management:</strong> Centralised database for managing leads, customers, projects, or assets.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>PostgreSQL data architecture:</strong> Normalised relational database schemas designed for long-term consistency.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <span><strong>REST API endpoints:</strong> Well-documented internal APIs connecting frontend actions to secure backend services.</span>
                  </li>
                </ul>
              </div>

              {/* Optional & Custom Additions */}
              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-[#F3EFEA] space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E3DCD3]">
                    <h3 className="text-lg font-bold text-[#16203D] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#16203D]" />
                      <span>Optional Custom Features</span>
                    </h3>
                    <span className="text-xs font-mono text-[#424965] bg-white px-2 py-0.5 rounded font-semibold border border-[#E3DCD3]">
                      Available as Scoped
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-sm text-[#424965]">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Automated background workflows:</strong> Scheduled cron jobs, email reminder triggers, and webhooks.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Document generation (PDF/CSV):</strong> Automatic invoice, receipt, or summary report downloads.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Third-party system integrations:</strong> CRM connections (HubSpot, Zoho), accounting tools, or custom endpoints.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16203D] shrink-0 mt-2" />
                      <span><strong>Full audit logging:</strong> Timestamped records of user actions, data edits, and access attempts.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#E3DCD3]">
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:underline">
                    <span>Discuss a Web Application project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Estimation Approach */}
        <section className="py-20 sm:py-28 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <SectionHeading
              eyebrow="Transparent Scoping"
              title="How we approach project pricing."
              subtitle="We do not offer artificial package discounts or arbitrary rate cards. Every project is scoped based on deliverables, technical complexity, and agreed milestones."
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 rounded-2xl border border-[#E3DCD3] bg-white space-y-4">
                <span className="text-xs font-mono font-bold text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded">
                  01 · Websites
                </span>
                <h3 className="text-xl font-bold text-[#16203D]">
                  Fixed Scope Proposals
                </h3>
                <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                  Business websites are estimated as a fixed-price engagement based on page count, required integrations, and content complexity.
                </p>
                <div className="pt-2 text-xs font-medium text-[#16203D]">
                  Includes milestone deliverables and a defined launch window.
                </div>
              </div>

              <div className="p-7 rounded-2xl border border-[#E3DCD3] bg-white space-y-4">
                <span className="text-xs font-mono font-bold text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded">
                  02 · Commerce &amp; Booking
                </span>
                <h3 className="text-xl font-bold text-[#16203D]">
                  Functional Scoping
                </h3>
                <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                  E-commerce and booking platforms are quoted based on catalog volume, payment gateway requirements, and booking logic nuances.
                </p>
                <div className="pt-2 text-xs font-medium text-[#16203D]">
                  Includes complete sandbox testing prior to go-live.
                </div>
              </div>

              <div className="p-7 rounded-2xl border border-[#E3DCD3] bg-white space-y-4">
                <span className="text-xs font-mono font-bold text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded">
                  03 · Custom Applications
                </span>
                <h3 className="text-xl font-bold text-[#16203D]">
                  Milestone-Based Sprints
                </h3>
                <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                  Web apps and business systems are broken into iterative architectural milestones: Discovery &amp; Schema, Core Build, Integration, and User Acceptance.
                </p>
                <div className="pt-2 text-xs font-medium text-[#16203D]">
                  Transparent review at each milestone before proceeding.
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[#E3DCD3] bg-white text-center max-w-2xl mx-auto space-y-3">
              <h4 className="text-base font-bold text-[#16203D]">
                Need a clear estimate for your project?
              </h4>
              <p className="text-xs text-[#424965] leading-relaxed">
                Send us a short overview of your requirements. We will review the details and provide an honest, obligation-free assessment of scope and practical next steps.
              </p>
              <div className="pt-2">
                <Link href="/contact">
                  <Button size="md">
                    Request an Estimate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16203D]">
              Ready to discuss your requirements?
            </h2>
            <p className="text-base text-[#424965] max-w-xl mx-auto">
              Tell us what you want to build or improve. We&apos;ll schedule a discovery discussion to understand your needs.
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
