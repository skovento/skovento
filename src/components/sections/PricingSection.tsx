'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface PricingSectionProps {
  onOpenModal: () => void;
}

const tiers = [
  {
    name: 'Launch',
    price: '₹42,000',
    delivery: '7 days',
    pages: '5 pages',
    features: ['5 custom-designed pages', 'Mobile-first, responsive build', 'Basic on-page SEO setup', '1 round of revisions'],
    highlighted: false
  },
  {
    name: 'Growth',
    price: '₹85,000',
    delivery: '14 days',
    pages: '10 pages',
    features: ['10 custom-designed pages', 'Scroll animation & micro-interactions', 'Technical SEO + schema markup', 'Analytics & conversion tracking', '2 rounds of revisions'],
    highlighted: true
  },
  {
    name: 'Signature',
    price: '₹1,60,000',
    delivery: '25–30 days',
    pages: '18 pages',
    features: ['18 custom-designed pages', 'Full 3D / cinematic scroll build', 'E-commerce or web-app ready', 'CMS integration', 'Priority support for 60 days'],
    highlighted: false
  }
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="pricing" className="py-14 sm:py-24 bg-[#F3EFEA] border-y border-[#E3DCD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8A2B88]">
            Published Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans">
            No &quot;contact for quote.&quot; Real numbers.
          </h2>
          <p className="text-base text-[#424965]">
            All prices exclude 18% GST. Pick a scope, or talk to us if you need something in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-8 rounded-3xl border flex flex-col justify-between ${
                tier.highlighted
                  ? 'bg-[#16203D] text-white border-[#8A2B88] shadow-2xl md:-translate-y-3'
                  : 'bg-[#FAF8F5] text-[#16203D] border-[#E3DCD3]'
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${tier.highlighted ? 'text-[#E5C396]' : 'text-[#8A2B88]'}`}>
                    {tier.name}
                  </span>
                  {tier.highlighted && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#8A2B88] text-white px-2.5 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-4xl font-extrabold font-sans">{tier.price}</div>
                  <div className={`text-xs font-semibold mt-1 ${tier.highlighted ? 'text-white/60' : 'text-[#424965]/70'}`}>
                    {tier.delivery} · {tier.pages}
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? 'text-[#E5C396]' : 'text-[#8A2B88]'}`} />
                      <span className={tier.highlighted ? 'text-white/85' : 'text-[#424965]'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                size="md"
                fullWidth
                variant={tier.highlighted ? 'secondary' : 'outline'}
                onClick={onOpenModal}
                icon={<ArrowUpRight className="w-4 h-4" />}
                className="mt-8"
              >
                Start with {tier.name}
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
