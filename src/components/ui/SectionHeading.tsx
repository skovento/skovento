'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[#4F46E5]">{eyebrow}</p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-[#16203D] tracking-tight leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-base text-[#424965] leading-relaxed max-w-2xl" style={align === 'center' ? {margin: '0 auto'} : {}}>{subtitle}</p>
      )}
    </div>
  );
}
