'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, ShoppingCart, LayoutDashboard, ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const SERVICES = [
  {
    id: 'business-websites',
    icon: Globe,
    title: 'Business Websites',
    description:
      'Professional websites that help businesses present their services, communicate their value and generate enquiries.',
    deliverables: [
      'Tailored service pages and clear information architecture',
      'Integrated contact and project enquiry forms',
      'Direct WhatsApp and click-to-call routing',
      'Technical SEO foundations & Schema.org markup',
      'Fully responsive, accessible, mobile-first design',
      'Fast edge deployment with SSL configuration',
    ],
    href: '/services#business-websites',
    badge: 'Presentation & Enquiries',
  },
  {
    id: 'ecommerce-booking',
    icon: ShoppingCart,
    title: 'E-commerce & Booking',
    description:
      'Product catalogues, online stores, booking experiences and customer-facing workflows tailored to your requirements.',
    deliverables: [
      'Structured, filterable product catalogues',
      'Frictionless checkout and payment gateway integrations',
      'Multi-step service booking & reservation flows',
      'Automated email and messaging notifications',
      'Order and enquiry tracking workflows',
      'Third-party software and CRM connections',
    ],
    href: '/services#ecommerce-booking',
    badge: 'Transactions & Scheduling',
  },
  {
    id: 'web-applications',
    icon: LayoutDashboard,
    title: 'Web Applications & Business Systems',
    description:
      'Custom dashboards, portals, admin panels and digital tools designed around real business processes.',
    deliverables: [
      'Secure user authentication and role-based permissions',
      'Internal management dashboards and portals',
      'Customer record tracking and data workflows',
      'Custom REST API engineering and integrations',
      'Centralised reporting and operations views',
      'Scalable PostgreSQL database architecture',
    ],
    href: '/services#web-applications',
    badge: 'Operations & Dashboards',
  },
];

export function ServicesOverviewSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          eyebrow="Core Services"
          title="Digital solutions built around your business."
          subtitle="We focus on three primary digital solutions — each engineered for reliability, usability, and measurable commercial value."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl border border-[#E3DCD3] bg-white p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="space-y-6">
                  {/* Card Header with Icon & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E3DCD3] flex items-center justify-center text-[#4F46E5] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#424965] uppercase tracking-wider bg-[#FAF8F5] border border-[#E3DCD3] px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#16203D] tracking-tight font-sans">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#424965] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables checklist */}
                  <div className="pt-2 border-t border-[#E3DCD3]/70 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#16203D] block mb-3">
                      Key Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs text-[#424965]">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#4F46E5] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom link */}
                <div className="pt-8 border-t border-[#E3DCD3]/70 mt-6">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16203D] group-hover:text-[#4F46E5] transition-colors"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
