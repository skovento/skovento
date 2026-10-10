import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, ExternalLink, Code2, AlertCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { caseStudiesData, getCaseStudyBySlug } from '@/data/case-studies';

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: 'Project Not Found | Skovento',
    };
  }

  return {
    title: `${study.title} — Concept Project`,
    description: study.overview,
  };
}

export default async function SingleCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#16203D] selection:bg-indigo-100 selection:text-[#16203D]">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* Detail Hero Header */}
        <section className="py-16 sm:py-20 bg-[#F3EFEA] border-b border-[#E3DCD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#424965] hover:text-[#4F46E5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all demonstrations</span>
            </Link>

            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5] bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded">
                  {study.category}
                </span>
                <Badge variant="concept">
                  {study.projectType}
                </Badge>
                <span className="text-xs font-medium text-[#424965] bg-white border border-[#E3DCD3] px-2.5 py-1 rounded">
                  Target: {study.businessType}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16203D] font-sans tracking-tight leading-tight">
                {study.title}
              </h1>

              <p className="text-base sm:text-lg text-[#424965] leading-relaxed">
                {study.overview}
              </p>
            </div>

            {/* Transparent Status Notice */}
            <div className="p-4 rounded-xl bg-white border border-[#E3DCD3] flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#424965]">
                <ShieldCheck className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <span>
                  <strong>Independent Concept:</strong> Built by Skovento to demonstrate architecture and UI standards without fictional client claims.
                </span>
              </div>
              <Link href="/contact" className="shrink-0 font-bold text-[#4F46E5] hover:underline">
                Request Similar System →
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Breakdown Sections */}
        <section className="py-16 sm:py-24 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* 1. Problem & Objective */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-7 rounded-2xl border border-[#E3DCD3] bg-white space-y-3 shadow-2xs">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                  01 · The Business Problem
                </span>
                <h2 className="text-xl font-bold text-[#16203D]">
                  Operational Friction
                </h2>
                <p className="text-sm text-[#424965] leading-relaxed">
                  {study.problem}
                </p>
              </div>

              <div className="p-7 rounded-2xl border border-[#E3DCD3] bg-white space-y-3 shadow-2xs">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                  02 · Project Objective
                </span>
                <h2 className="text-xl font-bold text-[#16203D]">
                  Target Outcome
                </h2>
                <p className="text-sm text-[#424965] leading-relaxed">
                  {study.objective}
                </p>
              </div>
            </div>

            {/* 2. Proposed Solution */}
            <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-white space-y-4 shadow-2xs">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                03 · Architectural Solution
              </span>
              <h2 className="text-2xl font-bold text-[#16203D]">
                How we solved the challenge
              </h2>
              <p className="text-sm sm:text-base text-[#424965] leading-relaxed">
                {study.solution}
              </p>
            </div>

            {/* 3. Features & User Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-white space-y-4 shadow-2xs">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                  04 · Key Features
                </span>
                <h2 className="text-xl font-bold text-[#16203D]">
                  Functional Capabilities
                </h2>
                <ul className="space-y-3 text-sm text-[#424965]">
                  {study.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-2xl border border-[#E3DCD3] bg-[#F3EFEA] space-y-4 shadow-2xs">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4F46E5]">
                  05 · User Experience
                </span>
                <h2 className="text-xl font-bold text-[#16203D]">
                  Interaction Design
                </h2>
                <p className="text-sm text-[#424965] leading-relaxed">
                  {study.userExperience}
                </p>

                <div className="pt-4 border-t border-[#E3DCD3]">
                  <span className="text-xs font-mono text-[#16203D] font-bold block mb-2">
                    Technology Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {study.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-white border border-[#E3DCD3] text-xs font-medium text-[#16203D]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Implementation Details & Limitations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-7 rounded-2xl border border-[#E3DCD3] bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#16203D]">
                  <Code2 className="w-4 h-4 text-[#4F46E5]" />
                  <span>Implementation Details</span>
                </div>
                <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                  {study.implementationDetails}
                </p>
              </div>

              <div className="p-7 rounded-2xl border border-[#E3DCD3] bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#16203D]">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Limitations &amp; Scope</span>
                </div>
                <p className="text-xs sm:text-sm text-[#424965] leading-relaxed">
                  {study.limitations}
                </p>
              </div>
            </div>

            {/* Bottom Contact Callout */}
            <div className="p-8 sm:p-10 rounded-2xl border border-[#E3DCD3] bg-[#F3EFEA] text-center space-y-5">
              <h3 className="text-2xl font-bold text-[#16203D]">
                Interested in building a similar system for your business?
              </h3>
              <p className="text-sm text-[#424965] max-w-xl mx-auto leading-relaxed">
                We can adapt this architecture to your business specifications, custom workflows, and database needs.
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
      </main>

      <Footer />
    </div>
  );
}
