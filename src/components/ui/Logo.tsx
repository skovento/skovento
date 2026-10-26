/* eslint-disable @next/next/no-img-element -- SVG logo: no optimisation needed, stays crisp at every size */
export function Logo({ name, height = 44 }: { name: string; height?: number }) {
  // Landscape lockup (icon + wordmark). The viewBox is 1474×360.
  const width = Math.round((height * 1474) / 360);
  return <img src="/brand/logo-dark.svg" alt={name} width={width} height={height} className="block h-auto max-w-none" style={{ height, width }} decoding="async" />;
}
