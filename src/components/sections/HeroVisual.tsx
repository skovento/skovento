/**
 * Animated terminal for the hero. Pure CSS (no JavaScript): each line fades in one after another.
 * Server-rendered so it adds nothing to the JS bundle and cannot delay interaction.
 */
export function HeroVisual({ lines }: { lines: string[] }) {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-accent/25 via-transparent to-accent-2/20 blur-2xl" />
      <div className="card relative overflow-hidden bg-surface shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
          <span className="ml-3 font-mono text-xs text-faint">delivery — zsh</span>
        </div>
        <div className="min-h-[250px] space-y-2 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          {lines.map((l, i) => (
            <p
              key={`${l}-${i}`}
              className={`term-line ${l.startsWith('$') ? 'text-fg' : l.startsWith('✓') ? 'text-ok' : 'text-accent-2'}`}
              style={{ animationDelay: `${0.35 + i * 0.7}s` }}
            >
              {l}
            </p>
          ))}
          <p className="text-accent-2"><span className="caret">▍</span></p>
        </div>
      </div>

      <div className="animate-float absolute -right-3 -top-5 hidden rounded-xl border border-line-strong bg-raised/90 px-4 py-3 shadow-xl sm:block">
        <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Performance</p>
        <p className="font-display text-sm font-semibold text-ok">Budgeted up front</p>
      </div>
      <div className="animate-float absolute -bottom-5 -left-3 hidden rounded-xl border border-line-strong bg-raised/90 px-4 py-3 shadow-xl [animation-delay:-3s] sm:block">
        <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Pipeline</p>
        <p className="font-display text-sm font-semibold text-fg">All checks passed</p>
      </div>
    </div>
  );
}
