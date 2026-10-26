import type { CSSProperties, ReactNode } from 'react';

/**
 * Scroll-in effect without a JS animation library: this only tags the element, a tiny observer
 * (RevealInit) adds `.is-in` when it scrolls into view, and CSS does the rest. Content stays fully
 * visible without JavaScript and for reduced-motion users (see globals.css).
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined;
  return (
    <div data-reveal className={className} style={style}>
      {children}
    </div>
  );
}
