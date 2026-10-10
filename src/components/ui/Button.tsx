'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#4F46E5] text-white hover:bg-[#4338CA] hover:shadow-lg hover:shadow-[#4F46E5]/20 focus:ring-[#4F46E5]',
    secondary: 'bg-transparent border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5]/10 hover:shadow-lg hover:shadow-[#4F46E5]/10 focus:ring-[#4F46E5]',
    outline: 'bg-transparent text-[#16203D] border-2 border-[#16203D]/20 hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-[#4F46E5]/5 focus:ring-[#4F46E5]',
    ghost: 'bg-transparent text-[#16203D] hover:bg-[#E3DCD3]/50 hover:text-[#16203D]'
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2.5',
    lg: 'px-8 py-3.5 text-lg gap-3'
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
