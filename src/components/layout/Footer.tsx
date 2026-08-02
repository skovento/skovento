'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, PhoneCall } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { whatsappLink, telLink, PHONE_NUMBER_DISPLAY } from '@/lib/contact';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] text-[#424965] pt-16 pb-12 border-t border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E3DCD3]">
          
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Logo size="lg" />
            </div>
            <p className="text-sm text-[#424965]/90 leading-relaxed max-w-sm">
              Skovento is a full-service digital partner combining custom web development and growth marketing — so your brand doesn’t just look good, it performs.
            </p>
            <div className="flex flex-col gap-2.5 pt-2 text-sm">
              <a
                href={telLink()}
                className="inline-flex items-center gap-2 min-h-11 text-[#16203D] font-semibold hover:text-[#8A2B88] transition-colors w-fit"
              >
                <PhoneCall className="w-4 h-4 text-[#8A2B88]" />
                <span>{PHONE_NUMBER_DISPLAY}</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-11 text-[#16203D] font-semibold hover:text-[#8A2B88] transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="mailto:hello@skovento.com"
                className="inline-flex items-center gap-2 min-h-11 text-[#16203D] font-semibold hover:text-[#8A2B88] transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-[#C88770]" />
                <span>hello@skovento.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Website Development */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Website Development
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/services/website-development" className="hover:text-[#8A2B88] transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-[#8A2B88] transition-colors">
                  Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-development" className="hover:text-[#8A2B88] transition-colors">
                  E-Commerce Stores
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-[#8A2B88] transition-colors">
                  Website Redesign
                </Link>
              </li>
              <li>
                <Link href="/services/website-maintenance-support" className="hover:text-[#8A2B88] transition-colors">
                  Website Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Digital Marketing */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Digital Marketing
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/services/search-engine-optimization" className="hover:text-[#8A2B88] transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/services/pay-per-click-advertising" className="hover:text-[#8A2B88] transition-colors">
                  Google Ads (PPC)
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-[#8A2B88] transition-colors">
                  Meta Ads (Facebook/IG)
                </Link>
              </li>
              <li>
                <Link href="/services/search-engine-optimization" className="hover:text-[#8A2B88] transition-colors">
                  Local SEO & Maps
                </Link>
              </li>
              <li>
                <Link href="/services/branding-graphic-design" className="hover:text-[#8A2B88] transition-colors">
                  Content Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 & 5: Company, Resources & Legal */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Explore Skovento
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/about" className="hover:text-[#8A2B88] transition-colors">
                  About Us & Mission
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#8A2B88] transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-[#8A2B88] transition-colors">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-[#8A2B88] transition-colors">
                  Our 8-Stage Process
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8A2B88] transition-colors">
                  Resources & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
                  Contact & HQ Location
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#424965]/80 gap-4">
          <p>© {new Date().getFullYear()} Skovento. All rights reserved. Beyond Limits. Elevated Journeys.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#8A2B88] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#8A2B88] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
