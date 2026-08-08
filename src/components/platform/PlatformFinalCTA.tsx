// src/components/platform/PlatformFinalCTA.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface PlatformSectionData {
  id: number;
  heading: string;
  description: string;
  is_active: boolean;
  operating_benefits: any[];
  work_with_us: any[];
  coming_soon: any[];
  demonstrations: any[];
  built_for_production: any[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN PLATFORM FINAL CTA COMPONENT
// ============================================================
interface PlatformFinalCTAProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function PlatformFinalCTA({ data, loading = false }: PlatformFinalCTAProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-ink-900 bg-grid border-t border-white/10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 w-2/3 bg-ink-800 rounded mx-auto mb-4"></div>
            <div className="h-4 w-1/2 bg-ink-800 rounded mx-auto mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
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
      <section className="relative overflow-hidden bg-ink-900 bg-grid border-t border-white/10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">CTA content not available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-ink-900 bg-grid border-t border-white/10 py-16 md:py-24">
      <div className="pointer-events-none absolute -top-10 left-0 w-[480px] h-[480px] bg-teal-400/[0.06] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          {data.heading}
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          {data.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          <div className="bg-ink-950 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-2">Schedule a Demo</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Get a personalized demo and discuss your specific simulation needs.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-cream hover:bg-cream-dark text-ink-950 font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm"
            >
              Schedule Demo &rarr;
            </Link>
          </div>

          <div className="bg-ink-950 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-2">Start Your Free Trial</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Experience the power of AI simulation with unlimited access for 14 days.
            </p>
            <Link
              to="/app/signup"
              className="inline-block bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-300 hover:to-blue-400 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 text-sm"
            >
              Start Free Trial &rarr;
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono tracking-[0.1em] text-gray-400 uppercase mt-8 pt-6 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <span className="text-teal-300">&#10003;</span> No payment charged until your trial ends
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-teal-300">&#10003;</span> Full feature access during trial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-teal-300">&#10003;</span> Setup support included
          </span>
        </div>
      </div>
    </section>
  );
}