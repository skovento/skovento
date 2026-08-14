'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight, Code, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenModal: () => void;
  onOpenAuditModal?: () => void;
}

export function Navbar({ onOpenModal, onOpenAuditModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'Work', href: '/work' },
    { name: 'Industries', href: '/industries', hasIndustryDropdown: true },
    { name: 'Local Business', href: '/solutions/local-business' },
    { name: 'Process', href: '/process' },
    { name: 'About', href: '/about' },
    { name: 'Free Audit', href: '/audit' },
    { name: 'Contact', href: '/contact' },
  ];

  const industryLinks = [
    { title: 'Fashion & Apparel', href: '/industries/fashion' },
    { title: 'Restaurants & Hospitality', href: '/industries/restaurants' },
    { title: 'Salons & Beauty Studios', href: '/industries/salons' },
    { title: 'Travel & Car Rental', href: '/industries/travel' },
    { title: 'Real Estate & Builders', href: '/industries/real-estate' },
    { title: 'Professional Services', href: '/industries' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3DCD3] shadow-md'
          : 'py-5 bg-[#FAF8F5]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F3EFEA]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E3DCD3]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                      isActive ? 'text-[#8A2B88] bg-[#FAF8F5]' : 'text-[#16203D] hover:text-[#8A2B88]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        servicesDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>

                  {/* Mega Dropdown */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[460px]">
                      <div className="bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl shadow-2xl p-6 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 pb-2 border-b border-[#E3DCD3] text-xs font-extrabold text-[#16203D]">
                            <Code className="w-4 h-4 text-[#8A2B88]" />
                            <span>Digital &amp; Web</span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li>
                              <Link
                                href="/services"
                                className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA]"
                              >
                                Digital Presence
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services"
                                className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA]"
                              >
                                Web Applications
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services"
                                className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA]"
                              >
                                Custom Software
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 pb-2 border-b border-[#E3DCD3] text-xs font-extrabold text-[#16203D]">
                            <TrendingUp className="w-4 h-4 text-[#C88770]" />
                            <span>Growth &amp; SEO</span>
                          </div>
                          <ul className="space-y-1 text-xs">
                            <li>
                              <Link
                                href="/services"
                                className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA]"
                              >
                                Technical &amp; Local SEO
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services"
                                className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA]"
                              >
                                Performance Optimization
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/services"
                                className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA]"
                              >
                                Analytics &amp; CRO
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (link.hasIndustryDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIndustriesDropdownOpen(true)}
                  onMouseLeave={() => setIndustriesDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                      isActive ? 'text-[#8A2B88] bg-[#FAF8F5]' : 'text-[#16203D] hover:text-[#8A2B88]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        industriesDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>

                  {industriesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[240px]">
                      <div className="bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl shadow-2xl p-4 space-y-1">
                        {industryLinks.map((ind) => (
                          <Link
                            key={ind.title}
                            href={ind.href}
                            className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#16203D] hover:bg-[#F3EFEA] hover:text-[#8A2B88] transition-colors"
                          >
                            {ind.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  isActive ? 'text-[#8A2B88] bg-[#FAF8F5]' : 'text-[#16203D] hover:text-[#8A2B88]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAuditModal || onOpenModal}
            className="text-xs font-extrabold text-[#8A2B88] hover:text-[#16203D] px-3 py-1.5"
          >
            Free Audit
          </button>
          <Button size="sm" onClick={onOpenModal} icon={<ArrowUpRight className="w-4 h-4" />}>
            Start Conversation
          </Button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden min-w-11 min-h-11 flex items-center justify-center rounded-xl bg-[#F3EFEA] border border-[#E3DCD3] text-[#16203D]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E3DCD3] px-4 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-11 px-4 py-2.5 rounded-xl text-sm font-bold text-[#16203D] hover:bg-[#F3EFEA] hover:text-[#8A2B88]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#E3DCD3] space-y-2">
            <Button size="md" fullWidth onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}>
              Start a Conversation
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
