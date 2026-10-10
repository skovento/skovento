'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
];

interface NavbarProps {
  onOpenModal?: () => void;
  onOpenAuditModal?: () => void;
}

export function Navbar({ onOpenModal, onOpenAuditModal }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard support: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Focus trap for mobile menu would go here ideally, but for now we rely on basic flow

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E3DCD3] shadow-sm py-3'
            : 'bg-[#FAF8F5]/80 backdrop-blur-sm py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 relative z-50">
              <Link href="/" onClick={closeMenu} aria-label="Home">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm transition-colors px-3 py-2',
                    pathname === link.href
                      ? 'text-[#4F46E5] font-semibold'
                      : 'font-medium text-[#16203D] hover:text-[#4F46E5]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact">
                <Button variant="primary" size="sm">
                  Discuss a Project
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden relative z-50">
              <button
                onClick={toggleMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
                className="p-2 text-[#16203D] hover:text-[#4F46E5] transition-colors tap-target focus-visible"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-40 bg-[#FAF8F5] border-b border-[#E3DCD3] shadow-lg pt-24 pb-6 px-4 md:hidden"
          >
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    'block px-4 py-4 rounded-lg text-lg min-h-[44px]',
                    pathname === link.href
                      ? 'bg-[#4F46E5]/10 text-[#4F46E5] font-semibold'
                      : 'font-medium text-[#16203D] hover:bg-[#E3DCD3]/30 hover:text-[#4F46E5]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 pb-2 px-4">
                <Link href="/contact" onClick={closeMenu} className="block">
                  <Button variant="primary" size="lg" fullWidth>
                    Discuss a Project
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
