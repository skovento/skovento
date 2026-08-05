'use client';

import React from 'react';
import { Clock3, Rocket, Gauge, ShieldCheck } from 'lucide-react';

/**
 * TrustBar — redesigned as an editorial stats strip.
 *
 * Stat values are real and independently verifiable. Each one is chosen
 * because a prospect can check it in under 10 seconds (PageSpeed Insights,
 * the contract, the founding date). Stats that can't be checked are cut.
 */
const stats = [
  {
    icon: <Clock3 className="w-4 h-4" />,
    value: 'Jul 2026',
    label: 'Studio Founded',
    accent: '#8A2B88',
  },
  {
    icon: <Rocket className="w-4 h-4" />,
    value: '7 Days',
    label: 'Fastest Build Delivery',
    accent: '#C88770',
  },
  {
    icon: <Gauge className="w-4 h-4" />,
    value: '<2.5s',
    label: 'Guaranteed LCP on 4G',
    accent: '#1E2E6B',
  },
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    value: '100%',
    label: 'Refund If We Miss Deadline',
    accent: '#8A2B88',
  },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-[#16203D] border-y border-white/5 overflow-hidden" aria-label="Key statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group px-6 py-8 sm:px-8 sm:py-10 flex flex-col gap-3 relative overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 80% at 30% 50%, ${stat.accent}18, transparent 70%)`,
                }}
                aria-hidden
              />

              {/* Icon pill */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${stat.accent}22`, color: stat.accent }}
              >
                {stat.icon}
              </div>

              {/* Big stat value */}
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-sans leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-white/50 mt-1.5 leading-snug">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
