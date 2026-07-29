'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* SVG Icon matching Skovento Infinity Arrow Logo */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="skoventoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2E6B" />
              <stop offset="50%" stopColor="#8A2B88" />
              <stop offset="100%" stopColor="#C88770" />
            </linearGradient>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A2B88" />
              <stop offset="100%" stopColor="#E5C396" />
            </linearGradient>
          </defs>
          
          {/* Infinity Loop Path */}
          <path
            d="M 30 50 C 15 50 15 30 30 30 C 45 30 55 70 70 70 C 85 70 85 50 70 50 C 55 50 45 30 30 30"
            stroke="url(#skoventoGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Ascending Rocket Arrow */}
          <path
            d="M 62 45 L 85 20 L 72 40 L 85 20 L 65 33"
            stroke="url(#arrowGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <span className={`font-extrabold tracking-tight text-[#16203D] ${textSizes[size]} font-sans group-hover:text-gradient-brand transition-all duration-300`}>
          SKOVENTO
        </span>
        {showTagline && (
          <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#8A2B88] -mt-1">
            Beyond Limits. Elevated Journeys.
          </span>
        )}
      </div>
    </Link>
  );
};
