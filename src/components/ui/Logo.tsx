'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightDimensions = {
    sm: 'h-10 sm:h-12',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
  };

  return (
    <Link href="/" className={`inline-flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded-md ${className}`}>
      <div className={`relative ${heightDimensions[size]} w-auto aspect-[16/8] transition-transform duration-200 group-hover:scale-[1.03]`}>
        <Image
          src="/skovento-transparent.png"
          alt="Skovento — Digital Solutions Studio"
          width={1376}
          height={768}
          priority
          className="h-full w-auto object-contain drop-shadow-xs"
        />
      </div>
    </Link>
  );
};
