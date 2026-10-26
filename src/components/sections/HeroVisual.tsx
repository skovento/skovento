'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Animated terminal: types each line in turn, then loops. Static when reduced motion is on. */
export function HeroVisual({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? lines.length : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setShown((n) => (n >= lines.length + 2 ? 0 : n + 1));
    }, 900);
    return () => clearInterval(id);
  }, [lines.length, reduce]);

  const visible = lines.slice(0, Math.min(shown, lines.length));

  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-accent/25 via-transparent to-accent-2/20 blur-2xl" />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="card relative overflow-hidden bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
          <span className="ml-3 font-mono text-xs text-faint">delivery — zsh</span>
        </div>
        <div className="min-h-[250px] space-y-2 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          {visible.map((l, i) => (
            <motion.p
              key={`${l}-${i}`}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={l.startsWith('$') ? 'text-fg' : l.startsWith('✓') ? 'text-ok' : 'text-accent-2'}
            >
              {l}
            </motion.p>
          ))}
          <p className="text-accent-2">
            <span className="caret">▍</span>
          </p>
        </div>
      </motion.div>

      <div className="animate-float absolute -right-3 -top-5 hidden rounded-xl border border-line-strong bg-raised/90 px-4 py-3 shadow-xl backdrop-blur sm:block">
        <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Performance</p>
        <p className="font-display text-sm font-semibold text-ok">Budgeted up front</p>
      </div>
      <div className="animate-float absolute -bottom-5 -left-3 hidden rounded-xl border border-line-strong bg-raised/90 px-4 py-3 shadow-xl backdrop-blur [animation-delay:-3s] sm:block">
        <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Pipeline</p>
        <p className="font-display text-sm font-semibold text-fg">All checks passed</p>
      </div>
    </div>
  );
}
