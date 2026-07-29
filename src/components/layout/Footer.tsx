'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] text-[#424965] pt-16 pb-12 border-t border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E3DCD3]">
          
          {/* Brand Info Column - Logo sits cleanly on off-white background */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Logo size="lg" />
            </div>
            <p className="text-sm text-[#424965]/90 leading-relaxed max-w-sm">
              Skovento is a full-service digital partner combining custom web development and growth marketing — so your brand doesn’t just look good, it performs.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1 text-xs text-[#16203D] font-bold bg-[#F3EFEA] px-3.5 py-1.5 rounded-full border border-[#E3DCD3]">
                <span className="text-[#8A2B88]">★ 4.9/5 Rating</span>
                <span className="text-[#424965]/40">• 50+ Projects</span>
              </div>
            </div>
          </div>

          {/* Development Services Column */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Development
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/services/website-development" className="hover:text-[#8A2B88] transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-development" className="hover:text-[#8A2B88] transition-colors">
                  E-commerce Stores
                </Link>
              </li>
              <li>
                <Link href="/services/web-application-development" className="hover:text-[#8A2B88] transition-colors">
                  Web Applications & SaaS
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux-design" className="hover:text-[#8A2B88] transition-colors">
                  UI/UX Interface Design
                </Link>
              </li>
              <li>
                <Link href="/services/website-maintenance-support" className="hover:text-[#8A2B88] transition-colors">
                  Maintenance & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Marketing Services Column */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Digital Marketing
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/services/search-engine-optimization" className="hover:text-[#8A2B88] transition-colors">
                  Search Engine Optimization (SEO)
                </Link>
              </li>
              <li>
                <Link href="/services/pay-per-click-advertising" className="hover:text-[#8A2B88] transition-colors">
                  Google Ads (PPC)
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-[#8A2B88] transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/branding-graphic-design" className="hover:text-[#8A2B88] transition-colors">
                  Branding & Identity
                </Link>
              </li>
              <li>
                <Link href="/services/conversion-rate-optimization" className="hover:text-[#8A2B88] transition-colors">
                  Conversion Rate Optimization (CRO)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Company & Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#424965]">
              <li>
                <Link href="/about" className="hover:text-[#8A2B88] transition-colors">
                  About Skovento
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#8A2B88] transition-colors">
                  Portfolio & Work
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8A2B88] transition-colors">
                  Growth Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li className="pt-2 flex items-center gap-2 text-xs text-[#16203D] font-medium">
                <Mail className="w-4 h-4 text-[#8A2B88]" />
                <span>hello@skovento.com</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-[#16203D] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C88770]" />
                <span>24/7 Global Support Availability</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#424965]/80 gap-4">
          <p>© {new Date().getFullYear()} Skovento. All rights reserved. Beyond Limits. Elevated Journeys.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
