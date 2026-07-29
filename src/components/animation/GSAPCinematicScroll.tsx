'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const GSAPCinematicScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger after DOM load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // 1. Hero Parallax Scroll Effect
    gsap.to('.hero-parallax-bg', {
      scrollTrigger: {
        trigger: 'section:first-of-type',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 120,
      opacity: 0.4
    });

    // 2. Section Headers 3D Scroll Reveal
    const headers = document.querySelectorAll('h2');
    headers.forEach((header) => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 40, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // 3. 3D Cards Stagger Reveal & Scale Parallax
    const cardGrids = document.querySelectorAll('.perspective-\\[1000px\\], .perspective-\\[1200px\\]');
    cardGrids.forEach((grid) => {
      const cards = grid.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, rotateX: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <div className="cinematic-wrapper">{children}</div>;
};
