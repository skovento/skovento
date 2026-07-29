'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Code, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { CinematicTechCanvas } from '../ui/CinematicTechCanvas';

export const MacroProductRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const rotateX = useTransform(scrollYProgress, [0.05, 0.9], [18, 0]);
  const rotateY = useTransform(scrollYProgress, [0.05, 0.9], [-25, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.9], [0.88, 1.05]);
  
  const textY = useTransform(scrollYProgress, [0.35, 0.85], [50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const progressBarWidth = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);

  const metric1Y = useTransform(scrollYProgress, [0.1, 0.6], [60, 0]);
  const metric1Opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const metric2Y = useTransform(scrollYProgress, [0.3, 0.8], [60, 0]);
  const metric2Opacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-[#050811] text-white z-10">
      {/* Sticky Full Screen Viewport (100% Mobile Responsive) */}
      <div className="sticky top-0 h-screen w-full pt-16 sm:pt-20 pb-8 flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6">
        
        {/* 3D Cyberpunk Quantum Tunnel Canvas */}
        <CinematicTechCanvas />

        {/* Ambient Glow Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050811]/90 via-transparent to-[#050811]/90 pointer-events-none z-10" />

        {/* Top Header Pill Badge */}
        <div className="relative z-20 mt-4 sm:mt-6 flex items-center gap-2.5 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full border border-white/15 text-xs font-bold text-[#E5C396] shadow-2xl">
          <Sparkles className="w-4 h-4 text-[#8A2B88]" />
          <span>3D Quantum Matrix Architecture</span>
          <span className="text-white/30">•</span>
          <span className="text-white/80">Scroll to Explore</span>
        </div>

        {/* 3D Holographic Stage */}
        <div className="relative w-full max-w-5xl my-auto perspective-[1200px] z-20">
          <motion.div
            style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
            className="relative w-full rounded-2xl sm:rounded-3xl border border-white/15 bg-[#16203D]/50 backdrop-blur-xl p-5 sm:p-10 shadow-2xl space-y-6 overflow-hidden"
          >
            {/* Top Frame Status Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="text-[11px] font-mono text-white/50 ml-1">skovento.matrix // 3D Quantum</span>
              </div>
              <span className="px-2.5 py-1 bg-[#8A2B88]/20 border border-[#8A2B88]/40 text-[#E5C396] text-[10px] font-bold rounded-full uppercase tracking-wider">
                Live 60 FPS
              </span>
            </div>

            {/* Mobile Responsive Holographic Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Card 1: Web Engineering */}
              <motion.div
                style={{ y: metric1Y, opacity: metric1Opacity }}
                className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2.5 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8A2B88]/20 rounded-xl text-[#E5C396] flex-shrink-0">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                    Sub-1-Second Web Engineering
                  </h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Clean semantic code, zero bloat, and enterprise-grade Next.js architecture built to load instantly across mobile devices.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-[#E5C396] pt-1">
                  <span>⚡ 100/100 Core Vitals</span>
                  <span>•</span>
                  <span>🔒 Bank Grade</span>
                </div>
              </motion.div>

              {/* Card 2: Performance Marketing */}
              <motion.div
                style={{ y: metric2Y, opacity: metric2Opacity }}
                className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2.5 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C88770]/20 rounded-xl text-[#C88770] flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                    Predictable Lead Acquisition
                  </h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Targeted Google Ads, Meta retargeting pixels, and local SEO campaigns engineered to drive qualified customer enquiries.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-[#C88770] pt-1">
                  <span>📈 +310% Growth</span>
                  <span>•</span>
                  <span>🎯 Transparent ROI</span>
                </div>
              </motion.div>

            </div>

            {/* Bottom Status Bar */}
            <div className="flex items-center justify-between text-[11px] text-white/50 pt-2">
              <span>Skovento Digital Foundation</span>
              <span className="text-[#E5C396] font-bold">100% Outcome Driven</span>
            </div>

          </motion.div>
        </div>

        {/* Neo-Noir Overlay Typography */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-20 text-center space-y-2 max-w-3xl mb-4 px-2"
        >
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#E5C396] bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
            Precision Dark Tech Architecture
          </span>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-sans tracking-tight leading-snug drop-shadow-2xl">
            Engineered From Shadow.{' '}
            <span className="block text-gradient-brand mt-0.5">Revealed In Unmatched Performance.</span>
          </h2>
        </motion.div>

        {/* Bottom Full-Width Progress Track */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
          <motion.div
            style={{ width: progressBarWidth }}
            className="h-full bg-gradient-to-r from-[#8A2B88] via-[#C88770] to-[#E5C396]"
          />
        </div>

      </div>
    </section>
  );
};
