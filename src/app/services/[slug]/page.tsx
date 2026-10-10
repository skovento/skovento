import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/services';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildGraph, serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';
import { CheckCircle2, ArrowRight, ArrowLeft, ArrowUpRight, HelpCircle } from 'lucide-react';

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found | Skovento',
    };
  }

  return {
    title: `${service.title} — Digital Services`,
    description: service.shortDescription,
  };
}

export default async function IndividualServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#16203D] selection:bg-indigo-100 selection:text-[#16203D]">
      {/* Schema.org structured data */}
      <JsonLd
        data={buildGraph(
          serviceSchema({
            name: service.title,
            description: service.detailedDescription,
            slug: service.slug,
          }),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ])
        )}
      />

      <Navbar />

      <main className="flex-grow pt-28">
        {/* Service Hero */}
        <section className="py-16 sm:py-24 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#424965] hover:text-[#4F46E5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services Overview</span>
            </Link>

            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-white border border-[#E3DCD3] text-[#4F46E5] text-xs font-semibold uppercase tracking-wider rounded-full">
                {service.badge}
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-xl text-[#424965] leading-relaxed">
                {service.detailedDescription}
              </p>

              <div className="pt-2">
                <Link href="/contact">
                  <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                    Discuss Your Requirements
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider">
                    Scope &amp; Deliverables
                  </span>
                  <h2 className="text-3xl font-bold text-[#16203D] font-sans">
                    What is included in this solution
                  </h2>
                </div>
                <p className="text-sm text-[#424965] leading-relaxed">
                  Every {service.title} engagement includes end-to-end execution to ensure performance, responsive stability, and clear business alignment.
                </p>

                <div className="space-y-3 pt-2">
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 bg-white border border-[#E3DCD3] rounded-xl shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#16203D]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Commitment Card */}
              <div className="p-8 rounded-3xl border border-[#E3DCD3] bg-[#F3EFEA] space-y-6">
                <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider block">
                  Studio Commitment
                </span>
                <h3 className="text-2xl font-bold text-[#16203D]">
                  {service.proof.headline}
                </h3>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#4F46E5] font-sans">
                  {service.proof.stat}
                </div>
                <p className="text-sm text-[#424965] leading-relaxed">
                  {service.proof.desc}
                </p>
                <div className="pt-4 border-t border-[#E3DCD3]">
                  <Link href="/contact">
                    <Button fullWidth size="md">
                      Discuss This Scope
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Breakdown */}
        <section className="py-20 bg-[#F3EFEA] border-y border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider">
                Execution Steps
              </span>
              <h2 className="text-3xl font-bold text-[#16203D] font-sans">
                How we deliver {service.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {service.process.map((p, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-[#E3DCD3] rounded-2xl shadow-2xs space-y-3"
                >
                  <span className="text-xs font-mono font-bold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded">
                    Step {p.step}
                  </span>
                  <h3 className="text-lg font-bold text-[#16203D] font-sans">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#424965] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-20 bg-[#FAF8F5]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono font-bold text-[#4F46E5] uppercase tracking-wider">
                  FAQ
                </span>
                <h2 className="text-3xl font-bold text-[#16203D] font-sans">
                  Common questions regarding {service.title}
                </h2>
              </div>

              <div className="space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white border border-[#E3DCD3] rounded-2xl space-y-2 shadow-2xs"
                  >
                    <h3 className="text-base font-bold text-[#16203D]">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-[#424965] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-[#F3EFEA] border-t border-[#E3DCD3]">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#16203D]">
              Ready to start your {service.title} project?
            </h2>
            <p className="text-base text-[#424965]">
              Contact us with an overview of your requirements. We will review your goals and provide an honest estimate.
            </p>
            <div className="pt-2">
              <Link href="/contact">
                <Button size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                  Start a Project Conversation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
