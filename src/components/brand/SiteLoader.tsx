import { CHECK_PATH, LOGO_VIEWBOX, MARK_TRANSFORM, S_PATH, WORD_GLYPHS } from '@/lib/brand-paths';
import { LoaderDismiss } from './LoaderDismiss';

/**
 * First-visit intro: the logo draws itself (S, then the check-mark V, then the wordmark) and the
 * overlay fades away. Pure CSS animation, rendered in the server HTML, so there is no flash and it
 * also dismisses itself with JavaScript disabled. Returning visitors, crawlers, Lighthouse and
 * "reduce motion" users never see it (see the inline script in app/layout.tsx).
 */
export function SiteLoader() {
  return (
    <div id="sk-loader" role="status" aria-live="polite">
      <span className="sr-only">Loading Skovento</span>
      <div className="sk-stage">
        <svg className="sk-logo" viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="sk-g" gradientUnits="userSpaceOnUse" x1="13" y1="6.5" x2="104.5" y2="88.5">
              <stop offset="0" stopColor="#9b8cff" />
              <stop offset=".55" stopColor="#6c8bff" />
              <stop offset="1" stopColor="#2fb8ff" />
            </linearGradient>
            <linearGradient id="sk-c" gradientUnits="userSpaceOnUse" x1="13" y1="6.5" x2="104.5" y2="88.5">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#4c8dff" />
            </linearGradient>
            <mask id="sk-m" maskUnits="userSpaceOnUse" x="0" y="0" width="110" height="100">
              <rect width="110" height="100" fill="#fff" />
              <path className="sk-check" pathLength={1} d={CHECK_PATH} fill="none" stroke="#000" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
            </mask>
          </defs>
          <g transform={MARK_TRANSFORM}>
            <g mask="url(#sk-m)">
              <path className="sk-s" pathLength={1} d={S_PATH.d} transform={S_PATH.transform} fill="none" stroke="url(#sk-g)" strokeWidth="13" strokeLinecap="round" />
            </g>
            <path className="sk-check" pathLength={1} d={CHECK_PATH} fill="none" stroke="url(#sk-c)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g fill="#fff">
            {WORD_GLYPHS.map((g, i) => (
              <g key={i} className="sk-glyph" style={{ animationDelay: `${1.25 + i * 0.07}s` }}>
                <path transform={g.transform} d={g.d} />
              </g>
            ))}
          </g>
        </svg>
        <div className="sk-bar" aria-hidden="true"><span /></div>
      </div>
      <LoaderDismiss />
    </div>
  );
}
