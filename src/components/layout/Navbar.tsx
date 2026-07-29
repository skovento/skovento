'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface NavbarProps {
  onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'Portfolio', href: '/work' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  const quickServices = [
    { title: 'Website Development', href: '/services/website-development' },
    { title: 'Digital Marketing', href: '/services/search-engine-optimization' },
    { title: 'Mobile App Development', href: '/services/web-application-development' },
    { title: 'QA Testing', href: '/services/website-maintenance-support' },
    { title: 'Social Media Management', href: '/services/social-media-marketing' },
    { title: 'Branding & Identity', href: '/services/branding-graphic-design' },
    { title: 'UI/UX Design', href: '/services/ui-ux-design' },
    { title: 'AI Automation', href: '/services/web-application-development' },
    { title: 'Maintenance & Support', href: '/services/website-maintenance-support' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#E3DCD3] shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F3EFEA]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E3DCD3]">
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
                    className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive
                        ? 'text-[#8A2B88] font-semibold bg-[#FAF8F5]'
                        : 'text-[#424965] hover:text-[#16203D] hover:bg-[#FAF8F5]/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#8A2B88]' : ''}`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-[#FAF8F5] border border-[#E3DCD3] rounded-2xl shadow-xl p-3 z-50 glass-card-elevated"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8A2B88] px-3 py-1 mb-1">
                          Our Core Capabilities
                        </div>
                        {quickServices.map((svc) => (
                          <Link
                            key={svc.href || svc.title}
                            href={svc.href}
                            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#424965] hover:text-[#16203D] hover:bg-[#F3EFEA] rounded-xl transition-colors group"
                          >
                            <span>{svc.title}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#8A2B88] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        ))}
                        <div className="border-t border-[#E3DCD3] mt-2 pt-2 px-3">
                          <Link
                            href="/services"
                            className="text-xs font-semibold text-[#8A2B88] hover:text-[#16203D] flex items-center justify-between"
                          >
                            <span>Explore All 12 Services</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? 'text-[#8A2B88] font-semibold bg-[#FAF8F5]'
                    : 'text-[#424965] hover:text-[#16203D] hover:bg-[#FAF8F5]/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" onClick={onOpenModal} icon={<ArrowUpRight className="w-4 h-4" />}>
            Free Consultation
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#16203D] hover:bg-[#F3EFEA] rounded-xl transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF8F5] border-b border-[#E3DCD3] px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-semibold py-2 transition-colors ${
                    pathname === link.href ? 'text-[#8A2B88]' : 'text-[#16203D]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#E3DCD3]">
                <Button
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenModal();
                  }}
                >
                  Get a Free Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
