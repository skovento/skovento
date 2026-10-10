'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF8F5] text-[#424965] border-t border-[#E3DCD3] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E3DCD3]">
          {/* Brand & Studio Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Logo size="md" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4F46E5]">
              Digital Solutions Studio
            </p>
            <p className="text-sm text-[#424965] leading-relaxed max-w-sm">
              We design and develop modern websites, web applications, and digital tools built around real business processes. Clean code, clear communication, and transparent delivery.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2 text-sm text-[#16203D] font-medium hover:text-[#4F46E5] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#4F46E5]" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16203D]">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#business-websites" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link href="/services#ecommerce-booking" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  E-commerce &amp; Booking
                </Link>
              </li>
              <li>
                <Link href="/services#web-applications" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  Web Applications &amp; Systems
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  Technical SEO &amp; Performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16203D]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/work" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  Demonstrations
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  About Skovento
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#424965] hover:text-[#4F46E5] transition-colors">
                  Discuss a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Note Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16203D]">
              Transparency
            </h4>
            <p className="text-xs text-[#424965] leading-relaxed">
              Skovento is an independent digital solutions studio. Concept projects are labeled transparently to demonstrate our design and engineering standards without fabricated client claims.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] hover:underline"
              >
                <span>Start a conversation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#424965]/80 gap-4">
          <p>© {currentYear} Skovento. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#4F46E5] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#4F46E5] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-[#4F46E5] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
