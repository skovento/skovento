'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight, Code, TrendingUp } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [userOpened, setUserOpened] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show Navbar when at the very top (Hero Section)
      if (currentScrollY <= 40) {
        setHidden(false);
        setUserOpened(false);
      } else {
        // Below Hero Section: Keep Navbar HIDDEN unless user explicitly clicked Menu pill
        if (!userOpened) {
          setHidden(true);
        }
      }

      setScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userOpened]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasDropdown: true },
    // { name: 'Portfolio', href: '/work' },
    { name: 'Industries', href: '/industries' },
    { name: 'Process', href: '/process' },
    { name: 'Resources', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const webDevServices = [
    { title: 'Business Websites', href: '/services/website-development' },
    { title: 'Landing Pages', href: '/services/website-development' },
    { title: 'E-Commerce Stores', href: '/services/ecommerce-development' },
    { title: 'Website Redesign', href: '/services/website-development' },
    { title: 'Website Maintenance', href: '/services/website-maintenance-support' }
  ];

  const digitalMarketingServices = [
    { title: 'SEO (Search Engine Optimization)', href: '/services/search-engine-optimization' },
    { title: 'Google Ads (PPC)', href: '/services/pay-per-click-advertising' },
    { title: 'Meta Ads (Facebook & IG)', href: '/services/social-media-marketing' },
    { title: 'Local SEO & Maps', href: '/services/search-engine-optimization' },
    { title: 'Content Strategy & Copywriting', href: '/services/branding-graphic-design' }
  ];

  return (
    <>
      {/* Floating Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
          hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } ${
          scrolled
            ? 'py-3 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3DCD3] shadow-md'
            : 'py-5 bg-transparent'
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
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px]">
                        <div className="bg-[#FAF8F5] border border-[#E3DCD3] rounded-3xl shadow-2xl p-6 grid grid-cols-2 gap-6">
                          
                          {/* Web Dev Column */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-[#E3DCD3] text-xs font-extrabold text-[#16203D]">
                              <Code className="w-4 h-4 text-[#8A2B88]" />
                              <span>Website Development</span>
                            </div>
                            <ul className="space-y-1.5 text-xs">
                              {webDevServices.map((s, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={s.href}
                                    className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA] transition-colors"
                                  >
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Digital Marketing Column */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-[#E3DCD3] text-xs font-extrabold text-[#16203D]">
                              <TrendingUp className="w-4 h-4 text-[#C88770]" />
                              <span>Digital Marketing</span>
                            </div>
                            <ul className="space-y-1.5 text-xs">
                              {digitalMarketingServices.map((s, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={s.href}
                                    className="block p-1.5 rounded-lg text-[#424965] hover:text-[#8A2B88] hover:bg-[#F3EFEA] transition-colors"
                                  >
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="col-span-2 pt-3 border-t border-[#E3DCD3] flex items-center justify-between text-xs text-[#8A2B88] font-bold">
                            <Link href="/services" className="hover:underline flex items-center gap-1">
                              <span>Explore All Services & Packages</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>

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

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button size="sm" onClick={onOpenModal} icon={<ArrowUpRight className="w-4 h-4" />}>
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#F3EFEA] border border-[#E3DCD3] text-[#16203D]"
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
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#16203D] hover:bg-[#F3EFEA] hover:text-[#8A2B88]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-[#E3DCD3]">
              <Button size="md" fullWidth onClick={() => { setMobileMenuOpen(false); onOpenModal(); }}>
                Book Free Consultation
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Menu Toggle Button (Visible when scrolled away from Hero Section unless manually opened) */}
      {hidden && (
        <button
          onClick={() => { setHidden(false); setUserOpened(true); }}
          aria-label="Open Navigation Menu"
          className="fixed top-5 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#16203D] text-[#FAF8F5] rounded-full shadow-2xl border border-[#C88770]/60 hover:bg-[#8A2B88] transition-all duration-300 transform hover:scale-105"
        >
          <ChevronDown className="w-4 h-4 text-[#E5C396]" />
          <span className="text-xs font-bold tracking-wide">Menu</span>
        </button>
      )}
    </>
  );
};
