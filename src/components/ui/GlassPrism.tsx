'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * The hero's centrepiece: a refractive glass object that drifts and catches
 * light as the pointer moves.
 *
 * WHY THIS ISN'T THREE.JS
 *
 * The obvious way to build "a 3D glass object" is React Three Fiber. For a
 * single decorative hero element, that's the wrong trade:
 *
 *   - three.js is ~600KB before you write a line of scene code. On the hero of
 *     a page whose selling point is a sub-2.5s LCP on 4G, that's most of the
 *     budget spent on decoration.
 *   - A <canvas> is opaque to every crawler. Anything inside it may as well not
 *     exist for SEO.
 *   - WebGL context creation blocks the main thread on low-end Android — the
 *     majority of Indian mobile traffic.
 *
 * This is layered SVG with gaussian blur, feTurbulence displacement for the
 * refraction, and CSS transforms for the parallax. It weighs a few KB, renders
 * on the GPU compositor, degrades to a static image with no JavaScript, and
 * reads as genuinely three-dimensional because the light behaves consistently.
 *
 * Save real WebGL for a page where the 3D IS the content — a product
 * configurator, a case-study showcase — not for a hero ornament.
 */

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function GlassPrism({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Capability gate. Skip all motion on reduced-motion, data-saver, or a
    // low-memory device — which is most budget Android hardware in India.
    const prefersReduced = window.matchMedia(REDUCED_MOTION).matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const lowMemory =
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) < 4;

    if (prefersReduced || conn?.saveData || lowMemory) return;

    requestAnimationFrame(() => setAnimate(true));

    // Pointer parallax, throttled to the frame via rAF. Listening on window
    // rather than the element means the object reacts to the whole hero area,
    // which reads as the object sitting in the space rather than responding to
    // a hover target.
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        setTilt({ x: nx, y: ny });
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{
        transform: `perspective(1200px) rotateY(${tilt.x * 7}deg) rotateX(${-tilt.y * 7}deg) translate3d(${tilt.x * 12}px, ${tilt.y * 12}px, 0)`,
        transition: 'transform 600ms cubic-bezier(0.2, 0, 0, 1)',
        willChange: 'transform',
      }}
    >
      <svg viewBox="0 0 460 460" className="h-full w-full" fill="none">
        <defs>
          {/* Refraction: turbulence displaces the layer beneath, which is what
              makes light appear to bend through the glass rather than just
              blur behind it. This is the difference between "frosted" and
              "glass". */}
          <filter id="sk-refract" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves={3}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={22}
              xChannelSelector="R"
              yChannelSelector="G"
            />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>

          <linearGradient id="sk-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C24FBE" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#8A2B88" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#1E2E6B" stopOpacity="0.55" />
          </linearGradient>

          <linearGradient id="sk-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#C88770" stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="sk-glow" cx="0.35" cy="0.3" r="0.75">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <filter id="sk-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>

        {/* Ambient bloom behind the object — this is what sells "lit from
            within" more than any highlight on the surface. */}
        <ellipse
          cx="230"
          cy="240"
          rx="165"
          ry="150"
          fill="#8A2B88"
          opacity="0.32"
          filter="url(#sk-soft)"
          className={animate ? 'sk-breathe' : undefined}
        />

        {/* Refracted core */}
        <g filter="url(#sk-refract)" opacity="0.92">
          <path
            d="M230 62c62 0 116 34 145 86 29 52 26 118-6 168-32 50-92 82-152 78-60-4-116-42-142-96-26-54-16-120 22-166C135 86 178 62 230 62Z"
            fill="url(#sk-body)"
          />
        </g>

        {/* Light-catching edge — the single detail that reads as "glass"
            rather than "coloured blob". */}
        <path
          d="M230 62c62 0 116 34 145 86 29 52 26 118-6 168-32 50-92 82-152 78-60-4-116-42-142-96-26-54-16-120 22-166C135 86 178 62 230 62Z"
          stroke="url(#sk-edge)"
          strokeWidth="1.6"
          fill="none"
        />

        {/* Specular highlight, offset from the light source */}
        <ellipse
          cx="176"
          cy="158"
          rx="72"
          ry="52"
          fill="url(#sk-glow)"
          transform="rotate(-24 176 158)"
        />

        {/* Two orbiting facets, giving depth cues as the object tilts */}
        <g className={animate ? 'sk-orbit' : undefined} style={{ transformOrigin: '230px 240px' }}>
          <rect
            x="292" y="132" width="66" height="66" rx="18"
            fill="rgba(255,255,255,0.09)"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.2"
            transform="rotate(24 325 165)"
          />
          <rect
            x="94" y="288" width="48" height="48" rx="14"
            fill="rgba(255,255,255,0.07)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
            transform="rotate(-16 118 312)"
          />
        </g>
      </svg>

      <style>{`
        @keyframes sk-breathe {
          0%, 100% { opacity: 0.30; transform: scale(1); }
          50%      { opacity: 0.44; transform: scale(1.05); }
        }
        .sk-breathe {
          animation: sk-breathe 7s ease-in-out infinite;
          transform-origin: 230px 240px;
        }
        @keyframes sk-orbit {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50%      { transform: rotate(4deg) translateY(-10px); }
        }
        .sk-orbit { animation: sk-orbit 11s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .sk-breathe, .sk-orbit { animation: none; }
        }
      `}</style>
    </div>
  );
}
