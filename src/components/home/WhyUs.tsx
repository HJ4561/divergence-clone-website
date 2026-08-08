// src/components/home/WhyUs.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response
// ============================================================
interface WhyUsCard {
  id: number;
  why_us_section: number;
  number: string;
  title: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface WhyUsData {
  id: number;
  heading: string;
  is_active: boolean;
  cards: WhyUsCard[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// MAIN WHY US COMPONENT
// ============================================================
interface WhyUsProps {
  data?: WhyUsData | null;
  loading?: boolean;
}

export default function WhyUs({ data, loading = false }: WhyUsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-6 md:mb-8">
              <div className="h-4 w-32 bg-ink-800 rounded"></div>
            </div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-10"></div>
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
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Why Us content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API cards to reasons format
  const reasons = data.cards && data.cards.length > 0
    ? data.cards.map((card) => ({
        number: card.number.padStart(2, '0'),
        title: card.title,
        description: card.description,
        // Generate tags from description
        tags: card.description
          .split(' ')
          .filter(word => word.includes('-') || word.includes('PhD') || word.includes('Fortune'))
          .slice(0, 4)
          .map(word => word.replace(/[,.]/g, '')),
        // Add link to first card only
        link: card.order === 1 
          ? { label: "Meet the team →", to: "/about" } 
          : undefined,
      }))
    : [];

  // If no cards, show empty state
  if (reasons.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No Why Us cards available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-ink-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <span className="text-xs md:text-sm text-teal-300 font-mono tracking-[0.15em]">
            &sect; 07 / WHY US
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 md:mb-12 text-white">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <span className="text-xs font-mono text-teal-300/90 tracking-widest mb-5">
                {reason.number}
              </span>

              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                {reason.description}
              </p>

              {reason.tags && reason.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {reason.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-gray-400 border border-white/10 rounded-full px-2.5 py-1 group-hover:border-teal-400/30 group-hover:text-teal-300 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {reason.link && (
                <Link
                  to={reason.link.to}
                  className="inline-block text-teal-300 hover:text-teal-200 transition-colors text-sm mt-5 underline underline-offset-2"
                >
                  {reason.link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}