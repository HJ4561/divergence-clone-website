// src/components/home/Stats.tsx
import React from 'react';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface StatItem {
  id: number;
  statistic: number;
  value: string;
  label: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface StatisticData {
  id: number;
  heading: string;
  sub_heading: string;
  is_active: boolean;
  stats: StatItem[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN STATS COMPONENT
// ============================================================
interface StatsProps {
  data?: StatisticData | null;
  loading?: boolean;
}

export default function Stats({ data, loading = false }: StatsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-16 w-32 bg-ink-800 rounded mx-auto mb-2"></div>
                  <div className="h-4 w-48 bg-ink-800 rounded mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="h-4 w-64 bg-ink-800 rounded mx-auto mt-8"></div>
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
            <p className="text-gray-400">Statistics content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API stats to the format expected by the UI
  const stats = data.stats && data.stats.length > 0
    ? data.stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
      }))
    : [];

  // If no stats, show empty state
  if (stats.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No statistics available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="font-serif text-4xl md:text-6xl font-semibold text-teal-300 mb-2 group-hover:text-teal-200 transition-colors duration-300">
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        {data.sub_heading && (
          <p className="text-center text-gray-500 text-xs font-mono tracking-wide mt-8">
            {data.sub_heading}
          </p>
        )}
      </div>
    </section>
  );
}