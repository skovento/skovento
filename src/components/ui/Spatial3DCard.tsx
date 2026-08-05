'use client';

import React, { useRef, useState } from 'react';

interface Spatial3DCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // Z-axis lift distance in px
  maxTilt?: number; // Max tilt angle in deg
  glowColor?: string; // Specular glare glow color
  enableGlare?: boolean;
}

export const Spatial3DCard: React.FC<Spatial3DCardProps> = ({
  children,
  className = '',
  depth = 20,
  maxTilt = 12,
  glowColor = 'rgba(138, 43, 136, 0.15)',
  enableGlare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rotateY = ((mouseX / width) - 0.5) * (maxTilt * 2);
    const rotateX = -((mouseY / height) - 0.5) * (maxTilt * 2);

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${depth}px) scale(1.02)`
    );

    if (enableGlare) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.6,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)');
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-300 ease-out preserve-3d cursor-pointer ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Specular Light Sheen Overlay */}
      {enableGlare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-inherit z-20 transition-opacity duration-300 overflow-hidden rounded-[20px]"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glowColor} 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Card Content Wrapper */}
      <div
        className="relative z-10 w-full h-full"
        style={{
          transform: isHovered ? `translateZ(${depth / 2}px)` : 'translateZ(0px)',
          transition: 'transform 300ms ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
