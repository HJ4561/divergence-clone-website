// src/components/platform/CustomModels.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// TYPES - Based on API response from /api/platform/sections/
// ============================================================
interface ComingSoon {
  id: number;
  heading: string;
  description: string;
  title: string;
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
  coming_soon: ComingSoon[];
  demonstrations: any[];
  built_for_production: any[];
  pricing_plans: any[];
  created_at: string;
  updated_at: string;
}

// ============================================================
// PRIMARY CTA BUTTON — Matches Header.tsx button pattern
// ============================================================
function PrimaryCtaButton({
  to,
  label,
  onClick,
  className = '',
}: {
  to: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  const cleanLabel = label.replace(/[\s→\u2192]+$/, '').trim();

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative inline-block bg-ink-800 hover:bg-ink-700 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-200 text-base text-center border border-white/10 hover:border-teal-400/40 ${className}`}
    >
      <span className="absolute -inset-0.5 rounded-lg bg-teal-400 opacity-30 blur-sm -z-10 group-hover:opacity-70 transition-opacity duration-300" />
      <span className="relative z-10">{cleanLabel} &rarr;</span>
    </Link>
  );
}

// ============================================================
// NEURAL FIELD BACKGROUND
// ============================================================
const nodes: [number, number][] = [
  [80, 60], [220, 140], [150, 280], [340, 90], [420, 230], [520, 60],
  [610, 180], [700, 300], [780, 80], [860, 220], [950, 120], [1040, 260],
  [1120, 60], [300, 340], [540, 340], [900, 340], [60, 220], [1150, 200],
];

const links: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [6, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [2, 13], [4, 14], [9, 15],
  [16, 2], [10, 17], [7, 14],
];

function NeuralField() {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full motion-safe:animate-[fieldBreathe_9s_ease-in-out_infinite]"
      aria-hidden="true"
    >
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#5eead4" strokeOpacity="0.15" strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#5eead4" fillOpacity="0.35" />
      ))}
    </svg>
  );
}

// ============================================================
// MAIN CUSTOM MODELS COMPONENT
// ============================================================
interface CustomModelsProps {
  data?: PlatformSectionData | null;
  loading?: boolean;
}

export default function CustomModels({ data, loading = false }: CustomModelsProps) {
  // If loading, show skeleton
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-ink-800 rounded mb-6"></div>
            <div className="h-10 w-2/3 bg-ink-800 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-ink-800 rounded mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
      <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">Custom Models content not available</p>
          </div>
        </div>
      </section>
    );
  }

  // Map API coming_soon items to the format expected by the UI
  const items = data.coming_soon && data.coming_soon.length > 0
    ? data.coming_soon.map((item) => ({
        title: item.title || item.heading,
        description: item.description,
        tag: "Coming Soon · AI Models",
      }))
    : [];

  const hasComingSoon = data.coming_soon && data.coming_soon.length > 0;

  // If no items, show empty state
  if (items.length === 0) {
    return (
      <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-400">No custom models available</p>
          </div>
        </div>
      </section>
    );
  }

  // Use the heading from the API data
  // This is the correct heading for this section
  const heading = data.heading || "Turn Your Simulation Data Into Custom AI Models";
  const description = data.description || "Your team runs thousands of simulations. Divergent Physics helps you train proprietary AI models on that data — so you can predict performance in seconds instead of hours.";

  return (
    <section className="relative overflow-hidden bg-ink-900 border-t border-white/10 py-16 md:py-24">
      <style>{`
        @keyframes fieldBreathe { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.9; } }
      `}</style>

      <NeuralField />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-amber-400 border border-amber-400/40 bg-amber-400/5 rounded px-3 py-1 mb-5 md:mb-6">
          {hasComingSoon ? 'Coming Soon' : 'Custom Models'}
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 text-white max-w-3xl">
          {heading}
        </h2>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mb-10 md:mb-12 leading-relaxed">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden mb-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="group bg-ink-950 p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.02] flex flex-col"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">{item.description}</p>
              {item.tag && (
                <p className="text-gray-500 text-xs font-mono tracking-wide mt-auto pt-4 border-t border-white/10 uppercase">
                  {item.tag}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <PrimaryCtaButton to="/contact" label="Join Early Access" />
        </div>
      </div>
    </section>
  );
}