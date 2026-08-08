// src/components/platform/ScaleImpact.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface OperatingBenefit {
  id: number;
  heading: string;
  description: string;
  impact: string;
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
  operating_benefits: OperatingBenefit[];
  work_with_us: any[];
  coming_soon: any[];
  demonstrations: any[];
  built_for_production: any[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN SCALE IMPACT COMPONENT
// ============================================================
interface ScaleImpactProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function ScaleImpact({ data, loading = false }: ScaleImpactProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-10"></div>
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
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Scale Impact content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API operating_benefits to the format expected by the UI
  const items = data.operating_benefits && data.operating_benefits.length > 0
    ? data.operating_benefits.map((benefit) => ({
        title: benefit.heading,
        description: benefit.description,
        impact: benefit.impact || "Enhanced simulation efficiency",
      }))
    : [];

  // If no items, show empty state
  if (items.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No operating benefits available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 04 / OPERATING BENEFITS
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-white max-w-3xl">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden">
          {items.map((item) => (
            <div
              key={item.title}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
                {item.description}
              </p>
              <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-teal-300 text-xs font-mono tracking-wide">
                  Impact: {item.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}