// src/components/platform/ProblemsGrid.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface BuiltForProduction {
  id: number;
  heading: string;
  description: string;
  icon: string;
  image: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface PlatformSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  operating_benefits: any[];
  work_with_us: any[];
  coming_soon: any[];
  demonstrations: any[];
  built_for_production: BuiltForProduction[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// HELPERS
// ============================================================
// Derives a short spec tag from the icon class, e.g. "fas fa-lock" -> "LOCK"
function deriveSpecTag(icon: string) {
  const match = (icon || '').match(/fa-([\w-]+)$/);
  if (!match) return null;
  return match[1].replace(/-/g, ' ').toUpperCase();
}

// ============================================================
// MESH BACKDROP — faint node grid, the section's signature element
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
          <pattern id="meshgrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="rgba(94,234,212,0.14)"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.4" fill="rgba(94,234,212,0.35)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meshgrid)" />
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
        {String(count).padStart(2, '0')} IDENTIFIED
      </span>
    </div>
  );
}

// ============================================================
// MAIN PROBLEMS GRID COMPONENT
// ============================================================
interface ProblemsGridProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function ProblemsGrid({ data, loading = false }: ProblemsGridProps) {
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

  if (!data) {
    return (
      <section className="py-20 md:py-32 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 border border-dashed border-white/10">
            <p className="text-gray-400 font-mono text-sm">&sol;&sol; problem statements not available</p>
          </div>
        </div>
      </section>
    );
  }

  const problems = data.built_for_production && data.built_for_production.length > 0
    ? data.built_for_production
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item, index) => ({
          number: String(index + 1).padStart(2, '0'),
          title: item.heading,
          description: item.description,
          tag: deriveSpecTag(item.icon),
        }))
    : [];

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

  return (
    <section className="relative py-20 md:py-32 bg-ink-950 border-t border-white/10 overflow-hidden">
      <MeshBackdrop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 02 / BOTTLENECKS
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1]">
            Not Moonshots — Bottlenecks
          </h2>
          {data.description && (
            <p className="mt-4 text-base md:text-lg text-gray-400 leading-relaxed">
              {data.description}
            </p>
          )}
          <DimensionRule count={problems.length} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              tabIndex={0}
              className="group relative border border-white/10 bg-ink-950/60 backdrop-blur-sm p-8 md:p-9 transition-colors duration-300 hover:border-teal-300/40 focus-within:border-teal-300/40 focus:outline-none"
            >
              {/* registration marks — permanent, brighten on hover/focus */}
              <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-white/20 group-hover:border-teal-300 group-focus-within:border-teal-300 transition-colors duration-300" />
              <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-white/20 group-hover:border-teal-300 group-focus-within:border-teal-300 transition-colors duration-300" />
              <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-white/20 group-hover:border-teal-300 group-focus-within:border-teal-300 transition-colors duration-300" />
              <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-white/20 group-hover:border-teal-300 group-focus-within:border-teal-300 transition-colors duration-300" />

              {/* status chip */}
              <span className="absolute top-4 right-4 text-[10px] font-mono tracking-[0.1em] text-teal-300/70 border border-teal-300/20 bg-teal-300/[0.06] px-2 py-0.5">
                IN PROD
              </span>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-mono font-semibold text-teal-300/80 tabular-nums">
                  {problem.number}
                </span>
                <span className="text-xs font-mono text-white/30 tracking-widest">
                  / BOTTLENECK
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug pr-16">
                {problem.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                {problem.description}
              </p>

              {problem.tag && (
                <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.15em] text-white/30">
                    BOT.{problem.number} &middot; {problem.tag}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-300/60 group-hover:bg-teal-300 transition-colors duration-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}