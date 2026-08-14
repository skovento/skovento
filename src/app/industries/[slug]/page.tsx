import React from 'react';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, industriesData } from '@/data/industries';
import { IndustryClientPage } from './IndustryClientPage';

export function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return {
      title: 'Industry Solution Not Found | Skovento',
    };
  }

  return {
    title: `${industry.name} Digital Solutions & Web Development | Skovento`,
    description: `How Skovento solves digital bottlenecks for ${industry.name.toLowerCase()} businesses. ${industry.solution}`,
  };
}

export default async function IndustrySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return <IndustryClientPage industry={industry} />;
}
