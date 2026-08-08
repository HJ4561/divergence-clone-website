// src/components/platform/IndustriesStrip.tsx
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
// MAIN INDUSTRIES STRIP COMPONENT
// ============================================================
interface IndustriesStripProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function IndustriesStrip({ data, loading = false }: IndustriesStripProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-10 md:py-12 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-24 bg-ink-800 rounded-full"></div>
              ))}
            </div>
            <div className="max-w-2xl mx-auto h-16 bg-ink-800 rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  // If no data provided, show error state
  if (!data) {
    return (
      <section className="py-10 md:py-12 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-6">
            <p className="text-gray-400">Industries content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Extract industry names from operating_benefits
  const industries = data.operating_benefits && data.operating_benefits.length > 0
    ? data.operating_benefits.map((benefit) => benefit.heading)
    : [];

  // If no industries, show empty state
  if (industries.length === 0) {
    return (
      <section className="py-10 md:py-12 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-6">
            <p className="text-gray-400">No industries available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {industries.map((name) => (
            <span
              key={name}
              className="text-[11px] md:text-xs font-mono tracking-wide text-gray-400 uppercase border border-white/10 rounded-full px-3 py-1"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-ink-950 border border-white/10 border-l-2 border-l-teal-400/50 rounded-lg px-5 py-4">
          <p className="text-center text-gray-400 text-xs md:text-sm leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
}