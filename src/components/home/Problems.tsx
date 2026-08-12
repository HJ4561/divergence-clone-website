// src/components/home/Problems.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface ProblemQuote {
  id: number;
  problem_statement: number;
  quote_text: string;
  author: string;
  author_title: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface ProblemStatementData {
  id: number;
  heading: string;
  sub_heading: string;
  is_active: boolean;
  quotes: ProblemQuote[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MESH BACKDROP — faint node grid, shared signature element
// ============================================================
function MeshBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
      }}
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="meshgrid-quotes" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="rgba(94,234,212,0.14)"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.4" fill="rgba(94,234,212,0.35)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meshgrid-quotes)" />
      </svg>
    </div>
  );
}

// ============================================================
// DIMENSION-LINE DIVIDER — ruler-style rule under the heading
// ============================================================
function DimensionRule({ count }: { count: number }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <span
        className="h-2.5 w-full max-w-[220px] bg-[repeating-linear-gradient(90deg,rgba(94,234,212,0.55)_0px,rgba(94,234,212,0.55)_1px,transparent_1px,transparent_11px)] border-b border-teal-300/30"
        aria-hidden="true"
      />
      <span className="shrink-0 text-[11px] font-mono text-teal-300/70 tracking-[0.15em] tabular-nums">
        {String(count).padStart(2, '0')} VOICES
      </span>
    </div>
  );
}

// ============================================================
// MAIN PROBLEMS COMPONENT
// ============================================================
interface ProblemsProps {
  data?: ProblemStatementData | null;
  loading?: boolean;
}

export default function Problems({ data, loading = false }: ProblemsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative py-20 md:py-32 bg-ink-950 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="animate-pulse">
            <div className="mb-16 md:mb-20">
              <div className="h-4 w-32 bg-ink-800 rounded mb-5"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
              <div className="h-4 w-1/2 bg-ink-800 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-ink-800"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="py-20 md:py-32 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 border border-dashed border-white/10">
            <p className="text-gray-400 font-mono text-sm">&sol;&sol; problem statement content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API quotes, sorted by their intended order
  const problems = data.quotes && data.quotes.length > 0
    ? data.quotes
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((quote, index) => ({
          number: String(index + 1).padStart(2, '0'),
          quote: quote.quote_text,
          author: quote.author,
          authorTitle: quote.author_title,
        }))
    : [];

  // If no quotes, show empty state
  if (problems.length === 0) {
    return (
      <section className="py-20 md:py-32 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 border border-dashed border-white/10">
            <p className="text-gray-400 font-mono text-sm">&sol;&sol; no problem statements available</p>
          </div>
        </div>
      </section>
    );
  }

  // Split heading for display (falls back gracefully if there's no em dash)
  const headingParts = data.heading.split('—');
  const headingBefore = headingParts[0]?.trim() || data.heading;
  const headingAfter = headingParts[1]?.trim();

  return (
    <section className="relative py-20 md:py-32 bg-ink-950 border-t border-white/10 overflow-hidden">
      <MeshBackdrop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 02 / BOTTLENECKS
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1]">
            {headingAfter ? (
              <>
                {headingBefore} — <span className="text-teal-300">{headingAfter}</span>
              </>
            ) : (
              headingBefore
            )}
          </h2>
          {data.sub_heading && (
            <p className="mt-4 text-base md:text-lg text-gray-400 leading-relaxed">
              {data.sub_heading}
            </p>
          )}
          <DimensionRule count={problems.length} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative border border-white/10 bg-ink-950/60 backdrop-blur-sm p-8 md:p-9 transition-colors duration-300 hover:border-teal-300/40 animate-card-enter"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* registration marks — permanent, brighten on hover */}
              <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-white/20 group-hover:border-teal-300 transition-colors duration-300" />
              <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-white/20 group-hover:border-teal-300 transition-colors duration-300" />
              <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-white/20 group-hover:border-teal-300 transition-colors duration-300" />
              <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-white/20 group-hover:border-teal-300 transition-colors duration-300" />

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-mono font-semibold text-teal-300/80 tabular-nums">
                  {problem.number}
                </span>
                <span className="text-xs font-mono text-white/30 tracking-widest">
                  / FIELD NOTE
                </span>
              </div>

              <svg
                className="h-6 w-6 text-teal-300/30 mb-3"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.5 7C6.5 8.5 5 11 5 14c0 2.2 1.3 3.5 3 3.5 1.6 0 2.8-1.2 2.8-2.8 0-1.5-1-2.6-2.4-2.7.2-1.6 1.4-3 3.1-3.9L9.5 7zm9 0c-3 1.5-4.5 4-4.5 7 0 2.2 1.3 3.5 3 3.5 1.6 0 2.8-1.2 2.8-2.8 0-1.5-1-2.6-2.4-2.7.2-1.6 1.4-3 3.1-3.9L18.5 7z" />
              </svg>

              <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-7">
                {problem.quote}
              </p>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-white">{problem.author}</p>
                {problem.authorTitle && (
                  <p className="text-xs font-mono text-white/40 tracking-wide mt-0.5">
                    {problem.authorTitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes card-enter {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-card-enter {
          animation: card-enter 0.6s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-card-enter {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}