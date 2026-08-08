// src/components/platform/TwoWaysToWork.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface WorkWithUs {
  id: number;
  heading: string;
  description: string;
  title: string;
  icon: string;
  image: string | null;
  cta_label: string;
  cta_link: string;
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
  work_with_us: WorkWithUs[];
  coming_soon: any[];
  demonstrations: any[];
  built_for_production: any[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN TWO WAYS TO WORK COMPONENT
// ============================================================
interface TwoWaysToWorkProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function TwoWaysToWork({ data, loading = false }: TwoWaysToWorkProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-ink-800 rounded mb-6"></div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-ink-800 rounded mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 bg-ink-800 rounded-xl"></div>
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
            <p className="text-gray-400">Work With Us content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API work_with_us items to the format expected by the UI
  const items = data.work_with_us && data.work_with_us.length > 0
    ? data.work_with_us.map((item) => ({
        type: item.title || item.heading,
        title: item.heading,
        description: item.description,
        cta_label: item.cta_label,
        cta_link: item.cta_link,
      }))
    : [];

  // If no items, show empty state
  if (items.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No work options available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-ink-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em] mb-5 md:mb-6">
          &sect; 05 / WORK WITH US
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white">
          {data.heading}
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          {data.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {items.map((item, index) => (
            <div
              key={index}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <span className="text-[11px] font-mono text-teal-300/90 tracking-widest mb-3">
                {item.type}
              </span>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
                {item.cta_link === "/app/signup" ? (
                  <>
                    <Link
                      to={item.cta_link}
                      className="bg-cream hover:bg-cream-dark text-ink-950 font-medium px-5 py-2.5 rounded-lg transition-colors duration-200 text-sm text-center"
                    >
                      {item.cta_label || "Start Free Trial"}
                    </Link>
                    <Link
                      to="/contact"
                      className="bg-transparent hover:bg-white/5 text-white font-medium px-5 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm text-center"
                    >
                      See Demo
                    </Link>
                  </>
                ) : (
                  <Link
                    to={item.cta_link}
                    className="inline-block bg-transparent hover:bg-white/5 text-white font-medium px-5 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 text-sm"
                  >
                    {item.cta_label || "Explore Services"}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}