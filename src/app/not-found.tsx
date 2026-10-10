'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 text-center selection:bg-indigo-100 selection:text-[#16203D]">
      <div className="max-w-md w-full p-8 bg-white border border-[#E3DCD3] rounded-3xl space-y-6 shadow-sm">
        <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 text-[#4F46E5] rounded-2xl flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#16203D] font-sans">
          Page Not Found
        </h1>

        <p className="text-sm text-[#424965] leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button size="md" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>

          <Link href="/services">
            <Button size="md" variant="outline" icon={<Compass className="w-4 h-4" />}>
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
