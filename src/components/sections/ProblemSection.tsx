'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, XCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const scenarios = [
    {
      title: '"Customers find us on Instagram."',
      desc: 'But there is no central place for complete collection details, pricing, size guides, or location information.',
    },
    {
      title: '"We mostly get customers through referrals."',
      desc: 'But new prospects cannot easily verify your portfolio, process, or credentials online before reaching out.',
    },
    {
      title: '"People keep asking for our catalogue."',
      desc: 'But products and price lists are manually emailed or sent as slow PDFs over WhatsApp.',
    },
    {
      title: '"We have a website, but nobody really uses it."',
      desc: 'The site exists as a static expense, but fails to guide visitors into enquiries.',
    },
    {
      title: '"We want more customer enquiries."',
      desc: 'But there is no clear conversion path or search engine optimization driving new local discovery.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A2B88]/10 border border-[#8A2B88]/20 text-xs font-bold text-[#8A2B88] uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-[#C88770]" />
              <span>Digital Reality Check</span>
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight">
              Your Business is Already Online. But Is It Working for You?
            </h2>
            <p className="text-base sm:text-lg text-[#424965]">
              Sound familiar? Most business owners face these exact digital bottlenecks:
            </p>
          </div>

          {/* Scenarios Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {scenarios.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl relative flex flex-col justify-between hover:border-[#8A2B88]/40 transition-colors shadow-sm space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#FAF8F5] rounded-xl text-red-500 border border-red-200 flex-shrink-0 mt-0.5">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#16203D] leading-snug font-sans">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#424965] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}

            {/* Skovento Solution Callout Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="p-6 bg-[#16203D] text-[#FAF8F5] border border-[#16203D] rounded-3xl flex flex-col justify-center space-y-2 shadow-xl"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#8A2B88] rounded-xl text-white">
                  <Sparkles className="w-4 h-4 text-[#E5C396]" />
                </div>
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  This Is Where Skovento Comes In.
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-white/80">
                We turn your digital gaps into structured, practical digital experiences that turn casual viewers into loyal clients.
              </p>
            </motion.div>
          </div>

          {/* Section Closing Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 bg-[#F3EFEA] border border-[#8A2B88]/30 rounded-3xl text-center space-y-3 relative overflow-hidden"
          >
            <p className="text-lg sm:text-xl font-extrabold text-[#16203D] font-sans">
              You&apos;re not alone.{' '}
              <span className="text-[#8A2B88]">
                Most businesses don&apos;t have a marketing problem—they have a digital foundation problem.
              </span>
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
