'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#16203D] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center mb-2">
          <Logo size="lg" />
        </div>

        <div className="p-4 bg-[#F3EFEA] border border-[#E3DCD3] rounded-3xl inline-block shadow-sm">
          <span className="text-6xl font-extrabold text-[#8A2B88] font-mono">404</span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#16203D] font-sans">
          Page Not Found
        </h1>

        <p className="text-sm text-[#424965] leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back on track.
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
