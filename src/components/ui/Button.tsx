'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#16203D] text-[#FAF8F5] hover:bg-[#8A2B88] hover:shadow-lg hover:shadow-[#8A2B88]/20 focus:ring-[#8A2B88]',
    secondary: 'bg-[#C88770] text-[#FAF8F5] hover:bg-[#DB9883] hover:shadow-lg hover:shadow-[#C88770]/20 focus:ring-[#C88770]',
    outline: 'bg-transparent text-[#16203D] border-2 border-[#16203D]/20 hover:border-[#8A2B88] hover:text-[#8A2B88] hover:bg-[#8A2B88]/5 focus:ring-[#8A2B88]',
    ghost: 'bg-transparent text-[#16203D] hover:bg-[#EAE4DC]/60 hover:text-[#8A2B88]'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2.5',
    lg: 'px-8 py-4 text-lg gap-3'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </motion.button>
  );
};
