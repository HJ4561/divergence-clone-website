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
// MAIN PROBLEMS GRID COMPONENT
// ============================================================
interface ProblemsGridProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function ProblemsGrid({ data, loading = false }: ProblemsGridProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-10 md:mb-14">
              <div className="h-4 w-32 bg-ink-800 rounded mb-4"></div>
              <div className="h-10 w-2/3 bg-ink-800 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-ink-800 rounded-xl"></div>
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
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Problem statements not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API built_for_production items to the format expected by the UI
  const problems = data.built_for_production && data.built_for_production.length > 0
    ? data.built_for_production.map((item, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: item.heading,
        description: item.description,
      }))
    : [];

  // If no problems, show empty state
  if (problems.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No problem statements available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-4">
            &sect; 02 / BOTTLENECKS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            Not Moonshots — Bottlenecks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative bg-ink-950 p-6 md:p-8 overflow-hidden transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="pointer-events-none absolute -top-3 right-4 text-7xl md:text-8xl font-semibold text-white/[0.04] select-none leading-none">
                {problem.number}
              </span>

              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs font-mono text-teal-300/90 tracking-widest">
                    {problem.number}
                  </span>
                  <span className="h-px w-6 bg-teal-400/40 transition-all duration-300 group-hover:w-10" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}