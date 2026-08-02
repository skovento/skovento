'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export const scrollToHash = (hash: string) => {
  if (!hash) return;
  let el: Element | null = null;
  try {
    el = document.querySelector(hash);
  } catch {
    return;
  }
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: -88 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Intercept same-page hash link clicks so Lenis drives the scroll instead of the browser snapping past it
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      if (url.pathname !== window.location.pathname || !url.hash) return;

      e.preventDefault();
      history.pushState(null, '', url.hash);
      scrollToHash(url.hash);
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      lenis.destroy();
      lenisInstance = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Handle deep-links (e.g. /#pricing) after navigating to a new page
  useEffect(() => {
    if (!window.location.hash) return;
    const hash = window.location.hash;
    const id = setTimeout(() => scrollToHash(hash), 350);
    return () => clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
};
