export function Logo({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="2" y1="2" x2="30" y2="30">
            <stop stopColor="#5b9bff" /><stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="9" fill="#0b1220" stroke="url(#lg)" strokeWidth="1.5" />
        <path d="M21 10.5c-1.2-1.3-3-2-5-2-3 0-5 1.5-5 3.8 0 5.2 10.4 2.6 10.4 7.9 0 2.4-2.2 4-5.4 4-2.2 0-4.2-.8-5.6-2.3" stroke="url(#lg)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">{name}</span>
    </span>
  );
}
