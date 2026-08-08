// src/components/platform/PlatformStats.tsx
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
// MAIN PLATFORM STATS COMPONENT
// ============================================================
interface PlatformStatsProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function PlatformStats({ data, loading = false }: PlatformStatsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-ink-800/50 rounded-xl p-6 text-center">
                  <div className="h-8 w-16 bg-ink-800 rounded mx-auto mb-2"></div>
                  <div className="h-4 w-32 bg-ink-800 rounded mx-auto"></div>
                  <div className="h-3 w-48 bg-ink-800 rounded mx-auto mt-1"></div>
                </div>
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
      <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Platform statistics not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API operating_benefits to stats format
  const stats = data.operating_benefits && data.operating_benefits.length > 0
    ? data.operating_benefits.map((benefit) => ({
        value: benefit.impact || benefit.heading,
        title: benefit.heading,
        description: benefit.description,
      }))
    : [];

  // If no stats, show empty state
  if (stats.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No platform statistics available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-ink-950 rounded-xl border border-white/10 p-6 text-center group hover:border-teal-400/30 transition-all duration-300"
            >
              <div className="font-serif text-2xl md:text-3xl font-semibold text-teal-300 mb-2 group-hover:text-teal-200 transition-colors duration-300">
                {stat.value}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-teal-300 transition-colors duration-300">
                {stat.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        {data.description && (
          <p className="text-center text-gray-500 text-xs font-mono tracking-wide mt-8">
            {data.description}
          </p>
        )}
      </div>
    </section>
  );
}