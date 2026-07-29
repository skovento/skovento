'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  // Increased height dimensions for prominent visibility
  const heightDimensions = {
    sm: 'h-11 sm:h-13',
    md: 'h-14 sm:h-16',
    lg: 'h-18 sm:h-22'
  };

  return (
    <Link href="/" className={`inline-flex items-center group focus:outline-none ${className}`}>
      {/* 100% Transparent PNG of 3D Logo with increased sizing */}
      <div className={`relative ${heightDimensions[size]} w-auto aspect-[16/8] transition-transform duration-300 group-hover:scale-[1.04]`}>
        <img
          src="/skovento-transparent.png"
          alt="Skovento - Beyond Limits. Elevated Journeys."
          className="h-full w-auto object-contain drop-shadow-md"
        />
      </div>
    </Link>
  );
};
