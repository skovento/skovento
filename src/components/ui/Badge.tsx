import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'concept' | 'demo' | 'default';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    concept: 'bg-amber-50 text-amber-700 border-amber-200',
    demo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    default: 'bg-[#F3EFEA] text-[#424965] border-[#E3DCD3]',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${variants[variant]}`}>
      {children}
    </span>
  );
}
