'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { whatsappLink, telLink, PHONE_NUMBER_DISPLAY } from '@/lib/contact';

export function Footer() {
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
              Skovento is a small, dedicated digital solutions team — combining web development, QA testing, and SEO growth to help businesses build, improve, and launch smarter.
            </p>
            
            <div className="flex items-center gap-2 text-xs font-bold text-[#8A2B88] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#C88770]" />
              <span>100% Transparent • Concept Projects Explicitly Labeled</span>
            </div>

            <div className="flex flex-col gap-2 pt-2 text-sm">
              <a
                href={telLink()}
                className="inline-flex items-center gap-2 text-[#16203D] font-semibold hover:text-[#8A2B88] transition-colors w-fit"
              >
                <PhoneCall className="w-4 h-4 text-[#8A2B88]" />
                <span>{PHONE_NUMBER_DISPLAY}</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#16203D] font-semibold hover:text-[#8A2B88] transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="mailto:hello@skovento.com"
                className="inline-flex items-center gap-2 text-[#16203D] font-semibold hover:text-[#8A2B88] transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-[#C88770]" />
                <span>hello@skovento.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Digital Solutions */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Digital Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/services" className="hover:text-[#8A2B88] transition-colors">
                  Digital Presence Websites
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#8A2B88] transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#8A2B88] transition-colors">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#8A2B88] transition-colors">
                  Technical &amp; Local SEO
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#8A2B88] transition-colors">
                  Speed &amp; Performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Industries We Serve
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/industries/fashion" className="hover:text-[#8A2B88] transition-colors">
                  Fashion &amp; Apparel
                </Link>
              </li>
              <li>
                <Link href="/industries/restaurants" className="hover:text-[#8A2B88] transition-colors">
                  Restaurants &amp; Cafes
                </Link>
              </li>
              <li>
                <Link href="/industries/salons" className="hover:text-[#8A2B88] transition-colors">
                  Salons &amp; Spas
                </Link>
              </li>
              <li>
                <Link href="/industries/travel" className="hover:text-[#8A2B88] transition-colors">
                  Travel &amp; Car Rental
                </Link>
              </li>
              <li>
                <Link href="/industries/real-estate" className="hover:text-[#8A2B88] transition-colors">
                  Real Estate &amp; Housing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Tools & Company */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#16203D] mb-4">
              Company &amp; Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-[#424965]">
              <li>
                <Link href="/about" className="hover:text-[#8A2B88] transition-colors">
                  About the 3-Member Team
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#8A2B88] transition-colors">
                  Selected Work &amp; Concepts
                </Link>
              </li>
              <li>
                <Link href="/audit" className="hover:text-[#8A2B88] font-bold text-[#8A2B88] transition-colors">
                  Free Digital Presence Audit
                </Link>
              </li>
              <li>
                <Link href="/solutions/local-business" className="hover:text-[#8A2B88] transition-colors">
                  Local Business Growth
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-[#8A2B88] transition-colors">
                  5-Step Process
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
                  Contact Skovento
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#424965]/80 gap-4">
          <p>© {new Date().getFullYear()} Skovento. Digital Solutions for Growing Businesses.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#8A2B88] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#8A2B88] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#8A2B88] transition-colors">
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
